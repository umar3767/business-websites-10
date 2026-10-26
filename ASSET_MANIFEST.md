# Photographic Asset Manifest — Premium Redesign

## Scope
Each `NN-site/content/photography.js` lists **8 distinct Unsplash CDN photo IDs**. Across 10 sites, there are 80 non-duplicated references. The app requests responsive 480/840/1200-pixel variants with `auto=format` and `q=80`, avoiding oversized photos on mobile screens.

## Rights and caveats
- Photos are requested from `https://images.unsplash.com/`. [Unsplash License](https://unsplash.com/license) generally permits free use on commercial websites, subject to terms.
- Selection of a photo ID is **not proof** that the file remains online, is appropriate for a specific service, or has every third-party/person/trademark release. Check each source photo before client handover.
- The originals under `assets/hero.svg` and `assets/piece-N.svg` are locally hosted fallback designs whenever an external photo does not load.
- These are illustrative portfolio concepts, **not evidence of completed work, clinic staff, real interiors, real clients, or verified outcomes**.
- Hotlinked image delivery means external CDN availability and a user's network can affect photography, although the authored SVG fallbacks remain.
- A fully self-contained commercial release should verify individual photo records and download/cache approved versions in the project, then replace external URLs.

## Per-site visual palette
| Site | Direction | Photographs |
|---|---|---:|
| 01-dental | Calm Precision / pale teal | 8 |
| 02-barbershop | Modern Heritage / black and copper | 8 |
| 03-beauty-salon | Soft Fashion Editorial / blush plum | 8 |
| 04-car-detailing | Obsidian Performance / graphite lime | 8 |
| 05-learning-center | Curious Futures / lavender coral | 8 |
| 06-cleaning | Air & Order / sage oat | 8 |
| 07-auto-service | Industrial Trust / concrete orange | 8 |
| 08-furniture | Living Objects / forest flax | 8 |
| 09-renovation | Architectural Journal / limestone | 8 |
| 10-flower-shop | Botanical Joy / lilac floral | 8 |

Each site's `content/photography.js` is the authoritative list of exact photo IDs. The app chooses one hero per page (four variants) and additional service/gallery images for content sections. `assets/hero.svg` and `piece-N.svg` are retained deliberately for error and offline fallback.

## Next validation before client delivery
1. Open all 80 actual source images and check thematic fit, availability, photographer attribution and third-party releases.
2. Replace any off-topic photo, then save the approved images locally.
3. Replace demonstration branding, phone numbers, prices, people, addresses, and legal information with **verified** client records.
4. Test actual submission endpoints with client approval, not mock requests.
5. Perform real-device checks beyond browser emulations.
