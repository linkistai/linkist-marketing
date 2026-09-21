/**
 * Design previews from the Linkist PRM v6 prototype (owner, 21 September 2026): the prototype is a
 * single HTML file with every app screen inside a 390 x 844 phone frame, switched by goScreen().
 * Each screen is opened in headless Chromium in the dark theme (the site is dark), the bezel is stripped, and the screen is written at
 * 2x to public/screens/v6-<name>.png with the "Design preview" rule unchanged (brief rule 2): the
 * frames still carry the badge, because these are mockups, not captures of the live app.
 *
 *   pnpm capture:v6            write every screen, a 4:3 crop of each under screens/crops, and captures/v6-log.json
 *   pnpm capture:v6 --sheet    also write captures/v6-sheet.jpg, a contact sheet for review
 *   pnpm capture:v6 home share only those screens
 */
import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from '@playwright/test';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = join(root, '../prototype-v6/linkist_prm_v6.html');
const outDir = join(root, 'public/screens');
const logPath = join(root, 'captures/v6-log.json');

/** Each screen: the JavaScript that opens it inside the prototype, and what it shows. */
export const V6_SCREENS: Record<string, { open: string; caption: string }> = {
  home: { open: "goTab('home')", caption: 'Home: greeting, network counts, nudges (ICP match, going cold, a scheduled call)' },
  contacts: { open: "goTab('contacts')", caption: 'Contacts: search, Linkist and imported filters, network health, exchanges, the list' },
  detail: { open: "openContact('biji')", caption: 'A contact: John Jameson, COO, with interactions, company intelligence and labels' },
  connect: { open: "goTab('connect')", caption: 'Connect: share, capture and exchange' },
  cards: { open: "goTab('cards')", caption: 'Profiles: the cards and public profiles the person shares' },
  share: { open: "goScreen('share')", caption: 'Share my card: the card, privacy summary and a personal line' },
  shareready: { open: "goScreen('shareready')", caption: 'Share ready: QR code and tap to link' },
  capture: { open: "goScreen('capture')", caption: 'Capture a card' },
  scan: { open: "goScreen('scan')", caption: 'Scan a business card' },
  quickadd: { open: "goScreen('quickadd')", caption: 'Quick add: a contact in seconds' },
  enrich: { open: "goScreen('enrichcontact')", caption: 'AI Enrichment: fill the gaps in a record' },
  icpbuilder: { open: "goScreen('icpbuilder')", caption: 'ICP builder: describe who you are looking for' },
  icpdetail: { open: "goScreen('icpdetail'); renderIcpDetail()", caption: 'ICP detail: the people who fit' },
  askdetail: { open: "goScreen('askdetail'); renderAskDetail()", caption: 'Network Ask: post what you need' },
  intros: { open: "renderIntros(); goScreen('intros')", caption: 'Warm introductions' },
  health: { open: "goScreen('health')", caption: 'Network health: active, warming, cooling' },
  brief: { open: "goScreen('brief')", caption: 'Daily brief: what deserves attention today' },
  exchanges: { open: "goScreen('exchanges')", caption: 'Exchanges: people who tapped or scanned your card' },
  chat: { open: "openLinkerChat('neeraj')", caption: 'Linker chat: an AI-drafted reply to accept or edit' },
  snapshot: { open: "openContact('biji'); openIntelSnapshot(1)", caption: 'Intelligence snapshot: ICP and network fit for a contact' },
  record: { open: "goScreen('record')", caption: 'Voice note' },
  log: { open: "goScreen('log')", caption: 'Log an interaction' },
};

/**
 * The upper part of a screen at 4:3 for the use-case cards (D51): the status bar and the app's
 * top bar (the first 100 of 844 px) are cut so the screen's title leads, then the full width and
 * the height that makes 4:3. Profile samples have no top bar, so only their status bar goes.
 */
