# Ave Consultancy Ltd portfolio

A responsive, dependency-free static site for GitHub Pages. Open `index.html` directly, or run `npm run preview` and visit http://127.0.0.1:4173.

## Content status

The ChatGPT share URL supplied for this project returned only preview metadata, without conversation content. The business name is inferred from the workspace name. All website copy and focus areas are provisional editorial suggestions requiring owner review. No clients, qualifications, performance statistics, testimonials, team biographies, or completed projects are claimed. Add verified case studies when supplied.

## Contact

Set `contactEmail` in `config.js` to the verified public business email. Until then, the enquiry form downloads a text draft and clearly explains that it sends nothing. With an email configured, the form opens the visitorâ€™s email app; the visitor must send it there. There is no backend or inbox service.

## Checks and build

Run `npm run check` and `npm run build`. The `dist` directory contains the complete publishable site. There are no npm dependencies. The site uses system fonts and bundled vector artwork, with no third-party asset requests.

## Publish on GitHub Pages

1. Create a dedicated repository (suggested: `ave-consultancy`) in the intended GitHub account. A public repository supports GitHub Free Pages hosting.
2. Push the contents of this directory to its `main` branch.
3. Open repository **Settings â†’ Pages â†’ Build and deployment â†’ Source â†’ GitHub Actions**.
4. The included Pages workflow checks, builds, and deploys. If the first run happened before enabling Pages, rerun it from the Actions tab.
5. Use the live URL reported by the successful deployment. A repository named `ave-consultancy` under `ACLUW` normally uses `https://acluw.github.io/ave-consultancy/`; this is only an expected address until deployment succeeds.

Relative asset paths support repository subpaths. No custom domain or paid service is needed.

Workflow reference: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages

## Before promoting the site

Confirm the business name, focus areas, brand copy, public contact email, and any legal footer requirements. Replace provisional content using the original conversation when it becomes available.
