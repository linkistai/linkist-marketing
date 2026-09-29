/**
 * Design previews from the Linkist PRM v12 prototype (owner, 25 September 2026), the same way as
 * capture-v6.ts: the prototype sits outside git at ../prototype-v12/linkist_prm_v12.html, each
 * screen opens in headless Chromium in the dark theme with the bezel stripped, and is written at 2x
 * to public/screens/v12-<name>.png. A `tall` screen is captured at its full scroll length so the
 * site can let it scroll inside the phone.
 *
 *   pnpm capture:v12            every screen below
 *   pnpm capture:v12 icpintro   only that one
 *   pnpm capture:v12 profile    Natalie Vale's profile, light and dark (below)
 */
import { existsSync, mkdirSync, readFileSync, unlinkSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from '@playwright/test';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = join(root, '../prototype-v12/linkist_prm_v12.html');
const outDir = join(root, 'public/screens');

/** Each screen: how to open it, the element that scrolls (for tall captures), and what it shows. */
export const V12_SCREENS: Record<string, { open: string; tall?: string; caption: string }> = {
  shareready: { open: "goTab('connect'); goScreen('share'); goScreen('shareready')", caption: 'Share my card: the QR code and the link to share' },
  icpintro: { open: 'startIcpBuilder()', tall: '#screen-icpbuilder', caption: 'ICP Studio: the intro, how an Ideal Connection Profile works' },
};

/**
 * Natalie Vale's public profile as the other person sees it after a tap (owner, 29 September 2026:
 * the tap scene on /nfc-cards), in the light and the dark theme, as public/screens/
 * v12-profile-natalie-<theme>.webp. The prototype's own renderer draws it, the way the owner opens
 * it (Profile, Preview this card, full screen, the panel dragged to half): the demo card is seeded,
 * Natalie's details from the owner's samples replace Zayn's (the email and number are examples in
 * the prototype's own style), and her photo, the sample with its two overlay buttons removed
 * (scripts/fixtures/natalie-vale-photo-<theme>.jpg; below her shoulders, where the frosted panel
 * blurs it, a light or a dark tone to suit the theme), replaces his.
 */
const NATALIE = {
  firstName: 'Natalie',
  lastName: 'Vale',
  jobTitle: 'Student of Business Management',
  company: 'NYU Abu Dhabi',
  companyLogo_uploaded: false,
  workEmail: 'natalie@vale.example',
  primaryMobile: '50 555 0142',
  primaryMobile_code: '+971',
  website: '',
  companyCity: 'Abu Dhabi',
  companyCountry: 'UAE',
  bio: 'Entrepreneur and technology enthusiast.',
  aboutMe: 'Passionate entrepreneur and technology enthusiast, studying business management at NYU Abu Dhabi.',
  linkedin: 'natalievale',
  twitter: '',
  facebook: 'natalievale',
  instagram: 'natalie_vale',
};

async function captureProfile(page: import('@playwright/test').Page, theme: 'light' | 'dark') {
  const photo = `data:image/jpeg;base64,${readFileSync(join(root, `scripts/fixtures/natalie-vale-photo-${theme}.jpg`)).toString('base64')}`;
  await page.evaluate(`document.querySelector('.phone-frame').style.setProperty('height', '844px', 'important')`);
  // The prototype's Save and Share icons take the theme's ink, white on their white buttons in dark: keep them dark.
  await page.addStyleTag({ content: '.pv-fab-btn{color:#141413!important}' });
  await page.evaluate(`(() => {
    setThemePref('${theme}');
    ccState = seedZaynCcState();
    Object.assign(ccState.values, ${JSON.stringify(NATALIE)});
    for (const k of Object.keys(ccState.tags)) ccState.tags[k] = [];
    for (const k of Object.keys(ccState.repeatables)) ccState.repeatables[k] = [];
    ccState.serviceDetails = {};
    ccState.preview.panelPct = 50;
    ccState.preview.panelStage = null;
    openCardPreview();
    pvOpenFullscreen();
    for (const el of document.querySelectorAll('#pvFullscreenOverlay .pv-photo-backdrop, #pvFullscreenOverlay .pv-photo-layer')) el.style.backgroundImage = "url('${photo}')";
  })()`);
  await page.waitForTimeout(600);
  const png = join(outDir, `v12-profile-natalie-${theme}.png`);
  await page.locator('.phone-frame').screenshot({ path: png, type: 'png' });
  const webp = png.replace(/\.png$/, '.webp');
  await sharp(png).webp({ quality: 88 }).toFile(webp);
  unlinkSync(png);
  const meta = await sharp(webp).metadata();
  console.log(`  ok screens/v12-profile-natalie-${theme}.webp  ${meta.width}x${meta.height}  Natalie Vale's profile, ${theme}`);
}

async function main() {
  if (!existsSync(src)) throw new Error(`prototype not found at ${src}`);
  const only = process.argv.slice(2).filter((a) => !a.startsWith('--'));
  const names = (only.length ? only : Object.keys(V12_SCREENS)).filter((n) => n !== 'profile');
  const profile = !only.length || only.includes('profile');
  mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 600, height: 2400 }, deviceScaleFactor: 2, colorScheme: 'dark' });
  await page.goto(pathToFileURL(src).href);
  await page.addStyleTag({ content: '.dev-toolbar,.dev-toolbar-btn{display:none!important} .phone-frame{border:0!important;border-radius:0!important;box-shadow:none!important;width:390px!important;height:844px!important} .screen{scrollbar-width:none} *{animation-duration:0s!important;transition-duration:0s!important}' });
  await page.waitForTimeout(500);
  for (const name of names) {
    const s = V12_SCREENS[name];
    if (!s) {
      console.warn(`  skip ${name}: unknown`);
      continue;
    }
    await page.evaluate(`document.querySelector('.phone-frame').style.setProperty('height', '844px', 'important')`);
    await page.evaluate(s.open);
    await page.waitForTimeout(400);
    if (s.tall) {
      // Grow the frame by however much the screen scrolls, so the whole screen is in one image.
      const extra = await page.evaluate(`(() => { const el = document.querySelector('${s.tall}'); el.scrollTop = 0; return Math.max(0, el.scrollHeight - el.clientHeight); })()`);
      await page.evaluate(`document.querySelector('.phone-frame').style.setProperty('height', '${844 + Number(extra)}px', 'important')`);
      await page.waitForTimeout(300);
    }
    const file = join(outDir, `v12-${name}.png`);
    await page.locator('.phone-frame').screenshot({ path: file, type: 'png' });
    const meta = await sharp(file).metadata();
    console.log(`  ok screens/v12-${name}.png  ${meta.width}x${meta.height}  ${s.caption}`);
  }
  if (profile) for (const theme of ['light', 'dark'] as const) await captureProfile(page, theme);
  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
