# Checkpoint 9: deploy and handover

Date: 11 September 2026. This is the document to read first. It says where the site is, what it needs from its environment, what is confirmed and what is not, what is done and what is not, and what to do next. The decisions behind it are in `docs/decision-log.md` (D1 to D35) and the open questions in `docs/confirm-list.md`.

## Where it is

- **Repository**: https://github.com/linkistai/linkist-marketing, branch `main`, conventional commits, no force pushes. This folder is the repository root. Pushing needs a GitHub login with write access to the `linkistai` organisation, and a push that adds or changes anything under `.github/workflows/` needs the `workflow` scope on that login (`gh auth refresh -h github.com -s workflow`, a one-time browser step); without it GitHub rejects the whole push.
- **Vercel**: the Linkist account (linkistai@gmail.com, username `linkistai-2292`, scope `vivek-chandrans-projects-e6f77bb4`, which also hosts affiliate.linkist.ai and ineverleft.linkist.ai), project `linkist-marketing` (id `prj_O5bPQncg2wyppVhOKpfRInU3arQ0`), created by the owner on 10 September 2026 and connected to the GitHub repository, so every push to `main` deploys production on its own (D33). Root directory `.`, framework Next.js, install and build commands at their defaults, Node 22.x from the `engines` field in `package.json`. The brief named the team `bettroi-website` by mistake; a project created there on 11 September was deleted the same day with nothing deployed, as was one created on a second account by an accidental login.
- **Production**: https://linkist-marketing.vercel.app, live since 10 September, redeployed on every push. Public, served over HTTP/2, the security headers present. From the deploy of 11 September (commit after the variables below were completed) every page carries `noindex` and `robots.txt` disallows everything until launch day (D27); the deploys before it were indexable for a few hours, which search engines are unlikely to have acted on.
- **Releasing**: push to `main`. The CLI equivalent, with the CLI logged in as the Linkist account, is:

  ```bash
  vercel deploy --prod --yes --scope vivek-chandrans-projects-e6f77bb4
  ```

- **Checks against production**, from this folder:

  ```bash
  REVIEW_BASE_URL=https://linkist-marketing.vercel.app pnpm seo
  ```

  ```bash
  REVIEW_BASE_URL=https://linkist-marketing.vercel.app pnpm lighthouse
  ```

  The SEO run reports every page as `noindex` by design until launch; everything else must be 0 problems. The Lighthouse run is the measurement of record for mobile performance (checkpoint 8 recorded the local HTTP/1.1 simulation, D32); its SEO category flags the `noindex` for the same reason. The Browsers job in GitHub Actions against the URL (D34) is the Firefox pass. Results of the first runs are in the addendum at the end of this document.
- **Local**: `pnpm build && pnpm start` on port 3200, then any of the QA scripts. Never build while a QA run is reading the server. Local QA builds that must run in WebKit over plain http use `CSP_NO_UPGRADE=true pnpm build`; the deployed build keeps `upgrade-insecure-requests`.
- **The build log of 10 September** (`Invalid URL, input: ''`, fixed the same day with `coerceUrl` in `src/lib/site.ts`) was this project's first build, before the variables existed. The card product lives on a different Vercel account (m.linkist.ai, project `linkist-prod-1806`); that is expected and nothing to merge.

## Environment checklist

Set in Vercel (the first three by the owner on 10 September, the last two on 11 September; production and preview, the later two in development as well):

| Variable | Value | Note |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://linkist.ai` | Placeholder until the domain is decided (C1). Every canonical URL, the sitemap, JSON-LD and the OG `url` follow it. |
| `NEXT_PUBLIC_APP_URL` | `https://prm.linkist.ai` | The PRM app. Get the App, Start free and Sign in land on `/UnifiedAuth` (R8). |
| `CAPTURE_BASE_URL` | the app | Only the capture script reads it; harmless in a deployment. |
| `NEXT_PUBLIC_CARD_APP_URL` | `https://m.linkist.ai` | The NFC card product. Get NFC Card lands on `/login` (R8, and C21 for its DNS). |
| `NEXT_PUBLIC_NOINDEX` | `true` | Pre-launch switch: `noindex` on every page, `robots.txt` disallows all. Remove from production on launch day; keep on preview. |

