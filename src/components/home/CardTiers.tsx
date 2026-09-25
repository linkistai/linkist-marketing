'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, type ReactNode } from 'react';
import { CARD_TIERS, MATERIALS, type Material } from '@/content/plans';
import { CurrencySwitch, useCurrency } from '@/components/Currency';
import { formatMoney } from '@/lib/glossary';
import { STORE_URL } from '@/lib/site';

const ARC: Record<string, { src: string; alt: string }> = {
  starter: { src: '/assets/tiers/starter-arc-2x.webp', alt: 'Starter NFC cards fanned in an arc: black and silver patterned fronts with the NFC mark, and the Linkist mark on the card in the middle' },
  signature: { src: '/assets/tiers/signature-arc-2x.webp', alt: 'Signature NFC cards fanned in an arc, each showing where your name and logo go, with the Linkist mark on the card in the middle' },
};
const CARD_IMG: Record<Material, { src: string; w: number; h: number }> = {
  pvc: { src: '/assets/cards/card-pvc.webp', w: 1200, h: 781 },
  wood: { src: '/assets/cards/card-wood.webp', w: 1200, h: 774 },
  metal: { src: '/assets/cards/card-metal.webp', w: 1200, h: 780 },
};

function Seg<T extends string>({ label, options, value, onChange, mono, visibleLabel }: { label: string; options: readonly (readonly [T, string])[]; value: T; onChange: (v: T) => void; mono?: boolean; visibleLabel?: string }) {
  return (
    <div role="group" aria-label={label} className="flex items-center gap-2.5">
      {visibleLabel ? <span className="text-xs text-muted">{visibleLabel}</span> : null}
      <span className="seg">
        {options.map(([k, l]) => (
          <button key={k} type="button" className={`seg__btn ${mono ? '' : '!font-body !text-[13px]'}`} aria-pressed={value === k} onClick={() => onChange(k)}>
            {l}
          </button>
        ))}
      </span>
    </div>
  );
}

/**
 * NFC card pricing (v2): the shared USD / AED switch and a PVC/Wood/Metal toggle drive both tiers;
 * the chosen material's row is lit.
 * Each tier shows the owner's card-arc render (zooms a little on hover) and its own button to the
 * store. With `intro`, the block opens with the section head, the toggles and a card that tilts in
 * a slow 3D loop and swaps to the chosen material, sharing the same state as the tiers below.
 */
export function CardTiers({
  cta = { href: '/nfc-cards', label: 'Explore NFC cards' },
  headingLevel = 3,
  intro,
}: {
  cta?: { href: string; label: string } | null;
  headingLevel?: 2 | 3;
  intro?: { eyebrow: string; num?: string; title: ReactNode; lede: ReactNode; id?: string };
}) {
  const { currency: cur } = useCurrency();
  const [mat, setMat] = useState<Material>('metal');
  const H = headingLevel === 2 ? 'h2' : 'h3';
  const toggles = (
    <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
      <CurrencySwitch label="Show NFC card prices in" />
      <Seg label="Material" options={MATERIALS.map((m) => [m.key, m.name] as const)} value={mat} onChange={setMat} />
    </div>
  );
  const note = <p className="text-[13px] leading-normal text-muted">One-time prices.</p>;
  return (
    <div>
      {intro ? (
        <div className="grid items-center gap-[clamp(32px,5vw,72px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,440px),1fr))]">
          <div data-reveal="rise">
            <p className={`eyebrow ${intro.num ? 'eyebrow--plain' : ''}`}>
              {intro.num ? <span className="eyebrow__num">{intro.num}</span> : null}
              {intro.eyebrow}
            </p>
            <h2 id={intro.id} className="display-2 mt-[18px]">
              {intro.title}
            </h2>
            <p className="lede mt-[22px] max-w-[520px]">{intro.lede}</p>
            <div className="mt-[30px]">{toggles}</div>
            <div className="mt-[18px] max-w-[480px]">{note}</div>
          </div>
          <div className="relative flex min-h-[420px] items-center justify-center [perspective:1200px]">
            <div className="v2-glow w-[90%]" style={{ background: 'radial-gradient(circle, rgba(163,22,45,.4), transparent 62%)' }} aria-hidden="true" />
            <div className="absolute left-[-6%] top-[-4%] w-[42%] opacity-50" aria-hidden="true">
              <Image src="/assets/gen/cards-cut.webp" alt="" width={1024} height={1024} sizes="200px" className="v2-float w-full blur-[2px]" style={{ ['--float-dur' as string]: '10s' }} />
            </div>
            <div className="v2-tilt relative w-[min(92%,480px)] [transform-style:preserve-3d]">
              {MATERIALS.map((m, i) => {
                const img = CARD_IMG[m.key];
                const on = m.key === mat;
                return (
                  <Image
                    key={m.key}
                    src={img.src}
                    alt={on ? `A Linkist NFC card in ${m.name}` : ''}
                    aria-hidden={!on}
                    width={img.w}
                    height={img.h}
                    sizes="(min-width: 1024px) 480px, 90vw"
                    className={`tiltcard ${i === 0 ? 'relative' : 'absolute inset-0'}`}
                    data-on={on}
                  />
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap items-center justify-between gap-x-7 gap-y-4">
          {toggles}
          <div className="max-w-[460px]">{note}</div>
        </div>
      )}
      <div className="mt-[clamp(28px,5vw,64px)] grid gap-[18px] [grid-template-columns:repeat(auto-fit,minmax(min(100%,380px),1fr))]" data-reveal="rise" data-reveal-stagger="0.08">
        {CARD_TIERS.map((t) => {
          const featured = t.key === 'signature';
          return (
            <article key={t.key} className={`card card--panel relative flex flex-col gap-[22px] p-[clamp(20px,2.6vw,30px)] ${featured ? 'card--featured' : ''}`}>
              {t.badge ? <span className="plan-badge">{t.badge}</span> : null}
              <div className="tierarc">
                <Image src={ARC[t.key]!.src} alt={ARC[t.key]!.alt} fill sizes="(min-width: 768px) 560px, 90vw" className="object-cover" />
              </div>
              <div>
                <H className="font-display text-[28px] font-semibold tracking-[-0.025em]">{t.name}</H>
                <p className="mt-1.5 text-sm text-body">{t.blurb}</p>
              </div>
              <dl className="m-0 flex flex-col gap-1">
                {MATERIALS.map((m) => (
                  <div key={m.key} className="tierrow" data-on={m.key === mat}>
                    <dt className="text-sm text-soft">{m.name}</dt>
                    <dd className="m-0 text-right">
                      <span className="font-mono text-[15px] font-semibold tabular">{formatMoney(t.prices[cur][m.key], cur)}</span>
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="mt-auto flex flex-col gap-2.5">
                <a href={STORE_URL} className={`btn ${featured ? 'btn--primary' : 'btn--secondary'} w-full !min-h-[50px] !text-[15px]`}>
                  Get your {t.name} NFC card
                </a>
                <p className="text-center text-xs italic text-muted">PRM Essential plan included</p>
              </div>
            </article>
          );
        })}
      </div>
      {cta ? (
        <div className="mt-10 text-center" data-reveal="rise">
          <p className="text-sm text-muted">No card yet? Use Linkist PRM on its own and add one later.</p>
          <p className="mt-1 text-sm text-muted">Or save with a card and PRM Pro bundle.</p>
          <Link href={cta.href} className="btn btn--secondary mt-[22px] !min-h-[50px] !px-[26px] !text-[15px]">
            {cta.label}
          </Link>
        </div>
      ) : null}
    </div>
  );
}
