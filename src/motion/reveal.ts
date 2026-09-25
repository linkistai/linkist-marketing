/**
 * Scroll reveals (v2): once, as the element crosses 40 px into the viewport, 900 ms, a 30 px rise
 * that also clears a 6 px blur, cubic-bezier(.16,1,.3,1); staggered children 80 ms apart, at most 5.
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
    const y = kind === 'fade' ? 0 : 30;
    el.dataset['revealed'] = 'true';
    gsap.set(targets, { opacity: 0, y, filter: kind === 'fade' ? 'none' : 'blur(6px)' });
    return ScrollTrigger.create({
      trigger: el,
      start: 'top bottom-=40',
      once: true,
      onEnter: () =>
        gsap.to(targets, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.9,
          ease: 'expo.out',
          stagger: stagger ? { each: Math.min(stagger, 0.08), amount: undefined } : 0,
          clearProps: 'transform,filter',
        }),
    });
  });
  ScrollTrigger.refresh();
  return () => triggers.forEach((t) => t.kill());
}
