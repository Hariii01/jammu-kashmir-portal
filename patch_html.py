import os

site_dir = "jammu-kashmir-website"
missing = [
    'article_370.html', 'community_archive.html', 'demographics.html',
    'faq.html', 'flags_of_jk.html', 'gallery.html', 'resources.html',
    'timeline.html', 'tourism_disparities.html', 'travel_directory.html'
]

for filename in missing:
    path = os.path.join(site_dir, filename)
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8", errors="ignore") as f:
            content = f.read()
        if "load_data.js" not in content:
            updated = content.replace(
                '<link rel="stylesheet" href="styles.css">',
                '<link rel="stylesheet" href="styles.css">\n  <script src="load_data.js" defer></script>'
            )
            with open(path, "w", encoding="utf-8") as f:
                f.write(updated)
            print(f"Patched {filename}")

print("All HTML pages successfully patched!")
