/**
 * Layout rules from brief 10 that axe does not cover, against a running site:
 *   - every control at least 44 x 44 px (inline links inside running text are exempt, as WCAG allows)
 *   - the floating assistant launcher never covers the footer's last row or the hero controls
 *   - the footer newsletter input keeps a usable width at 768 px
 *
 *   pnpm layout            all routes from src/app/sitemap.ts
 *   pnpm layout / /help    only those
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';
import { ROUTES } from '../src/app/sitemap';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const base = (process.env['REVIEW_BASE_URL'] ?? 'http://localhost:3200').replace(/\/$/, '');
const only = process.argv.slice(2).filter((a) => a.startsWith('/'));
const routes = only.length ? only : [...ROUTES];
const SCAN = readFileSync(join(root, 'scripts/lib/layout-scan.js'), 'utf8');

interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}
interface Scan {
  small: { tag: string; name: string; w: number; h: number }[];
  launcher: Box | null;
  footerRow: Box | null;
  footerControls: (Box & { name: string })[];
  heroControls: (Box & { name: string })[];
  newsletter: number | null;
}

const overlaps = (a: Box | null, b: Box | null) => !!a && !!b && a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
const WIDTHS = [390, 768, 1024, 1280, 1440];

async function main() {
  const browser = await chromium.launch();
  const problems: string[] = [];
  const warnings: string[] = [];
  for (const width of WIDTHS) {
    const ctx = await browser.newContext({ viewport: { width, height: width < 768 ? 844 : 900 }, isMobile: width < 768, hasTouch: width < 768 });
    for (const route of routes) {
      const page = await ctx.newPage();
      await page.goto(`${base}${route}?motion=off`, { waitUntil: 'load', timeout: 60_000 });
      await page.waitForTimeout(400);
      const top = await page.evaluate<Scan>(SCAN);
      if (top.small.length) warnings.push(`${route} @${width}: ${top.small.length} control(s) under 44 px: ${top.small.slice(0, 4).map((s) => `${s.tag} "${s.name}" ${s.w}x${s.h}`).join('; ')}${top.small.length > 4 ? '; ...' : ''}`);
      for (const c of top.heroControls) if (overlaps(top.launcher, c)) problems.push(`${route} @${width}: the assistant launcher covers the hero control "${c.name}"`);
      if (width >= 768 && top.newsletter !== null && top.newsletter < 200) problems.push(`${route} @${width}: footer newsletter input is ${top.newsletter} px wide`);
      // At the bottom of the page (instant scroll, so smooth scrolling cannot leave the page mid-way) the
      // launcher must sit clear of every control in the footer's last row.
      await page.evaluate("window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' })");
      await page.waitForTimeout(400);
      const bottom = await page.evaluate<Scan>(SCAN);
      for (const c of bottom.footerControls) if (overlaps(bottom.launcher, c)) problems.push(`${route} @${width}: the assistant launcher covers the footer control "${c.name}"`);
      if (!bottom.footerControls.length && overlaps(bottom.launcher, bottom.footerRow)) problems.push(`${route} @${width}: the assistant launcher covers the footer's last row`);
      await page.close();
    }
    await ctx.close();
  }
  await browser.close();
  for (const w of warnings) console.log(`warn ${w}`);
  for (const p of problems) console.log(`FAIL ${p}`);
  console.log(`layout: ${routes.length} routes at ${WIDTHS.length} widths, ${warnings.length} warning(s), ${problems.length} problem(s)`);
  process.exit(problems.length ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
