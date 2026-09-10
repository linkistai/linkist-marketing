import { Check } from 'lucide-react';
import type { CSSProperties, ReactNode } from 'react';
import { ScreenFrame } from '@/components/ScreenFrame';
import { Section } from '@/components/Section';
import { DESIGN_NOTE, PROTO_ALT, PROTO_CAPTIONS, type ProtoScreen } from '@/content/design';
import { screen } from '@/lib/screens';

/**
 * A labelled "design preview" section (Grownz D23): copy on one side, one to three phones from the
 * approved prototype on the other. Server component; `screen()` resolves the crop at build time.
 */
export function DesignPreview({ id, eyebrow, title, body, bullets, screens, tone = 'bg', flip }: { id: string; eyebrow: string; title: ReactNode; body: string; bullets: readonly string[]; screens: readonly ProtoScreen[]; tone?: 'bg' | 'charcoal' | 'lifted'; flip?: boolean }) {
  return (
    <Section id={id} tone={tone}>
      <div className={`grid items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] ${flip ? 'lg:[&>*:first-child]:order-2' : ''}`}>
        <div data-reveal="rise">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="display-2 mt-4">{title}</h2>
          <p className="lede mt-4">{body}</p>
          <ul className="mt-6 flex flex-col gap-2 text-sm">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-2">
                <Check size={16} aria-hidden="true" className="mt-0.5 flex-none text-coral" />
                <span className="text-body">{b}</span>
              </li>
            ))}
          </ul>
          <p className="disclaimer mt-6">{DESIGN_NOTE}</p>
        </div>
        <div className="py-2 sm:py-6" data-reveal="rise">
          <ProtoRow screens={screens} />
        </div>
      </div>
    </Section>
  );
}

/** One to three prototype phones, fanned on wide screens and a snap strip on phones. */
export function ProtoRow({ screens, className = '' }: { screens: readonly ProtoScreen[]; className?: string }) {
  return (
    <ul className={`preview-row ${className}`} data-count={screens.length} aria-label="Design preview screens, scroll sideways on small screens" tabIndex={0}>
      {screens.map((s, i) => (
        <li key={s} className="preview-row__item" style={{ '--i': i - (screens.length - 1) / 2 } as CSSProperties}>
          <ScreenFrame kind="phone" src={screen(s)} alt={PROTO_ALT[s]} preview full className="!max-w-none" />
          <p className="preview-row__caption">{PROTO_CAPTIONS[s]}</p>
        </li>
      ))}
    </ul>
  );
}
