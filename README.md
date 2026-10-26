# Business Websites 10 — Premium Portfolio Collection

**Live index:** https://umar3767.github.io/business-websites-10/

Ten independent static RU/UZ portfolio website concepts, each with four primary pages plus a 404 page. They are **fictional demonstration brands**, not operating businesses.

## What is implemented
- Ten different responsive art directions, compositions, color systems, UI details and photography selections.
- Eight independently sourced photo references per brand (80 total), requested at responsive sizes; original local SVG designs are automatic fallback on network or image errors.
- Existing service filters, calculators, contact preparation, shopping-cart interaction where present.
- Defensive local storage handling; RU/UZ switch preserved throughout navigation.
- Collection landing page styled as a premium editorial gallery.
- Static tests, 150 browser scenario runs across Chromium, Firefox, WebKit, Android and iPhone **emulations**, photo URL audits and visual-screenshot gallery workflow.

## Run local
Start a static HTTP server from the repository root:
```sh
python3 -m http.server 4173
```
Visit http://localhost:4173/

Run checks with Node.js 22:
```sh
node --test tests/quality.mjs
npm install --no-save @playwright/test@1.55.0
npx playwright install chromium firefox webkit
npx playwright test
```

## Source and edits
Each `NN-site/content/site-data.js` contains the business data, language text, services and contacts. Each `NN-site/content/photography.js` contains that site's editorial photo IDs. Do not put private API tokens in these public files.

## Before publishing for a *real* business
Provide verified company name, contacts, address, service pricing, actual staff, legal/license details, photo clearances and approved order/booking integration. Never imply that a demo company exists or that example photos depict the customer's actual work. Confirm licenses and recognizable-person releases for each photo. See `ASSET_MANIFEST.md` and `DEPLOY_CHECKLIST.md`.

All sites remain separately deployable as static folders. Payment systems, a real appointment backend, CRM and actual customer enquiry delivery are **not** present without integration and setup.
