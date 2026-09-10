'use client';

import { useRef, type PointerEvent } from 'react';
import { NfcCard, NfcCardBack } from '@/components/NfcCard';
import { MATERIALS } from '@/content/plans';

/**
 * The NFC cards page hero (D35): the three materials as a stacked deck. Every 6 s the front card
 * lifts, turns to show its back and slides to the rear while the next card comes forward; the
 * whole deck tilts a few degrees towards the pointer on desktop. CSS keyframes drive the shuffle
 * (motion off leaves the stack still); the tilt is the only script, two custom properties.
 */
export function CardDeck() {
  const scene = useRef<HTMLDivElement>(null);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || !scene.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    scene.current.style.setProperty('--tx', `${(x * 16).toFixed(1)}deg`);
    scene.current.style.setProperty('--ty', `${(-y * 12).toFixed(1)}deg`);
  };
  const onLeave = () => {
    scene.current?.style.setProperty('--tx', '0deg');
    scene.current?.style.setProperty('--ty', '0deg');
  };

  return (
    <div className="carddeck" onPointerMove={onMove} onPointerLeave={onLeave} role="group" aria-label="Signature cards in black PVC, cherry wood and brushed metal, shuffling, example name">
      <div ref={scene} className="carddeck__scene">
        {MATERIALS.map((m, i) => (
          <div key={m.key} className={`carddeck__card carddeck__card--${i + 1}`}>
            <div className="face3d">
              <NfcCard material={m.key} tier="signature" name="Olivia Jones" meta="NYU Abu Dhabi" sizes="(min-width: 640px) 420px, 80vw" priority={i === 0} />
            </div>
            <div className="face3d face3d--back">
              <NfcCardBack material={m.key} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
