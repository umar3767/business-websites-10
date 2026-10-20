# NOIR / AUTO — detailing · Premium demo website

**Conceptual portfolio website, not an operating business.** Four independent, functioning pages plus 404; RU/UZ; keyboard-accessible interactive content. No backend, login, paid API, or external library required.

## Open

1. Open the folder in **VS Code**.
2. Install the free **Live Server** extension (if not already installed).
3. Right-click `index.html` → **Open with Live Server**. Vanilla ES modules do not load reliably from `file://` in every browser.
4. Browse all four pages. Click `UZ` / `RU` to switch the fully translated interface. The selection is saved in the browser.

## Publish independently

**Cloudflare Pages**: Create project → direct upload → drag this website folder's contents (root must contain `index.html`); deploy only after you authorize publication. **Netlify**: Drag-and-drop the contents of the website folder to a new Netlify site. **GitHub Pages**: push the website files to repository root, Settings → Pages → Deploy from branch. All links are relative, compatible with repository subpaths. Every site can be hosted independently.

## Customize before real-business use

Open `content/site-data.js` and change `brand`, `tag`, `headline`, `lead`, `services`, all `ru`/`uz` translations, `contacts.phone`, `contacts.whatsapp` (international digits only, no +), real social links, city/address, currency/pricing, real opening hours, and `demoMode`. Confirm all data and permissions before removing demo disclosures. Do not add medical details to enquiry text. Make sure configured phone and WhatsApp links match the owner. The demo contact form only prepares and copies a message; it does not transmit anything to a server. Online orders and payments are not implemented.

## Paths

- `index.html` — home
- `packages.html` — overview + interactive feature
- `method.html` — process / gallery / information
- `estimate.html` — prepared contact enquiry (plus basket or calculator where relevant)
- `styles.css` — site-specific design tokens and responsive art direction
- `app.js` — local event handlers, localization, accessibility
- `content/site-data.js` — all editable demo data
- `assets/` — original locally-created SVG illustration collection

## Scope

This is a finished **portfolio demo**, not a functioning CRM, medical appointment booking system, payment gateway, or real sales channel. Once accurate business data and verified contacts are supplied, it can be personalized for a real client.
