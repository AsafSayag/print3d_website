"use client";

import { useState } from "react";
import type { SpecRow } from "../content";

function SpecList({ rows }: { rows: SpecRow[] }) {
  return (
    <dl className="divide-y divide-[color:var(--navy-800)]/10 border-t border-[color:var(--navy-800)]/10">
      {rows.map((row) => (
        <div
          key={row.label}
          className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3.5"
        >
          <dt className="eyebrow text-[color:var(--gold-700)]">{row.label}</dt>
          <dd className="text-[1.0625rem] leading-relaxed text-[color:var(--ink-950)]/85 text-start flex-1 min-w-[55%]">
            {row.pending ? (
              <span className="inline-flex flex-wrap items-baseline gap-2">
                <span className="inline-flex items-center rounded-full border border-dashed border-[color:var(--steel-500)]/60 px-2.5 py-0.5 text-sm text-[color:var(--steel-500)]">
                  להשלמה
                </span>
                {row.pendingHint && (
                  <span className="text-sm text-[color:var(--ink-950)]/50">
                    {row.pendingHint}
                  </span>
                )}
              </span>
            ) : (
              row.value
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * Design 2 spec panel as a 2-page carousel. Splitting the spec rows in half keeps
 * the details column short enough to roughly match the (enlarged) gallery height.
 */
export function SpecCarousel({ rows }: { rows: SpecRow[] }) {
  const mid = Math.ceil(rows.length / 2);
  const pages = [rows.slice(0, mid), rows.slice(mid)];
  const [page, setPage] = useState(0);
  const go = (delta: number) =>
    setPage((p) => (p + delta + pages.length) % pages.length);

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex-1">
        <SpecList rows={pages[page]} />
      </div>

      {/* Pager — arrows + dots */}
      <div dir="ltr" className="mt-4 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="המפרט הקודם"
          className="grid h-9 w-9 place-items-center rounded-full border border-[color:var(--navy-800)]/15 bg-white text-[color:var(--ink-950)] transition hover:bg-[color:var(--ice-050)]"
        >
          ‹
        </button>
        <div className="flex items-center gap-2">
          {pages.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setPage(i)}
              aria-label={`עמוד מפרט ${i + 1}`}
              aria-current={i === page}
              className={`h-2.5 rounded-full transition-all ${
                i === page
                  ? "w-6 bg-[color:var(--gold-500)]"
                  : "w-2.5 bg-[color:var(--navy-800)]/20 hover:bg-[color:var(--navy-800)]/35"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="המפרט הבא"
          className="grid h-9 w-9 place-items-center rounded-full border border-[color:var(--navy-800)]/15 bg-white text-[color:var(--ink-950)] transition hover:bg-[color:var(--ice-050)]"
        >
          ›
        </button>
      </div>
    </div>
  );
}
