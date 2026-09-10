import Image from 'next/image';
import { Nfc } from 'lucide-react';
import type { Material } from '@/content/plans';

/**
 * Card faces rendered with Nano Banana 2 through Magnific from the real brand mark (D35), cut out
 * and delivered by `pnpm imagery` into public/assets/cards. The mark, chip and NFC wave are in the
 * picture; the name and company are HTML, so no text is ever generated. Product photographs from
 * the client replace the four files when they arrive (C3), nothing else changes.
 */
const FACE: Record<Material | 'founders', string> = {
  pvc: '/assets/cards/pvc-2x.webp',
  wood: '/assets/cards/wood-2x.webp',
  metal: '/assets/cards/metal-2x.webp',
  founders: '/assets/cards/founders-2x.webp',
};

const FINISH: Record<Material | 'founders', string> = { pvc: 'black PVC', wood: 'cherry wood', metal: 'brushed metal', founders: 'the Founders Circle finish' };

export function NfcCard({ material, tier, name, meta, className = '', sizes = '(min-width: 640px) 420px, 80vw', priority = false }: { material: Material | 'founders'; tier: 'starter' | 'signature' | 'founders'; name?: string; meta?: string; className?: string; sizes?: string; priority?: boolean }) {
  const label = tier === 'starter' ? 'Starter' : tier === 'signature' ? 'Signature' : 'Founders Circle';
  return (
    <div className={`nfc-wrap ${className}`}>
      <div className={`nfc nfc--img nfc--${material}`} role="img" aria-label={`${label} card in ${FINISH[material]}${name ? `, example name ${name}` : ''}`}>
        <Image src={FACE[material]} alt="" fill sizes={sizes} className="nfc__face" draggable={false} priority={priority} />
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

/** The back of a card, drawn from the tokens, for the hero flip: the material's tone, the mark centred, the wave. */
export function NfcCardBack({ material }: { material: Material | 'founders' }) {
  return (
    <div className={`nfc nfc--back nfc--${material}`} aria-hidden="true">
      <Image src="/brand/mark.png" alt="" width={48} height={48} className="nfc__mark nfc__mark--centre" />
      <span className="nfc__meta nfc__meta--centre">linkist.ai</span>
      <Nfc className="nfc__wave" size={16} />
    </div>
  );
}
