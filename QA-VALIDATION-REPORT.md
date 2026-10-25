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

## Human review still required

- The site should be tested in real mobile and desktop browsers after deployment; this package has not been tested across physical devices.
- The online form endpoint is intentionally not configured. See `FORM-CONFIGURATION.md`.
- Management should verify the current programme availability, awarding institution, duration, fees, entry rules, recognition/accreditation statements, external affiliations, legal entity details and current leadership credentials before publication.
- The profile photo and unverified testimonials were not copied into the new site; use approved assets and verified testimonials only. Numerical marketing claims that could not be independently confirmed were not republished as facts.
- Privacy and Terms pages are drafts requiring management/legal approval.
- Search ranking and indexing cannot be guaranteed by source files alone. Verify the domain and submit the sitemap in Google Search Console after HTTPS and deployment have been confirmed.
