# Checkpoint 1: audit of the Product Truth Sheet

Date: 10 September 2026. Sources: the approved prototype (`Linkist Landing.html`, unpacked to `prototype/`), the public pages https://linkist.ai and https://prm.linkist.ai, the published privacy policy and terms (linkist.ai/privacy, linkist.ai/terms, version 1.1 dated 1 June 2026), the app's sign-in screens, and a read-only walk of the store at prm.linkist.ai in the owner's browser. **The signed-in walk of the PRM app itself has not happened**: the owner's Chrome session covered the store landing but the account area and the app at m.linkist.ai asked for a fresh verification code, and the site never types credentials. Every app-only line below stays `CONFIRM in app` until `pnpm capture:login` is run once by the owner.

Legend: OK = confirmed on a public surface. DELTA = true, but the brief's wording needs a change. GAP = not shown anywhere, never market it. CONFIRM = only the signed-in app can settle it.

## What the product actually is (the biggest finding)

| Claim | Status | Evidence |
| --- | --- | --- |
| "The app at prm.linkist.ai" | DELTA | prm.linkist.ai is the **store and billing hub**: "This is where you order your NFC card, create your Linkist account, and manage your subscription, credits and invoices." Its nav is Get started, Bring your own, The Card, Get the app, Why Linkist. The **PRM app is mobile-only** and lives at **m.linkist.ai** ("Looking for the Linkist app? It's mobile-only, open this link on your phone"). The site's capture manifest now has two hosts. |
| Store apps "launching on the App Store and Google Play" | DELTA | prm.linkist.ai: "COMING SOON. Linkist, natively. iOS and Android, landing shortly. The apps are in final preparation for the App Store and Google Play." No store links exist. The site says "web app on your phone; native apps in preparation" and never "download the app". |
| Sign-in method | OK | prm.linkist.ai unified auth: "Sign in or create your account", Email or Mobile tab, terms and privacy acceptance, "I confirm I am 18 years of age or older", Continue. m.linkist.ai/login: "Email or Phone Number", "Send Verification Code", "Or create a new account", with a note that users outside the UAE or India should use email "for smoother OTP verification". So: one screen for sign-in and registration, a one-time code, email or phone. |
| Category line "world's first Personal Relationship Manager" | OK | Both public pages. Used on the site as the eyebrow "Personal Relationship Manager"; "world's first" is not claimed by the site (rule 1: it is a marketing superlative without a source). |
| Company | OK | RatioX Labs DWC-LLC, Dubai South Business Park, Building A3, 3rd Floor, Dubai South, Dubai, UAE (privacy policy and terms). Support support@linkist.ai, privacy privacy@linkist.ai, phone and WhatsApp +971 50 440 8656 (linkist.ai). |

## 3.1 What Linkist is

