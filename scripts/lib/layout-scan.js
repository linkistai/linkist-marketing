/* global document, getComputedStyle */
/*
 * Runs inside a page (scripts/layout-checks.ts evaluates this file as a string). Measures the
 * controls smaller than 44 x 44 px (inline links in running text exempt), the assistant
 * launcher, the footer's last row, the hero carousel controls and the footer newsletter input.
 */
(() => {
  const rect = (el) => {
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { x: Math.round(r.left), y: Math.round(r.top), w: Math.round(r.width), h: Math.round(r.height) };
  };
  const visible = (el) => {
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    // Content of a closed details keeps a layout box in Chromium but is not shown or reachable.
    const closed = el.closest('details:not([open])');
    if (closed && !el.closest('summary')) return false;
    return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none' && !el.closest('[inert], [aria-hidden="true"]');
  };
  const INLINE_PARENTS = new Set(['P', 'LI', 'TD', 'TH', 'DD', 'DT', 'FIGCAPTION', 'SPAN', 'EM', 'STRONG', 'SMALL', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6']);
  const targets = Array.from(document.querySelectorAll('a[href], button, input:not([type="hidden"]), select, textarea, summary, [role="button"], [role="tab"]')).filter((el) => visible(el) && !el.closest('.sr-only') && !el.classList.contains('sr-only'));
  const rects = targets.map((el) => el.getBoundingClientRect());
  // WCAG 2.2 target-size exemptions: links in running text, and undersized targets spaced so that a
  // 24 px circle centred on each does not touch another target. Text links in lists and columns pass on spacing.
  const spaced = (i) => {
    const a = rects[i];
    const cx = a.left + a.width / 2;
    const cy = a.top + a.height / 2;
    for (let j = 0; j < rects.length; j += 1) {
      if (j === i) continue;
      const b = rects[j];
      const nx = Math.max(b.left, Math.min(cx, b.right));
      const ny = Math.max(b.top, Math.min(cy, b.bottom));
      if (Math.hypot(cx - nx, cy - ny) < 12) return false;
    }
    return true;
  };
  const small = [];
  targets.forEach((el, i) => {
    const cs = getComputedStyle(el);
    const inline = cs.display.startsWith('inline') && !cs.display.includes('flex') && !cs.display.includes('grid') && !cs.display.includes('block');
    if (inline && el.tagName === 'A' && el.parentElement && INLINE_PARENTS.has(el.parentElement.tagName)) return;
    if (el.tagName === 'A' && el.parentElement && el.parentElement.tagName === 'H2') return;
    const r = rects[i];
    if (r.width < 44 || r.height < 44) {
      if (el.tagName === 'A' && !el.classList.contains('btn') && spaced(i)) return;
      const name = (el.getAttribute('aria-label') || el.textContent || el.getAttribute('placeholder') || '').replace(/\s+/g, ' ').trim().slice(0, 32);
      small.push({ tag: el.tagName.toLowerCase(), name, w: Math.round(r.width), h: Math.round(r.height) });
    }
  });
  const launcher = Array.from(document.querySelectorAll('button[aria-expanded]')).find((b) => /ask linkist|close/i.test(b.textContent || ''));
  const footer = document.querySelector('footer');
  const footerRow = footer ? footer.lastElementChild : null;
  const footerControls = footerRow ? Array.from(footerRow.querySelectorAll('a, button')).filter(visible).map((el) => ({ name: (el.textContent || '').trim().slice(0, 24), ...rect(el) })) : [];
  const heroControls = Array.from(document.querySelectorAll('.hcar__controls button')).filter(visible).map((el) => ({ name: (el.getAttribute('aria-label') || el.textContent || '').trim().slice(0, 24), ...rect(el) }));
  const newsletter = footer ? footer.querySelector('input[type="email"]') : null;
  return {
    small,
    launcher: rect(launcher),
    footerRow: rect(footerRow),
    footerControls,
    heroControls,
    newsletter: newsletter ? Math.round(newsletter.getBoundingClientRect().width) : null,
  };
})();
