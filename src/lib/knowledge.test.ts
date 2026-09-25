import { describe, expect, it } from 'vitest';
import { search, smallTalk } from '@/lib/knowledge';

/** Questions a visitor asks, and a phrase the right answer must contain. */
const CASES: readonly (readonly [string, string])[] = [
  ['What is Linkist?', 'Personal Relationship Manager'],
  ['what is linkist', 'Personal Relationship Manager'],
  ['What is a PRM?', 'organises relationships'],
  ['How does it work?', 'three stages'],
  ['How much is the Pro plan?', 'Pro is'],
  ['pro price', 'Pro is'],
  ['How much does Linkist cost?', 'Essential is free'],
  ['Is it free?', 'free'],
  ['What does the metal NFC card cost?', 'Metal card is'],
  ['wood card price', 'Wood card is'],
  ['how much are nfc cards', 'One-time prices'],
  ['What are the bundles?', 'Signature Bundle'],
  ['team pricing', 'per user'],
  ['Is my data safe?', 'encryption'],
  ['Do you sell my data?', 'never sells'],
  ['Does the other person need an app to receive my card?', 'browser'],
  ['Can I use my own NFC sticker?', 'nfctools.linkist.ai'],
  ['Do I need an NFC card?', 'No'],
  ['What is ICP matching?', 'ICP'],
  ['Which plan has ICP Matching?', 'Pro'],
  ['How do I sign in?', 'UnifiedAuth'],
  ['Do I need a password?', 'one-time code'],
  ['Is shipping included?', 'UAE'],
  ['Can I get a refund?', 'refund'],
  ['How do I delete my account?', 'Settings'],
  ['Can I switch off the AI?', 'Privacy Settings'],
  ['What happens to contacts when someone leaves my team?', 'team'],
  ['Is there an iPhone app?', 'web app'],
  ['How do I contact support?', 'support@linkist.ai'],
  ['Is there a lifetime plan?', 'Not at the moment'],
  ['How much is an extra team user?', '$50'],
  ['Is Linkist SOC 2 certified?', 'planned for the upcoming Enterprise'],
];

describe('site assistant', () => {
  for (const [q, want] of CASES) {
    it(`answers "${q}"`, () => {
      const hit = search(q, 1)[0];
      expect(hit, `no answer for "${q}"`).toBeDefined();
      expect(hit!.entry.a.toLowerCase()).toContain(want.toLowerCase());
    });
  }
  it('says it does not know off-topic questions', () => {
    expect(search('what is the weather in paris tomorrow', 1)).toHaveLength(0);
    expect(search('best pizza recipe', 1)).toHaveLength(0);
  });
  it('puts the question about cards first for a question about cards', () => {
    const hits = search('Do I need an NFC card?');
    expect(hits[0]!.entry.q.toLowerCase()).toContain('card');
  });
  it('finds the plan that has ICP matching', () => {
    expect(search('Which plan has ICP Matching?')[0]!.entry.id).toBe('which-plan-has-icp-matching');
  });
  it('finds the AI switch', () => {
    expect(search('How do I switch the AI off?')[0]!.entry.a).toContain('Privacy Settings');
  });
  it('refuses empty and off-topic questions', () => {
    expect(search('What is the weather in Dubai tomorrow?')).toEqual([]);
    expect(search('')).toEqual([]);
  });
  it('greets', () => {
    expect(smallTalk('Hi')).toMatch(/Hello/);
    expect(smallTalk('thanks!')).toMatch(/welcome/);
    expect(smallTalk('what is ICP')).toBeNull();
  });
});
