"""Split the combined bride/groom illustration into two round head-and-shoulders portraits."""
from PIL import Image, ImageDraw, ImageFilter
import numpy as np

SRC = r"C:\Users\n1698725\Downloads\groom and bride combined.png"
OUT = 640
im = Image.open(SRC).convert("RGB")
W, H = im.size
print("source", W, H)

# Locate the white vertical divider between the two panels
col_mean = np.array(im.convert("L")).mean(axis=0)
mid = W // 2
window = col_mean[int(W * 0.4):int(W * 0.6)]
split = int(W * 0.4) + int(np.argmax(window))
print("divider at", split)

# Crop boxes as fractions of each panel (cx, cy, side) — tuned to frame face + shoulders
PANELS = {
    "groom": (0, split, 0.57, 0.42, 0.92),
    "bride": (split, W, 0.49, 0.44, 0.92),
}
for name, (x0, x1, fcx, fcy, fside) in PANELS.items():
    pw = x1 - x0
    side = int(pw * fside)
    cx = x0 + int(pw * fcx)
    cy = int(H * fcy)
    left = max(x0, min(cx - side // 2, x1 - side))
    top = max(0, min(cy - side // 2, H - side))
    crop = im.crop((left, top, left + side, top + side)).resize((OUT, OUT), Image.LANCZOS)
    print(name, "crop", (left, top, side))

    mask = Image.new("L", (OUT * 4, OUT * 4), 0)
    ImageDraw.Draw(mask).ellipse((0, 0, OUT * 4 - 1, OUT * 4 - 1), fill=255)
    mask = mask.resize((OUT, OUT), Image.LANCZOS).filter(ImageFilter.GaussianBlur(0.6))
    out = crop.convert("RGBA")
    out.putalpha(mask)
    dest = rf"C:\Users\n1698725\wedding-app\public\assets\images\{name}-art.png"
    out.save(dest, optimize=True)
    import os
    print("  saved", os.path.getsize(dest) // 1024, "KB")
