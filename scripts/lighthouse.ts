/**
 * Lighthouse on every route, mobile and desktop, against a running production build (brief 10:
 * 95 or better in every category, Core Web Vitals green). Uses Playwright's Chromium so nothing
 * else needs installing. Writes captures/lighthouse/summary.md and one JSON report per run.
 *
 *   pnpm lighthouse              every route in src/app/sitemap.ts
 *   pnpm lighthouse / /pricing   only those
 *   pnpm lighthouse --mobile     one form factor only (or --desktop)
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';
import lighthouse from 'lighthouse';
import { ROUTES } from '../src/app/sitemap';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const base = (process.env['REVIEW_BASE_URL'] ?? 'http://localhost:3200').replace(/\/$/, '');
const args = process.argv.slice(2);
const only = args.filter((a) => a.startsWith('/'));
const forms = args.includes('--mobile') ? ['mobile'] : args.includes('--desktop') ? ['desktop'] : ['mobile', 'desktop'];
const routes = only.length ? only : [...ROUTES];
const outDir = join(root, 'captures/lighthouse');
const THRESHOLD = 95;

type Row = { route: string; form: string; perf: number; a11y: number; bp: number; seo: number; lcp: number; cls: number; tbt: number };

async function main() {
  mkdirSync(outDir, { recursive: true });
  // Playwright's Chromium with a debugging port; chrome-launcher could not spawn on this machine.
  const port = 9333;
  const browser = await chromium.launch({ args: [`--remote-debugging-port=${port}`] });
  const rows: Row[] = [];
  try {
    for (const form of forms) {
      for (const route of routes) {
        const result = await lighthouse(base + route, {
          port,
          output: 'json',
          logLevel: 'error',
          onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
          formFactor: form as 'mobile' | 'desktop',
          screenEmulation: form === 'mobile' ? { mobile: true, width: 412, height: 823, deviceScaleFactor: 2.625, disabled: false } : { mobile: false, width: 1350, height: 940, deviceScaleFactor: 1, disabled: false },
          throttlingMethod: 'simulate',
          throttling: form === 'mobile' ? { rttMs: 150, throughputKbps: 1638.4, cpuSlowdownMultiplier: 4, requestLatencyMs: 562.5, downloadThroughputKbps: 1474.56, uploadThroughputKbps: 675 } : { rttMs: 40, throughputKbps: 10240, cpuSlowdownMultiplier: 1, requestLatencyMs: 0, downloadThroughputKbps: 0, uploadThroughputKbps: 0 },
        });
        const lhr = result?.lhr;
        if (!lhr) continue;
        const cat = (k: string) => Math.round((lhr.categories[k]?.score ?? 0) * 100);
        const num = (k: string) => Number(lhr.audits[k]?.numericValue ?? 0);
        const row: Row = { route, form, perf: cat('performance'), a11y: cat('accessibility'), bp: cat('best-practices'), seo: cat('seo'), lcp: Math.round(num('largest-contentful-paint')), cls: Math.round(num('cumulative-layout-shift') * 1000) / 1000, tbt: Math.round(num('total-blocking-time')) };
        rows.push(row);
        const slug = (route === '/' ? 'home' : route.slice(1).replace(/\//g, '-')) + `-${form}`;
        writeFileSync(join(outDir, `${slug}.json`), JSON.stringify(lhr));
        const flag = [row.perf, row.a11y, row.bp, row.seo].some((s) => s < THRESHOLD) ? 'LOW ' : 'ok  ';
        console.log(`${flag} ${route} ${form}: perf ${row.perf} a11y ${row.a11y} bp ${row.bp} seo ${row.seo} | LCP ${row.lcp} ms CLS ${row.cls} TBT ${row.tbt} ms`);
      }
    }
  } finally {
    await browser.close();
  }
  const low = rows.filter((r) => [r.perf, r.a11y, r.bp, r.seo].some((s) => s < THRESHOLD));
  const md = ['# Lighthouse', '', `Run: ${new Date().toISOString()}. Base ${base}. Threshold ${THRESHOLD}.`, '', '| Route | Form | Perf | A11y | Best practices | SEO | LCP ms | CLS | TBT ms |', '| --- | --- | --- | --- | --- | --- | --- | --- | --- |', ...rows.map((r) => `| ${r.route} | ${r.form} | ${r.perf} | ${r.a11y} | ${r.bp} | ${r.seo} | ${r.lcp} | ${r.cls} | ${r.tbt} |`), '', `${rows.length} runs, ${low.length} below ${THRESHOLD} in some category.`];
  writeFileSync(join(outDir, 'summary.md'), md.join('\n') + '\n');
  console.log(`lighthouse: ${rows.length} runs, ${low.length} below ${THRESHOLD}; captures/lighthouse/summary.md`);
  process.exit(low.length ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
