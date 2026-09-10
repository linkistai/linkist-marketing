import { describe, expect, it } from 'vitest';
import { search } from './knowledge';

describe('assistant retrieval', () => {
  it('puts the question about cards first for a question about cards', () => {
    const hits = search('Do I need an NFC card?');
    expect(hits.length).toBeGreaterThan(0);
    expect(hits[0]!.entry.q.toLowerCase()).toContain('card');
    expect(hits[0]!.entry.a.toLowerCase()).toContain('no');
  });

  it('finds the plan that has ICP matching', () => {
    const hits = search('Which plan has ICP Matching?');
    expect(hits[0]!.entry.id).toBe('which-plan-has-icp-matching');
  });

  it('finds the AI switch', () => {
    const hits = search('How do I switch the AI off?');
    expect(hits[0]!.entry.a).toContain('Privacy Settings');
  });

  it('refuses an off-topic question', () => {
    expect(search('What is the weather in Dubai tomorrow?')).toEqual([]);
    expect(search('')).toEqual([]);
  });
});
