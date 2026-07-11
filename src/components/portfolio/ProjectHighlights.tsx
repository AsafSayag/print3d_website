"use client";

import { useRef } from "react";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { PORTFOLIO_HIGHLIGHTS, PORTFOLIO_PROJECTS } from "@/lib/portfolioContent";

/**
 * Small curated carousel — desktop peeks ~4–5 cards, mobile ~2, purely via
 * card basis width (no JS pagination needed). Prev/next buttons nudge the
 * scroller by one card; native scroll-snap handles touch/drag.
 */
export function ProjectHighlights() {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const nudge = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.firstElementChild as HTMLElement | null;
    const step = card ? card.getBoundingClientRect().width + 16 : track.clientWidth * 0.4;
    // Under RTL the scroller's forward direction is negative scrollLeft, so a
    // positive nudge from 0 clamps and the "next" button does nothing — flip
    // the sign to match the document direction.
    const rtl = getComputedStyle(track).direction === "rtl";
    track.scrollBy({ left: dir * step * (rtl ? -1 : 1), behavior: "smooth" });
  };

  return (
    <section id="highlights" className="surface-white section" aria-label={PORTFOLIO_HIGHLIGHTS.title}>
      <div className="container-x">
        <div className="flex items-end justify-between gap-6">
          <SectionHeading eyebrow={PORTFOLIO_HIGHLIGHTS.eyebrow} title={PORTFOLIO_HIGHLIGHTS.title} tone="dark" />
          <Reveal index={1} className="hidden sm:flex items-center gap-2 shrink-0 mb-2">
            <button
              type="button"
              aria-label="הקודם"
              onClick={() => nudge(-1)}
              className="grid place-items-center w-10 h-10 rounded-full border border-[color:var(--ink-950)]/15 text-[color:var(--ink-950)]/70 transition-colors hover:border-[color:var(--gold-500)]/60 hover:text-[color:var(--gold-700)]"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 rtl:-scale-x-100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="הבא"
              onClick={() => nudge(1)}
              className="grid place-items-center w-10 h-10 rounded-full border border-[color:var(--ink-950)]/15 text-[color:var(--ink-950)]/70 transition-colors hover:border-[color:var(--gold-500)]/60 hover:text-[color:var(--gold-700)]"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 rtl:-scale-x-100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </Reveal>
        </div>
      </div>

      <div
        ref={trackRef}
        className="mt-10 md:mt-14 flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth ps-[var(--gutter)] pe-[var(--gutter)]"
        style={{ scrollbarWidth: "none" }}
      >
        {PORTFOLIO_PROJECTS.map((p, i) => (
          <div
            key={p.id}
            className="basis-[46%] sm:basis-[38%] md:basis-[28%] lg:basis-[22%] shrink-0 snap-start"
          >
            <Reveal index={i % 4}>
              <div className="portfolio-card group relative overflow-hidden rounded-2xl aspect-[3/4]">
                <Image
                  src={p.image}
                  alt={`${p.title} · מודל אדריכלי בקנה מידה ${p.scale}`}
                  fill
                  sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 22vw"
                  className="object-cover transition-transform duration-[1100ms] ease-[var(--ease-brand)] group-hover:scale-[1.07]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--navy-950)]/85 via-[color:var(--navy-950)]/10 to-transparent" />
                <div className="portfolio-card-sheen" aria-hidden />
                <div className="absolute inset-x-0 bottom-0 p-3.5 md:p-4">
                  <div className="portfolio-card-line" aria-hidden />
                  <span
                    className="num mt-2.5 inline-block text-[color:var(--gold-400)] text-xs bg-black/30 backdrop-blur px-2 py-0.5 rounded-full border border-white/10"
                    dir="ltr"
                  >
                    {p.scale}
                  </span>
                  <span className="mt-2 block text-white font-display text-sm md:text-base leading-tight">
                    {p.title}
                  </span>
                  <span className="mt-1 block text-[color:var(--steel-300)] text-xs">
                    {p.client}
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
}
