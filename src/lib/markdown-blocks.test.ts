import { describe, expect, it } from 'vitest';
import { renderMarkdown } from './markdown';

describe('markdown blocks for imported articles', () => {
  it('renders a flow block as an ordered list of steps', () => {
    const { html } = renderMarkdown('::flow\nTap\nContext captured\nAI organises it\n::\n');
    expect(html).toContain('<ol class="flow-steps" aria-label="Steps"><li>Tap</li><li>Context captured</li><li>AI organises it</li></ol>');
  });

  it('renders a cards block with a title and text per line', () => {
    const { html } = renderMarkdown('::cards\nNFC Tap | Best at in-person events.\nQR Code | Best for slide decks | and signatures.\n::\n');
    expect(html).toContain('<ul class="cards"><li><strong>NFC Tap</strong><p>Best at in-person events.</p></li>');
    expect(html).toContain('<li><strong>QR Code</strong><p>Best for slide decks | and signatures.</p></li>');
  });

  it('renders an image with a caption as a figure and refuses unsafe sources', () => {
    const { html } = renderMarkdown('![A card being tapped](/blog/x/figure-1.jpg "The profile opens.")\n\n![bad](javascript:alert(1))\n');
    expect(html).toContain('<figure><img src="/blog/x/figure-1.jpg" alt="A card being tapped" loading="lazy" decoding="async" /><figcaption>The profile opens.</figcaption></figure>');
    expect(html).not.toContain('javascript:');
  });

  it('keeps counting words inside blocks and closes them before a heading', () => {
    const { chapters, words } = renderMarkdown('## One\n\n::flow\nA\nB\n::\n\n## Two\n\nText here.\n');
    expect(chapters.map((c) => c.text)).toEqual(['One', 'Two']);
    expect(words).toBeGreaterThanOrEqual(4);
  });
});
