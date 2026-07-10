"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { DeferredVideo } from "@/components/ui/DeferredVideo";
import {
  PORTFOLIO_PROJECTS,
  PORTFOLIO_SHOWCASE,
  PROJECT_TYPE_LABELS,
} from "@/lib/portfolioContent";

/**
 * Wide, full-bleed showcase carousel — one project fills the screen at a
 * time. Native scroll-snap (no library) drives both touch/drag and the
 * prev/next controls; a thin gold rule tracks progress the same way the
 * portfolio card's hover rule grows on the homepage.
 */
export function ProjectShowcase() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const total = PORTFOLIO_PROJECTS.length;

  const goTo = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = (i + total) % total;
    track.scrollTo({ left: clamped * track.clientWidth, behavior: "smooth" });
  };

  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const i = Math.round(track.scrollLeft / track.clientWidth);
    setActive(Math.min(total - 1, Math.max(0, i)));
  };

  return (
    <section
      id="showcase"
      className="portfolio-ambient relative overflow-hidden"
      aria-label={PORTFOLIO_SHOWCASE.eyebrow}
    >
      <div className="container-x pt-16 md:pt-20">
        <Reveal>
          <p className="eyebrow text-[color:var(--steel-300)]">
            {PORTFOLIO_SHOWCASE.eyebrow}
          </p>
        </Reveal>
      </div>

      <div className="relative mt-8 md:mt-10">
        <div
          ref={trackRef}
          onScroll={onScroll}
          className="flex w-full overflow-x-auto snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: "none" }}
        >
          {PORTFOLIO_PROJECTS.map((p, i) => (
            <div
              key={p.id}
              className="relative w-full shrink-0 snap-center h-[70vh] min-h-[460px] md:h-[82svh] md:min-h-[560px]"
            >
              {p.video ? (
                <DeferredVideo
                  className="absolute inset-0 h-full w-full object-cover"
                  poster={p.image}
                  sources={[
                    { src: p.video.webm, type: "video/webm" },
                    { src: p.video.mp4, type: "video/mp4" },
                  ]}
                />
              ) : (
                <Image
                  src={p.image}
                  alt={`${p.title} · מודל אדריכלי בקנה מידה ${p.scale}`}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className="object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/10" />

              {/* Decorative "future video" marker — only on stills still
                  waiting for real footage; real videos need no play glyph. */}
              {!p.video && (
                <div
                  aria-hidden="true"
                  className="absolute inset-0 grid place-items-center pointer-events-none"
                >
                  <span className="glass-btn !w-16 !h-16 !p-0 !rounded-full opacity-70">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 -me-0.5" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </div>
              )}

              <div className="absolute inset-x-0 top-0 container-x pt-6 md:pt-8">
                <span className="caption text-[color:var(--steel-300)]">
                  {p.video ? PORTFOLIO_SHOWCASE.videoLabel : PORTFOLIO_SHOWCASE.videoNote}
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 container-x pb-10 md:pb-14">
                <span className="eyebrow text-[color:var(--gold-400)]">
                  {PROJECT_TYPE_LABELS[p.type]}
                </span>
                <h2 className="h1 text-white mt-3 max-w-3xl text-balance">
                  {p.title}
                </h2>
                <div className="mt-4 flex flex-wrap items-center gap-4">
                  <span className="text-white/75 text-base md:text-lg">
                    {p.client}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-white/30" aria-hidden />
                  <span
                    className="num text-[color:var(--gold-400)] text-sm bg-black/30 backdrop-blur px-2.5 py-1 rounded-full border border-white/10"
                    dir="ltr"
                  >
                    {p.scale}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Prev / next controls */}
        <button
          type="button"
          aria-label="הפרויקט הקודם"
          onClick={() => goTo(active - 1)}
          className="glass-btn !w-11 !h-11 !p-0 !rounded-full absolute start-4 md:start-8 top-1/2 -translate-y-1/2 z-10"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 rtl:-scale-x-100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="הפרויקט הבא"
          onClick={() => goTo(active + 1)}
          className="glass-btn !w-11 !h-11 !p-0 !rounded-full absolute end-4 md:end-8 top-1/2 -translate-y-1/2 z-10"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 rtl:-scale-x-100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>

        {/* Index + progress rule */}
        <div className="container-x mt-5 flex items-center gap-4">
          <span className="num text-[color:var(--steel-300)] text-sm shrink-0" dir="ltr">
            {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <div className="h-px flex-1 bg-white/10 relative overflow-hidden rounded-full">
            <div
              className="absolute inset-y-0 start-0 bg-gradient-to-r from-[color:var(--gold-700)] via-[color:var(--gold-400)] to-[color:var(--gold-700)] transition-[width] duration-500 ease-[var(--ease-brand)]"
              style={{ width: `${((active + 1) / total) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="h-16 md:h-20" aria-hidden />
    </section>
  );
}
