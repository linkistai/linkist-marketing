import Image from 'next/image';
import { Nfc } from 'lucide-react';
import type { Material } from '@/content/plans';

/**
 * NFC card visualiser (brief 5): the three materials as tilted cards with a specular sweep on
 * hover, drawn with CSS from the tokens. The mark is the real brand asset; the name is an example.
 * Product photographs from the client replace these when they arrive (brief 8).
 */
export function NfcCard({ material, tier, name, meta, className = '' }: { material: Material | 'founders'; tier: 'starter' | 'signature' | 'founders'; name?: string; meta?: string; className?: string }) {
  const label = tier === 'starter' ? 'Starter' : tier === 'signature' ? 'Signature' : 'Founders Circle';
  return (
    <div className={`nfc-wrap ${className}`}>
      <div className={`nfc nfc--${material}`} role="img" aria-label={`${label} card in ${material === 'founders' ? 'the Founders Circle finish' : material}${name ? `, example name ${name}` : ''}`}>
        <Image src="/brand/mark.png" alt="" width={48} height={48} className="nfc__mark" aria-hidden="true" />
        <span className="nfc__chip" aria-hidden="true" />
        {tier !== 'starter' ? (
          <>
            <span className="nfc__name">{name ?? 'Your name'}</span>
            <span className="nfc__meta">{meta ?? 'Your company'}</span>
          </>
        ) : (
          <span className="nfc__meta">linkist.ai</span>
        )}
        <Nfc className="nfc__wave" size={16} aria-hidden="true" />
      </div>
    </div>
  );
}
