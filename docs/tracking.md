# Tracking on www.linkist.ai

For the marketing team. Updated 7 October 2026 (decision D75).

## What is installed

- Google Tag Manager, container GTM-P8RPQ6RG, on www.linkist.ai and linkist.ai only. Preview and local copies of the site never load it.
- It loads only after a visitor allows "Cookies for analytics and ads" in the cookie notice. For a returning visitor who allowed it, it starts from the top of `<head>` on every page.
- Google Consent Mode is set to granted just before the container loads. If the visitor later switches off under "Cookie choices" in the footer, Consent Mode is updated to denied and the Pixel gets `fbq('consent', 'revoke')`.
- The `<noscript>` iframe from the install code is left out on purpose: it would run without consent, and it only serves browsers with JavaScript turned off.
- The site's security policy (CSP) lists every host these tags use. That includes the Pixel's Conversions API gateway from its Meta configuration: tw-0fde0867b14c4d8e9131519b5349f6f2.ecs.us-west-2.on.aws, with the fallback bded8a3c6ae-1-1053047382554.us-central1.run.app.
  - If you change the gateway, or add a tag that loads from a new host, tell the developer first. Otherwise the browser blocks it without any visible error.

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

## The early access page

`/early-access` is the landing page for the UAE 55 ads (16 November 2026, decision D77; changed on 17 November, D79). It has its own short header and footer instead of the site menu.

- **Page views** work as on every other page.
- **A claim.** When the form succeeds and the confirmation opens, the site pushes:

  ```js
  { event: 'generate_lead', form_name: 'early_access_uae55' }
  ```

  Use a Custom Event trigger `generate_lead` for the Google Ads conversion, the Pixel's Lead event and the LinkedIn conversion. No name or email goes into the data layer.
- **Activate my year of Pro.** The confirmation's button has `cta_button_click` with `data-cta="early_access_activate_pro"`. It opens the app in the same tab with Pro (annual), the UAE and the coupon chosen and the visitor's email filled in: `https://prm.linkist.ai/plans?plan=pro&period=annual&country=AE&coupon=UAE55&email=…&utm_source=linkist_ai&utm_campaign=early_access_uae55&utm_medium=website&utm_content=early_access_popup`. The email is added only at the click. The link on the page, and the `cta_url` the event carries, leave it out, so no tag can collect it. The link in the visitor's email is the same, with `utm_medium=email&utm_content=early_access_email`.
- **See Pro plans.** Once the places are taken, the card's button has `data-cta="early_access_full_see_plans"` and opens prm.linkist.ai/plans with Pro chosen.
- **Ad links.** Each claim carries the landing address's `utm_` values and the click IDs `gclid`, `fbclid` and `li_fat_id`, and the lead email lists them. So give every ad its own `utm_source`, `utm_medium`, `utm_campaign` and `utm_content`.
- **LinkedIn.** The site's security policy does not yet list the LinkedIn Insight Tag's hosts. Ask the developer to add them before you put the tag in the container.

## After the button

The steps after these buttons are in the PRM app at prm.linkist.ai, which is a separate app: sign-up, store, checkout and payment. To measure that part of the funnel, the app's developer has to install the same container there and put the class on its buttons.

## Still to decide

- **UTM tags on internal links.** Every button link carries `utm_source=linkist_ai&utm_medium=website`, which the PRM app's Entry Links and UTM report reads. Suppose GA4, with this same property, also runs on prm.linkist.ai. Those tags then become each visitor's latest traffic source, and sign-ups are credited to linkist_ai / website instead of where the visitor really came from, for example a Meta ad. Fix it with either a separate GA4 property for the app, or another way for the app to read the placement.
- **Consent by country.** The notice asks every visitor, because the site does not yet know where a visitor is. It was built for notice-only markets (UAE, India, US, Singapore and Australia), where tags start unless the visitor switches them off. That needs a small country lookup on the server; until then, data comes only from visitors who press Allow.
