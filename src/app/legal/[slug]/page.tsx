import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Section } from '@/components/Section';
import { Toc } from '@/components/Toc';
import { getLegal, getLegalDoc, renderLegal } from '@/lib/legal';
import { pageMeta } from '@/lib/site';

export const dynamicParams = false;
export function generateStaticParams() {
  return getLegal().map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const d = getLegalDoc(slug);
  if (!d) return {};
  return pageMeta(d.title, d.summary, `/legal/${d.slug}`, { image: '/og/legal.png', noindex: d.status === 'draft' });
}

const fmt = (d: string) => (d ? new Date(d + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }) : '');

/** One document: dated header, a status band for drafts, the body with contents at the side, and the other documents. */
export default async function LegalDocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const raw = getLegalDoc(slug);
  if (!raw) notFound();
  const d = renderLegal(raw);
  const all = getLegal();
  return (
    <>
      <section className="section section--tight pt-8 sm:pt-10">
        <div className="container">
          <Breadcrumbs items={[{ label: 'Legal', href: '/legal' }, { label: d.title, href: `/legal/${d.slug}` }]} />
          <header className="mt-8 max-w-3xl">
            <p className="eyebrow">{d.status === 'published' ? 'Legal, in force' : 'Legal, draft for counsel'}</p>
            <h1 className="display-1 mt-5">{d.title}</h1>
            <p className="lede mt-5">{d.summary}</p>
            {d.status === 'published' ? (
              <p className="mt-4 text-sm text-muted">
                Version {d.version || '1'}, effective {fmt(d.effective)}. Reproduced as published by RatioX Labs DWC-LLC
                {d.source ? (
                  <>
                    {' '}
                    at{' '}
                    <a href={d.source} className="underline" rel="noopener noreferrer" target="_blank">
                      {d.source.replace(/^https?:\/\/(www\.)?/, '')}
                    </a>
                  </>
                ) : null}
                ; the published version prevails if the two differ.
              </p>
            ) : (
              <div className="card mt-5 p-4 text-sm" role="note" style={{ borderColor: 'color-mix(in srgb, var(--brand-coral) 50%, transparent)' }}>
                <p className="font-semibold">Draft of {fmt(d.updated)}, not in force.</p>
                <p className="mt-1 text-body">
                  Written from the published terms and privacy policy, the store and the product. {d.placeholders} item{d.placeholders === 1 ? '' : 's'} marked for counsel. Until counsel signs it off, the published documents govern.
                </p>
              </div>
            )}
          </header>
        </div>
      </section>
      <Section tone="charcoal" tight>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_260px]">
          <article className="prose-lk min-w-0 max-w-3xl" dangerouslySetInnerHTML={{ __html: d.html }} />
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Toc chapters={d.chapters.filter((c) => c.level === 2)} title="Contents" />
            <nav aria-label="Other documents" className="mt-8 flex flex-col gap-2 text-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.04em] text-muted">All documents</p>
              {all.map((o) => (
                <Link key={o.slug} href={`/legal/${o.slug}`} className="no-underline hover:underline" aria-current={o.slug === d.slug ? 'page' : undefined} style={o.slug === d.slug ? { fontWeight: 600 } : { color: 'var(--color-muted)' }}>
                  {o.title}
                  {o.status === 'draft' ? <span className="ml-1 text-xs text-muted">(draft)</span> : null}
                </Link>
              ))}
            </nav>
          </aside>
        </div>
      </Section>
    </>
  );
}
