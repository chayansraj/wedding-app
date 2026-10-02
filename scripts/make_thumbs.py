import numpy as np
import cv2
from PIL import Image, ImageOps, ImageDraw

Image.MAX_IMAGE_PIXELS = None
paths = {
    "groom": r"C:\Users\n1698725\Downloads\377A7551.JPG",
    "bride": r"C:\Users\n1698725\Downloads\NVS_0198.JPG",
}
casc = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")
for name, p in paths.items():
    im = ImageOps.exif_transpose(Image.open(p)).convert("RGB")
    W, H = im.size
    f = 6
    small = im.resize((W // f, H // f))
    gray = cv2.cvtColor(np.array(small), cv2.COLOR_RGB2GRAY)
    faces = casc.detectMultiScale(gray, scaleFactor=1.08, minNeighbors=5, minSize=(40, 40))
    thumb = im.resize((320, int(320 * H / W)))
    s = 320 / W
    d = ImageDraw.Draw(thumb)
    for i, (x, y, w, h) in enumerate(faces):
        x, y, w, h = [int(v * f * s) for v in (x, y, w, h)]
        d.rectangle([x, y, x + w, y + h], outline="red", width=2)
        d.text((x + 2, y + 2), str(i), fill="yellow")
    thumb.save(rf"C:\Users\n1698725\wedding-app\scripts\{name}_thumb.jpg", quality=60)
    print(name, [tuple(int(v) for v in fc) for fc in faces])
