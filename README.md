# Rivora Labz — Website

> **Live site:** [rivoralabz.com](https://rivoralabz.com)

The official website of **Rivora Labz**, a founder-led product engine in the UAE: internal ventures, technical experiments, and selective client partnerships.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | Static HTML5, one file per route |
| Styling | Hand-written CSS design system (`assets/css/main.css`), no framework |
| Fonts | Fraunces + Inter via Google Fonts, system mono for labels |
| Icons | Inline SVG (no icon CDN) |
| Logic | Vanilla JavaScript (`assets/js/main.js`), no dependencies |
| Hosting | Cloudflare Pages (auto-deploy from GitHub) |

No build step. No Tailwind. No trackers.

---

## Routes

```
/                        Home (Product Engine story)
/ventures/               Venture pipeline with honest statuses
/ventures/snook-a-look/  Flagship venture product story
/capabilities/           What the engine is good at
/how-we-build/           Operating system: stages, fleet, principles
/about/                  Company + founder
/contact/                Product conversation form (mailto compose, no backend)
/privacy/  /terms/       Legal
/404.html                Not-found page (Cloudflare Pages picks it up)
```

Shared chrome (nav/footer) is duplicated per page by design; if you change it, change it everywhere.

---

## Local Development

```bash
python3 -m http.server 8080
# open http://localhost:8080
```

Any static server works. Directory-style URLs (`/about/`) resolve to `index.html` files.

---

## Deployment

Cloudflare Pages deploys automatically:

| Trigger | Result |
|---|---|
| Push to `main` | Production deploy to rivoralabz.com |
| Push to any other branch | Preview at `<branch>.rivora-labz-landing-page.pages.dev` |

Build command: none. Output directory: `/`.

`_headers` sets security headers and long-lived caching for `/assets/*`.

---

## Design System Notes

- Brand palette is locked: ink `#14281D` on cream `#FFFCDC`, gold accent `#E4B54A` (drawn from the Snook A Look product UI).
- All colors, spacing, and motion tokens live in `:root` in `assets/css/main.css`.
- Venture status badges: `status--live`, `status--building`, `status--prototype`, `status--rnd`, `status--exploration`.
- Motion respects `prefers-reduced-motion`; the Product Engine animation pauses off-screen.

---

## License

© 2026 Rivora Labz FZE LLC. All rights reserved.
