import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { ClosingBand } from '@/components/ClosingBand';
import { Newsletter } from '@/components/forms/Newsletter';
import { Section } from '@/components/Section';
import { CHANGELOG, IN_PRODUCT, UPCOMING, type ChangeTag } from '@/content/changelog';
import { pageMeta } from '@/lib/site';

export const metadata: Metadata = pageMeta('Changelog', 'What changed at Linkist, by date, from public sources: the website, the blog, the legal documents. Product release notes join the page when the team publishes them.', '/changelog', { image: '/og/changelog.png' });

const TONE: Record<ChangeTag, string> = {
  Product: '#D41A38',
  Website: '#EE5064',
  Blog: '#5FC7B4',
  Legal: '#8E8A84',
};

const fmt = (d: string) => new Date(d + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

/** Dated public events on a timeline, then what the product holds today, then what it says is coming (C17). */
export default function ChangelogPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Changelog', href: '/changelog' }]}
        eyebrow="Changelog"
        title={
          <>
            What changed, <span className="em-coral">by date</span>.
          </>
        }
        lede="Dated public events only. Undated product facts and what is coming sit below."
      />

      <Section tone="charcoal" tight>
        <ol className="relative mx-auto max-w-3xl border-l border-line pl-8">
          {CHANGELOG.map((c, i) => (
            <li key={`${c.date}-${i}`} className="relative pb-10 last:pb-0" data-reveal="rise">
              <span aria-hidden="true" className="absolute -left-[37px] top-1.5 h-4 w-4 rounded-full border-4" style={{ background: TONE[c.tag], borderColor: 'var(--color-bg-alt, #0a0a0b)', boxShadow: `0 0 14px ${TONE[c.tag]}` }} />
              <p className="flex flex-wrap items-center gap-3 text-sm text-muted">
                <time dateTime={c.date}>{fmt(c.date)}</time>
                <span className="rounded-md px-2 py-0.5 text-xs font-semibold" style={{ background: 'var(--color-surface2)', color: 'var(--color-text)' }}>
                  {c.tag}
                </span>
              </p>
              <h2 className="display-3 mt-2">{c.title}</h2>
              <ul className="mt-3 flex list-disc flex-col gap-1.5 pl-5 text-sm text-body">
                {c.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
              <p className="mt-3 font-mono text-[11px] text-muted">Source: {c.source}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tight id="today">
        <div className="grid gap-10 lg:grid-cols-2">
          <div data-reveal="rise">
            <p className="eyebrow">In the product today</p>
            <h2 className="display-2 mt-4">
              Confirmed, <span className="em-coral">launch date not published</span>.
            </h2>
            <ul className="mt-6 flex flex-col gap-3">
              {IN_PRODUCT.map((p) => (
                <li key={p.title} className="card p-5">
                  <p className="font-semibold">{p.title}</p>
                  <p className="mt-1 text-sm text-body">{p.body}</p>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-muted">Seen in the store and on the public pages on 10 September 2026.</p>
          </div>
          <div data-reveal="rise">
            <p className="eyebrow">Announced as coming</p>
            <h2 className="display-2 mt-4">
              Not available <span className="em-coral">yet</span>.
            </h2>
            <ul className="mt-6 flex flex-col gap-3">
              {UPCOMING.map((p) => (
                <li key={p.title} className="card p-5">
                  <p className="font-semibold">{p.title}</p>
                  <p className="mt-1 text-sm text-body">{p.body}</p>
                </li>
              ))}
            </ul>
            <div className="card mt-6 p-5">
              <p className="font-semibold">Release notes by email</p>
              <p className="mt-1 text-sm text-body">Product notes and new articles, occasionally. Product release notes join this page when the team publishes them.</p>
              <div className="mt-4">
                <Newsletter label="Email address" note="Occasional, no tracking, unsubscribe any time." />
              </div>
            </div>
          </div>
        </div>
      </Section>

      <ClosingBand line1="Watch it grow." line2="Start with an email or a mobile number." />
    </>
  );
}
