# Confirm list

Items the site cannot decide alone. Resolved items stay here with their answer so the handover has the full history.

## Open, blocking

| # | Question | Why it matters | Recommendation |
| --- | --- | --- | --- |
| C1 | **Domain.** Does the new site replace https://www.linkist.ai at the root, or live on a subdomain? linkist.ai currently carries the marketing pages, the store link and the legal documents. | Every canonical URL, sitemap, OG tag and JSON-LD; the legal links; `NEXT_PUBLIC_SITE_URL`. | Build against `NEXT_PUBLIC_SITE_URL=https://linkist.ai`. Until the switch, OG URLs use the deployment host (`NEXT_PUBLIC_ASSET_URL`). |
| C2 | **One sign-in for captures.** Run `pnpm capture:login` on this machine and sign in on both tabs (the app at m.linkist.ai and the store at prm.linkist.ai) with a demo account that has a few dozen contacts, tags, an ICP and a nudge or two. Then confirm the app's screen paths in `captures/manifest.ts`. | Rule 2: every phone frame is a design preview until then. The whole feature inventory (3.3) is `CONFIRM in app`. | The script types nothing. Tell us which screens must not be captured. |
| C3 | **Logo and icon vectors** (mark, wordmark, lockup, app icon), and NFC card product photographs (PVC, wood, metal; Starter and Signature). | The mark is a crop of the prototype PNG; the cards are CSS renders. | Drop the files in `public/brand/` and `public/assets/cards/`. |
| C4 | **Image plan budget.** Approve one of the four options in `docs/image-plan.md`. The Magnific balance check was refused by the session's permission classifier, so the plan is priced from Grownz's recorded costs. | People, objects and scenes are absent until then. | Option 2 (standard, about 2,300 credits) covers the home page and the feature pages. |
| C5 | **Currency.** The store prices cards in AED with an approximate dollar figure. Which currency bills, and what are the confirmed prices for cards, plans and bundles in both? Are the prototype's round USD card prices ($20, $25, $55 and $25, $35, $65) marketing figures or real? | Pricing page, JSON-LD offers, the bundle arithmetic (which only holds with a metal card at $65). | Show AED as the billing currency with a USD approximation if that is what the store does, and rebuild the savings tables from the confirmed figures. |

## Open, not blocking

| # | Question | Why it matters | Recommendation |
| --- | --- | --- | --- |
| C6 | Shipping: the store lists 16 regions; the prototype says UAE shipping is included. What are the costs and times elsewhere, and is "Ships across the GCC and worldwide" the wording to use? | NFC card and bundle pages, the Refund and Shipping legal document. | Keep "UAE shipping included" and "ships to 16 countries, cost shown at checkout" until answered. |
| C7 | Founders Circle: still running? linkist.ai calls it limited-time and invite-only; the prototype prices the bundle at $150. | `/bundles` and a possible `/founders-circle` page. | If closed, the bundle card comes off and the page is not built. |
| C8 | AI: which model provider, in which region, and what an AI credit buys (the billing hub sells top-ups). The published policy already answers what the AI does, what it reads, what it keeps (up to 6 months) and how to switch it off (Privacy Settings), so `/ai` is built from it (D19). | The `/ai` page's "not published yet" section, the privacy pages and the help centre's AI and data category. | Answer the three open points and the section comes off the page. |
| C9 | Security: hosting provider and region, sub-processors by name, any attestation, and a security contact address. The policy's controls, retention table, rights and transfer safeguards are on `/security` already (D19); it names Stripe and categories only. | The `/security` page's "not published yet" section and the legal sub-processor list. | Answer and the gaps close; the site makes no compliance claim meanwhile (D10). |
| C10 | Founder story, team names, a design-partner invitation, and whether any customer may be named. | `/about` and `/customers`. | Not built until answered. |
| C11 | Public lines from linkist.ai ("The handshake is easy. Remembering is hard." and the other two): current, and usable as headlines? | Learn articles and OG cards. | Assumed usable; not yet placed. |
| C12 | Keys and addresses: Resend, Turnstile, GA4, `LEAD_TO`, `NEXT_PUBLIC_SUPPORT_EMAIL`, partnerships and security addresses. Which markets are notice-only for analytics. | Forms deliver nothing and answer 503 honestly until then; no analytics loads. | Set in Vercel when ready. |
| C13 | Legal counsel for the legal hub, and the company details for the Terms. The published terms and privacy policy (version 1.1, 1 June 2026) are the starting point. | Checkpoint 6. | The site links to the published documents until then (D14). |
| C14 | Vercel: team `bettroi-website`, project name, and the production URL for `NEXT_PUBLIC_ASSET_URL`. | Deployment and OG images. | Create the project at checkpoint 9. |
| C15 | The imported articles keep the authors' em dashes (D18). Normalise them to the house style, or leave the published text as it is? | Rule 5 for the site's own copy; the blog is the authors' voice. | Leave as published unless the authors agree to an edit; one pass over `content/blog` does it. |
| C16 | The terms of service (7) say prices are displayed in USD unless otherwise stated; the store shows AED with an approximate dollar figure. Which is the billing currency? Folded into C5. | Pricing and the legal hub's refund and shipping document. | As C5. |
| C17 | Product release notes: does the team keep any (dates, what shipped)? The changelog carries only dated public events until then (D22). | `/changelog`, the community emails. | Send a list, even rough, and it goes on the timeline under a Product tag. |
| C18 | The articles written in-house (D20) carry title-card covers. Approve them as they are, or fund photographs under C4? | `/blogs` cards and the Open Graph images of those ten posts. | Keep the title cards; they are honest and consistent. |

## Resolved by the walk-through

| # | Question | Answer |
| --- | --- | --- |
| R1 | Where does Start free land? | The app's unified sign-in, which is also where an account is created (email or mobile, then a verification code). No separate registration URL exists (D7). |
| R2 | Is prm.linkist.ai the app? | No. It is the store and billing hub. The PRM app is mobile-only at m.linkist.ai. |
| R3 | Store apps? | In preparation for the App Store and Google Play; no listings. The site says "web app on your phone". |
| R4 | Support and privacy addresses? | support@linkist.ai and privacy@linkist.ai, published in the terms and privacy policy. |
| R5 | Compliance words? | No GDPR or SOC 2 evidence. The privacy policy is written to the UAE Personal Data Protection Law (Federal Decree-Law No. 45 of 2021). |
| R6 | The three statistics on linkist.ai? | Unsourced; not used (D9). |
| R7 | Card materials and options? | PVC white or black in four patterns, cherry wood, brushed metal in silver or black in four patterns. |
| R8 | Which host is which? (corrects R2) | prm.linkist.ai is the PRM app, with its billing hub and store inside; its unified screen at /UnifiedAuth signs in and registers. m.linkist.ai is the NFC card product: card-holder sign-in at /login and the public profiles at /me/name. Stated by the owner on 10 September 2026 and consistent with the published articles (D15). |
