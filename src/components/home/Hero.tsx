import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { GetCard, StartFree } from '@/components/Button';
import { StoreBadges } from '@/components/StoreBadges';
import { HeroIntro } from '@/motion/HeroIntro';
import { HERO } from '@/content/home';
import { NFC_TOOLS_URL } from '@/lib/site';

/**
 * The home hero (D50): one static block in the owner's words, the copy on the left and the
 * product scene on the right. No product switcher, no carousel. The scene is a composite: a
 * Nano Banana 2 render of a phone and two blank cards, with the real design preview placed on the
 * phone's screen and the brand mark file on the card (scripts/hero-composite.ts), so nothing on a
 * screen and no logo is generated. `scene` is the delivered file, or undefined until
 * `pnpm imagery hero-composite` has run, when the stage stays empty rather than showing a mock.
 */
export function Hero({ scene }: { scene?: string }) {
  return (
    <section className="hero-block">
      <div className="container">
        <HeroIntro className="grid items-center gap-12 lg:grid-cols-[11fr_9fr] lg:gap-16">
          <div className="hero-copy max-w-2xl">
            <p className="eyebrow" data-hero-text>
              {HERO.eyebrow}
            </p>
            <h1 className="display-1 mt-5" data-hero-text>
              {HERO.lines[0]}
              <br />
              {HERO.lines[1]}
              <br />
              <span className="em-coral">{HERO.lines[2]}</span>
            </h1>
            <p className="lede mt-6" data-hero-text>
              {HERO.lede}
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2" data-hero-text>
              <StartFree label={HERO.primary} className="w-full" />
              <GetCard size="lg" variant="secondary" label={HERO.secondary} className="w-full" />
            </div>
            <p className="mt-4 text-center text-sm text-muted" data-hero-text>
              {HERO.subline}
            </p>
            <div className="hero-foot mt-8 flex flex-col gap-5 pt-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8" data-hero-text>
              <StoreBadges />
              <a href={NFC_TOOLS_URL} className="link">
                {HERO.byo}
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="hero-stage relative" data-hero-card="1">
            {scene ? (
              <figure className="hero-scene">
                <Image src={scene} alt={HERO.imageAlt} width={1200} height={1200} priority sizes="(min-width: 1024px) 42vw, (min-width: 640px) 80vw, 100vw" />
                <figcaption className="preview-badge">Design preview</figcaption>
              </figure>
            ) : null}
          </div>
        </HeroIntro>
      </div>
    </section>
  );
}
