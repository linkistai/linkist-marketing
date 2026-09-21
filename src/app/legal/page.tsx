import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Section, SectionHead } from '@/components/Section';
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
      <Section tight className="pt-8 sm:pt-10">
        <Breadcrumbs items={[{ label: 'Legal', href: '/legal' }]} />
        <div className="mt-8">
          <SectionHead as="h1" size={1} eyebrow="Legal" title={<>The documents, <span className="em-coral">dated</span>.</>} lede="The Linkist Terms and Privacy, version 1.0, is in force as issued by RatioX Labs DWC-LLC; Part 2, Privacy, is published on its own as well. Eight are drafts written from the earlier documents and the product, marked where counsel must decide, and not in force until reviewed." />
        </div>
      </Section>
      <Section tone="charcoal" tight>
        <h2 className="display-3">In force</h2>
        <ul className="mt-5 grid gap-4 md:grid-cols-2">
          {published.map((d) => (
            <li key={d.slug}>
              <Link href={`/legal/${d.slug}`} className="card sweep sweep--neutral lift flex h-full flex-col p-6 no-underline">
                <p className="text-xs text-muted">
                  Version {d.version || '1'}, effective {fmt(d.effective)}
                </p>
                <h3 className="display-3 mt-2 text-[22px]">{d.title}</h3>
                <p className="mt-2 flex-1 text-sm text-body">{d.summary}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold">
                  Read <ArrowRight size={14} aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <h2 className="display-3 mt-12">Drafts for counsel</h2>
        <p className="mt-2 max-w-2xl text-sm text-body">Written from the earlier published documents, the store and the product, before the Terms and Privacy of 7 September 2026. Each shows how many items counsel must supply, and none is in force.</p>
        <ul className="mt-5 grid gap-4 md:grid-cols-2">
          {drafts.map((d) => (
            <li key={d.slug}>
              <Link href={`/legal/${d.slug}`} className="card sweep sweep--neutral lift flex h-full flex-col p-6 no-underline">
                <p className="text-xs text-muted">Draft of {fmt(d.updated)}</p>
                <h3 className="display-3 mt-2 text-[22px]">{d.title}</h3>
                <p className="mt-2 flex-1 text-sm text-body">{d.summary}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold">
                  Read <ArrowRight size={14} aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
