/**
 * The AI and security pages (brief 4, checkpoint 4). Every line traces to a published source:
 * the privacy policy (linkist.ai/privacy, version 1.1, 1 June 2026, cited as P + section), the
 * terms of service (linkist.ai/terms, version 1.1, 1 June 2026, cited as T + section), or the
 * product as walked through on 10 September 2026 (docs/01-audit.md). Nothing is claimed that
 * neither document nor the product states; the gaps are listed as gaps (C8, C9).
 */
import type { FaqItem } from '@/components/Faq';
import { G } from '@/lib/glossary';

export const POLICY_DATE = '1 June 2026';
export const PRIVACY_URL = '/legal/privacy';
export const TERMS_URL = '/legal/terms';
export const PRIVACY_EMAIL_PUBLISHED = 'privacy@linkist.ai';
export const DPO_EMAIL_PUBLISHED = 'dpo@linkist.ai';
export const SUPPORT_EMAIL_PUBLISHED = 'support@linkist.ai';
export const CONTROLLER = {
  name: 'RatioX Labs DWC-LLC',
  address: 'Dubai South Business Park, Building A3, 3rd Floor, Dubai South, Dubai, United Arab Emirates',
  law: 'Federal Decree-Law No. 45 of 2021 on the Protection of Personal Data (UAE)',
} as const;

/* ---------- AI ---------- */

export interface AiCapability {
  readonly title: string;
  readonly policyName: string;
  readonly body: string;
  readonly href: string;
  readonly source: string;
}

/** What the optional AI features do, in the product's names, with the name the policy uses (P 9). */
export const AI_CAPABILITIES: readonly AiCapability[] = [
  { title: G.capabilities.enrichment, policyName: 'Contact enrichment', body: 'Fills the gaps in a saved contact from public or professional sources, where enabled and lawful.', href: '/features/capture', source: 'P 4.10, 5, 9' },
  { title: G.capabilities.icp, policyName: 'ICP matching', body: 'Compares your contacts with the profile of who you are looking for and shows who fits.', href: '/features/find', source: 'P 6.1, 9' },
  { title: G.capabilities.priority, policyName: 'Relationship scoring', body: 'Marks which relationships are active, going quiet or worth attention now.', href: '/features/find', source: 'P 4.3, 9' },
  { title: G.capabilities.strength, policyName: 'Network scoring', body: 'Reads the shape and health of your network as a whole.', href: '/features/find', source: 'P 9' },
  { title: G.capabilities.signals, policyName: 'Smart Signals', body: 'Notices changes that deserve a reaction and surfaces them.', href: '/features/act', source: 'P 4.10, 6.3, 9' },
  { title: G.capabilities.intros, policyName: 'Smart Introductions', body: 'Suggests who in your network could introduce you, and to whom.', href: '/features/act', source: 'P 4.10, 9' },
  { title: G.capabilities.followUp, policyName: 'Suggested follow-ups', body: 'Proposes the next action and can draft the message; you send it or not.', href: '/features/act', source: 'P 4.10, 6.3, 9' },
  { title: 'Contact summaries', policyName: 'Profile or contact summaries', body: 'Condenses notes, context and history into a short read before a meeting.', href: '/features/capture', source: 'P 4.10, 9' },
];

/** What the AI features read (P 9) and where enrichment looks (P 5). */
export const AI_INPUTS: readonly string[] = ['Profile data', 'Contact details', 'Your notes', 'Connection history', 'Interaction context', 'Professional information', 'Public or professional sources, for enrichment only, where enabled and lawful'];

/** What they produce (P 4.10). */
export const AI_OUTPUTS: readonly string[] = ['Contact enrichment summaries', 'Relationship reminders', 'ICP or relevance scores', 'Smart Signals', 'Suggested introductions', 'Suggested follow-up actions', 'Contact priority indicators', 'Network insights', 'Profile or relationship summaries'];

export interface Rule {
  readonly title: string;
  readonly body: string;
  readonly source: string;
}

/** The rules the policy and terms set for the AI features. */
export const AI_RULES: readonly Rule[] = [
  { title: 'Optional, with its own consent', body: 'AI enablement is a separate consent, not bundled with the terms. Contact enrichment, Smart Signals, ICP and Smart Introductions are named in it.', source: 'P 8' },
  { title: 'Assistive, never binding', body: 'Outputs are suggestions you review before relying on them. Linkist does not use AI to make legally binding decisions about you.', source: 'P 9, T 12' },
  { title: 'Switch it off any time', body: 'Disable optional AI features, or object to automated profiling, in Privacy Settings or by writing to privacy@linkist.ai.', source: 'P 6.3, 9' },
  { title: 'Kept for a bounded time', body: 'AI enrichment outputs are held for up to 6 months or until you delete your account, unless refreshed, deleted or legally retained.', source: 'P 17' },
  { title: 'Not sold, not marketed to', body: 'Imported contact data is not sold and is not used to market to the people in it unless they opt in themselves.', source: 'P 6.4, 10' },
  { title: 'Not used on minors', body: 'Linkist is for people aged 18 or over and does not knowingly run AI profiling on minors.', source: 'P 9, 20' },
  { title: 'Sensitive data is out of scope', body: 'Health, financial, government-ID, biometric and other regulated records must not be put into Linkist; AI must not be used to infer sensitive characteristics.', source: 'T 12, 14' },
  { title: 'Credits for some actions', body: 'Some AI actions draw on AI credits, sold as top-ups in the billing hub at prm.linkist.ai.', source: 'Product, 10 September 2026; T 20' },
];

