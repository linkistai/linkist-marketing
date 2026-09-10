/**
 * The site assistant: keyword retrieval over the help corpus plus a short truth sheet.
 * Runs in the browser, needs no key, and says when it does not know (brief 7). A relevance gate
 * keeps off-topic questions from getting a confident wrong answer (Grownz D31).
 * An optional Claude route (/api/chat) can phrase answers when configured.
 */
import { HELP, type HelpEntry } from '@/content/help';

export interface KnowledgeHit {
  readonly entry: HelpEntry;
  readonly score: number;
}

/** Facts that are not questions in the help corpus but people ask about. */
const TRUTH: readonly HelpEntry[] = [
  { id: 'truth-what-is-linkist', category: 'Getting started', q: 'What is Linkist?', a: 'Linkist is a Personal Relationship Manager, a PRM. It captures the people you meet, remembers the context, and tells you what to do next. It pairs with an optional NFC business card that shares a live profile with one tap.', links: [{ label: 'How it works', href: '/how-it-works' }] },
  { id: 'truth-prm', category: 'Getting started', q: 'What is a Personal Relationship Manager?', a: 'A PRM organises relationships rather than deals: your contacts, meeting context, priorities and follow-ups live in one place, focused on who matters and what deserves action. Contact apps store people and CRMs manage deals. Linkist helps you manage relationships.' },
  { id: 'truth-card', category: 'NFC cards and shipping', q: 'Do I need an NFC card to use Linkist?', a: 'No. You can start with the free Essential plan on its own and add a card any time. Every NFC card includes PRM Essential.', links: [{ label: 'NFC cards', href: '/nfc-cards' }] },
  { id: 'truth-contact', category: 'Troubleshooting', q: 'How do I contact Linkist?', a: 'Email support@linkist.ai. This assistant is automated, not a live agent.' },
];

export const CORPUS: readonly HelpEntry[] = [...TRUTH, ...HELP];

const STOP = new Set(['the', 'a', 'an', 'is', 'are', 'do', 'does', 'i', 'my', 'me', 'we', 'our', 'it', 'to', 'of', 'in', 'on', 'for', 'and', 'or', 'can', 'what', 'how', 'with', 'you', 'your', 'linkist', 'be', 'there', 'this', 'that', 'have', 'has', 'if', 'at', 'by', 'from', 'about', 'any']);

const SYNONYMS: Record<string, string[]> = {
  card: ['nfc', 'tap', 'pvc', 'wood', 'metal', 'starter', 'signature', 'founders'],
  price: ['cost', 'pricing', 'plan', 'plans', 'essential', 'enhanced', 'pro', 'team', 'much', 'usd', 'aed', 'dollar', 'dirham', 'lifetime', 'yearly', 'monthly', 'bundle', 'bundles'],
  contact: ['contacts', 'people', 'person', 'lead', 'leads', 'record'],
  capture: ['scan', 'ocr', 'import', 'csv', 'vcf', 'qr', 'add'],
  find: ['search', 'icp', 'match', 'matching', 'matches', 'fit', 'network', 'ask'],
  act: ['nudge', 'nudges', 'reminder', 'reminders', 'follow', 'followup', 'planner', 'actions', 'introduction', 'introductions', 'warm'],
  profile: ['profiles', 'url', 'link', 'share', 'sharing', 'template', 'templates', 'digital'],
  ai: ['enrichment', 'enrich', 'scoring', 'voice', 'notetaker', 'draft'],
  team: ['teams', 'company', 'admin', 'directory', 'branding', 'leave', 'leaves'],
  login: ['sign', 'signin', 'code', 'password', 'otp', 'email', 'mobile', 'register', 'account'],
  data: ['privacy', 'secure', 'security', 'safe', 'delete', 'export', 'gdpr', 'pdpl', 'encrypted', 'encryption'],
  phone: ['ios', 'android', 'app', 'store', 'install', 'download'],
  shipping: ['ship', 'deliver', 'delivery', 'uae', 'refund', 'return'],
};

function rawTokens(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9%\s]/g, ' ')
    .split(/\s+/)
    .filter((t) => t && !STOP.has(t));
}

function tokens(s: string): string[] {
  const raw = rawTokens(s);
  const out = new Set(raw);
  for (const t of raw) {
    for (const [k, vs] of Object.entries(SYNONYMS)) {
      if (t === k || vs.includes(t)) {
        out.add(k);
        vs.forEach((v) => out.add(v));
      }
    }
  }
  return Array.from(out);
}

let vocabulary: Set<string> | undefined;
function knownWords(): Set<string> {
  if (vocabulary) return vocabulary;
  const words = new Set<string>();
  for (const e of CORPUS) for (const t of [...rawTokens(e.q), ...rawTokens(e.a)]) words.add(t);
  for (const [k, vs] of Object.entries(SYNONYMS)) {
    words.add(k);
    vs.forEach((v) => words.add(v));
  }
  vocabulary = words;
  return words;
}

/** The lowest normalised score that counts as an answer. Below it the assistant says it does not know. */
const MIN_SCORE = 1.5;

/** Relevance gate: a question whose subject words are mostly unknown to the corpus gets no answer. */
function onTopic(query: string): boolean {
  const raw = rawTokens(query);
  if (!raw.length) return false;
  const vocab = knownWords();
  const unknown = raw.filter((t) => !vocab.has(t)).length;
  return unknown < raw.length - unknown;
}

export function search(query: string, limit = 3): KnowledgeHit[] {
  if (!onTopic(query)) return [];
  const qt = tokens(query);
  if (!qt.length) return [];
  const hits: KnowledgeHit[] = [];
  for (const entry of CORPUS) {
    // Questions match with synonyms; answers match on their own words only, otherwise a long
    // answer that mentions "card" once outranks the question that is actually about cards.
    const qTok = new Set(tokens(entry.q));
    const aTok = new Set(rawTokens(entry.a));
    let score = 0;
    for (const t of qt) {
      if (qTok.has(t)) score += 3;
      else if (aTok.has(t)) score += 1;
      if (entry.q.toLowerCase().includes(query.toLowerCase().trim()) && query.trim().length > 6) score += 4;
    }
    // A question made only of stop words ("What is Linkist?") gets no free pass on the divisor.
    if (score > 0) hits.push({ entry, score: score / Math.sqrt(Math.max(qTok.size, 3) + 1) });
  }
  return hits
    .filter((h) => h.score >= MIN_SCORE)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

export const SUGGESTED = ['What is a PRM?', 'Do I need an NFC card?', 'Which plan has ICP matching?', 'How do I sign in?', 'What happens to contacts when someone leaves my team?', 'Is shipping included?'] as const;

export const FALLBACK = 'I do not have an answer for that in the help centre. I only know what Linkist does today, and I would rather say so than guess. Try another wording, browse the help centre, or email support@linkist.ai.';
