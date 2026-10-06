# Tracking on www.linkist.ai

For the marketing team. Updated 7 October 2026 (decision D75).

## What is installed

- Google Tag Manager, container GTM-P8RPQ6RG, on www.linkist.ai and linkist.ai only. Preview and local copies of the site never load it.
- It loads only after a visitor allows "Cookies for analytics and ads" in the cookie notice. For a returning visitor who allowed it, it starts from the top of `<head>` on every page.
- Google Consent Mode is set to granted just before the container loads. If the visitor later switches off under "Cookie choices" in the footer, Consent Mode is updated to denied and the Pixel gets `fbq('consent', 'revoke')`.
- The `<noscript>` iframe from the install code is left out on purpose: it would run without consent, and it only serves browsers with JavaScript turned off.

## Page views

Every page is complete HTML for search engines, but moving between pages does not reload the browser.

- **First page of a visit:** the usual Consent Initialization, Initialization, Container Loaded, DOM Ready and Window Loaded events.
- **Every later page:** a History Change event, plus a data layer event:

  ```js
  { event: 'virtual_page_view', page_path: '/pricing', page_location: 'https://www.linkist.ai/pricing', page_title: 'Pricing: … | Linkist' }
  ```

What to set up in the container:

- **Meta Pixel:** fire the tag that sends PageView on a Custom Event trigger `virtual_page_view` as well as on All Pages. Without this, the Pixel counts only the first page of each visit (the problem seen on the old site in September).
- **GA4:** nothing needed. The Google tag counts these page changes itself through enhanced measurement ("Page changes based on browser history events", on by default). Do not also send a `page_view` on `virtual_page_view`, or every later page counts twice.

## Button clicks: `cta_button_click`

Every forward call to action has the class `cta_button_click` and a `data-cta` attribute. These are Get the App, Get NFC Card, Start Now, the plan and NFC card buttons, Bundles and Bring your own. `data-cta` holds the placement name, the same as the link's `utm_content`, for example `pricing_prm_pro`. Billing, Suggest a feature, Sign in and links within the site do not have it.

On click the site also pushes:

```js
{ event: 'cta_button_click', cta_name: 'pricing_prm_pro', cta_text: 'Start Here', cta_url: 'https://prm.linkist.ai/…', page_path: '/pricing' }
```

Use one of these, not both, or each click counts twice:

1. **A Just Links click trigger:** Click Classes contains `cta_button_click`, with "Wait for tags" on, because these links leave the site for prm.linkist.ai. Read the placement with an Auto-Event Variable (Element Attribute `data-cta`).
2. **A Custom Event trigger** `cta_button_click`, with Data Layer Variables `cta_name`, `cta_text` and `cta_url`.

## After the button

The steps after these buttons are in the PRM app at prm.linkist.ai, which is a separate app: sign-up, store, checkout and payment. To measure that part of the funnel, the app's developer has to install the same container there and put the class on its buttons.

## Still to decide

- **UTM tags on internal links.** Every button link carries `utm_source=linkist_ai&utm_medium=website`, which the PRM app's Entry Links and UTM report reads. Suppose GA4, with this same property, also runs on prm.linkist.ai. Those tags then become each visitor's latest traffic source, and sign-ups are credited to linkist_ai / website instead of where the visitor really came from, for example a Meta ad. Fix it with either a separate GA4 property for the app, or another way for the app to read the placement.
- **Consent by country.** The notice asks every visitor, because the site does not yet know where a visitor is. It was built for notice-only markets (UAE, India, US, Singapore and Australia), where tags start unless the visitor switches them off. That needs a small country lookup on the server; until then, data comes only from visitors who press Allow.
