# Thespian Theater

Marketing site for a fictional 120-seat drama troupe in Colombo, built with
[Next.js](https://nextjs.org) 16 (App Router), React 19, and Tailwind CSS 4.

A single-page landing experience with a dark theatrical theme: hero section,
featured production, ensemble story, a 3D depth carousel of productions, team
grid, showtimes, and footer.

## Getting started

### Prerequisites

- Node.js 18+ (developed on Node 24)
- npm, yarn, pnpm, or bun

### Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint via `eslint-config-next` |

### Deploy

Deploys to Vercel with no configuration — the default Next.js setup. Any
platform that runs `npm run build` and serves `.next` will work.

## Sections

| Anchor | Content |
| --- | --- |
| `#how-it-works` | Featured upcoming production with venue, showtime, and date cards |
| `#about` | Ensemble story, founding date, artistic director signature |
| `#start` | Productions carousel — vertical 3D card stack |
| `#team` | Four ensemble member cards |
| `#events` | Showtimes list with reserve-seat flow |
| `#contact` | Footer |

## The productions carousel

The carousel is the most involved piece. It renders all six production cards
absolutely positioned and derives each card's position from `currentProduction`
using modular index arithmetic, so navigation wraps in both directions.

Three states drive the visual treatment:

| Position | Transform | Opacity | Blur |
| --- | --- | --- | --- |
| Center | `translateY(0) scale(1)` | `1` | none |
| Above | `translateY(-245px) rotate(-22deg) scale(0.78)` | `0.45` | `5px` |
| Below | `translateY(245px) rotate(22deg) scale(0.78)` | `0.45` | `5px` |
| Stacked | `translateY(±420px) rotate(±35deg) scale(0.55)` | `0` | `12px` |

Input is handled three ways: mouse wheel, touch swipe, and clicking the offset
cards. Wheel and swipe are both throttled so a single trackpad flick does not
skip through the whole set — the wheel handler ignores input within 450 ms of
the last accepted event, and the swipe handler requires a 35 px vertical delta.

Cards that are off-stack get `pointerEvents: 'none'` so they cannot be clicked
through to.

## Theming

`app/globals.css` defines the palette as CSS custom properties, consumed by
semantic utility classes:

| Variable | Value | Purpose |
| --- | --- | --- |
| `--bg-hero` / `--bg-yoga` / `--bg-footer` | `#0f131c` | Primary dark sections |
| `--bg-meals` / `--bg-events` | `#181f2e` | Alternating section background |
| `--brand-navy` | `#0a0e16` | Page base |
| `--text-main` | `#dfe2ee` | Body text |
| `--text-muted` | `#94a3b8` | Secondary text |
| `--accent-gold` | `#facc15` | Highlights, headings, spotlight accents |
| `--accent-amber` | `#f59e0b` | Secondary warm accent |

Applying `.bg-section-hero`, `.bg-section-meals`, `.bg-section-yoga`,
`.bg-section-events`, or `.bg-section-footer` sets the matching background.

Three glassmorphism helpers — `.glass-card`, `.glass-card-sm`, and
`.glass-pill` — combine a translucent fill, `backdrop-filter: blur()`, and a
faint white border. Two custom animations are available: `.animate-slow-spin`
(30s rotation, used on the star motifs) and `.animate-pulse-glow`.

Fonts load from Google Fonts via `<link>` tags in `app/layout.tsx`: **Plus
Jakarta Sans** for body text and **Caveat** for signature-style headings
(`.font-signature`).

## Project structure

```
app/
  layout.tsx     # Root layout, metadata, font links
  page.tsx       # Entire page (~1200 lines)
  globals.css    # Theme variables, glass helpers, animations
  favicon.ico
UI/
  code.html              # Standalone HTML prototype
  screen.png             # Reference screenshot
  Dark Blue/             # Earlier dark-blue variant of the design
public/            # Next.js default SVGs (file, globe, next, vercel, window)
```

Most of the page lives in `app/page.tsx` as a single client component. State is
local `useState`: `currentProduction` for the carousel, `reservedEvents` keyed
by event title for the reserve flow, `modalEvent` for the reservation modal, and
`mobileMenuOpen` for the mobile nav.

Images are hotlinked from Unsplash, so the page needs a network connection to
render photography.

## Notes

- `package.json` has `"private": true`, so npm will not let you publish this.
- Section anchor names (`#how-it-works`, `#start`, `#meals`, `#yoga`) are
  leftovers from an earlier restaurant-site iteration of the design. They are
  wired up and work, but the names no longer match the theater content.
- `UI/Dark Blue/screen.png` is not an image. It is a 28-byte text file
  containing `Image file failed to fetch` — a failed download, not a placeholder.

## License

This project is private and proprietary.