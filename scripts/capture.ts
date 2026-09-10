/**
 * Screen-capture pipeline: real screens from the running product into public/screens (brief, rule 2).
 *
 *   pnpm capture                 every confirmed screen in captures/manifest.ts
 *   pnpm capture home share      only those names
 *   pnpm capture --public        only screens that need no sign-in (pipeline self-test)
 *   pnpm capture --all           include screens whose path is still marked `confirm`
 *
 * Sign-in: captures/auth/state.json saved by `pnpm capture:login` (the owner signs in by hand).
 * The product is only read, never modified; nothing is created in the account.
 * Output: captures/raw/<name>-<viewport>.png (gitignored), public/screens/<same>.png, captures/log.json.
 */
import { createHash } from 'node:crypto';
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium, type BrowserContext } from '@playwright/test';
import { HOSTS, SHOTS, VIEWPORTS, type Shot } from '../captures/manifest';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const statePath = join(root, 'captures/auth/state.json');
const rawDir = join(root, 'captures/raw');
const outDir = join(root, 'public/screens');
const logPath = join(root, 'captures/log.json');

const args = process.argv.slice(2);
const publicOnly = args.includes('--public');
const includeUnconfirmed = args.includes('--all');
const names = args.filter((a) => !a.startsWith('--'));

async function main() {
  mkdirSync(rawDir, { recursive: true });
  mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch();
  const log: Record<string, unknown>[] = existsSync(logPath) ? (JSON.parse(readFileSync(logPath, 'utf8')) as Record<string, unknown>[]) : [];
  const wanted = SHOTS.filter((s) => (names.length ? names.includes(s.name) : true))
    .filter((s) => (publicOnly ? s.public : true))
    .filter((s) => (includeUnconfirmed || names.length ? true : !s.confirm));
  const needsAuth = wanted.some((s) => !s.public);
  const storage = existsSync(statePath) ? statePath : undefined;
  if (needsAuth && !storage) {
    console.error('capture: no saved session. Run `pnpm capture:login` once, or use --public to test the pipeline without an account.');
    process.exit(2);
  }
  for (const vp of ['phone', 'browser'] as const) {
    const ctx = await browser.newContext({
      viewport: { width: VIEWPORTS[vp].width, height: VIEWPORTS[vp].height },
      deviceScaleFactor: VIEWPORTS[vp].deviceScaleFactor,
      isMobile: vp === 'phone',
      hasTouch: vp === 'phone',
      colorScheme: 'dark',
      locale: 'en-AE',
      timezoneId: 'Asia/Dubai',
      storageState: storage,
    });
    for (const shot of wanted) {
      if (shot.viewport !== 'both' && shot.viewport !== vp) continue;
      await capture(ctx, shot, vp, log);
    }
    await ctx.close();
  }
  await browser.close();
  writeFileSync(logPath, JSON.stringify(log, null, 2) + '\n', 'utf8');
  console.log(`capture: done, ${wanted.length} screen(s). Log at captures/log.json`);
}

async function capture(ctx: BrowserContext, shot: Shot, vp: 'phone' | 'browser', log: Record<string, unknown>[]) {
  const page = await ctx.newPage();
  const file = `${shot.name}-${vp}.png`;
  const url = `${HOSTS[shot.host]}${shot.path}`;
  try {
    await page.goto(url, { waitUntil: 'networkidle' });
    if (!shot.public && /\/(login|UnifiedAuth)/.test(page.url())) throw new Error('redirected to sign-in: the saved session has expired, run pnpm capture:login');
    await page.getByText(shot.waitFor, { exact: false }).first().waitFor({ timeout: 20_000 });
    await page.addStyleTag({ content: '*, *::before, *::after { animation: none !important; transition: none !important; caret-color: transparent !important; } ::-webkit-scrollbar { display: none; }' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(400);
    const mask = (shot.mask ?? []).map((sel) => page.locator(sel));
    const raw = join(rawDir, file);
    await page.screenshot({ path: raw, fullPage: shot.fullPage ?? false, mask, maskColor: '#262627' });
    copyFileSync(raw, join(outDir, file));
    const sha = createHash('sha256').update(readFileSync(raw)).digest('hex').slice(0, 12);
    const i = log.findIndex((e) => e['file'] === file);
    const entry = { file, url, viewport: vp, at: new Date().toISOString(), sha };
    if (i >= 0) log[i] = entry;
    else log.push(entry);
    console.log(`  ok ${file}  (${url}, ${vp})`);
  } catch (err) {
    console.error(`  failed ${file}: ${(err as Error).message}`);
  } finally {
    await page.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
