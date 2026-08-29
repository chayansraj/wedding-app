# Wedding App Customization Guide - Indian Wedding Edition

## 📁 Key File Locations

### Main Configuration Files
- **Wedding Details**: `src/constants/wedding.ts` - All couple names, dates, venues, photos
- **Text Content**: `src/locales/langs/en/home.json` - All visible text (guest-facing)
- **Colors/Styling**: `src/app/globals.css` - Primary colors and theme
- **Tailwind Config**: `tailwindcss.config.js` or `postcss.config.mjs` - Extended colors
- **Images**: `public/assets/images/` - Couple photos and decorative images
- **Animations**: `src/components/` - Component files for motion/animation adjustments

---

## 🎨 Customization by Page/Section

### 1. **Letter Opening Animation** 🔤
**File**: `src/components/letter-animation.tsx`

**What you can customize:**
- [ ] **Text content** → Edit `coupleName` prop in `src/sections/home/view/home-view.tsx`
- [ ] **Letter styling** → Colors, fonts, envelope design in component
- [ ] **Animation speed** → Modify transition timings
- [ ] **Background color** → Change `bg-gradient` classes
- [ ] **Letter open message** → Text shown when letter opens

**Related Text File**: `src/locales/langs/en/home.json` (search for "letter.*")

---

### 2. **Hero Section** 🌹 (Main Banner with Couple Photos)
**File**: `src/sections/home/components/hero-section.tsx`

**What you can customize:**
- [ ] **Couple names & welcome text** → `src/constants/wedding.ts` (bride.name, groom.name)
- [ ] **Main heading text** → `src/locales/langs/en/home.json` → "hero.welcome"
- [ ] **Background gradient colors** → In component: `from-rose-100 via-pink-50 to-purple-100`
  - For Indian wedding: Consider **gold, maroon, cream, deep red**
- [ ] **Couple photos** → Replace `bride.photo` and `groom.photo` paths in `src/constants/wedding.ts`
  - Upload new images to `public/assets/images/`
- [ ] **Decorative blobs** → Background circles with colors like `bg-rose-200/30`
- [ ] **Emoji replacements** → Change 👰🏻 💕 emojis for Indian cultural elements
- [ ] **Animation delays** → Modify `delay: 0.2, 0.6` values for entrance timing

**Related Text Files**: 
- `src/locales/langs/en/home.json` → "hero.*"

---

### 3. **Couple Introduction Section** 👰💍
**File**: `src/sections/home/components/couple-introduction.tsx`

**What you can customize:**
- [ ] **Section title** → `couple.our-story` in locales
- [ ] **Couple descriptions** → `couple.bride-description`, `couple.groom-description`
- [ ] **Full names** → `src/constants/wedding.ts` → `bride.fullName`, `groom.fullName`
- [ ] **Couple photos** → Update image sources (`bride.photo`, `groom.photo`)
- [ ] **Background gradient** → `from-white to-rose-50/30` 
  - Change rose/pink to **gold/maroon/cream** for Indian theme
- [ ] **Photo frame colors** → `from-rose-100 to-pink-200` 
  - Try **gold to maroon** gradient
- [ ] **Section divider line color** → `bg-rose-400` → change to **gold/maroon**
- [ ] **Love story text** → `couple.story-text` in locales

**Related Text Files**: 
- `src/locales/langs/en/home.json` → "couple.*"

---

### 4. **Wedding Details & Countdown** ⏰
**File**: `src/sections/home/components/wedding-details-card.tsx` & `countdown-timer.tsx`

**What you can customize:**
- [ ] **Wedding date** → `src/constants/wedding.ts` → `date: new Date('2025-10-15T16:00:00')`
- [ ] **Ceremony time** → `venue.ceremony.time`
- [ ] **Reception time** → `venue.reception.time`
- [ ] **Ceremony location** → `venue.ceremony.name` & `venue.ceremony.address`
- [ ] **Reception location** → `venue.reception.name` & `venue.reception.address`
- [ ] **Countdown styling** → Card colors, gradient backgrounds
- [ ] **Button colors** → "Add to Calendar" button color (typically rose/pink → change to **gold**)
- [ ] **Card background** → Usually white/cream → keep cream for Indian theme
- [ ] **Text colors** → Heading colors, date font styling

