#!/usr/bin/env python3
"""
Generate a CSS fallback file by replacing OKLCH-based tokens in the modern :root
with the hex fallbacks provided in the first :root block.

This is a simple build-time helper. It extracts the first :root block (assumed
to contain hex fallbacks) and replaces OKLCH lines in the later :root block
with the corresponding fallback values.

Usage: python generate_css_fallback.py styles.css styles.fallback.css
"""
import re
import sys


def extract_first_root_vars(css_text):
    # Find first :root { ... }
    m = re.search(r":root\s*\{([\s\S]*?)\}", css_text)
    if not m:
        return {}
    body = m.group(1)
    vars = {}
    for line in body.splitlines():
        line = line.strip()
        if line.startswith('--') and ':' in line:
            try:
                name, val = line.split(':',1)
                name = name.strip().lstrip('--')
                val = val.strip().rstrip(';')
                vars[name] = val
            except Exception:
                continue
    return vars


def replace_oklch_with_fallback(css_text, fallbacks):
    # Replace lines where variables are assigned oklch(...)
    def repl(match):
        varname = match.group(1)
        if varname in fallbacks:
            return f"--{varname}: {fallbacks[varname]};"
        else:
            # leave original
            return match.group(0)

    pattern = re.compile(r"--([a-zA-Z0-9\-]+)\s*:\s*oklch\([^;\n]*\);")
    return pattern.sub(repl, css_text)


if __name__ == '__main__':
    if len(sys.argv) < 3:
        print('Usage: generate_css_fallback.py input.css output_fallback.css')
        sys.exit(2)
    inp = sys.argv[1]
    out = sys.argv[2]
    with open(inp, 'r', encoding='utf-8') as f:
        css = f.read()
    fallbacks = extract_first_root_vars(css)
    if not fallbacks:
        print('No fallback :root variables found. Aborting.')
        sys.exit(1)
    new_css = replace_oklch_with_fallback(css, fallbacks)
    with open(out, 'w', encoding='utf-8') as f:
        f.write('/* Auto-generated fallback CSS — OKLCH tokens replaced with first :root fallbacks */\n')
        f.write(new_css)
    print(f'Wrote fallback CSS to {out}')
