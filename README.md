# inclinE-Bikes Static Site

This repo contains a static, multi-page marketing site for **inclinE-Bikes** in Manitou Springs, CO. It’s built with plain HTML, CSS, and a small amount of JavaScript, and is designed to work under a sub-path (e.g. GitHub Pages at `/incline-bikes/`) – no build step required.

---

## Project structure

```text
.
├── index.html            # Home
├── service.html          # Service & repairs
├── rentals.html          # E-bike rentals
├── sales.html            # E-bike sales
├── community.html        # Community / rides / local info
├── about-contact.html    # About the shop & contact form
└── assets/
    ├── styles.css        # Global styles (layout, typography, bottom bar, chips)
    ├── main.js           # “Open now” hours chip logic
    ├── logo.svg          # Logo mark
    └── imgs/             # Image placeholders (optional)
```

Key characteristics:

- **Pure static** – no frameworks, no build tools.
- **Relative links** – all internal links and asset URLs are relative so the site works:
  - when opened directly from the filesystem (`file://`)
  - when served from a subdirectory (e.g. `https://username.github.io/incline-bikes/`)
- **Mobile-first navigation** – sticky header plus a 3-item bottom bar on small screens:
  - Service
  - Rentals
  - Call (tap-to-call `tel:` link)
- **Open-hours chip** – the `<span data-open-chip>` element is updated by `assets/main.js` to show whether the shop is currently open and when it closes, based on a simple hours map in the script.

---

## Running locally

You can open `index.html` directly in a browser, but using a local HTTP server is closer to how it behaves in production and avoids path quirks.

From the project root:

```bash
python -m http.server 8080
```

Then visit:

```text
http://localhost:8080/
```

You’ll see:

- Home at `/index.html`
- Service at `/service.html`
- Rentals at `/rentals.html`
- Sales at `/sales.html`
- Community at `/community.html`
- About/Contact at `/about-contact.html`

---

## Forms (current state)

Several pages include basic HTML forms:

- `service.html` – “Book service” form
- `rentals.html` – “Request a rental” form
- `about-contact.html` – general contact form

In this version:

- All forms have `action="#"` and **do not submit anywhere yet**.
- They are intentionally wired as **placeholders** for:
  - external booking platforms (e.g. BeelineConnect for service, FareHarbor for rentals), or
  - a static form backend (Formspree, Web3Forms, etc.) if desired later.
- Basic spam protection is present via a hidden “honeypot” input (`.hp`).

When you’re ready to connect them, you can either:

1. Replace the forms with direct external CTAs (buttons linking to BeelineConnect / FareHarbor in a new tab), or  
2. Point the `action` to a static form endpoint and add any required hidden fields.

---

## GitHub Pages deployment

The site is already structured to work well on GitHub Pages:

- All internal links use **relative paths** (`service.html`, `assets/styles.css`, etc.).
- No server-side features are required.

Minimum setup:

1. Create a GitHub repo and add these files at the root.
2. Push to `main`.
3. In the repo settings, enable **GitHub Pages → Deploy from branch → main / root**.
4. Visit:  
   `https://<your-username>.github.io/<repo-name>/`

If you later map a custom domain (e.g. `incline-bikes.com`), you can add a `CNAME` file at the repo root and update DNS accordingly.

---

## Customization notes

- **Branding:** Replace `assets/logo.svg` and adjust colors in `assets/styles.css` to match final brand decisions.
- **Copy:** All headings, blurbs, and pricing are plain HTML. Edit the `.html` files directly.
- **Images:** Replace any placeholders in `assets/imgs/` and ensure `alt` text is set for accessibility.
- **Hours:** Shop hours are hard-coded in `assets/main.js`. Update as needed to match actual operating hours.
