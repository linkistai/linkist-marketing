import type { Metadata } from 'next';
import Image from 'next/image';
import { TextLink } from '@/components/Button';
import { CapabilityCards } from '@/components/CapabilityCards';
import { ClosingBand } from '@/components/ClosingBand';
import { Faq } from '@/components/Faq';
import { PreviewNote } from '@/components/PreviewNote';
import { SectionHead } from '@/components/Section';
import { Bundles } from '@/components/home/Bundles';
import { CardTiers } from '@/components/home/CardTiers';
import { CommunityBand } from '@/components/home/CommunityBand';
import { HomeHero } from '@/components/home/HomeHero';
import { HomeJsonLd } from '@/components/home/JsonLd';
import { PlanCards } from '@/components/home/PlanCards';
import { StageSwitcher } from '@/components/home/StageSwitcher';
import { UseCaseCards } from '@/components/home/UseCaseCards';
import { PROTO_ALT, TALL_SCREENS } from '@/content/design';
import { FAQ, STAGES } from '@/content/home';
import { USE_CASES } from '@/content/usecases';
import { screen } from '@/lib/screens';
import { DEFAULT_DESCRIPTION, TAGLINE, pageMeta } from '@/lib/site';

export const metadata: Metadata = pageMeta(TAGLINE, DEFAULT_DESCRIPTION, '/', { image: '/og/home.png' });

/** The capabilities that scroll under the hero (v2 marquee), in glossary spelling. */
const MARQUEE = ['AI Enrichment', 'Card Scan', 'Contact Import', 'Voice Notes', 'Natural-Language Search', 'ICP Matching', 'Relationship Priority', 'Network Ask', 'Top Actions', 'Intelligent Nudges', 'Warm Introductions'];

/** The answer-first definitions (v2): real text, for readers and for answer engines. */
const DEFINITIONS = [
  { term: 'Linkist', def: FAQ[0]!.a },
  { term: 'Personal Relationship Manager (PRM)', def: FAQ[1]!.a },
  { term: 'NFC card', def: 'A tap-to-share card linked to your live profile. Every card includes PRM Essential.' },
];

