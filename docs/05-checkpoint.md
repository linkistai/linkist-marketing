# Checkpoint 5: the content layer

Date: 10 September 2026, night. The brief's checkpoint 5 covers the learn articles, the help centre, the chat page and widget, the changelog and the community page. Also in this round: a deployment fix that landed first, because the first build on the hosting platform failed.

## The deployment fix, first

The first deployment failed while Next collected page data for the 404 page: `TypeError: Invalid URL, input: ''`. A URL variable existed in the hosting dashboard with an empty value, the code treated an empty string as set, and `new URL('')` threw. Every URL read from the environment now goes through `coerceUrl` in `src/lib/site.ts` (empty, blank and non-http values fall back to the default), the redirect config in `next.config.ts` does the same, and empty contact addresses read as unset. Four tests cover it, and a local build with the variables deliberately empty passes. Pushed as `7f55b99`.

## What was built

### Ten articles, on the blog (D20)

Written from the product, bylined "Linkist", dated 10 September 2026, each with 3 FAQ pairs and a title-card cover rendered from the tokens by `pnpm covers`:

1. What a PRM is, and what it is not
2. How to follow up after an event without a spreadsheet
3. ICP Matching, explained
4. The warm-introduction playbook
5. NFC cards versus paper: what actually changes
6. Keeping relationships when people leave
7. Context: the part of a contact a phone book cannot hold
8. A weekly relationship routine that takes 20 minutes
9. What Linkist's AI does with your contacts, and how to switch it off
10. Choosing between Essential, Enhanced, Pro and Team

Every product claim traces to the truth sheet: the capture routes and scan limits, the plan contents and prices, the card materials and AED prices, the Team plan's sharing rule, and the AI rules from the privacy policy and terms. Where a feature is part of Pro or Team, the article says so. No statistics are used (D9).

### Help centre, `/help` (D21)

109 entries in 12 categories, up from 49. Sources: the product's public screens and store, the privacy policy and terms (linked from the answer where it rests on them), the prototype's plan comparison, and the owner's instruction on the two product buttons. Answers about the signed-in app say they are confirmed during the audit. The Limits and roadmap category states section 3.9 plainly: web app until store listings exist, Enterprise interest only, no GDPR or SOC 2 claim, no named customers, no integrations, no published model or credit price. Instant search with highlighting and a category sidebar, as before.

### Ask the assistant, `/chat`

The full-page assistant over the same corpus, with suggested questions and three plain statements of how it answers: from the help centre only, "I do not know" when it does not, nothing stored. The floating widget on every page is the same component.

### Changelog, `/changelog` (D22)

A timeline of dated public events (the website preview, the four blog dates, the legal documents of 1 June 2026), then "In the product today" (sign in with a code, three materials, bring your own card, 16 shipping regions, the billing hub) with the note that no launch date is published, then "Announced as coming" (native apps, Enterprise). A release-notes-by-email form.

### Community, `/community` (D23)

The prototype's sign-up as a page: what members get (product notes, new articles, invitations when there is an event), the form posting to `/api/community`, the three channels the current linkist.ai links to (LinkedIn, Instagram, X), and the three latest reads. The home page's community band links to it.

Also: footer links for the help centre, the assistant, the changelog and the community page; 4 new Open Graph images plus one per new article; sitemap and llms.txt grow with the routes.

## Verified

| Check | Result |
| --- | --- |
| Build | 52 static pages; typecheck, lint and 19 tests clean. |
| Review at 390 and 1440, all 42 public routes | 0 problems: no horizontal scroll, no console errors. |
| Accessibility scan, all routes at both widths | First run: 2 problems, both the new "What members get" link on the home page's community card, where plain coral on a card ground reaches only 4.2:1. Fixed by giving links on cards the ink coral (5.6:1, D3); re-run clean. 0 serious or critical elsewhere, one H1 per page, keyboard pass clean. |
| Content | 0 em dashes in the ten articles and in the source; the imported seven keep theirs (C15). 109 help entries, none with placeholder text. |
| Assistant, production build | Three turns on the newest Chromium without a page error: a card question, an off-topic question (the fallback), an AI question. The first run surfaced the general "What is Linkist?" entry ahead of the card entry, because synonym expansion inflated answer matches; answers now match on their own words and stop-word-only questions get no free divisor. 4 retrieval tests added. |
| Open Graph | 38 images: 21 pages and 17 posts. |

## Decided

D20 (articles on the blog with title-card covers), D21 (help corpus and its sources), D22 (changelog from public sources only), D23 (community promises limited to what is delivered).

## Blocked on the client

- C2 still gates every screen and every "confirmed during the audit" answer in the help centre.
- C17: product release notes for the changelog.
- C18: title-card covers, or photographs under C4.
- C12 for the forms: the community, newsletter and lead routes answer 503 until Resend, Turnstile and `LEAD_TO` are set.

## Honest gaps

- The assistant phrases nothing until `ANTHROPIC_API_KEY` is set; it shows the best-matching entry as written, which is the designed fallback.
- `/contact`, `/about`, `/customers` and the legal hub are checkpoint 6.
- Lighthouse and cross-browser passes remain for checkpoint 8.
