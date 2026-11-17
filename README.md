# SUNKING GROUP website

Official website: [https://sunkinggroup.org/](https://sunkinggroup.org/)

This is a static Jekyll website hosted through GitHub Pages. The site brings together management education, programme information, professional training, consulting, leadership information and editorial resources.

## Main sections

- **Education and programmes:** undergraduate, postgraduate, certificate, diploma and doctoral research guidance, plus existing MBA and DBA summaries.
- **Training:** leadership development, workplace communication, emotional intelligence, team performance and change management.
- **Consulting:** business and management, people and HR, and education and research advisory.
- **Insights:** practical articles and research notes.
- **Stories:** publication standards for learner and client stories. Testimonials and measurable outcomes must be supported by evidence and permission.

## Shared site components

- `_includes/header.html` and `_includes/footer.html` provide site-wide navigation and footer content.
- `_includes/google-tag.html` initialises Google Tag Manager (`GTM-PV8P6DSV`).
- `_layouts/content.html` provides a reusable SEO-aware layout for new content pages.
- `assets/site.css` and `assets/site.js` contain shared presentation and interaction behaviour.

The contact form is designed for a static site: it prepares an email draft in the visitor's default mail application. It does not directly send, store or track the contents of an enquiry. Consultation and registration buttons therefore request contact; they do not confirm an appointment or enrolment.

## Build and quality checks

The project uses Jekyll. With Ruby and Jekyll 3.10 installed:

```bash
jekyll build --trace
python scripts/audit_site.py _site
```

The GitHub Actions workflow at `.github/workflows/site-quality.yml` runs the same build and static QA checks for pull requests and pushes to `main`. The audit validates page metadata, canonical URLs, Google Tag Manager, JSON-LD, navigation, image alt attributes, local references and sitemap entries.

## Publishing and verification

Before publishing programme or service claims, confirm current provider information, entry rules, fees, timelines, awarding arrangements and recognition. Add testimonials, case studies, learner achievements and metrics only after verifying the source and securing publication permission.
