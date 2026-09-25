import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/Breadcrumbs';
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

/** One document (v2): dated header, a status box for drafts, the 760 px body with sticky contents and all documents at the side. */
export default async function LegalDocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const raw = getLegalDoc(slug);
  if (!raw) notFound();
  const d = renderLegal(raw);
  const all = getLegal();
  return (
    <>
      <section className="page-hero !pb-[clamp(28px,4vw,48px)]" aria-labelledby="page-title">
        <div className="container">
          <div className="mb-7">
            <Breadcrumbs items={[{ label: 'Legal', href: '/legal' }, { label: d.title, href: `/legal/${d.slug}` }]} />
          </div>
          <header className="max-w-[900px]">
            <p className="eyebrow eyebrow--pulse" data-hero-text>
              {d.status === 'published' ? 'Legal, in force' : 'Legal, draft for counsel'}
            </p>
            <h1 id="page-title" className="mt-5 font-display text-[clamp(40px,5.4vw,76px)] font-semibold leading-none tracking-[-0.045em] [text-wrap:balance]" data-hero-text>
              {d.title}
            </h1>
            <p className="lede mt-6 max-w-[760px]" data-hero-text>
              {d.summary}
            </p>
            {d.status === 'published' ? (
              <p className="mt-5 max-w-[760px] text-[13px] leading-[1.6] text-muted">
                Version {d.version || '1'}, effective {fmt(d.effective)}.{' '}
                {d.source ? (
                  <>
                    Reproduced as published by RatioX Labs DWC-LLC at{' '}
                    <a href={d.source} className="underline underline-offset-4 hover:text-white" rel="noopener noreferrer" target="_blank">
                      {d.source.replace(/^https?:\/\/(www\.)?/, '')}
                    </a>
                    ; the published version prevails if the two differ.
                  </>
                ) : (
                  <>Issued by RatioX Labs DWC-LLC and reproduced here in full.</>
                )}
              </p>
            ) : (
              <div className="outcome mt-6 max-w-[760px]" role="note">
                <p className="outcome__label">Draft of {fmt(d.updated)}, not in force</p>
                <p className="mt-1.5 text-sm leading-[1.6] text-soft">
                  Written from the earlier published terms and privacy policy, the store and the product. {d.placeholders} item{d.placeholders === 1 ? '' : 's'} marked for counsel. Until counsel signs it off, the published documents govern.
                </p>
              </div>
            )}
          </header>
        </div>
      </section>
      <section className="section !pt-[clamp(24px,4vw,48px)]">
        <div className="container grid gap-[clamp(40px,6vw,88px)] lg:grid-cols-[minmax(0,760px)_280px] lg:justify-between">
          <article className="prose-lk min-w-0" dangerouslySetInnerHTML={{ __html: d.html }} />
          <aside className="lg:sticky lg:top-[110px] lg:self-start">
            <Toc chapters={d.chapters.filter((c) => c.level === 2)} title="Contents" />
            <nav aria-label="Other documents" className="mt-10">
              <p className="text-xs font-semibold uppercase tracking-[0.06em] text-muted">All documents</p>
              <ul className="mt-3 flex flex-col">
                {all.map((o) => {
                  const on = o.slug === d.slug;
                  return (
                    <li key={o.slug}>
                      <Link href={`/legal/${o.slug}`} className={`flex min-h-[44px] items-center gap-1.5 text-sm no-underline transition-colors hover:text-white ${on ? 'font-semibold text-white' : 'text-body'}`} aria-current={on ? 'page' : undefined}>
                        {o.title}
                        {o.status === 'draft' ? <span className="text-xs text-muted">(draft)</span> : null}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>
        </div>
      </section>
    </>
  );
}
