'use client';

import { Target } from 'lucide-react';
import Link from 'next/link';
import { useState, type ReactNode } from 'react';
import { StartFree, TextLink } from '@/components/Button';
import { FloatingCard } from '@/components/FloatingCard';
import { MetricChip } from '@/components/MetricChip';
import { Person } from '@/components/Person';
import { ScreenFrame } from '@/components/ScreenFrame';
import { HeroIntro } from '@/motion/HeroIntro';
import { HERO, INTENTS } from '@/content/home';
import { PROTO_ALT } from '@/content/design';
import { G } from '@/lib/glossary';

/**
 * Interactive hero (brief 4): the prototype's three-line headline, lede and two buttons, then
 * four intent chips that swap the hero screen and rewrite the lede. The CTA never changes.
 * `screens` maps a screen name to a public path (a prototype design preview until real captures
 * exist); `person` is the hero cut-out once the image plan produces it.
 */
export function HeroInteractive({ screens, person, heading }: { screens: Record<string, string | undefined>; person?: string; heading: ReactNode }) {
  const [active, setActive] = useState(0);
  const intent = INTENTS[active] ?? INTENTS[0]!;
  return (
    <section className="section pt-10 sm:pt-16">
      <div className="container">
        <HeroIntro className="grid items-center gap-12 lg:grid-cols-[7fr_5fr] lg:gap-10">
          <div className="max-w-2xl">
            {heading}
            <p className="lede mt-6 min-h-[4.5em]" data-hero-text aria-live="polite">
              {intent.lede}
            </p>
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center" data-hero-text>
              <StartFree />
              <Link href="/how-it-works" className="btn btn--secondary btn--lg">
                {G.ctaSecondary}
              </Link>
            </div>
            <p className="mt-5 text-sm text-muted" data-hero-text>
              {HERO.subline}
            </p>
            <div className="mt-8" data-hero-text>
              <p className="text-xs font-semibold uppercase tracking-[0.04em] text-muted">Where are you right now?</p>
              <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Pick your situation">
                {INTENTS.map((it, i) => (
                  <button key={it.key} type="button" className="intent w-full justify-center sm:w-auto sm:justify-start" aria-pressed={i === active} onClick={() => setActive(i)}>
                    {it.chip}
                  </button>
                ))}
              </div>
              <p className="mt-3 text-sm">
                <TextLink href={intent.href}>Read this use case</TextLink>
              </p>
            </div>
          </div>

          <div className="hero-stage relative min-h-[460px] p-2 sm:min-h-[600px] sm:p-4">
            {person ? (
              <div className="absolute bottom-0 left-0 hidden h-[92%] w-[270px] lg:block" data-hero-card="3">
                <Person src={person} alt="A person holding a phone with the Linkist home screen towards the camera" hero bust priority sizes="300px" />
              </div>
            ) : null}
            <div className={`relative mx-auto mt-2 max-w-[560px] ${person ? 'lg:pl-40' : ''}`}>
              <div className="flex justify-center" data-hero-card="1">
                <div key={intent.key} className="w-full max-w-[300px]">
                  <ScreenFrame kind="phone" src={screens[intent.screen]} alt={PROTO_ALT[intent.screen]} priority={active === 0} preview full />
                </div>
              </div>
              <FloatingCard className="absolute -left-2 top-8 hidden p-1 sm:block lg:-left-6" variant={1} heroIndex={2} ariaLabel="Contact captured, context saved">
                <MetricChip live text="Contact captured, context saved" />
              </FloatingCard>
              <FloatingCard className="absolute -right-2 bottom-16 hidden p-1 sm:block lg:-right-8" variant={2} delay={1.1} deep heroIndex={4} ariaLabel="Next action: follow up with Sara M., example">
                <MetricChip initials="SM" text="Next action: follow up with Sara M." example />
              </FloatingCard>
              <FloatingCard className="absolute right-0 top-[38%] hidden p-1 md:block lg:-right-4" variant={1} delay={0.5} ariaLabel="20 strong ICP matches found, example">
                <MetricChip icon={Target} label="ICP matches" value="20 found" example />
              </FloatingCard>
            </div>
          </div>
        </HeroIntro>

        <ul className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-body sm:mt-16" aria-label="Proof points" data-reveal="fade">
          {HERO.proof.map((p) => (
            <li key={p} className="flex items-center gap-2">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--brand-crimson)' }} />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
