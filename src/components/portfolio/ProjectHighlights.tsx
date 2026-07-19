"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PORTFOLIO_HIGHLIGHTS, PORTFOLIO_PROJECTS } from "@/lib/portfolioContent";

/**
 * Curated highlights strip with 360° (endless) horizontal scrolling. The track
 * is forced LTR so scrollLeft math is consistent across browsers/RTL, and the
 * project list is tripled so the position can wrap seamlessly in BOTH
 * directions — drag or scroll left/right forever.
 *
 * Vertical movement is deliberately disabled inside the strip (overflow-y is
 * hidden + touch-action: pan-x), so a vertical wheel/trackpad gesture over the
 * carousel scrolls the whole PAGE rather than getting trapped in the strip.
 */
export function ProjectHighlights() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const drag = useRef({ active: false, startX: 0, startLeft: 0, moved: false });

  // Tripled so there is always a full copy on both sides of the resting
  // position — that's what makes the loop endless in either direction.
  const loop = [
    ...PORTFOLIO_PROJECTS,
    ...PORTFOLIO_PROJECTS,
    ...PORTFOLIO_PROJECTS,
  ];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Width of one copy of the (tripled) list.
    const seg = () => track.scrollWidth / 3;

    // Rest in the MIDDLE copy so both directions have a full segment of runway.
    track.scrollLeft = seg();

    // Keep the position inside the middle band [seg, 2·seg). When it drifts past
    // either edge, jump back by one segment — seamless, since the copies are
    // identical. If a drag is in progress, shift its anchor by the same amount
    // so the gesture doesn't jump. Runs synchronously on every scroll; a guard
    // ignores the re-entrant scroll event our own correction fires.
    let wrapping = false;
    const onScroll = () => {
      if (wrapping) return;
      const s = seg();
      if (s <= 0) return;
      let delta = 0;
      if (track.scrollLeft >= 2 * s) delta = -s;
      else if (track.scrollLeft < s) delta = s;
      if (delta) {
        wrapping = true;
        track.scrollLeft += delta;
        if (drag.current.active) drag.current.startLeft += delta;
        wrapping = false;
      }
    };

    // Pointer drag-to-scroll (mouse / pen). Touch uses native horizontal pan.
    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === "touch") return; // let native touch scrolling run
      drag.current = {
        active: true,
        startX: e.clientX,
        startLeft: track.scrollLeft,
        moved: false,
      };
      track.setPointerCapture(e.pointerId);
      track.classList.add("is-grabbing");
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!drag.current.active) return;
      const dx = e.clientX - drag.current.startX;
      if (Math.abs(dx) > 3) drag.current.moved = true;
      track.scrollLeft = drag.current.startLeft - dx;
    };
    const onPointerUp = (e: PointerEvent) => {
      if (!drag.current.active) return;
      drag.current.active = false;
      try {
        track.releasePointerCapture(e.pointerId);
      } catch {}
      track.classList.remove("is-grabbing");
    };
    // Swallow the click that follows a real drag so it doesn't navigate.
    const onClickCapture = (e: MouseEvent) => {
      if (drag.current.moved) {
        e.preventDefault();
        e.stopPropagation();
        drag.current.moved = false;
      }
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    track.addEventListener("pointerdown", onPointerDown);
    track.addEventListener("pointermove", onPointerMove);
    track.addEventListener("pointerup", onPointerUp);
    track.addEventListener("pointercancel", onPointerUp);
    track.addEventListener("click", onClickCapture, true);

    return () => {
      track.removeEventListener("scroll", onScroll);
      track.removeEventListener("pointerdown", onPointerDown);
      track.removeEventListener("pointermove", onPointerMove);
      track.removeEventListener("pointerup", onPointerUp);
      track.removeEventListener("pointercancel", onPointerUp);
      track.removeEventListener("click", onClickCapture, true);
    };
  }, []);

  const nudge = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.firstElementChild as HTMLElement | null;
    const step = card
      ? card.getBoundingClientRect().width + 16
      : track.clientWidth * 0.4;
    // Track is LTR, so +left = toward the visual "next" card.
    track.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section
      id="highlights"
      className="surface-white section"
      aria-label={PORTFOLIO_HIGHLIGHTS.title}
    >
      <div className="container-x">
        <div className="flex items-end justify-between gap-6">
          <SectionHeading
            eyebrow={PORTFOLIO_HIGHLIGHTS.eyebrow}
            title={PORTFOLIO_HIGHLIGHTS.title}
            tone="dark"
          />
          <div className="hidden sm:flex items-center gap-2 shrink-0 mb-2">
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
          </div>
        </div>
      </div>

      <div
        ref={trackRef}
        dir="ltr"
        className="highlights-track mt-10 md:mt-14 flex gap-4 overflow-x-auto overflow-y-hidden ps-[var(--gutter)] pe-[var(--gutter)] cursor-grab select-none"
        style={{
          scrollbarWidth: "none",
          // Horizontal-only: vertical wheel/trackpad gestures pass through to the
          // page instead of being captured here; contain stops the horizontal
          // scroll from chaining to browser back/forward gestures.
          touchAction: "pan-x",
          overscrollBehaviorX: "contain",
        }}
      >
        {loop.map((p, i) => (
          <div
            key={`${p.id}-${i}`}
            dir="rtl"
            aria-hidden={i >= PORTFOLIO_PROJECTS.length ? true : undefined}
            className="basis-[46%] sm:basis-[38%] md:basis-[28%] lg:basis-[22%] shrink-0"
          >
            <div className="portfolio-card group relative overflow-hidden rounded-2xl aspect-[3/4]">
              <Image
                src={p.image}
                alt={i < PORTFOLIO_PROJECTS.length ? `${p.title} · מודל אדריכלי בקנה מידה ${p.scale}` : ""}
                fill
                sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 22vw"
                className="object-cover transition-transform duration-[1100ms] ease-[var(--ease-brand)] group-hover:scale-[1.07]"
                draggable={false}
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
              {p.href && (
                <Link
                  href={p.href}
                  tabIndex={i >= PORTFOLIO_PROJECTS.length ? -1 : undefined}
                  aria-label={`${p.title} — לצפייה בעמוד הפרויקט`}
                  draggable={false}
                  className="absolute inset-0 z-10 rounded-2xl ring-[color:var(--gold-400)]/0 transition group-hover:ring-2 focus-visible:outline-none focus-visible:ring-2"
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Hide the horizontal scrollbar (Firefox uses scrollbar-width above). */}
      <style>{".highlights-track::-webkit-scrollbar{display:none}.highlights-track.is-grabbing{cursor:grabbing}"}</style>
    </section>
  );
}
