# MeshVault

MeshVault is a polished product foundation for an internal 3D asset request platform.

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS
- ESLint

## What is implemented now

- Clean global layout with shared header and footer
- Polished, startup-style landing page with clear messaging and CTA
- Route scaffolding for:
  - `/signup`
  - `/login`
  - `/dashboard`
  - `/requests/new`
  - `/requests/[id]`
- Professional structure for:
  - `components/`
  - `lib/`
  - `models/`
  - `app/api/*` route handlers
- API handlers are intentionally scaffolded only (return `501 Not Implemented`)

## Current status

- No backend logic is implemented yet.
- No authentication, database connection, or persistence is wired yet.
- This phase focuses only on production-ready frontend foundation and architecture.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.
