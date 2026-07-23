# Serve the site locally and optionally run the scraper
param(
  [switch]$scrape
)

if ($scrape) {
  Write-Output "Running scraper..."
  python scraper.py
}

Write-Output "Starting HTTP server on port 8000"
python -m http.server 8000
