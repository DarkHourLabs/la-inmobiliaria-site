# La Inmobiliaria — Implementation Notes

> Based on the [houses-boutique](https://github.com/amozo-es/houses-boutique) Astro template.

## What Was Done

### 1. Brand Identity
- **Name:** "La Inmobiliaria" (replaces "Houses Boutique")
- **Site:** `lainmobiliaria.mx`
- **Colors:** Navy `#1e3a5f` (primary) + Gold `#c8956c` (accent)
- **Logo icon:** Gold house icon, navy text

### 2. Colors
- Updated `src/styles/global.css` — full navy palette (`--color-primary-*`) + gold accent (`--color-accent-*`)
- Updated `tailwind.config.js` — added `accent` color tokens
- Added `.text-accent`, `.bg-accent`, `.border-accent` utility classes

### 3. Content — La Paz Zones (5)
| Zone | Slug | Avg Price |
|------|------|-----------|
| Centro | `/zones/centro` | $3,200,000 MXN |
| Marina | `/zones/marina` | $6,500,000 MXN |
| El Mogote | `/zones/el-mogote` | $4,800,000 MXN |
| Pichilingue | `/zones/pichilingue` | $2,800,000 MXN |
| El Centenario | `/zones/el-centenario` | $1,850,000 MXN |

### 4. Content — Properties (3 sample)
| Property | Zone | Price |
|----------|------|-------|
| Condominio Vista Mar en la Marina | Marina | $8,500,000 MXN |
| Departamento Frente al Malecón | Centro | $3,800,000 MXN |
| Casa Residencial en El Centenario | El Centenario | $2,200,000 MXN |

### 5. Agents (3)
- **Sofía Ríos** — Especialista en Propiedades de Lujo / Marina
- **Carlos Mendoza** — Especialista en Centro y Malecón
- **Ana Gutiérrez** — Especialista en Zonas Residenciales

### 6. i18n / Bilingual
- `astro.config.mjs` — i18n config: `defaultLocale: 'es'`, `locales: ['es', 'en']`, no prefix on default
- `src/i18n/ui.ts` — full ES/EN translation dictionary + `useTranslations()` hook
- Language toggle (EN/ES) in navigation header on all pages
- All pages translated to Spanish (primary language)
- **EN pages not yet created** — the `/en` toggle links are wired but the pages under `src/pages/en/` need to be built for full bilingual support

### 7. Currency
- All prices in **MXN** (Mexican Peso)
- `Intl.NumberFormat('es-MX', { currency: 'MXN' })` for proper formatting
- Content schema default changed from `USD` → `MXN`

## How to Add More Properties

Create a file in `src/content/properties/your-slug.md`:

```yaml
---
title: "Nombre de la Propiedad"
zone: "Marina"           # Must match a zone title exactly
price: 5000000
currency: "MXN"
bedrooms: 3
bathrooms: 2
size: 180
sizeUnit: "m²"
description: "Descripción..."
featured: true
status: "available"     # available | pending | sold
image: "https://..."
images: ["https://..."]
location:
  address: "Dirección, Zona, La Paz, BCS"
amenities:
  - "Alberca"
agent-id: "sofia-rios"  # Matches agent file name
createdAt: 2024-06-01
updatedAt: 2024-06-01
---
Body text here.
```

## How to Complete English Pages

Create `src/pages/en/index.astro` (and other pages) importing with `lang="en"`:

```astro
---
import { useTranslations } from '../../i18n/ui';
const t = useTranslations('en');
---
```

## Dev Commands

```bash
cd ~/Projects/la-inmobiliaria-houses-boutique
npm run dev      # Dev server on :4321
npm run build    # Production build
npm run preview  # Preview production build
```

## Deployment

Ready to deploy to any static host:
- **Cloudflare Pages** (recommended — free, fast CDN in Mexico)
- **Netlify**
- **Vercel**

Build output: `dist/` — 14 static pages.