/** Honest gaps for the AI page (C8). */
export const AI_NOT_PUBLISHED: readonly string[] = [
  'Which model provider processes AI requests. The policy names the category, "AI and large language model providers, where AI features are enabled", not the company.',
  'Where those requests are processed. The policy says some providers may be outside the UAE and lists the safeguards used for transfers.',
  'The credit price list: what one AI credit buys and what each action costs.',
  'Which plans include which AI features. Compare the plans on the pricing page; the app shows the definitive table.',
];

export const AI_FAQ: readonly FaqItem[] = [
  { q: 'Do I have to use the AI features?', a: 'No. They are optional and switched on with a separate consent. Linkist works as a Personal Relationship Manager without them.' },
  { q: 'How do I switch the AI off?', a: 'In Privacy Settings in your account, or by writing to privacy@linkist.ai. Withdrawing consent does not undo processing that already happened.' },
  { q: 'Does the AI decide anything for me?', a: 'No. Outputs are assistive: enrichment summaries, scores, signals and suggested follow-ups that you review. Linkist does not use AI for legally binding decisions.' },
  { q: 'What happens to enrichment results?', a: 'They are kept for up to 6 months or until you delete your account, unless refreshed, deleted or legally retained.' },
  { q: 'Can the people in my contacts object?', a: 'Yes. Anyone whose details were added to Linkist can ask for access, correction, restriction or deletion at privacy@linkist.ai.' },
  { q: 'Which model does Linkist use?', a: 'Not published yet. The policy names the provider category only. Ask privacy@linkist.ai, or check this page again.' },
];

/* ---------- Security ---------- */

/** Technical and organisational measures, as the policy lists them (P 16), plus what the product shows. */
export const CONTROLS: readonly Rule[] = [
  { title: 'Encryption in transit', body: 'Traffic between you and Linkist is encrypted.', source: 'P 15, 16' },
  { title: 'Encryption at rest, where appropriate', body: 'Stored data is encrypted where the policy deems it appropriate; the policy does not say everywhere.', source: 'P 16' },
  { title: 'No password to leak', body: 'You sign in with an email address or mobile number and a one-time code. There is no password to reuse or phish.', source: 'Product, 10 September 2026; P 4.1' },
  { title: 'Code expiry and token handling', body: 'One-time codes expire and tokens are handled securely; limited security logs are kept.', source: 'P 16, 17' },
  { title: 'Access controls and roles', body: 'Role-based permissions and restricted administrative access.', source: 'P 16' },
  { title: 'Audit logging and monitoring', body: 'Audit logs and security monitoring, with logs usually kept up to 12 months.', source: 'P 16, 17' },
  { title: 'Vendor review', body: 'Providers are reviewed for security and bound by data processing terms.', source: 'P 14, 15, 16' },
  { title: 'Testing, where appropriate', body: 'Vulnerability assessment and penetration testing "where appropriate". No report is published.', source: 'P 16' },
  { title: 'Staff obligations', body: 'Awareness training and confidentiality obligations for staff.', source: 'P 16' },
  { title: 'Breach notification', body: 'Breaches are assessed, contained and, where the law requires, reported to the authority and to affected people.', source: 'P 21' },
];

export interface Provider {
  readonly role: string;
  readonly named: string | null;
}

/** Who receives data (P 14). Only one provider is named in the policy. */
export const PROVIDERS: readonly Provider[] = [
  { role: 'Hosting and infrastructure', named: null },
  { role: 'Database and backend services', named: null },
  { role: 'Payments', named: 'Stripe' },
  { role: 'Email and one-time code delivery', named: null },
  { role: 'Shipping and fulfilment of cards', named: null },
  { role: 'Customer support tooling', named: null },
  { role: 'Analytics', named: null },
  { role: 'Security, monitoring and fraud prevention', named: null },
  { role: 'AI and large language models, where enabled', named: null },
  { role: 'Professional advisers; authorities where the law requires', named: null },
];

