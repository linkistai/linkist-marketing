/**
 * The AI and security pages (brief 4, checkpoint 4). Every line traces to a published source:
 * the Linkist Terms and Privacy, version 1.0, effective 7 September 2026 (D53), cited as
 * T + section for Part 1 (Terms of use) and P + section for Part 2 (Privacy), or the product as
 * walked through on 10 September 2026 (docs/01-audit.md). Nothing is claimed that neither the
 * document nor the product states; the gaps are listed as gaps (C8, C9).
 */
import type { FaqItem } from '@/components/Faq';
import { G } from '@/lib/glossary';

/** The effective date of the Terms and Privacy, version 1.0. */
export const POLICY_DATE = '7 September 2026';
export const POLICY_VERSION = '1.0';
export const PRIVACY_URL = '/legal/privacy';
export const TERMS_URL = '/legal/terms';
export const PRIVACY_EMAIL_PUBLISHED = 'privacy@linkist.ai';
export const DPO_EMAIL_PUBLISHED = 'dpo@linkist.ai';
export const SUPPORT_EMAIL_PUBLISHED = 'support@linkist.ai';
export const CONTROLLER = {
  name: 'RatioX Labs DWC-LLC',
  address: 'Dubai South Business Park, Building A3, 3rd Floor, Dubai South, Dubai, United Arab Emirates',
  law: 'the laws of the United Arab Emirates as applied in Dubai, with the mandatory consumer protection of the country where you live (T 19)',
} as const;

/* ---------- AI ---------- */

export interface AiCapability {
  readonly title: string;
  readonly policyName: string;
  readonly body: string;
  readonly href: string;
  readonly source: string;
}

/**
 * What the optional AI features do, in the product's names. The document describes AI in four
 * verbs (T 9, P 6): add public business information to contacts, summarise relationships, score
 * relevance, and suggest follow-ups or introductions. Each capability names the verb it is.
 */
export const AI_CAPABILITIES: readonly AiCapability[] = [
  { title: G.capabilities.enrichment, policyName: 'Add public business information', body: 'Fills the gaps in a saved contact from public business sources, users, and data providers Linkist has an agreement with.', href: '/features/capture', source: 'T 9; P 6' },
  { title: G.capabilities.icp, policyName: 'Score relevance', body: 'Compares your contacts with the profile of who you are looking for and shows who fits.', href: '/features/find', source: 'T 9; P 2, 6' },
  { title: G.capabilities.priority, policyName: 'Summarise relationships, score', body: 'Marks which relationships are active, going quiet or worth attention now.', href: '/features/find', source: 'T 9; P 6' },
  { title: G.capabilities.strength, policyName: 'Score', body: 'Reads the shape and health of your network as a whole.', href: '/features/find', source: 'T 9; P 2' },
  { title: G.capabilities.signals, policyName: 'Suggest follow-ups', body: 'Notices changes that deserve a reaction and surfaces them.', href: '/features/act', source: 'T 9; P 6' },
  { title: G.capabilities.intros, policyName: 'Suggest introductions', body: 'Suggests who in your network could introduce you, and to whom.', href: '/features/act', source: 'T 9; P 6' },
  { title: G.capabilities.followUp, policyName: 'Suggest follow-ups', body: 'Proposes the next action and can draft the message. A drafted message becomes yours when you send it.', href: '/features/act', source: 'T 9; P 6' },
  { title: 'Contact summaries', policyName: 'Summarise relationships', body: 'Condenses notes, context and history into a short read before a meeting.', href: '/features/capture', source: 'T 9; P 6' },
];

/** What the AI features read: your own data (P 2) and, for added information, the three sources T 9 allows. */
export const AI_INPUTS: readonly string[] = ['Your profile', 'The contacts you saved, scanned or imported', 'Where you met, your notes, reminders and tags', 'Public business sources', 'Information from users', 'Data providers Linkist has an agreement with'];

/** What they produce (P 2, P 6). */
export const AI_OUTPUTS: readonly string[] = ['Added business information on a contact', 'Relationship summaries', 'Relevance scores', 'Suggested follow-ups', 'Suggested introductions', 'A confidence level and the reason, on every result', 'Credits used, and the corrections you make'];

export interface Rule {
  readonly title: string;
  readonly body: string;
  readonly source: string;
}

