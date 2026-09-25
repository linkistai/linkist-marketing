import { ScreenFrame } from '@/components/ScreenFrame';

/** A phone with its soft red halo (v2), the visual beside a split section. */
export function PhoneStage({ src, alt, width = 280, priority }: { src?: string; alt: string; width?: number; priority?: boolean }) {
  return (
    <div className="relative flex w-full items-center justify-center py-6">
      <div className="v2-glow w-[min(100%,440px)]" aria-hidden="true" />
      <div className="relative w-full" style={{ maxWidth: width }}>
        <ScreenFrame kind="phone" src={src} alt={alt} preview full priority={priority} className="!max-w-none" />
      </div>
    </div>
  );
}
