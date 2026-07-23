Jammu & Kashmir — informational site

This static site provides well-structured, responsive summaries about Jammu & Kashmir: history, geography, politics, and reference statistics. It includes a safe MediaWiki fetcher and a BeautifulSoup scraper for configurable sources.

Project layout

- index.html — landing page
- history.html, geography.html, politics.html, article_370.html, rajputana.html, timeline.html, resources.html, political-analysis.html — topic pages
- stats.html — statistics and live scraped data results
- assets/ — images, includes, and JS
  - assets/includes/header.html, footer.html — reusable header/footer fragments
  - assets/js/include_loader.js — client-side include loader
  - assets/js/search.js — simple client-side search UI
- data/ — output from fetchers
  - data/scraped_wiki.json — MediaWiki extracts
  - data/raw/ — per-page JSON and raw HTML
- scraper.py — BeautifulSoup scraper (respects robots.txt)
- wiki_fetcher.py — uses the MediaWiki API (recommended) to fetch extracts
- requirements.txt — Python deps
- serve.ps1 — helper to run scraper and serve locally

Setup

1. Ensure Python 3.8+ is installed.
2. Install dependencies:
   python -m pip install -r requirements.txt

Fetching content

- Recommended (lawful): use the MediaWiki API fetcher to gather summaries from Wikipedia:
  python wiki_fetcher.py
  This will write data/scraped_wiki.json and per-page JSON to data/raw/.

- Optional: use the BeautifulSoup scraper for allowed sites:
  python scraper.py --url https://jkgad.nic.in
  The scraper respects robots.txt and will skip disallowed pages.

Run locally

- Start a simple HTTP server:
  python -m http.server 8000
- Open http://localhost:8000
- Use the search box in the header or open stats.html?q=your+term to run a search across the fetched wiki extracts.

Notes & maintenance

- The site loads header/footer fragments from assets/includes/ — edit those once to update navigation across the site.
- To refresh wiki extracts, run python wiki_fetcher.py and then reload the site.
- For deployment, copy the entire site folder to a static host (GitHub Pages, Netlify) and ensure data/ is present if you want the wiki extracts accessible.
