/**
 * Imports the published articles from linkist.ai/blogs into content/blog as Markdown with a JSON
 * front matter block, and downloads their images into public/blog/<slug>/. The published site is
 * the source of truth (its code lives in the linkist-prod repository, where each article is a
 * React component); the bodies are the authors' text verbatim (D18).
 *
 *   pnpm import:blog            all posts
 *   pnpm import:blog <slug>     one post
 *
 * Block mapping (old site class -> Markdown subset in src/lib/markdown.ts):
 *   h2/h3, p, ul/ol, table          -> the same
 *   .blog-highlight-box             -> ::note
 *   .blog-flow-steps                -> ::flow (chips joined by arrows)
 *   .blog-method-grid, .blog-audience-grid -> ::cards (Title | description per line)
 *   .blog-benefits-grid             -> bullet list
 *   .blog-faq                       -> h3 question + answer, and the pairs in front matter for FAQPage JSON-LD
 *   figure                          -> ![alt](path "caption"), image downloaded
 *   .blog-cta-block                 -> dropped (the site adds its own closing band)
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE = 'https://www.linkist.ai';
const only = process.argv.slice(2).filter((a) => !a.startsWith('-'));
const today = new Date().toISOString().slice(0, 10);
/** The in-page extractor, kept as plain JavaScript (see the note in that file). */
const EXTRACT = readFileSync(join(dirname(fileURLToPath(import.meta.url)), 'lib/blog-extract.js'), 'utf8');

export interface ImportedPost {
  readonly slug: string;
  readonly category: 'nfc' | 'networking' | 'crm' | 'uae' | 'product';
  readonly categoryLabel: string;
  readonly title: string;
  readonly excerpt: string;
  readonly author: string;
  /** ISO date; the old site shows some dates as month and year only, so dateLabel keeps that. */
  readonly date: string;
  readonly dateLabel: string;
  readonly readTime: number;
  readonly image: string;
}

/** Metadata as published in lib/blog-data.ts of the old site, newest first. */
const POSTS: readonly ImportedPost[] = [
  {
    slug: 'linkedin-profile-vs-digital-identity',
    category: 'nfc',
    categoryLabel: 'Digital Business Cards & NFC',
    title: 'LinkedIn Profile vs Digital Identity: Why Professionals Need Both',
    excerpt: 'Learn the difference between a LinkedIn profile and a professional digital identity, and why modern professionals need both to network, share and build trust.',
    author: 'Neeraj Varma',
    date: '2026-07-23',
    dateLabel: '23 July 2026',
    readTime: 8,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
  },
  {
    slug: 'ai-relationship-intelligence-networking',
    category: 'crm',
    categoryLabel: 'Relationship Management',
    title: 'AI Can Remember Everyone You Meet. But Should It?',
    excerpt: 'Explore how AI can support professional networking, relationship memory and follow-ups while keeping trust, privacy and human judgement at the centre.',
    author: 'Neeraj Varma',
    date: '2026-07-21',
    dateLabel: '21 July 2026',
    readTime: 8,
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984',
  },
  {
    slug: 'what-is-relationship-capital',
    category: 'crm',
    categoryLabel: 'Relationship Management',
    title: 'What Is Relationship Capital, and Why Is It a Business Asset?',
    excerpt: 'Learn what relationship capital is, how trust and professional networks create business value, and how Linkist helps organise and activate it.',
    author: 'Surya Murali',
    date: '2026-07-01',
    dateLabel: 'July 2026',
    readTime: 10,
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf',
  },
  {
    slug: 'ai-nfc-smart-follow-up',
    category: 'product',
    categoryLabel: 'Product Updates',
    title: 'How AI Turns an NFC Tap Into a Smarter Professional Follow-Up',
    excerpt: 'Learn how NFC cards, digital profiles, context capture and AI-powered nudges can help professionals remember meetings and follow up with relevance.',
    author: 'Surya Murali',
    date: '2026-07-01',
    dateLabel: 'July 2026',
    readTime: 9,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
  },
  {
    slug: 'what-is-personal-relationship-management',
    category: 'crm',
    categoryLabel: 'Relationship Management',
    title: 'What Is Personal Relationship Management and Why Do Professionals Need It?',
    excerpt: 'Learn what Personal Relationship Management means, how it differs from CRM, and why professionals need a better way to organise, maintain and grow valuable relationships.',
    author: 'Neeraj Varma',
    date: '2026-06-01',
    dateLabel: 'June 2026',
    readTime: 9,
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984',
  },
  {
    slug: 'how-to-network-at-uae-business-events',
    category: 'networking',
    categoryLabel: 'Networking',
    title: 'How to Network at Business Events in the UAE and Be Remembered',
    excerpt: 'Learn how to prepare, start meaningful conversations, exchange details and follow up effectively at business events in Dubai, Abu Dhabi and across the UAE.',
    author: 'Neeraj Varma',
    date: '2026-06-01',
    dateLabel: 'June 2026',
    readTime: 8,
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf',
  },
  {
    slug: 'what-is-a-digital-business-card',
    category: 'nfc',
    categoryLabel: 'Digital Business Cards & NFC',
    title: 'What Is a Digital Business Card? A Complete Guide for UAE Professionals and Global Teams',
    excerpt: 'Everything you need to know about digital business cards: how they work, why professionals are switching, and how to create one that gets results.',
    author: 'Neeraj Varma',
    date: '2026-06-01',
    dateLabel: 'June 2026',
    readTime: 10,
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0',
  },
];

