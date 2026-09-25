/**
 * The site assistant: retrieval over everything the site says, in the browser, with no key.
 * The corpus is the help centre, a short truth sheet, the home and feature FAQs, and price answers
 * built from the plan, card and bundle data, so a price is never stale. Matching weighs rare words
 * above common ones, folds plurals, expands a few synonyms, and prefers an entry whose question the
 * visitor has asked in full. It says when it does not know (brief 7); a relevance gate keeps
 * off-topic questions from getting a confident wrong answer (Grownz D31). An optional Claude route
 * (/api/chat) can phrase answers when configured.
 */
import { HELP, type HelpEntry } from '@/content/help';
import { FEATURES } from '@/content/features';
import { FAQ as HOME_FAQ } from '@/content/home';
import { BUNDLES, CARD_TIERS, MATERIALS, PLANS } from '@/content/plans';
import { formatMoney } from '@/lib/glossary';

export interface KnowledgeHit {
  readonly entry: HelpEntry;
  readonly score: number;
}

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 60);

/** Facts people ask about that the help centre does not phrase as a question. */
const TRUTH: readonly HelpEntry[] = [
  { id: 'truth-what-is-linkist', category: 'Getting started', q: 'What is Linkist?', a: 'Linkist is a Personal Relationship Manager, a PRM. It captures the people you meet, remembers the context, and tells you what to do next. It pairs with an optional NFC business card that shares a live profile with one tap.', links: [{ label: 'How it works', href: '/how-it-works' }] },
  { id: 'truth-prm', category: 'Getting started', q: 'What is a Personal Relationship Manager?', a: 'A PRM organises relationships rather than deals: your contacts, meeting context, priorities and follow-ups live in one place, focused on who matters and what deserves action. Contact apps store people and CRMs manage deals. Linkist helps you manage relationships.' },
  { id: 'truth-card', category: 'NFC cards and shipping', q: 'Do I need an NFC card to use Linkist?', a: 'No. You can start with the free Essential plan on its own and add a card any time. Every NFC card includes PRM Essential.', links: [{ label: 'NFC cards', href: '/nfc-cards' }] },
  { id: 'truth-contact', category: 'Troubleshooting', q: 'How do I contact Linkist support?', a: 'Email support@linkist.ai. This assistant is automated, not a live agent.' },
  { id: 'truth-data-safe', category: 'Security', q: 'Is my data safe and secure?', a: 'Linkist protects data with encryption, access controls, secure login, activity logs and monitoring (P 12). It never sells personal data, and you can see, download, correct or delete yours at any time (P 11). Sign-in uses a one-time code, so there is no password to steal.', links: [{ label: 'Security', href: '/security' }] },
  { id: 'truth-receiver-app', category: 'NFC cards and shipping', q: 'Does the other person need the Linkist app to receive my card?', a: 'No. A tap opens your live profile in their phone’s browser, no app needed. Phones without NFC can scan your QR code instead.', links: [{ label: 'NFC cards', href: '/nfc-cards' }] },
  { id: 'truth-how-it-works', category: 'Getting started', q: 'How does Linkist work?', a: 'In three stages. Capture and share: save the contact and its context by NFC, QR, card scan or import. Build relationships: find the people worth your attention with search and ICP Matching. Act and grow: Top Actions, nudges and warm introductions tell you what to do next.', links: [{ label: 'How it works', href: '/how-it-works' }] },
  { id: 'truth-use-cases', category: 'Getting started', q: 'Who is Linkist for, and what are the use cases?', a: 'Professionals and teams who meet people: after an event, finding the right person in a network you already have, keeping up with too many relationships, growing the network the right way, and keeping relationships when someone leaves a team.', links: [{ label: 'Use cases', href: '/use-cases' }] },
  { id: 'truth-icp-matching', category: 'Find', q: 'What is ICP Matching?', a: 'ICP Matching compares your contacts with an ideal customer profile, an ICP: a description of who you are looking for. It shows who fits and how many matches were found, and suggests warm paths to people you do not know yet. Part of Pro and Team.', links: [{ label: 'Find', href: '/features/find' }] },
  { id: 'truth-byo', category: 'NFC cards and shipping', q: 'Can I bring my own NFC card or sticker?', a: 'Yes, free. At nfctools.linkist.ai, tap the card or sticker on your phone and Linkist writes your live profile onto it. Encoding a chip needs an Android phone; the profile then works on every device.', links: [{ label: 'Bring your own NFC', href: '/bring-your-own' }] },
];

