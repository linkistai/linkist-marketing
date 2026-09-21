import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { GetCard, StartFree } from '@/components/Button';
import { ScreenFrame } from '@/components/ScreenFrame';
import { StoreBadges } from '@/components/StoreBadges';
import { HeroIntro } from '@/motion/HeroIntro';
import { PROTO_ALT } from '@/content/design';
import { HERO } from '@/content/home';

/**
 * The home hero (D50, D51): one static block in the owner's words, the copy on the left and the
 * product on the right: a phone showing one of the owner's public-profile samples, with the
 * matching Signature card leaning against it. No white card and no boxed container any more
 * (owner, 21 September 2026). `profile` and `card` are the delivered files, or undefined until
 * they exist, when the stage shows the pending state rather than a mock.
 */
export function Hero({ profile, card }: { profile?: string; card?: string }) {
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
            <p className="mt-4 text-sm text-muted" data-hero-text>
              {HERO.subline}
            </p>
            <div className="hero-foot mt-8 flex flex-col gap-5 pt-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8" data-hero-text>
              <StoreBadges />
              <Link href="/bring-your-own" className="link">
                {HERO.byo}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="hero-stage relative" data-hero-card="1">
            <div className="hero-product" role="group" aria-label={HERO.imageAlt}>
              <div className="hero-product__phone">
                <ScreenFrame kind="phone" src={profile} alt={PROTO_ALT['profile-zayn']} preview full priority />
              </div>
              {card ? (
                <div className="hero-product__card" data-hero-card="2">
                  <Image src={card} alt="" width={1200} height={758} priority sizes="(min-width: 1024px) 300px, 60vw" />
                </div>
              ) : null}
            </div>
          </div>
        </HeroIntro>
      </div>
    </section>
  );
}
