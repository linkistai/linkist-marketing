import Image from 'next/image';

/**
 * The crimson arrow-and-dot mark, cropped from the prototype's lockup PNG by scripts/brand-build.ts
 * (public/brand/mark.png). Vector originals are expected from the client (confirm list C3); the
 * wordmark is set in the page's display face so it always matches the type.
 */
export function LogoMark({ size = 22, className = '' }: { size?: number; className?: string }) {
  return <Image src="/brand/mark.png" alt="" width={size} height={size} className={className} aria-hidden="true" priority />;
}

export function Wordmark({ size = 22, className = '' }: { size?: number; className?: string }) {
  return (
    <span className={`brand ${className}`} style={{ fontSize: size }}>
      <LogoMark size={Math.round(size * 1.05)} />
      <span>Linkist</span>
    </span>
  );
}
