import type { Metadata } from 'next';
import { Sparkles } from 'lucide-react';
import { TextLink } from '@/components/Button';
import { ClosingBand } from '@/components/ClosingBand';
import { Faq } from '@/components/Faq';
import { Scene } from '@/components/Person';
import { ScreenFrame } from '@/components/ScreenFrame';
import { Section, SectionHead } from '@/components/Section';
import { Bundles } from '@/components/home/Bundles';
import { CapabilityGrid } from '@/components/home/CapabilityGrid';
import { CardTiers } from '@/components/home/CardTiers';
import { CommunityBand } from '@/components/home/CommunityBand';
import { HeroCarousel } from '@/components/home/HeroCarousel';
import { HomeJsonLd } from '@/components/home/JsonLd';
import { PlanCards } from '@/components/home/PlanCards';
import { StageFlow } from '@/components/home/StageFlow';
import { UseCaseGrid } from '@/components/home/UseCaseGrid';
import { PROTO_ALT, DESIGN_NOTE } from '@/content/design';
import { FAQ, MORE_THAN, MORE_THAN_LINE, STAGES } from '@/content/home';
import { person, scene, screen } from '@/lib/screens';
import { DEFAULT_DESCRIPTION, TAGLINE, pageMeta } from '@/lib/site';

export const metadata: Metadata = pageMeta(TAGLINE, DEFAULT_DESCRIPTION, '/', { image: '/og/home.png' });

export default function HomePage() {
  const stages = STAGES.map((s) => ({
    n: s.n,
    label: s.label,
    title: s.title,
    bullets: s.bullets,
    outcome: s.outcome,
    chips: s.chips,
    href: s.href,
    frame: <ScreenFrame kind="phone" src={screen(s.screen)} alt={PROTO_ALT[s.screen]} preview full className="!max-w-none" />,
  }));

  return (
    <>
      <HomeJsonLd />
      <HeroCarousel screen={screen('proto-home')} screenAlt={PROTO_ALT['proto-home']} person={person('hero-1')} />

      <Section id="how" tone="charcoal" glow>
        <SectionHead eyebrow="How Linkist works" title={<>Turn the contacts you collect into <span className="em-coral">opportunities</span>.</>} lede="Linkist helps you capture the right people, understand who matters, and know what to do next." center />
        <div className="mt-12">
          <StageFlow stages={stages} />
        </div>
        <p className="disclaimer mx-auto mt-8 max-w-2xl text-center">{DESIGN_NOTE}</p>
      </Section>

      <Section id="use-cases">
        <SectionHead eyebrow="Built for real working days" title={<>See what Linkist looks like <span className="em-coral">in real life</span>.</>} lede="The problem is rarely collecting contacts. It is knowing what to do with them afterwards." center />
        <div className="mt-12">
          <UseCaseGrid />
        </div>
        <div className="mt-8 flex justify-center">
          <TextLink href="/use-cases">All five use cases</TextLink>
        </div>
      </Section>

      <Section id="different" tone="lifted">
        <SectionHead eyebrow="More than an organised address book" title={<>More than <span className="em-coral">organising contacts</span>.</>} lede="Most tools stop once the contact is saved. Linkist helps you decide what to do with it." center />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-reveal="rise" data-reveal-stagger="0.08">
          {MORE_THAN.map((m) => (
            <div key={m.title} className="card card--hover p-7">
              <h3 className="display-3 text-[20px]">{m.title}</h3>
              <p className="mt-2 text-sm text-body">{m.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-md text-body" data-reveal="rise">
          {MORE_THAN_LINE}
        </p>
      </Section>

      <Section id="features" glow>
        <SectionHead
          eyebrow="What powers Linkist"
          title={
            <>
              Simple to use. <span className="em-coral">Smarter underneath.</span> <Sparkles size={22} aria-label="AI-assisted" className="ml-1 inline align-baseline text-crimson" />
            </>
          }
          lede="A few of the capabilities working behind the three-stage journey. Replayed here with example figures; the real screens are on the feature pages."
          center
        />
        <div className="mt-12">
          <CapabilityGrid />
        </div>
        <div className="mt-8 flex justify-center">
          <TextLink href="/features">See more features</TextLink>
        </div>
      </Section>

      <Section id="pricing" tone="charcoal">
        <SectionHead eyebrow="Linkist PRM" title={<>Start free. <span className="em-coral">Add more</span> when you need it.</>} lede="Use Linkist PRM without an NFC card. Start with the free plan and upgrade when you need richer contact management, AI matching and follow-up, or team collaboration." center />
        <div className="mt-12">
          <PlanCards compact />
        </div>
      </Section>

      <Section id="cards">
        <SectionHead eyebrow="Linkist NFC cards" title={<>Tap. Share. Make the <span className="em-coral">first impression</span> count.</>} lede="Choose a Linkist NFC card that connects instantly to your live professional profile. Every card includes PRM Essential." center />
        <div className="mt-12">
          <CardTiers />
        </div>
      </Section>

      <Section id="bundles" tone="lifted">
        <SectionHead eyebrow="Bundled offers" title={<>Get the NFC card and PRM Pro <span className="em-coral">together</span>, and save.</>} lede="Bundles combine the physical Linkist card with the Pro plan in one purchase, for less than buying the card and Pro separately." center />
        <div className="mt-12">
          <Bundles />
        </div>
      </Section>

      <Section tight id="faq">
        <SectionHead eyebrow="FAQ" title="Frequently asked questions" center />
        <div className="mx-auto mt-10 max-w-4xl">
          <Faq items={FAQ} jsonLd aside={scene('faq-home') ? <Scene src={scene('faq-home')} alt="A person at an event holding a phone with Linkist open" /> : undefined} />
        </div>
      </Section>

      <CommunityBand />

      <ClosingBand person={person('close-1')} personAlt="A person standing with a phone in hand, smiling at the camera" />
    </>
  );
}
