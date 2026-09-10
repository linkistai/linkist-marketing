# Checkpoint 4: the owner's revisions, the AI and security pages, and the blog

Date: 10 September 2026, evening. The brief's checkpoint 4 covers how it works, feature pages, use cases, NFC cards, bundles, pricing, teams, AI and security; all but the last two were built at checkpoint 3 (D13). This round adds `/ai` and `/security`, and applies the owner's revision list for the header, footer, hero, "How Linkist works", the use-case cards and the heading sizes, and pulls the blog across from linkist.ai.

## What was built

### Header and footer (D15)

- The header's buttons are **Get the App** (primary, to the PRM app's unified sign-in and registration screen at prm.linkist.ai/UnifiedAuth) and **Get NFC Card** (secondary, to the card product's sign-in at m.linkist.ai/login). Sign in stays as a text link on desktop and in the menu. The links gain **Blog**. Desktop navigation now starts at 1280 px so the seven links, Sign in and two buttons fit; below that the pill holds the wordmark, Get the App and the menu button.
- The footer carries the same two buttons under the wordmark, adds Blog, Security and "AI and your data" to its columns, and states which host is which in the company line.
- Both URLs live in `src/lib/site.ts` with environment overrides (`NEXT_PUBLIC_GET_APP_URL`, `NEXT_PUBLIC_GET_CARD_URL`); `/app`, `/sign-in`, `/start` and `/get-card` redirect to them. Start free elsewhere on the site lands on the same unified screen.

### Home page (D16, D17)

1. **Hero carousel.** Two slides that slide sideways: the PRM app (the prototype's three-line headline, lede and Get the App plus Explore Linkist, the home screen in a phone with the three floating cards) and the NFC cards ("Tap the card. Share your profile. Save the contact.", a lede from the store's facts, Get NFC Card plus Explore NFC cards, the three materials fanned as CSS cards with "Profile opened with one tap", "Contact saved" and "PRM Essential included" floating beside them). Tabs and arrows under the copy, swipe on touch, arrow keys on the tabs, an 8 s auto-advance that pauses on hover and focus and stops once a visitor takes control; the inactive slide is inert and hidden from assistive technology. Motion off freezes it.
2. **How Linkist works.** The "Where are you right now?" chips moved here from the hero. Below them the three stage screens sit in a row joined by a rail: one stage is lit at a time (scaled up, glow, crimson number) and the rail fills towards the next over 3.6 s; the flow steps by itself while in view and stops when a chip or a stage is clicked. A chip rewrites the scenario line, lights the stage its moment belongs to and points at the use case. The three stage cards below follow the active stage with the gradient ring. On phones the row becomes a snap strip.
3. **Built for real working days.** The tilted fan is replaced by a settled three-plus-two grid that rises into view in turn; two columns on tablets with the fifth card full width; one column on phones.
4. **Headings.** The display scale now matches linkist.ai's home page: 72 px headlines and 56 px section titles at 1440, 36 px and 32 px at 390. The hero grid is 5:3 so the headline column holds 72 px at 1440; below that the headline follows its column with container units so the forced three-line break never wraps.

### `/ai` and `/security` (D19)

Both are written from the published privacy policy and terms of service (version 1.1, 1 June 2026) and from the product as walked through, with the section cited on every card; both end with a "not published yet" list and an FAQ with FAQPage JSON-LD.

- `/ai`: eight capabilities in the product's names with the policy's names beside them; what the AI reads and what it produces; eight rules (separate consent, assistive only, off in Privacy Settings, 6-month retention of enrichment outputs, no sale or marketing to imported contacts, no minors, sensitive data out of scope, AI credits for some actions); the gaps (model provider, region, credit table, which plans include what).
- `/security`: an at-a-glance card; the policy's ten controls; providers by category with Stripe the only name; transfer safeguards; the people in your contacts; the retention table; your rights and the controller's details; the gaps (hosting provider and region, sub-processors by name, attestations, a security address). No GDPR, SOC 2 or ISO claim anywhere (D10).

### The blog (D18)

- `pnpm import:blog` pulls the seven articles published on linkist.ai/blogs from the live pages (the old site's code, in the linkist-prod repository, keeps each article as a React component) into `content/blog/<slug>.md` with a JSON front matter block, downloads the same Unsplash covers and figures into `public/blog/<slug>/`, maps the old site's links to the new pages, drops the old closing CTA blocks, and records the FAQ pairs for FAQPage JSON-LD. Highlight boxes become `::note`, step chips `::flow`, method and audience grids `::cards`; the Markdown renderer grew those blocks and figures with captions.
- `/blogs` keeps the old page's structure in the site's tokens: "Linkist Insights", the featured article, category filters, the card grid with author, date and reading time, and the newsletter band. `/blogs/[slug]` has the category, title, author row, cover, chapters at the side, the body, the two product buttons, the share row, related reading and the closing band, with Article and FAQPage JSON-LD and an Open Graph image built from the cover. `/learn` and `/blog` redirect to `/blogs`.
- The authors' text is verbatim, em dashes included (C15).

## Verified

| Check | Result |
| --- | --- |
| Build | 42 static pages; typecheck, lint and 11 tests clean. |
| Review at 390 and 1440, all 28 public routes | First run: 2 problems, both the home page, where the parked hero slide (translated 12% sideways) widened the page by 23 px at 390 and 30 px at 1440. Fixed by clipping the slide track sideways only; re-run clean. No console errors on any route. |
| Accessibility scan, all routes at both widths | 0 serious or critical problems, one H1 per page, keyboard pass clean. First run flagged one moderate finding on three articles: several tables in one article shared the same region label. Fixed by numbering the table regions; re-run clean. |
| Hero at 72 px | Measured in the page with the site's DM Sans 600 at -0.02em: the widest line, "Act at the right time.", is 9.54 px wide per pixel of font size, so 72 px needs 686 px; the hero grid is 5:3 so the column at 1440 is 715 px and holds it. Below that the headline follows its column at 10.3 container-inline units (54 px in a 523 px column at 1100) so the forced three-line break never wraps. |
| Desktop navigation at 1280 | Seven links, Sign in and the two buttons fit the pill with room to spare. |
| Blog import | 7 posts, 16,172 words, 2 figures, 54 FAQ pairs, 0 links left pointing at the old site's pages. |
| Open Graph | 24 images: 17 pages and 7 posts. |

## Decided

D15 (the two product buttons and the corrected host roles, R8), D16 (the display scale), D17 (the hero carousel, the stage flow with the chips, the use-case grid), D18 (the blog imported verbatim at its existing addresses), D19 (AI and security from the published documents).

## Blocked on the client

- C2 for real screens in the hero, the stage flow and the feature tabs.
- C3 for card photographs to replace the CSS cards on the NFC slide.
- C5 and C16: the terms say USD, the store shows AED.
- C8 and C9: provider names, hosting region, the AI credit table, any attestation, a security address.
- C15: keep or normalise the em dashes in the imported articles.

## Honest gaps

- The stage flow and the carousel show prototype previews and CSS cards, not captures or photographs.
- `/customers` and `/about` wait for C10; the learn articles the brief planned are not written yet (they join the blog at checkpoint 5).
- Lighthouse is still unmeasured; the blog covers are 1600 px JPEGs served through next/image.
