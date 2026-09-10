import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { readingMinutes, renderMarkdown, type Chapter } from '@/lib/markdown';
import type { BlogCategory } from '@/lib/blog-shared';

export { CATEGORY_LABELS, initials, type BlogCategory } from '@/lib/blog-shared';

/**
 * The blog: articles imported from linkist.ai/blogs (scripts/import-blog.ts) as Markdown files in
 * content/blog, each with a JSON front matter block. Read at build time, server components only.
 */

export interface BlogFaq {
  readonly q: string;
  readonly a: string;
}

export interface BlogPost {
  readonly slug: string;
  readonly category: BlogCategory;
  readonly categoryLabel: string;
  readonly title: string;
  readonly excerpt: string;
  readonly author: string;
  readonly date: string;
  readonly dateLabel: string;
  readonly readTime: number;
  readonly cover: string;
  readonly coverAlt: string;
  /** A photograph, or a title card rendered from the tokens (D20); article pages skip the latter. */
  readonly coverKind?: 'photo' | 'card';
  readonly source: string;
  readonly imported: string;
  readonly faq: readonly BlogFaq[];
  readonly body: string;
}

export interface RenderedPost extends BlogPost {
  readonly html: string;
  readonly chapters: readonly Chapter[];
  readonly words: number;
  readonly minutes: number;
}

const DIR = join(process.cwd(), 'content/blog');

function parse(file: string): BlogPost {
  const raw = readFileSync(join(DIR, file), 'utf8').replace(/\r\n/g, '\n');
  const m = /^---json\n([\s\S]*?)\n---\n([\s\S]*)$/.exec(raw);
  if (!m) throw new Error(`content/blog/${file}: missing the JSON front matter block`);
  const front = JSON.parse(m[1]!) as Omit<BlogPost, 'body'>;
  return { ...front, body: m[2]!.trim() };
}

let cache: readonly BlogPost[] | null = null;

/** Every post, newest first. */
export function getPosts(): readonly BlogPost[] {
  if (cache) return cache;
  cache = readdirSync(DIR)
    .filter((f) => f.endsWith('.md'))
    .map(parse)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.title.localeCompare(b.title)));
  return cache;
}

export const getPost = (slug: string): BlogPost | undefined => getPosts().find((p) => p.slug === slug);

export function renderPost(post: BlogPost): RenderedPost {
  const { html, chapters, words } = renderMarkdown(post.body);
  return { ...post, html, chapters, words, minutes: readingMinutes(words) };
}

/** Three related posts: same category first, then the newest of the rest. */
export function related(post: BlogPost, count = 3): readonly BlogPost[] {
  const all = getPosts().filter((p) => p.slug !== post.slug);
  return [...all.filter((p) => p.category === post.category), ...all.filter((p) => p.category !== post.category)].slice(0, count);
}
