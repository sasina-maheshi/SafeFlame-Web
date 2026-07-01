# SafeFlame — Marketing Website

A 5-page marketing site for SafeFlame, an IoT gas leak detector. Plain HTML5 +
Tailwind CSS (via CDN) + vanilla JS — no build step, no backend.

## Pages

- `index.html` — Home
- `product.html` — Product
- `how-it-works.html` — How It Works
- `pricing.html` — Pricing & pre-order
- `contact.html` — Contact

## Structure

```
/index.html
/product.html
/how-it-works.html
/pricing.html
/contact.html
/assets/css/style.css      shared styles (reveal animations, focus states, accordion)
/assets/js/partials.js     shared header/footer, injected into every page
/assets/js/main.js         nav toggle, FAQ accordion, form validation, scroll reveal
/assets/images/            drop real photos/logos here — see assets/images/README.md
```

## Adding your real images

See [`assets/images/README.md`](assets/images/README.md) for the exact
filenames each page expects (`logo-icon.png`, `logo-full.png`,
`product-photo.jpg`, `office-photo.jpg`). Drop files in with those names and
they'll appear automatically — no HTML changes needed.

## Running locally

No build step required. Either:

- Open `index.html` directly in a browser, or
- Serve the folder so relative paths behave exactly like production:

```bash
npx serve .
# or
python -m http.server 8000
```

## Pre-order form (Pricing page)

The Pricing page pre-order form posts directly to a Google Form's
`formResponse` endpoint via a hidden iframe, so submissions land as new rows
in the linked Google Sheet without leaving the page.

Current form ID: `1FAIpQLSdWwAkjAoOgcbi3c8Pv0eOyJUaPmHCGpbwaGhCImOzi3C6UjQ`

If you ever create a new Google Form, update two things in
[`pricing.html`](pricing.html):

1. The `<form action="...">` URL (swap in the new form ID).
2. Each `name="entry.XXXXXXXXX"` attribute (Google assigns a new entry ID per
   field — find these via the form's prefilled-link feature or by inspecting
   the live Google Form's HTML).

## Deploying

Free options once this is on GitHub:

- **GitHub Pages** — Settings → Pages → deploy from `main` branch.
- **Vercel** or **Netlify** — connect the repo, auto-deploys on every push.

```bash
git init
git add .
git commit -m "Initial website build"
gh repo create your-repo-name --public --source=. --push
```

(No `gh` CLI? Create an empty repo on github.com, then
`git remote add origin <repo-url>` and `git push -u origin main`.)