const both = (usd: number, aed?: number) => (aed === undefined ? formatMoney(usd, 'USD') : `${formatMoney(aed, 'AED')} (${formatMoney(usd, 'USD')})`);

/** Price answers, written from the price data so they always match the pricing page. */
function priceEntries(): HelpEntry[] {
  const out: HelpEntry[] = [];
  const planLine = (p: (typeof PLANS)[number]) =>
    p.monthly === 0
      ? `${p.name} is free, for as long as you like.`
      : p.team
        ? `${p.name} is ${both(p.monthly, p.aed.monthly)} per user a month with a minimum of ${p.minUsers} users: ${both(p.team.usd.monthly, p.team.aed.monthly)} a month or ${both(p.team.usd.yearly, p.team.aed.yearly)} a year for ${p.minUsers} users.`
        : `${p.name} is ${both(p.monthly, p.aed.monthly)} a month${p.yearly ? `, or ${both(p.yearly, p.aed.yearly)} a year` : ''}${p.lifetime ? `, or ${formatMoney(p.lifetime, 'USD')} for life` : ''}.`;
  out.push({ id: 'price-plans', category: 'Plans and billing', q: 'How much does Linkist cost? Plan prices', a: PLANS.map(planLine).join(' '), links: [{ label: 'Pricing', href: '/pricing' }] });
  for (const p of PLANS) out.push({ id: `price-${p.key}`, category: 'Plans and billing', q: `How much is the ${p.name} plan? ${p.name} price`, a: `${planLine(p)} ${p.fit}`, links: [{ label: 'Pricing', href: '/pricing' }] });
  const tierLine = (t: (typeof CARD_TIERS)[number]) => `${t.name}: ${MATERIALS.map((m) => `${m.name} ${both(t.prices.USD[m.key], t.prices.AED[m.key])}`).join(', ')}.`;
  out.push({ id: 'price-cards', category: 'NFC cards and shipping', q: 'How much does an NFC card cost? Card prices', a: `One-time prices. ${CARD_TIERS.map(tierLine).join(' ')} Every NFC card includes PRM Essential.`, links: [{ label: 'NFC cards', href: '/nfc-cards' }] });
  for (const m of MATERIALS)
    out.push({ id: `price-card-${m.key}`, category: 'NFC cards and shipping', q: `How much is the ${m.name} NFC card? ${m.name} card price`, a: `A ${m.name} card is ${CARD_TIERS.map((t) => `${both(t.prices.USD[m.key], t.prices.AED[m.key])} as ${t.name}`).join(' or ')}, one time. Every NFC card includes PRM Essential.`, links: [{ label: 'NFC cards', href: '/nfc-cards' }] });
  out.push({ id: 'price-bundles', category: 'NFC cards and shipping', q: 'How much are the bundles? Bundle price', a: BUNDLES.map((b) => `The ${b.name} is ${b.includes.charAt(0).toLowerCase()}${b.includes.slice(1)}, for ${both(b.price.USD, b.price.AED)}.`).join(' '), links: [{ label: 'Bundles', href: '/bundles' }] });
  return out;
}

