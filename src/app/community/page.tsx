import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ClosingBand } from '@/components/ClosingBand';
import { Newsletter } from '@/components/forms/Newsletter';
import { Section, SectionHead } from '@/components/Section';
import { CHANNELS, WHAT_YOU_GET } from '@/content/community';
import { COMMUNITY } from '@/content/home';
import { getPosts } from '@/lib/blog';
import { person } from '@/lib/screens';
import { pageMeta } from '@/lib/site';

export const metadata: Metadata = pageMeta('Join the Linkist community', 'Product notes, new articles and event invitations by email, occasionally, with no tracking. Follow Linkist on LinkedIn, Instagram and X.', '/community', { image: '/og/community.png' });

/** The prototype's community sign-up as a page: what you get, the form, the channels, the latest reads. */
export default function CommunityPage() {
  const latest = getPosts().slice(0, 3);
  return (
    <>
      <Section tight className="pt-8 sm:pt-10">
        <Breadcrumbs items={[{ label: 'Community', href: '/community' }]} />
        <div className="mt-8 grid items-start gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <SectionHead as="h1" size={1} eyebrow={COMMUNITY.eyebrow} title={<>Join the Linkist <span className="em-coral">community</span>.</>} lede={COMMUNITY.body} />
          <div className="card p-6 sm:p-8" data-hero-card="1">
            <p className="font-semibold">Email address</p>
            <p className="mt-1 text-sm text-body">Occasional. No tracking. Unsubscribe with one click.</p>
            <div className="mt-4">
              <Newsletter endpoint="/api/community" label="Email address" placeholder="Email address" button="Join" note="No spam. Unsubscribe any time." large />
            </div>
          </div>
        </div>
      </Section>

      <Section tone="charcoal" tight>
        <ul className="grid gap-4 md:grid-cols-3" data-reveal="rise" data-reveal-stagger="0.06">
          {WHAT_YOU_GET.map((w) => (
            <li key={w.title} className="card card--hover p-6">
              <h2 className="display-3 text-[20px]">{w.title}</h2>
              <p className="mt-2 text-sm text-body">{w.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tight>
        <div className="grid gap-10 lg:grid-cols-2">
          <div data-reveal="rise">
            <p className="eyebrow">Follow along</p>
            <h2 className="display-2 mt-4">
              3 <span className="em-coral">channels</span>.
            </h2>
            <ul className="mt-6 flex flex-col gap-3">
              {CHANNELS.map((c) => (
                <li key={c.name}>
                  <a href={c.href} className="card lift flex items-center justify-between gap-4 p-5 no-underline" rel="noopener noreferrer" target="_blank">
                    <span>
                      <span className="block font-semibold">{c.name}</span>
                      <span className="block text-sm text-muted">{c.handle}</span>
                    </span>
                    <ArrowUpRight size={18} aria-hidden="true" className="text-coral" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal="rise">
            <p className="eyebrow">Latest reads</p>
            <h2 className="display-2 mt-4">
              From the <span className="em-coral">blog</span>.
            </h2>
            <ul className="mt-6 flex flex-col gap-3">
              {latest.map((p) => (
                <li key={p.slug} className="card p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.04em] text-muted">{p.categoryLabel}</p>
                  <Link href={`/blogs/${p.slug}`} className="mt-1 block font-semibold no-underline hover:underline">
                    {p.title}
                  </Link>
                  <p className="mt-1 text-sm text-body">{p.excerpt}</p>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm">
              <Link href="/blogs" className="link">
                All articles
              </Link>
            </p>
          </div>
        </div>
      </Section>

      <ClosingBand person={person('close-10')} line1="Meet people. Remember them." line2="Start with an email or a mobile number." />
    </>
  );
}
