"""Crop head-and-shoulders portraits, replace background with the theme cream, export round PNGs."""
import sys
import numpy as np
import cv2
from PIL import Image, ImageOps, ImageFilter

Image.MAX_IMAGE_PIXELS = None
OUT = 640
# Face boxes (x, y, w, h) on the EXIF-transposed images, from detect_faces.py
SUBJECTS = {
    # groom (previous): (r"C:\Users\n1698725\Downloads\377A7551.JPG", (1956, 672, 594, 594), 2.1, 0.5, -0.03, -5),
    "groom": (r"C:\Users\n1698725\Downloads\_DSC0615.JPG", (1014, 732, 600, 600), 2.5, 0.62, 0.12, 0),
    # bride (previous): (r"C:\Users\n1698725\Downloads\NVS_0198.JPG", (1572, 1932, 1272, 1272), 2.05, 0.42, 0.0, 0),
    # bride (previous): (r"C:\Users\n1698725\Downloads\377A7485.JPG", (882, 1362, 1608, 1608), 2.4, 0.55, 0.1, 0),
    "bride": (r"C:\Users\n1698725\Downloads\IMG_9890.jpg", (896, 1454, 842, 842), 2.0, 0.45, 0.0, 0),
}
# Subjects whose original photo background is kept (no cut-out / cream wash).
KEEP_BACKGROUND = {"groom", "bride"}
# Extra Gaussian blur (sigma, on the 1100px working image) applied to the original
# background behind the subject; subject itself stays sharp.
BLUR_BACKGROUND = {"bride": 16}
log = open(r"C:\Users\n1698725\wedding-app\scripts\process_portraits.log", "w")


def say(*a):
    print(*a, file=log, flush=True)


def get_alpha(rgb: np.ndarray) -> np.ndarray:
    try:
        from rembg import remove, new_session
        session = new_session("u2net_human_seg")
        out = remove(Image.fromarray(rgb), session=session, alpha_matting=True,
                     alpha_matting_foreground_threshold=240, alpha_matting_background_threshold=10,
                     alpha_matting_erode_size=10)
        say("  rembg ok")
        return np.array(out)[:, :, 3]
    except Exception as e:  # noqa: BLE001
        say("  rembg unavailable, GrabCut fallback:", repr(e))
    h, w = rgb.shape[:2]
    mask = np.zeros((h, w), np.uint8)
    rect = (int(w * 0.06), int(h * 0.04), int(w * 0.88), int(h * 0.96))
    bgd, fgd = np.zeros((1, 65), np.float64), np.zeros((1, 65), np.float64)
    cv2.grabCut(cv2.cvtColor(rgb, cv2.COLOR_RGB2BGR), mask, rect, bgd, fgd, 6, cv2.GC_INIT_WITH_RECT)
    alpha = np.where((mask == cv2.GC_FGD) | (mask == cv2.GC_PR_FGD), 255, 0).astype(np.uint8)
    return cv2.GaussianBlur(alpha, (0, 0), 2)


def theme_background(size: int) -> Image.Image:
    yy, xx = np.mgrid[0:size, 0:size].astype(np.float32)
    d = np.sqrt((xx - size / 2) ** 2 + (yy - size * 0.42) ** 2) / (size / 2)
    d = np.clip(d, 0, 1)[..., None]
    inner = np.array([255, 251, 240], np.float32)   # near card paper #fffdf5
    outer = np.array([244, 226, 190], np.float32)   # soft gold wash
    return Image.fromarray((inner * (1 - d) + outer * d).astype(np.uint8))


for name, (path, (fx, fy, fw, fh), scale, head_room, x_shift, tilt) in SUBJECTS.items():
    # `python process_portraits.py groom` re-renders a single subject
    if len(sys.argv) > 1 and name not in sys.argv[1:]:
        continue
    say(name)
    im = ImageOps.exif_transpose(Image.open(path)).convert("RGB")
    W, H = im.size
    cx = fx + fw / 2 + fw * x_shift
    side = int(fw * scale)
    top = int(fy - fh * head_room)
    left = int(cx - side / 2)
    left = max(0, min(left, W - side)); top = max(0, min(top, H - side))
    crop = im.crop((left, top, left + side, top + side))
    say("  crop", (left, top, side))

    work = crop.resize((1100, 1100), Image.LANCZOS)
    if tilt:
        # Inscribed circle stays fully covered for small angles, so no fill shows
        work = work.rotate(tilt, resample=Image.BICUBIC, center=(550, 550))
    rgb = np.array(work)
    if name in KEEP_BACKGROUND:
        comp = work
        if BLUR_BACKGROUND.get(name):
            alpha = get_alpha(rgb)
            say("  alpha coverage %.2f" % (alpha.mean() / 255))
            # soften the matte edge so the sharp subject blends into the blurred plate
            soft = Image.fromarray(alpha).filter(ImageFilter.GaussianBlur(1.5))
            blurred = work.filter(ImageFilter.GaussianBlur(BLUR_BACKGROUND[name]))
            comp = Image.composite(work, blurred, soft)
    else:
        alpha = get_alpha(rgb)
        say("  alpha coverage %.2f" % (alpha.mean() / 255))
        subject = Image.fromarray(np.dstack([rgb, alpha]), "RGBA")
        bg = theme_background(1100).convert("RGBA")
        comp = Image.alpha_composite(bg, subject).convert("RGB")

    comp = comp.resize((OUT, OUT), Image.LANCZOS)
    circle = Image.new("L", (OUT * 4, OUT * 4), 0)
    from PIL import ImageDraw
    ImageDraw.Draw(circle).ellipse((0, 0, OUT * 4 - 1, OUT * 4 - 1), fill=255)
    circle = circle.resize((OUT, OUT), Image.LANCZOS).filter(ImageFilter.GaussianBlur(0.6))
    out = comp.convert("RGBA"); out.putalpha(circle)
    dest = rf"C:\Users\n1698725\wedding-app\public\assets\images\{name}-circle.png"
    out.save(dest, optimize=True)
    import os
    say("  saved", dest, os.path.getsize(dest) // 1024, "KB")
say("done")
