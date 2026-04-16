# La Inmobiliaria — Admin Panel Setup

## Admin URL
`https://la-inmobiliaria-houses-boutique.vercel.app/admin`
(or `https://lainmobiliaria.mx/admin` once DNS is pointed)

## Login Method
GitHub OAuth — logs in with the GitHub account that has access to `DarkHourLabs/la-inmobiliaria-site`.

---

## One-Time Setup (Required Before First Login)

### 1. Create a GitHub OAuth App

Go to: https://github.com/organizations/DarkHourLabs/settings/applications/new

Fill in:
- **Application name:** La Inmobiliaria CMS
- **Homepage URL:** `https://lainmobiliaria.mx`
- **Authorization callback URL:** `https://la-inmobiliaria-houses-boutique.vercel.app/api/auth`

Click **Register application**, then copy:
- `Client ID`
- `Client Secret` (click Generate a client secret)

### 2. Add Env Vars to Vercel

Go to: https://vercel.com/darkhourlabs-projects/la-inmobiliaria-houses-boutique/settings/environment-variables

Add:
| Key | Value |
|-----|-------|
| `GITHUB_CLIENT_ID` | (from step 1) |
| `GITHUB_CLIENT_SECRET` | (from step 1) |

### 3. Redeploy
After adding env vars, trigger a redeploy from the Vercel dashboard or push any commit.

---

## What the CMS Can Edit

| Section | Location |
|---------|----------|
| **Propiedades** | `src/content/properties/*.md` |
| **Agentes** | `src/content/agents/*.md` |
| **Zonas** | `src/content/zones/*.md` |
| **Media uploads** | `public/images/uploads/` |

All edits create a GitHub commit automatically — full audit trail.

---

## Logging In

1. Go to `/admin`
2. Click **Login with GitHub**
3. Authorize the OAuth App
4. CMS loads — you're in

---

## Who Has Access

Anyone with **write access** to `DarkHourLabs/la-inmobiliaria-site` on GitHub.
To grant access: add them as a collaborator in GitHub repo settings.
