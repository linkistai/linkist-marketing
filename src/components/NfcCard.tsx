import Image from 'next/image';
import type { Material } from '@/content/plans';

/**
 * Card faces rendered with Nano Banana 2 through Magnific (D35), cut out and delivered by
 * `pnpm imagery` into public/assets/cards: a front and a back per material. The renders carry
 * the chip and the NFC wave only; the mark is the real brand file composited here at one size,
 * and the name and company are HTML, so nothing is generated as a logo or as text. Product
 * photographs from the client replace the eight files when they arrive (C3), nothing else changes.
 */
type Finish = Material | 'founders';
const FACE: Record<Finish, string> = {
  pvc: '/assets/cards/pvc-2x.webp',
  wood: '/assets/cards/wood-2x.webp',
  metal: '/assets/cards/metal-2x.webp',
  founders: '/assets/cards/founders-2x.webp',
};
const BACK: Record<Finish, string> = {
  pvc: '/assets/cards/pvc-back-2x.webp',
  wood: '/assets/cards/wood-back-2x.webp',
  metal: '/assets/cards/metal-back-2x.webp',
  founders: '/assets/cards/founders-back-2x.webp',
};
const FINISH: Record<Finish, string> = { pvc: 'black PVC', wood: 'cherry wood', metal: 'brushed metal', founders: 'the Founders Circle finish' };

export function NfcCard({ material, tier, name, meta, className = '', sizes = '(min-width: 640px) 420px, 80vw', priority = false, portrait = false }: { material: Finish; tier: 'starter' | 'signature' | 'founders'; name?: string; meta?: string; className?: string; sizes?: string; priority?: boolean; portrait?: boolean }) {
  const label = tier === 'starter' ? 'Starter' : tier === 'signature' ? 'Signature' : 'Founders Circle';
  if (portrait) {
    // The card standing upright (D42): the landscape render turned a quarter, the mark and the name kept upright.
    return (
      <div className={`nfc-portrait ${className}`} role="img" aria-label={`${label} card in ${FINISH[material]}, upright${name ? `, example name ${name}` : ''}`}>
        <div className={`nfc nfc--img nfc--${material} nfc-portrait__face`} aria-hidden="true">
          <Image src={FACE[material]} alt="" fill sizes={sizes} className="nfc__face" draggable={false} priority={priority} />
        </div>
        <Image src="/brand/mark.png" alt="" width={48} height={48} className="nfc-portrait__mark" aria-hidden="true" draggable={false} />
        {tier !== 'starter' ? (
          <span className="nfc-portrait__text">
            <span className="nfc__name">{name ?? 'Your name'}</span>
            <span className="nfc__meta">{meta ?? 'Your company'}</span>
          </span>
        ) : null}
      </div>
    );
  }
  return (
    <div className={`nfc-wrap ${className}`}>
      <div className={`nfc nfc--img nfc--${material}`} role="img" aria-label={`${label} card in ${FINISH[material]}${name ? `, example name ${name}` : ''}`}>
        <Image src={FACE[material]} alt="" fill sizes={sizes} className="nfc__face" draggable={false} priority={priority} />
        <Image src="/brand/mark.png" alt="" width={48} height={48} className="nfc__mark" aria-hidden="true" draggable={false} />
        {tier !== 'starter' ? (
          <>
            <span className="nfc__name">{name ?? 'Your name'}</span>
            <span className="nfc__meta">{meta ?? 'Your company'}</span>
          </>
        ) : (
          <span className="nfc__meta">linkist.ai</span>
        )}
      </div>
    </div>
  );
}

/** The back of a card: the rendered back of the same material with the mark composited small, for the hero flip and the deck. */
export function NfcCardBack({ material, sizes = '(min-width: 640px) 420px, 80vw', portrait = false }: { material: Finish; sizes?: string; portrait?: boolean }) {
  if (portrait) {
    return (
      <div className="nfc-portrait" aria-hidden="true">
        <div className={`nfc nfc--img nfc--back nfc--${material} nfc-portrait__face`}>
          <Image src={BACK[material]} alt="" fill sizes={sizes} className="nfc__face" draggable={false} />
        </div>
        <Image src="/brand/mark.png" alt="" width={48} height={48} className="nfc-portrait__mark" draggable={false} />
      </div>
    );
  }
  return (
    <div className={`nfc nfc--img nfc--back nfc--${material}`} aria-hidden="true">
      <Image src={BACK[material]} alt="" fill sizes={sizes} className="nfc__face" draggable={false} />
      <Image src="/brand/mark.png" alt="" width={48} height={48} className="nfc__mark" draggable={false} />
      <span className="nfc__meta nfc__meta--right">linkist.ai</span>
    </div>
  );
}
