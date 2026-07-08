import type { SpecRow } from "../content";

export function SpecSheet({ rows }: { rows: SpecRow[] }) {
  return (
    <dl className="grid sm:grid-cols-2 gap-x-10 gap-y-6">
      {rows.map((row) => (
        <div
          key={row.label}
          className="border-b border-[color:var(--navy-800)]/10 pb-4"
        >
          <dt className="eyebrow text-[color:var(--gold-700)]">
            {row.label}
          </dt>
          <dd className="mt-1.5 text-[1.05rem] leading-relaxed">
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
