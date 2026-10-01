import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import nextConfig from '../../next.config';
import { J } from './journeys';

/** Praveen's six journey links (CTA links.docx, 1 October 2026), word for word. */
const APPROVED = {
  individual: 'https://prm.linkist.ai/UnifiedAuth?intent=individual&utm_source=linkist_ai&utm_medium=website&utm_campaign=website_cta&utm_content=individual',
  teams: 'https://prm.linkist.ai/UnifiedAuth?intent=teams&next=%2Fteams%2Fstart&utm_source=linkist_ai&utm_medium=website&utm_campaign=website_cta&utm_content=teams',
  store: 'https://prm.linkist.ai/store/start?utm_source=linkist_ai&utm_medium=website&utm_campaign=website_cta&utm_content=store',
  byon: 'https://prm.linkist.ai/byon?utm_source=linkist_ai&utm_medium=website&utm_campaign=website_cta&utm_content=byon',
  billing: 'https://prm.linkist.ai/UnifiedAuth?intent=billing&next=%2Faccount%2Fbilling&utm_source=linkist_ai&utm_medium=website&utm_campaign=website_cta&utm_content=billing',
  ideas: 'https://prm.linkist.ai/ideas?utm_source=linkist_ai&utm_medium=website&utm_campaign=website_cta&utm_content=ideas',
} as const;
const beforeTag = (u: string) => u.split('utm_content=')[0]!;

/** Every source file a visitor can see the output of. */
function files(dir: string): string[] {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? files(p) : [p];
  });
}

describe('tracked journey links (D69)', () => {
  it('keeps the six approved links word for word', () => {
    for (const [k, u] of Object.entries(APPROVED)) expect(J[k as keyof typeof J]).toBe(u);
  });

  it('changes nothing but utm_content on every placement (and utm_medium on the redirects)', () => {
    const prefixes = Object.values(APPROVED).map(beforeTag);
    for (const [tag, url] of Object.entries(J)) {
      const u = tag.startsWith('redirect_') ? url.replace('&utm_medium=redirect&', '&utm_medium=website&') : url;
      expect(prefixes, tag).toContain(beforeTag(u));
      expect(u.endsWith(`utm_content=${tag}`), tag).toBe(true);
    }
  });

  it('sends the old shortcut addresses to their tagged journeys and leaves /sign-in plain', async () => {
    const redirects = await nextConfig.redirects!();
    const to = (source: string) => redirects.find((r) => r.source === source)?.destination;
    expect(to('/start')).toBe(J.redirect_start);
    expect(to('/app')).toBe(J.redirect_app);
    expect(to('/get-card')).toBe(J.redirect_get_card);
    expect(to('/sign-in')).toBe('https://prm.linkist.ai/UnifiedAuth');
  });

  it('never links to or names the retired addresses', () => {
    const tools = ['nfc', 'tools.linkist.ai'].join('');
    const quick = ['quick', '-profile'].join('');
    // llms.txt keeps its old pointer until its tracking values are agreed (brief, C15).
    const pending = join('src', 'app', 'llms.txt', 'route.ts');
    for (const f of [...files('src'), ...files('content')]) {
      const text = readFileSync(f, 'utf8');
      expect(text.includes(tools), f).toBe(false);
      if (!f.endsWith(pending)) expect(text.includes(quick), f).toBe(false);
    }
  });
});
