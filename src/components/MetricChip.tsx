import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

/**
 * Pill card content for floating cards: a live dot or an icon, then a short line. Figures are
 * examples until they come from a captured screen, and say so (brief 5).
 */
export function MetricChip({
  icon: Icon,
  live,
  initials,
  label,
  value,
  text,
  example,
  className = '',
}: {
  icon?: LucideIcon;
  live?: boolean;
  initials?: string;
  label?: string;
  value?: string;
  text?: ReactNode;
  example?: boolean;
  className?: string;
}) {
  return (
    <div className={`chip ${className}`}>
      {live ? <span className="dot-live ml-1" aria-hidden="true" /> : null}
      {initials ? (
        <span className="chip__icon chip__icon--teal" aria-hidden="true">
          {initials}
        </span>
      ) : null}
      {Icon ? (
        <span className="chip__icon" aria-hidden="true">
          <Icon size={14} />
        </span>
      ) : null}
      {text ? (
        <span className="chip__text">{text}</span>
      ) : (
        <span className="flex flex-col leading-tight">
          {label ? <span className="chip__label">{label}</span> : null}
          {value ? <span className="chip__value">{value}</span> : null}
        </span>
      )}
      {example ? <span className="chip__example">example</span> : null}
    </div>
  );
}
