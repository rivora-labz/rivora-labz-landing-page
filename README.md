# rivora labz — Landing Page

> **Live site:** [rivoralabz.com](https://rivoralabz.com)

The official landing page for **rivora labz**, a next-generation digital product studio building mobile apps, web applications, and AI integrations.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 (semantic) |
| Styling | Vanilla CSS (`style.css`) + Tailwind CSS (CDN) |
| Icons | [Lucide](https://lucide.dev) (UMD, pinned version) |
| Fonts | Inter — via Google Fonts |
| Logic | Vanilla JavaScript (`script.js`) |
| Hosting | Cloudflare Pages (auto-deploy from GitHub) |

---

## Project Structure

```
Landing Page/
├── index.html               # Main page (all sections)
├── style.css                # Custom CSS (animations, noise, gradients)
├── script.js                # JS — scroll reveal, nav, smooth scroll
├── narayan-professional.png # Founder profile photo (not committed)
├── og-image.png             # Social share / Open Graph image (optional)
└── README.md                # This file
```

---

## Local Development

No build step required — it's a static site.

```bash
# Option 1: VS Code Live Server extension (recommended)
# Right-click index.html → "Open with Live Server"

# Option 2: Python (built-in)
python3 -m http.server 8080
# then open http://localhost:8080

# Option 3: Node (npx)
npx serve .
```

---

## Deployment

The site is deployed automatically via **Cloudflare Pages** on every push to `main`.

| Setting | Value |
|---|---|
| Build command | *(none — static site)* |
| Build output directory | `/` |
| Root directory | `/` |

To deploy manually, push to `main`:

```bash
git add .
git commit -m "your message"
git push origin main
```

Cloudflare Pages will pick up the change and deploy within ~30 seconds.

---

## Adding / Updating the Profile Photo

1. Save your photo as `narayan-professional.png` in the project root.
2. Recommended specs:
   - **Format:** PNG (or JPEG — update `src` in `index.html` accordingly)
   - **Size:** At least **500 × 500 px**, square crop preferred
   - **Max file size:** ≤ 200 KB (compress with [Squoosh](https://squoosh.app) or [TinyPNG](https://tinypng.com))
3. The photo is referenced in `index.html` inside the **Founder** section — no other changes needed.



---

## SEO & Performance Notes

- **Meta description**, **Open Graph**, and **Twitter Card** tags are set in `<head>`.
- Update `og:image` → upload an actual `og-image.png` (1200 × 630 px) to the repo root.
- The Lucide CDN version is **pinned** (`@0.468.0`) — bump it intentionally when upgrading.
- Both `lucide.min.js` and `script.js` are loaded with `defer` — no render-blocking scripts.
- The profile image has `fetchpriority="high"` and a `<link rel="preload">` for faster LCP.

---

## License

© 2026 rivora labz. All rights reserved.
