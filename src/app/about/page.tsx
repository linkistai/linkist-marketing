import type { Metadata } from 'next';
import Image from 'next/image';
import { PageHero } from '@/components/PageHero';
import Link from 'next/link';
import { TextLink } from '@/components/Button';
import { ClosingBand } from '@/components/ClosingBand';
import { Section, SectionHead } from '@/components/Section';
import { ADDRESS_LINES, DATA_LAW, DPO, GOVERNING_LAW, LEGAL_NAME, PRINCIPLES, PRIVACY, SUPPORT, TIMELINE } from '@/content/company';
import { STAGES } from '@/content/home';
import { pageMeta } from '@/lib/site';

export const metadata: Metadata = pageMeta(
  'About Linkist',
  'Linkist is a Personal Relationship Manager built by RatioX Labs DWC-LLC in Dubai: the idea of a PRM, six things the product holds itself to, how it is built, the company, and how to reach the team.',
  '/about',
  { image: '/og/about.png' },
);

/** About (brief 4): RatioX Labs, the idea of a PRM, the team, contact. The team is named when the client confirms it (C10). */
export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'About', href: '/about' }]}
        eyebrow="About Linkist"
        title={
          <>
            Made in Dubai for <span className="em-coral">the people you meet</span>.
          </>
        }
        lede="A Personal Relationship Manager built by RatioX Labs DWC-LLC in Dubai South. It captures who you meet, remembers the context and says what to do next."
        side={
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[28px] border border-line">
            <Image src="/assets/gen/event.webp" alt="Professionals exchanging contacts on their phones at an evening event in Dubai" fill priority sizes="(min-width: 1024px) 560px, 90vw" className="object-cover" />
          </div>
        }
      />

      <Section tone="charcoal">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <div data-reveal="rise">
            <p className="eyebrow">The idea</p>
            <h2 className="display-2 mt-4">
              Contacts store people. <span className="em-coral">A PRM keeps the relationship.</span>
            </h2>
            <p className="mt-4 max-w-prose text-lg leading-relaxed text-body">A phone book holds a number. A CRM holds a deal. A Personal Relationship Manager keeps the person with their context, their fit and the next action.</p>
            <p className="mt-4 max-w-prose text-lg leading-relaxed text-body">The NFC card starts the connection. The PRM keeps it.</p>
            <div className="mt-6">
              <TextLink href="/blogs/what-a-prm-is-and-is-not">What a PRM is, and what it is not</TextLink>
            </div>
          </div>
          <ol className="flex flex-col gap-3" data-reveal="rise" data-reveal-stagger="0.08">
            {STAGES.map((s) => (
              <li key={s.n} className="card flex gap-4 p-5">
                <span className="inline-grid h-8 w-8 flex-none place-items-center rounded-full bg-crimson font-mono text-sm font-semibold text-white">{s.n}</span>
                <div>
                  <p className="font-semibold">{s.label}</p>
                  <p className="mt-1 text-sm text-body">{s.title}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow="How we work" title={<>6 things Linkist <span className="em-coral">holds itself to</span>.</>} lede="Each points to where it is written." center />
        <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3" data-reveal="rise" data-reveal-stagger="0.06">
          {PRINCIPLES.map((p) => (
            <li key={p.title} className="card sweep sweep--neutral lift p-6">
              <h3 className="display-3 text-[22px]">{p.title}</h3>
              <p className="mt-2 text-sm text-body">{p.body}</p>
              <p className="mt-3 font-mono text-[11px] text-muted">{p.source}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="lifted">
        <div className="grid gap-10 lg:grid-cols-2">
          <div data-reveal="rise">
            <p className="eyebrow">The team</p>
            <h2 className="display-2 mt-4">
              Small, in Dubai, <span className="em-coral">named when confirmed</span>.
            </h2>
            <p className="mt-4 max-w-prose text-lg leading-relaxed text-body">Linkist is built by a small team at RatioX Labs in Dubai South. Names and roles appear here when the team confirms them; this site does not guess. The articles on the blog carry their authors&apos; bylines.</p>
            <div className="mt-6 flex flex-wrap gap-4">
              <TextLink href="/customers">Why there are no named customers yet</TextLink>
              <TextLink href="/blogs">Read the blog</TextLink>
            </div>
          </div>
          <div data-reveal="rise">
            <p className="eyebrow">How it is built</p>
            <h2 className="display-2 mt-4">
              A web app, <span className="em-coral">on your phone</span>.
            </h2>
            <p className="mt-4 max-w-prose text-lg leading-relaxed text-body">The app runs at prm.linkist.ai, with billing for plans, credits, invoices and cards. Profiles live at /me/yourname. Native apps are in final preparation.</p>
            <div className="mt-6">
              <TextLink href="/security">The security page</TextLink>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <div data-reveal="rise">
            <p className="eyebrow">So far</p>
            <h2 className="display-2 mt-4">
              Dated, <span className="em-coral">from public sources</span>.
            </h2>
            <ol className="mt-6 flex flex-col gap-4 border-l border-line pl-6">
              {TIMELINE.map((t) => (
                <li key={t.date}>
                  <p className="text-xs font-semibold uppercase tracking-[0.04em] text-muted">{t.date}</p>
                  <p className="mt-1 text-body">{t.text}</p>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-sm">
              <Link href="/changelog" className="link">
                The changelog
              </Link>
            </p>
          </div>
          <div className="card self-start p-7" data-reveal="rise">
            <p className="eyebrow">The company</p>
            <p className="mt-4 font-semibold">{LEGAL_NAME}, trading as Linkist</p>
            <p className="mt-1 text-sm text-body">
              {ADDRESS_LINES[0]}
              <br />
              {ADDRESS_LINES[1]}
            </p>
            <p className="mt-4 text-sm text-body">
              Support: {SUPPORT}
              <br />
              Privacy: {PRIVACY}
              <br />
              Data Protection Officer: {DPO}
            </p>
            <p className="mt-4 text-sm text-body">Responsible for your data under {DATA_LAW}. {GOVERNING_LAW}</p>
            <p className="mt-4 text-sm">
              <Link href="/legal" className="link">
                The legal documents
              </Link>
              <span className="text-muted"> · </span>
              <Link href="/contact" className="link">
                Contact
              </Link>
            </p>
          </div>
        </div>
      </Section>

      <ClosingBand line1="Capture the people you meet." line2="Remember why they mattered." />
    </>
  );
}
