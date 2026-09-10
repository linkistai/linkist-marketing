# Proposed final sitemap

Changes from the brief's section 4 are marked. Every page: one job, one primary CTA (Start free, or Get your card on card pages), unique metadata, static prerender.

## Core

| Route | Job | Hero screen | Status | Change from brief |
| --- | --- | --- | --- | --- |
| `/` | Explain Linkist in 30 seconds and send people to Get the App or Get NFC Card | Prototype home screen (design preview) until the real home capture; CSS cards on the NFC slide | Built | Sections in the prototype's order, with a two-slide hero (D17), the intent chips inside "How Linkist works", and the use cases in a three-plus-two grid; the comparison table lives on `/pricing#compare`. |
| `/how-it-works` | The three stages in depth, one screen and one mini mockup per stage | Share, profile and home previews | Built | None |
| `/features` | Hub, one card per family | Objects and mini mockups | Built | Five families: Capture, Find, Act, Profiles and cards, Teams. |
| `/features/capture`, `/find`, `/act`, `/profiles`, `/teams` | Sticky feature tabs, chips, FAQ | Preview in the hero, pending captures in the tabs | Built | None |
| `/use-cases` | Hub of the five use cases | None | Built | Added: the brief lists only the five slug pages; a hub gives the nav a target. |
| `/use-cases/after-the-event` and four more | Problem, "with Linkist" steps, outcome, capabilities, one screen | Preview | Built | None |
| `/nfc-cards` | Starter and Signature, materials, what a tap does, every card includes PRM Essential | CSS card visualiser, Share Contact preview | Built | The store also sells a free "bring your own card" activation and lists 16 shipping regions; both are stated in the FAQ (C5, C6). |
| `/bundles` | Signature Bundle and Founders Circle, savings tables, three-year view | CSS cards | Built | Savings are derived from the price data per material. |
| `/founders-circle` | The offer, if still running | | Not built | Pending C7 (offer status). |
| `/pricing` | Four plans, comparison table, cards, bundles, billing FAQ | | Built | The USD/AED switch applies to cards; plan prices are USD until C5 is answered. |
| `/teams` | The Team plan for companies | Team mini mockup | Built | Enterprise is an interest route (mailto) until a contact page exists. |
| `/ai` | What the AI does, reads, keeps; how to switch it off | Home preview | Built | Written from the published policy and terms with citations (D19); provider, region and credits listed as not published (C8). |
| `/security` | Trust page for a sceptical reader | At-a-glance card | Built | The policy's controls, providers by category, retention, rights, transfers and a "not published yet" list (D19, C9). |
| `/customers` | Honest proof page | | Not built | Pending C10 (founder story, design-partner invitation). |
| `/about` | RatioX Labs, the idea of a PRM, the team, contact | | Not built | Pending C10. |

## Content and support

| Route | Job | Status |
| --- | --- | --- |
| `/blogs`, `/blogs/[slug]` | The seven articles published on linkist.ai/blogs, imported verbatim at their existing addresses; `/learn` redirects here (D18) | Built |
| Ten in-house articles at `/blogs/[slug]` | Written from the product with title-card covers (D20); `/learn` redirects to `/blogs` | Built |
| `/help` | Twelve categories, instant search, 109 Q&As with sources, a Limits category (D21) | Built |
| `/chat` | Full-page assistant over the same corpus, suggested questions, how it answers | Built |
| `/changelog` | Dated public events, what is in the product today, what is announced (D22) | Built |
| `/community` | The sign-up as a page, what members get, three channels, latest reads (D23) | Built |
| `/contact` | Support, partnerships, press, security | Checkpoint 6 |

## Legal hub `/legal`

Terms, Privacy, Cookie Policy, Acceptable Use, Refund and Shipping, Sub-processors, Security Overview, Accessibility, Company Information, Contact Data Notice. Checkpoint 6. Until then the footer links to the company's published privacy policy and terms on linkist.ai (D14).

## Utility

`/404` (built), `/500` (built), `/sitemap.xml`, `/robots.txt`, `/llms.txt`, `/manifest.webmanifest`, favicons and app icons (built), `/app`, `/sign-in` and `/start` redirect to the PRM app's unified screen, `/get-card` to the card product's sign-in, `/learn` and `/blog` to `/blogs` (built).

Total today: 42 prerendered public routes plus 4 API routes (`/api/lead`, `/api/subscribe`, `/api/community`, `/api/chat`).
