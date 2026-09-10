import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { G } from '@/lib/glossary';
import { GET_APP_URL, GET_CARD_URL, START_URL } from '@/lib/site';

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

/** The one primary conversion: Start free, landing on the app's real sign-in and registration screen. */
export function StartFree({ size = 'lg', variant = 'primary', className = '', label }: { size?: Size; variant?: Variant; className?: string; label?: string }) {
  return (
    <Button href={START_URL} size={size} variant={variant} className={className}>
      {label ?? G.ctaPrimary}
    </Button>
  );
}

/** "Get the App": the PRM app's unified sign-in and registration screen (header, footer, hero). */
export function GetApp({ size = 'md', variant = 'primary', className = '' }: { size?: Size; variant?: Variant; className?: string }) {
  return (
    <Button href={GET_APP_URL} size={size} variant={variant} className={className}>
      {G.ctaApp}
    </Button>
  );
}

/** "Get NFC Card": the card product's sign-in (header, footer, hero). */
export function GetCard({ size = 'md', variant = 'secondary', className = '' }: { size?: Size; variant?: Variant; className?: string }) {
  return (
    <Button href={GET_CARD_URL} size={size} variant={variant} className={className}>
      {G.ctaNfc}
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
