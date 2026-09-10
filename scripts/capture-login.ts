/**
 * One-time manual sign-in for the capture pipeline (brief, Appendix C). Opens the installed Chrome
 * with two tabs, the PRM app at m.linkist.ai and the store at prm.linkist.ai. You sign in on both
 * with the verification code; when the app leaves its login page the session is saved to
 * captures/auth/state.json (gitignored) and `pnpm capture` reuses it until it expires.
 * Nothing is typed by the script; no credential is stored in the repository.
 */
import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';
import { HOSTS } from '../captures/manifest';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const statePath = join(root, 'captures/auth/state.json');

async function main() {
  mkdirSync(dirname(statePath), { recursive: true });
  // Headed mode uses the installed Google Chrome; the Playwright bundle on this machine is headless-only.
  const browser = await chromium.launch({ headless: false, channel: 'chrome' });
  const ctx = await browser.newContext({ viewport: { width: 480, height: 900 } });
  const app = await ctx.newPage();
  await app.goto(`${HOSTS.app}/login`);
  const store = await ctx.newPage();
  await store.goto(`${HOSTS.store}/UnifiedAuth?next=%2Fstore%2Faccount`);
  await app.bringToFront();
  console.log('Sign in on both tabs with the demo account and the verification codes. Waiting up to 15 minutes for the app tab to leave its login page.');
  await app.waitForURL((u) => !/\/login/.test(u.pathname), { timeout: 900_000 });
  await app.waitForTimeout(1500);
  await ctx.storageState({ path: statePath });
  console.log(`Saved session to ${statePath}. Now run: pnpm capture`);
  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
