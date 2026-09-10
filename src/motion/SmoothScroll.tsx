'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Inertial smooth scrolling with Lenis (Grownz D30). Native scrolling stays underneath, so
 * sticky elements, anchors and ScrollTrigger keep working; Lenis only eases the wheel and
 * keyboard input. Off when motion is off (footer switch, `?motion=off`) or on coarse pointers.
 * Watches html[data-motion], so the footer switch stops or starts it at once (Grownz D31).
 */
export function SmoothScroll() {
  const pathname = usePathname();
  useEffect(() => {
    const html = document.documentElement;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    let lenis: { destroy: () => void; raf: (t: number) => void } | undefined;
    let frame = 0;
    let wanted = false;
    let disposed = false;

    const stop = () => {
      cancelAnimationFrame(frame);
      lenis?.destroy();
      lenis = undefined;
    };
    const start = () => {
      void import('lenis').then(({ default: Lenis }) => {
        if (disposed || !wanted || lenis) return;
        lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.95, anchors: { offset: -96 }, autoRaf: false });
        const loop = (t: number) => {
          lenis?.raf(t);
          frame = requestAnimationFrame(loop);
        };
        frame = requestAnimationFrame(loop);
      });
    };
    const sync = () => {
      const on = html.dataset['motion'] === 'on';
      if (on === wanted) return;
      wanted = on;
      if (on) start();
      else stop();
    };

    sync();
    const observer = new MutationObserver(sync);
    observer.observe(html, { attributes: true, attributeFilter: ['data-motion'] });
    return () => {
      disposed = true;
      observer.disconnect();
      stop();
    };
  }, [pathname]);
  return null;
}
