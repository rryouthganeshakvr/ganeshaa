# Sri Ganesha Kovvur — Content Editing Guide

## How to Update Content

All website content lives in `src/content/`. You never need to touch component files to update text, images, or data.

---

## Files & What They Control

| File | What You Can Edit |
|------|------------------|
| `src/content/settings.ts` | Site name, social links, contact info, nav links |
| `src/content/hero.ts` | Hero headline, tagline, buttons, stats |
| `src/content/about.ts` | Organization description, mission/vision/values cards |
| `src/content/teachings.ts` | Daily teachings, mantras, spiritual quotes |
| `src/content/events.ts` | Festival events, dates, descriptions |
| `src/content/gallery.ts` | Gallery images and categories |
| `src/content/testimonials.ts` | Devotee testimonials and reviews |
| `src/content/donation.ts` | Bank details, UPI ID, donation causes |
| `src/content/contact.ts` | Contact form labels, info cards |

---

## Common Edits

### Update Social Media Links
Edit `src/content/settings.ts`:
```ts
social: {
  instagram: 'https://www.instagram.com/YOUR_HANDLE',
  youtube: 'https://www.youtube.com/@YOUR_CHANNEL',
  email: 'your@email.com',
}
```

### Add a New Event
Edit `src/content/events.ts` — add to the `events` array:
```ts
{
  id: 6,
  title: 'New Event Name',
  subtitle: 'Event Subtitle',
  date: 'January 15, 2026',
  time: '9:00 AM — 6:00 PM',
  duration: '1 Day',
  location: 'Near Water Tank, Kovvur',
  description: 'Event description...',
  highlights: ['Highlight 1', 'Highlight 2'],
  category: 'Special Event',
  featured: false,
  color: 'gold',
}
```

### Add Gallery Images
Edit `src/content/gallery.ts`. Replace `gradient` with an actual image path:
```ts
{
  id: 10,
  title: 'My Photo Title',
  category: 'Festival',
  aspect: 'square',      // 'square' | 'tall' | 'wide'
  imageSrc: '/images/my-photo.jpg',   // add this field
  gradient: 'from-amber-900 to-orange-800',  // fallback
  placeholder: '🐘',
}
```
Then in `Gallery.tsx`, replace the gradient div with `<img src={item.imageSrc} />`.

### Update Bank Details
Edit `src/content/donation.ts`:
```ts
bankDetails: {
  accountName: 'Round Ramalayam Youth Kovvur',
  accountNumber: 'YOUR ACTUAL ACCOUNT NUMBER',
  ifscCode: 'YOUR IFSC CODE',
  upiId: 'yourupi@bank',
}
```

### Add a Testimonial
Edit `src/content/testimonials.ts` — add to the `testimonials` array.

---

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The production build goes to `dist/` — deploy this folder to any static host (Netlify, Vercel, GitHub Pages, Hostinger, etc.).

---

## Project Structure

```
src/
├── content/          ← EDIT THESE to update content
├── components/
│   ├── sections/     ← One file per page section
│   ├── layout/       ← Navigation + Footer
│   ├── ui/           ← Reusable UI components
│   └── effects/      ← Particle field, orbs, scroll bar
├── hooks/            ← Scroll animation hook
├── utils/            ← Framer Motion animation presets
├── index.css         ← Global styles & glassmorphism
└── App.tsx           ← Root component
```
