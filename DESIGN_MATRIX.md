# BUSINESS WEBSITES 10 — PREMIUM ART DIRECTION MATRIX

Each brand now has its **own CSS override layer**, responsive composition and eight non-repeating editorial photo source references. The ten sites keep independent assets/config/routes.

| Folder | Brand | Visual system | Hero composition | Gallery and cards | Accent |
|---|---|---|---|---|---|
| 01-dental | VELA DENT | Calm Precision | off-axis pale architecture / curved photo | staggered clinical service cards | mist teal |
| 02-barbershop | MARCH / 09 | Modern Heritage | editorial poster, oversize display text | grayscale portraits, square dividers | copper rust |
| 03-beauty-salon | MUSE ATELIER | Soft Editorial | soft fashion didone, elliptical portrait | staggered fashion portrait columns | dusty plum |
| 04-car-detailing | NOIR / AUTO | Obsidian Performance | cinematic full-bleed automotive imagery | technical dark cards, lime highlights | acid lime |
| 05-learning-center | LOOP ACADEMY | Curious Futures | playful rotated image, dot grid | colorful soft bento cards | coral |
| 06-cleaning | HUSH HOME | Air & Order | organic soft architectural arch | calm rounded service cards | sage |
| 07-auto-service | TORQ / WORKS | Industrial Trust | condensed engineering typography | gridded industrial panels | safety orange |
| 08-furniture | FORME OBJECTS | Living Objects | furniture gallery with expanded vertical image | transparent product-gallery cards | brass |
| 09-renovation | STRATA ROOMS | Architectural Journal | strict typographic architectural split | vertical architectural photo cards | terracotta |
| 10-flower-shop | PETAL / PARADE | Botanical Joy | organic tilted botanical photo | colorful playful object cards | coral / lilac |

## Structure
- Existing per-site `styles.css`: base component styles + brand-specific premium override.
- Existing per-site `app.js`: shared resilient functionality, responsive photography loading and SVG fallback.
- New per-site `content/photography.js`: 8 unique Unsplash photo IDs.
- Original SVGs: remain bundled and functional offline.
- Root `index.html` and `ALL_SITES_INDEX.html`: upgraded editorial collection preview, loaded progressively via `catalog.js`.

## Design quality notes
These are independent art directions, not independent software implementations; shared accessibility and interaction semantics are maintained deliberately. New visuals should be evaluated in the visual screenshot gallery before calling them finished for individual clients. Actual photos of staff, premises and completed work require the customer's own verified media.