export default function HomePage() {
  return (
    <>
      <HomeJsonLd />
      <HomeHero />

      <div aria-hidden="true" className="marquee">
        <div className="marquee__mask">
          <div className="v2-marquee marquee__track">
            {[...MARQUEE, ...MARQUEE].map((m, i) => (
              <span key={`${m}-${i}`} className="inline-flex items-center gap-10">
                {m}
                <Image src="/brand/mark.png" alt="" width={18} height={18} className="h-[18px] w-auto opacity-90" />
              </span>
            ))}
          </div>
        </div>
      </div>

      <section id="what" aria-labelledby="what-title" className="scroll-mt-[90px] pb-[clamp(40px,6vw,80px)] pt-[clamp(80px,11vw,140px)]">
        <div className="container">
          <div className="overflow-hidden rounded-[28px] border border-line bg-bg-alt" data-reveal="rise">
            <div className="relative h-[clamp(220px,30vw,380px)]">
              <Image src="/assets/gen/event.webp" alt="Professionals exchanging contacts on their phones at an evening event in Dubai" fill sizes="(min-width: 1240px) 1160px, 100vw" className="object-cover" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,11,0)_30%,#0a0a0b)]" aria-hidden="true" />
            </div>
            <div className="grid gap-[clamp(24px,4vw,56px)] p-[clamp(28px,4vw,56px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr))]">
              <h2 id="what-title" className="font-display text-[clamp(34px,4.4vw,56px)] font-semibold leading-none tracking-[-0.035em]">
                What is Linkist?
              </h2>
              <dl className="m-0 flex min-w-0 flex-col gap-[22px] md:col-span-2">
                {DEFINITIONS.map((d, i) => (
                  <div key={d.term} className={`grid gap-x-6 gap-y-2 [grid-template-columns:repeat(auto-fit,minmax(min(100%,180px),1fr))] ${i < DEFINITIONS.length - 1 ? 'border-b border-line pb-[22px]' : ''}`}>
                    <dt className="pt-1 font-mono text-xs uppercase tracking-[0.12em] text-coral">{d.term}</dt>
                    <dd className="m-0 text-[17px] leading-relaxed text-soft-2 [text-wrap:pretty] sm:col-span-2">{d.def}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section id="how" aria-labelledby="how-title" className="section bg-[linear-gradient(180deg,#050505,#0a0a0b_50%,#050505)]">
        <div className="container">
          <SectionHead id="how-title" num="01" eyebrow="How Linkist works" title={<>Turn the contacts you collect into <span className="em-coral">opportunities</span>.</>} lede="Capture the right people, see who matters, know what to do next." />
          <StageSwitcher
            stages={STAGES.map((s) => ({ n: s.n, label: s.label, title: s.title, bullets: s.bulletsShort, chips: s.chips, href: s.href, screen: screen(s.screen), alt: PROTO_ALT[s.screen], tall: TALL_SCREENS[s.screen] }))}
          />
          <PreviewNote className="!mt-12" />
        </div>
      </section>

      <section id="use-cases" aria-labelledby="uc-title" className="section">
        <div className="container">
          <SectionHead id="uc-title" num="02" eyebrow="Built for real connections" title={<>See Linkist <span className="em-coral">at work</span>.</>} lede="Collecting contacts is easy. Knowing what to do next is the hard part." />
          <UseCaseCards items={USE_CASES.map((u) => ({ slug: u.slug, short: u.short, title: u.title, problem: u.problem, steps: u.steps, result: u.result, chips: u.chips, img: u.scene, alt: u.sceneAlt }))} />
          <div className="mt-8 flex justify-center">
            <TextLink href="/use-cases">All 5 use cases</TextLink>
          </div>
        </div>
      </section>

      <section id="features" aria-labelledby="feat-title" className="section relative isolate overflow-hidden">
        <Image src="/assets/gen/abstract.webp" alt="" aria-hidden="true" fill sizes="100vw" className="-z-10 object-cover opacity-60" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#050505,rgba(5,5,5,.4)_30%,rgba(5,5,5,.4)_70%,#050505)]" />
        <div className="container">
          <SectionHead
            id="feat-title"
            num="03"
            eyebrow="What powers Linkist"
            center
            title={
              <>
                Simple to use. <span className="em-coral">Smarter underneath.</span> <span role="img" aria-label="AI-assisted" className="ai-diamond" />
              </>
            }
            lede="The capabilities behind the three-stage journey, shown with example figures."
          />
          <div className="mt-[clamp(40px,5vw,64px)]">
            <CapabilityCards />
          </div>
          <div className="mt-8 flex justify-center">
            <TextLink href="/features">See more features</TextLink>
          </div>
        </div>
      </section>

      <section id="pricing" aria-labelledby="price-title" className="section section--charcoal !border-b-0">
        <div className="container">
          <SectionHead id="price-title" num="04" eyebrow="Linkist PRM" title={<>Start free. <span className="em-coral">Add more</span> when you need it.</>} lede="No NFC card needed. Start free, then upgrade for richer contacts, AI matching and follow-up, or teams." />
          <div className="mt-[clamp(40px,5vw,64px)]">
            <PlanCards compact />
          </div>
        </div>
      </section>

      <section id="cards" aria-labelledby="cards-title" className="section relative overflow-hidden">
        <div className="container">
          <CardTiers intro={{ num: '05', eyebrow: 'Linkist NFC cards', id: 'cards-title', title: <>Tap. Share. Make the <span className="em-coral">first impression</span> count.</>, lede: 'A card that opens your live profile in one tap. Every card includes PRM Essential.' }} cta={{ href: '/nfc-cards', label: 'Explore NFC cards' }} />
        </div>
      </section>

      <section id="bundles" aria-labelledby="bundles-title" className="section section--charcoal">
        <div className="container">
          <SectionHead id="bundles-title" num="06" eyebrow="Bundled offers" title={<>Get the NFC card and PRM Pro <span className="em-coral">together</span>, and save.</>} lede="Your Linkist card and the Pro plan in one purchase, for less than buying both." />
          <div className="mt-[clamp(40px,5vw,64px)]">
            <Bundles />
          </div>
        </div>
      </section>

      <section id="faq" aria-labelledby="faq-title" className="section">
        <div className="container">
          <Faq
            items={FAQ}
            jsonLd
            num="07"
            title="Frequently asked questions"
            aside={
              <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] border border-line">
                <Image src="/assets/gen/event.webp" alt="A person at an event holding a phone with Linkist open" fill sizes="(min-width: 768px) 520px, 90vw" className="object-cover [object-position:60%_50%]" />
              </div>
            }
          />
        </div>
      </section>

      <CommunityBand />

      <ClosingBand image="portrait" />
    </>
  );
}
