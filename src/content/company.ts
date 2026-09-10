/**
 * Company facts for the about, contact and customers pages (checkpoint 6). Every line traces to
 * the published privacy policy and terms (version 1.1, 1 June 2026), the current linkist.ai
 * footer, or the product as walked through on 10 September 2026. The team is not named until
 * the client confirms names and roles (C10).
 */
import { envString } from '@/lib/site';

export const LEGAL_NAME = 'RatioX Labs DWC-LLC';
export const TRADING_AS = 'Linkist';
export const ADDRESS_LINES = ['Dubai South Business Park, Building A3, 3rd Floor', 'Dubai South, Dubai, United Arab Emirates'] as const;
export const GOVERNING_LAW = 'The laws of the United Arab Emirates as applied in Dubai; the courts of Dubai have jurisdiction (terms of service, section 27).';
export const DATA_LAW = 'Federal Decree-Law No. 45 of 2021 on the Protection of Personal Data (UAE)';

/** Published addresses first; environment overrides when set (C12). */
export const SUPPORT = envString(process.env['NEXT_PUBLIC_SUPPORT_EMAIL']) ?? 'support@linkist.ai';
export const PRIVACY = envString(process.env['NEXT_PUBLIC_PRIVACY_EMAIL']) ?? 'privacy@linkist.ai';
export const DPO = 'dpo@linkist.ai';
export const PARTNERSHIPS = envString(process.env['NEXT_PUBLIC_PARTNERSHIPS_EMAIL']);
export const SECURITY = envString(process.env['NEXT_PUBLIC_SECURITY_EMAIL']);
/** The current linkist.ai footer links a phone number and a WhatsApp line. */
export const PHONE = { display: '+971 50 440 8656', tel: 'tel:+971504408656', whatsapp: 'https://wa.me/971504408656' } as const;

export interface ContactRoute {
  readonly key: 'support' | 'privacy' | 'partnership' | 'press' | 'security';
  readonly title: string;
  readonly body: string;
  readonly to?: string;
  readonly extra?: string;
}

export const CONTACT_ROUTES: readonly ContactRoute[] = [
  { key: 'support', title: 'Support', body: 'Something not working, a question the help centre did not answer, an order, or a card that will not tap.', to: SUPPORT },
  { key: 'privacy', title: 'Privacy and your data', body: 'Access, correction, export, deletion, consent withdrawal, or a request about a contact someone added. Linkist aims to answer within 30 days.', to: PRIVACY, extra: `Data Protection Officer: ${DPO}` },
  { key: 'partnership', title: 'Partnerships and teams', body: 'Companies that want the Team plan for their people, Enterprise interest, resellers and event organisers.', to: PARTNERSHIPS },
  { key: 'press', title: 'Press', body: 'Interviews, background on the PRM idea, brand assets.' },
  { key: 'security', title: 'Security', body: 'Report a vulnerability. Good-faith research is welcome; there is no public bounty yet.', to: SECURITY ?? SUPPORT, extra: SECURITY ? undefined : 'Reaches the support inbox until a dedicated address is published.' },
];

/** Six things the site holds Linkist to, each traceable (about page). */
export const PRINCIPLES: readonly { title: string; body: string; source: string }[] = [
  { title: 'Relationships, not deals', body: 'A PRM keeps the person, the context and the next action together. Contact apps store people; CRMs manage deals.', source: 'The prototype, How Linkist works' },
  { title: 'AI you switch on, and off', body: 'Every AI feature is optional, consented to separately, assistive only, and off in Privacy Settings.', source: 'Privacy policy 8, 9' },
  { title: 'Your contacts are yours', body: 'Personal contacts stay with the person; only what is shared with a team stays with the company when someone leaves.', source: 'The Team plan' },
  { title: 'With or without a card', body: 'The free plan needs no card, every card includes PRM Essential, and a card you already own can be activated free.', source: 'The store' },
  { title: 'No password', body: 'Sign in with an email or mobile number and a one-time code. Nothing to reuse, nothing to phish.', source: 'The sign-in screens' },
  { title: 'Honest about limits', body: 'A web app until the store listings exist, Enterprise as interest only, no compliance badge without evidence, no named customer without consent.', source: 'This site, section 3.9 of the brief' },
];

/** Dated events with a public source (about page). */
export const TIMELINE: readonly { date: string; text: string }[] = [
  { date: 'June 2026', text: 'Privacy policy and terms of service version 1.1 published. The first three guides appear on the blog.' },
  { date: 'July 2026', text: 'Four more articles on relationship capital, AI memory, digital identity and the tap-to-follow-up flow.' },
  { date: 'September 2026', text: 'The store lists cards in PVC, wood and metal for 16 shipping regions, bring-your-own activation, and native apps in preparation. This website goes into preview.' },
];
