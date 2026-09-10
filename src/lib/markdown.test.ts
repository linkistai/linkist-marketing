import { describe, expect, it } from 'vitest';
import { readingMinutes, renderMarkdown, slugify } from './markdown';

describe('markdown', () => {
  it('renders headings with anchors and collects chapters', () => {
    const { html, chapters } = renderMarkdown('## First\n\nText.\n\n### Second\n\nMore.');
    expect(chapters).toEqual([
      { id: 'first', text: 'First', level: 2 },
      { id: 'second', text: 'Second', level: 3 },
    ]);
    expect(html).toContain('<h2 id="first"><a href="#first" class="anchor">First</a></h2>');
  });
  it('renders lists, notes, tables and inline marks', () => {
    const { html } = renderMarkdown('- one\n- **two**\n\n1. a\n2. b\n\n::note\nCareful.\n::\n\n| H1 | H2 |\n| --- | --- |\n| a | b |');
    expect(html).toContain('<ul><li>one</li><li><strong>two</strong></li></ul>');
    expect(html).toContain('<ol><li>a</li><li>b</li></ol>');
    expect(html).toContain('<aside class="note"><p>Careful.</p></aside>');
    expect(html).toContain('<table><thead><tr><th>H1</th><th>H2</th></tr></thead><tbody><tr><td>a</td><td>b</td></tr></tbody></table>');
  });
  it('escapes html and refuses unsafe links', () => {
    const { html } = renderMarkdown('<script>x</script> [bad](javascript:alert(1)) [ok](/pricing)');
    expect(html).not.toContain('<script>');
    expect(html).toContain('href="#"');
    expect(html).toContain('href="/pricing"');
  });
  it('slugs and reading time', () => {
    expect(slugify('NFC cards vs paper: the real cost')).toBe('nfc-cards-vs-paper-the-real-cost');
    expect(readingMinutes(450)).toBe(2);
  });
});
