/**
 * Imports the company's published legal documents (privacy policy, terms of service) from
 * linkist.ai into content/legal as Markdown with a JSON front matter block, verbatim. They are
 * the documents in force; the site reproduces them and links to the originals (D24).
 *
 *   pnpm import:legal
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const EXTRACT = readFileSync(join(root, 'scripts/lib/legal-extract.js'), 'utf8');
const today = new Date().toISOString().slice(0, 10);

const DOCS = [
  { slug: 'privacy', title: 'Privacy Policy', url: 'https://www.linkist.ai/privacy', summary: 'What Linkist collects, why, where it goes, how long it is kept, and your rights. Written under the UAE Personal Data Protection Law.' },
  { slug: 'terms', title: 'Terms of Service', url: 'https://www.linkist.ai/terms', summary: 'The agreement for using Linkist: accounts, profiles, NFC card orders, subscriptions, AI features, acceptable use and liability.' },
] as const;

function tidy(md: string): { body: string; version: string; effective: string } {
  const lines = md.split('\n');
  const start = lines.findIndex((l) => /^# /.test(l));
  let out = start >= 0 ? lines.slice(start) : lines;
  const stop = out.findIndex((l, i) => i > 0 && /^(View (Terms of Service|Privacy Policy)|© \d{4}|Back to Home)/i.test(l.trim()));
  if (stop > 0) out = out.slice(0, stop);
  const version = /Version\s+([\d.]+)/i.exec(md)?.[1] ?? '';
  const raw = /Last updated:\s*([0-9]{2})-([A-Za-z]+)-([0-9]{4})/i.exec(md);
  const months: Record<string, string> = { january: '01', february: '02', march: '03', april: '04', may: '05', june: '06', july: '07', august: '08', september: '09', october: '10', november: '11', december: '12' };
  const effective = raw ? `${raw[3]}-${months[raw[2]!.toLowerCase()] ?? '01'}-${raw[1]}` : '';
  // The page title, version and date live in the front matter; drop their lines from the body.
  const body = out
    .filter((l, i) => !(i === 0 && /^# /.test(l)) && !/^(Last updated:|Version\s+[\d.]+$)/i.test(l.trim()))
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  return { body, version, effective };
}

async function main() {
  const outDir = join(root, 'content/legal');
  mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, locale: 'en-GB' });
  const page = await ctx.newPage();
  for (const doc of DOCS) {
    process.stdout.write(`  ${doc.slug} ... `);
    await page.goto(doc.url, { waitUntil: 'domcontentloaded', timeout: 60_000 });
    await page.waitForSelector('h1', { timeout: 60_000 });
    await page.waitForTimeout(800);
    const md = await page.evaluate<string>(EXTRACT);
    const { body, version, effective } = tidy(md);
    if (body.split(/\s+/).length < 500) throw new Error(`${doc.slug}: only ${body.split(/\s+/).length} words extracted`);
    const front = { slug: doc.slug, title: doc.title, summary: doc.summary, status: 'published', version, effective, updated: effective, source: doc.url, imported: today };
    writeFileSync(join(outDir, `${doc.slug}.md`), `---json\n${JSON.stringify(front, null, 2)}\n---\n\n${body}\n`);
    console.log(`ok (version ${version || '?'}, effective ${effective || '?'}, ${body.split(/\s+/).length} words)`);
  }
  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
