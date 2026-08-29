# ⚡ Quick Reference: Files to Edit by Customization Type

## 🎯 What Do You Want to Change? Find It Here!

### I want to change... **COUPLE NAMES** 👰💍
```
FILE: src/constants/wedding.ts

Change these lines:
  bride: {
    name: 'Mio',              👈 Short name for header
    fullName: 'Akiyama Mio',  👈 Full name everywhere
    photo: '/assets/images/bride-circle.png',
  },
  groom: {
    name: 'Fiqri',                      👈 Short name for header
    fullName: 'M Fiqri Haikhar Anwar',  👈 Full name everywhere
    photo: '/assets/images/groom-circle.png',
  },
```

---

### I want to change... **WEDDING DATE & TIME** 📅
```
FILE: src/constants/wedding.ts

Change this line:
  date: new Date('2025-10-15T16:00:00'),
                   👆 YYYY-MM-DD👆 HH:MM:SS (24-hour format)

Examples:
  December 1, 2025 at 5:00 PM → new Date('2025-12-01T17:00:00')
  December 1, 2025 at 3:30 PM → new Date('2025-12-01T15:30:00')
  December 1, 2025 at 7:00 PM → new Date('2025-12-01T19:00:00')
```

---

### I want to change... **CEREMONY VENUE (Location & Time)** ⛩️
```
FILE: src/constants/wedding.ts

Change these lines:
  venue: {
    ceremony: {
      name: 'Masjid Songkok Recca Bone',      👈 Ceremony location name
      address: 'Jl. Jend. Ahmad Yani',       👈 Ceremony address
      time: '4:00 PM',                        👈 Ceremony time
    },
    reception: {
      name: 'Hotel Novena Bone',              👈 Reception location name
      address: 'Jl. Jend. Ahmad Yani No.25', 👈 Reception address
      time: '6:30 PM',                        👈 Reception time
    },
  },
```

---

### I want to change... **COUPLE PHOTOS** 📸
```
Step 1: Upload your photos
  - Place your couple photos in: public/assets/images/
  - Recommended: bride-circle.png and groom-circle.png
  - Format: PNG with transparent background works best
  - Size: 500x500px or larger

Step 2: Update file paths
  FILE: src/constants/wedding.ts
  
  bride: {
    photo: '/assets/images/YOUR-BRIDE-PHOTO.png',  👈 Change this
  },
  groom: {
    photo: '/assets/images/YOUR-GROOM-PHOTO.png',  👈 Change this
  },
```

---

### I want to change... **ALL TEXT ON THE PAGE** ✍️
```
FILE: src/locales/langs/en/home.json

Structure:
{
  "letter": { ... }              👈 Opening invitation letter
  "hero": { ... }                👈 Main banner "Welcome to Our Wedding"
  "couple": { ... }              👈 "Meet the Happy Couple" section
  "details": { ... }             👈 Date, time, countdown
  "schedule": { ... }            👈 Timeline of events
  "venue": { ... }               👈 Location information
  "gallery": { ... }             👈 Photo section
  "rsvp": { ... }                👈 RSVP form
  "closing-message": { ... }     👈 Thank you message
}

Just find the text you want to change and update the value!

Example:
OLD:  "hero.welcome": "Welcome to Our Wedding"
NEW:  "hero.welcome": "Together with our families..."
```

---

### I want to change... **MAIN COLORS** 🎨
```
FILE: src/app/globals.css

Change these color codes:
:root {
  --background: #f5ab57c9;  👈 Main background color (currently orange)
  --foreground: #171717;    👈 Text color (currently dark gray)
}

INDIAN WEDDING COLOR CODES TO USE:
  Primary (Deep Maroon):     #8B0000
  Secondary (Gold):          #FFD700
  Tertiary (Deep Red):       #722F37
  Background (Cream):        #FFFAF0

So for Indian wedding, change to:
:root {
  --background: #FFFAF0;    👈 Cream background
  --foreground: #2D1B2E;    👈 Dark plum text
}
```

