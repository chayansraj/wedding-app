"""Temporary stand-in artwork (gold silhouettes) until the real Indian bride/groom illustrations are supplied.
Drop your images at public/assets/images/groom-art.png and bride-art.png to replace these."""
from PIL import Image, ImageDraw, ImageFilter

S = 640
for name, is_bride in (("groom", False), ("bride", True)):
    im = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    d.ellipse((0, 0, S - 1, S - 1), fill=(123, 30, 30, 255))
    d.ellipse((24, 24, S - 25, S - 25), outline=(200, 155, 60, 255), width=4)
    gold = (214, 170, 80, 255)
    # shoulders
    d.pieslice((110, 370, 530, 820), 180, 360, fill=gold)
    # head
    d.ellipse((235, 170, 405, 370), fill=gold)
    if is_bride:
        # dupatta arc + maang tikka
        d.arc((190, 120, 450, 420), 180, 360, fill=(200, 155, 60, 255), width=22)
        d.ellipse((312, 182, 328, 198), fill=(123, 30, 30, 255))
    else:
        # safa/turban
        d.chord((215, 130, 425, 300), 180, 360, fill=(170, 125, 50, 255))
        d.polygon([(320, 125), (345, 170), (295, 170)], fill=(255, 230, 160, 255))
    mask = Image.new("L", (S * 4, S * 4), 0)
    ImageDraw.Draw(mask).ellipse((0, 0, S * 4 - 1, S * 4 - 1), fill=255)
    mask = mask.resize((S, S), Image.LANCZOS).filter(ImageFilter.GaussianBlur(0.6))
    im.putalpha(mask)
    im.save(rf"C:\Users\n1698725\wedding-app\public\assets\images\{name}-art.png", optimize=True)
print("ok")
