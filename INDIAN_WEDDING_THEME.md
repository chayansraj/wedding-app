# Indian Wedding Theme - Quick Setup Template

## 🎨 Complete Indian Wedding Color Palette

Copy and paste these colors to apply throughout the app:

```
Primary (Main Color): #8B0000 (Deep Maroon)
Secondary (Accent): #FFD700 (Gold)
Tertiary (Highlights): #722F37 (Deep Red)
Background: #FFFAF0 (Floral White)
Text: #2D1B2E (Dark Plum)
Light Accent: #FFE4B5 (Moccasin/Light Gold)
```

### Tailwind Color Mapping for Indian Wedding:
```
rose-* → red-* (for deep reds)
pink-* → amber-* (for gold/warm tones)
purple-* → yellow-* or amber-*
white/gray-50 → amber-50 or yellow-50
```

---

## 📝 Sample Customization - Indian Wedding Config

### 1. Update `src/constants/wedding.ts`

```typescript
export const WEDDING_CONFIG = {
  date: new Date('2025-12-01T17:00:00'), // Your wedding date & time
  bride: {
    name: 'Priya',                          // Short name for logo
    fullName: 'Priya Sharma',               // Full name
    photo: '/assets/images/bride-circle.png', // Your bride photo
  },
  groom: {
    name: 'Arjun',                          // Short name for logo
    fullName: 'Arjun Kumar Singh',          // Full name
    photo: '/assets/images/groom-circle.png', // Your groom photo
  },
  venue: {
    ceremony: {
      name: 'Sri Venkateswara Temple',
      address: '123 Temple Road, New Delhi, India',
      time: '5:00 PM',
    },
    reception: {
      name: 'Taj Palace Banquet Hall',
      address: '456 Royal Avenue, New Delhi, India',
      time: '7:30 PM',
    },
  },
  // ADD THESE NEW FIELDS FOR INDIAN WEDDING DETAILS:
  familyDetails: {
    brideParents: "Mr. & Mrs. Sharma",
    groomParents: "Mr. & Mrs. Singh",
  },
  ceremonies: {
    mehendi: {
      date: new Date('2025-11-15T18:00:00'),
      venue: 'Sharma Residence, Delhi',
    },
    sangeet: {
      date: new Date('2025-11-28T19:00:00'),
      venue: 'Hotel Grand Palace, Delhi',
    },
    wedding: {
      date: new Date('2025-12-01T17:00:00'),
      venue: 'Sri Venkateswara Temple',
    },
  },
};
```

---

### 2. Update `src/app/globals.css` - Colors

```css
@import 'tailwindcss';

:root {
  /* Indian Wedding Theme */
  --background: #FFFAF0;           /* Floral White */
  --foreground: #2D1B2E;           /* Dark Plum */
  --primary: #8B0000;              /* Deep Maroon */
  --secondary: #FFD700;            /* Gold */
  --tertiary: #722F37;             /* Deep Red */
  --accent-light: #FFE4B5;         /* Moccasin */
  --font-poppins: 'Serif', 'Georgia', serif; /* Traditional serif for weddings */
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-secondary: var(--secondary);
  --color-tertiary: var(--tertiary);
}

body {
  background: linear-gradient(135deg, var(--background) 0%, #FFF8F0 100%);
  color: var(--foreground);
  font-family: 'Georgia', 'Garamond', serif;
}

* {
  font-family: 'Georgia', 'Garamond', serif;
}

/* Gold accent for highlights */
.accent-gold {
  color: var(--secondary);
}

.bg-accent-gold {
  background-color: var(--secondary);
}

/* Deep maroon primary */
.accent-maroon {
  color: var(--primary);
}

.bg-accent-maroon {
  background-color: var(--primary);
}
```

---

### 3. Update `src/locales/langs/en/home.json` - Indian Wedding Text