/** Old-site links that have a page here. Anything else on linkist.ai stays absolute. */
const LINKS: Record<string, string> = {
  '/choose-plan': '/pricing',
  '/digital-business-card#pricing': '/nfc-cards',
  '/digital-business-card': '/nfc-cards',
  '/pricing': '/pricing',
  '/login': '/start',
  '/register': '/start',
};

function mapLink(href: string): string {
  const m = /^https?:\/\/(?:www\.)?linkist\.ai(\/[^\s)]*)?$/.exec(href);
  if (!m) return href;
  const path = m[1] ?? '/';
  if (path.startsWith('/blogs/')) return path;
  if (path === '/blogs') return '/blogs';
  return LINKS[path] ?? href;
}

function unsplash(url: string, w: number, h: number): string {
  const u = new URL(url);
  u.searchParams.set('w', String(w));
  u.searchParams.set('h', String(h));
  u.searchParams.set('fit', 'crop');
  u.searchParams.set('q', '80');
  u.searchParams.set('auto', 'format');
  u.searchParams.set('fm', 'jpg');
  return u.toString();
}

async function download(url: string, file: string): Promise<void> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} for ${url}`);
  writeFileSync(file, Buffer.from(await res.arrayBuffer()));
}

interface Extract {
  md: string;
  figures: { src: string; alt: string; caption: string }[];
  faqs: { q: string; a: string }[];
}


async function main() {
  const outDir = join(root, 'content/blog');
  mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, locale: 'en-GB' });
  const page = await ctx.newPage();
  const done: string[] = [];
  for (const post of POSTS) {
    if (only.length && !only.includes(post.slug)) continue;
    const url = `${SOURCE}/blogs/${post.slug}`;
    process.stdout.write(`  ${post.slug} ... `);
    // Tag managers keep the old site's network busy, so wait for the article, not for idle.
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60_000 });
    await page.waitForSelector('.blog-article-content h2', { timeout: 60_000 });
    await page.waitForTimeout(500);
    const got = await page.evaluate<Extract | null>(EXTRACT);
    if (!got) throw new Error(`no article body at ${url}`);

    const dir = join(root, 'public/blog', post.slug);
    mkdirSync(dir, { recursive: true });
    const cover = join(dir, 'cover.jpg');
    if (!existsSync(cover)) await download(unsplash(post.image, 1600, 900), cover);
    let md = got.md;
    for (let i = 0; i < got.figures.length; i += 1) {
      const f = got.figures[i]!;
      const file = join(dir, `figure-${i + 1}.jpg`);
      if (!existsSync(file)) await download(f.src.includes('images.unsplash.com') ? unsplash(f.src, 1400, 700) : f.src, file);
      md = md.replace(`__FIG_${i}__`, `/blog/${post.slug}/figure-${i + 1}.jpg`);
    }
    md = md.replace(/\]\((https?:[^)\s]+)\)/g, (_m, href: string) => `](${mapLink(href)})`);

    const front = {
      ...post,
      cover: `/blog/${post.slug}/cover.jpg`,
      coverAlt: post.title,
      source: url,
      imported: today,
      faq: got.faqs,
    };
    writeFileSync(join(outDir, `${post.slug}.md`), `---json\n${JSON.stringify(front, null, 2)}\n---\n\n${md}`);
    done.push(post.slug);
    console.log(`ok (${md.split(/\s+/).length} words, ${got.figures.length} figures, ${got.faqs.length} FAQs)`);
  }
  await browser.close();
  console.log(`\n${done.length} post(s) written to content/blog. Review each file; the bodies are verbatim.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