/** Everything the site answers: the help centre first, then the page FAQs and the truth sheet. */
export const CORPUS: readonly HelpEntry[] = [
  ...TRUTH,
  ...priceEntries(),
  ...HELP,
  ...HOME_FAQ.map((f) => ({ id: `home-${slug(f.q)}`, category: 'Getting started' as const, q: f.q, a: f.a })),
  ...FEATURES.flatMap((f) => f.faq.map((x) => ({ id: `${f.slug}-${slug(x.q)}`, category: 'Getting started' as const, q: x.q, a: x.a, links: [{ label: f.name, href: `/features/${f.slug}` }] }))),
];

const STOP = new Set(['the', 'a', 'an', 'is', 'are', 'was', 'do', 'does', 'did', 'i', 'my', 'me', 'we', 'our', 'it', 'its', 'to', 'of', 'in', 'on', 'for', 'and', 'or', 'can', 'could', 'would', 'should', 'will', 'what', 'which', 'who', 'how', 'when', 'where', 'why', 'with', 'you', 'your', 'linkist', 'be', 'there', 'this', 'that', 'these', 'have', 'has', 'if', 'at', 'by', 'from', 'about', 'any', 'get', 'please', 'tell', 'know', 'want', 'need', 'use', 'using']);

/** Words that mean the same thing to a visitor; the first is the canonical token. */
const SYNONYMS: readonly (readonly string[])[] = [
  ['price', 'cost', 'pricing', 'much', 'fee', 'charge', 'pay', 'paid', 'expensive', 'cheap'],
  ['plan', 'subscription', 'tier'],
  ['card', 'nfc'],
  ['contact', 'people', 'person', 'lead'],
  ['capture', 'scan', 'ocr'],
  ['search', 'find', 'look'],
  ['icp', 'ideal'],
  ['nudge', 'reminder', 'remind', 'follow', 'followup'],
  ['introduction', 'intro', 'warm'],
  ['team', 'company', 'colleague', 'organisation', 'organization', 'business'],
  ['sign', 'signin', 'login'],
  ['password', 'otp', 'passcode'],
  ['secure', 'security', 'safe', 'protect', 'protected', 'privacy', 'private'],
  ['delete', 'remove', 'erase'],
  ['app', 'ios', 'android', 'iphone', 'install', 'download'],
  ['ship', 'shipping', 'deliver', 'delivery'],
  ['refund', 'return'],
  ['free', 'trial'],
  ['aed', 'dirham'],
  ['usd', 'dollar'],
];
const CANON = new Map<string, string>();
for (const group of SYNONYMS) for (const w of group) CANON.set(w, group[0]!);

/** Folds simple English plurals and endings so "cards" meets "card" and "matches" meets "match". */
function stem(t: string): string {
  if (t.length <= 3) return t;
  if (t.endsWith('ies') && t.length > 4) return t.slice(0, -3) + 'y';
  if (t.endsWith('ches') || t.endsWith('shes') || t.endsWith('sses') || t.endsWith('xes')) return t.slice(0, -2);
  if (t.endsWith('s') && !t.endsWith('ss') && !t.endsWith('us')) return t.slice(0, -1);
  if (t.endsWith('ing') && t.length > 5) {
    const base = t.slice(0, -3);
    const last = base.slice(-1);
    // "shipping" to "ship": a doubled final consonant loses one.
    return 'bdgmnprt'.includes(last) && base.slice(-2, -1) === last ? base.slice(0, -1) : base;
  }
  return t;
}

/** Short forms visitors type, spelled out so they meet the long form in the answers. */
const ABBREV: Record<string, string> = { prm: 'prm personal relationship manager', icp: 'icp ideal customer profile', crm: 'crm customer relationship management', nfc: 'nfc' };

const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9%\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);

/** Content tokens: stop words out, stems folded, synonyms mapped to one word. */
function tokens(s: string): string[] {
  return norm(s)
    .flatMap((t) => (ABBREV[t] ? ABBREV[t].split(' ') : [t]))
    .filter((t) => !STOP.has(t))
    .map((t) => {
      const st = stem(t);
      return CANON.get(t) ?? CANON.get(st) ?? st;
    });
}

