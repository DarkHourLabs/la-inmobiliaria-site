# Deployment Guide — La Inmobiliaria Houses Boutique

## Overview

- **Framework:** Astro + Tailwind CSS (static output)
- **Hosting:** Vercel (darkhourlabs-projects team)
- **GitHub:** https://github.com/DarkHourLabs/la-inmobiliaria-site
- **Live site:** https://lainmobiliaria.mx
- **Vercel dashboard:** https://vercel.com/darkhourlabs-projects/la-inmobiliaria-houses-boutique

---

## How to Make Changes

1. Edit files in `~/Projects/la-inmobiliaria-houses-boutique/`
2. Test locally: `npm run dev`
3. Build check: `npm run build`
4. Commit & push:
   ```bash
   git add -A
   git commit -m "describe your change"
   git push origin main
   ```
5. Vercel auto-deploys on every push to `main`. Production is live in ~30s.

---

## Adding / Editing Properties

Properties are Markdown files in `src/content/properties/`. Copy an existing one:

```
src/content/properties/marina-condominio-vista-mar.md
```

Required frontmatter fields:
- `title`, `slug`, `price`, `priceType` (venta/renta)
- `bedrooms`, `bathrooms`, `size` (m²)
- `zone`, `address`
- `featured` (true/false)
- `images` (array of image paths)
- `description`

---

## Adding / Editing Zones

Zone pages live in `src/content/zones/`. Slugs map to `/zones/<slug>`.

---

## Adding / Editing Agents

Agent profiles in `src/content/agents/`. Used on the `/agents` page.

---

## DNS Configuration (Namecheap → Vercel)

Domain: `lainmobiliaria.mx` (registered at Namecheap)

| Type  | Host | Value         |
|-------|------|---------------|
| A     | @    | 76.76.21.21   |
| CNAME | www  | cname.vercel-dns.com |

DNS was already configured prior to deployment.

---

## Vercel Project Notes

- **Project name:** `la-inmobiliaria-houses-boutique`
- **Team:** darkhourlabs-projects
- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Node version:** 18+

The GitHub repo was force-pushed from the original Amozo template. Git history reflects the full localization to La Paz, BCS content.

---

## Content Language

- All content is in **Spanish** (Mexico)
- i18n utility: `src/i18n/ui.ts`
- Currency: MXN (pesos)
- Zones: Centro, Marina, El Mogote, El Centenario, Pichilingue

---

## Decap CMS (Content Management)

### Access
- **URL:** `https://lainmobiliaria.mx/admin/`
- **Login:** GitHub OAuth (must be a collaborator on `DarkHourLabs/la-inmobiliaria-site`)

### How It Works
- Uses the **GitHub backend** — edits commit directly to `main` branch
- Vercel auto-deploys on every commit (site rebuilds in ~1 min)
- No Netlify required — OAuth handled via free Sveltia CMS Auth proxy

### OAuth Setup (one-time)
The `config.yml` uses `https://sveltia-cms-auth.pages.dev` as the OAuth proxy.
To authorize your GitHub account:
1. Go to `https://lainmobiliaria.mx/admin/`
2. Click **Login with GitHub**
3. Authorize the app — you'll be redirected back to the CMS

If that proxy doesn't work, deploy your own via: https://github.com/sveltia/sveltia-cms-auth

### Managing Content

**Properties** (`src/content/properties/`)
- Add/edit properties with all fields: title, price, currency, bedrooms, bathrooms, size, zone, images, amenities, status, etc.
- Upload images — stored in `public/images/uploads/`
- Mark as `featured` to appear on homepage

**Agents** (`src/content/agents/`)
- Add/edit agent profiles: name, bio, photo, contact info, languages, specialties

**Zones** (`src/content/zones/`)
- Add/edit neighborhood zones: description, map embed, features, average price

### Image Uploads
- Images uploaded via CMS go to `public/images/uploads/`
- Committed to GitHub automatically on save