---

### I want to change... **GRADIENT/BACKGROUND COLORS** (Hero Section, Sections) 🌈
```
FILES TO CHANGE:
  1. src/sections/home/components/hero-section.tsx
  2. src/sections/home/components/couple-introduction.tsx
  3. src/sections/home/components/wedding-details-card.tsx
  4. src/sections/home/components/event-schedule.tsx
  5. src/sections/home/components/venue-information.tsx

Look for these patterns and replace:

OLD (Rose/Pink theme):
  "from-rose-100 via-pink-50 to-purple-100"
  "from-rose-200 to-pink-300"
  "from-rose-500 to-pink-600"
  "bg-rose-200/30"
  "text-rose-400"
  "text-rose-600"

NEW (Indian Wedding theme):
  "from-amber-50 via-yellow-50 to-red-50"
  "from-red-200 to-amber-300"
  "from-red-700 to-amber-600"
  "bg-red-200/30"
  "text-amber-400"
  "text-red-600"

EASIER WAY: Use Find & Replace
  In VS Code: Ctrl+H (Windows) or Cmd+H (Mac)
  
  Find: rose
  Replace: red
  (Replace All)
  
  Then do:
  Find: pink
  Replace: amber
  (Replace All)
```

---

### I want to change... **BUTTON COLORS** 🔘
```
COMMON BUTTON FILE: src/sections/home/components/rsvp.tsx

Look for: className="... bg-rose-500 ..."
Change to: className="... bg-red-700 ..."

Look for: className="... text-rose-600 ..."
Change to: className="... text-red-600 ..."
```

---

### I want to change... **EVENT SCHEDULE/TIMELINE** 📅
```
FILE: src/sections/home/components/event-schedule.tsx

Find the scheduleItems array. Modify:

const scheduleItems = [
  {
    time: '3:30 PM',              👈 Change time
    event: t('schedule.guest-arrival'),     👈 Event name (from i18n)
    description: t('schedule.welcome-drinks'), 👈 Description (from i18n)
  },
  // ... more items
];

Then also update text in: src/locales/langs/en/home.json
Look for: "schedule": { ... }
```

---

### I want to add... **BACKGROUND MUSIC** 🎵
```
Step 1: Upload music file
  FILE PATH: public/assets/audio/wedding-music.mp3
  (Replace existing or add new file)

Step 2: Update player component
  FILE: src/sections/home/components/music-player.tsx
  
  Look for: <audio src="/assets/audio/..."
  Change to: <audio src="/assets/audio/wedding-music.mp3"

Step 3: Change button color from rose to maroon
  Find: className="... bg-rose-500 ..."
  Change to: className="... bg-red-700 ..."
```

---

### I want to change... **NAVIGATION MENU ITEMS** 🧭
```
FILE: src/constants/navigation.ts

Contains array of navigation sections. Modify names here.

FILE: src/components/navigation-button.tsx
Styles for the navigation buttons
```

---

### I want to add... **GALLERY PHOTOS** 🖼️
```
Step 1: Upload photos
  FOLDER: public/assets/images/
  Name them: gallery-1.png, gallery-2.png, etc.

Step 2: Update gallery component
  FILE: src/sections/home/components/gallery-preview.tsx
  
  Find the images array and add your photo paths

Step 3: Update gallery text (if needed)
  FILE: src/locales/langs/en/home.json
  Look for: "gallery": { ... }
```

---

### I want to change... **LETTER OPENING ANIMATION** 📮
```
FILE: src/components/letter-animation.tsx

Customize:
- Letter styling (colors, design)
- Animation timing
- Text on the letter
- Background

FILE: src/sections/home/view/home-view.tsx
- Modify what text appears on the letter

TEXT: src/locales/langs/en/home.json
Look for: "letter": { ... }
```

---

