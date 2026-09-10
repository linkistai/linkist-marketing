/**
 * SEO audit against a running site (brief 7 and 10). For every route in sitemap.ts plus the
 * legal drafts, /system and a 404 probe it checks: the response status; a title and description
 * that are present, unique across the site and sensibly sized; a canonical; the robots meta on
 * routes that must not be indexed; Open Graph and Twitter tags with an image that resolves at
 * 1200 x 630; exactly one H1; JSON-LD that parses and declares a type; no unresolved markers
 * (CONFIRM, lorem, PLACEHOLDER outside the legal drafts); no em dashes outside the imported
 * articles (C15); and every internal link and image resolving. Exit 1 on any problem.
 *
 *   pnpm seo              all routes
 *   pnpm seo /pricing     one route
 */
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';
import sharp from 'sharp';
import { ROUTES } from '../src/app/sitemap';
import { getLegal } from '../src/lib/legal';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const base = (process.env['REVIEW_BASE_URL'] ?? 'http://localhost:3200').replace(/\/$/, '');
const FACTS = readFileSync(join(root, 'scripts/lib/seo-facts.js'), 'utf8');
const only = process.argv.slice(2).filter((a) => a.startsWith('/'));

/** Routes that may carry an em dash: the articles imported verbatim from linkist.ai (C15). */
const importedSlugs = readdirSync(join(root, 'content/blog'))
  .filter((f) => f.endsWith('.md'))
  .map((f) => readFileSync(join(root, 'content/blog', f), 'utf8'))
  .filter((s) => /"coverKind":\s*"photo"/.test(s) || /"source":\s*"https:\/\/www\.linkist\.ai\/blogs/.test(s))
  .map((s) => /"slug":\s*"([^"]+)"/.exec(s)?.[1] ?? '')
  .filter(Boolean);
const emDashAllowed = new Set(importedSlugs.map((s) => `/blogs/${s}`));

const drafts = getLegal()
  .filter((d) => d.status === 'draft')
  .map((d) => `/legal/${d.slug}`);
const NOINDEX = new Set([...drafts, '/system']);

interface PageFacts {
  status: number;
  title: string;
  description: string;
  canonical: string;
  robots: string;
  og: Record<string, string>;
  twitter: string;
  h1: number;
  jsonld: string[];
  links: string[];
  images: string[];
  text: string;
}

async function main() {
  const routes = only.length ? only : [...ROUTES, ...drafts, '/system'];
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  const problems: string[] = [];
  const warnings: string[] = [];
  const titles = new Map<string, string>();
  const descriptions = new Map<string, string>();
  const checked = new Map<string, number>();

  /** 200 for a page; a redirect to another host (Get the App, Get NFC Card) counts as resolved without fetching the product. */
  const status = async (url: string): Promise<number> => {
    if (checked.has(url)) return checked.get(url)!;
    let code = 0;
    try {
      const res = await fetch(url, { redirect: 'manual' });
      const location = res.headers.get('location') ?? '';
      if (res.status >= 300 && res.status < 400 && location) {
        code = /^https?:\/\//.test(location) && !location.startsWith(base) ? 200 : await status(new URL(location, base).toString());
      } else code = res.status;
    } catch {
      code = 0;
    }
    checked.set(url, code);
    return code;
  };

  for (const route of routes) {
    const res = await page.goto(base + route, { waitUntil: 'networkidle' });
    // Evaluated as a string: functions from tsx-compiled files carry a __name helper the page lacks.
    const facts = await page.evaluate<Omit<PageFacts, 'status'>>(FACTS);
    const f: PageFacts = { status: res?.status() ?? 0, ...facts };
    const p = (m: string) => problems.push(`${route}: ${m}`);
    const w = (m: string) => warnings.push(`${route}: ${m}`);

    if (f.status !== 200) p(`status ${f.status}`);
    if (!f.title) p('no title');
    else if (f.title.length > 70) w(`title is ${f.title.length} characters`);
    if (!f.description) p('no description');
    else if (f.description.length < 50 || f.description.length > 170) w(`description is ${f.description.length} characters`);
    if (f.title && titles.has(f.title)) p(`title duplicates ${titles.get(f.title)}`);
    if (f.description && descriptions.has(f.description)) p(`description duplicates ${descriptions.get(f.description)}`);
    titles.set(f.title, route);
    descriptions.set(f.description, route);
    if (!f.canonical) p('no canonical');
    else if (!f.canonical.endsWith(route === '/' ? '' : route) && !f.canonical.endsWith(route)) w(`canonical ${f.canonical}`);
    if (NOINDEX.has(route) ? !/noindex/.test(f.robots) : /noindex/.test(f.robots)) p(`robots "${f.robots}"`);
    for (const k of ['og:title', 'og:description', 'og:image', 'og:url', 'og:type']) if (!f.og[k]) p(`missing ${k}`);
    if (f.twitter !== 'summary_large_image') p(`twitter:card "${f.twitter}"`);
    if (f.h1 !== 1) p(`${f.h1} H1 elements`);
    if (!f.jsonld.length && !NOINDEX.has(route)) w('no JSON-LD');
    for (const s of f.jsonld) {
      try {
        const data: unknown = JSON.parse(s);
        const items = Array.isArray(data) ? data : [data];
        for (const it of items) if (!it || typeof it !== 'object' || !('@type' in it)) p('JSON-LD item without @type');
      } catch {
        p('JSON-LD does not parse');
      }
    }
    if (/\[CONFIRM/i.test(f.text)) p('[CONFIRM] marker on the page');
    if (/lorem ipsum/i.test(f.text)) p('lorem ipsum on the page');
    if (/\[PLACEHOLDER/i.test(f.text) && !drafts.includes(route)) p('[PLACEHOLDER] marker outside the legal drafts');
    if (f.text.includes('—') && !emDashAllowed.has(route)) p('em dash on the page');

    // The Open Graph image must resolve and be 1200 x 630 wherever it is hosted.
    const ogImage = f.og['og:image'] ?? '';
    if (ogImage) {
      const local = ogImage.replace(/^https?:\/\/[^/]+/, base);
      try {
        const r = await fetch(local);
        if (!r.ok) p(`og:image ${r.status} at ${local}`);
        else {
          const m = await sharp(Buffer.from(await r.arrayBuffer())).metadata();
          if (m.width !== 1200 || m.height !== 630) p(`og:image is ${m.width} x ${m.height}`);
        }
      } catch {
        p(`og:image unreachable at ${local}`);
      }
    }

    // Internal links and images.
    const internal = new Set<string>();
    for (const href of [...f.links, ...f.images]) {
      if (!href.startsWith(base)) continue;
      const clean = href.split('#')[0]!;
      if (/\/api\//.test(clean)) continue;
      internal.add(clean);
    }
    for (const url of internal) {
      const code = await status(url);
      if (code !== 200) p(`${url.replace(base, '')} answers ${code}`);
    }
  }

  // The 404 probe: a missing page must answer 404 with a title.
  const probe = await page.goto(`${base}/this-page-does-not-exist`, { waitUntil: 'networkidle' });
  if (probe?.status() !== 404) problems.push(`/this-page-does-not-exist: status ${probe?.status()}`);
  const probeTitle = await page.title();
  if (!probeTitle) problems.push('/this-page-does-not-exist: no title');

  await browser.close();
  for (const wmsg of warnings) console.log(`warn ${wmsg}`);
  for (const pmsg of problems) console.log(`FAIL ${pmsg}`);
  console.log(`seo: ${routes.length + 1} routes, ${checked.size} links checked, ${warnings.length} warning(s), ${problems.length} problem(s)`);
  process.exit(problems.length ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
