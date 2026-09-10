/**
 * Changelog (brief 4, checkpoint 5). Linkist has not published product release notes, so this
 * page lists only dated events with a public source, and states what is in the product today
 * without a launch date. Product release notes join it when the team publishes them (C17).
 */
export type ChangeTag = 'Product' | 'Website' | 'Blog' | 'Legal';

export interface Change {
  readonly date: string;
  readonly tag: ChangeTag;
  readonly title: string;
  readonly items: readonly string[];
  readonly source: string;
}

export const CHANGELOG: readonly Change[] = [
  {
    date: '2026-09-10',
    tag: 'Website',
    title: 'The new Linkist website, in preview',
    items: [
      'Home, how it works, five feature pages, five use cases, NFC cards, bundles, pricing with the full plan comparison, and teams.',
      'AI and your data, and security, written from the published privacy policy and terms with the section cited on every card.',
      'The blog moved across with all 7 articles at their existing addresses, plus this changelog, the help centre, the assistant and the community page.',
      'Get the App and Get NFC Card in the header and footer, and a two-slide hero for the PRM app and the NFC cards.',
    ],
    source: 'This site, docs/decision-log.md',
  },
  {
    date: '2026-07-23',
    tag: 'Blog',
    title: 'Two articles on identity and AI memory',
    items: ['LinkedIn Profile vs Digital Identity: Why Professionals Need Both (23 July).', 'AI Can Remember Everyone You Meet. But Should It? (21 July).'],
    source: 'linkist.ai/blogs',
  },
  {
    date: '2026-07-01',
    tag: 'Blog',
    title: 'Relationship capital, and the tap-to-follow-up flow',
    items: ['What Is Relationship Capital, and Why Is It a Business Asset?', 'How AI Turns an NFC Tap Into a Smarter Professional Follow-Up.'],
    source: 'linkist.ai/blogs, dated July 2026',
  },
  {
    date: '2026-06-01',
    tag: 'Blog',
    title: 'The first three guides',
    items: ['What Is Personal Relationship Management and Why Do Professionals Need It?', 'How to Network at Business Events in the UAE and Be Remembered.', 'What Is a Digital Business Card? A Complete Guide for UAE Professionals and Global Teams.'],
    source: 'linkist.ai/blogs, dated June 2026',
  },
  {
    date: '2026-06-01',
    tag: 'Legal',
    title: 'Privacy policy and terms of service, version 1.1',
    items: [
      'The privacy policy names RatioX Labs DWC-LLC as controller, sets separate consents for AI features, contact import, location and marketing, and publishes the retention schedule and your rights.',
      'The terms cover custom card orders (changes within 24 hours, defective returns within 7 days), automatic renewal of subscriptions, AI outputs as assistive only, and the prohibited data list.',
    ],
    source: 'linkist.ai/privacy, linkist.ai/terms',
  },
];

/** In the product today; the store and public pages say so, but no launch date is published. */
export const IN_PRODUCT: readonly { title: string; body: string }[] = [
  { title: 'Sign in with a code', body: 'Email or mobile number and a one-time code on one screen that also creates the account. No password.' },
  { title: 'Cards in three materials', body: 'PVC and brushed metal in white or black with four patterns, and cherry wood, priced in AED with an approximate dollar figure. Every card includes PRM Essential.' },
  { title: 'Bring your own card', body: 'An NFC card or sticker you already own can be encoded with your live profile for free, or an existing profile link imported.' },
  { title: '16 shipping regions', body: 'The UAE with shipping included, the rest of the GCC, India, the United Kingdom, the United States, Canada, Australia, Pakistan, the Philippines, Egypt, Jordan and Lebanon.' },
  { title: 'A billing hub', body: 'Plans, AI credit top-ups, invoices and card orders in one place at prm.linkist.ai, with VAT shown upfront.' },
];

/** Announced by the product as coming; not available today. */
export const UPCOMING: readonly { title: string; body: string }[] = [
  { title: 'Native iOS and Android apps', body: 'The product says they are in final preparation for the App Store and Google Play. Until they are listed, Linkist is a web app on your phone.' },
  { title: 'Enterprise', body: 'Interest only. Single sign-on, CRM and HRMS integration and product customisation are planned for it.' },
];