```json
{
  "letter": {
    "guest": "Honored Guest",
    "dear": "Dear",
    "you-are-invited": "You are cordially invited to the wedding of",
    "to": "to",
    "invitation-title": "Together with their families, inviting you to share in the sacred union",
    "invitation-quote": "Two families, one love, forever united...",
    "click-to-open-hover": "Click to open the invitation",
    "click-to-open": "Open the sacred invitation",
    "opening-the-invitation": "Opening your invitation..."
  },
  "closing-message": {
    "title": "We Cannot Wait to Celebrate",
    "quote": "With the blessings of our families, we invite you to be part of our joyous celebration. Your presence will make our wedding complete. Thank you for your love and support.",
    "with-love": "With warmest regards and blessings,",
    "hashtags": "#PriyaAndArjun2025 #ForeverTogether #SacredUnion",
    "contact": "Questions? Please contact us at wedding@example.com or +91-XXXXX-XXXXX"
  },
  "hero": {
    "welcome": "Together with their families request the honor of your presence at the marriage of",
    "together": "United in Love",
    "scroll-down": "Scroll Down",
    "scroll-to-explore": "Scroll to explore our love story",
    "view-details": "View Details"
  },
  "couple": {
    "title": "The Bride & Groom",
    "bride-description": "A woman of grace, elegance, and boundless love. Her smile lights up every room, and her heart is as beautiful as her spirit.",
    "groom-description": "A man of honor, integrity, and unwavering commitment. His kindness and devotion make every moment special.",
    "our-story": "Our Love Story",
    "story-text": "Our journey began when fate brought us together. From the first moment, we knew we had found our soulmate. Today, we celebrate the beginning of our forever together with all those we love.",
    "the-groom": "The Groom",
    "the-bride": "The Bride",
    "love-quote": "In you, I found my home, my love, and my forever."
  },
  "details": {
    "title": "Wedding Ceremony & Reception",
    "date": "Save the Date",
    "time": "Time",
    "day": "Day",
    "month": "Month",
    "year": "Year",
    "countdown": "Days Until Our Wedding",
    "hours": "Hours",
    "minutes": "Minutes",
    "seconds": "Seconds",
    "countdown-title": "Countdown to Our Forever",
    "countdown-subtitle": "Every moment brings us closer to the day we become one",
    "days-until": "days until we become husband and wife",
    "hours-until": "hours until the ceremony",
    "minutes-until": "minutes left to celebrate",
    "moment-arrived": "The moment has arrived! 🎉",
    "join-us-text": "With the blessings of our families, we invite you to witness the sacred union of our hearts",
    "mark-calendar": "Mark your calendar 📅",
    "add-to-calendar": "Add to Calendar",
    "message": "Save this auspicious date! Add this sacred event to your calendar so you don't miss this joyous celebration.",
    "ceremony": "Wedding Ceremony",
    "get-directions": "Get Directions",
    "reception": "Reception & Feast"
  },
  "schedule": {
    "title": "Order of Ceremonies",
    "guest-arrival": "Guest Arrival & Baraat Reception",
    "welcome-drinks": "Welcome with traditional welcome",
    "wedding-ceremony": "Sacred Wedding Ceremony (Vivah)",
    "vows": "Sacred Vows & Rituals",
    "photography": "Candid Moments & Photography",
    "welcome-drink": "Refreshments & Meet & Greet",
    "reception-begins": "Reception Festivities Begin",
    "dinner-celebration": "Dinner & Celebration",
    "first-dance": "First Dance of the Couple",
    "special-moment": "A special moment together",
    "dancing-party": "Dance & Celebration Continues",
    "celebration-continues": "Let the celebration continue!",
    "send-off": "Farewell & Blessings",
    "sparkler-farewell": "Traditional Farewell with Blessings"
  },
  "venue": {
    "title": "Venue Details",
    "ceremony-details": "Wedding Ceremony",
    "reception-details": "Reception & Grand Feast",
    "address": "Address",
    "time": "Time",
    "dress-code": "Dress Code: Traditional Indian Attire",
    "accommodation": "Nearby Accommodations",
    "parking": "Ample parking available"
  },
  "gallery": {
    "title": "Moments of Us",
    "subtitle": "Our journey in photographs",
    "view-more": "View More Photos"
  },
  "rsvp": {
    "title": "RSVP",
    "subtitle": "Please let us know if you can join us",
    "name": "Your Name",
    "email": "Your Email",
    "guests": "Number of Guests",
    "dietary": "Dietary Preferences",
    "vegetarian": "Vegetarian",
    "non-vegetarian": "Non-Vegetarian",
    "vegan": "Vegan",
    "submit": "Confirm Attendance",
    "success": "Thank you! Your RSVP has been received. We look forward to celebrating with you!",
    "message": "We'd love to know if you can make it! Please respond by December 1st"
  }
}
```

---

## 🎨 Hero Section - Indian Wedding Version

### Edit `src/sections/home/components/hero-section.tsx` - Color Changes

Replace these gradient colors:

```typescript
// OLD (Current):
className="h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-purple-100"

// NEW (Indian Wedding):
className="h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-red-50"
```

And these decorative blobs:

```typescript
// OLD:
<div className="absolute -top-40 -right-40 w-80 h-80 bg-rose-200/30 rounded-full blur-3xl"></div>
<div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl"></div>
<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl"></div>

// NEW (Indian Wedding):
<div className="absolute -top-40 -right-40 w-80 h-80 bg-red-200/30 rounded-full blur-3xl"></div>
<div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-200/30 rounded-full blur-3xl"></div>
<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-200/20 rounded-full blur-3xl"></div>
```

And gradient text:

