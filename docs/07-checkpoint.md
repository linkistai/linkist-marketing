# Checkpoint 7: SEO and imagery pass

Date: 11 September 2026. The brief's checkpoint 7 covers the SEO pass, Open Graph images, the sitemap and llms.txt, and the imagery production. Imagery generation still waits for the budget approval (C4), so this round prices it properly, prepares the delivery pipeline, and completes everything that does not spend credits.

## SEO

### An audit that runs on every release

`pnpm seo` (scripts/seo.ts) loads every route in the sitemap plus the legal drafts, `/system` and a 404 probe against a running site and checks: the response status; a title and a description that are present, unique across the site and sized for search results; a canonical; the robots meta on routes that must not be indexed; Open Graph and Twitter tags with an image that resolves at 1200 x 630; exactly one H1; JSON-LD that parses and declares a type; no unresolved markers (CONFIRM, lorem, PLACEHOLDER outside the drafts); no em dashes outside the seven imported articles (C15); every internal link and image resolving; and that a missing page answers 404 with a title.

First run: 1 problem and 50 warnings. The problem was the checker itself, which followed `/start` into the product and failed; internal paths that redirect to another host now count as resolved. The warnings were lengths: 42 descriptions over 170 characters and 8 titles over 70.

### What changed

- **Descriptions** are clamped by `pageMeta` at the last sentence end inside 160 characters, or at a word boundary, with no ellipsis (D28). Every page keeps its full description in the source; search results see a clean shorter one.
- **Titles** for the five feature pages, the five use cases and how it works are shortened to under 70 characters. The seven imported articles keep their published titles.
- **Sitemap** (D27): real last-modified dates for articles and legal documents, the build date elsewhere; priorities by page role (home 1.0, core hubs 0.9, most pages 0.7, articles 0.6, legal 0.3); change frequencies; legal drafts excluded.
- **Robots**: the eight drafts and `/system` disallowed; a pre-launch switch, `NEXT_PUBLIC_NOINDEX=true`, turns every page to noindex and robots.txt to disallow-all so a preview never competes with linkist.ai (D27).
- **JSON-LD**: the Organization gains an id, a support contact point and the three published channels (LinkedIn, Instagram, X) as `sameAs`; a `WebSite` entry links to it; the logo URL uses the asset host so it resolves before the domain switch. Every page already carried BreadcrumbList, FAQPage, Article, SoftwareApplication or Product as the brief lists.
- **llms.txt** and the sitemap grow automatically with the routes.

### Verified

| Check | Result |
| --- | --- |
| `pnpm seo`, 58 routes, 95 internal links | 0 problems, 7 warnings, all of them titles over 70 characters: the seven imported articles' published titles and one in-house title at 77. |
| Build, typecheck, lint, tests | 66 static pages; typecheck, lint and 22 tests clean, including the description clamp and the retrieval tests. |
| Open Graph | 42 images, all 1200 x 630, one per page and per article. |

## Imagery

- **Priced with the tool.** The Magnific balance check succeeded this time: Pro plan, about 2,390,000 credits available of 3,600,000; one person generation simulates at 75 credits. Unlimited mode is not active in this session, so generations consume credits. `docs/image-plan.md` is updated with the slots the site resolves today (the home hero, 12 closing-band people, pricing and teams heroes, 5 feature heroes, 7 objects, 3 scenes, 10 article stills) and four options from about 700 to 4,500 credits, all under 1 percent of the balance.
- **Pipeline ready.** `pnpm imagery` (scripts/imagery-process.ts) delivers masters from `public/assets/masters/<kind>/` as trimmed 1x and 2x WebP files under `public/assets/<kind>/`, which the build-time resolvers pick up with no code change. Smoke-tested with a probe file, then cleaned up.
- **Not generated.** Nothing has been sent to Magnific. The brief asks for approval first (C4), and the first batch sets the look of the site. Pick an option and the batch runs, with every creation logged in `docs/image-log.md`.

## Decided

D27 (sitemap dates and priorities, the no-index switch), D28 (description clamp, shorter titles, the audit script).

## Blocked on the client

- C4: which image option. The credits are there; the decision is about look and scope.
- C3: logo vectors and card photographs, which the plan prefers over generated cards.
- C1: the domain, which decides when the no-index switch comes off.

## Honest gaps

- The seven imported articles have titles up to 98 characters; search results will truncate them.
- Lighthouse scores and cross-browser passes are checkpoint 8.
