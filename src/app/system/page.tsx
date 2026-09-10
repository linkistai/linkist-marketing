import type { Metadata } from 'next';
import { Bell, Target } from 'lucide-react';
import { Button, StartFree, TextLink } from '@/components/Button';
import { Faq } from '@/components/Faq';
import { FloatingCard } from '@/components/FloatingCard';
import { LogoMark, Wordmark } from '@/components/Logo';
import { MetricChip } from '@/components/MetricChip';
import { MiniMock } from '@/components/mockups/MiniMock';
import { NfcCard } from '@/components/NfcCard';
import { Obj } from '@/components/Person';
import { ScreenFrame } from '@/components/ScreenFrame';
import { Section, SectionHead, Tags } from '@/components/Section';
import { Counter } from '@/motion/Counter';
import { CAPABILITIES, FAQ } from '@/content/home';
import { screen } from '@/lib/screens';
import { pageMeta } from '@/lib/site';

export const metadata: Metadata = pageMeta('Design system', 'Internal: tokens, components and motion primitives for the Linkist website.', '/system', { noindex: true });

const SWATCHES = [
  ['ground', '#141413'],
  ['surface', '#262627'],
  ['raised', '#2F2F30'],
  ['crimson', '#CE394D'],
  ['deep crimson', '#B1394B'],
  ['coral', '#E85F5F'],
  ['warm grey', '#D1CDC7'],
  ['muted', '#9A968F'],
  ['green', '#4D9078'],
  ['teal', '#377F86'],
] as const;

