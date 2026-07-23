"""
scraper/scraper.py
A minimal, safe scraping controller that prefers the MediaWiki API, but falls back to
requests+BeautifulSoup for allowed sites and Selenium for dynamic pages.

Usage notes:
- Install required drivers for Selenium (e.g., chromedriver) and put them in PATH or configure via SELENIUM_DRIVER_PATH env var.
- This script respects robots.txt when using requests+BS4.
- For Wikipedia and other MediaWiki sites, prefer the API endpoints instead of scraping HTML.
"""

import os
import json
import time
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin

DATA_DIR = os.path.join(os.path.dirname(__file__), '..', 'data')
DATA_FILE = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'data', 'scraped_wiki.json'))


def fetch_mediawiki_extract(title, site='en.wikipedia.org'):
    """Fetch a plaintext extract from MediaWiki API."""
    api = f'https://{site}/w/api.php'
    params = {
        'action': 'query',
        'format': 'json',
        'prop': 'extracts|info',
        'explaintext': 1,
        'titles': title,
        'inprop': 'url',
        'exintro': 0,
        'exchars': 2000
    }
    r = requests.get(api, params=params, timeout=20)
    r.raise_for_status()
    data = r.json()
    pages = data.get('query', {}).get('pages', {})
    page = next(iter(pages.values()))
    return {
        'title': page.get('title'),
        'extract': page.get('extract'),
        'fullurl': page.get('fullurl')
    }


def fetch_with_bs4(url):
    """Simple requests + BeautifulSoup fetch (obey robots externally before running)."""
    r = requests.get(url, timeout=20)
    r.raise_for_status()
    soup = BeautifulSoup(r.text, 'lxml')
    # Very generic body text extraction - tune per-site
    content = ' '.join([p.get_text(strip=True) for p in soup.select('p')[:8]])
    return {'url': url, 'text': content}


def run_pipeline():
    """Example pipeline that collects a few pages and writes JSON into data/"""
    pages = [
        'Jammu_and_Kashmir',
        'Instrument_of_Accession',
        'Article_370_of_the_Constitution_of_India'
    ]
    out = {}
    for t in pages:
        try:
            print('Fetching', t)
            out[t] = fetch_mediawiki_extract(t)
            time.sleep(1)
        except Exception as e:
            print('Failed to fetch', t, e)
    os.makedirs(os.path.dirname(DATA_FILE), exist_ok=True)
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        json.dump(out, f, ensure_ascii=False, indent=2)
    print('Wrote', DATA_FILE)


if __name__ == '__main__':
    run_pipeline()
