#!/usr/bin/env python3
"""
One-click / Cron script to trigger daily news collection & update website data.
Run manually or via cron:
  python run_daily_update.py
"""

import sys
import subprocess
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
NEWS_FETCHER = BASE_DIR / "news_fetcher.py"

def main():
    print("=" * 65)
    print("Jammu & Kashmir Daily News & Weather Update Trigger")
    print("=" * 65)

    if not NEWS_FETCHER.exists():
        print(f"[Error] Could not find {NEWS_FETCHER}")
        sys.exit(1)

    print(f"[*] Executing daily collector: {NEWS_FETCHER}...")
    res = subprocess.run([sys.executable, str(NEWS_FETCHER)], text=True)

    if res.returncode == 0:
        print("\n[SUCCESS] Website news & 20-district weather database updated successfully!")
        print("[*] Refresh your web browser or click '[Refresh Feed]' on the site to view updated stories.")
    else:
        print(f"\n[Error] Collector exited with error code {res.returncode}")

if __name__ == "__main__":
    main()
