# Contact form configuration

The site is static and does not include a server-side form handler. To keep the public site free of unapproved mailbox addresses and avoid pretending a form works when it does not, the form is intentionally unconnected by default.

## Before enabling it

1. Get approval from the manager for a form provider or the organisation's own backend.
2. Create an HTTPS form endpoint with that provider and configure notifications and spam protection. Do not publish a personal or unapproved email address in the site source.
3. Open `assets/site.js` and replace the empty `FORM_ENDPOINT` constant with the provider-issued HTTPS endpoint.
4. Check that the endpoint accepts the fields `name`, `email`, `phone`, `interest`, `message` and the optional `website` honeypot.
5. Submit a test enquiry and verify the notification reaches the authorised team. Test invalid fields, network failure, spam handling and mobile browsers.
6. Update `privacy/index.html` with the provider's name, data processing purpose, retention and any required consent text. Have the organisation approve the final notice.
7. Commit the changes and re-check the live contact page. The form status message must confirm success only after the endpoint responds successfully.

Until those steps are complete, the form will display a clear message that online submission is not yet connected. This is intentional; the live site should not imply a message was delivered when it was not.
