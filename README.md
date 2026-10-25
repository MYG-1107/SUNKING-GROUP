# SUNKING GROUP website — `sunkinggroup.org`

A responsive multi-page static website built for GitHub Pages. It reorganises education, research, training, consulting, leadership and programme information under the **SUNKING GROUP** name.

## What's included

- Home page, About, Education and Research, Programmes, Training, Consulting, Leadership and Contact pages.
- Detailed programme summaries for the DBA category and online MBA category.
- Privacy notice, terms of use and a helpful 404 page.
- `FORM-CONFIGURATION.md` and `QA-VALIDATION-REPORT.md` with configuration and validation notes.
- Clean public URLs such as `/about/` and `/programmes/` so navigation labels do not expose `.html` filenames.
- Redirect compatibility files for earlier `.html` URLs. Internal links and the sitemap use the clean URLs.
- Page-specific SEO titles and meta descriptions, canonical URLs, Open Graph/Twitter sharing tags, JSON-LD structured data, `robots.txt`, `sitemap.xml`, favicon and social image.
- Responsive styling, accessible navigation, skip link, focus states, reduced-motion support and a mobile menu.
- No legacy-brand mailbox addresses are included anywhere in the site package.

## Upload to the existing repository

1. Download and extract `sunkinggroup-refined.zip`.
2. Open the existing repository `MYG-1107/SUNKING-GROUP` on GitHub.
3. Replace the root files and folders with the extracted contents. Make sure the new `about/`, `education/`, `programmes/`, `training/`, `consulting/`, `leadership/`, `contact/`, `privacy/` and `terms/` folders are at the repository root beside `index.html`.
4. Keep `CNAME` set to `sunkinggroup.org`, `.nojekyll` at the root, and GitHub Pages deploying from branch `main` and folder `/(root)`.
5. Commit all changes and wait for the GitHub Pages deployment workflow to finish successfully.
6. Verify `https://sunkinggroup.org/`, `https://sunkinggroup.org/about/`, `https://sunkinggroup.org/programmes/`, `/robots.txt` and `/sitemap.xml` in a browser.

Do not upload just the ZIP file, and do not leave the files inside an additional nested folder. `index.html` must stay at the repository root.

## Required configuration before production

### 1. Connect the enquiry form

GitHub Pages does not run server-side form handlers. The form is deliberately not wired to an invented email address or fake submission endpoint. In `assets/site.js`, set `FORM_ENDPOINT` to an approved HTTPS endpoint from a form provider or your own backend, for example the endpoint issued by your organisation's Formspree account. Configure the endpoint to accept `name`, `email`, `phone`, `interest`, `message` and the honeypot field; then test successful and failed submissions. If you choose to publish a new group email or phone number, confirm it with the manager first and add it consistently to the Contact page and structured data only after approval.

### 2. Review claims and programme information

Some course labels and indicative durations are drawn from published programme materials. Before promotion, confirm current availability, the awarding institution, exact qualification title, admission criteria, fees, refund terms, delivery mode and official evidence for recognition or accreditation. The programme pages include visible cautions not to treat summary listings as confirmation of an active partnership or current intake.

The leadership page includes a summary of published biographical claims; confirm current qualifications, roles, awards, memberships and external profile links before launch. Testimonials and unverified numerical claims are intentionally not reproduced as approved facts.

### 3. Approve legal pages

`privacy/` and `terms/` are working drafts. Obtain review from the organisation's responsible person/legal adviser and update them once the form service, privacy contact and governing-law requirements are known.

## SEO launch sequence

1. Confirm the HTTPS certificate is active and **Enforce HTTPS** is enabled in GitHub Pages.
2. Verify the domain property in Google Search Console using the TXT record Google supplies.
3. Submit `https://sunkinggroup.org/sitemap.xml` in Search Console.
4. Inspect important clean URLs with URL Inspection; request indexing where appropriate.
5. Check mobile layout, keyboard navigation, form submission, all internal links, 404 behaviour and the live sitemap after deployment.
6. Publish original, useful service content and real case studies or testimonials only when authorised and verifiable. SEO cannot guarantee top position; ranking depends on quality, competition, authority and search systems over time.

## Technical notes

- Static HTML, CSS, vanilla JavaScript and one locally generated social preview image; no build tools or JavaScript libraries are required.
- All internal navigation uses clean directory paths. Redirect files preserve earlier `.html` addresses and are marked `noindex`.
- The 404 page uses `noindex` and is excluded from the sitemap.
