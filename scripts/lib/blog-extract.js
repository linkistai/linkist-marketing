/* global document, setTimeout, Node */
/*
 * Runs inside the old site's article page (scripts/import-blog.ts evaluates this file as a string,
 * because the TypeScript runner injects helpers that do not exist in the page). Walks
 * .blog-article-content and returns { md, figures, faqs } in the Markdown subset of src/lib/markdown.ts.
 */
(async () => {
  const article = document.querySelector('.blog-article-content');
  if (!article) return null;
  const clean = (s) => (s ?? '').replace(/\s+/g, ' ').trim();
  const figures = [];
  const faqs = [];

  // The FAQ answers only exist in the DOM while their question is open.
  for (const item of Array.from(article.querySelectorAll('.blog-faq-item'))) {
    const btn = item.querySelector('.blog-faq-q');
    if (!btn) continue;
    btn.click();
    await new Promise((r) => setTimeout(r, 80));
    const q = clean(btn.querySelector('span') ? btn.querySelector('span').textContent : btn.textContent);
    const a = clean(item.querySelector('.blog-faq-a') ? item.querySelector('.blog-faq-a').textContent : '');
    item.dataset.faq = String(faqs.length);
    faqs.push({ q, a });
  }

  const inline = (node) => {
    let out = '';
    node.childNodes.forEach((n) => {
      if (n.nodeType === Node.TEXT_NODE) out += n.textContent ?? '';
      else if (n.nodeType === Node.ELEMENT_NODE) {
        const el = n;
        const tag = el.tagName.toLowerCase();
        if (tag === 'strong' || tag === 'b') {
          const t = clean(inline(el));
          if (t) out += '**' + t + '**';
        } else if (tag === 'em' || tag === 'i') {
          const t = clean(inline(el));
          if (t) out += '*' + t + '*';
        } else if (tag === 'code') out += '`' + clean(el.textContent) + '`';
        else if (tag === 'a') out += '[' + clean(inline(el)) + '](' + (el.getAttribute('href') ?? '#') + ')';
        else if (tag === 'br') out += '\n';
        else if (tag === 'svg' || tag === 'button') {
          /* decorative */
        } else if (tag === 'p' || tag === 'div' || tag === 'li') out += '\n' + inline(el) + '\n';
        else out += inline(el);
      }
    });
    return out;
  };

  const lines = [];
  const push = (...ls) => lines.push(...ls, '');
  const paragraphs = (el) => inline(el).split('\n').map(clean).filter(Boolean);

  const block = (el) => {
    const tag = el.tagName.toLowerCase();
    const cl = el.classList;
    if (cl.contains('blog-cta-block')) return;
    if (tag === 'h2') return push('## ' + clean(inline(el)));
    if (tag === 'h3' || tag === 'h4') return push('### ' + clean(inline(el)));
    if (tag === 'p') {
      const t = clean(inline(el));
      return t ? push(t) : undefined;
    }
    if (tag === 'ul' || tag === 'ol') {
      let i = 0;
      const items = [];
      Array.from(el.children).forEach((li) => {
        if (li.tagName !== 'LI') return;
        i += 1;
        const t = clean(inline(li));
        if (t) items.push((tag === 'ol' ? i + '.' : '-') + ' ' + t);
      });
      return push(...items);
    }
    if (tag === 'table') {
      const rows = Array.from(el.querySelectorAll('tr')).map((tr) => Array.from(tr.querySelectorAll('th,td')).map((c) => clean(inline(c)).replace(/\|/g, '/')));
      if (!rows.length) return;
      const [head, ...body] = rows;
      lines.push('| ' + head.join(' | ') + ' |', '| ' + head.map(() => '---').join(' | ') + ' |', ...body.map((r) => '| ' + r.join(' | ') + ' |'), '');
      return;
    }
    if (tag === 'figure' || (tag === 'img' && !el.closest('figure'))) {
      const img = tag === 'img' ? el : el.querySelector('img');
      if (!img) return;
      const cap = el.querySelector('figcaption');
      const caption = clean(cap ? cap.textContent : '').replace(/"/g, "'");
      figures.push({ src: img.getAttribute('src') ?? img.src, alt: clean(img.alt), caption });
      return push('![' + clean(img.alt) + '](__FIG_' + (figures.length - 1) + '__' + (caption ? ' "' + caption + '"' : '') + ')');
    }
    if (cl.contains('blog-highlight-box')) return push('::note', ...paragraphs(el), '::');
    if (cl.contains('blog-flow-steps')) return push('::flow', ...Array.from(el.querySelectorAll('.blog-flow-step')).map((s) => clean(s.textContent)), '::');
    if (cl.contains('blog-benefits-grid')) return push(...Array.from(el.querySelectorAll('.blog-benefit-item')).map((it) => '- ' + clean(inline(it))));
    if (cl.contains('blog-method-grid')) {
      const cards = Array.from(el.querySelectorAll('.blog-method-card')).map((c) => {
        const title = c.querySelector('.blog-method-title');
        const desc = c.querySelector('.blog-method-desc');
        return clean(title ? title.textContent : '') + ' | ' + clean(inline(desc ?? c));
      });
      return push('::cards', ...cards, '::');
    }
    if (cl.contains('blog-audience-grid')) {
      const cards = Array.from(el.querySelectorAll('.blog-audience-item')).map((c) => {
        const title = c.querySelector('strong');
        const desc = c.querySelector('p');
        return clean(title ? title.textContent : '') + ' | ' + clean(inline(desc ?? c));
      });
      return push('::cards', ...cards, '::');
    }
    if (cl.contains('blog-faq')) {
      Array.from(el.querySelectorAll('.blog-faq-item')).forEach((it) => {
        const f = faqs[Number(it.dataset.faq)];
        if (f) push('### ' + f.q, f.a);
      });
      return;
    }
    if (tag === 'blockquote') return push('::note', ...paragraphs(el), '::');
    if (el.children.length && (tag === 'section' || tag === 'div' || tag === 'article' || tag === 'header' || tag === 'aside')) {
      Array.from(el.children).forEach(block);
      return;
    }
    const t = clean(inline(el));
    if (t) push(t);
  };
  Array.from(article.children).forEach(block);
  return { md: lines.join('\n').replace(/\n{3,}/g, '\n\n').trim() + '\n', figures, faqs };
})();
