import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { GetApp, GetCard } from '@/components/Button';
import { AuthorRow, BlogCard } from '@/components/blog/BlogList';
import { ClosingBand } from '@/components/ClosingBand';
import { ShareRow } from '@/components/ShareRow';
import { Toc } from '@/components/Toc';
import { getPost, getPosts, related, renderPost } from '@/lib/blog';
import { CATEGORY_IMAGE } from '@/lib/blog-shared';
import { COMPANY, SITE_URL, absoluteAsset, pageMeta } from '@/lib/site';

export const dynamicParams = false;
export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  return pageMeta(p.title, p.excerpt, `/blogs/${p.slug}`, { type: 'article', image: `/og/blogs-${p.slug}.png`, publishedTime: p.date, modifiedTime: p.date });
}

/** One article (v2): H1, excerpt and byline, the 16:8 category scene, the 760 px body with a sticky contents and read-next sidebar, share row, related reads and the closing band. Article and FAQPage JSON-LD as before. */
export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const raw = getPost(slug);
  if (!raw) notFound();
  const post = renderPost(raw);
  const url = `${SITE_URL}/blogs/${post.slug}`;
  const others = related(post).map((p) => {
    const r = renderPost(p);
    return { slug: p.slug, category: p.category, categoryLabel: p.categoryLabel, title: p.title, excerpt: p.excerpt, author: p.author, dateLabel: p.dateLabel, cover: p.cover, minutes: r.minutes };
  });
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      dateModified: post.date,
      author: { '@type': 'Person', name: post.author },
      publisher: { '@type': 'Organization', name: 'Linkist', legalName: COMPANY, logo: { '@type': 'ImageObject', url: absoluteAsset('/icon.png') } },
      mainEntityOfPage: url,
      image: [absoluteAsset(post.cover)],
      articleSection: post.categoryLabel,
      wordCount: post.words,
    },
    ...(post.faq.length
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: post.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
          },
        ]
      : []),
  ];
  const img = CATEGORY_IMAGE[post.category];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="page-hero !pb-[clamp(28px,4vw,48px)]" aria-labelledby="page-title">
        <div className="container">
          <div className="mb-7">
            <Breadcrumbs items={[{ label: 'Blog', href: '/blogs' }, { label: post.title, href: `/blogs/${post.slug}` }]} />
          </div>
          <header className="max-w-[900px]">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-coral" data-hero-text>
              {post.categoryLabel}
            </p>
            <h1 id="page-title" className="mt-5 font-display text-[clamp(34px,4.6vw,64px)] font-semibold leading-[1.04] tracking-[-0.04em] [text-wrap:balance]" data-hero-text>
              {post.title}
            </h1>
            <p className="lede mt-5 max-w-[760px]" data-hero-text>
              {post.excerpt}
            </p>
            <div className="mt-7" data-hero-text>
              <AuthorRow author={post.author} dateLabel={`Published ${post.dateLabel}`} minutes={post.minutes} size="md" />
            </div>
          </header>
          <figure className="relative mt-[clamp(32px,5vw,56px)] aspect-[16/8] w-full overflow-hidden rounded-[28px] border border-line bg-bg-alt">
            <Image src={img.src} alt={img.alt} fill priority sizes="(max-width: 1280px) 100vw, 1280px" className="object-cover" />
          </figure>
        </div>
      </section>

      <section className="section !pt-[clamp(24px,4vw,48px)]">
        <div className="container grid gap-[clamp(40px,6vw,88px)] lg:grid-cols-[minmax(0,760px)_280px] lg:justify-between">
          <article className="min-w-0">
            <div className="prose-lk" dangerouslySetInnerHTML={{ __html: post.html }} />
            <div className="mt-14 flex flex-col items-start gap-5 border-t border-line pt-8 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-3">
                <GetApp />
                <GetCard />
              </div>
              <ShareRow url={url} title={post.title} />
            </div>
          </article>
          <aside className="lg:sticky lg:top-[110px] lg:self-start">
            <Toc chapters={post.chapters.filter((c) => c.level === 2)} title="In this article" />
            <nav aria-label="Read next" className="mt-10">
              <p className="text-xs font-semibold uppercase tracking-[0.06em] text-muted">Read next</p>
              <ul className="mt-3 flex flex-col gap-1">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link href={`/blogs/${o.slug}`} className="flex min-h-[44px] items-center text-sm font-medium leading-snug text-soft no-underline transition-colors hover:text-white">
                      {o.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>
      </section>

      <section className="section bg-bg-alt" id="related" aria-labelledby="related-title">
        <div className="container">
          <p className="eyebrow">More from the blog</p>
          <h2 id="related-title" className="display-2 mt-4">
            Related <span className="em-coral">reading</span>.
          </h2>
          <ul className="mt-10 grid gap-[18px] [grid-template-columns:repeat(auto-fill,minmax(min(100%,320px),1fr))]" data-reveal="rise" data-reveal-stagger="0.05">
            {others.map((o) => (
              <li key={o.slug} className="flex">
                <BlogCard post={o} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ClosingBand />
    </>
  );
}
