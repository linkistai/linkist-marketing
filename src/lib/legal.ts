import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { renderMarkdown, type Chapter } from '@/lib/markdown';

/**
 * The legal hub (brief 4, checkpoint 6): Markdown documents in content/legal with a JSON front
 * matter block. Two are the company's published documents, imported verbatim
 * (scripts/import-legal.ts); the rest are drafts for counsel with [PLACEHOLDER: ...] markers.
 * Server components only.
 */
export type LegalStatus = 'published' | 'draft';

export interface LegalDoc {
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  readonly status: LegalStatus;
  /** Document version as printed on it, when it has one. */
  readonly version: string;
  /** Effective date, ISO. Drafts carry the draft date. */
  readonly effective: string;
  readonly updated: string;
  /** Where the document is published, for the two imported ones. */
  readonly source?: string;
  readonly imported?: string;
  readonly body: string;
}

export interface RenderedLegal extends LegalDoc {
  readonly html: string;
  readonly chapters: readonly Chapter[];
  readonly placeholders: number;
}

/** Hub order (brief 4). */
export const LEGAL_ORDER: readonly string[] = ['terms', 'privacy', 'cookie-policy', 'acceptable-use', 'refund-and-shipping', 'sub-processors', 'security-overview', 'accessibility', 'company-information', 'contact-data-notice'];

const DIR = join(process.cwd(), 'content/legal');

function parse(file: string): LegalDoc {
  const raw = readFileSync(join(DIR, file), 'utf8').replace(/\r\n/g, '\n');
  const m = /^---json\n([\s\S]*?)\n---\n([\s\S]*)$/.exec(raw);
  if (!m) throw new Error(`content/legal/${file}: missing the JSON front matter block`);
  const front = JSON.parse(m[1]!) as Omit<LegalDoc, 'body'>;
  return { ...front, body: m[2]!.trim() };
}

let cache: readonly LegalDoc[] | null = null;

export function getLegal(): readonly LegalDoc[] {
  if (cache) return cache;
  const docs = readdirSync(DIR)
    .filter((f) => f.endsWith('.md'))
    .map(parse);
  cache = [...docs].sort((a, b) => {
    const ia = LEGAL_ORDER.indexOf(a.slug);
    const ib = LEGAL_ORDER.indexOf(b.slug);
    return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib) || a.title.localeCompare(b.title);
  });
  return cache;
}

export const getLegalDoc = (slug: string): LegalDoc | undefined => getLegal().find((d) => d.slug === slug);

/** Renders the body and wraps every [PLACEHOLDER: ...] marker so it is visible on the page. */
export function renderLegal(doc: LegalDoc): RenderedLegal {
  const { html, chapters } = renderMarkdown(doc.body);
  const placeholders = (doc.body.match(/\[PLACEHOLDER/g) ?? []).length;
  const marked = html.replace(/\[PLACEHOLDER:([^\]]*)\]/g, (_m, text: string) => `<mark class="placeholder">Placeholder for counsel:${text}</mark>`);
  return { ...doc, html: marked, chapters, placeholders };
}
