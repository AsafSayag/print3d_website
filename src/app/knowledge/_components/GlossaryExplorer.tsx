"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { glossaryShort, type GlossaryTerm } from "../glossary";

/** Canonical Hebrew alphabet, base letters only (finals folded in the data). */
const ALEF_BET = [
  "א", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט", "י", "כ", "ל",
  "מ", "נ", "ס", "ע", "פ", "צ", "ק", "ר", "ש", "ת",
] as const;

function norm(s: string) {
  return s.trim().toLowerCase();
}

/**
 * Full glossary index: instant search + A–Z quick-nav, terms grouped by their
 * first Hebrew letter. Each card links to the term's own page. Server-rendered
 * data, hydrated for the live filtering.
 */
export function GlossaryExplorer({ terms }: { terms: GlossaryTerm[] }) {
  const [query, setQuery] = useState("");
  const q = norm(query);

  const filtered = useMemo(
    () =>
      !q
        ? terms
        : terms.filter(
            (t) => norm(t.term).includes(q) || norm(t.definition).includes(q)
          ),
    [terms, q]
  );

  const grouped = useMemo(() => {
    const map = new Map<string, GlossaryTerm[]>();
    for (const t of filtered) {
      const list = map.get(t.letter) ?? [];
      list.push(t);
      map.set(t.letter, list);
    }
    for (const list of map.values())
      list.sort((a, b) => a.term.localeCompare(b.term, "he"));
    return map;
  }, [filtered]);

  const availableLetters = ALEF_BET.filter(
    (l) => (grouped.get(l)?.length ?? 0) > 0
  );

  return (
    <div>
      {/* Search */}
      <div className="relative">
        <label htmlFor="glossary-index-search" className="sr-only">
          חיפוש מונח במילון
        </label>
        <input
          id="glossary-index-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="חיפוש מונח — לדוגמה: קנה מידה, CNC, מודל למשרד מכירות…"
          className="w-full max-w-xl rounded-full border border-black/15 bg-white py-3.5 px-5 text-[color:var(--ink-950)] shadow-sm outline-none transition-colors focus:border-[color:var(--gold-500)]"
        />
      </div>

      {/* A–Z quick nav (only when not searching) */}
      {!q && availableLetters.length > 0 && (
        <nav aria-label="ניווט לפי אותיות" className="mt-6">
          <ul className="flex flex-wrap gap-2">
            {availableLetters.map((l) => (
              <li key={l}>
                <a
                  href={`#letter-${l}`}
                  className="grid h-9 w-9 place-items-center rounded-full border border-black/10 text-sm font-bold text-[color:var(--ink-950)]/70 transition-colors hover:border-[color:var(--gold-500)] hover:text-[color:var(--gold-700)]"
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <div className="mt-10">
        {filtered.length === 0 ? (
          <p className="text-[color:var(--ink-950)]/60">
            לא נמצאו מושגים התואמים את החיפוש &quot;{query}&quot;.
          </p>
        ) : q ? (
          <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((t) => (
              <GlossaryIndexCard key={t.slug} term={t} />
            ))}
          </ul>
        ) : (
          <div className="space-y-14">
            {availableLetters.map((l) => (
              <div key={l} id={`letter-${l}`} className="scroll-mt-28">
                <h2 className="num font-display text-xl font-bold text-[color:var(--gold-700)]">
                  {l}
                </h2>
                <ul className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {(grouped.get(l) ?? []).map((t) => (
                    <GlossaryIndexCard key={t.slug} term={t} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function GlossaryIndexCard({ term }: { term: GlossaryTerm }) {
  return (
    <li className="rounded-2xl border border-black/10 bg-white p-6">
      <h3 className="font-display text-lg font-bold text-[color:var(--ink-950)]">
        <Link
          href={`/knowledge/glossary/${term.slug}`}
          className="transition-colors hover:text-[color:var(--gold-700)]"
        >
          {term.term}
        </Link>
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-[color:var(--ink-950)]/70">
        {glossaryShort(term.definition)}
      </p>
      <Link
        href={`/knowledge/glossary/${term.slug}`}
        className="mt-3 inline-block text-sm font-semibold text-[color:var(--gold-700)] underline-offset-4 hover:underline"
      >
        קראו עוד על המושג ←
      </Link>
    </li>
  );
}
