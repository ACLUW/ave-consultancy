# AVE Consultancy website

A multi-page, dependency-free static website for GitHub Pages. Live at https://acluw.github.io/ave-consultancy/.

## Pages and features

15 content pages plus a custom 404 page: Home, five service pages, Services, About, How We Work, Navigator, Business Confidence, Contact, FAQs, Capability Overview and Privacy.

Search and filter service areas, compare up to three services, match a requirement locally, switch between client and partnership information, track a temporary diligence checklist and build a three-step enquiry brief. Briefs can be copied, downloaded or opened in an email application. The visitor decides whether to send the email; there is no submission backend or inbox integration.

## Content and branding

The supplied AVE interactive HTML, reimagined profile and strategic recommendations inform the public content. The original blue/green logo, founder portrait and category photographs are extracted from the supplied materials. Category photos are explicitly illustrative, not project records. No named projects, financial metrics, testimonials, licences or corporate registration numbers have been invented. Founder credentials are attributed to the supplied profile. Internal strategy documents and original draft documents are not published as downloads.

Business contact: aveconsultancy15@gmail.com / +234 806 409 8643 / Abuja, Nigeria.

## Development

- `npm run preview`: serve the root at http://127.0.0.1:4173 (Python required).
- `npm run render`: regenerate HTML from `scripts/render.mjs` and service content in `data/services.js`.
- `npm run check`: render, check JavaScript syntax, test matching/brief generation and validate all page links, assets, IDs and basic accessibility structure.
- `npm run build`: render and package only public website assets in `dist/`.

On Windows PowerShell, use `npm.cmd` if local execution policy blocks `npm.ps1`. No dependency installation is necessary. Edit shared layouts and page content in `scripts/render.mjs`, not the generated HTML. Edit service data in `data/services.js`, interactions in `app.js` and branding/layout in `styles.css`.

## Publishing

Push to `main`. The included GitHub Actions workflow checks, builds and deploys `dist/` to GitHub Pages. Repository Pages source is GitHub Actions. All page assets use relative paths to support the repository subdirectory.

## Privacy and limitations

Personal enquiry content stays in page memory until the visitor explicitly copies, downloads or opens an email draft. Session storage holds public comparison service IDs only. The website uses system fonts and bundled imagery. GitHub hosting may process technical connection information. The navigator uses local word matching, not generative AI. Service availability, scope, pricing and provider credentials must be confirmed directly. No independently verified case-study portfolio is represented.

## Validation record

Local build and checks cover every generated page and internal link. Browser accessibility inspection confirmed the local homepage loads. Desktop screenshot capture and pointer geometry were unavailable in the current browser-control environment, so full visual and device interaction verification could not be completed here.
