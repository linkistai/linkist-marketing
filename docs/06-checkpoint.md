# Checkpoint 6: legal hub, contact, about, customers, utility

Date: 10 September 2026, night. The brief's checkpoint 6 covers the legal hub, contact, about, customers and the utility pages. The utility set (404, 500, sitemap, robots, llms.txt, manifest, icons, the app redirects) was built at checkpoints 3 to 5 and only grows here with the new routes.

## What was built

### The legal hub, `/legal` (D24)

Ten documents, each dated, each with a contents column and the other documents at the side.

- **In force, reproduced verbatim:** the Terms of Service and the Privacy Policy, version 1.1 effective 1 June 2026, pulled from linkist.ai by `pnpm import:legal` with their headings, lists and tables intact (3,281 and 2,773 words). Each page links to the original and says the published version prevails if the two differ.
- **Drafts for counsel, not in force:** Cookie Policy, Acceptable Use Policy, Refund and Shipping Policy, Sub-processors, Security Overview, Accessibility Statement, Company Information and the Contact Data Notice. Each is written from the published documents, the store and the product, dated 10 September 2026 as draft 0.1, and carries every open point as a visible placeholder marker with a count in the header. Drafts are noindex and outside the sitemap until signed off (C19).
- The footer now links the internal Privacy and Terms pages and the hub, replacing the external links of D14.

### Contact, `/contact` (D25)

Support and privacy with the published addresses (support@linkist.ai, privacy@linkist.ai, dpo@linkist.ai), partnerships and security with environment overrides and honest "no dedicated address yet" states, press by form, the phone and WhatsApp number the current site publishes, the company's postal address, and the contact form with a new "Design partner programme" topic. Environment variables still decide delivery (C12).

### About, `/about` (D26)

The idea of a PRM and the three stages, six principles each pointing at its source, the team stated as "named when confirmed" (C10), how the product is built from what is public (a web app at prm.linkist.ai, profiles under /me, native apps in preparation), a dated timeline from public sources, and the company card with the controller, the law and the addresses.

### Customers, `/customers` (D26)

No named customer: the page says why and what the site can show instead. Three example networks (a founder before a raise, a sales lead after a trade show, a recruiter with three roles) as mini mockups, each labelled "Example, not a customer". A design-partner invitation that states the ask and promises nothing until the company settles what partners receive (C20). Links to the five use cases.

Also: 4 new Open Graph images, sitemap and llms.txt grow with the routes.

## Verified

| Check | Result |
| --- | --- |
| Build | 66 static pages; typecheck, lint and 19 tests clean. |
| Review at 390 and 1440, the 14 new routes | 0 problems: no horizontal scroll, no console errors. |
| Accessibility scan, the 14 new routes at both widths | 0 problems, first run: no serious or critical findings, one H1 per page, keyboard pass clean, placeholder marks pass contrast. |
| Legal import | Both documents extracted with headings, lists and 29 table rows; no em dashes in either; endings clean. |
| Content | The drafts' placeholders are visible marks on the page and counted in each header; the two published documents carry none. |

## Decided

D24 (published documents verbatim, drafts marked and hidden from search), D25 (contact routes from published addresses and environment), D26 (about and customers as honest pages).

## Blocked on the client

- C19: counsel review of the eight drafts and their placeholder items.
- C20: what design partners receive.
- C10: the founder story and the team's names and roles.
- C12: the addresses and keys that make the forms deliver.
- C1: the domain, which the Company Information draft leaves as a placeholder.

## Honest gaps

- The drafts are drafts. They are written to be reviewed, not to be relied on, and the page says so above every one.
- No customer story exists to tell; the page is honest about that rather than decorative.
- Checkpoint 7 (SEO and imagery pass), 8 (full QA incl. Lighthouse and cross-browser) and 9 (deploy and handover) remain.
