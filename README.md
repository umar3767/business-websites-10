# Business Websites 10 — Portfolio demos

10 independently publishable static websites, four HTML pages each, RU/UZ content with original graphics and niche-specific JavaScript interactions. These are **fictional demonstration brands**, not operating businesses. All contact information, sample prices, offerings, personnel and legal details must be configured with verified business data before any commercial use.

## Preview

- [All 10 demos](./index.html)
- Each project lives in a self-contained folder, e.g. `01-dental/`.
- No build or paid services are needed.
- JavaScript ES modules require serving over HTTP rather than opening via `file://`. Use VS Code's Live Server for local preview.

## Publish all 10 with one GitHub Pages site

1. Sign into GitHub and create a **public** repository named `business-websites-10` (do not initialize it with a README).
2. Open GitHub Desktop and **File → Clone repository**. Clone the empty repository.
3. Copy **all the contents of this extracted folder** into the cloned repository's root, including the `index.html` file and all ten numbered directories. Do not nest this entire folder inside another folder.
4. In GitHub Desktop, **Commit to main** and **Push origin**.
5. In your GitHub repository open **Settings → Pages → Build and deployment → Deploy from a branch → main → / (root)**. Save.
6. GitHub will display the published site address in the Pages section when deployment is complete. It will typically look like `https://YOUR_USERNAME.github.io/business-websites-10/`. Substitute your actual account/repository name.

The main address opens the catalog; individual sites open under `.../01-dental/` through `.../10-flower-shop/`. GitHub Pages provides *one project* with *ten independent navigable demos* (not ten separate repository domains). Each numbered folder can later be moved into its own repository without changing its internal asset paths.

## GitHub browser upload alternative

Use **Add file → Upload files**, dragging files and folders from the extracted directory, possibly in several batches if GitHub's browser file-count cap is reached. Preserve exact folder paths. Commit all uploads to `main`, then enable Pages as in step 5. GitHub Desktop is usually easier for uploading 200+ files.

## Notes

- No uploads or deployment are implied by inclusion of these files; public publishing needs GitHub account permissions.
- The visual artwork is original SVG illustration, not licensed editorial photography.
- Each project's `content/site-data.js` is the only config for business details and both languages.
- See each project's `README.md`, `PUBLISH_CHECKLIST.md`, and `TEST_REPORT.md` for details and known limitations.
