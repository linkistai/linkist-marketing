import Image from 'next/image';
import { Bell, Calendar, Handshake, IdCard, Nfc, QrCode, Radar, Search, Shield, Sparkles, Target, Users, type LucideIcon } from 'lucide-react';

/**
 * Cut-out person from public/assets/people, standing free of any tile (Grownz D25, D28).
 * The parent resolves `src` at build time with person() from lib/screens; until the image plan
 * produces the asset (brief 8, pending budget approval) the slot renders nothing, so no layout
 * ever shows a placeholder person.
 */
export function Person({ src, alt, hero, lean, bust, className = '', priority, sizes = '(max-width: 640px) 80vw, 420px' }: { src?: string; alt: string; hero?: boolean; lean?: boolean; bust?: boolean; className?: string; priority?: boolean; sizes?: string }) {
  if (!src) return null;
  return (
    <div className={`person ${hero ? 'person--hero' : ''} ${lean ? 'person--lean' : ''} ${bust ? 'person--bust' : ''} ${className}`}>
      <Image src={src} alt={alt} width={900} height={1200} priority={priority} sizes={sizes} />
    </div>
  );
}

const GLYPHS: Record<string, LucideIcon> = {
  enrich: Sparkles,
  search: Search,
  icp: Target,
  nudge: Bell,
  capture: Nfc,
  qr: QrCode,
  profile: IdCard,
  team: Users,
  calendar: Calendar,
  handshake: Handshake,
  radar: Radar,
  shield: Shield,
};

/**
 * A small matte 3D object from public/assets/3d (3d-<name>-2x.webp), decorative. Until the object
 * exists, a token-drawn glyph holds the same slot so the card keeps its shape.
 */
export function Obj({ name, src, size = 64, className = '' }: { name: string; src?: string; size?: number; className?: string }) {
  if (src) return <Image src={src} alt="" width={size} height={size} className={className} aria-hidden="true" />;
  const Glyph = GLYPHS[name] ?? Sparkles;
  return (
    <span className={`obj-placeholder ${className}`} style={{ width: size, height: size }} aria-hidden="true">
      <Glyph size={Math.round(size * 0.42)} strokeWidth={1.6} />
    </span>
  );
}

/** Photograph with its own setting from public/assets/scenes, filling a rounded rectangle (FAQ columns). */
export function Scene({ src, alt, ratio = '4:5', className = '', priority, sizes = '(max-width: 1024px) 100vw, 420px' }: { src?: string; alt: string; ratio?: '4:5' | '16:9'; className?: string; priority?: boolean; sizes?: string }) {
  if (!src) return null;
  const w = ratio === '4:5' ? 800 : 1200;
  const h = ratio === '4:5' ? 1000 : 675;
  return (
    <div className={`scene ${ratio === '16:9' ? 'scene--wide' : ''} ${className}`}>
      <Image src={src} alt={alt} width={w} height={h} priority={priority} sizes={sizes} />
    </div>
  );
}
