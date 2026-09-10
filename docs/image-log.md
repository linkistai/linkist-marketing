# Image log

Every picture the site uses, where it came from and on what terms, so any of them can be regenerated or replaced from its entry. Status on 11 September 2026: **the four NFC card faces are generated** (below, at the owner's request); the people, objects and scenes of `docs/image-plan.md` are priced and wait for the client's choice (C4). Everything else on the site is one of the kinds further down.

## Generated imagery

Magnific project "Linkist", model Google Nano Banana 2 (`imagen-nano-banana-2-flash`), 3:2 at 2K, 75 credits per generation and 3 per background removal; 387 credits spent in total on 11 September 2026 (5 generations, 4 removals). The reference for every card was the real brand mark, uploaded from the deployed site, so the mark on the cards is the mark and nothing is generated as text: the name and company on a card are HTML (D35). Masters in `public/assets/masters/cards/` (git-ignored, the raw renders beside them in `cards-raw/`), delivered by `pnpm imagery` as `public/assets/cards/<material>-1x.webp` and `-2x.webp`.

| Slot | File | Prompt summary | Result | Refinements |
| --- | --- | --- | --- | --- |
| NFC card, PVC | cards/pvc | Matte black PVC card, straight on, the red mark top-left in spot varnish, dark chip top-right, embossed NFC wave bottom-right, lower-left empty, no text | Approved | Background removed |
| NFC card, wood | cards/wood | The same card in cherry wood, warm reddish-brown, straight grain, satin oiled finish, engraved wave | Approved on the second take; the first came out pale (kept as `cards-raw/wood-pale-raw.png`, not used) | Background removed |
| NFC card, metal | cards/metal | The same card in brushed gunmetal stainless steel, glossy enamel mark, etched wave | Approved | Background removed |
| NFC card, Founders Circle | cards/founders | The same card in deep crimson-black PVC with a fine guilloche pattern and a thin polished dark-red border | Approved | Background removed |

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

The NFC cards on the site are the generated faces above with the name and company set in HTML; the card backs shown in the hero flip are drawn from the tokens with the mark. Product photographs from the client replace the four files (C3).

## Article covers and figures

| Articles | Files | Terms |
| --- | --- | --- |
| The 7 articles imported from linkist.ai/blogs (D18) | `public/blog/<slug>/cover.jpg` and the figures each article embeds, downloaded with the text by `pnpm import:blog` | The company's own published imagery, reused on the company's own site. |
| The 10 articles written for this site (D20) | `public/blog/<slug>/cover.jpg`, title cards drawn by `pnpm covers` from the tokens and the brand fonts | Generated locally, no third-party material. Photographs replace them under option 3 of the image plan (C18). |

## Open Graph cards

42 cards at 1200 x 630 in `public/og/`, rendered by `pnpm og` from the brand fonts, the tokens and either a design preview in a phone frame or an article cover. No person appears on any card yet; the OG script draws one at the right edge as soon as a cut-out exists in `public/assets/people/` (option 3, C4).

## Stock and third-party imagery

None. No stock photographs, icon packs or third-party illustrations are used; the icons are Lucide (ISC licence) rendered inline.
