"""Downscale the portrait event artworks to web-sized WebP (hero + thumb).
Usage: python process_event_art.py [slug ...]   (no args = all)"""
import sys
from pathlib import Path

from PIL import Image

SRC = Path(r"C:\Users\n1698725\Downloads")
OUT = Path(__file__).resolve().parent.parent / "public" / "assets" / "images" / "events"
OUT.mkdir(parents=True, exist_ok=True)

FILES = {
    "matra-pujan": "matra pujan.png",
    "haldi": "haldi.png",
    "mehendi": "mehendi.png",
    "engagement": "engagement.png",
    "wedding": "wedding.png",
}

for slug, name in FILES.items():
    if len(sys.argv) > 1 and slug not in sys.argv[1:]:
        continue
    im = Image.open(SRC / name).convert("RGB")
    hero = im.resize((1080, round(1080 * im.height / im.width)), Image.LANCZOS)
    hero.save(OUT / f"{slug}.webp", "WEBP", quality=82, method=6)
    thumb = im.resize((420, round(420 * im.height / im.width)), Image.LANCZOS)
    thumb.save(OUT / f"{slug}-thumb.webp", "WEBP", quality=78, method=6)
    print(slug, hero.size, f"{(OUT / f'{slug}.webp').stat().st_size // 1024} KB", f"thumb {(OUT / f'{slug}-thumb.webp').stat().st_size // 1024} KB")
