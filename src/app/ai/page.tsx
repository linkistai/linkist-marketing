import type { Metadata } from 'next';
import { Bell, Handshake, Radar, Search, ShieldCheck, Sparkles, Target, Users, type LucideIcon } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { StartFree, TextLink } from '@/components/Button';
import { ClosingBand } from '@/components/ClosingBand';
import { Faq } from '@/components/Faq';
import { ScreenFrame } from '@/components/ScreenFrame';
import { Section, SectionHead } from '@/components/Section';
import { HeroIntro } from '@/motion/HeroIntro';
import { PROTO_ALT, DESIGN_NOTE } from '@/content/design';
import { AI_CAPABILITIES, AI_FAQ, AI_INPUTS, AI_NOT_PUBLISHED, AI_OUTPUTS, AI_RULES, POLICY_DATE, PRIVACY_EMAIL_PUBLISHED, PRIVACY_URL, TERMS_URL } from '@/content/trust';
import { person, screen } from '@/lib/screens';
import { pageMeta } from '@/lib/site';

export const metadata: Metadata = pageMeta(
  'AI and your data',
  'What the AI in Linkist does, what it reads, what it keeps and for how long, and how to switch it off. Written from the published privacy policy and terms, with the gaps listed as gaps.',
  '/ai',
  { image: '/og/ai.png' },
);

const ICONS: readonly LucideIcon[] = [Sparkles, Target, Radar, Users, Bell, Handshake, Search, Sparkles];

export default function AiPage() {
  return (
    <>
      <section className="section pt-8 sm:pt-10">
        <div className="container">
          <Breadcrumbs items={[{ label: 'AI and your data', href: '/ai' }]} />
          <HeroIntro className="mt-8 grid items-center gap-12 lg:grid-cols-[7fr_5fr]">
            <div className="hero-copy max-w-3xl">
              <p className="eyebrow" data-hero-text>
                AI and your data
              </p>
              <h1 className="display-1 mt-5" data-hero-text>
                What the AI does.
                <br />
                What it sees.
                <br />
                <span className="em-coral">How to switch it off.</span>
              </h1>
              <p className="lede mt-6" data-hero-text>
                Linkist&apos;s AI features are optional, assistive and switched on with a separate consent. This page says what they do, what they read, what is kept and for how long, taken from the privacy policy and terms published on {POLICY_DATE}. What is not published yet is listed as such.
              </p>
              <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center" data-hero-text>
                <StartFree />
                <TextLink href="#rules">Read the rules</TextLink>
              </div>
            </div>
            <div className="hero-stage relative flex justify-center" data-hero-card="1">
              <div className="w-full max-w-[280px]">
                <ScreenFrame kind="phone" src={screen('proto-home')} alt={PROTO_ALT['proto-home']} preview full priority />
              </div>
            </div>
          </HeroIntro>
        </div>
      </section>

      <Section tone="charcoal" id="capabilities" glow>
        <SectionHead eyebrow="What it does" title={<>Eight things, <span className="em-coral">each named in the policy</span>.</>} lede="The product's name first, the privacy policy's name second. Nothing here is padded: if a capability is not on this list, the policy does not describe it." center />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-reveal="rise" data-reveal-stagger="0.06">
          {AI_CAPABILITIES.map((c, i) => {
            const Icon = ICONS[i] ?? Sparkles;
            return (
              <article key={c.title} className="card sweep sweep--neutral lift flex flex-col p-6">
                <span className="inline-grid h-10 w-10 place-items-center rounded-full" style={{ background: 'color-mix(in srgb, var(--brand-crimson) 22%, transparent)', color: 'var(--brand-coral)' }}>
                  <Icon size={18} aria-hidden="true" />
                </span>
                <h2 className="display-3 mt-4 text-[20px]">{c.title}</h2>
                <p className="text-xs text-muted">Policy: {c.policyName}</p>
                <p className="mt-2 flex-1 text-sm text-body">{c.body}</p>
                <p className="mt-3 font-mono text-[11px] text-muted">{c.source}</p>
              </article>
            );
          })}
        </div>
        <p className="disclaimer mx-auto mt-8 max-w-2xl text-center">{DESIGN_NOTE}</p>
      </Section>

      <Section id="data">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="card p-7" data-reveal="rise">
            <p className="eyebrow">What it reads</p>
            <h2 className="display-3 mt-3">Only what you put in, plus public sources for enrichment.</h2>
            <ul className="mt-5 flex flex-col gap-2 pl-5 text-md text-body" style={{ listStyle: 'disc' }}>
              {AI_INPUTS.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
            <p className="mt-4 font-mono text-[11px] text-muted">Privacy policy 5, 9</p>
          </div>
          <div className="card p-7" data-reveal="rise">
            <p className="eyebrow">What it produces</p>
            <h2 className="display-3 mt-3">Suggestions, scores and summaries, all marked as such.</h2>
            <ul className="mt-5 flex flex-col gap-2 pl-5 text-md text-body" style={{ listStyle: 'disc' }}>
              {AI_OUTPUTS.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
            <p className="mt-4 font-mono text-[11px] text-muted">Privacy policy 4.10</p>
          </div>
        </div>
      </Section>

      <Section tone="lifted" id="rules">
        <SectionHead eyebrow="The rules" title={<>What the policy and terms <span className="em-coral">bind Linkist to</span>.</>} lede="Each rule cites its section. P is the privacy policy, T the terms of service." center />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-reveal="rise" data-reveal-stagger="0.05">
          {AI_RULES.map((r) => (
            <li key={r.title} className="card card--hover p-6">
              <ShieldCheck size={18} aria-hidden="true" className="text-coral" />
              <h3 className="mt-3 font-semibold">{r.title}</h3>
              <p className="mt-2 text-sm text-body">{r.body}</p>
              <p className="mt-3 font-mono text-[11px] text-muted">{r.source}</p>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-center text-sm text-muted">
          Read the{' '}
          <a href={PRIVACY_URL} className="underline" rel="noopener noreferrer" target="_blank">
            privacy policy
          </a>{' '}
          and the{' '}
          <a href={TERMS_URL} className="underline" rel="noopener noreferrer" target="_blank">
            terms of service
          </a>
          . Questions and objections: {PRIVACY_EMAIL_PUBLISHED}.
        </p>
      </Section>

      <Section tone="charcoal" id="not-yet">
        <SectionHead eyebrow="Not published yet" title={<>What this page <span className="em-coral">cannot tell you</span> today.</>} lede="A page that only lists reassurances is marketing. These are the open questions; each one is with the team." center />
        <ul className="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-2" data-reveal="rise" data-reveal-stagger="0.06">
          {AI_NOT_PUBLISHED.map((n) => (
            <li key={n} className="card flex gap-3 p-5">
              <ShieldCheck size={18} aria-hidden="true" className="mt-0.5 flex-none text-coral" />
              <p className="text-sm text-body">{n}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tight id="faq">
        <SectionHead eyebrow="FAQ" title="AI and data, answered." center />
        <div className="mx-auto mt-10 max-w-4xl">
          <Faq items={AI_FAQ} name="ai-faq" jsonLd />
        </div>
      </Section>

      <ClosingBand person={person('close-6')} line1="Let the AI fill the gaps." line2="You keep the last word." reassurance="Optional, assistive, off in one switch. Free plan, no card required." />
    </>
  );
}
