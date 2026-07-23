#!/usr/bin/env python3
"""\nSimple configurable web scraper for Jammu & Kashmir UT information.
- Respects robots.txt when possible
- Fetches pages, saves raw HTML under data/raw/
- Extracts title, meta description, first H1, first paragraphs and table data
- Writes a structured JSON (data/scraped.json) and per-site JSON in data/raw/

Usage:
  python scraper.py                  # run default targets
  python scraper.py --url https://jkgad.nic.in --url https://jammukashmir.nic.in
  python scraper.py --urls-file sources.txt

Note: Run from the project root (where data/ directory exists). Install requirements from requirements.txt.
"""

import argparse
import json
import logging
import re
from datetime import datetime
from pathlib import Path
from urllib.parse import urlparse, urljoin

import requests
from bs4 import BeautifulSoup
from urllib.robotparser import RobotFileParser

# Configuration
DATA_DIR = Path("data")
RAW_DIR = DATA_DIR / "raw"
SCRAPED_JSON = DATA_DIR / "scraped.json"

DEFAULT_URLS = [
    "https://en.wikipedia.org/wiki/Jammu_and_Kashmir",
    "https://en.wikipedia.org/wiki/Article_370_of_the_Constitution_of_India",
    "https://en.wikipedia.org/wiki/Rajputana",
    "https://en.wikipedia.org/wiki/Maharaja_Hari_Singh",
    "https://en.wikipedia.org/wiki/Instrument_of_Accession",
    "https://en.wikipedia.org/wiki/Dogra_dynasty",
    "https://en.wikipedia.org/wiki/Partition_of_India",
    "https://en.wikipedia.org/wiki/Jammu",
    "https://en.wikipedia.org/wiki/Kashmir_Valley",
    "https://en.wikipedia.org/wiki/Jammu_and_Kashmir_(union_territory)",
]

# Set up logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s: %(message)s")
logger = logging.getLogger("jk-scraper")


def ensure_dirs():
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    RAW_DIR.mkdir(parents=True, exist_ok=True)


def can_fetch_url(page_url, session, user_agent="*"):
    try:
        parsed = urlparse(page_url)
        robots_url = f"{parsed.scheme}://{parsed.netloc}/robots.txt"
        rp = RobotFileParser()
        rp.set_url(robots_url)
        rp.read()
        allowed = rp.can_fetch(user_agent, page_url)
        logger.debug("robots.txt check %s -> %s", robots_url, allowed)
        return allowed
    except Exception as e:
        logger.warning("Could not parse robots.txt (%s). Proceeding cautiously: %s", e.__class__.__name__, e)
        # If robots can't be checked, be conservative and allow (but log)
        return True


def sanitize_filename(s: str) -> str:
    return re.sub(r"[^A-Za-z0-9_.-]", "_", s)[:180]


def parse_tables(soup: BeautifulSoup):
    tables_out = []
    for table in soup.find_all("table"):
        headers = []
        rows_out = []
        # Try to find header cells
        header_row = table.find("tr")
        if header_row:
            ths = header_row.find_all(["th"])
            if ths:
                headers = [th.get_text(strip=True) for th in ths]
        # Build rows
        for tr in table.find_all("tr"):
            cells = [td.get_text(strip=True) for td in tr.find_all(["td"]) ]
            if not cells:
                continue
            if headers and len(headers) == len(cells):
                rows_out.append({headers[i]: cells[i] for i in range(len(cells))})
            else:
                rows_out.append(cells)
        if rows_out:
            tables_out.append({"headers": headers, "rows": rows_out})
    return tables_out


def extract_from_html(html_text: str, url: str) -> dict:
    soup = BeautifulSoup(html_text, "html.parser")
    title = (soup.title.string.strip() if soup.title and soup.title.string else "")
    meta_desc_tag = soup.find("meta", attrs={"name": "description"}) or soup.find("meta", attrs={"property": "og:description"})
    meta_desc = meta_desc_tag["content"].strip() if meta_desc_tag and meta_desc_tag.get("content") else ""
    h1 = ""
    h1_tag = soup.find("h1")
    if h1_tag:
        h1 = h1_tag.get_text(strip=True)
    paragraphs = [p.get_text(strip=True) for p in soup.find_all("p") if p.get_text(strip=True)]
    paragraphs = paragraphs[:6]
    tables = parse_tables(soup)
    return {
        "url": url,
        "title": title,
        "meta_description": meta_desc,
        "h1": h1,
        "paragraphs": paragraphs,
        "tables": tables,
    }


def fetch_and_save(session: requests.Session, url: str, timeout=20) -> dict:
    logger.info("Fetching %s", url)
    if not can_fetch_url(url, session):
        logger.warning("robots.txt disallows fetching %s — skipping", url)
        return {"url": url, "skipped_by_robots": True}

    try:
        resp = session.get(url, timeout=timeout)
        resp.raise_for_status()
    except Exception as e:
        logger.error("Failed to fetch %s: %s", url, e)
        return {"url": url, "error": str(e)}

    ts = datetime.utcnow().strftime('%Y%m%dT%H%M%SZ')
    parsed = urlparse(url)
    host = parsed.netloc.replace(":", "_")
    path_safe = sanitize_filename(parsed.path or "root")
    raw_name = f"{host}_{path_safe}_{ts}.html"
    raw_path = RAW_DIR / raw_name
    raw_path.write_text(resp.text, encoding="utf-8")
    logger.info("Saved raw HTML to %s", raw_path)

    extracted = extract_from_html(resp.text, url)
    extracted["fetched_at"] = ts
    extracted["raw_path"] = str(raw_path.as_posix())

    # also save per-site json
    site_json_name = f"{host}_{path_safe}_{ts}.json"
    site_json_path = RAW_DIR / site_json_name
    site_json_path.write_text(json.dumps(extracted, indent=2, ensure_ascii=False), encoding="utf-8")
    logger.info("Saved parsed JSON to %s", site_json_path)

    return extracted


def main(urls, urls_file=None):
    ensure_dirs()
    session = requests.Session()
    session.headers.update({
        "User-Agent": "jk-scraper/1.0 (+https://example.local)"
    })

    if urls_file:
        extra = Path(urls_file).read_text(encoding="utf-8").splitlines()
        extra = [l.strip() for l in extra if l.strip()]
        urls = list(urls) + extra

    results = []
    for url in urls:
        # normalize
        if not url.startswith("http"):
            url = "https://" + url
        r = fetch_and_save(session, url)
        results.append(r)

    # write aggregated JSON
    SCRAPED_JSON.write_text(json.dumps({"generated_at": datetime.utcnow().isoformat()+"Z", "sites": results}, indent=2, ensure_ascii=False), encoding="utf-8")
    logger.info("Wrote aggregated scraped JSON to %s", SCRAPED_JSON)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Scrape configured sites for Jammu & Kashmir UT info")
    parser.add_argument("--url", dest="url", action="append", help="Add a URL to scrape (can be repeated)")
    parser.add_argument("--urls-file", dest="urls_file", help="Path to a file containing URLs (one per line)")
    args = parser.parse_args()

    target_urls = args.url if args.url else DEFAULT_URLS
    main(target_urls, urls_file=args.urls_file)