Derived, not set: `NEXT_PUBLIC_ASSET_URL` falls back to Vercel's own `VERCEL_PROJECT_PRODUCTION_URL`, so Open Graph images resolve on the deployment host until the domain exists (Grownz D27). Confirm after the first deploy that `og:image` on any page points at the production host, then set the variable to the domain on launch day.

Not set, so each feature is off and fails honestly:

| Variable | Enables | Off behaviour |
| --- | --- | --- |
| `RESEND_API_KEY`, `LEAD_TO`, `LEAD_FROM` | Contact form, newsletter and community sign-up delivery | The routes answer 503 with a plain message that names the support address when that is set |
| `TURNSTILE_SECRET_KEY`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile on every form, verified server-side, reset after a failure | No widget, no verification |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 through the consent notice, Consent Mode on withdrawal | No notice, no script, no cookie-choices link |
| `NEXT_PUBLIC_SUPPORT_EMAIL`, `NEXT_PUBLIC_PRIVACY_EMAIL`, `NEXT_PUBLIC_PARTNERSHIPS_EMAIL`, `NEXT_PUBLIC_SECURITY_EMAIL` | Addresses on the contact page and in the 503 message | Support and privacy fall back to the published addresses; partnerships and security say the address is published at launch |
| `ANTHROPIC_API_KEY`, `ANTHROPIC_MODEL` | Claude phrasing for the assistant, with server-side retrieval | The assistant answers from the help corpus alone, labelled automated |
| `NEXT_PUBLIC_GET_APP_URL`, `NEXT_PUBLIC_GET_CARD_URL` | Overrides for the two landing pages | Derived from the two hosts above |
| `NEXT_PUBLIC_THEME` | `light` previews the backup theme | Dark ships |
| `CAPTURE_BASE_URL` | Where `pnpm capture` signs in | Defaults to the app |

`.env.example` documents all of them. Keys and addresses are C12.

## Launch day, step by step

When C1 is answered (the root of linkist.ai, or a subdomain):

1. Add the domain to the Vercel project (Settings, Domains) and point DNS at it as Vercel instructs. If the new site replaces the root, the current linkist.ai pages, store link and legal documents move with it; the redirects for the old paths that are known today (`/blog`, `/learn/*`, `/privacy`, `/terms`, `/choose-plan`, `/digital-business-card`, `/app`, `/sign-in`, `/start`, `/get-card`) are in `next.config.ts`. Pull the old site's sitemap first and add a redirect for any other path that had traffic.
2. Set `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_ASSET_URL` to the domain in production.
3. Remove `NEXT_PUBLIC_NOINDEX` from production only.
4. Redeploy: any push to `main`, or the CLI command above.
5. Check `https://<domain>/robots.txt` allows, `https://<domain>/sitemap.xml` lists the domain with real dates, `https://<domain>/llms.txt` answers, and a shared link renders its Open Graph card.
6. Run `REVIEW_BASE_URL=https://<domain> pnpm seo` and `pnpm lighthouse`, and the Browsers job in GitHub Actions against the domain.
7. Submit the sitemap in Google Search Console and, if the property exists, Bing Webmaster Tools.
8. Add the GA4 id and the Turnstile and Resend keys (C12), redeploy, then send one message through the contact form and one newsletter sign-up, and confirm the GA real-time view shows the visit after consent.

## Confirm list

`docs/confirm-list.md`, C1 to C23 with R1 to R8 resolved by the walk-through. Open and blocking: C1 domain, C2 one sign-in for real captures, C3 logo vectors and card photographs, C4 the image option, C5 the billing currency and card prices (with C16 and C22). Open and not blocking: C6 shipping costs and times, C7 Founders Circle status, C8 the AI provider and region, C9 hosting and sub-processors, C10 founder story and team, C11 the current site's lines, C12 keys and addresses, C13 and C19 counsel, C14 the first deploy, C15 em dashes in the imported articles, C17 release notes, C18 article covers, C20 design-partner terms, C21 the m.linkist.ai DNS inconsistency, C23 the GitHub connection for automatic deploys.

## Placeholder list

38 `[PLACEHOLDER: …]` markers, all in the 8 draft legal documents under `content/legal/`, none in product claims or page copy. Each draft shows its own count to the reader and says it is not in force until reviewed. By document:

