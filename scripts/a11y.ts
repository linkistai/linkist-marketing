/**
 * Accessibility scan (brief 10): axe-core on every route at phone and desktop widths, plus a
 * keyboard pass that tabs through the page and checks every focused element has a visible
 * outline and a name, and a check that heading levels never skip. Runs on the dark theme, which
 * is where contrast must be measured.
 *
 *   pnpm a11y                     all routes from src/app/sitemap.ts plus /system
 *   pnpm a11y / /pricing          only those
 */
import AxeBuilder from '@axe-core/playwright';
import { chromium } from '@playwright/test';
import { ROUTES } from '../src/app/sitemap';

const base = (process.env['REVIEW_BASE_URL'] ?? 'http://localhost:3200').replace(/\/$/, '');
const only = process.argv.slice(2).filter((a) => a.startsWith('/'));
const routes = only.length ? only : [...ROUTES, '/system'];

async function main() {
  const browser = await chromium.launch();
  let problems = 0;
  for (const width of [390, 1440]) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 }, isMobile: width < 768, hasTouch: width < 768, colorScheme: 'dark' });
    for (const route of routes) {
      const page = await ctx.newPage();
      await page.goto(`${base}${route}?motion=off`, { waitUntil: 'load', timeout: 60_000 });
      await page.waitForTimeout(500);
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice']).exclude('.screen-pending').analyze();
      const serious = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
      const headings = await page.evaluate(() => {
        const hs = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6')).map((h) => Number(h.tagName[1]));
        const skips: string[] = [];
        for (let i = 1; i < hs.length; i++) if (hs[i]! > hs[i - 1]! + 1) skips.push(`h${hs[i - 1]} to h${hs[i]}`);
        return { count: hs.length, h1: hs.filter((h) => h === 1).length, skips };
      });
      const landmarks = await page.evaluate(() => ({ main: document.querySelectorAll('main').length }));
      const tabProblems: string[] = [];
      if (width === 1440) {
        for (let i = 0; i < 25; i++) {
          await page.keyboard.press('Tab');
          const info = await page.evaluate(() => {
            const el = document.activeElement as HTMLElement | null;
            if (!el || el === document.body) return null;
            const cs = getComputedStyle(el);
            const r = el.getBoundingClientRect();
            const labels = (el as HTMLInputElement).labels;
            const name = el.getAttribute('aria-label') || (labels && labels.length ? labels[0]!.textContent?.trim() : '') || el.textContent?.trim() || el.getAttribute('title') || (el as HTMLInputElement).placeholder || '';
            const outline = cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0;
            const ring = cs.boxShadow !== 'none';
            return { tag: el.tagName.toLowerCase(), name: name.slice(0, 40), visible: r.width > 0 && r.height > 0, focusVisible: el.matches(':focus-visible'), outline: outline || ring };
          });
          if (info && info.visible && info.focusVisible && !info.outline) tabProblems.push(`${info.tag} "${info.name}" no visible focus`);
          if (info && info.visible && !info.name) tabProblems.push(`${info.tag} unnamed`);
        }
      }
      const bad = serious.length + headings.skips.length + (headings.h1 === 1 ? 0 : 1) + (landmarks.main === 1 ? 0 : 1) + tabProblems.length;
      problems += bad;
      const detail = [
        ...serious.map((v) => `${v.id} (${v.nodes.length}): ${v.nodes[0]?.target.join(' ')}`),
        ...headings.skips.map((s) => `heading skip ${s}`),
        ...(headings.h1 !== 1 ? [`h1 count ${headings.h1}`] : []),
        ...(landmarks.main !== 1 ? [`main count ${landmarks.main}`] : []),
        ...tabProblems,
      ];
      console.log(`${bad ? 'FAIL' : 'ok  '} ${route} @${width}  axe serious/critical ${serious.length}, minor ${results.violations.length - serious.length}${detail.length ? `\n    ${detail.join('\n    ')}` : ''}`);
      await page.close();
    }
    await ctx.close();
  }
  await browser.close();
  console.log(`a11y: ${problems} problem(s)`);
  process.exit(problems ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
