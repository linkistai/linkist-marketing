import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { AuthorRow, BlogList } from '@/components/blog/BlogList';
import { Newsletter } from '@/components/forms/Newsletter';
import { Section } from '@/components/Section';
import { HeroIntro } from '@/motion/HeroIntro';
import { getPosts, renderPost } from '@/lib/blog';
import { pageMeta } from '@/lib/site';

export const metadata: Metadata = pageMeta(
  'Blog: Linkist Insights',
  'Practical guides, product updates and expert perspectives on digital networking, NFC business cards, relationship management and building meaningful professional connections.',
  '/blogs',
  { image: '/og/blogs.png' },
);

/** The blog, in the structure of the old site's page (D18): hero, featured article, category filters, the grid, the newsletter. */
export default function BlogsPage() {
  const posts = getPosts().map((p) => {
    const r = renderPost(p);
    return { slug: p.slug, category: p.category, categoryLabel: p.categoryLabel, title: p.title, excerpt: p.excerpt, author: p.author, dateLabel: p.dateLabel, cover: p.cover, minutes: r.minutes };
  });
  const featured = posts[0];
  return (
    <>
      <section className="section section--glow pt-8 sm:pt-10">
        <div className="container">
          <Breadcrumbs items={[{ label: 'Blog', href: '/blogs' }]} />
          <HeroIntro className="mt-8 grid items-end gap-8 lg:grid-cols-2">
            <div>
              <p className="eyebrow" data-hero-text>
                Linkist Insights
              </p>
              <h1 className="display-1 mt-5" data-hero-text>
                Network smarter,
                <br />
                <span className="em-coral">not harder.</span>
              </h1>
            </div>
            <p className="lede lg:pb-2" data-hero-text>
              Practical guides, product updates and expert perspectives on digital networking, NFC business cards, relationship management and building meaningful professional connections.
            </p>
          </HeroIntro>

          {featured ? (
            <article className="card sweep sweep--featured mt-12 grid overflow-hidden lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]" data-hero-card="1">
              <Link href={`/blogs/${featured.slug}`} className="relative block aspect-[16/10] lg:aspect-auto lg:min-h-[360px]" aria-label={`Read ${featured.title}`}>
                <Image src={featured.cover} alt="" fill priority sizes="(max-width: 1024px) 100vw, 640px" style={{ objectFit: 'cover' }} />
                <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.06em] text-ground">Featured article</span>
              </Link>
              <div className="flex flex-col gap-4 p-7 sm:p-9">
                <p className="eyebrow eyebrow--accent text-[11px]">{featured.categoryLabel}</p>
                <h2 className="display-3 text-[24px] sm:text-[28px]">
                  <Link href={`/blogs/${featured.slug}`} className="no-underline hover:underline">
                    {featured.title}
                  </Link>
                </h2>
                <p className="text-md text-body">{featured.excerpt}</p>
                <AuthorRow author={featured.author} dateLabel={featured.dateLabel} minutes={featured.minutes} size="md" />
                <div className="mt-auto pt-2">
                  <Link href={`/blogs/${featured.slug}`} className="btn btn--primary">
                    Read article <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>
          ) : null}
        </div>
      </section>

      <Section tone="charcoal" tight id="articles">
        <BlogList posts={posts} />
      </Section>

      <Section tight id="subscribe">
        <div className="band mx-auto max-w-3xl p-8 text-center sm:p-12">
          <p className="eyebrow justify-center">Stay updated</p>
          <h2 className="display-2 mt-4">Insights straight to your inbox.</h2>
          <p className="lede mx-auto mt-4">Networking, NFC and relationship-building guides, about once a month.</p>
          <div className="mx-auto mt-8 max-w-md">
            <Newsletter large label="Email address" />
          </div>
        </div>
      </Section>
    </>
  );
}
