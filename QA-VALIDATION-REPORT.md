# SUNKING GROUP website — QA validation report

## Scope

The refined package reorganises the public-facing content into clean, user-friendly paths and updates the visual system for desktop and mobile use. Included content covers the group overview, mission, vision and values; education and experiential learning; certificate, diploma, bachelor, master, MBA and DBA categories; SSBM programme listings; an online MBA summary; leadership training; team-building topics; consulting categories; leadership profile and external references; contact form; privacy notice; terms; and 404 handling.

## Automated checks completed

- ZIP archive integrity test passed.
- JavaScript syntax check passed with Node.js.
- All 12 canonical URLs in the sitemap were parsed from valid XML.
- All 12 indexable HTML pages have a unique title, a meta description, a canonical URL, one H1 and parseable JSON-LD.
- Internal local link checks found no missing local destinations.
- No visible anchor labels expose `.html` filenames. Navigation uses clean paths such as `/about/` and `/programmes/`.
- A text scan found no legacy brand strings, old-source domain references, email-launch links or email addresses in the package.
- `404.html` is marked `noindex` and excluded from the sitemap. Legacy `.html` files are `noindex` redirects to clean paths.
- Social preview artwork and logo are self-hosted in the repository.

## Shared includes and analytics update

- Every canonical content page and the custom 404 page references the same `_includes/header.html` and `_includes/footer.html`; there are no duplicated page-specific navigation/footer blocks in those page templates.
- Every canonical content page and the 404 page references `_includes/google-tag.html` once inside `<head>`. That include contains the supplied Google tag code for container `GTM-PV8P6DSV`.
- The Open Graph and Twitter cards use the repository's 1200 × 630 `assets/og-image.png`; the site favicon and Organization structured-data logo continue to use `/sunkinggrouplogo.png`.
- The privacy notice now identifies the GTM container and explains that the data actually collected depends on the tags configured and published within Tag Manager.
- Legacy `.html` files are intentionally small, `noindex` redirects to canonical directory URLs; they are not separate content pages and do not carry their own navigation/footer.
- `.nojekyll` is absent, allowing GitHub Pages/Jekyll to process Liquid includes.
## Human review still required

- The site should be tested in real mobile and desktop browsers after deployment; this repository review is not a substitute for physical-device testing.
- Verify `GTM-PV8P6DSV` with Google Tag Assistant. Confirm a GA4 tag is configured and published inside the Tag Manager container before expecting GA4 events.
- The contact route opens a pre-addressed email draft to `contact@sunkinggroup.org`; the visitor must send it. This is not a server-side submission service.
- Management should verify the current programme availability, awarding institution, duration, fees, entry rules, recognition/accreditation statements, external affiliations, legal entity details and current leadership credentials before publication.
- The profile photo and unverified testimonials were not copied into the new site; use approved assets and verified testimonials only. Numerical marketing claims that could not be independently confirmed were not republished as facts.
- Privacy and Terms pages are drafts requiring management/legal approval.
- Search ranking and indexing cannot be guaranteed by source files alone. Verify the domain and submit the sitemap in Google Search Console after HTTPS and deployment have been confirmed.


## Shared header/footer update

- Added `_includes/header.html` and `_includes/footer.html` as single maintenance points shared across the main page templates.
- Added `_config.yml` and front matter on all rendered pages so GitHub Pages/Jekyll expands those includes.
- Removed `.nojekyll` from the package; delete the old root `.nojekyll` from the existing repository if it remains.
- Repointed the header, footer, homepage artwork, favicon, Apple touch icon and social preview metadata to `/sunkinggrouplogo.png`. The logo binary was already present in the current repository and is intentionally referenced in place rather than duplicated in this ZIP.
- Live deployment needs to be checked after commit; local source validation cannot prove GitHub Pages has completed a successful rebuild.
