import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { GetApp, GetCard } from '@/components/Button';
import { AuthorRow, BlogCard } from '@/components/blog/BlogList';
import { ClosingBand } from '@/components/ClosingBand';
import { Section } from '@/components/Section';
import { ShareRow } from '@/components/ShareRow';
import { Toc } from '@/components/Toc';
import { getPost, getPosts, related, renderPost } from '@/lib/blog';
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

/** One article, in the structure of the old site's post page (D18): header, cover, chapters at the side, the body, FAQ JSON-LD, related reads. */
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
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="section section--tight section--glow pt-8 sm:pt-10">
        <div className="container">
          <Breadcrumbs items={[{ label: 'Blog', href: '/blogs' }, { label: post.title, href: `/blogs/${post.slug}` }]} />
          <header className="mt-8 max-w-4xl">
            <p className="eyebrow">{post.categoryLabel}</p>
            <h1 className="display-2 mt-5">{post.title}</h1>
            <p className="lede mt-5">{post.excerpt}</p>
            <div className="mt-6">
              <AuthorRow author={post.author} dateLabel={`Published ${post.dateLabel}`} minutes={post.minutes} size="md" />
            </div>
          </header>
          {post.coverKind === 'card' ? null : (
            <figure className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-3xl border border-line">
              <Image src={post.cover} alt={post.coverAlt} fill priority sizes="(max-width: 1280px) 100vw, 1280px" style={{ objectFit: 'cover' }} />
            </figure>
          )}
        </div>
      </section>

      <Section tone="charcoal" tight>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px]">
          <article className="prose-lk min-w-0 max-w-3xl">
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
            <div className="mt-12 flex flex-col items-start gap-5 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-3">
                <GetApp />
                <GetCard />
              </div>
              <ShareRow url={url} title={post.title} />
            </div>
          </article>
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Toc chapters={post.chapters.filter((c) => c.level === 2)} title="In this article" />
            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-[0.04em] text-muted">Read next</p>
              <ul className="mt-3 flex flex-col gap-3 text-sm">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link href={`/blogs/${o.slug}`} className="font-semibold no-underline hover:underline">
                      {o.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Section>

      <Section tight id="related">
        <p className="eyebrow">More from the blog</p>
        <h2 className="display-2 mt-4">Related reading.</h2>
        <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3" data-reveal="rise" data-reveal-stagger="0.05">
          {others.map((o) => (
            <li key={o.slug} className="flex">
              <BlogCard post={o} />
            </li>
          ))}
        </ul>
      </Section>

      <ClosingBand />
    </>
  );
}
