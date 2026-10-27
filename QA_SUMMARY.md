# QA SUMMARY — PREMIUM REDESIGN

## Verified checks as of October 26, 2026
- Static integrity suite: passed on GitHub Actions for premium branch.
- Browser scenario matrix: **150/150 passed** in Chromium desktop, Firefox desktop, WebKit desktop, Android Chromium and iPhone WebKit profiles on PR commit `36027dd8`. Run: https://github.com/umar3767/business-websites-10/actions/runs/40372154590
- Photo CDN availability: **80/80 reachable** after fixing seven broken references. Run: https://github.com/umar3767/business-websites-10/actions/runs/40372603321
- Distinct thematic palettes/design CSS: 10 out of 10; all JS modules parse.
- Pages confirmed by static checks: 40 content HTML files + 10 site 404 files.
- Current latest-head CI may differ after additional commits; rely on the latest workflow result to assess release readiness.

## Test scope
- 30 scenario definitions across 10 sites, run in five engine/device profiles.
- Home rendering, page-to-page navigation, RU/UZ toggling, external-photo error fallback to original SVG, narrow-screen document overflow.
- Responsive photograph sizes and unique photo reference IDs verified by static checks.
- Tests purposely block remote images during fallback scenarios; separate HEAD checks verify 80 remote CDN sources.

## Important limitations
- Simulated browsers/device profiles are **not physical testing** on every Android phone, iPhone or browser version.
- The 80 image HTTP checks verify availability only, not aesthetic relevance, origin permissions for identifiable people, exact Unsplash account source attribution, or future uptime.
- Lighthouse, comprehensive WCAG/manual screen reader and real-world forms/payments have **not** been validated by these checks.
- Backends, payment providers, real business staff/contacts, prices and legal/medical licenses remain unset.
- Final CSS screenshots must be visually reviewed; a passing selector test doesn't establish world-class aesthetics.

---

## October 27, 2026 — measurable quality pass (PR #2; not approved for production)

### Browser automation
- The existing 150 scenario instances previously passed in the October 26 run, but new changes require a fresh successful **latest-head** run.
- The new suite adds 33 scenario definitions covering a 10-brand keyboard/mobile menu matrix, three-photograph story galleries, explicit form labels, a robust flower cart, the TORQ service advisor and a 320px overflow check.
- Five configured browser/device profiles multiply these scenarios; passing a test counts only after the corresponding exact-commit workflow succeeds.
- Some historical intermediate October 27 runs failed due to test assumptions (preexisting three-card auto-service count and lazy images expected to have loaded without scrolling); the respective tests were corrected. Old failed runs must not be misrepresented as passed.
- Current authoritative branch: `premium-refinement-20261027`. Verify the newest run at `https://github.com/umar3767/business-websites-10/actions`.

### Lighthouse real measurement — 2026-10-27, commit `d09a954ee2252582f4dcc4a7da64b083d306dea2`
Measured using the added GitHub Actions Lighthouse workflow on localhost under its headless Chrome lab profile. **Scores are laboratory indicators, not verified real-user Core Web Vitals or guarantees**.

| Site | Performance | Accessibility | Best practices | SEO |
|---|---:|---:|---:|---:|
| 01-dental | 99 | 100 | 100 | 100 |
| 02-barbershop | 91 | 100 | 100 | 100 |
| 03-beauty-salon | 99 | 100 | 100 | 100 |
| 04-car-detailing | 98 | 100 | 100 | 100 |
| 05-learning-center | 98 | 100 | 100 | 100 |
| 06-cleaning | 98 | 100 | 100 | 100 |
| 07-auto-service | 99 | 100 | 100 | 100 |
| 08-furniture | 99 | 95 | 100 | 100 |
| 09-renovation | 97 | 95 | 100 | 100 |
| 10-flower-shop | 97 | 100 | 100 | 100 |

- Exact JSON artifact on successful run: `https://github.com/umar3767/business-websites-10/actions/runs/40449514868`.
- The last two accessibility contrast findings were identified in FORME OBJECTS (hero eyebrow/lead/index) and STRATA ROOMS (statement strip) and have **additional committed CSS fixes after that measurement**. New scores must be read from a subsequent run, not assumed.
- The 100/100 accessibility audit scores on other sites are not equivalent to full WCAG 2.2 AA certification; manual assistive-technology testing remains necessary.

### Real browser screenshots
- The premium visual-gallery workflow now creates 80 full-page images across ten brands, four routes per site, and desktop/mobile Chromium emulations.
- The run for commit `41fbc0f6e963fd5061aba1019a1d20e25bfdd6dd` completed successfully: `https://github.com/umar3767/business-websites-10/actions/runs/40449749410`.
- Visual inspection identified and corrected the oversized barbershop headline and very dark hero portrait. Other galleries remain subject to art-director review of appropriateness and independent asset rights.

### Outstanding release gates
- A complete, latest-commit cross-engine green suite.
- Independent visual/rights checking of all 80 Unsplash photos and, if appropriate, export of reviewed photos to local optimized assets.
- Manual WCAG audit and physical-device verification; error/timeout testing for real configured forms.
- Full client-specific verified details, contacts, prices, licences and integrations for real commercial operations.
- Review and approve PR #2, verify published GitHub Pages after merge. **This PR remains in review; main is not claimed updated.**
