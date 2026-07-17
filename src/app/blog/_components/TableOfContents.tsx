import type { ArticleBlock } from "../content";

export type TocEntry = { id: string; text: string };

/** Pull the heading blocks out of an article body into a flat TOC list. */
export function buildToc(blocks: ArticleBlock[], extra: TocEntry[] = []): TocEntry[] {
  const fromBody = blocks
    .filter((b): b is Extract<ArticleBlock, { type: "heading" }> => b.type === "heading")
    .map((b) => ({ id: b.id, text: b.text }));
  return [...fromBody, ...extra];
}

/**
 * Auto table of contents shown near the top of the article. Anchors deep-link
 * to the matching section ids (headings carry scroll-margin so they don't hide
 * under the fixed navbar). Server-rendered — great for SEO and works with JS off.
 */
export function TableOfContents({ entries }: { entries: TocEntry[] }) {
  if (entries.length === 0) return null;
  return (
    <nav
      aria-label="תוכן העניינים"
      className="rounded-2xl border border-black/10 bg-[color:var(--ice-050)] p-6 md:p-7"
    >
      <h2 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-[color:var(--gold-700)]">
        תוכן העניינים
      </h2>
      <ol className="mt-4 space-y-2.5">
        {entries.map((entry, i) => (
          <li key={entry.id} className="flex gap-3 leading-snug">
            <span
              className="num shrink-0 pt-[2px] text-sm font-bold text-[color:var(--gold-500)]"
              dir="ltr"
              aria-hidden="true"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <a
              href={`#${entry.id}`}
              className="text-[color:var(--ink-950)]/80 transition-colors hover:text-[color:var(--gold-700)]"
            >
              {entry.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
