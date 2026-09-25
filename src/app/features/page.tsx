import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ClosingBand } from '@/components/ClosingBand';
import { PageHero } from '@/components/PageHero';
import { FEATURES } from '@/content/features';
import { pageMeta } from '@/lib/site';

export const metadata: Metadata = pageMeta(
  'Features',
  'Capture, Find, Act, Profiles and cards, and Teams: everything Linkist PRM does, each on its own page with real screens, and the plan each capability belongs to.',
  '/features',
  { image: '/og/features.png' },
);

/**
 * The features hub (v2): a bento of five picture cards, Capture spanning two columns, each with
 * its v2 scene, the stage it belongs to, the name, a line and a link to its page.
 */
export default function FeaturesHub() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Features', href: '/features' }]}
        eyebrow="Features"
        title={
          <>
            Simple to use. <span className="em-coral">Smarter underneath.</span>
          </>
        }
        lede="5 families of capability behind the three-stage journey. Pick one to see it on screen."
      />
      <section className="section !pt-0">
        <div className="container">
          <ul className="m-0 grid list-none gap-3.5 p-0 [grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr))] lg:grid-cols-3" data-reveal="rise" data-reveal-stagger="0.06">
            {FEATURES.map((f, i) => (
              <li key={f.slug} className={i === 0 ? 'lg:col-span-2' : ''}>
                <Link href={`/features/${f.slug}`} className="card flex h-full flex-col overflow-hidden no-underline">
                  <span className={`relative block overflow-hidden ${i === 0 ? 'aspect-[16/7]' : 'aspect-[16/10]'} ${f.scene.square ? 'bg-bg-alt' : ''}`}>
                    <Image src={f.scene.src} alt={f.scene.alt} fill sizes={i === 0 ? '(min-width: 1024px) 800px, 90vw' : '(min-width: 1024px) 400px, 90vw'} className={f.scene.square ? 'object-contain p-4' : 'object-cover'} />
                  </span>
                  <span className="flex flex-1 flex-col p-[clamp(22px,2.6vw,28px)]">
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-coral">{f.stage}</span>
                    <h2 className="mt-2 font-display text-[26px] font-semibold tracking-[-0.025em]">{f.name}</h2>
                    <span className="mt-2 text-sm leading-normal text-body">{f.hubBlurb}</span>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-coral">
                      {f.name} in full <ArrowRight size={14} aria-hidden="true" />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <ClosingBand />
    </>
  );
}
