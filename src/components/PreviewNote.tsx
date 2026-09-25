import { DESIGN_NOTE } from '@/content/design';

/**
 * The illustration note (owner, 25 September 2026, D58): shown once, on the home page under How
 * Linkist works, where the first app screens appear. No other section repeats it.
 */
export function PreviewNote({ className = '', align = 'center' }: { className?: string; align?: 'center' | 'left' }) {
  return <p className={`disclaimer mt-10 max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''} ${className}`}>{DESIGN_NOTE}</p>;
}
