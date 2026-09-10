# Image log

Every picture the site uses, where it came from and on what terms, so any of them can be regenerated or replaced from its entry. Status on 11 September 2026: **no imagery has been generated.** The plan in `docs/image-plan.md` is priced and waits for the client's choice (C4). Everything on the site today is one of the four kinds below.

## Generated imagery

None. The Magnific account was checked on 11 September 2026: Pro plan, about 2,390,000 credits available of 3,600,000, 75 credits per person generation at 3:4 and 2K (simulated), 3 per background removal. The fullest option in the plan is under 1 percent of the balance. Nothing was spent; the brief asks for approval first (section 8), and the four options are on the confirm list as C4.

When an option is approved, this table is the record, one row per creation, in the order they are made:

| Slot | File | Prompt summary | Result | Refinements |
| --- | --- | --- | --- | --- |

Procedure, from the Grownz operating record: a Magnific folder named `Linkist website` with `people`, `3d`, `scenes`, `og` and `articles` inside; model `imagen-nano-banana-2-flash`; people at 3:4 and 2K, objects at 1:1 and 1K; one seed and model per series; the first approved object is the style reference for the rest; masters saved under `public/assets/masters/<kind>/` (git-ignored) the moment the download link arrives, because the links expire; `pnpm imagery` delivers 1x and 2x WebP into `public/assets/<kind>/`; the site resolves each slot at build time, so a delivered file appears on the next build with no code change. The prompts are written out slot by slot in `docs/content-hub.md`.

## Design previews from the approved prototype

Three phone screens cropped from the prototype's hero composite (`Linkist Landing.html`), not app captures, and labelled "Design preview" wherever they appear (rule 2, D23). Crops were taken on 10 September 2026 by `pnpm capture:prototype`; the regions are recorded in `captures/prototype-log.json`.

| File | Shows | Used on |
| --- | --- | --- |
| `public/screens/proto-home.png` | Home: ICP Matches Found, a nudge about Julian at GITEX, Opportunity Radar, Network Pulse and Relationship Health | Home hero, stage 3, Act, use cases, most OG cards |
| `public/screens/proto-profile.png` | A public profile page with tags, a personal Linkist address and social links | Stage 2, Find, Profiles and cards |
| `public/screens/proto-share.png` | Share Contact: a QR code and Tap to Link | Hero card slide, stage 1, Capture, NFC cards, bundles |

Real captures replace them the moment the owner signs in once on this machine (`pnpm capture:login`, then `pnpm capture`, C2). The frames and the OG script pick up the captured files by name; nothing else changes.

## Brand

| File | Origin |
| --- | --- |
| `public/brand/mark.png`, `public/brand/lockup.png` | Cropped from the prototype's logo lockup by `scripts/brand-build.ts`. Replace with the vector files when they arrive (C3); the wordmark on the site is set in the brand font, not an image. |
| `public/icon.png`, `public/apple-icon.png`, favicons | Drawn by the same script from the mark on the brand crimson. |

The NFC cards on the site are CSS renders of the three materials with the mark composited by the browser, never a generated image (brief 8). Product photographs from the client replace them (C3).

## Article covers and figures

| Articles | Files | Terms |
| --- | --- | --- |
| The 7 articles imported from linkist.ai/blogs (D18) | `public/blog/<slug>/cover.jpg` and the figures each article embeds, downloaded with the text by `pnpm import:blog` | The company's own published imagery, reused on the company's own site. |
| The 10 articles written for this site (D20) | `public/blog/<slug>/cover.jpg`, title cards drawn by `pnpm covers` from the tokens and the brand fonts | Generated locally, no third-party material. Photographs replace them under option 3 of the image plan (C18). |

## Open Graph cards

42 cards at 1200 x 630 in `public/og/`, rendered by `pnpm og` from the brand fonts, the tokens and either a design preview in a phone frame or an article cover. No person appears on any card yet; the OG script draws one at the right edge as soon as a cut-out exists in `public/assets/people/` (option 3, C4).

## Stock and third-party imagery

None. No stock photographs, icon packs or third-party illustrations are used; the icons are Lucide (ISC licence) rendered inline.
