import type { ReactNode } from 'react';
import { ScreenFrame } from '@/components/ScreenFrame';
import { SectionHead } from '@/components/Section';
import { PROTO_ALT, PROTO_CAPTIONS, type ProtoScreen } from '@/content/design';
import { screen } from '@/lib/screens';

/**
 * A "design preview" section (v2): a split head, then one card per screen, each with its /0n
 * number, a one-line title and the screen in a phone. The section ends with the preview note.
 */
export function DesignPreview({ id, eyebrow, title, body, items, tone = 'bg' }: { id: string; eyebrow: string; title: ReactNode; body: string; items: readonly { screen: ProtoScreen; title: string }[]; tone?: 'bg' | 'charcoal' }) {
  return (
    <section id={id} className={`section ${tone === 'charcoal' ? 'section--charcoal' : ''}`}>
      <div className="container">
        <SectionHead eyebrow={eyebrow} title={title} lede={body} />
        <ul className="m-0 mt-[clamp(40px,5vw,64px)] grid list-none gap-3.5 p-0 [grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr))]" data-reveal="rise" data-reveal-stagger="0.08">
          {items.map((it, i) => (
            <li key={it.screen} className="card flex flex-col gap-6 p-[clamp(22px,2.6vw,32px)]">
              <span aria-hidden="true" className="font-mono text-[13px] text-coral">
                /{String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="display-3 !text-[20px]">{it.title}</h3>
              <div className="mx-auto w-full max-w-[220px]">
                <ScreenFrame kind="phone" src={screen(it.screen)} alt={PROTO_ALT[it.screen] ?? PROTO_CAPTIONS[it.screen]} preview full className="!max-w-none" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