**Related Text Files**: 
- `src/locales/langs/en/home.json` → "details.*"

---

### 5. **Venue Information Section** 📍
**File**: `src/sections/home/components/venue-information.tsx`

**What you can customize:**
- [ ] **Ceremony details** → Name, address, time from `src/constants/wedding.ts`
- [ ] **Reception details** → Name, address, time from `src/constants/wedding.ts`
- [ ] **Google Maps links** → Add actual coordinates/maps
- [ ] **Card styling** → Background colors, shadow effects
- [ ] **Icon/emoji styling** → Current map pin emojis 📍
- [ ] **Text styling** → Address font size, color

**Related Text Files**: 
- `src/locales/langs/en/home.json` → "details.*"

---

### 6. **Event Schedule/Timeline** 📅
**File**: `src/sections/home/components/event-schedule.tsx`

**What you can customize:**
- [ ] **Schedule times** → Edit times like "3:30 PM", "4:00 PM" etc.
- [ ] **Event names** → "Guest Arrival", "Wedding Ceremony", etc.
- [ ] **Event descriptions** → "Welcome Drinks", "Photography", etc.
- [ ] **Timeline line color** → Usually rose/pink → change to **gold/maroon**
- [ ] **Event dots/circles** → Their colors
- [ ] **Background styling** → Timeline background
- [ ] **Animation timing** → Stagger delays between items

**Related Text Files**: 
- `src/locales/langs/en/home.json` → "schedule.*"

---

### 7. **Gallery/Photos Section** 🖼️
**File**: `src/sections/home/components/gallery-preview.tsx`

**What you can customize:**
- [ ] **Gallery images** → Add your wedding photos to `public/assets/images/`
- [ ] **Image paths** → Update image URLs in component
- [ ] **Grid layout** → 2 columns, 3 columns, etc.
- [ ] **Image styling** → Border radius, shadow, hover effects
- [ ] **Gallery title/text** → From locales

**Related Text Files**: 
- `src/locales/langs/en/home.json` → "gallery.*"

---

### 8. **RSVP Section** ✉️
**File**: `src/sections/home/components/rsvp.tsx`

**What you can customize:**
- [ ] **RSVP form fields** → Names, email input, attendance choice
- [ ] **Submit button color** → Currently rose/pink → change to **gold**
- [ ] **Form background** → Card styling
- [ ] **Success message** → After form submission
- [ ] **Email destination** → Where RSVPs are sent
- [ ] **Input field styling** → Border colors, focus states

**Related Text Files**: 
- `src/locales/langs/en/home.json` → "rsvp.*"

---

### 9. **Closing Message Section** 💌
**File**: `src/sections/home/components/closing-message.tsx`

**What you can customize:**
- [ ] **Closing quote/message** → `closing-message.quote` in locales
- [ ] **Thank you text** → Main message to guests
- [ ] **Sign-off** → "With all our love," can be changed
- [ ] **Hashtags** → Social media hashtags
- [ ] **Contact information** → Email, phone number
- [ ] **Background styling** → Gradient, color
- [ ] **Text styling** → Font sizes, colors

**Related Text Files**: 
- `src/locales/langs/en/home.json` → "closing-message.*"

---

### 10. **Music Player** 🎵
**File**: `src/sections/home/components/music-player.tsx`

**What you can customize:**
- [ ] **Background music** → Upload your song to `public/assets/audio/`
- [ ] **Music file path** → Update in component
- [ ] **Player button color** → Rose/pink → change to **gold**
- [ ] **Volume settings** → Default volume level
- [ ] **Player position** → Bottom right, top right, etc.
- [ ] **Music file name** → Reference in component

---

### 11. **Navigation/Menu** 🧭
**Files**: `src/components/navigation-button.tsx`, `src/sections/home/components/floating-navigation.tsx`

**What you can customize:**
- [ ] **Navigation items** → Section names (Hero, Couple, Details, etc.)
- [ ] **Navigation colors** → Active/inactive colors
- [ ] **Button styling** → Shape, size, shadow
- [ ] **Section labels** → Text for each navigation item
- [ ] **Navigation icon colors** → Active indicator color

**Related Text Files**: 
- `src/constants/navigation.ts` → Navigation section definitions

