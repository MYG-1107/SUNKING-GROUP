# SUNKING GROUP launch validation checklist

## Technical and deployment
- [ ] GitHub Pages action completes successfully after upload.
- [ ] `CNAME` contains exactly `sunkinggroup.org`.
- [ ] HTTPS works at `https://sunkinggroup.org/` and Enforce HTTPS is enabled.
- [ ] `/robots.txt` is accessible and points to the sitemap.
- [ ] `/sitemap.xml` is valid XML and lists clean, canonical URLs only.
- [ ] Every page and internal CTA works; legacy `.html` URLs redirect to clean paths.
- [ ] Page not found page returns the GitHub Pages 404 page and is marked `noindex`.

## SEO
- [ ] Every indexable page has a unique title and meta description.
- [ ] Every indexable page has a self-referencing canonical URL.
- [ ] JSON-LD parses and uses the current group brand and domain.
- [ ] Open Graph/Twitter metadata uses the local 1200 × 630 social image.
- [ ] No unintended `noindex`, stale hostnames or duplicate canonical paths.
- [ ] Google Search Console is verified and the sitemap is submitted.
- [ ] Inspect key URLs and monitor indexing/crawl reports over time.

## Brand and content
- [ ] The published site uses SUNKING GROUP as the primary identity.
- [ ] No legacy institute name, old-branded mailbox address or legacy source-domain link remains in the site package.
- [ ] The manager approves group description, legal entity statements and geographic claims.
- [ ] Programme listings, duration, recognition/accreditation, awarding body, fees and admission requirements are confirmed in writing.
- [ ] Leadership profile details, memberships, awards, patent references and external profile links are current and approved.
- [ ] No unverifiable testimonial or numerical marketing claim is published as fact.
- [ ] Privacy and Terms pages have legal/management approval.

## UX and accessibility
- [ ] Test mobile widths around 360px, 390px, 768px and desktop widths.
- [ ] Header, menu, buttons, footer, forms and headings do not overflow or truncate.
- [ ] Mobile menu opens/closes with button, link selection and Escape key.
- [ ] Keyboard users can see focus; the skip link works.
- [ ] Form labels, required fields and status messages are accessible.
- [ ] Colour contrast and text sizes are comfortable on mobile and desktop.
- [ ] Reduced-motion preference is respected.

## Contact form
- [ ] A manager-approved HTTPS form endpoint is configured in `assets/site.js`.
- [ ] Successful and failed submissions are tested.
- [ ] Notification and data retention are verified.
- [ ] Privacy notice is updated to identify the form service and data handling.
- [ ] No unapproved email address or phone number is added.

- [ ] Keep `/sunkinggrouplogo.png` at repository root; it is referenced throughout the shared header/footer and metadata.
- [ ] Delete the old `.nojekyll` file from repository root so GitHub Pages processes `_includes` and Liquid.
- [ ] Confirm the latest Pages build succeeds; inspect rendered source and verify `{% include ... %}` text is not visible.
- [ ] Make global header changes in `_includes/header.html` and global footer changes in `_includes/footer.html` only.
