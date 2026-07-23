#!/usr/bin/env python3
import sys
from pathlib import Path

# Redirect to jammu-kashmir-website/news_fetcher.py execution
script_path = Path(__file__).resolve().parent / "jammu-kashmir-website" / "news_fetcher.py"
if script_path.exists():
    with open(script_path, "r", encoding="utf-8") as f:
        code = f.read()
    exec(code, {"__file__": str(script_path), "__name__": "__main__"})