---

### 12. **Global Colors & Theme** 🎨
**File**: `src/app/globals.css`

**What you can customize:**
- [ ] **Primary background** → `--background: #f5ab57c9;` (currently orange/gold)
- [ ] **Text color** → `--foreground: #171717;`
- [ ] **Root variables** → All CSS custom properties

**Color Suggestions for Indian Wedding Theme:**
- **Primary**: Deep Maroon (#800020 or #8B0000)
- **Secondary**: Gold (#FFD700 or #FFA500)
- **Accent**: Cream/Ivory (#FFFDD0 or #F5F5DC)
- **Dark**: Deep Red/Burgundy (#722F37)

---

## 🎯 Quick Color Change Guide

### To change the entire color scheme (Fastest Way):

1. **Open**: `src/app/globals.css`
2. **Change** these lines:
   ```css
   :root {
     --background: #f5ab57c9;      /* Change this */
     --foreground: #171717;         /* And this */
   }
   ```

3. **Then update** all component files:
   - Replace all `rose-*` classes with `red-*` or `amber-*`
   - Replace all `pink-*` classes with `orange-*`
   - Replace all `purple-*` classes with `yellow-*`

4. **Tailwind color quick reference:**
   - `rose-` → red or amber (for gold)
   - `pink-` → orange or amber
   - `purple-` → yellow or amber
   - `gray-` → slate (optional)

---

## 📝 Text Customization - Most Important Files

### All Guest-Facing Text is Here:
**File**: `src/locales/langs/en/home.json`

This is where ALL visible text on the website lives. Structure:
```json
{
  "letter": { ... },        // Opening letter
  "hero": { ... },          // Main banner
  "couple": { ... },        // About the couple
  "details": { ... },       // Wedding details
  "schedule": { ... },      // Timeline
  "venue": { ... },         // Locations
  "gallery": { ... },       // Photos section
  "rsvp": { ... },          // Form
  "closing-message": { ... } // Thank you
}
```

**To customize**: Open file and change text values directly. Examples:
- `"hero.welcome": "Welcome to Our Wedding"` → Change text here
- `"couple.story-text": "Our journey began..."` → Change here

---

## 🖼️ Image Customization

### Where to Upload Images:
1. Create your couple photos (square format, ~500x500px recommended)
2. Place them in: `public/assets/images/`
3. Update in `src/constants/wedding.ts`:
   ```typescript
   bride: {
     name: 'Your Bride Name',
     fullName: 'Full Name',
     photo: '/assets/images/your-bride-photo.png',  // Change this
   },
   ```

### Recommended Image Names:
- `bride-circle.png`
- `groom-circle.png`
- `couple-photo-1.png`
- `couple-photo-2.png`
- `gallery-1.png`, `gallery-2.png`, etc.

---

## 🎬 Animation Customization

### Most animations use these files:
- `src/components/letter-animation.tsx` - Opening letter
- Individual component files have `motion` tags
- Change values like `delay: 0.2`, `duration: 1`

### Motion library docs: Check `motion/react` imports

---

## 🚀 Suggested Indian Wedding Improvements

### 1. **Add Traditional Elements**
   - [ ] Add "Mehndi", "Sangeet", "Baraat" ceremonies to event schedule
   - [ ] Include traditional attire descriptions in couple section
   - [ ] Add prayer/blessing message at the beginning
   - [ ] Include "Shaadi" or "Vivah" terminology

### 2. **Color Palette Upgrade**
   - [ ] Change from rose/pink to **Maroon + Gold + Cream**
   - [ ] Add ornamental borders/patterns (paisley)
   - [ ] Use traditional fonts like serif for headings

### 3. **Cultural Elements**
   - [ ] Replace simple emojis with ornamental dividers
   - [ ] Add "With blessings of our families" section
   - [ ] Include "Dress Code" (formal/traditional attire)
   - [ ] Add "Vegetarian/Non-vegetarian" meal options to RSVP

### 4. **Additional Sections to Add**
   - [ ] **Mehendi Details** - Date, time, location
   - [ ] **Sangeet Ceremony** - Musical celebration details
   - [ ] **Baraat Timing** - When the groom arrives
   - [ ] **Aarti Timing** - Welcome ceremony
   - [ ] **Gift Registry** - Where to buy gifts
   - [ ] **Accommodation** - Hotel recommendations
   - [ ] **Travel Info** - Flight/train directions

### 5. **Music & Audio**
   - [ ] Add traditional Indian wedding songs
   - [ ] Background music during scrolling
   - [ ] Celebrate with "Dhol" sounds at key moments

### 6. **Typography**
   - [ ] Use serif fonts for elegant Indian aesthetic
   - [ ] Add ornamental separators between sections
   - [ ] Use script fonts for couple names

### 7. **Prayer/Blessing Section**
   - [ ] Add opening prayer or blessing
   - [ ] Include "Mangalsutra" symbolism
   - [ ] Add family blessings

### 8. **Social Integration**
   - [ ] Instagram hashtag for wedding photos
   - [ ] Live wedding day updates link
   - [ ] Thank you video link after wedding

---

## 📋 Step-by-Step: Your First Customization

### Step 1: Update Your Names
1. Open `src/constants/wedding.ts`
2. Change:
   ```typescript
   bride: { name: 'YOUR_BRIDE_NAME', fullName: 'YOUR_BRIDE_FULL_NAME' },
   groom: { name: 'YOUR_GROOM_NAME', fullName: 'YOUR_GROOM_FULL_NAME' },
   ```
3. Save file

### Step 2: Update Your Wedding Date
1. In same file, change:
   ```typescript
   date: new Date('YOUR_DATE_TIME'),  // Format: 'YYYY-MM-DDTHH:MM:SS'
   ```
2. Example: `new Date('2025-12-01T17:00:00')`

### Step 3: Update Your Wedding Venues
1. In same file, update:
   ```typescript
   venue: {
     ceremony: { name: 'YOUR CEREMONY VENUE', address: 'YOUR ADDRESS', time: 'YOUR TIME' },
     reception: { name: 'YOUR RECEPTION VENUE', address: 'YOUR ADDRESS', time: 'YOUR TIME' },
   }
   ```

### Step 4: Add Your Photos
1. Place couple photos in `public/assets/images/`
2. Update paths in `src/constants/wedding.ts`:
   ```typescript
   photo: '/assets/images/your-photo-name.png',
   ```

### Step 5: Update Text
1. Open `src/locales/langs/en/home.json`
2. Find and replace text values

### Step 6: Change Colors
1. Open `src/app/globals.css`
2. Update the color variables

### Step 7: Test
1. Run `npm run dev` in terminal
2. Visit `http://localhost:3000`
3. Check your changes

---

## 💡 Tips & Tricks

- **Colors**: Use color palette tools like [Coolors.co](https://coolors.co) for Indian wedding themes
- **Fonts**: Google Fonts has beautiful serif fonts perfect for weddings
- **Images**: Use high-quality couple photos, minimum 500x500px
- **Testing**: Always test on mobile devices
- **Localization**: This app supports multiple languages (see `src/locales/langs/`)
- **Deployment**: When ready, deploy to Vercel, Netlify, or your hosting provider

---

## 📞 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Colors not changing | Clear browser cache (Ctrl+Shift+Delete), restart dev server |
| Images not showing | Ensure path starts with `/assets/images/` |
| Text not updating | Check spelling in locale file, refresh page |
| Animations not smooth | Increase `duration` value in motion tags |
| Layout broken on mobile | Check responsive classes (`sm:`, `md:`, `lg:`) |

---

## 📚 File Structure Quick Reference

```
src/
├── app/
│   └── globals.css          ← COLORS HERE
├── constants/
│   └── wedding.ts           ← COUPLE INFO, DATES, VENUES HERE
├── locales/langs/en/
│   └── home.json            ← ALL TEXT HERE
├── sections/home/components/
│   ├── hero-section.tsx     ← Main banner
│   ├── couple-introduction.tsx
│   ├── wedding-details-card.tsx
│   ├── event-schedule.tsx
│   ├── venue-information.tsx
│   ├── gallery-preview.tsx
│   ├── rsvp.tsx
│   ├── closing-message.tsx
│   └── music-player.tsx
└── components/
    ├── letter-animation.tsx ← Opening animation
    └── navigation-button.tsx
```

---

Good luck with your wedding invitation! 💕
