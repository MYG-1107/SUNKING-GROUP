# Deployment notes — shared header/footer

1. Upload the contents of this package to the root of `MYG-1107/SUNKING-GROUP` and commit to `main`.
2. **Delete the existing `.nojekyll` file from the GitHub repository root** if present. A normal upload does not delete it, and it prevents Jekyll from rendering `_includes/header.html` and `_includes/footer.html`.
3. Keep the existing root file `sunkinggrouplogo.png`; this package references it by absolute URL and does not duplicate its binary.
4. In Settings → Pages, continue deploying from `main` and `/(root)`.
5. Wait for the Pages build to finish, then check the Actions / Pages build log. Open the homepage and two inner pages; View Source should show the full header/footer HTML, not literal `{% include ... %}` tags.
6. Check mobile navigation and logo scaling on both light header and dark footer backgrounds.

Global header edits: `_includes/header.html`. Global footer edits: `_includes/footer.html`. Global styling: `assets/site.css`.
