---json
{
  "slug": "accessibility",
  "title": "Accessibility Statement",
  "summary": "The standard this website is built to, how it is checked, what is known to fall short, and how to tell us. A draft for counsel; the app's own status is marked for the company.",
  "status": "draft",
  "version": "0.1",
  "effective": "2026-09-10",
  "updated": "2026-09-10"
}
---

## 1. Commitment

This website aims to conform to the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA, measured on the dark theme it ships with. Accessibility is part of the build, not a pass at the end.

## 2. How this website is checked

- Automated checks with axe-core on every public page at two widths, 390 px and 1440 px, before each release, with zero serious or critical issues allowed.
- A keyboard pass on every page: every interactive element reachable, a visible focus ring, one H1 per page, and headings in order.
- Colour contrast measured on the dark theme: at least 4.5:1 for body text and 3:1 for large text, including badges with brand-tinted text on cards.
- Scrollable strips are keyboard focusable, forms have visible labels, and the assistant is labelled as automated.
- Animation is on by default and can be switched off in the footer; the choice is remembered on the device, and adding ?motion=off to any address switches it off as well.
- Product screens are labelled: real captures, design previews from the approved prototype, or a pending frame that says so.

## 3. Known limitations

- Third-party components, such as the Cloudflare Turnstile check on forms, are provided by their vendors and their conformance is theirs. [PLACEHOLDER: link to the vendor's accessibility statement]
- The Linkist app and profile pages are separate products with their own status. [PLACEHOLDER: the app's conformance target, testing and known issues]
- Some pages carry design previews from a prototype until real screens are captured; their content is described in the alternative text.

## 4. Feedback

If something on this website is hard to use with assistive technology, write to support@linkist.ai with the page address and what happened. [PLACEHOLDER: response time commitment and an escalation route.]

## 5. Review

This statement is reviewed with each release of the website. [PLACEHOLDER: review cadence and the person responsible.]
