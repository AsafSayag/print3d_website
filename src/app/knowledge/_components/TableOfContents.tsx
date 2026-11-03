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
        {entries.map((entry) => (
          <li key={entry.id} className="flex gap-3 leading-snug">
            {/* Plain bullet — the list never shows zero-padded numbers. */}
            <span
              className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--gold-500)]"
              aria-hidden="true"
            />
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