| Document | Markers | What counsel or the company must supply |
| --- | --- | --- |
| Sub-processors | 11 | The provider and region for each of the 8 categories the policy lists, the payment entity's region, and the website host and region; how changes to the list are announced |
| Cookie policy | 5 | The app's own cookie table; the analytics retention as set in the GA property; whether marketing cookies will ever be added; the consent mechanism checked against the UAE PDPL and the laws of visitors elsewhere |
| Refund and shipping | 5 | Delivery times, carriers and who pays duties outside the UAE; return shipping and the replacement process; refunds for an unused subscription period and the lifetime plans if the service ends; the contractual currency (C5); a consumer-law check per shipping region |
| Security overview | 5 | Any assessment completed, with date and scope; the review cadence and its owner; a response-time commitment and escalation route; hosting entity and region (twice, with the sub-processors document) |
| Accessibility statement | 4 | The app's conformance target, testing and known issues; a link to the hosting vendor's statement; the domain; a retention line |
| Company information | 4 | Licensing authority and licence number; VAT registration number; the directors or managers the law requires to be named; the domain once confirmed |
| Acceptable use | 2 | The notice and appeal process and the abuse address; the abuse response time |
| Contact data notice | 2 | The retention period for imported non-user contact data; how a non-user's request is verified and conflicts resolved |

`[CONFIRM]` markers: none are rendered. Two remain in source comments (`src/content/plans.ts`, `src/lib/glossary.ts`) as reminders that the card currency display is C5.

## Image log

`docs/image-log.md`. No imagery has been generated; the plan is priced (C4). What the site shows today: three design previews cropped from the approved prototype, labelled as such on every appearance; the brand mark cropped from the prototype lockup; CSS renders of the three card materials; 42 Open Graph cards drawn from the tokens; the 7 imported articles' own covers and figures; title cards on the 10 in-house articles. The prompts for every planned slot are written out in `docs/content-hub.md`.

## Decision log

`docs/decision-log.md`, D1 to D34. The ones a new maintainer trips over: D7 (Start free and Sign in are one screen), D9 (no unsourced statistics), D15 (the hero carousel), D18 and D20 (imported articles verbatim, in-house articles from the product), D23 (design previews, never in a hero as a real screen), D27 (noindex and asset host until the domain), D29 (44 px targets), D32 (Lighthouse method and the local caveat), D33 (deployment shape), D34 (CI).

## Marketing content hub

`docs/content-hub.md`: one-liners, listing copy, every headline and lede by page, the five situations, feature captions, plans and prices with their open items, social post starters and subject lines, disclaimers, true proof points, the do-not-say list, picture captions, the 17 articles with excerpts, and the image prompts complete for every slot.

## What is done

- Every page in the brief's section 4: 48 public routes plus `/system`, all static. Home with the two-slide hero, how it works, 5 feature pages, 5 use cases, NFC cards, bundles, pricing with the USD and AED switch, teams, AI, security, 17 articles, a 109-entry help centre in 12 categories, the assistant page and widget, changelog, community, legal hub with 2 published documents and 8 drafts, contact, about, customers, 404.
- Checkpoint 8's QA, all recorded in `docs/08-qa.md` with the tooling to repeat it: responsive at 8 widths, 44 px targets, axe and keyboard, SEO, forms and API behaviour, spelling, Chromium and WebKit on desktop and phones, Lighthouse (desktop 100 everywhere; mobile 95 or better on 34 of 48 routes in the local simulation, the rest 87 to 94 with the cause recorded), an independent review of 26 findings with every code-fixable one fixed.
- Truth: every claim traces to `docs/01-audit.md`; no compliance word without evidence; the limits in brief 3.9 are stated on the help centre, the AI page and the security page; prices come from the store and the prototype until C5.
- Deployment shape: the Vercel project with its variables, the pre-launch `noindex`, the launch-day steps above, and a CI workflow for the checks and the browser pass.

## What is not done, plainly

