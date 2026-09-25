import Image from 'next/image';

const LAYERS = ['layer-4', 'layer-3', 'layer-2', 'layer-1'] as const;

/**
 * The Linkist NFC card taken apart (owner, 25 September 2026), from the card stack on
 * linkist.ai/digital-business-card: there it opens only on hover; here it runs on its own in a
 * loop. The closed card rests, the four layers (printed face, core, NFC inlay, back) lift apart
 * with a light sweeping the face, hold, and settle back. With motion off it stands open.
 */
export function NfcCardLayers({ className = '' }: { className?: string }) {
  return (
    <figure className={`cardlayers ${className}`} role="img" aria-label="A Linkist NFC card opening into its layers: the printed face, the core, the NFC inlay and the back, then closing again">
      <div className="cardlayers__scene" aria-hidden="true">
        {LAYERS.map((l) => (
          <div key={l} className={`cardlayers__layer cardlayers__layer--${l.slice(-1)}`}>
            <Image src={`/assets/cards/stack/${l}.webp`} alt="" fill sizes="(min-width: 1024px) 460px, 80vw" className="object-contain" />
          </div>
        ))}
        <div className="cardlayers__layer cardlayers__closed">
          <Image src="/assets/cards/stack/closed.webp" alt="" fill priority sizes="(min-width: 1024px) 460px, 80vw" className="object-contain" />
        </div>
      </div>
    </figure>
  );
}
