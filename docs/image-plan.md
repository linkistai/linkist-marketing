# Image plan (brief section 8)

Status: **planned, not generated, not yet priced by the tool.** The brief asks for a balance check and a cost estimate before the first batch. On 10 September 2026 the session's permission classifier refused the Magnific `account_balance` call, so this plan is priced from the costs Grownz recorded with the same model and pipeline (75 credits per generation, 3 per background removal) and needs your approval before anything is generated.

Every product screen on the site is a real capture or a labelled prototype preview (rule 2) and is outside this plan. This plan covers photographs of people, matte 3D objects and FAQ scenes only. Backgrounds are CSS gradients from the tokens.

## Budget question

Approve one of:

1. **Minimal**: 1 hero person (home), 1 closing-band person, 5 feature-card objects and 4 capability objects. About 11 generations plus 6 background removals, roughly 850 credits.
2. **Standard**: minimal plus 5 hero people for the feature pages, 6 closing-band people, 1 pricing person, 1 teams person, 3 FAQ scenes and A and B alternates for the home hero. About 30 generations and 18 removals, roughly 2,300 credits.
3. **Full**: standard plus a person per use-case page, a still life per Learn article (10) and OG persons. About 55 generations and 30 removals, roughly 4,300 credits.
4. **None**: ship with real screens, CSS card renders, token-drawn glyphs in the object slots and no people, as built today.

Grownz used about 12,000 credits over six batches, mostly on regenerations after feedback (complete figures, facing the camera, phone screens). This plan front-loads those rules so the first batch is the right one.

## Setup, once

- `folders_create` "Linkist website" with `people`, `3d`, `scenes`, `og`, `articles`.
- Model for people and objects: `imagen-nano-banana-2-flash` (the Grownz log's working model), people at 3:4 2K, objects at 1:1 1K, background removal at 3 credits, masters kept in `public/assets/masters/` (git-ignored), delivery as WebP at 1x and 2x under `public/assets/<kind>/`. Download immediately; URLs expire. Log every creation in `docs/image-log.md`.

## Rules carried from the brief

- People: editorial studio photographs, **full figure completely inside the frame with generous margin, nothing cropped**, on a plain flat deep charcoal backdrop for cut-out, soft natural light, candid and warm, no text anywhere. Heroes waist-up, facing the camera, holding the phone toward the viewer with a flat magenta screen (`#FF00FF`) so a real capture can be warped onto it. Diverse, Gulf-first plus international; wardrobe charcoal, warm grey, white, one crimson accent. Never the pensive person at a laptop.
- Objects: "Small matte 3D object, product-render style, soft studio light, centred on a plain light warm-grey background, materials in charcoal and paper white with one small crimson accent, no text, no letters, no numbers". The first approved object is the style reference for the rest.
- NFC cards: product photographs from the client preferred; otherwise the CSS renders stay.
- Never generate app screens, QR codes with real payloads, readable business cards or any text. One seed and model per series. Palette discipline.

## Slots

| # | Page | Slot | Purpose | Size | Prompt (template filled) |
| --- | --- | --- | --- | --- | --- |
| 1 | `/` | Hero, left of the phone (`people/hero-1`) | A founder at a Dubai conference stand holding the phone to the camera | 3:4, 2K, cut out | Editorial studio photograph framed from the waist up, the whole head inside the frame with generous space above it, in front of a plain flat deep charcoal backdrop, soft natural light, candid and warm, no text anywhere. An Emirati man in his thirties in a charcoal blazer over a white shirt with a small crimson lanyard, facing the camera and smiling, holding a modern slim smartphone forward at chest height so the screen faces the viewer squarely, upright, fully visible, not covered by any finger. The phone screen is a completely blank flat uniform bright magenta colour (#FF00FF) with no reflections; thin dark bezel. |
| 2 | `/` | Hero alternate B | Same slot, a woman at a coffee table | 3:4 | Same template: a South Asian woman in her late twenties in a warm grey blouse, one crimson scarf, café background implied by nothing (plain backdrop), same phone clause. |
| 3 | `/` | Closing band (`people/close-1`) | Full figure, looking at the camera, phone held casually | 3:4 | Editorial studio photograph, full figure completely inside the frame with generous empty space on every side, nothing cropped, plain flat deep charcoal backdrop, soft natural light: a woman in her forties in a charcoal suit and white trainers, smiling straight at the camera, a phone in one hand at her side, no text anywhere. |
| 4 to 9 | `/how-it-works`, features, pricing, teams | Closing bands (`close-2` to `close-6`), pricing and teams heroes | Diverse full figures and waist-up heroes | 3:4 | Same two templates with new casting: a Filipino man with a conference badge, an older Gulf businessman in a kandura, a young woman scanning a paper business card (waist-up), a man on a metro with the app open (full), a team of three around a table (full). |
| 10 to 14 | Feature pages | Hero people (`feature-capture` and four more) | Waist-up, phone to camera | 3:4 | Hero template with new casting per page. |
| 15 to 23 | Feature cards, capability cards | Objects (`3d-enrich`, `3d-search`, `3d-icp`, `3d-nudge`, `3d-capture`, `3d-profile`, `3d-team`, `3d-calendar`, `3d-handshake`) | Matte 3D objects | 1:1, 1K | Object template with the subject: a card tapping a phone; a magnifier over a contact card; a target with four chips; a bell; a QR tile; an ID card; two overlapping cards; a calendar; a handshake knot. |
| 24 to 26 | FAQ columns | Scenes (`scenes/faq-home`, `faq-pricing`, `faq-cards`) | Rectangular photographs with their own setting | 4:5 | Editorial lifestyle photograph, medium shot, a person at a conference stand looking straight into the camera with a warm smile, the real environment filling the frame, muted charcoal and warm neutrals, one crimson accent, no text, letters or numbers anywhere. |
| 27 to 40 | OG cards, Learn articles | People for OG cards reuse the above; still lifes for Learn come with checkpoint 5 | 16:9 | Photorealistic still life on a dark charcoal surface, top-down, a paper business card face down, a phone face down, a coffee cup, absolutely no letters, words or numbers. |