export default function SystemPage() {
  return (
    <>
      <Section tight>
        <SectionHead as="h1" size={1} eyebrow="Internal, noindex" title="Linkist website design system" lede="Tokens measured from the approved prototype, the site's display scale on top, every component the pages use, and the motion primitives with their motion-off states." />
        <p className="mt-6 text-sm text-muted">
          Append <code className="font-mono">?motion=off</code> to see the end states, or <code className="font-mono">?motion=on</code> to force motion on.
        </p>
      </Section>

      <Section tone="charcoal" tight id="tokens">
        <SectionHead eyebrow="Tokens" title="Colour, type, radius" />
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-5">
          {SWATCHES.map(([name, hex]) => (
            <div key={name} className="card overflow-hidden">
              <div style={{ background: hex, height: 72 }} />
              <div className="p-3 text-sm">
                <b>{name}</b>
                <span className="ml-2 font-mono text-muted">{hex}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="card p-6">
            <p className="display-1">Display 1</p>
            <p className="display-2">Display 2</p>
            <p className="display-3">Display 3</p>
            <p className="lede mt-4">Lede: one sentence, 14 to 22 words, warm grey, relaxed line height.</p>
            <p className="mt-4">Body, Inter 15px. Figures in the mono face with tabular numerals: <span className="font-mono tabular">1,234,567</span>.</p>
            <p className="eyebrow mt-4">Eyebrow with the crimson dot</p>
          </div>
          <div className="card flex flex-col items-start gap-4 p-6">
            <Wordmark size={32} />
            <div className="flex items-center gap-3">
              <LogoMark size={44} />
              <span className="text-sm text-muted">The mark, cropped from the prototype lockup</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {(['sm', 'md', 'lg', 'xl', '2xl', '3xl', 'pill'] as const).map((r) => (
                <span key={r} className="bg-surface2 px-3 py-2 text-xs" style={{ borderRadius: `var(--radius-${r})` }}>
                  radius {r}
                </span>
              ))}
            </div>
            <Tags items={['AI Enrichment', 'ICP Matching', 'Top Actions']} />
          </div>
        </div>
      </Section>

      <Section tight id="buttons">
        <SectionHead eyebrow="Buttons and links" title="One primary CTA, everywhere" lede="Start free lands on the app. Secondary actions are the prototype's ghost pill or a text link with an arrow." />
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <StartFree />
          <Button variant="secondary" size="lg">
            Try Linkist now
          </Button>
          <Button variant="ghost">Ghost</Button>
          <Button size="sm">Small</Button>
          <TextLink href="#buttons">Explore Linkist</TextLink>
        </div>
      </Section>

      <Section tone="charcoal" tight id="frames" glow>
        <SectionHead eyebrow="Frames, floating cards, objects" title="The stage for every screen" lede="Real captures drop into the frames; prototype crops carry the design-preview badge; until then the frame says so." />
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <div className="hero-stage relative mx-auto w-full max-w-[280px] py-6">
            <ScreenFrame kind="phone" src={screen('proto-home')} alt="Home, design preview" preview full />
            <FloatingCard className="absolute -left-4 top-10 p-1" ariaLabel="Contact captured">
              <MetricChip live text="Contact captured, context saved" />
            </FloatingCard>
            <FloatingCard className="absolute -right-6 bottom-14 p-1" variant={2} delay={1} deep ariaLabel="ICP matches, example">
              <MetricChip icon={Target} label="ICP matches" value="20 found" example />
            </FloatingCard>
          </div>
          <div className="flex flex-col gap-6">
            <ScreenFrame kind="browser" alt="Store, browser" url="prm.linkist.ai/store" />
            <div className="flex flex-wrap items-center gap-4">
              <ScreenFrame kind="phone" alt="Pending capture" className="!max-w-[140px]" />
              <Obj name="enrich" size={72} />
              <Obj name="nudge" size={72} />
              <MetricChip icon={Bell} label="Nudge" value="Julian, GITEX" example />
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-8">
          <p className="display-2">
            <Counter to={16} /> shipping regions
          </p>
          <p className="display-2">
            <Counter to={4} /> plans
          </p>
        </div>
      </Section>

      <Section tight id="mocks">
        <SectionHead eyebrow="Mini mockups" title="Example flows, 9 s loops" lede="Paused off-screen, frozen at the end state when motion is off, every figure labelled example." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CAPABILITIES.map((c) => (
            <div key={c.title} className="card p-5">
              <p className="font-semibold">{c.title}</p>
              <MiniMock mock={c.mock} />
            </div>
          ))}
          <div className="card p-5">
            <p className="font-semibold">Day list</p>
            <MiniMock mock={{ kind: 'day', label: 'Top Actions ticking off', items: [['Follow up with Julian', 'GITEX'], ['Reply to Sara', 'Intro'], ['Coffee with Omar', 'Cooling']] }} />
          </div>
          <div className="card p-5">
            <p className="font-semibold">Team share</p>
            <MiniMock mock={{ kind: 'share', label: 'Two cards sliding apart', front: ['Julian Baptiste', 'Nadir Fintech'], back: ['Shared with Sales', 'History kept'] }} />
          </div>
          <div className="card p-5">
            <p className="font-semibold">Tap</p>
            <MiniMock mock={{ kind: 'tap', label: 'A card tapping a phone' }} />
          </div>
          <div className="card p-5">
            <p className="font-semibold">Network Pulse</p>
            <MiniMock mock={{ kind: 'ring', label: 'Network Pulse ring', value: '250', pct: 60, pct2: 40, legend: [['60% contact data health', 'var(--brand-green)'], ['40 decision makers', 'var(--brand-teal)'], ['18 ICP alignment', 'var(--brand-coral)']] }} />
          </div>
        </div>
      </Section>

      <Section tone="lifted" tight id="cards">
        <SectionHead eyebrow="NFC card visualiser" title="Three materials, a specular sweep on hover" />
        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4">
          <NfcCard material="pvc" tier="starter" />
          <NfcCard material="wood" tier="signature" name="Olivia Jones" meta="NYU Abu Dhabi" />
          <NfcCard material="metal" tier="signature" name="Olivia Jones" meta="NYU Abu Dhabi" />
          <NfcCard material="founders" tier="founders" name="Olivia Jones" meta="Founding member" />
        </div>
      </Section>

      <Section tight id="faq">
        <SectionHead eyebrow="FAQ" title="Exclusive accordion, pill cards" />
        <div className="mt-10 max-w-3xl">
          <Faq items={FAQ.slice(0, 3)} />
        </div>
      </Section>
    </>
  );
}
