import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { StartFree, TextLink } from '@/components/Button';
import { ClosingBand } from '@/components/ClosingBand';
import { DesignPreview } from '@/components/DesignPreview';
import { Faq } from '@/components/Faq';
import { MiniMock } from '@/components/mockups/MiniMock';
import { Obj } from '@/components/Person';
import { ScreenFrame } from '@/components/ScreenFrame';
import { Outcome, Section, SectionHead, Tags } from '@/components/Section';
import { PreviewNote } from '@/components/PreviewNote';
import { HeroIntro } from '@/motion/HeroIntro';
import { PROTO_ALT } from '@/content/design';
import { FEATURES } from '@/content/features';
import { FAQ, STAGES } from '@/content/home';
import { object, person, screen } from '@/lib/screens';
import { pageMeta } from '@/lib/site';

export const metadata: Metadata = pageMeta(
  'How Linkist works: capture, build, act',
  'The three-stage journey in depth. Capture the people you meet with their context, find the ones worth your attention, and know what to do next, each stage on a real screen.',
  '/how-it-works',
  { image: '/og/how-it-works.png' },
);

const STAGE_FEATURE = ['capture', 'find', 'act'] as const;

export default function HowItWorksPage() {
  return (
    <>
      <section className="section pt-8 sm:pt-10">
        <div className="container">
          <Breadcrumbs items={[{ label: 'How it works', href: '/how-it-works' }]} />
          <HeroIntro className="mt-8 max-w-3xl">
            <p className="eyebrow" data-hero-text>
              How Linkist works
            </p>
            <h1 className="display-1 mt-5" data-hero-text>
              Three stages. <span className="em-coral">One place</span> for every relationship.
            </h1>
            <p className="lede mt-5" data-hero-text>
              Capture and share, build relationships, act and grow. Each stage has its own screens and its own capabilities, and each one feeds the next.
            </p>
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center" data-hero-text>
              <StartFree />
              <TextLink href="#stage-1">Start at stage 1</TextLink>
            </div>
          </HeroIntro>
        </div>
      </section>

      {STAGES.map((s, i) => {
        const f = FEATURES.find((x) => x.slug === STAGE_FEATURE[i])!;
        return (
          <Section key={s.n} id={`stage-${s.n}`} tone={i % 2 ? 'bg' : 'charcoal'} glow={i === 1}>
            <div className={`grid items-center gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] ${i % 2 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
              <div data-reveal="rise">
                <p className="eyebrow eyebrow--accent">
                  {s.n} · {s.label}
                </p>
                <h2 className="display-2 mt-4">{s.title}</h2>
                <ul className="mt-6 flex flex-col gap-2 pl-5 text-md text-body" style={{ listStyle: 'disc' }}>
                  {s.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Outcome>{s.outcome}</Outcome>
                </div>
                <Tags items={s.chips} className="mt-4" />
                <div className="card card--object mt-8 max-w-sm p-5">
                  <div className="flex items-center gap-3">
                    <Obj name={f.object} src={object(f.object)} size={48} className="card__obj" />
                    <p className="text-sm font-semibold">{f.name}, replayed with example figures</p>
                  </div>
                  <MiniMock mock={f.mock} />
                </div>
                <div className="mt-8">
                  <TextLink href={s.href}>{f.name} in full</TextLink>
                </div>
              </div>
              <div className="flex justify-center" data-reveal="rise">
                <div className="w-full max-w-[300px]">
                  <ScreenFrame kind="phone" src={screen(s.screen)} alt={PROTO_ALT[s.screen]} preview full priority={i === 0} />
                </div>
              </div>
            </div>
            <PreviewNote />
          </Section>
        );
      })}

      <DesignPreview
        id="design"
        eyebrow="From the approved design"
        title={
          <>
            The screens behind the <span className="em-coral">three stages</span>.
          </>
        }
        body="Your QR, WhatsApp, email and a copy link when you are ready to share; a connection profile that describes who you are looking for and shows who fits; and a home screen that opens on the nudges that need action."
        bullets={['Share by tap, QR, link, WhatsApp or email', 'Describe your ideal contact once and see who matches', 'A home screen that says what to do next']}
        screens={['v6-shareready', 'v6-icpdetail', 'v6-home']}
        tone="lifted"
      />

      <Section tight id="faq">
        <SectionHead eyebrow="Questions" title="Straight answers." />
        <div className="mt-10 max-w-3xl">
          <Faq items={FAQ.slice(0, 5)} jsonLd />
        </div>
      </Section>

      <ClosingBand line1="Capture the people you meet." line2="Then act at the right time." person={person('close-2')} />
    </>
  );
}
