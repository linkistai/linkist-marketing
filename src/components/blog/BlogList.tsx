'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { CATEGORY_LABELS, initials, type BlogCategory } from '@/lib/blog-shared';

export interface BlogCardData {
  readonly slug: string;
  readonly category: BlogCategory;
  readonly categoryLabel: string;
  readonly title: string;
  readonly excerpt: string;
  readonly author: string;
  readonly dateLabel: string;
  readonly cover: string;
  readonly minutes: number;
}

const FILTERS: readonly { key: BlogCategory | 'all'; label: string }[] = [{ key: 'all', label: 'All' }, ...(Object.keys(CATEGORY_LABELS) as BlogCategory[]).map((k) => ({ key: k, label: CATEGORY_LABELS[k] }))];

/** Category filter pills and the article grid, as on the old site's blog page (D18). */
export function BlogList({ posts }: { posts: readonly BlogCardData[] }) {
  const [cat, setCat] = useState<BlogCategory | 'all'>('all');
  const shown = cat === 'all' ? posts : posts.filter((p) => p.category === cat);
  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter articles by category">
        {FILTERS.map((f) => (
          <button key={f.key} type="button" className="intent !min-h-[38px] text-sm" aria-pressed={cat === f.key} onClick={() => setCat(f.key)}>
            {f.label}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {shown.length} article{shown.length === 1 ? '' : 's'}
      </p>
      {shown.length === 0 ? (
        <p className="mt-10 text-body">No articles in this category yet.</p>
      ) : (
        <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3" data-reveal="rise" data-reveal-stagger="0.05">
          {shown.map((p) => (
            <li key={p.slug} className="flex">
              <BlogCard post={p} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function AuthorRow({ author, dateLabel, minutes, size = 'sm' }: { author: string; dateLabel: string; minutes: number; size?: 'sm' | 'md' }) {
  const big = size === 'md';
  return (
    <div className={`flex items-center gap-3 ${big ? 'text-sm' : 'text-xs'} text-muted`}>
      <span aria-hidden="true" className={`inline-grid flex-none place-items-center rounded-full font-semibold text-white ${big ? 'h-9 w-9 text-xs' : 'h-7 w-7 text-[10px]'}`} style={{ background: 'var(--brand-crimson)' }}>
        {initials(author)}
      </span>
      <span className="flex flex-wrap items-center gap-x-2">
        <span className="font-medium text-text">{author}</span>
        <span aria-hidden="true">·</span>
        <span>{dateLabel}</span>
        <span aria-hidden="true">·</span>
        <span>{minutes} min read</span>
      </span>
    </div>
  );
}

export function BlogCard({ post, priority }: { post: BlogCardData; priority?: boolean }) {
  return (
    <Link href={`/blogs/${post.slug}`} className="card sweep sweep--neutral lift flex w-full flex-col overflow-hidden no-underline">
      <span className="relative block aspect-[3/2] w-full overflow-hidden">
        <Image src={post.cover} alt="" fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px" priority={priority} style={{ objectFit: 'cover' }} />
        <span className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.06em] text-white" style={{ background: 'rgba(20,20,19,0.72)', backdropFilter: 'blur(6px)' }}>
          {post.categoryLabel}
        </span>
      </span>
      <span className="flex flex-1 flex-col p-6">
        <h3 className="display-3 text-[20px]">{post.title}</h3>
        <p className="mt-2 flex-1 text-sm text-body" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {post.excerpt}
        </p>
        <span className="mt-5 block">
          <AuthorRow author={post.author} dateLabel={post.dateLabel} minutes={post.minutes} />
        </span>
      </span>
    </Link>
  );
}