/** The rules the Terms and Privacy set for the AI features. */
export const AI_RULES: readonly Rule[] = [
  { title: 'Off until you switch it on', body: 'AI features are off by default. You switch them on, and you can switch them off at any time, in Settings, Privacy or by writing to privacy@linkist.ai.', source: 'T 9; P 5, 6' },
  { title: 'AI can be wrong', body: 'Check suggestions before you rely on them. You are responsible for checking; Linkist is responsible for showing how confident each suggestion is and why.', source: 'T 5, 9; P 6' },
  { title: 'Uncertain results are not kept', body: 'Every result shows its confidence. Less certain results are saved only if you accept them.', source: 'P 6' },
  { title: 'No decisions about people', body: 'Linkist does not use AI to make decisions that seriously affect people, and you must not make hiring, lending, insurance or similar decisions based only on Linkist.', source: 'P 6; T 8' },
  { title: 'Companies shared, people not', body: 'Information about a company, such as its website or industry, may be reused for all users. Information about an individual stays in your account.', source: 'T 9; P 6' },
  { title: 'No training on your data', body: 'Linkist does not let its AI providers use your data to train their own general AI models.', source: 'T 9' },
  { title: 'Anyone can opt out', body: 'A person whose details were saved can ask what AI information was added about them, have it deleted or corrected, and ask that no more is added.', source: 'P 7' },
  { title: 'Credits, and a bounded life', body: 'AI features use Credits; unused Credits do not roll over and have no cash value. AI results about people are kept up to 6 months unless refreshed, or until you delete them.', source: 'T 10; P 10' },
];

/** Honest gaps for the AI page (C8). */
export const AI_NOT_PUBLISHED: readonly string[] = [
  'Which AI provider processes requests. The document points to a providers list at linkist.ai/legal/providers; that page is not published yet.',
  'Where those requests are processed. The document says service providers may be in other countries and that the protections the law requires are used.',
  'The Credits each plan includes and what each action costs. The document says the Pricing page shows them; it does not yet.',
  'Which plans include which AI features. Compare the plans on the pricing page; the app shows the definitive table.',
];

export const AI_FAQ: readonly FaqItem[] = [
  { q: 'Do I have to use the AI features?', a: 'No. They are off until you switch them on, and you can use Linkist without agreeing to them.' },
  { q: 'How do I switch the AI off?', a: 'At any time, in Settings, Privacy in your account, or by writing to privacy@linkist.ai.' },
  { q: 'Does the AI decide anything for me?', a: 'No. Results are suggestions, scores and summaries that you check before relying on them. Linkist does not use AI to make decisions that seriously affect people.' },
  { q: 'What happens to AI results?', a: 'Results about people are kept for up to 6 months unless refreshed, or until you delete them. Less certain results are saved only if you accept them.' },
  { q: 'Can the people in my contacts object?', a: 'Yes. Anyone can email privacy@linkist.ai to learn what AI information was added about them, have it deleted or corrected, or ask that no more is added.' },
  { q: 'Which model does Linkist use?', a: 'Not published yet. The document refers to a providers list at linkist.ai/legal/providers, which is still to come. Ask privacy@linkist.ai, or check this page again.' },
];

/* ---------- Security ---------- */

/** The measures the document names (P 12, P 14, T 13), plus what the product shows. */
export const CONTROLS: readonly Rule[] = [
  { title: 'Encryption', body: 'Encryption is the first measure the privacy part lists, and one of the two protections named for data that moves between countries.', source: 'P 9, 12' },
  { title: 'Access controls', body: 'Access to data is controlled. On the Teams plan, Team Admins cannot see personal contacts.', source: 'P 12; T 13.4' },
  { title: 'Secure login, no password', body: 'You sign in with an email address or mobile number and a one-time code. There is no password to reuse or phish.', source: 'P 12; product, 10 September 2026' },
  { title: 'Activity logs and monitoring', body: 'Activity is logged and monitored. Security logs are usually kept up to 12 months.', source: 'P 10, 12' },
  { title: 'Service providers checked', body: 'Providers are checked, may use data only to help run Linkist, and Linkist remains responsible for their work on team contacts as if it were its own.', source: 'P 8, 12; T 13.7' },
  { title: 'Breach response', body: 'A breach is contained quickly and reported to the authorities and the people affected where the law requires. A company on Teams is told within 48 hours of a breach affecting team contacts.', source: 'P 14; T 13.7' },
  { title: 'Card scan photos expire', body: 'Photos of business cards are deleted after 30 days unless you keep them with the contact.', source: 'P 2, 10' },
  { title: 'Admin actions logged', body: 'On Teams, Linkist keeps a log of admin actions and answers one reasonable security questionnaire a year.', source: 'T 13.2, 13.7' },
];

export interface Provider {
  readonly role: string;
  readonly named: string | null;
}

