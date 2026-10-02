import sys
import numpy as np
import cv2
from PIL import Image, ImageOps

Image.MAX_IMAGE_PIXELS = None
paths = [r"C:\Users\n1698725\Downloads\377A7551.JPG", r"C:\Users\n1698725\Downloads\NVS_0198.JPG"]
casc = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")
for p in paths:
    im = ImageOps.exif_transpose(Image.open(p)).convert("RGB")
    W, H = im.size
    f = 6
    small = im.resize((W // f, H // f))
    arr = np.array(small)
    gray = cv2.cvtColor(arr, cv2.COLOR_RGB2GRAY)
    faces = casc.detectMultiScale(gray, scaleFactor=1.08, minNeighbors=5, minSize=(40, 40))
    print(p, "size", (W, H))
    for (x, y, w, h) in faces:
        print("  face", (x * f, y * f, w * f, h * f))
    full = np.array(im.resize((W // 20, H // 20))).reshape(-1, 3)
    print("  mean rgb", full.mean(axis=0).round(0))
    b = arr
    bh, bw = b.shape[:2]
    m = int(min(bh, bw) * 0.1)
    border = np.concatenate([b[:m].reshape(-1, 3), b[-m:].reshape(-1, 3), b[:, :m].reshape(-1, 3), b[:, -m:].reshape(-1, 3)])
    print("  border mean rgb", border.mean(axis=0).round(0))
    sys.stdout.flush()
