# Linkist marketing website

The public site for Linkist PRM (the Personal Relationship Manager by RatioX Labs DWC-LLC). A standalone Next.js 15 project built on the approved prototype's design tokens. It never imports code from the product and never writes to it; every product screen is a real capture or a labelled design preview.

## Run

```bash
pnpm install
cp .env.example .env.local     # set NEXT_PUBLIC_SITE_URL and NEXT_PUBLIC_APP_URL
pnpm dev                       # http://localhost:3200
pnpm build && pnpm start       # production build on the same port
```

Never build while the dev server runs.

## Scripts

| Script | What it does |
| --- | --- |
| `pnpm tokens:build` / `pnpm tokens:check` | Regenerate `src/styles/tokens.css` and its checksum from `src/styles/tokens.json`; check fails if they are stale. |
| `pnpm tsx scripts/brand-build.ts` | Crop the mark from the prototype's logo lockup and draw the app icons. |
| `pnpm capture:prototype` | Crop the three prototype phone screens into `public/screens/proto-*.png` (design previews). |
| `pnpm capture:login` | One-time manual sign-in to the app and the store; saves a session for captures. |
| `pnpm capture [names] [--public] [--all]` | Capture real screens into `public/screens` with a checksum log. |
| `pnpm og [slug]` | Render 1200 x 630 Open Graph images with the brand fonts into `public/og`, one per page and one per blog post. |
| `pnpm import:blog [slug]` | Import the articles published on linkist.ai/blogs into `content/blog` (Markdown with a JSON front matter block) and their images into `public/blog`. |
| `pnpm review [routes] --widths 390,1440` | Full-page screenshots and a horizontal-overflow scan against a running site. |
| `pnpm a11y [routes]` | axe-core, heading order, landmarks and a keyboard pass on every route, on the dark theme. |
| `pnpm seo [routes]` | Status, titles, descriptions, canonical, robots, Open Graph, H1, JSON-LD, markers, links and images on every route, plus the 404 probe, against a running site. |
| `pnpm import:legal` | Import the published terms and privacy policy from linkist.ai into `content/legal`, verbatim. |
| `pnpm imagery [name]` | Deliver generated masters from `public/assets/masters/<kind>/` as 1x and 2x WebP under `public/assets/<kind>/`. |
| `pnpm api` | Forms and API behaviour against a running site: validation, honeypot, bad bodies answer 400, rate limit, unconfigured 503, security headers, redirects. |
| `pnpm layout [routes]` | 44 px targets (with the WCAG exemptions), the assistant launcher never covering the footer or hero controls, the tablet newsletter width. |
| `pnpm lighthouse [routes] [--mobile or --desktop]` | Lighthouse on every route against a running production build; summary in `captures/lighthouse/summary.md`. |
| `pnpm browsers [routes]` | Chromium, Firefox, WebKit, an iPhone and a Pixel emulation: page errors, console errors, overflow, the assistant on each engine, screenshots in `captures/browsers`. |
| `pnpm spell` | cspell in British English over the content, copy and docs, with `cspell-words.txt` as the project dictionary. |
| `pnpm test`, `pnpm typecheck`, `pnpm lint` | Unit tests (tokens, markdown), TypeScript, ESLint. |

## Where things live

- `src/content/*` all copy as typed data: home, plans and cards, features, use cases, help, design previews, OG pages, the AI and security facts with their policy citations.
- `content/blog/*.md` the articles imported from linkist.ai/blogs (JSON front matter, Markdown body, verbatim); `public/blog/<slug>/` their covers and figures.
- `src/components/*` the component library; `src/motion/*` motion primitives; `src/styles/*` tokens, interactions, mini mockups, extras.
- `src/lib/site.ts` URLs and `pageMeta()`; `src/lib/glossary.ts` product vocabulary; `src/lib/screens.ts` build-time resolvers for captures and generated assets.
- `captures/` capture manifest, README and logs. `docs/` audit, checkpoint reports, decision log, confirm list, sitemap, image plan.

## Truth rules

Every claim traces to `docs/01-audit.md`. Every product image is a real capture, a labelled design preview or a labelled pending frame. No em dashes, British English, numbers as digits. Compliance words appear only with evidence. The imported blog articles are the authors' text as published and sit outside the em-dash rule (D18).

## Deploy

The site deploys to the Vercel project `linkist-marketing` in team `bettroi-website` (D33). Environment variables are documented in `.env.example` and, as set today, in `docs/09-handover.md`. Until the GitHub connection exists (C23), a release is one command from this folder after the QA scripts pass:

```bash
vercel deploy --prod --yes --scope bettroi-website
```

`.github/workflows/qa.yml` runs tokens, types, lint, tests, spelling and a build on every push, and on demand the browser pass (Chromium, Firefox, WebKit, iPhone and Pixel) against a deployed site. Launch day, step by step, is in the handover document.