async function writeCrop(file: string, name: string) {
  const dir = join(outDir, 'crops');
  mkdirSync(dir, { recursive: true });
  const meta = await sharp(file).metadata();
  const w = meta.width ?? 780;
  const h = meta.height ?? 1688;
  const top = Math.round((h * (name.startsWith('profile-') ? 44 : 100)) / 844);
  const height = Math.min(Math.round((w * 3) / 4), h - top);
  await sharp(file).extract({ left: 0, top, width: w, height }).webp({ quality: 86 }).toFile(join(dir, `${name.startsWith('profile-') ? name : `v6-${name}`}-43.webp`));
}

async function main() {
  if (!existsSync(src)) throw new Error(`prototype not found at ${src}`);
  const args = process.argv.slice(2);
  const sheet = args.includes('--sheet');
  const only = args.filter((a) => !a.startsWith('--'));
  const names = only.length ? only : Object.keys(V6_SCREENS);
  mkdirSync(outDir, { recursive: true });
  mkdirSync(dirname(logPath), { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 600, height: 1000 }, deviceScaleFactor: 2, colorScheme: 'dark' });
  await page.goto(pathToFileURL(src).href);
  await page.addStyleTag({ content: '.dev-toolbar,.dev-toolbar-btn,[class*="system-btn"],#systemBtn{display:none!important} .phone-frame{border:0!important;border-radius:0!important;box-shadow:none!important;width:390px!important;height:844px!important} .screen{scrollbar-width:none} *{animation-duration:0s!important;transition-duration:0s!important}' });
  await page.waitForTimeout(500);

  const log: Record<string, unknown>[] = [];
  const done: string[] = [];
  for (const name of names) {
    const s = V6_SCREENS[name];
    if (!s) {
      console.warn(`  skip ${name}: unknown`);
      continue;
    }
    try {
      await page.evaluate(s.open);
      await page.waitForTimeout(350);
      const frame = page.locator('.phone-frame');
      const file = join(outDir, `v6-${name}.png`);
      await frame.screenshot({ path: file, type: 'png' });
      const meta = await sharp(file).metadata();
      await writeCrop(file, name);
      log.push({ name: `v6-${name}`, source: 'linkist_prm_v6.html (design prototype, not the live app)', open: s.open, caption: s.caption, size: `${meta.width}x${meta.height}`, at: new Date().toISOString() });
      done.push(name);
      console.log(`  ok screens/v6-${name}.png  ${meta.width}x${meta.height}`);
    } catch (e) {
      console.warn(`  fail ${name}: ${(e as Error).message.split('\n')[0]}`);
    }
  }
  await browser.close();
  writeFileSync(logPath, JSON.stringify(log, null, 2) + '\n');
  // The owner's profile samples get the same crop so the use-case cards can show either kind.
  for (const f of readdirSync(outDir).filter((n) => /^profile-.*\.webp$/.test(n))) await writeCrop(join(outDir, f), f.replace(/\.webp$/, ''));

  if (sheet && done.length) {
    const cell = { w: 195, h: 422 };
    const cols = 6;
    const rows = Math.ceil(done.length / cols);
    const tiles = await Promise.all(
      done.map(async (n, i) => ({
        input: await sharp(join(outDir, `v6-${n}.png`)).resize(cell.w, cell.h).toBuffer(),
        left: (i % cols) * (cell.w + 16) + 16,
        top: Math.floor(i / cols) * (cell.h + 40) + 16,
      })),
    );
    const labels = done.map((n, i) => `<text x="${(i % cols) * (cell.w + 16) + 16}" y="${Math.floor(i / cols) * (cell.h + 40) + 16 + cell.h + 22}" font-size="16" font-family="sans-serif" fill="#fff">${n}</text>`);
    const w = cols * (cell.w + 16) + 16;
    const h = rows * (cell.h + 40) + 16;
    await sharp({ create: { width: w, height: h, channels: 3, background: '#222' } })
      .composite([...tiles, { input: Buffer.from(`<svg width="${w}" height="${h}">${labels.join('')}</svg>`), left: 0, top: 0 }])
      .jpeg({ quality: 82 })
      .toFile(join(root, 'captures/v6-sheet.jpg'));
    console.log('sheet: captures/v6-sheet.jpg');
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