/** Who receives data (P 8). The document names no provider; it points to a list at linkist.ai/legal/providers. */
export const PROVIDERS: readonly Provider[] = [
  { role: 'Hosting', named: null },
  { role: 'Payments', named: null },
  { role: 'Email and SMS', named: null },
  { role: 'AI', named: null },
  { role: 'Card printing and delivery', named: null },
  { role: 'Support and security', named: null },
  { role: 'Your company, on the Teams plan (team data only)', named: null },
  { role: 'Apps you choose to connect or export to', named: null },
  { role: 'Advisers and authorities where the law requires', named: null },
  { role: 'A company that takes over Linkist, under the same policy', named: null },
];

/** Protections for data that moves between countries (P 9). */
export const TRANSFER_SAFEGUARDS: readonly string[] = ['Data protection agreements', 'Encryption', 'Whatever else the law requires for the transfer'];

export interface Retention {
  readonly what: string;
  readonly period: string;
}

/** Retention, as the document's table has it (P 10). */
export const RETENTION: readonly Retention[] = [
  { what: 'Account, profile and contacts', period: 'While your account is open, then up to 30 days' },
  { what: 'Team contacts', period: 'While the team is active, then 30 days for download' },
  { what: 'Card scan photos', period: '30 days, unless you keep them' },
  { what: 'Visitor statistics', period: '13 months, then combined into totals' },
  { what: 'AI results about people', period: 'Up to 6 months unless refreshed, or until you delete them' },
  { what: 'Payments and invoices', period: 'As long as tax and accounting law requires' },
  { what: 'Consent records', period: 'While your account is open, plus up to 7 years' },
  { what: 'Security logs', period: 'Usually up to 12 months' },
];

/** What you can do (P 11). */
export const RIGHTS: readonly string[] = [
  'See your data',
  'Download it',
  'Correct it',
  'Delete it, or close your account in Settings after downloading your data',
  'Stop or limit some uses',
  'Object to marketing or profiling',
  'Withdraw a consent you gave',
  'Complain to the data protection authority in your country',
];

/** People you add to Linkist (T 7, T 11, P 7). */
export const CONTACT_DATA: readonly string[] = [
  'You decide how the details you save, scan, import or collect are used, and you must have a fair and lawful reason to keep them.',
  'Use them only for the professional follow-up the person would expect; no marketing lists or bulk messages without their consent.',
  'Linkist does not sell their details, market to them, or send them automatic invitations.',
  'A Visitor who sends you their details is told they go to you.',
  'Anyone whose details were saved can write to privacy@linkist.ai to learn what AI added, have it deleted or corrected, or have the request passed to you.',
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
  'The hosting provider and the region where data lives. The document says service providers may be in other countries.',
  'The providers list. The document points to linkist.ai/legal/providers, and to linkist.ai/legal/local for country-specific contacts; neither page is published yet.',
  'Any third-party attestation. Linkist does not claim a SOC 2 report, an ISO 27001 certificate or GDPR compliance, and the document says no system is perfectly secure.',
  'A dedicated security contact. Until one is published, write to support@linkist.ai and it reaches the team.',
];

export const SECURITY_FAQ: readonly FaqItem[] = [
  { q: 'Is Linkist GDPR compliant or SOC 2 certified?', a: 'Linkist does not claim either. Its terms are governed by the laws of the United Arab Emirates as applied in Dubai, and the privacy part says that where the law of your country gives you more protection, you have it. If a certification arrives, the evidence appears on this page first.' },
  { q: 'Where is my data hosted?', a: 'The provider and region are not published yet. The document says service providers may be in other countries and that data moving between countries has the protections the law requires, such as data protection agreements and encryption.' },
  { q: 'Is there a password?', a: 'No. You sign in with your email address or mobile number and a one-time code that expires.' },
  { q: 'Can I export my data?', a: 'Yes. You can ask to see and download your data, in Settings, Privacy or at privacy@linkist.ai, and you can download it before closing your account. Linkist replies within 30 days.' },
  { q: 'What happens when I delete my account?', a: 'Your account, profile and contacts are kept while the account is open, then up to 30 days. Payments and invoices stay as long as tax and accounting law requires, and consent records up to 7 years.' },
  { q: 'What about the people in my contacts?', a: 'You are responsible for having a fair reason to keep them and for using them only for the follow-up they would expect. Linkist never sells their details, never markets to them, and lets them ask what AI added, or have it removed.' },
  { q: 'How do I report a security problem?', a: 'Write to support@linkist.ai. A dedicated security address will be published here when it exists.' },
];