### I want to change... **FONT STYLE** 🔤
```
FILE: src/app/globals.css

Look for: font-family:
Change from: var(--font-poppins), Arial
Change to: 'Georgia', 'Garamond', serif (for Indian wedding)

Or use Google Fonts:
1. Add to HTML <head>:
   <link href="https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap" rel="stylesheet">

2. Use in CSS:
   font-family: 'Playfair Display', serif;
```

---

### I want to change... **CLOSING MESSAGE / THANK YOU** 💌
```
FILE: src/sections/home/components/closing-message.tsx
(Component styling)

FILE: src/locales/langs/en/home.json
Look for: "closing-message": {
  "title": "...",
  "quote": "...",
  "with-love": "...",
  "hashtags": "...",
  "contact": "..."
}
Change these values!
```

---

### I want to add... **NEW SECTION** (like Mehendi/Sangeet) 🌹
```
Step 1: Create component
  FILE: src/sections/home/components/ceremonies.tsx
  (Create new file with your content)

Step 2: Export component
  FILE: src/sections/home/components/index.ts
  Add: export { CeremoniesSection } from './ceremonies';

Step 3: Add to main view
  FILE: src/sections/home/view/home-view.tsx
  Import: import { CeremoniesSection } from '../components';
  Add section: <CeremoniesSection />

Step 4: Add text to i18n
  FILE: src/locales/langs/en/home.json
  Add: "ceremonies": { ... }
```

---

## 📱 Component File Locations Quick Map

| What you see | File to edit | What to change |
|---|---|---|
| Main banner with couple | `hero-section.tsx` | Gradient, couple names, photos, text |
| Meet the couple section | `couple-introduction.tsx` | Descriptions, colors, layout |
| Date & countdown | `wedding-details-card.tsx` + `countdown-timer.tsx` | Date, time, styling |
| Timeline/Schedule | `event-schedule.tsx` | Event times, names, descriptions |
| Venue info | `venue-information.tsx` | Location names, addresses |
| Gallery | `gallery-preview.tsx` | Images, layout |
| RSVP Form | `rsvp.tsx` | Form fields, colors, destination |
| Thank you message | `closing-message.tsx` | Quote, hashtags, contact |
| Music | `music-player.tsx` | Audio file, colors |
| Opening letter | `letter-animation.tsx` | Animation, design, styling |
| Navigation menu | `floating-navigation.tsx` | Menu items, colors |

---

## 🎨 Most Important Files (Edit these first!)

### For CONTENT:
1. **`src/constants/wedding.ts`** - Your couple info & dates
2. **`src/locales/langs/en/home.json`** - All visible text

### For DESIGN:
1. **`src/app/globals.css`** - Main colors
2. **Component files** - Component-specific colors (hero-section, couple-introduction, etc.)

### For MEDIA:
1. **`public/assets/images/`** - Couple photos
2. **`public/assets/audio/`** - Background music

---

## ✅ First Time Setup Checklist

```
[ ] 1. Update couple names in wedding.ts
[ ] 2. Update wedding date in wedding.ts
[ ] 3. Update venue info in wedding.ts
[ ] 4. Add couple photos to public/assets/images/
[ ] 5. Update photo paths in wedding.ts
[ ] 6. Update all text in home.json
[ ] 7. Change colors in globals.css
[ ] 8. Change component gradients (rose→red, pink→amber)
[ ] 9. Add background music to public/assets/audio/
[ ] 10. Test in browser: npm run dev
[ ] 11. Deploy when happy!
```

---

## 🚀 Run & Test Your Changes

```bash
# In terminal, from project directory:
npm run dev

# Then open browser to:
http://localhost:3000

# Keyboard shortcuts:
Ctrl+K + Ctrl+K  - Open browser dev tools to test responsiveness
```

---

**Happy customizing! 💕**

For detailed explanations, see `CUSTOMIZATION_GUIDE.md`
For Indian wedding specifics, see `INDIAN_WEDDING_THEME.md`
