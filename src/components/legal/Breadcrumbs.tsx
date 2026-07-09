import Link from "next/link";

export type Crumb = {
  label: string;
  /** Omitted for the current (last) page. */
  href?: string;
};

/**
 * Accessible breadcrumb trail. Renders an ordered list inside a landmark nav;
 * the current page is marked with aria-current and is not a link.
 * Visual chevrons are decorative (aria-hidden) and flip correctly under RTL.
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="נתיב ניווט" className="text-sm">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-white/60">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-x-2">
              {item.href && !last ? (
                <Link
                  href={item.href}
                  className="hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className="text-white/85"
                  aria-current={last ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
              {!last && (
                <span aria-hidden="true" className="text-white/30 rtl:-scale-x-100">
                  ›
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
