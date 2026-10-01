import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { G } from '@/lib/glossary';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

export function Button({
  href,
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  onClick,
  type = 'button',
  external,
}: {
  href?: string;
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  external?: boolean;
}) {
  const cls = `btn btn--${variant} ${size !== 'md' ? `btn--${size}` : ''} ${className}`;
  if (href && (href.startsWith('http') || external)) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }
  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} className={cls} onClick={onClick}>
      {children}
    </button>
  );
}

/**
 * The one primary conversion: Start Now (Start free until 29 September 2026). Every placement passes
 * its own tracked journey link from src/content/journeys.ts (D69), so each button counts on its own.
 */
export function StartFree({ href, size = 'lg', variant = 'primary', className = '', label }: { href: string; size?: Size; variant?: Variant; className?: string; label?: string }) {
  return (
    <Button href={href} size={size} variant={variant} className={className}>
      {label ?? G.ctaPrimary}
    </Button>
  );
}

/** "Get the App": the Individual journey, with the placement's own tag (D69). */
export function GetApp({ href, size = 'md', variant = 'primary', className = '' }: { href: string; size?: Size; variant?: Variant; className?: string }) {
  return (
    <Button href={href} size={size} variant={variant} className={className}>
      {G.ctaApp}
    </Button>
  );
}

/** "Get NFC Card": the NFC card store journey, with the placement's own tag (D69); the hero says "Get Linkist NFC" (D50). */
export function GetCard({ href, size = 'md', variant = 'secondary', className = '', label }: { href: string; size?: Size; variant?: Variant; className?: string; label?: string }) {
  return (
    <Button href={href} size={size} variant={variant} className={className}>
      {label ?? G.ctaNfc}
    </Button>
  );
}

/** Secondary text link with an arrow: "Explore Linkist", "Compare PRM plans". */
export function TextLink({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link href={href} className={`link ${className}`}>
      {children}
      <ArrowRight size={16} aria-hidden="true" />
    </Link>
  );
}
