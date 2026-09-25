'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { CATEGORY_IMAGE, CATEGORY_LABELS, initials, type BlogCategory } from '@/lib/blog-shared';

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

/** Category filter pills (v2 pill tabs, client-side) and the three-column article grid. */
export function BlogList({ posts }: { posts: readonly BlogCardData[] }) {
  const [cat, setCat] = useState<BlogCategory | 'all'>('all');
  const shown = cat === 'all' ? posts : posts.filter((p) => p.category === cat);
  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter articles by category">
        {FILTERS.map((f) => (
          <button key={f.key} type="button" className="pilltab !px-4 !text-[13px]" aria-pressed={cat === f.key} onClick={() => setCat(f.key)}>
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
        <ul className="mt-10 grid gap-[18px] [grid-template-columns:repeat(auto-fill,minmax(min(100%,320px),1fr))]" data-reveal="rise" data-reveal-stagger="0.05">
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
    <div className="flex items-center gap-3">
      <span aria-hidden="true" className={`inline-grid flex-none place-items-center rounded-full bg-crimson font-semibold text-white ${big ? 'h-10 w-10 text-[13px]' : 'h-8 w-8 text-[11px]'}`}>
        {initials(author)}
      </span>
      <span className="flex flex-col leading-tight">
        <span className={`font-semibold text-text ${big ? 'text-sm' : 'text-[13px]'}`}>{author}</span>
        <span className="mt-0.5 text-xs text-muted">
          {dateLabel} <span aria-hidden="true">·</span> {minutes} min read
        </span>
      </span>
    </div>
  );
}

/** A blog card (v2): the category scene, the category in mono coral, title, excerpt and byline. */
export function BlogCard({ post, priority }: { post: BlogCardData; priority?: boolean }) {
  const img = CATEGORY_IMAGE[post.category];
  return (
    <Link href={`/blogs/${post.slug}`} className="card card--panel group flex w-full flex-col overflow-hidden no-underline transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-[rgba(238,80,100,0.35)]">
      <span className="relative block aspect-[16/10] w-full overflow-hidden bg-bg-alt">
        <Image src={img.src} alt="" fill sizes="(max-width: 768px) 100vw, (max-width: 1180px) 50vw, 400px" priority={priority} className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
      </span>
      <span className="flex flex-1 flex-col p-[22px]">
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-coral">{post.categoryLabel}</span>
        <h3 className="mt-2.5 font-display text-[21px] font-semibold leading-[1.2] tracking-[-0.02em] text-text">{post.title}</h3>
        <p className="mt-2.5 flex-1 text-sm leading-[1.55] text-body" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {post.excerpt}
        </p>
        <span className="mt-5 block">
          <AuthorRow author={post.author} dateLabel={post.dateLabel} minutes={post.minutes} />
        </span>
      </span>
    </Link>
  );
}
