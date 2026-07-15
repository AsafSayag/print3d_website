import type { ABOUT } from "../content";

export function AboutProject({ about }: { about: typeof ABOUT }) {
  return (
    <details className="group rounded-2xl border border-[color:var(--navy-800)]/10 open:bg-[color:var(--ice-050)]">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-display text-lg">
        {about.heading}
        <span
          aria-hidden="true"
          className="shrink-0 text-[color:var(--gold-700)] transition-transform duration-300 group-open:rotate-180"
        >
          ⌄
        </span>
      </summary>
      <div className="px-6 pb-6 space-y-2 text-[1.05rem] leading-relaxed">
        <p>
          <span className="eyebrow text-[color:var(--gold-700)] ms-1">
            לקוח:
          </span>{" "}
          {about.client}
        </p>
        <p>
          <span className="eyebrow text-[color:var(--gold-700)] ms-1">
            הפרויקט המיוצג:
          </span>{" "}
          {about.represented} —{" "}
          <span className="inline-flex items-center rounded-full border border-dashed border-[color:var(--steel-500)]/60 px-2.5 py-0.5 text-sm text-[color:var(--steel-500)]">
            להשלמה
          </span>{" "}
          <span className="text-sm text-[color:var(--ink-950)]/50">
            {about.pendingHint}
          </span>
        </p>
      </div>
    </details>
  );
}