| Claim | Status | Evidence |
| --- | --- | --- |
| PRM definition and "contacts store people, CRMs manage deals" positioning | OK | Prototype FAQ; the site uses the wording verbatim, em dashes rewritten. |
| Two things to buy: the app (four plans) and the NFC card, plus bundles | OK for cards, CONFIRM for plans | Store lists Starter and Signature cards; the plan prices below come from the prototype and are not yet visible on a public page (the store's "Plan" step needs a signed-in checkout). |
| Public lines "The handshake is easy. Remembering is hard." and the other two | OK | linkist.ai. Usable once the client confirms which are current. |
| "Free plan available, no card required to start" | OK | prm.linkist.ai, verbatim. |
| "Bring your own NFC card, sticker or profile link, free, in about a minute" | NEW | prm.linkist.ai and the store: an existing NFC card or sticker can be re-encoded (needs an Android phone), or a Linktree or old profile link can be imported to build the profile. "Free forever, no payment details." The site's NFC pages mention it; a section is planned for `/nfc-cards`. |

## 3.2 The three-stage journey

OK as the prototype's spine. Stage labels on the site: Capture and share, Build relationships, Act and grow. Every capability chip keeps the prototype's spelling (glossary in `src/lib/glossary.ts`).

## 3.3 Feature inventory

| Claim | Status | Evidence |
| --- | --- | --- |
| Capture: NFC tap, QR, card scan, phone import, CSV and VCF, manual add, voice notes, tags, "where we met", AI enrichment, lead capture form, export | CONFIRM in app | Prototype cards and plan comparison. prm.linkist.ai confirms "Scan cards with your camera", "Your address book, upgraded" (phone contacts), "Tap-to-share" and "Everyone who taps you arrives in your exchange inbox". |
| Profiles and cards: digital card with photo, personal URL `linkist.ai/me/<name>`, fields, 1, 3 or 5 profiles, templates, branded QR, sharing by QR, URL, email, SMS; wallet passes; verified tick | CONFIRM in app; URL OK | prm.linkist.ai: "A memorable /me/yourname link that's yours forever"; "Verified presence". Prototype comparison table for the rest. |
| Find: natural-language search, ICP definition and matching, relationship activity and priority, Network Ask, Network Strength | CONFIRM in app | Prototype. The prototype's home mockup shows "ICP Matches Found", "Opportunity Radar", "Network Pulse" and "Relationship Health"; these names are used only as design-preview captions until seen in the app. |
| Act: Top Actions, Weekly Planner, Intelligent Nudges, Smart Signals, Warm Introductions, AI follow-up, AI voice notetaker, mini-CRM, lead scoring | CONFIRM in app | Prototype. prm.linkist.ai confirms "Nudges that arrive in time" and "AI intelligent actions: enrichment, signals and smart introductions". |
| Teams: contact sharing, admin console, company branding, team directory, history stays with the company | CONFIRM in app | Prototype only. |

## 3.4 AI and data

| Claim | Status | Evidence |
| --- | --- | --- |
| AI enriches, matches, scores, drafts, transcribes | CONFIRM in app | Prototype. Terms: "AI outputs are generated using available data and automated systems. They may be inaccurate, incomplete, outdated, biased, or unsuitable" and must be reviewed. The site says the AI suggests and the person decides. |
| AI credits | NEW, CONFIRM | prm.linkist.ai billing hub lists "AI credit top-ups"; linkist.ai mentions "AI-based Intelligent Actions worth $50" in the Founders Circle offer. Metering exists in some form; amounts and what a credit buys are unknown. |
| "GDPR" and "SOC 2 Type 2" | GAP | No evidence on any public surface; the privacy policy does not mention either. Not on the site (D10). |
| "PDPL compliant" | DELTA | prm.linkist.ai says "UAE registered, PDPL compliant". The privacy policy is written to Federal Decree-Law No. 45 of 2021. The site says the policy is written under that law and does not use the word "compliant" until the client supplies a basis. |
| Encryption | OK | Privacy policy: "encryption in transit" and "encryption at rest where appropriate". |
| Hosting and sub-processors | PARTIAL | Privacy policy names Stripe (payments) and categories of providers (hosting, email, shipping, support, analytics, "AI and large language model providers") that "may be located outside the United Arab Emirates". No regions. |
| Deletion and portability | OK | "Request account deletion through the app, website, or by contacting privacy@linkist.ai"; data portability in a machine-readable format; account data kept up to 30 days after deletion; NFC records 5 to 7 years; security logs usually up to 12 months. |
| Imported contacts (other people's data) | OK | Privacy policy section 10 and the terms: the user confirms a right or consent to import; Linkist does not sell imported contacts or market to them unless they opt in. This becomes the Contact Data Notice in checkpoint 6. |

## 3.5 Pricing

| Claim | Status | Evidence |
| --- | --- | --- |
| Card prices | DELTA | The store prices in **AED with an approximate dollar figure**: Starter PVC AED 75 (about $20), wood cherry AED 95 (about $26), metal AED 195 (about $53); Signature PVC AED 95 (about $26), wood AED 115 (about $31), metal AED 225 (about $61). The prototype's AED figures match exactly; its USD figures ($20, $25, $55, $25, $35, $65) are rounded marketing prices, not the store's. The site shows the prototype's pair with the switch and states that AED is being confirmed as the billing currency (C5). |
| Card options | NEW | PVC in white or black with Minimal, Geometric, Wave or Crystal patterns; wood in cherry (Minimal); metal in silver or black with the four patterns. "Premium PVC", "Natural Wood", "Brushed Metal". Starter and Signature share the same materials. |
| Shipping | DELTA | "Ships across the GCC and worldwide"; the store's shipping-region list: UAE, Saudi Arabia, Bahrain, Kuwait, Oman, Qatar, India, United Kingdom, United States, Canada, Australia, Pakistan, Philippines, Egypt, Jordan, Lebanon. "Card shipping included in the UAE" comes from the prototype and is kept as a UAE-only statement until the store confirms costs elsewhere. |
| VAT | NEW | Store: "Secure checkout, VAT shown upfront". |
| PRM plan prices (Essential $0; Enhanced $2, $12, $25; Pro $10, $100; Team $4 per user, $200, minimum 5) | CONFIRM | Prototype only. linkist.ai/choose-plan shows "For me" and "For my team" with "up to 15 percent discount for 5 or more cards", no prices. |
| Bundles ($100 Signature Bundle; $150 Founders Circle Bundle) and the savings tables | CONFIRM | Prototype only. The arithmetic holds only with a metal Signature card at the prototype's $65; the site derives every table from the price data and says so. linkist.ai lists the Founders Circle as "limited-time" and "invite-only". |
| Enterprise | OK | "Coming later, interest only" in the prototype; no plan card anywhere. |
| Checkout location | OK | prm.linkist.ai/store, "Plan, Customise, Checkout, Claim" steps; billing hub for plan, top-ups, invoices and card orders. |
| Refunds | OK | Terms: custom products returnable only if defective, a production error, or materially different from the confirmed order, within 7 days of delivery; refunds in 5 to 10 business days; changes within 24 hours of ordering, not guaranteed once production starts; subscriptions may renew automatically until cancelled. |

## 3.6 Onboarding

OK for the first screen (email or mobile, terms, 18 or older, Continue, then a verification code). CONFIRM: what follows the code, whether a Linkist ID is claimed at sign-up, and how a card is activated (the store has a "Claim" step and an "Activate" tab).

## 3.7 Tech context

Web app for the PRM at m.linkist.ai (mobile-only), store at prm.linkist.ai, public profiles at linkist.ai/me/<name>. Nothing else is assumed.

## 3.8 Brand assets

| Claim | Status | Evidence |
| --- | --- | --- |
| Logo lockup PNG 1352 x 422 in the bundle | OK | Cropped to `public/brand/mark.png`; icons drawn from it. Vector originals still needed (C3). |
| Tokens | OK | `src/styles/tokens.json` measured from the prototype's CSS: ground #141413, surface #262627, raised #2F2F30, hairline rgba(255,255,255,0.08), crimson #CE394D, deep #B1394B, coral #E85F5F, warm grey #D1CDC7, muted #696969 (replaced for contrast, D3), green #4D9078, teal #377F86, radii 24, 20, 40 and 999, shadows and the radial glow. |
| Type | DELTA | The prototype sets DM Sans as the body face and Inter for headings and UI; the brief specifies DM Sans for display and Inter for body. The site follows the brief. |

## 3.9 Known gaps, confirmed

- Store apps: "in final preparation". Say "web app on your phone".
- Enterprise: interest only.
- Compliance badges: no GDPR or SOC 2 evidence; PDPL only as the law the policy is written under.
- Customers and testimonials: none published anywhere.
- The three linkist.ai statistics are unsourced (D9).

## Environment facts that shape the site

- Sign-in and registration: https://prm.linkist.ai/ (unified auth) and https://m.linkist.ai/login (the app). Start free and Sign in point at the app root (D7).
- Store: https://prm.linkist.ai/store. Billing hub: https://prm.linkist.ai/store/account (signed in).
- The public "Why Linkist" link on prm.linkist.ai goes to https://www.linkist.ai, which is the current marketing site this project replaces (C1: where the new site lives).

## Addendum, 10 September 2026, evening: host roles corrected, and the policy read in full

- **Which host is which (corrects the "biggest finding" above).** The owner's instruction for the header buttons, and the published articles (profile addresses of the form `m.linkist.ai/me/name`), place the products the other way round from the morning's reading: **prm.linkist.ai is the PRM app**, with its billing hub and store inside, and its unified screen at `/UnifiedAuth` signs in and registers; **m.linkist.ai is the NFC card product**, with the card-holder sign-in at `/login` and the public profiles under `/me/`. The site's "Get the App" lands on the former and "Get NFC Card" on the latter (D15, R8). The mobile-only notice seen at m.linkist.ai in the morning belongs to the card holder's app. The signed-in walk of either is still pending (C2).
- **The privacy policy and terms, read in full** (version 1.1, 1 June 2026) answer more of 3.4 than the morning table records, and the `/ai` and `/security` pages cite them section by section (D19): AI features are optional with a separate consent (P 8), assistive and never used for legally binding decisions (P 9, T 12), switched off in Privacy Settings or by email (P 6.3, 9); enrichment outputs are kept up to 6 months or until deletion (P 17); the controller is RatioX Labs DWC-LLC at Dubai South Business Park, Building A3, 3rd Floor, with privacy@linkist.ai and dpo@linkist.ai (P 2, 3); the measures are encryption in transit, encryption at rest "where appropriate", role-based access, secure authentication, OTP expiry, audit logging, monitoring, restricted admin access, vendor review, testing "where appropriate" and staff obligations (P 16); providers are named by category with Stripe the only name (P 14); transfers outside the UAE use DPAs, standard clauses and the rest of the P 15 list; rights include portability and deletion, answered within 30 days (P 18, 19); the terms say prices are displayed in USD unless otherwise stated (T 7), which conflicts with the store's AED display (C16, folded into C5); custom cards can be changed within 24 hours of ordering and returned within 7 days of delivery when defective, with refunds in 5 to 10 business days (T 9); subscriptions renew automatically (T 8).
- **Still unpublished, and said so on the pages:** the AI model provider and region, the AI credit table, the hosting provider and region, the sub-processor list by name, any attestation, and a security contact address (C8, C9).
