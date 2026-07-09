import Link from "next/link";
import type { LegalDoc } from "@/lib/legal";

/**
 * Previous / next navigation between the legal documents. Uses logical inline
 * arrows so the "back / forward" direction reads correctly under RTL.
 */
export function LegalNavigation({
  prev,
  next,
}: {
  prev?: LegalDoc;
  next?: LegalDoc;
}) {
  if (!prev && !next) return null;

  return (
    <nav
      aria-label="ניווט בין מסמכים"
      className="mt-16 pt-8 border-t border-[color:var(--ink-950)]/10 grid gap-4 sm:grid-cols-2"
    >
      {prev ? (
        <NavCard doc={prev} direction="prev" />
      ) : (
        <span aria-hidden="true" />
      )}
      {next && <NavCard doc={next} direction="next" />}
    </nav>
  );
}

function NavCard({
  doc,
  direction,
}: {
  doc: LegalDoc;
  direction: "prev" | "next";
}) {
  const isNext = direction === "next";
  return (
    <Link
      href={doc.path}
      className={`group rounded-2xl border border-[color:var(--ink-950)]/10 p-5 transition-colors hover:border-[color:var(--gold-500)]/50 hover:bg-[color:var(--ice-050)] ${
        isNext ? "sm:text-start" : "sm:text-end"
      }`}
    >
      <span
        className={`caption text-[color:var(--ink-950)]/50 flex items-center gap-1.5 ${
          isNext ? "sm:justify-start" : "sm:justify-end"
        }`}
      >
        <span aria-hidden="true" className="rtl:-scale-x-100">
          {isNext ? "→" : "←"}
        </span>
        {isNext ? "המסמך הבא" : "המסמך הקודם"}
      </span>
      <span className="block font-display text-lg text-[color:var(--ink-950)] mt-1.5">
        {doc.navLabel}
      </span>
    </Link>
  );
}
