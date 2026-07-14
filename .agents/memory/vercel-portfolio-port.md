---
name: Vercel Next.js portfolio port
description: Notes on porting a simple Next.js App Router portfolio (no API routes, no DB) to the pnpm_workspace react-vite artifact.
---

When the imported Vercel app has no `app/api/` or `pages/api/` routes and no database usage, skip the backend/OpenAPI/codegen step entirely and go straight to `createArtifact` + `fullstack-copy-frontend.sh` + manual Next→Vite conversion. Building a spec/codegen/db schema for a pure static/content site is wasted work.

**Why:** The port-existing.md guide's "Step 3: Build backend" is conditional on the app having API routes; a portfolio/marketing site with only static data files (e.g. `src/data/data.js`) never needs it.

**How to apply:** After reading `package.json` + `app/`/`pages/` tree in `.migration-backup/`, if there's no `api/` directory and no DB client import, treat the app as frontend-only for the whole task (no `lib/api-spec` edits, no `lib/db` schema, no api-server routes).

Other conversion notes for this pattern:
- `fullstack-copy-frontend.sh` auto-detects `CLIENT_DIR` from flat `src/App.tsx`/`src/main.tsx` conventions; a Next.js App Router source (`src/app/page.js`) doesn't match, so pass `--client-dir src` explicitly or it errors with "Could not find client directory."
- Convert every copied `.js`/`.jsx` page/component to `.tsx` under `src/pages/` and `src/components/` (Next's `app/<route>/page.js` → `src/pages/<Route>.tsx`) rather than leaving mixed `.js` next to the scaffold's TS files — the scaffold's `tsconfig.json` doesn't set `allowJs`, so leftover `.js` imports fail typecheck.
- `next/link` → wouter `Link` for pure route changes; keep plain `<a href="/#section">` for in-page hash anchors so same-page navigation doesn't force a client-side re-render fight with wouter's path matching.
- `usePathname()` from `next/navigation` → wouter's `useLocation()[0]`.
