import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { getLegal } from '@/lib/legal';
import { pageMeta } from '@/lib/site';

export const metadata: Metadata = pageMeta(
  'Legal',
  'The Linkist Terms and Privacy as published, with Part 2 (Privacy) on its own, plus drafts for counsel: cookies, acceptable use, refunds and shipping, sub-processors, security overview, accessibility, company information and the contact data notice.',
  '/legal',
  { image: '/og/legal.png' },
);

const fmt = (d: string) => (d ? new Date(d + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }) : '');

/** The legal hub (brief 4): every document dated, the two in force marked as published, the drafts marked for counsel. */
export default function LegalIndex() {
  const docs = getLegal();
  const published = docs.filter((d) => d.status === 'published');
  const drafts = docs.filter((d) => d.status === 'draft');
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Legal', href: '/legal' }]}
        eyebrow="Legal"
        title={
          <>
            The documents, <span className="em-coral">dated</span>.
          </>
        }
        lede="The Terms and Privacy v1.0 is in force, with Part 2, Privacy, also on its own. Eight drafts await counsel and are not in force."
      />
      <section className="section !pt-0" aria-labelledby="in-force">
        <div className="container">
          <h2 id="in-force" className="font-display text-[clamp(26px,2.6vw,34px)] font-semibold tracking-[-0.03em]">
            In force
          </h2>
          <ul className="mt-6 grid gap-[18px] [grid-template-columns:repeat(auto-fill,minmax(min(100%,360px),1fr))]">
            {published.map((d) => (
            <li key={d.slug} className="flex">
              <Link href={`/legal/${d.slug}`} className="card card--panel group flex w-full flex-col p-[26px] no-underline transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-[rgba(238,80,100,0.35)]">
                <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">Version {d.version || '1'}, effective {fmt(d.effective)}</p>
                <h3 className="mt-3 font-display text-[22px] font-semibold leading-[1.2] tracking-[-0.02em] text-text">{d.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-[1.55] text-body">{d.summary}</p>
                <span className="mt-5 inline-flex min-h-[24px] items-center gap-1.5 text-sm font-medium text-coral transition-colors group-hover:text-white">
                  Read <ArrowRight size={14} aria-hidden="true" />
                </span>
              </Link>
            </li>
            ))}
          </ul>
          <h2 id="drafts" className="mt-16 font-display text-[clamp(26px,2.6vw,34px)] font-semibold tracking-[-0.03em]">
            Drafts for counsel
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-body">Written before the Terms and Privacy of 7 September 2026. None is in force.</p>
          <ul className="mt-6 grid gap-[18px] [grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr))]">
            {drafts.map((d) => (
            <li key={d.slug} className="flex">
              <Link href={`/legal/${d.slug}`} className="card card--panel group flex w-full flex-col p-[26px] no-underline transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-[rgba(238,80,100,0.35)]">
                <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">Draft of {fmt(d.updated)}</p>
                <h3 className="mt-3 font-display text-[22px] font-semibold leading-[1.2] tracking-[-0.02em] text-text">{d.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-[1.55] text-body">{d.summary}</p>
                <span className="mt-5 inline-flex min-h-[24px] items-center gap-1.5 text-sm font-medium text-coral transition-colors group-hover:text-white">
                  Read <ArrowRight size={14} aria-hidden="true" />
                </span>
              </Link>
            </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
