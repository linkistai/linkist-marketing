/**
 * Company facts for the about, contact and customers pages (checkpoint 6). Every line traces to
 * the Linkist Terms and Privacy (version 1.0, effective 7 September 2026), the current linkist.ai
 * footer, or the product as walked through on 10 September 2026. The team is not named until
 * the client confirms names and roles (C10).
 */
import { envString } from '@/lib/site';

export const LEGAL_NAME = 'RatioX Labs DWC-LLC';
export const TRADING_AS = 'Linkist';
export const ADDRESS_LINES = ['Dubai South Business Park, Building A3, 3rd Floor', 'Dubai South, Dubai, United Arab Emirates'] as const;
export const GOVERNING_LAW = 'The laws of the United Arab Emirates as applied in Dubai; disputes may be taken to the courts of Dubai, and a consumer keeps the mandatory protection of the country where they live (Terms and Privacy, section 19).';
/** Part 2 of the Terms and Privacy: where the law of your country gives you more protection, you have it. */
export const DATA_LAW = 'the Linkist Terms and Privacy, Part 2';

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

/**
 * The founders, word for word from the RatioX Labs site (ratioxlabs.com, #founders), in its order,
 * with its photographs cropped square (owner, 29 September 2026). They replace the "named when
 * confirmed" team note, the six principles and the dated timeline on the about page.
 */
export const FOUNDERS_INTRO = 'RatioX Labs is led by founders with experience across technology, business development, operations, and venture building.';

export const FOUNDERS: readonly { name: string; role: string; bio: string; photo: string }[] = [
  {
    name: 'Biji Thomas',
    role: 'Co-Founder, Business Development',
    photo: '/assets/founders/biji-thomas.webp',
    bio: 'Leads business development and strategic partnerships. Brings over three decades of experience in enterprise leadership, business strategy, and applied AI across the energy, healthcare, and services sectors, with a focus on creating technology-led growth opportunities.',
  },
  {
    name: 'Liju Mathew',
    role: 'Co-Founder, Technology & Strategy',
    photo: '/assets/founders/liju-mathew.webp',
    bio: 'Leads solution design and overall technology strategy. With over 30 years of experience in technology leadership, product development, and digital platform architecture, focuses on turning business problems into working products and automation-led solutions.',
  },
  {
    name: 'Praveen Bangera',
    role: 'Co-Founder, Product & CX',
    photo: '/assets/founders/praveen-bangera.webp',
    bio: 'Leads product design, development, and customer experience. Brings over 30 years of experience in customer experience strategy, digital transformation, UX/UI, and design-led business transformation.',
  },
];
