# Checkpoint 3: home page

Date: 10 September 2026. Built to the prototype's section order (brief, Appendix A) with the Grownz patterns and the Linkist tokens. No generated photography yet (image plan pending approval, C4); every phone frame carries a prototype design preview until the owner's sign-in produces real captures (C2).

## What was built

Route `/`, 12 sections, all copy in `src/content/home.ts` and `src/content/plans.ts`:

1. **Hero.** Eyebrow "Personal Relationship Manager", the three-line headline with the third line in coral, the prototype's lede and two buttons (Start free, Explore Linkist), the prototype's line under them, then four intent chips ("I just came back from an event", "I need to find the right person", "I have too many relationships to track", "I run a team"). Each chip rewrites the lede, swaps the phone screen and points "Read this use case" at the matching page; the CTA never changes. The phone shows the prototype's home screen with a "Design preview" badge; three floating cards drift around it ("Contact captured, context saved" with a live dot, "Next action: follow up with Sara M." and an ICP-matches chip, the latter two marked example). Proof strip: start free with no card, works with or without a card, every card includes PRM Essential, sign in with email or mobile, ships across the GCC and worldwide. The hero person slot is ready for the image plan.
2. **How Linkist works.** The three stages as a deck of three prototype screens that fans on entry, then the three numbered stage cards with the prototype's bullets, outcome line, capability chips and a link into the feature page.
3. **Built for real working days.** The five use cases as a snap strip on phones and a fan of tilted cards on desktop, each with problem, result and three chips, linking to its page.
4. **More than an organised address book.** Four cards and the closing line, on the lifted charcoal ground.
5. **What powers Linkist.** Four capability cards (AI Enrichment, Natural-Language Search, ICP Matching, Smart nudges), each with an object slot (a token glyph until the object exists) and a mini mockup replaying the flow with example figures, plus "See more features".
6. **Linkist PRM pricing.** Four plan cards with Pro featured by a gradient ring and glow, grouped inclusions, prices from the prototype, the enterprise note, and "Compare PRM plans" to the table on `/pricing#compare`.
7. **Linkist NFC cards.** Starter and Signature with three CSS-rendered cards each, the USD/AED switch (AED leads because the store bills in AED; the dollar figure is the store's approximation), and "Explore NFC cards".
8. **Bundled offers.** Four benefit tiles, the two offer cards with the Founders Circle Bundle featured, the immediate-saving table per material and the three-year view, every figure derived from the price data.
9. **FAQ.** The prototype's seven questions as pill cards with FAQPage JSON-LD; the AI and data answer rewritten to what the privacy policy states (D10). A scene column appears when the asset exists.
10. **Community.** "Join the Linkist community" with an email form posting to `/api/community`.
11. **Closing band.** "Capture the people you meet. Remember why they mattered." with Start free and the reassurance line; a person slot at the right.
12. Organization, SoftwareApplication (one offer per plan, USD) and two Product entries (an offer per material, AED) as JSON-LD.

Also built so that no home-page link dead-ends (D13): `/how-it-works`, `/features` and five feature pages with sticky tabs, `/use-cases` and five use-case pages, `/nfc-cards` (with the store's card options, the free bring-your-own route and the 16 shipping regions), `/bundles`, `/pricing` (with the full comparison table), `/teams`, plus the 404 and 500 pages, sitemap, robots, `llms.txt`, manifest, icons and the `/app`, `/sign-in` and `/start` redirects.

## Verified

| Check | Result |
| --- | --- |
| Build, typecheck, lint, tests | Clean. |
| Responsive review at 390 and 1440, all 18 routes | No horizontal scroll, no page errors. |
| Accessibility scan, all routes at both widths | 0 serious or critical problems; one H1 per page; keyboard pass clean. |
| Content | 0 em dashes in the site copy (every prototype sentence with one was rewritten), 0 lorem, no `[CONFIRM]` text on any page; every claim traces to `docs/01-audit.md` and its open items are in `docs/confirm-list.md`. Every Start free lands on the app's sign-in screen. |
| Visual | Full-page sheets at 390 and 1440 for every route and viewport slices of the main pages in `captures/site-review`. Frames keep their corners at every size; floating cards sit at fixed positions with drift clearance. |
| Interaction, read from the DOM | Each intent chip sets `aria-pressed`, rewrites the lede and shows exactly one frame; the deck reports fanned in view; the currency switch flips every card price. |

## Decided

D4 (gradient ring instead of the prototype's filled cards), D5 (design previews only inside frames, badged), D8 (AED-first card prices), D13 (linked pages built now).

## Blocked on the client

- C2 for real screens in every frame and the feature inventory. The page is built so captures drop in with no code change: `src/lib/screens.ts` resolves `public/screens/<name>.png` at build time.
- C4 for people, objects and scenes.
- C5 for the billing currency and confirmed plan and bundle prices.

## Honest gaps

- The prototype's three screens stand in for the many screens the feature tabs need; those tabs show "Real screen capture pending" with the screen's name.
- The 3D objects are token-drawn glyphs until the image plan runs.
- Lighthouse was not measured in this session; the page carries no third-party script until GA and Turnstile keys exist, and the display face uses `font-display: optional` to keep CLS at zero.
