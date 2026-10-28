# SUNKING GROUP contact-email update — QA notes

## Updated files in this patch

- `_includes/footer.html`: displays `contact@sunkinggroup.org`; because the footer is a Jekyll include, it appears on every page that includes the shared footer.
- `contact/index.html`: displays a direct `mailto:` link, adds the email and contact point to the Organization structured data, and explains the form behaviour.
- `assets/site.js`: validates the contact form and prepares a draft email to `contact@sunkinggroup.org`. It does not falsely claim that a server submission has completed.
- `privacy/index.html`: documents the email-draft flow and adds the mailbox for privacy questions.
- `terms/index.html`: adds the public contact email while retaining a reminder to obtain legal review of jurisdiction clauses.
- `FORM-CONFIGURATION.md`: describes the current mailto-based flow and test steps.

## Repository cross-check

- Current repo has `_includes/header.html` and `_includes/footer.html`; the header already points to `/sunkinggrouplogo.png`.
- The root `sunkinggrouplogo.png` and `profile_of_prof_chaitanya_niphadkar.jpeg` assets are present in the repository.
- The leadership page in the current repo includes the portrait and the full quotation previously requested.
- The sitemap includes the main canonical pages and the Jekyll root/permalink layout is in use.
- The contact form previously stopped with an “endpoint not connected” message. It now creates an email draft instead; this is the most appropriate non-server solution for GitHub Pages.

## Checks run on this patch

- All updated email links use exactly `contact@sunkinggroup.org`.
- Contact page Organization JSON-LD parses as valid JSON.
- JavaScript syntax validation passes.
- ZIP archive integrity check passes.
- The email draft is not automatic delivery. A real HTTPS form provider/backend is still needed for server-side submissions and confirmation of delivery.

## Follow-up checks after deployment

- Commit the patch to `main` and wait for the Pages build to succeed.
- Open `/contact/`, test required-field validation and test the email draft in a browser with a configured mail application.
- Confirm that a message reaches the mailbox.
- The homepage already has Organization structured data for the logo; the shared footer now adds the matching Organization email/contact point on every page using the same `@id`, so structured data consumers can consolidate the entity properties.
