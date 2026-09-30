import type { Metadata } from 'next';
import Image from 'next/image';
import { PageHero } from '@/components/PageHero';
import Link from 'next/link';
import { TextLink } from '@/components/Button';
import { ClosingBand } from '@/components/ClosingBand';
import { Section, SectionHead } from '@/components/Section';
import { ADDRESS_LINES, DATA_LAW, DPO, FOUNDERS, FOUNDERS_INTRO, GOVERNING_LAW, LEGAL_NAME, PRIVACY, SUPPORT } from '@/content/company';
import { STAGES } from '@/content/home';
import { pageMeta } from '@/lib/site';

export const metadata: Metadata = pageMeta(
  'About Linkist',
  'Linkist is a Personal Relationship Manager built by RatioX Labs DWC-LLC in Dubai: the idea of a PRM, the founders, the company, and how to reach the team.',
  '/about',
  { image: '/og/about.png' },
);

/** About (brief 4): the idea of a PRM, the founders as on the RatioX Labs site, and the company card (owner, 29 September 2026). */
export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'About', href: '/about' }]}
        eyebrow="About Linkist"
        title={
          <>
            Made in Dubai for the people <span className="em-coral">you meet</span>.
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
              Contacts store people. A PRM keeps <span className="em-coral">the relationship</span>.
            </h2>
            <p className="mt-4 max-w-prose text-lg leading-relaxed text-body">A phone book holds a number. A CRM holds a deal. A Personal Relationship Manager keeps the person with their context, their fit and the next action.</p>
            <p className="mt-4 max-w-prose text-lg leading-relaxed text-body">The NFC card starts the connection. The PRM keeps it.</p>
            <div className="mt-6">
              <TextLink href="/blogs/what-is-personal-relationship-management">What personal relationship management is</TextLink>
            </div>
          </div>
          <ol className="flex flex-col gap-3" data-reveal="rise" data-reveal-stagger="0.08">
            {STAGES.map((s) => (
              <li key={s.n} className="card flex gap-4 p-5">
                <span className="inline-grid h-8 w-8 flex-none place-items-center rounded-full bg-crimson font-body text-sm font-semibold text-white">{s.n}</span>
                <div>
                  <p className="font-semibold">{s.label}</p>
                  <p className="mt-1 text-sm text-body">{s.title}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section tone="lifted" id="founders">
        <SectionHead
          eyebrow="Founders"
          title={
            <>
              Led by the founders of <span className="em-coral">RatioX Labs</span>.
            </>
          }
          lede={FOUNDERS_INTRO}
          center
        />
        <ul className="m-0 mt-12 grid list-none gap-4 p-0 md:grid-cols-3" data-reveal="rise" data-reveal-stagger="0.08">
          {FOUNDERS.map((f) => (
            <li key={f.name} className="card founder flex flex-col items-center p-[clamp(24px,2.6vw,32px)] text-center">
              <div className="founder__photo">
                <Image src={f.photo} alt={`Portrait of ${f.name}`} width={480} height={480} sizes="120px" className="h-full w-full object-cover" />
              </div>
              <h3 className="display-3 mt-5 !text-[22px]">{f.name}</h3>
              <p className="mt-2 font-body text-[11px] uppercase tracking-[0.08em] text-coral">{f.role}</p>
              <span className="founder__rule" aria-hidden="true" />
              <p className="text-left text-sm leading-relaxed text-body">{f.bio}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <div className="card mx-auto max-w-2xl p-7" data-reveal="rise">
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
      </Section>

      <ClosingBand line1="Capture the people you meet." line2="Remember why they mattered." />
    </>
  );
}
