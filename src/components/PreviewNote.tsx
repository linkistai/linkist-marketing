import { DESIGN_NOTE } from '@/content/design';

/**
 * The design-preview note (owner, 24 September 2026, D55): the phone screens no longer carry a
 * "Design preview" chip; instead every section that shows a prototype screen ends with this line.
 */
export function PreviewNote({ className = '', align = 'center' }: { className?: string; align?: 'center' | 'left' }) {
  return <p className={`disclaimer mt-10 max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''} ${className}`}>{DESIGN_NOTE}</p>;
}
