import Link from 'next/link';
import { SITE_URL } from '@/lib/site';

export interface Crumb {
  readonly label: string;
  readonly href: string;
}

/** Visible breadcrumbs plus BreadcrumbList JSON-LD. */
export function Breadcrumbs({ items }: { items: readonly Crumb[] }) {
  const all = [{ label: 'Home', href: '/' }, ...items];
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-2">
        {all.map((c, i) => (
          <li key={c.href} className="flex items-center gap-2">
            {i > 0 ? <span aria-hidden="true">/</span> : null}
            {i === all.length - 1 ? (
              <span aria-current="page" className="inline-flex min-h-[44px] items-center text-body">
                {c.label}
              </span>
            ) : (
              <Link href={c.href} className="inline-flex min-h-[44px] items-center no-underline hover:underline">
                {c.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: all.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.label, item: `${SITE_URL}${c.href === '/' ? '' : c.href}` })),
          }),
        }}
      />
    </nav>
  );
}
