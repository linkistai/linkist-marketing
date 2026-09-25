import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { ClosingBand } from '@/components/ClosingBand';
import { PageHero } from '@/components/PageHero';
import { USE_CASES } from '@/content/usecases';
import { pageMeta } from '@/lib/site';

export const metadata: Metadata = pageMeta(
  'Use cases: built for real working days',
  '5 situations Linkist is built for: after an event, finding the right person, too many relationships to track, a network growing the wrong way, and a key person leaving.',
  '/use-cases',
  { image: '/og/use-cases.png' },
);

/** The use-case hub (v2): five scene cards, each with its number, short name, title, problem and a link. */
export default function UseCasesHub() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Use cases', href: '/use-cases' }]}
        eyebrow="Built for real connections"
        title={
          <>
            See Linkist <span className="em-coral">at work</span>.
          </>
        }
        lede="Collecting contacts is easy. Knowing what to do next is hard. 5 situations, step by step."
      />
      <section className="section !pt-0">
        <div className="container">
          <ul className="m-0 grid list-none gap-3.5 p-0 [grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr))]" data-reveal="rise" data-reveal-stagger="0.06">
            {USE_CASES.map((u, i) => (
              <li key={u.slug}>
                <Link href={`/use-cases/${u.slug}`} className="card flex h-full flex-col overflow-hidden no-underline">
                  <span className="relative block aspect-[16/10] overflow-hidden">
                    <Image src={u.scene} alt={u.sceneAlt} fill priority={i === 0} sizes="(min-width: 1024px) 400px, 90vw" className="object-cover" />
                    <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0)_50%,rgba(5,5,5,.85))]" aria-hidden="true" />
                    <span className="absolute bottom-3 left-4 font-mono text-[11px] tracking-[0.1em] text-body">
                      {String(i + 1).padStart(2, '0')} · {u.short}
                    </span>
                  </span>
                  <span className="flex flex-1 flex-col p-[clamp(22px,2.6vw,28px)]">
                    <h2 className="font-display text-[22px] font-semibold leading-[1.2] tracking-[-0.02em]">{u.title}</h2>
                    <span className="mt-2 text-sm leading-normal text-body">{u.problem}</span>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-coral">
                      {u.short} <ArrowRight size={14} aria-hidden="true" />
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