```typescript
// OLD:
<span className="block bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">

// NEW:
<span className="block bg-gradient-to-r from-red-700 to-amber-600 bg-clip-text text-transparent">
```

---

## 🌹 Add Ornamental Dividers

### Create `src/components/ornamental-divider.tsx`:

```typescript
'use client';

export const OrnamentalDivider = () => {
  return (
    <div className="flex items-center justify-center gap-4 my-8">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-amber-400"></div>
      <div className="text-amber-600 text-2xl">✦</div>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-amber-400"></div>
    </div>
  );
};
```

Use it in sections like:
```typescript
import { OrnamentalDivider } from '@/components';

// In your component:
<OrnamentalDivider />
```

---

## 🎵 Add Background Music

### 1. Upload your song
- Place Indian wedding music in: `public/assets/audio/wedding-music.mp3`
- Recommended: Classical Indian instrumental or traditional wedding songs

### 2. Update `src/sections/home/components/music-player.tsx`

```typescript
// Change the audio src to:
<audio src="/assets/audio/wedding-music.mp3" ref={audioRef} />

// Change button colors from rose to maroon/gold
className="bg-red-700 hover:bg-red-800"  // Instead of rose-500
```

---

## 📱 Pre-wedding Ceremonies Section

### Create `src/sections/home/components/ceremonies.tsx`:

```typescript
'use client';

import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';

export const CeremoniessSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const ceremonies = [
    {
      name: 'Mehendi',
      date: 'November 15, 2025',
      time: '6:00 PM',
      venue: 'Sharma Residence',
      description: 'Celebration with henna, music, and dance',
      color: 'from-red-500 to-amber-500',
    },
    {
      name: 'Sangeet',
      date: 'November 28, 2025',
      time: '7:00 PM',
      venue: 'Hotel Grand Palace',
      description: 'Evening of songs, dance, and merriment',
      color: 'from-amber-500 to-yellow-500',
    },
    {
      name: 'Wedding',
      date: 'December 1, 2025',
      time: '5:00 PM',
      venue: 'Sri Venkateswara Temple',
      description: 'Sacred union of two souls',
      color: 'from-red-700 to-red-900',
    },
  ];

  return (
    <section ref={ref} id="ceremonies" className="py-20 px-4 bg-amber-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif text-center text-red-700 mb-16">
          Our Wedding Ceremonies
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ceremonies.map((ceremony, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
              transition={{ delay: idx * 0.2 }}
              className={`bg-gradient-to-br ${ceremony.color} text-white p-8 rounded-lg shadow-lg`}
            >
              <h3 className="text-2xl font-serif mb-4">{ceremony.name}</h3>
              <p className="mb-2"><strong>Date:</strong> {ceremony.date}</p>
              <p className="mb-2"><strong>Time:</strong> {ceremony.time}</p>
              <p className="mb-4"><strong>Venue:</strong> {ceremony.venue}</p>
              <p className="text-sm italic">{ceremony.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
```

---

## 🛍️ Add Dress Code Section

### Add to home view:

```typescript
<section id="dress-code" className="py-16 px-4 bg-gradient-to-r from-red-50 to-amber-50">
  <div className="max-w-4xl mx-auto text-center">
    <h2 className="text-3xl font-serif text-red-700 mb-8">Dress Code</h2>
    <p className="text-xl text-gray-700 mb-6">
      We request our guests to wear traditional Indian attire for the wedding ceremony
    </p>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-white p-4 rounded-lg shadow">
        <p className="text-sm font-semibold">👰 Saree/Lehenga</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <p className="text-sm font-semibold">🤵 Sherwani/Kurta</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <p className="text-sm font-semibold">🎀 Jewelry</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <p className="text-sm font-semibold">🌹 Colors: Red, Gold, Maroon</p>
      </div>
    </div>
  </div>
</section>
```

---

## ✅ Indian Wedding Customization Checklist

- [ ] Update couple names in `wedding.ts`
- [ ] Update wedding date and venues
- [ ] Update all text in `home.json` to Indian wedding context
- [ ] Change colors from rose/pink to maroon/gold in `globals.css`
- [ ] Update couple photos in `public/assets/images/`
- [ ] Add ornamental dividers in sections
- [ ] Add pre-wedding ceremonies section (Mehendi, Sangeet)
- [ ] Add dress code section
- [ ] Change music to Indian wedding songs
- [ ] Update RSVP with vegetarian/non-vegetarian options
- [ ] Add family names/parents names
- [ ] Add local address/directions
- [ ] Test on mobile devices
- [ ] Deploy to hosting platform

---

Good luck with your beautiful Indian wedding invitation! 🙏💕

If you need help implementing any of these changes, refer back to the main CUSTOMIZATION_GUIDE.md file.
