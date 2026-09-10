import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ClosingBand } from '@/components/ClosingBand';
import { MiniMock } from '@/components/mockups/MiniMock';
import { Obj } from '@/components/Person';
import { Section, SectionHead } from '@/components/Section';
import { FEATURES } from '@/content/features';
import { object, person } from '@/lib/screens';
import { pageMeta } from '@/lib/site';

export const metadata: Metadata = pageMeta(
  'Features',
  'Capture, Find, Act, Profiles and cards, and Teams: everything Linkist PRM does, each on its own page with real screens, and the plan each capability belongs to.',
  '/features',
  { image: '/og/features.png' },
);

export default function FeaturesHub() {
  return (
    <>
      <Section tight className="pt-8 sm:pt-10">
        <Breadcrumbs items={[{ label: 'Features', href: '/features' }]} />
        <div className="mt-8">
          <SectionHead as="h1" size={1} eyebrow="Features" title={<>Simple to use. <span className="em-coral">Smarter underneath.</span></>} lede="5 families of capability behind the three-stage journey. Pick one, and every screen on its page is a real capture or a labelled design preview." />
        </div>
      </Section>
      <Section tone="charcoal" tight>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" data-reveal="rise" data-reveal-stagger="0.06">
          {FEATURES.map((f) => (
            <Link key={f.slug} href={`/features/${f.slug}`} className="card card--object sweep sweep--neutral lift flex flex-col p-6 no-underline">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="eyebrow eyebrow--accent text-[11px]">{f.stage}</p>
                  <h2 className="display-3 mt-2">{f.name}</h2>
                </div>
                <Obj name={f.object} src={object(f.object)} size={64} className="card__obj -mr-2 -mt-2 flex-none" />
              </div>
              <p className="mt-2 text-sm text-body">{f.hubBlurb}</p>
              <MiniMock mock={f.mock} />
              <span className="flex-1" />
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-coral">
                Explore {f.name} <ArrowRight size={14} aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </Section>
      <ClosingBand person={person('close-3')} />
    </>
  );
}
