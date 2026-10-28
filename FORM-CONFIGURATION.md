# Contact form configuration and behaviour

## Current behaviour

The website is hosted as a static GitHub Pages site, so it cannot process submissions on its own. The contact page now validates the required fields and opens a pre-addressed email draft to `contact@sunkinggroup.org` through the visitor’s default email application. The visitor must review and press Send; the site does not claim the message has been delivered automatically.

The shared footer and the contact, privacy, and terms pages display the approved mailbox. The Organization structured data on the contact, privacy and terms pages also includes this email address.

## Testing checklist

1. Open `/contact/` on desktop and mobile.
2. Submit with missing required fields; browser validation should stop the attempt.
3. Fill in a valid name, email, interest and message, then click **Send enquiry**.
4. Confirm the email application opens a draft addressed to `contact@sunkinggroup.org` and includes the submitted values in the body.
5. Confirm the visitor can still use the direct `mailto:contact@sunkinggroup.org` link if no email application opens.
6. Verify that a real message reaches the mailbox. A mailto link alone cannot verify delivery, and a user may have no email application configured.

## If you later need direct web submissions

Connect an approved HTTPS form service or backend. Configure spam prevention, notifications, retention, error states and privacy disclosures before enabling it. Update `assets/site.js` and `privacy/index.html` together. Never display a success state until the service confirms the submission.
