# TheWebWiz — Vite + React + Tailwind

The production landing page for **thewebwiz.us**.

## Stack

- **Vite** — dev server + production bundler
- **React 18** — component framework
- **Tailwind CSS** — utility classes (wired to the design tokens via `tailwind.config.js`)
- **CSS custom properties** — design system tokens in `src/index.css` (overridable for theming)

## Install & run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs ./dist
npm run preview  # serve the production build locally
```

## File map

```
vite-thewebwiz/
├── index.html              ← Vite entry HTML
├── package.json            ← deps + scripts
├── vite.config.js
├── tailwind.config.js      ← maps design tokens → Tailwind utilities
├── postcss.config.js
└── src/
    ├── main.jsx            ← React mount point
    ├── App.jsx             ← all sections (Nav, Hero, Services, Pricing, Contact, etc.)
    └── index.css           ← Tailwind directives + design tokens + component styles
```

## Design tokens in Tailwind

Use either approach — they reference the same CSS variables, so they're interchangeable:

```jsx
// Tailwind class
<button className="bg-accent text-accent-ink font-mono">Send</button>

// or raw CSS variable
<button style={{ background: "var(--accent)" }}>Send</button>

// or the existing component class (still works)
<button className="btn-primary">Send</button>
```

The component classes (`.btn-primary`, `.section`, `.tier`, etc.) are preserved in `index.css` so the existing markup keeps working. As you refactor, you can replace them with Tailwind utilities incrementally.

## Theme switching

```html
<!-- in index.html -->
<html data-mode="dark">      <!-- or "light" -->
<html data-density="comfy">  <!-- "compact" | "regular" | "comfy" -->
```

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. Import in Vercel — preset: **Vite**. Build command: `npm run build`. Output dir: `dist`.
3. Add `thewebwiz.us` in Settings → Domains. Update DNS at your registrar.

See `DEPLOY_VERCEL.md` in the parent project for the full step-by-step.

## Pre-launch checklist

- [ ] Wire Formspree into the Contact form's `submit` handler (see `FORMS.md`)
- [ ] Replace placeholder testimonials, portfolio thumbnails, founder portrait
- [ ] Add favicon: drop `favicon.svg` in `/public`, reference in `index.html`
- [ ] Add OG meta tags for social previews
- [ ] Set up email at `hello@thewebwiz.us`
