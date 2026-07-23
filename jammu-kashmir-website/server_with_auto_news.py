#!/usr/bin/env python3
"""
Jammu & Kashmir Web Server with Live Daily Auto-News Sync & Refresh API
-----------------------------------------------------------------------
Serves the portal at http://127.0.0.1:8000/
Includes:
 1. Live API endpoint: GET /api/refresh-news (Triggers news_fetcher.py and returns fresh news JSON)
 2. Background scheduler thread running news_fetcher.py automatically every 6 hours
 3. Standard static file server for HTML/CSS/JS/JSON files
"""

import http.server
import socketserver
import json
import os
import sys
import threading
import time
import subprocess
from pathlib import Path

PORT = 8000
BASE_DIR = Path(__file__).resolve().parent

class AutoNewsHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(BASE_DIR), **kwargs)

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

    def do_GET(self):
        if self.path == '/api/refresh-news':
            self.handle_refresh_news()
        else:
            super().do_GET()

    def do_POST(self):
        if self.path == '/api/refresh-news':
            self.handle_refresh_news()
        else:
            self.send_error(404, "Endpoint not found")

    def handle_refresh_news(self):
        try:
            print("[AutoServer] Triggering news_fetcher.py via API request...")
            script_path = BASE_DIR / "news_fetcher.py"
            result = subprocess.run([sys.executable, str(script_path)], capture_output=True, text=True, timeout=30)
            
            news_json_path = BASE_DIR / "data" / "latest_news.json"
            if news_json_path.exists():
                data = news_json_path.read_text(encoding='utf-8')
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(data.encode('utf-8'))
            else:
                self.send_error(500, "News file not found post execution")
        except Exception as e:
            print(f"[Error] Failed to refresh news: {e}")
            self.send_error(500, f"Refresh error: {str(e)}")

def background_news_scheduler():
    """Runs news_fetcher.py at startup and every 6 hours thereafter."""
    script_path = BASE_DIR / "news_fetcher.py"
    while True:
        try:
            print(f"[{time.strftime('%Y-%m-%d %H:%M:%S')}] Running scheduled daily news update...")
            subprocess.run([sys.executable, str(script_path)], capture_output=True, text=True, timeout=30)
            print("[+] Daily news & 20-district weather update complete.")
        except Exception as e:
            print(f"[Warning] Background scheduler error: {e}")
        # Sleep for 6 hours (21600 seconds)
        time.sleep(21600)

def main():
    # Start background scheduler thread
    scheduler_thread = threading.Thread(target=background_news_scheduler, daemon=True)
    scheduler_thread.start()

    print("=" * 65)
    print("Jammu & Kashmir Web Server with Live Daily Auto-News Sync")
    print("=" * 65)
    print(f"[*] Serving Website at: http://127.0.0.1:{PORT}/")
    print(f"[*] News Refresh API: http://127.0.0.1:{PORT}/api/refresh-news")
    print(f"[*] Background Scheduler: Running news_fetcher.py every 6 hours")
    print("=" * 65)

    with socketserver.TCPServer(("", PORT), AutoNewsHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down web server.")

if __name__ == "__main__":
    main()
