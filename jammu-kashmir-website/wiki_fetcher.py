#!/usr/bin/env python3
"""
Fetch page extracts from Wikipedia via the MediaWiki API and save structured JSON.
Usage:
  python wiki_fetcher.py             # uses default titles
  python wiki_fetcher.py --titles-file titles.txt
  python wiki_fetcher.py --title "Jammu and Kashmir" --title "Article 370 of the Constitution of India"

Output:
  data/scraped_wiki.json
  data/raw/wiki_<title_slug>_<ts>.json

This is preferred to scraping HTML on sites that disallow robots. The MediaWiki API is public and intended for automated access.
"""

import argparse
import json
import logging
import re
from datetime import datetime
from pathlib import Path

import requests

DATA_DIR = Path("data")
RAW_DIR = DATA_DIR / "raw"
OUT_JSON = DATA_DIR / "scraped_wiki.json"

DEFAULT_TITLES = [
    "Jammu and Kashmir",
    "Article 370 of the Constitution of India",
    "Rajputana",
    "Maharaja Hari Singh",
    "Instrument of Accession",
    "Dogra dynasty",
    "Partition of India",
    "Jammu",
    "Kashmir Valley",
    "Jammu and Kashmir (union territory)",
]

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s: %(message)s")
logger = logging.getLogger("wiki-fetcher")

API = "https://en.wikipedia.org/w/api.php"


def slugify(s: str) -> str:
    return re.sub(r"[^A-Za-z0-9_-]", "_", s)[:140]


def ensure_dirs():
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    RAW_DIR.mkdir(parents=True, exist_ok=True)


def fetch_extract(title: str) -> dict:
    params = {
        "action": "query",
        "prop": "extracts|info",
        # Also request full URL in page info so we can cite the source link.
        "inprop": "url",
        # Fetch a longer plaintext extract (not only the intro). Use exchars to limit size.
        "exchars": 3000,
        "explaintext": True,
        "redirects": True,
        "format": "json",
        "titles": title,
    }
    r = requests.get(API, params=params, timeout=20, headers={"User-Agent": "jk-wiki-fetcher/1.0 (https://example.local)"})
    r.raise_for_status()
    data = r.json()
    pages = data.get("query", {}).get("pages", {})
    # There should be a single page
    for pid, page in pages.items():
        out = {
            "title": page.get("title"),
            "pageid": page.get("pageid"),
            "extract": page.get("extract"),
            "fullurl": page.get("fullurl"),
        }
        return out
    return {"title": title, "error": "no-page"}


def main(titles):
    ensure_dirs()
    results = []
    ts = datetime.utcnow().strftime('%Y%m%dT%H%M%SZ')
    for t in titles:
        try:
            logger.info("Fetching summary for: %s", t)
            res = fetch_extract(t)
            res["fetched_at"] = ts
            results.append(res)
            slug = slugify(t)
            path = RAW_DIR / f"wiki_{slug}_{ts}.json"
            path.write_text(json.dumps(res, indent=2, ensure_ascii=False), encoding="utf-8")
            logger.info("Saved: %s", path)
        except Exception as e:
            logger.error("Failed to fetch %s: %s", t, e)
            results.append({"title": t, "error": str(e)})

    OUT_JSON.write_text(json.dumps({"generated_at": ts, "pages": results}, indent=2, ensure_ascii=False), encoding="utf-8")
    logger.info("Wrote aggregated JSON to %s", OUT_JSON)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Fetch Wikipedia extracts via MediaWiki API")
    parser.add_argument('--title', dest='title', action='append', help='Title to fetch (repeatable)')
    parser.add_argument('--titles-file', dest='titles_file', help='File with one title per line')
    args = parser.parse_args()

    titles = args.title if args.title else DEFAULT_TITLES
    if args.titles_file:
        extra = [l.strip() for l in Path(args.titles_file).read_text(encoding='utf-8').splitlines() if l.strip()]
        titles = list(titles) + extra
    main(titles)