1. **Launch.** The site is live on its Vercel URL with `noindex`; the domain (C1) and the launch-day steps remain.
2. **Real product screens.** Every phone frame shows the prototype's design preview until the owner signs in once on this machine (`pnpm capture:login`, then `pnpm capture`, `pnpm og`, build, deploy; C2). The pipeline is written and tested against the store's public pages.
3. **Photography and 3D objects** are planned and priced, not generated (C4); the slots render nothing or a token glyph until a file is delivered. The four NFC card faces are the exception, generated on 11 September at the owner's request (D35, `docs/image-log.md`).
4. **Firefox** was not run on this machine (its Playwright binary cannot spawn here). The Browsers job in `.github/workflows/qa.yml` runs it on a Linux runner against the deployed site once that workflow is pushed (it needs the `workflow` scope on the GitHub token, above).
5. **Mobile Lighthouse on HTTP/2**: see the addendum; the local number and its cause are D32.
6. **Forms, analytics and Turnstile** cannot be verified live until the keys exist (C12). Their off behaviour is tested.
7. **Legal drafts** need counsel and the company details (C13, C19); the 38 placeholders above.
8. **About and customers** wait for the founder story, team names and any customer who consents (C10, C20).
9. **Prices** wait for the billing currency and the Team plan's yearly unit (C5, C22); the Founders Circle bundle for its status (C7).
10. **The domain** (C1), and with it the launch-day steps.

## First three things to do next

1. Answer C1 and C5, then follow the launch-day steps.
2. Sign in once for captures (C2) and choose an image option (C4); the site fills with real screens and people on the next push.
3. Grant the `workflow` scope and push the CI commit, then run the Browsers job against production for the Firefox pass.

## Runbook

- **Change copy**: `src/content/*.ts` for pages, `content/blog/*.md` for articles, `content/legal/*.md` for legal documents, `src/content/help.ts` for the help centre (the assistant reads the same entries). British English, no em dashes, digits, glossary spellings; `pnpm spell` and `pnpm seo` check.
- **Add an article**: a Markdown file with the JSON front matter block in `content/blog/`, then `pnpm covers` (title card) or a photograph at `public/blog/<slug>/cover.jpg`, then `pnpm og` for its card. The listing, the sitemap, the feed of related posts and the JSON-LD follow.
- **Add a legal document**: a Markdown file in `content/legal/` with its front matter, its slug added to `LEGAL_ORDER` in `src/lib/legal.ts`, and to the `robots.ts` disallow list while it is a draft.
- **Add a redirect**: `next.config.ts`, the `redirects()` list.
- **Change a URL or an address**: the environment variables above, never the code.
- **Real captures**: `pnpm capture:login` once, `pnpm capture`, `pnpm og`, then build and deploy (`pnpm capture:all` does all four).
- **Imagery**: masters into `public/assets/masters/<kind>/`, `pnpm imagery`, and a row in `docs/image-log.md`; the slots pick the files up at build time.
- **Tokens**: `src/styles/tokens.json`, then `pnpm tokens:build`; `pnpm tokens:check` fails a stale build.
- **Release**: `pnpm typecheck && pnpm lint && pnpm test && pnpm spell && pnpm build`, then `pnpm start` and the QA scripts (`review`, `a11y`, `seo`, `api`, `layout`, `browsers`, `lighthouse`), then deploy. CI runs the first line on every push.
- **Motion looks static**: the operating system is reporting reduced motion; the footer switch overrides it, and `?motion=off` forces it off for a review.

## Addendum, 11 September 2026: production checks and the card renders

- **SEO against production**: 0 problems on 58 routes and 95 links apart from the intended `noindex` on the 48 public routes.
- **Lighthouse against production** (`docs/09-lighthouse-production.md`, HTTP/2, the measurement of record, D32): desktop 100 in performance, accessibility and best practices on all 48 routes. Mobile performance 95 or better on 45 of 48; the home page scored 88 on its first, cold run and 98, 96 and 94 on three spaced re-runs; two imported articles sit at 93 and 94 (image-heavy bodies). Accessibility 100 everywhere; best practices 100 everywhere except one mobile run of the find page (96), which logged a React hydration error once while Vercel's rate protection was answering 403 to the audit browser; 16 later loads of that page on phone and desktop emulation were clean. SEO reads 66 to 69 everywhere because of the pre-launch `noindex` and returns to 100 on launch day. Core Web Vitals: CLS 0 on every route, TBT under 170 ms on mobile everywhere except two articles.
- **Auditing production**: Vercel answers 403 to a headless browser after about 100 rapid page loads. Run `pnpm lighthouse` on a handful of routes at a time, or pause between routes; the rows that came back as zeros were re-run that way.
- **NFC card renders** (D35, `docs/image-log.md`): the four card faces were generated from the brand mark at the owner's request and now appear in the hero ring, the cards section, the pricing page and the bundles. Product photographs from the client replace the masters (C3).
