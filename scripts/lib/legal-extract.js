/* global document, Node */
/*
 * Runs inside a legal page on the old site (scripts/import-legal.ts evaluates this file as a
 * string). Walks the body in document order, skipping header, navigation and footer, and writes
 * the Markdown subset of src/lib/markdown.ts: h1 to h4, paragraphs, lists and tables.
 */
(() => {
  const clean = (s) => (s ?? '').replace(/\s+/g, ' ').trim();
  const skip = (el) => !!el.closest('header, nav, footer, [class*="nav"], [class*="footer"], [class*="header"], [class*="cookie"], [class*="consent"]');
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
        } else if (tag === 'a') {
          const href = el.getAttribute('href') ?? '';
          const t = clean(inline(el));
          out += href && /^(https?:|mailto:|\/)/.test(href) ? '[' + t + '](' + href + ')' : t;
        } else if (tag === 'br') out += ' ';
        else if (tag === 'svg' || tag === 'button' || tag === 'script' || tag === 'style') {
          /* skip */
        } else out += inline(el);
      }
    });
    return out;
  };
  const lines = [];
  const push = (...ls) => lines.push(...ls, '');
  const seen = new Set();
  const block = (el) => {
    if (seen.has(el) || skip(el)) return;
    const tag = el.tagName.toLowerCase();
    if (tag === 'script' || tag === 'style' || tag === 'noscript' || tag === 'svg') return;
    if (/^h[1-4]$/.test(tag)) {
      seen.add(el);
      const level = Number(tag[1]);
      return push('#'.repeat(level) + ' ' + clean(inline(el)));
    }
    if (tag === 'p') {
      seen.add(el);
      const t = clean(inline(el));
      return t ? push(t) : undefined;
    }
    if (tag === 'ul' || tag === 'ol') {
      seen.add(el);
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
      seen.add(el);
      const rows = Array.from(el.querySelectorAll('tr')).map((tr) => Array.from(tr.querySelectorAll('th,td')).map((c) => clean(inline(c)).replace(/\|/g, '/')));
      if (!rows.length) return;
      const [head, ...body] = rows;
      lines.push('| ' + head.join(' | ') + ' |', '| ' + head.map(() => '---').join(' | ') + ' |', ...body.map((r) => '| ' + r.join(' | ') + ' |'), '');
      return;
    }
    if (el.children.length) {
      Array.from(el.children).forEach(block);
      return;
    }
    // A leaf div or span with its own text, such as a date line.
    if (tag === 'div' || tag === 'span' || tag === 'li' || tag === 'td') {
      const t = clean(el.textContent);
      if (t && t.length > 2) push(t);
    }
  };
  Array.from(document.body.children).forEach(block);
  return lines.join('\n').replace(/\n{3,}/g, '\n\n').trim() + '\n';
})();
