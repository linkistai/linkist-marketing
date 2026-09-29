'use client';

import Image from 'next/image';
import { Maximize2, X } from 'lucide-react';
import { useLayoutEffect, useRef, useState, type MouseEvent } from 'react';

/**
 * A picture that opens large when tapped or clicked (owner, 29 September 2026: the bundle renders,
 * so the "Front" and "Back" labels on the Founders Circle card can be read). The thumbnail fills its
 * positioned parent; the large view is a native modal dialog, so Esc, the close button or a click
 * outside closes it and focus goes back to the picture. Where the screen is narrower than the file,
 * a tap on the large picture zooms it to the file's own size under the finger, and a second tap fits it again.
 */
export function ZoomImage({ src, alt, width, height, sizes }: { src: string; alt: string; width: number; height: number; sizes: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [zoomed, setZoomed] = useState(false);
  /** Where the zoom was asked for: the share of the picture across and down, and the point on screen. */
  const focus = useRef<{ fx: number; fy: number; x: number; y: number } | null>(null);
  useLayoutEffect(() => {
    const d = dialog.current;
    const f = focus.current;
    if (!zoomed || !d || !f) return;
    // After the picture has grown, scroll so the point that was tapped stays under the finger.
    const z = d.querySelector<HTMLImageElement>('.lightbox__img')?.getBoundingClientRect();
    if (!z) return;
    d.scrollLeft += z.left + f.fx * z.width - f.x;
    d.scrollTop += z.top + f.fy * z.height - f.y;
    focus.current = null;
  }, [zoomed]);
  const open = () => {
    const d = dialog.current;
    if (!d || d.open) return;
    setZoomed(false);
    d.showModal();
    document.documentElement.classList.add('lk-modal-open');
  };
  const close = () => dialog.current?.close();
  const canZoom = () => typeof window !== 'undefined' && window.innerWidth < width * 0.8;
  const toggleZoom = (e: MouseEvent<HTMLImageElement>) => {
    const d = dialog.current;
    if (!d || !canZoom()) return;
    if (zoomed) {
      setZoomed(false);
      return;
    }
    const r = e.currentTarget.getBoundingClientRect();
    focus.current = { fx: (e.clientX - r.left) / r.width, fy: (e.clientY - r.top) / r.height, x: e.clientX, y: e.clientY };
    setZoomed(true);
  };
  return (
    <>
      <button type="button" className="zoomimg" onClick={open} aria-haspopup="dialog" aria-label={`Enlarge the picture: ${alt}`}>
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
        <span className="zoomimg__hint" aria-hidden="true">
          <Maximize2 size={15} strokeWidth={2} />
        </span>
      </button>
      <dialog
        ref={dialog}
        className={`lightbox ${zoomed ? 'lightbox--zoomed' : ''}`}
        aria-label={alt}
        data-lenis-prevent
        onClose={() => document.documentElement.classList.remove('lk-modal-open')}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div className="lightbox__frame" style={{ ['--lb-w' as string]: `${width}px` }}>
          <Image src={src} alt={alt} width={width} height={height} sizes="1400px" quality={90} className="lightbox__img" onClick={toggleZoom} />
          <p className="lightbox__tip" aria-hidden="true">
            {zoomed ? 'Tap to fit' : 'Tap to zoom'}
          </p>
        </div>
        <button type="button" className="lightbox__close" onClick={close} aria-label="Close the large picture">
          <X size={20} aria-hidden="true" />
        </button>
      </dialog>
    </>
  );
}
