'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

export interface UseCaseCard {
  readonly slug: string;
  readonly short: string;
  readonly title: string;
  readonly problem: string;
  readonly steps: readonly string[];
  readonly result: string;
  readonly chips: readonly string[];
  readonly img: string;
  readonly alt: string;
}

/**
 * Use cases (v2): five portrait scene cards. A card opens a detail drawer from the right with the
 * problem, the steps, the result and the capabilities, plus previous and next and a link to the
 * full use-case page. The drawer is a modal dialog: focus moves in, Escape or the backdrop close
 * it, and focus returns to the card that opened it.
 */
export function UseCaseCards({ items }: { items: readonly UseCaseCard[] }) {
  const [open, setOpen] = useState(-1);
  const opener = useRef<HTMLButtonElement | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const n = items.length;

  const close = useCallback(() => {
    setOpen(-1);
    opener.current?.focus();
  }, []);

  useEffect(() => {
    if (open < 0) return;
    closeBtn.current?.focus();
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [open, close]);

  const uc = open >= 0 ? items[open] : undefined;
  return (
    <>
      <ul aria-label={`${n} use cases`} className="m-0 mt-[clamp(40px,5vw,64px)] grid list-none gap-3.5 p-0 [grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr))]" data-reveal="rise" data-reveal-stagger="0.08">
        {items.map((u, i) => (
          <li key={u.slug} className="min-w-0">
            <button
              type="button"
              className="uccard"
              aria-haspopup="dialog"
              onClick={(e) => {
                opener.current = e.currentTarget;
                setOpen(i);
              }}
            >
              <span className="uccard__img">
                <Image src={u.img} alt={u.alt} fill sizes="(min-width: 1240px) 240px, (min-width: 640px) 45vw, 90vw" className="object-cover" />
                <span className="uccard__shade" aria-hidden="true" />
                <span className="uccard__num" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="uccard__foot">
                  <span className="uccard__title">{u.short}</span>
                  <span className="uccard__go" aria-hidden="true">
                    <ArrowRight size={16} />
                  </span>
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
      {uc ? (
        <>
          <div className="ucdrawer__backdrop" onClick={close} aria-hidden="true" />
          <aside role="dialog" aria-modal="true" aria-labelledby="uc-d-title" className="ucdrawer">
            <div className="relative aspect-[4/3] flex-none overflow-hidden">
              <Image src={uc.img} alt={uc.alt} fill sizes="520px" className="object-cover" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,11,0)_40%,#0a0a0b)]" aria-hidden="true" />
              <button ref={closeBtn} type="button" onClick={close} aria-label="Close" className="ucdrawer__close">
                <X size={18} aria-hidden="true" />
              </button>
            </div>
            <div className="flex flex-col gap-[22px] px-8 pb-10 pt-2">
              <p className="eyebrow eyebrow--plain !tracking-[0.14em]">
                {String(open + 1).padStart(2, '0')} · {uc.short}
              </p>
              <h3 id="uc-d-title" className="font-display text-[30px] font-semibold leading-[1.1] tracking-[-0.03em]">
                {uc.title}
              </h3>
              <p className="text-base leading-relaxed text-body">{uc.problem}</p>
              <ol className="m-0 flex list-none flex-col gap-2.5 p-0">
                {uc.steps.map((s, j) => (
                  <li key={s} className="flex items-start gap-3.5 rounded-[14px] border border-white/[0.06] bg-[#111112] px-4 py-3.5 text-[15px] leading-normal">
                    <span className="flex-none pt-0.5 font-mono text-xs text-coral">{String(j + 1).padStart(2, '0')}</span>
                    {s}
                  </li>
                ))}
              </ol>
              <p className="outcome !text-[19px]">
                <span className="outcome__label">Result</span>
                {uc.result}
              </p>
              <ul className="flex flex-wrap gap-1.5" aria-label="Capabilities">
                {uc.chips.map((c) => (
                  <li key={c} className="rounded-full border border-white/[0.16] px-3 py-1.5 text-xs text-soft">
                    {c}
                  </li>
                ))}
              </ul>
              <Link href={`/use-cases/${uc.slug}`} className="link">
                Read the use case
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <div className="flex justify-between gap-2.5 border-t border-line pt-2">
                <button type="button" className="btn btn--secondary btn--sm !font-normal" onClick={() => setOpen((open + n - 1) % n)}>
                  ← {items[(open + n - 1) % n]?.short}
                </button>
                <button type="button" className="btn btn--secondary btn--sm !font-normal" onClick={() => setOpen((open + 1) % n)}>
                  {items[(open + 1) % n]?.short} →
                </button>
              </div>
            </div>
          </aside>
        </>
      ) : null}
    </>
  );
}
