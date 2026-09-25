import type { Metadata } from 'next';
import Image from 'next/image';
import { PageHero } from '@/components/PageHero';
import { Bell, Handshake, Radar, Search, ShieldCheck, Sparkles, Target, Users, type LucideIcon } from 'lucide-react';
import { StartFree, TextLink } from '@/components/Button';
import { ClosingBand } from '@/components/ClosingBand';
import { Faq } from '@/components/Faq';
import { Section, SectionHead } from '@/components/Section';
import { PreviewNote } from '@/components/PreviewNote';
import { AI_CAPABILITIES, AI_FAQ, AI_INPUTS, AI_NOT_PUBLISHED, AI_OUTPUTS, AI_RULES, POLICY_DATE, POLICY_VERSION, PRIVACY_EMAIL_PUBLISHED, PRIVACY_URL, TERMS_URL } from '@/content/trust';
import { pageMeta } from '@/lib/site';

export const metadata: Metadata = pageMeta(
  'AI and your data',
  'What the AI in Linkist does, what it reads, what it keeps and for how long, and how to switch it off. Written from the published Terms and Privacy, with the gaps listed as gaps.',
  '/ai',
  { image: '/og/ai.png' },
);

const ICONS: readonly LucideIcon[] = [Sparkles, Target, Radar, Users, Bell, Handshake, Search, Sparkles];

export default function AiPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'AI and your data', href: '/ai' }]}
        eyebrow="AI and your data"
        title={
          <>
            What the AI does.
            <br />
            What it sees.
            <br />
            <span className="em-coral">How to switch it off.</span>
          </>
        }
        lede={`AI is off until you switch it on, and every result shows its confidence. What it does, reads and keeps, from the Terms and Privacy v${POLICY_VERSION} of ${POLICY_DATE}.`}
        ctas={
          <>
            <StartFree />
            <TextLink href="#rules">Read the rules</TextLink>
          </>
        }
        side={
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[28px] border border-line">
            <Image src="/assets/gen/uc-find.webp" alt="A professional in a hotel lobby checking his contacts on his phone" fill priority sizes="(min-width: 1024px) 560px, 90vw" className="object-cover" />
          </div>
        }
      />

      <Section tone="charcoal" id="capabilities" glow>
        <SectionHead eyebrow="What it does" title={<>8 things, <span className="em-coral">four verbs in the document</span>.</>} lede="Each capability, then the verb the Terms and Privacy uses for it: add information, summarise, score, or suggest." center />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-reveal="rise" data-reveal-stagger="0.06">
          {AI_CAPABILITIES.map((c, i) => {
            const Icon = ICONS[i] ?? Sparkles;
            return (
              <article key={c.title} className="card sweep sweep--neutral lift flex flex-col p-6">
                <span className="inline-grid h-10 w-10 place-items-center rounded-full" style={{ background: 'color-mix(in srgb, var(--brand-crimson) 22%, transparent)', color: 'var(--brand-coral)' }}>
                  <Icon size={18} aria-hidden="true" />
                </span>
                <h2 className="display-3 mt-4 text-[20px]">{c.title}</h2>
                <p className="text-xs text-muted">Document: {c.policyName}</p>
                <p className="mt-2 flex-1 text-sm text-body">{c.body}</p>
                <p className="mt-3 font-mono text-[11px] text-muted">{c.source}</p>
              </article>
            );
          })}
        </div>
        <PreviewNote />
      </Section>

      <Section id="data">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="card p-7" data-reveal="rise">
            <p className="eyebrow">What it reads</p>
            <h2 className="display-3 mt-3">Only what you put in, plus three allowed sources for added information.</h2>
            <ul className="mt-5 flex flex-col gap-2 pl-5 text-md text-body" style={{ listStyle: 'disc' }}>
              {AI_INPUTS.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
            <p className="mt-4 font-mono text-[11px] text-muted">P 2; T 9</p>
          </div>
          <div className="card p-7" data-reveal="rise">
            <p className="eyebrow">What it produces</p>
            <h2 className="display-3 mt-3">Suggestions, scores and summaries, each with its confidence.</h2>
            <ul className="mt-5 flex flex-col gap-2 pl-5 text-md text-body" style={{ listStyle: 'disc' }}>
              {AI_OUTPUTS.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
            <p className="mt-4 font-mono text-[11px] text-muted">P 2, 6</p>
          </div>
        </div>
      </Section>

      <Section tone="lifted" id="rules">
        <SectionHead eyebrow="The rules" title={<>What the Terms and Privacy <span className="em-coral">bind Linkist to</span>.</>} lede="Each rule cites its section. T is Part 1, the terms of use; P is Part 2, privacy." center />
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
          <a href={TERMS_URL} className="underline">
            Terms and Privacy
          </a>
          , or{' '}
          <a href={PRIVACY_URL} className="underline">
            Part 2, Privacy, on its own
          </a>
          . Questions and objections: {PRIVACY_EMAIL_PUBLISHED}.
        </p>
      </Section>

      <Section tone="charcoal" id="not-yet">
        <SectionHead eyebrow="Not published yet" title={<>What this page <span className="em-coral">cannot tell you</span> today.</>} lede="The open questions, each with the team." center />
        <ul className="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-2" data-reveal="rise" data-reveal-stagger="0.06">
          {AI_NOT_PUBLISHED.map((n) => (
            <li key={n} className="card flex gap-3 p-5">
              <ShieldCheck size={18} aria-hidden="true" className="mt-0.5 flex-none text-coral" />
              <p className="text-sm text-body">{n}</p>
            </li>
          ))}
        </ul>
      </Section>

      <section id="faq" className="section">
        <div className="container">
          <Faq items={AI_FAQ} name="ai-faq" jsonLd title="AI and data, answered." />
        </div>
      </section>

      <ClosingBand line1="Let the AI fill the gaps." line2="You keep the last word." reassurance="Optional, off in one switch. Free, no card needed." />
    </>
  );
}
