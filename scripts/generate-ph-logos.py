from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

base = Path('/data/projects/firmalo/public')
base.mkdir(parents=True, exist_ok=True)
font_bold_candidates = [
    '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',
    '/usr/share/fonts/truetype/liberation2/LiberationSans-Bold.ttf',
]

def font(cands, size):
    for p in cands:
        if Path(p).exists():
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()

W = H = 240
blue = (37, 99, 235)
white = (255, 255, 255)
dark = (15, 23, 42)
muted = (147, 197, 253)

# v1: app tile + PDF card, but clean and readable
img = Image.new('RGB', (W, H), blue)
d = ImageDraw.Draw(img)
for y in range(H):
    a = y / (H - 1)
    col = (int(37 * (1 - a) + 29 * a), int(99 * (1 - a) + 78 * a), int(235 * (1 - a) + 216 * a))
    d.line([(0, y), (W, y)], fill=col)
d.rounded_rectangle((18, 18, 222, 222), radius=44, outline=white, width=3)
d.rounded_rectangle((60, 44, 180, 166), radius=20, fill=white)
d.polygon([(148, 44), (180, 76), (148, 76)], fill=(219, 234, 254))
d.line([(148, 44), (148, 76), (180, 76)], fill=(191, 219, 254), width=3)
d.line([(80, 123), (95, 110), (110, 135), (126, 96), (141, 133), (160, 116)], fill=blue, width=7)
d.line([(79, 148), (162, 148)], fill=muted, width=5)
fnt = font(font_bold_candidates, 70)
d.rounded_rectangle((78, 157, 162, 218), radius=18, fill=blue)
d.text((120, 187), 'F', font=fnt, fill=white, anchor='mm')
p = base / 'firmalo-logo-ph-v1-clean.png'
img.save(p, optimize=True)
print(p, p.stat().st_size)

# v2: strongest small-size mark: F + signature underline
img = Image.new('RGB', (W, H), blue)
d = ImageDraw.Draw(img)
for y in range(H):
    a = y / (H - 1)
    col = (int(37 * (1 - a) + 30 * a), int(99 * (1 - a) + 64 * a), int(235 * (1 - a) + 175 * a))
    d.line([(0, y), (W, y)], fill=col)
d.rounded_rectangle((20, 20, 220, 220), radius=50, outline=white, width=4)
fnt = font(font_bold_candidates, 142)
d.text((120, 105), 'F', font=fnt, fill=white, anchor='mm')
d.line([(61, 162), (85, 143), (106, 176), (134, 121), (156, 173), (181, 151)], fill=white, width=9)
d.line([(58, 189), (182, 189)], fill=(191, 219, 254), width=6)
p = base / 'firmalo-logo-ph-v2-letter.png'
img.save(p, optimize=True)
print(p, p.stat().st_size)

# v3: neutral card with brand name, less icon-like but clearer brand
img = Image.new('RGB', (W, H), white)
d = ImageDraw.Draw(img)
d.rounded_rectangle((28, 26, 212, 214), radius=44, fill=(248, 250, 252), outline=(226, 232, 240), width=2)
d.rounded_rectangle((61, 42, 179, 160), radius=28, fill=blue)
fnt = font(font_bold_candidates, 92)
d.text((120, 97), 'F', font=fnt, fill=white, anchor='mm')
d.line([(76, 137), (96, 123), (113, 147), (136, 111), (151, 146), (166, 132)], fill=(219, 234, 254), width=5)
fnt2 = font(font_bold_candidates, 34)
d.text((120, 188), 'Firmalo', font=fnt2, fill=dark, anchor='mm')
p = base / 'firmalo-logo-ph-v3-wordmark.png'
img.save(p, optimize=True)
print(p, p.stat().st_size)
