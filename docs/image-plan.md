# Image plan (brief section 8)

Status on 10 September 2026, checkpoint 7: **planned and priced, not generated.** The Magnific balance check succeeded this time: the account is on the Pro plan with about 2,390,000 credits available of 3,600,000, and one person generation simulates at 75 credits (the tool marks the figure as variable because the model is chosen at run time). Unlimited mode is not active in this session, so generations consume credits. The fullest option below costs under 1 percent of the balance. Approval is still needed before the first batch (C4), because the brief asks for it and because the look of the first batch sets the look of the site.

Every product screen on the site is a real capture or a labelled prototype preview (rule 2) and is outside this plan. This plan covers photographs of people, matte 3D objects and FAQ scenes only. Backgrounds are CSS gradients from the tokens. The in-house articles keep their title-card covers unless C18 says otherwise.

## Budget question

Approve one of:

1. **Minimal**: the home hero person, 1 closing-band person, and the 7 objects the feature and capability cards resolve. About 9 generations plus 8 background removals, roughly 700 credits.
2. **Standard**: minimal plus the 11 remaining closing-band people, the pricing and teams heroes, 5 feature-page heroes, 3 FAQ scenes and an A and B alternate for the home hero. About 32 generations and 22 removals, roughly 2,500 credits.
3. **Full**: standard plus a person per use-case page, a still life per in-house article (10) to replace the title cards, and OG persons. About 58 generations and 30 removals, roughly 4,500 credits.
4. **None**: ship as built: real screens or labelled previews, CSS card renders, token-drawn glyphs in the object slots, title-card covers, no people.

Grownz used about 12,000 credits over six batches, mostly on regenerations after feedback (complete figures, facing the camera, phone screens). This plan front-loads those rules so the first batch is the right one.

## Setup, once

- `folders_create` "Linkist website" with `people`, `3d`, `scenes`, `og`, `articles`.
- Model for people and objects: `imagen-nano-banana-2-flash` (the Grownz log's working model), people at 3:4 2K, objects at 1:1 1K, background removal at 3 credits, masters kept in `public/assets/masters/<kind>/` (git-ignored), delivery as WebP at 1x and 2x under `public/assets/<kind>/` by `pnpm imagery` (scripts/imagery-process.ts, smoke-tested). Download immediately; URLs expire. Log every creation in `docs/image-log.md`.
- The site resolves each slot at build time (`src/lib/screens.ts`): a delivered file appears on the next build with no code change; an absent file renders nothing or a glyph.

## Rules carried from the brief

- People: editorial studio photographs, **full figure completely inside the frame with generous margin, nothing cropped**, on a plain flat deep charcoal backdrop for cut-out, soft natural light, candid and warm, no text anywhere. Heroes waist-up, facing the camera, holding the phone toward the viewer with a flat magenta screen (`#FF00FF`) so a real capture can be warped onto it. Diverse, Gulf-first plus international; wardrobe charcoal, warm grey, white, one crimson accent. Never the pensive person at a laptop.
- Objects: "Small matte 3D object, product-render style, soft studio light, centred on a plain light warm-grey background, materials in charcoal and paper white with one small crimson accent, no text, no letters, no numbers". The first approved object is the style reference for the rest.
- NFC cards: done on 11 September outside this plan at the owner's request, four faces rendered from the brand mark (D35, `docs/image-log.md`); product photographs from the client still replace them (C3).
- Never generate app screens, QR codes with real payloads, readable business cards or any text. One seed and model per series. Palette discipline.

## Slots the site resolves today

| Slot file | Page | Purpose | Size | Casting or subject |
| --- | --- | --- | --- | --- |
| `people/hero-1` | `/` hero, PRM slide | Waist-up, phone to camera | 3:4, 2K, cut out | An Emirati man in his thirties, charcoal blazer, white shirt, crimson lanyard; alternate B: a South Asian woman in her late twenties, warm grey blouse, crimson scarf |
| `people/close-1` | `/` closing band | Full figure, smiling at the camera, phone at her side | 3:4 | A woman in her forties, charcoal suit, white trainers |
| `people/close-2` to `close-6` | how it works, features, use cases, NFC cards, AI | Full figures | 3:4 | A Filipino man with a conference badge; an older Gulf businessman in a kandura; a young woman scanning a paper card (waist-up); a man on a metro with the app open; a team of three around a table |
| `people/close-7` to `close-12` | security, help, changelog, community, about, customers | Full figures | 3:4 | Six more castings in the same wardrobe, Gulf-first plus international |
| `people/pricing`, `people/teams` | pricing and teams heroes | Waist-up, phone to camera | 3:4 | Two castings |
| `people/feature-capture` and four more | feature-page heroes | Waist-up, phone to camera | 3:4 | Five castings (option 2) |
| `3d/3d-enrich`, `3d-search`, `3d-icp`, `3d-nudge`, `3d-capture`, `3d-profile`, `3d-team` | capability and feature cards | Matte 3D objects | 1:1, 1K | A contact card filling in; a magnifier over a card; a target with four chips; a bell; a card tapping a phone; an ID card; two overlapping cards |
| `scenes/faq-home`, `faq-pricing`, `faq-cards` | FAQ columns | Rectangular photographs with their own setting | 4:5 | A person at a conference stand looking into the camera, muted charcoal and warm neutrals, one crimson accent, no text anywhere |
| Article stills (option 3) | the ten in-house articles | Still lifes to replace the title cards | 16:9 | Top-down still life on a charcoal surface: a paper card face down, a phone face down, a coffee cup; absolutely no letters, words or numbers |

## Prompt templates

**Hero (waist-up):** Editorial studio photograph framed from the waist up, the whole head inside the frame with generous space above it, in front of a plain flat deep charcoal backdrop, soft natural light, candid and warm, no text anywhere. [Casting], facing the camera and smiling, holding a modern slim smartphone forward at chest height so the screen faces the viewer squarely, upright, fully visible, not covered by any finger. The phone screen is a completely blank flat uniform bright magenta colour (#FF00FF) with no reflections; thin dark bezel.

**Closing band (full figure):** Editorial studio photograph, full figure completely inside the frame with generous empty space on every side, nothing cropped, plain flat deep charcoal backdrop, soft natural light, candid and warm: [casting], smiling straight at the camera, a phone in one hand at their side, no text anywhere.

**Object:** Small matte 3D object, product-render style, soft studio light, centred on a plain light warm-grey background, materials in charcoal and paper white with one small crimson accent, no text, no letters, no numbers: [subject].

**Scene:** Editorial lifestyle photograph, medium shot, [subject], the real environment filling the frame, muted charcoal and warm neutrals, one crimson accent, no text, letters or numbers anywhere.

**Still life:** Photorealistic still life on a dark charcoal surface, top-down, [objects], soft directional light, absolutely no letters, words or numbers.
