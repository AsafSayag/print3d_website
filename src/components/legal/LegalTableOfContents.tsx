"use client";

import { useEffect, useRef, useState } from "react";

export type TocItem = { id: string; title: string };

/**
 * Table of contents with scroll-spy.
 * - `variant="sidebar"`: sticky column for desktop; highlights the active section.
 * - `variant="mobile"`: a collapsible <details> disclosure for small screens.
 *
 * The active section is tracked with IntersectionObserver against the rendered
 * section ids. Anchor clicks rely on native smooth in-page scrolling.
 */
export function LegalTableOfContents({
  items,
  variant,
}: {
  items: TocItem[];
  variant: "sidebar" | "mobile";
}) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");
  const detailsRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const targets = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  const links = (
    <ul className="space-y-0.5">
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            className="toc-link"
            aria-current={active === item.id ? "true" : undefined}
            onClick={() => {
              if (variant === "mobile" && detailsRef.current) {
                detailsRef.current.open = false;
              }
            }}
          >
            {item.title}
          </a>
        </li>
      ))}
    </ul>
  );

  if (variant === "mobile") {
    return (
      <details
        ref={detailsRef}
        className="lg:hidden rounded-2xl border border-[color:var(--ink-950)]/10 bg-[color:var(--ice-050)] overflow-hidden group"
      >
        <summary className="flex items-center justify-between gap-3 px-5 py-4 cursor-pointer list-none select-none font-display text-base text-[color:var(--ink-950)]">
          <span>תוכן העניינים</span>
          <span
            aria-hidden="true"
            className="text-[color:var(--gold-700)] transition-transform duration-300 group-open:rotate-180"
          >
            ▾
          </span>
        </summary>
        <div className="px-4 pb-4">{links}</div>
      </details>
    );
  }

  return (
    <nav aria-label="תוכן העניינים" className="sticky top-28">
      <p className="eyebrow text-[color:var(--gold-700)] mb-4">תוכן העניינים</p>
      {links}
    </nav>
  );
}
