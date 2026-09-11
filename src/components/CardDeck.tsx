'use client';

import { useRef, type PointerEvent } from 'react';
import { NfcCard, NfcCardBack } from '@/components/NfcCard';
import { MATERIALS } from '@/content/plans';

/**
 * The NFC cards page hero (D35, D38): the three materials revolve slowly on a ring, fronts and
 * backs visible as they pass, nothing else. The ring tilts a few degrees towards the pointer on
 * desktop. CSS keyframes drive the revolve (motion off leaves the ring still); the tilt is the
 * only script, two custom properties.
 */
export function CardDeck() {
  const scene = useRef<HTMLDivElement>(null);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || !scene.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    scene.current.style.setProperty('--tx', `${(x * 14).toFixed(1)}deg`);
    scene.current.style.setProperty('--ty', `${(-y * 10).toFixed(1)}deg`);
  };
  const onLeave = () => {
    scene.current?.style.setProperty('--tx', '0deg');
    scene.current?.style.setProperty('--ty', '0deg');
  };

  return (
    <div className="carddeck" onPointerMove={onMove} onPointerLeave={onLeave} role="group" aria-label="Signature cards in black PVC, cherry wood and brushed metal revolving, example name">
      <div ref={scene} className="carddeck__scene">
        <div className="carddeck__ring">
          {MATERIALS.map((m, i) => (
            <div key={m.key} className={`carddeck__card carddeck__card--${i + 1}`}>
              <div className="face3d">
                <NfcCard material={m.key} tier="signature" name="Olivia Jones" meta="NYU Abu Dhabi" sizes="(min-width: 640px) 380px, 70vw" priority={i === 0} />
              </div>
              <div className="face3d face3d--back">
                <NfcCardBack material={m.key} sizes="(min-width: 640px) 380px, 70vw" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
