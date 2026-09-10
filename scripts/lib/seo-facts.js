/* global document */
/*
 * Runs inside a page under audit (scripts/seo.ts evaluates this file as a string, because the
 * TypeScript runner injects helpers that do not exist in the page). Collects the facts the audit
 * checks: title, description, canonical, robots, Open Graph, Twitter card, H1 count, JSON-LD
 * scripts, links, images and the visible text.
 */
(() => {
  const meta = (sel) => {
    const el = document.querySelector(sel);
    return el ? el.content : '';
  };
  const og = {};
  document.querySelectorAll('meta[property^="og:"]').forEach((m) => {
    og[m.getAttribute('property')] = m.content;
  });
  const canonical = document.querySelector('link[rel="canonical"]');
  return {
    title: document.title,
    description: meta('meta[name="description"]'),
    canonical: canonical ? canonical.href : '',
    robots: meta('meta[name="robots"]'),
    og,
    twitter: meta('meta[name="twitter:card"]'),
    h1: document.querySelectorAll('h1').length,
    jsonld: Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map((s) => s.textContent || ''),
    links: Array.from(document.querySelectorAll('a[href]')).map((a) => a.href),
    images: Array.from(document.querySelectorAll('img')).map((i) => i.currentSrc || i.src),
    text: document.body.innerText,
  };
})();
