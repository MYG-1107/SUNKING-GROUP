# SUNKING GROUP website — `sunkinggroup.org`

A responsive, multi-page static website prepared from the public content on [sunking-institute.com](https://sunking-institute.com/). It is designed for GitHub Pages and a custom apex domain. **Upload the contents of this folder to the repository root**, not just a nested folder containing these files.

## Included pages and files

- `index.html` — homepage and overview of education, training and consulting
- `about.html` — organisation overview, mission, vision and values
- `education.html` — experiential learning, certificates, diplomas, MBA, DBA and research areas
- `ssbm.html` — campus and online programme categories and the durations listed on the source site
- `training.html` — leadership, personal development and team-building topics
- `consulting.html` — consulting and training service areas
- `leadership.html` — founder/president profile, links to external reference pages
- `contact.html` — contact details and a static-site email-draft form
- `privacy-policy.html`, `terms.html`, `404.html`
- `assets/site.css`, `assets/site.js`, `assets/logo.svg`, `assets/og-image.png`
- `robots.txt`, `sitemap.xml`, `site.webmanifest`, `favicon.svg`, `.nojekyll`, `CNAME`

## Important implementation notes

1. **Contact form:** GitHub Pages serves static files; it does not run a server-side form handler. The contact form validates fields and opens the visitor's default email application with a prefilled draft to `sunking.group@sunking-institute.com`. The visitor must press Send. If you need true web-submission without an email app, connect a service such as Formspree or a company-owned backend, configure spam protection and privacy disclosures, then test it before publishing.
2. **Email addresses:** The package retains the four addresses currently shown on the source site: `sunking.group@sunking-institute.com`, `education@sunking-institute.com`, `consultants@sunking-institute.com` and `hr@sunking-institute.com`. Replace these only after the company confirms new-domain mailboxes are working.
3. **Founder photograph:** The leadership page currently loads its portrait from `https://sunking-institute.com/assets/images/chaitanya-niphadkar.jpeg`. Confirm permission and download an approved copy into this repo's `assets/` directory if you want image hosting to be fully self-contained; then update `leadership.html` to use the local path.
4. **Programme / legal verification:** The source site gives broad claims about programmes, durations, recognition, financial assistance, registrations and institutional relationships. Because public pages alone do not substantiate every claim, this rebuild avoids unverified student testimonials and avoids a blanket accreditation guarantee. Before launch, management should confirm current programme availability, awarding bodies, partner/affiliation wording, recognition/accreditation, exact durations, fees, transfer-credit claims, financial aid, registrations and legal page wording. The source leadership profile lists a different degree count from at least one other public profile, so credentials and memberships should be verified carefully. Do not promise the source site's generic testimonials unless the people and statements are genuine and authorised.
5. **Content migration:** All core areas visible on the source website have been carried into the new structure. Copy has been edited for readability and to reduce conflicting or overbroad claims; the two testimonials displayed on the source education page were deliberately not carried over pending verification.
6. **SEO:** Each page has a distinct title and meta description, canonical URL, Open Graph/Twitter metadata and structured data. `robots.txt` points to `sitemap.xml`. This setup improves discoverability but does not guarantee top rankings or instant indexing.
7. **Brand disambiguation:** Search results also use “Sun King” for a separate solar-energy business. The new website deliberately describes this brand as the education, training and consulting group to reduce confusion. Use the exact legal brand name and consistent descriptions throughout official profiles.

## How to publish with GitHub Pages

### A. Create the repository

1. Sign in to GitHub using the account that will own this company website.
2. Click **New repository**.
3. Suggested name: `sunkinggroup-website` (or the repository name selected by your manager).
4. For the simplest GitHub Free setup, make it **Public**. Add a README only if desired; if GitHub creates one, it can be replaced with this package's README.
5. Create the repository.

### B. Upload the site files

1. Download and extract `sunkinggroup-website.zip` on your computer.
2. Open the newly created repository and choose **Add file → Upload files**.
3. Open the extracted `sunkinggroup-website` folder on your computer and select **all files and folders inside it**. Ensure hidden files such as `.nojekyll` are included. Do not upload only the ZIP and do not put the files inside an extra nested folder.
4. Drag the selected items into GitHub's upload area. The repository root should contain `index.html`, `CNAME`, `robots.txt`, `sitemap.xml`, the other `.html` pages, and the `assets/` folder.
5. Add a commit message such as `Add SUNKING GROUP static website` and click **Commit changes**.

### C. Enable GitHub Pages

1. In the repository, go to **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select branch `main` and folder `/(root)`, then click **Save**.
4. Under **Custom domain**, enter `sunkinggroup.org` and save it. The root `CNAME` file is already included. Follow GitHub's current custom-domain verification guidance before adding DNS, where available.

### D. Configure DNS where the domain was purchased

Use these records for the apex/root domain `sunkinggroup.org` if the registrar lets you set DNS records directly. Remove conflicting default A/AAAA records first. DNS controls differ by provider, so verify with the registrar's interface and GitHub's current documentation.

| Type | Host/Name | Value | TTL |
|---|---|---|---|
| A | `@` | `185.199.108.153` | Default / 1 hour |
| A | `@` | `185.199.109.153` | Default / 1 hour |
| A | `@` | `185.199.110.153` | Default / 1 hour |
| A | `@` | `185.199.111.153` | Default / 1 hour |
| CNAME | `www` | `<your-github-username>.github.io` | Default / 1 hour |

Replace `<your-github-username>.github.io` with the account or organisation's GitHub Pages host, not a repository path. If the site is under a GitHub organisation, use that organisation's `orgname.github.io`. GitHub also publishes optional IPv6 AAAA records in its documentation; add them only if you want IPv6 and can manage DNS accurately. Prefer GitHub's official domain documentation if its instructions for your configuration differ.

DNS propagation can take time. Once the domain resolves, return to **Settings → Pages**, wait for the certificate status, and enable **Enforce HTTPS** when the option becomes available. Do not configure a wildcard DNS record.

### E. SEO launch checklist

1. Open `https://sunkinggroup.org/` and test the navigation on desktop and mobile.
2. Test every page, all email links, the contact-form mailto behaviour, the 404 page, and the HTTPS lock.
3. Confirm `https://sunkinggroup.org/robots.txt` and `https://sunkinggroup.org/sitemap.xml` load correctly.
4. Add the domain to Google Search Console and complete ownership verification using the method it provides.
5. In Search Console, submit `https://sunkinggroup.org/sitemap.xml`. Submission is a crawl hint, not a guarantee of indexing or ranking.
6. Use URL Inspection on the homepage and the most important service pages to request indexing after they are live.
7. Verify all contact emails, institutional relationships, program names/durations and legal claims with management before launch.
8. Monitor Search Console's indexing and performance reports; address coverage, canonical, mobile usability and structured-data issues that it reports.

## Technical QA included

- Semantic HTML landmarks, one primary heading on each page, skip link and responsive menu
- Mobile-first responsive CSS and reduced-motion support
- Unique titles/descriptions/canonical URL per page
- JSON-LD organisation, website and webpage structured data
- Sitemap and robots file
- Custom 404 page, favicon, OG image, manifest and `.nojekyll`
- Contact form input validation and transparent static-form messaging

## Updating content later

Edit the relevant `.html` file in GitHub (click the pencil icon) or upload a replacement file. If you change a page URL, update navigation links, the sitemap, canonical URL and any internal links in the same commit. If you change the domain, also update `CNAME`, canonical metadata, Open Graph URLs, JSON-LD IDs, `robots.txt` and `sitemap.xml`.
