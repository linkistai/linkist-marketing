import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ClosingBand } from '@/components/ClosingBand';
import { Outcome, Section, SectionHead, Tags } from '@/components/Section';
import { USE_CASES } from '@/content/usecases';
import { person } from '@/lib/screens';
import { pageMeta } from '@/lib/site';

export const metadata: Metadata = pageMeta(
  'Use cases: built for real working days',
  '5 situations Linkist is built for: after an event, finding the right person, too many relationships to track, a network growing the wrong way, and a key person leaving.',
  '/use-cases',
  { image: '/og/use-cases.png' },
);

export default function UseCasesHub() {
  return (
    <>
      <Section tight className="pt-8 sm:pt-10">
        <Breadcrumbs items={[{ label: 'Use cases', href: '/use-cases' }]} />
        <div className="mt-8">
          <SectionHead as="h1" size={1} eyebrow="Built for real working days" title={<>See what Linkist looks like <span className="em-coral">in real life</span>.</>} lede="The problem is rarely collecting contacts. It is knowing what to do with them afterwards. 5 situations, each with the steps Linkist takes." />
        </div>
      </Section>
      <Section tone="charcoal" tight>
        <div className="flex flex-col gap-5" data-reveal="rise" data-reveal-stagger="0.06">
          {USE_CASES.map((u) => (
            <Link key={u.slug} href={`/use-cases/${u.slug}`} className="card sweep sweep--neutral lift grid gap-6 p-7 no-underline md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:p-9">
              <div>
                <p className="eyebrow eyebrow--accent text-[11px]">{u.short}</p>
                <h2 className="display-3 mt-3">{u.title}</h2>
                <p className="mt-2 text-md text-body">{u.problem}</p>
                <div className="mt-4">
                  <Outcome label="Result">{u.result}</Outcome>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.04em] text-body">With Linkist</p>
                <ul className="mt-3 flex flex-col gap-2 pl-5 text-md text-body" style={{ listStyle: 'disc' }}>
                  {u.steps.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
                <Tags items={u.chips} className="mt-5" />
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-coral">
                  Read the use case <ArrowRight size={14} aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>
      <ClosingBand person={person('close-4')} />
    </>
  );
}
