/**
 * Scroll reveals: once, at 20 percent viewport entry (brief 6), 400 ms, 16 to 24 px rise, ease-out.
 * GSAP and ScrollTrigger load lazily so a page pays for them only when motion is on.
 *
 * Markup: data-reveal="rise|fade|lift" on the element; data-reveal-stagger="0.08" animates
 * its children in sequence instead. Elements already in view at init are left as they are, so
 * nothing above the fold (the LCP headline included) ever waits for JavaScript.
 */
export async function initReveals(): Promise<() => void> {
  const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
  gsap.registerPlugin(ScrollTrigger);
  const fold = window.innerHeight * 0.85;
  const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]')).filter((el) => el.getBoundingClientRect().top > fold);
  const triggers = els.map((el) => {
    const kind = el.dataset['reveal'] || 'rise';
    const stagger = Number(el.dataset['revealStagger'] ?? 0);
    const targets = stagger && el.children.length ? Array.from(el.children) : [el];
    const y = kind === 'fade' ? 0 : kind === 'rise' ? 24 : 16;
    el.dataset['revealed'] = 'true';
    gsap.set(targets, { opacity: 0, y });
    return ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      once: true,
      onEnter: () => gsap.to(targets, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out', stagger: stagger || 0, clearProps: 'transform' }),
    });
  });
  ScrollTrigger.refresh();
  return () => triggers.forEach((t) => t.kill());
}
