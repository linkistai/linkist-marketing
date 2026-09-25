import Image from 'next/image';
import type { ReactNode } from 'react';
import { Breadcrumbs, type Crumb } from '@/components/Breadcrumbs';
import { Parallax } from '@/motion/Parallax';

/**
 * The v2 page hero: breadcrumbs, an eyebrow with a pulsing dot, the page's one H1, a lede, CTAs, an
 * optional note and an optional visual on the right. Two columns with a visual, one without. A red
 * wash and a giant slow-turning brand mark sit behind, decorative.
 */
export function PageHero({ crumbs, eyebrow, title, lede, ctas, note, side, wide }: { crumbs?: readonly Crumb[]; eyebrow: string; title: ReactNode; lede?: ReactNode; ctas?: ReactNode; note?: ReactNode; side?: ReactNode; wide?: boolean }) {
  return (
    <section className="page-hero" aria-labelledby="page-title">
      <Parallax k={0.1} className="page-hero__mark">
        <Image src="/brand/mark.png" alt="" width={256} height={256} aria-hidden="true" className="v2-spin h-auto w-full" priority />
      </Parallax>
      <div className="container">
        {crumbs ? (
          <div className="mb-7">
            <Breadcrumbs items={crumbs} />
          </div>
        ) : null}
        <div className={`grid items-center gap-[clamp(32px,5vw,72px)] ${side ? '[grid-template-columns:repeat(auto-fit,minmax(min(100%,460px),1fr))]' : ''}`}>
          <div className={side ? 'min-w-0 max-w-[640px]' : wide ? 'max-w-[1000px]' : 'max-w-[900px]'}>
            <p className="eyebrow eyebrow--pulse" data-hero-text>
              {eyebrow}
            </p>
            <h1 id="page-title" className="display-1 mt-5" data-hero-text>
              {title}
            </h1>
            {lede ? (
              <p className="lede mt-6" data-hero-text>
                {lede}
              </p>
            ) : null}
            {ctas ? (
              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3" data-hero-text>
                {ctas}
              </div>
            ) : null}
            {note}
          </div>
          {side ? <div className="relative flex min-h-[clamp(360px,50vh,560px)] min-w-0 items-center justify-center">{side}</div> : null}
        </div>
      </div>
    </section>
  );
}
