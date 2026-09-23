import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { GetCard, StartFree } from '@/components/Button';
import { StoreBadges } from '@/components/StoreBadges';
import { PreviewNote } from '@/components/PreviewNote';
import { HeroIntro } from '@/motion/HeroIntro';
import { HERO } from '@/content/home';
import { HeroProduct, type HeroSlide } from './HeroProduct';

/**
 * The home hero (D50, D51, D54): one static block in the owner's words, the copy on the left and the
 * product on the right, with no white card and no boxed container. The product is a carousel
 * (HeroProduct): the phone and the Signature card beside it cycle through Rhea's and Luca's public
 * profiles and the app dashboard with Zayn's card. The bring-your-own link sits straight under the
 * two buttons (owner, 23 September 2026); the store badges close the block.
 */
export function Hero({ slides }: { slides: readonly HeroSlide[] }) {
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
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center" data-hero-text>
              <StartFree label={HERO.primary} className="w-full sm:w-auto sm:min-w-[220px]" />
              <GetCard size="lg" variant="secondary" label={HERO.secondary} className="w-full sm:w-auto sm:min-w-[220px]" />
            </div>
            <p className="mt-5" data-hero-text>
              <Link href="/bring-your-own" className="link">
                {HERO.byo}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </p>
            <div className="hero-foot mt-8 pt-6" data-hero-text>
              <StoreBadges />
            </div>
          </div>

          <div className="hero-stage relative" data-hero-card="1">
            <HeroProduct slides={slides} label={HERO.imageAlt} />
          </div>
        </HeroIntro>
        <PreviewNote />
      </div>
    </section>
  );
}
