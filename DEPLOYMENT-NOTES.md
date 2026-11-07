# Deployment notes — shared site includes and analytics

1. Keep the repository's `CNAME` file set to `sunkinggroup.org` and publish GitHub Pages from `main` and `/(root)`.
2. **Do not add a `.nojekyll` file.** GitHub Pages must run Jekyll so it can render the shared Liquid includes under `_includes/`.
3. Keep `sunkinggrouplogo.png` and `profile_of_prof_chaitanya_niphadkar.jpeg` at the repository root; the shared header/footer, favicon and leadership page reference them.
4. The navigation is maintained in `_includes/header.html`; the footer is maintained in `_includes/footer.html`. Every canonical content page and the 404 page includes both files.
5. The Google tag is maintained in `_includes/google-tag.html`. Every canonical content page and the 404 page includes it inside the HTML `<head>`. The container ID is `GTM-PV8P6DSV`.
6. After commit, wait for the Pages workflow to finish. Open the homepage and two inner pages, view page source, and confirm the rendered header/footer and Google tag are present exactly once. No raw `{% include ... %}` statements should be visible in the rendered HTML.
7. Use [Google Tag Assistant](https://tagassistant.google.com/) to verify that the GTM container is detected. If Google Analytics 4 data collection is required, confirm that a GA4/Google tag is configured and published inside the GTM workspace. The website snippet alone only loads the container; it does not confirm the container has an active Analytics measurement tag.

Global header edits: `_includes/header.html`. Global footer edits: `_includes/footer.html`. Analytics tag edits: `_includes/google-tag.html`. Shared styling: `assets/site.css`.
