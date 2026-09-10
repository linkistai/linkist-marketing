import Image from 'next/image';
import type { ReactNode } from 'react';
import { InView } from '@/components/InView';

/**
 * Phone or browser frame. `src` must be a real capture from public/screens (rule 2), or, with
 * `preview`, a labelled render from the approved prototype (Grownz D23). With no capture yet the
 * frame shows a pending state, never a mock. Real captures leave room for a status band above
 * the image; prototype previews carry their own status bar, so `full` lets them fill the screen.
 */
export function ScreenFrame({
  kind,
  src,
  alt,
  priority,
  className = '',
  url = 'prm.linkist.ai',
  preview,
  full,
  children,
}: {
  kind: 'phone' | 'browser';
  src?: string;
  alt: string;
  priority?: boolean;
  className?: string;
  url?: string;
  /** Marks a design-preview render; adds the badge. */
  preview?: boolean;
  /** The image includes its own status bar; fill the whole screen. */
  full?: boolean;
  children?: ReactNode;
}) {
  const img = src ? (
    <Image src={src} alt={alt} fill sizes={kind === 'phone' ? '(max-width: 640px) 80vw, 320px' : '(max-width: 1024px) 100vw, 760px'} priority={priority} style={{ objectFit: 'cover', objectPosition: 'top' }} />
  ) : (
    <div className="screen-pending" role="img" aria-label={`${alt} (capture pending)`}>
      <span>
        Real screen capture pending
        <br />
        <span className="font-mono text-[10px]">{alt}</span>
      </span>
    </div>
  );
  if (kind === 'phone') {
    return (
      <div className={`phone ${className}`}>
        <div className="phone__notch" aria-hidden="true" />
        <div className="phone__screen">
          {src ? <div className={`phone__img ${full || preview ? 'phone__img--full' : ''}`}>{img}</div> : img}
          {preview ? <span className="preview-badge">Design preview</span> : null}
          {children}
        </div>
      </div>
    );
  }
  return (
    <InView className="browser-wrap">
      <div className={`browser ${className}`}>
        <div className="browser__bar" aria-hidden="true">
          <span className="browser__dot" />
          <span className="browser__dot" />
          <span className="browser__dot" />
          <span className="browser__url">{url}</span>
        </div>
        <div className="browser__screen">
          {img}
          {preview ? <span className="preview-badge">Design preview</span> : null}
          {children}
        </div>
      </div>
    </InView>
  );
}