/** Safeguards for transfers outside the UAE (P 15). */
export const TRANSFER_SAFEGUARDS: readonly string[] = ['Data processing agreements', 'Standard contractual clauses or equivalent transfer terms', 'Contractual confidentiality commitments', 'Encryption in transit and at rest', 'Access controls', 'Vendor security assessments', 'Data minimisation'];

export interface Retention {
  readonly what: string;
  readonly period: string;
}

/** Retention, condensed from the policy's table (P 17). */
export const RETENTION: readonly Retention[] = [
  { what: 'Account and profile data', period: 'Life of the account, then up to 30 days' },
  { what: 'Contacts you import that are not Linkist users', period: 'Only as long as the feature needs, then deleted or anonymised' },
  { what: 'AI enrichment outputs', period: 'Up to 6 months, or until account deletion' },
  { what: 'One-time codes and tokens', period: 'Short expiry after use' },
  { what: 'Security and audit logs', period: 'Usually up to 12 months' },
  { what: 'Troubleshooting logs', period: 'Usually up to 90 days' },
  { what: 'Card orders and invoices', period: '5 to 7 years, as tax and commercial rules require' },
  { what: 'Consent records', period: 'Life of the account plus up to 7 years' },
];

/** What you can do (P 18, 19). */
export const RIGHTS: readonly string[] = [
  'See the personal data Linkist holds about you',
  'Correct it',
  'Delete your account from the app, the website or by email',
  'Take your data with you in a machine-readable format',
  'Restrict or object to processing, including automated profiling and direct marketing',
  'Withdraw a consent you gave',
  'Complain to the UAE Data Office',
];

/** People you add to Linkist (P 10, 18). The Contact Data Notice in the legal hub will say the same at length. */
export const CONTACT_DATA: readonly string[] = [
  'Importing contacts is optional, and you confirm you have the right to bring them in.',
  'Imported contact data is used only for the features you choose, with data minimisation, and is not sold.',
  'The people in your contacts are not marketed to unless they opt in themselves.',
  'Anyone whose details were added can ask Linkist for access, correction, restriction or deletion.',
];

/** What this website itself does, as distinct from the app (brief 7: the trust page says which controls belong to which). */
export const SITE_CONTROLS: readonly Rule[] = [
  { title: 'No credentials here', body: 'Sign in and Start free hand over to the product. This website never sees a code, a password or a payment.', source: 'This site' },
  { title: 'Content Security Policy', body: 'Scripts run only from this site, Google Tag Manager and Cloudflare Turnstile; frames from any other site are refused; nosniff, referrer and permissions policies are set.', source: 'next.config.ts' },
  { title: 'Nothing loads before consent', body: 'No analytics script until you accept it in the cookie notice, and no third-party script at all unless its key is configured.', source: 'This site' },
  { title: 'Forms that fail safely', body: 'Server validation, a size cap, a per-address rate limit, a honeypot and Cloudflare Turnstile when enabled. Messages go to the team by email and are not stored here.', source: 'src/lib/forms.ts' },
  { title: 'The assistant keeps nothing', body: 'Questions are matched in your browser against the help centre. When a model is configured it receives the question and the matching entries only, and this site stores nothing.', source: '/chat' },
];

/** Honest gaps for the security page (C9). */
export const SECURITY_NOT_PUBLISHED: readonly string[] = [
  'The hosting provider and the region where data lives. The policy says providers may be outside the UAE.',
  'The sub-processor list by name. Stripe is the only provider the policy names.',
  'Any third-party attestation. Linkist does not claim a SOC 2 report, an ISO 27001 certificate or GDPR compliance.',
  'A dedicated security contact. Until one is published, write to support@linkist.ai and it reaches the team.',
];

export const SECURITY_FAQ: readonly FaqItem[] = [
  { q: 'Is Linkist GDPR compliant or SOC 2 certified?', a: 'Linkist does not claim either. Its privacy policy is written to the UAE Personal Data Protection Law (Federal Decree-Law No. 45 of 2021). If that changes, the evidence appears on this page first.' },
  { q: 'Where is my data hosted?', a: 'The provider and region are not published yet. The policy states that some providers may be outside the UAE and lists the safeguards used for those transfers.' },
  { q: 'Is there a password?', a: 'No. You sign in with your email address or mobile number and a one-time code that expires.' },
  { q: 'Can I export my data?', a: 'Yes. The policy gives you the right to portability in a machine-readable format. Ask in the app or at privacy@linkist.ai; Linkist aims to answer within 30 days.' },
  { q: 'What happens when I delete my account?', a: 'Account data is deleted or anonymised, normally within 30 days, except what tax, fraud, dispute or legal rules require Linkist to keep. Backups clear on their ordinary cycle.' },
  { q: 'What about the people in my contacts?', a: 'Their data is used only for the features you chose, is never sold, and they can ask for access or deletion themselves.' },
  { q: 'How do I report a security problem?', a: 'Write to support@linkist.ai. A dedicated security address will be published here when it exists.' },
];
