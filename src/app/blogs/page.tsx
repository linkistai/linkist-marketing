import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { AuthorRow, BlogList } from '@/components/blog/BlogList';
import { Newsletter } from '@/components/forms/Newsletter';
import { Parallax } from '@/motion/Parallax';
import { CATEGORY_IMAGE } from '@/lib/blog-shared';
import { getPosts, renderPost } from '@/lib/blog';
import { pageMeta } from '@/lib/site';

export const metadata: Metadata = pageMeta(
  'Blog: Linkist Insights',
  'Guides, product updates and perspectives on networking, NFC cards and relationship management.',
  '/blogs',
  { image: '/og/blogs.png' },
);

/** The blog (v2): big H1 and lede, the featured article as a two-column card, category pills over a three-column grid, and the subscribe band. */
export default function BlogsPage() {
  const posts = getPosts().map((p) => {
    const r = renderPost(p);
    return { slug: p.slug, category: p.category, categoryLabel: p.categoryLabel, title: p.title, excerpt: p.excerpt, author: p.author, dateLabel: p.dateLabel, cover: p.cover, minutes: r.minutes };
  });
  const featured = posts[0];
  const featuredImg = featured ? CATEGORY_IMAGE[featured.category] : null;
  return (
    <>
      <section className="page-hero" aria-labelledby="page-title">
        <Parallax k={0.1} className="page-hero__mark">
          <Image src="/brand/mark.png" alt="" width={256} height={256} aria-hidden="true" className="v2-spin h-auto w-full" />
        </Parallax>
        <div className="container">
          <div className="mb-7">
            <Breadcrumbs items={[{ label: 'Blog', href: '/blogs' }]} />
          </div>
          <div className="grid items-end gap-x-16 gap-y-6 [grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr))]">
            <div>
              <p className="eyebrow eyebrow--pulse" data-hero-text>
                Linkist Insights
              </p>
              <h1 id="page-title" className="display-1 mt-5" data-hero-text>
                Network smarter,
                <br />
                <span className="em-coral">not harder.</span>
              </h1>
            </div>
            <p className="lede max-w-[520px] lg:pb-3" data-hero-text>
              Guides, product updates and perspectives on networking, NFC cards and relationship management.
            </p>
          </div>

          {featured && featuredImg ? (
            <article className="card card--panel card--featured mt-[clamp(40px,6vw,72px)] grid overflow-hidden [grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr))]" data-reveal="rise">
              <Link href={`/blogs/${featured.slug}`} className="group relative block aspect-[16/10] min-h-[260px] overflow-hidden bg-bg-alt lg:aspect-auto" aria-label={`Read ${featured.title}`}>
                <Image src={featuredImg.src} alt="" fill priority sizes="(max-width: 900px) 100vw, 640px" className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                <span className="absolute left-4 top-4 rounded-full border border-line bg-[rgba(5,5,5,0.72)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white backdrop-blur">Featured article</span>
              </Link>
              <div className="flex flex-col gap-4 p-[clamp(24px,3.4vw,44px)]">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-coral">{featured.categoryLabel}</p>
                <h2 className="font-display text-[clamp(26px,2.6vw,36px)] font-semibold leading-[1.1] tracking-[-0.03em]">
                  <Link href={`/blogs/${featured.slug}`} className="no-underline hover:underline">
                    {featured.title}
                  </Link>
                </h2>
                <p className="text-[15px] leading-[1.6] text-body">{featured.excerpt}</p>
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

      <section className="section !pt-0" id="articles" aria-label="All articles">
        <div className="container">
          <BlogList posts={posts} />
        </div>
      </section>

      <section className="section relative overflow-hidden" id="subscribe" aria-labelledby="subscribe-title">
        <div className="container">
          <div className="card card--panel relative mx-auto max-w-[820px] overflow-hidden px-[clamp(22px,5vw,64px)] py-[clamp(36px,6vw,72px)] text-center" data-reveal="rise">
            <div className="v2-glow left-1/2 top-0 w-[120%] -translate-x-1/2 -translate-y-1/2" style={{ background: 'radial-gradient(circle, rgba(163,22,45,.35), transparent 62%)' }} aria-hidden="true" />
            <p className="eyebrow relative justify-center">Stay updated</p>
            <h2 id="subscribe-title" className="display-2 relative mt-4">
              Insights straight <span className="em-coral">to your inbox</span>.
            </h2>
            <p className="lede relative mx-auto mt-4">Guides, about once a month.</p>
            <div className="relative mx-auto mt-8 max-w-md">
              <Newsletter large label="Email address" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