interface Doc {
  readonly entry: HelpEntry;
  readonly q: Set<string>;
  readonly a: Set<string>;
  readonly key: string;
}
let index: { docs: Doc[]; idf: Map<string, number> } | undefined;
function getIndex() {
  if (index) return index;
  const docs = CORPUS.map((entry) => ({ entry, q: new Set(tokens(entry.q)), a: new Set(tokens(entry.a)), key: norm(entry.q).join(' ') }));
  const df = new Map<string, number>();
  for (const d of docs) for (const t of new Set([...d.q, ...d.a])) df.set(t, (df.get(t) ?? 0) + 1);
  const idf = new Map<string, number>();
  for (const [t, n] of df) idf.set(t, Math.log(1 + docs.length / n));
  index = { docs, idf };
  return index;
}

/** The lowest score that counts as an answer. Below it the assistant says it does not know. */
const MIN_SCORE = 2.2;

export function search(query: string, limit = 3): KnowledgeHit[] {
  const { docs, idf } = getIndex();
  const key = norm(query).join(' ');
  if (!key) return [];
  // "What is Linkist?" and the like are all stop words: answer them by the exact question.
  const exact = docs.filter((d) => d.key === key);
  const qt = Array.from(new Set(tokens(query)));
  if (!qt.length) return exact.slice(0, limit).map((d) => ({ entry: d.entry, score: 10 }));
  // Relevance gate: most of the question's words must be words the site uses.
  const known = qt.filter((t) => idf.has(t)).length;
  if (known * 2 < qt.length && !exact.length) return [];
  const form = (['what is', 'what are', 'how much', 'how do', 'how does', 'can i', 'is there', 'do i'] as const).find((f) => key.startsWith(f + ' '));
  const hits: KnowledgeHit[] = [];
  for (const d of docs) {
    let score = d.key === key ? 10 : 0;
    let covered = 0;
    for (const t of qt) {
      const w = idf.get(t) ?? 0;
      if (d.q.has(t)) {
        score += 2.5 * w;
        covered++;
      } else if (d.a.has(t)) score += 0.8 * w;
    }
    if (!score) continue;
    // Prefer the entry whose own question the visitor has asked: how much of it their words cover.
    score += 3 * (covered / Math.max(d.q.size, 1)) * (covered / qt.length);
    // "What is ...?" wants a definition, "How much ...?" a price: favour entries asked the same way.
    if (form && d.key.startsWith(form)) score += 4;
    hits.push({ entry: d.entry, score });
  }
  return hits
    .filter((h) => h.score >= MIN_SCORE)
    .sort((a, b) => b.score - a.score)
    .filter((h, i, all) => all.findIndex((x) => x.entry.a === h.entry.a) === i)
    .slice(0, limit);
}

/** Greetings and thanks get a friendly reply instead of "I do not know". */
export function smallTalk(query: string): string | null {
  const k = norm(query).join(' ');
  if (/^(hi|hello|hey|hiya|good (morning|afternoon|evening)|salam|assalamu alaikum|marhaba)( there)?$/.test(k)) return 'Hello. Ask me anything about Linkist: the plans and prices, NFC cards, how it works, the AI, teams, or your data.';
  if (/^(thanks|thank you|thank you very much|thx|cheers|great|ok|okay|cool)$/.test(k)) return 'You are welcome. Anything else you would like to know?';
  if (/^(who are you|what are you|are you (a )?(bot|human|real|person))$/.test(k)) return 'I am the Linkist assistant, automated, not a live agent. I answer from the help centre and the facts on this site. For a person, email support@linkist.ai.';
  return null;
}

export const SUGGESTED = ['What is a PRM?', 'Do I need an NFC card?', 'How much is the Pro plan?', 'Which plan has ICP Matching?', 'What happens to contacts when someone leaves my team?', 'Is shipping included?'] as const;

export const FALLBACK = 'I do not have an answer for that on this site yet. I only know what Linkist does today, and I would rather say so than guess. Try another wording, browse the help centre, or email support@linkist.ai.';
