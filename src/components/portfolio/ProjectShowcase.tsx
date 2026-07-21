"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { DeferredVideo } from "@/components/ui/DeferredVideo";
import {
  PORTFOLIO_PROJECTS,
  PORTFOLIO_SHOWCASE,
  PROJECT_TYPE_LABELS,
  SHOWCASE_PROJECT_IDS,
  type Project,
} from "@/lib/portfolioContent";

/** Auto-advance interval (ms) for the showcase carousel. */
const AUTOPLAY_MS = 9000;

/** Our most select projects, in the curated order defined alongside the data.
 *  The carousel is a video reel, so we also guard on `p.video`: only projects
 *  with real footage appear. Image-only projects stay discoverable via the
 *  filter grid and the highlights strip. */
const SHOWCASE_PROJECTS: Project[] = SHOWCASE_PROJECT_IDS.map((id) =>
  PORTFOLIO_PROJECTS.find((p) => p.id === id),
).filter((p): p is Project => Boolean(p?.video));

/**
 * Wide, full-bleed showcase carousel — one project fills the screen at a time.
 * A CSS `transform` drives the slide position (not native scroll) so it behaves
 * identically in every browser and under RTL, where `scrollLeft` conventions
 * are inconsistent. It auto-advances every 9s, can be dragged/swiped manually,
 * and has prev/next controls on each side. Auto-play pauses only during an
 * in-flight drag and is disabled under reduced-motion.
 */
export function ProjectShowcase() {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef(false);
  const startXRef = useRef(0);

  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dragPx, setDragPx] = useState(0);
  // Read once at mount; only gates autoplay behaviour, never the rendered
  // markup, so there is no hydration mismatch.
  const [reduce] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  const total = SHOWCASE_PROJECTS.length;
  const next = () => setActive((a) => (a + 1) % total);
  const prev = () => setActive((a) => (a - 1 + total) % total);

  // Auto-advance every AUTOPLAY_MS. Re-arming on `active` means any manual
  // navigation (button, drag or swipe) resets the timer, so the slide the user
  // just picked gets its full dwell before the next auto step. Only an in-flight
  // drag pauses it (so it never fights the user); disabled under reduced-motion.
  useEffect(() => {
    if (dragging || reduce) return;
    const id = window.setTimeout(next, AUTOPLAY_MS);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, dragging, reduce, total]);

  // --- Video choreography ---
  // All slides sit side-by-side, so DeferredVideo's vertical proximity check
  // considers every slide "near the viewport" and starts every clip at once.
  // Left alone, a video slide would arrive mid-loop instead of at its opening
  // frame, and hidden clips would burn CPU. Two measures fix this:
  //  1. Whenever `active` changes, restart the active slide's video from 0 and
  //     pause all the others.
  //  2. A capture-phase `play` listener catches clips that DeferredVideo
  //     autoplays after their lazy load and pauses any that aren't active.
  const activeRef = useRef(active);
  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  const slideIndexOf = (vid: HTMLVideoElement) =>
    Number(vid.closest("[data-slide]")?.getAttribute("data-slide") ?? -1);

  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    const onPlay = (e: Event) => {
      const vid = e.target;
      if (!(vid instanceof HTMLVideoElement)) return;
      if (slideIndexOf(vid) !== activeRef.current) vid.pause();
    };
    // `play` does not bubble — listen in the capture phase.
    vp.addEventListener("play", onPlay, true);
    return () => vp.removeEventListener("play", onPlay, true);
  }, []);

  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    vp.querySelectorAll("video").forEach((vid) => {
      if (slideIndexOf(vid) === active) {
        try {
          vid.currentTime = 0;
        } catch {}
        vid.play().catch(() => {});
      } else {
        vid.pause();
      }
    });
  }, [active]);

  // --- Manual drag / swipe ---
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return; // left button / touch / pen only
    // Don't start dragging if clicking on a link or button
    const target = e.target as HTMLElement;
    const nativeTarget = (e.nativeEvent?.target as HTMLElement) || target;
    // Check both direct tag and ancestors
    if (nativeTarget.tagName === "A" || nativeTarget.tagName === "BUTTON") return;
    if (nativeTarget.closest("a, button")) return;
    draggingRef.current = true;
    setDragging(true);
    startXRef.current = e.clientX;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    setDragPx(e.clientX - startXRef.current);
  };

  const endDrag = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    setDragging(false);
    const dx = e.clientX - startXRef.current;
    setDragPx(0);
    const w = viewportRef.current?.clientWidth ?? 1;
    const threshold = Math.min(120, w * 0.18);
    // LTR viewport: dragging right reveals the previous slide, left the next.
    if (dx > threshold) prev();
    else if (dx < -threshold) next();
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
  };

  // A cancelled gesture (incoming call, browser takes over the pointer…) can
  // report clientX=0, which would read as a huge drag — just snap back.
  const abortDrag = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    setDragging(false);
    setDragPx(0);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
  };

  return (
    <section
      id="showcase"
      className="relative overflow-hidden"
      aria-label={PORTFOLIO_SHOWCASE.title}
    >
      <div className="container-x pt-6 md:pt-8">
        <Reveal>
          <h2 className="font-display font-black tracking-[-0.02em] text-white text-4xl leading-[1.1] md:text-6xl">
            {PORTFOLIO_SHOWCASE.title}
          </h2>
        </Reveal>
      </div>

      <div className="relative mt-8 md:mt-10">
        {/* Viewport — forced LTR so the transform math is unambiguous; each
            slide restores dir=rtl for its Hebrew content. */}
        <div
          ref={viewportRef}
          dir="ltr"
          className="overflow-hidden select-none"
          style={{ touchAction: "pan-y", cursor: dragging ? "grabbing" : "grab" }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={abortDrag}
        >
          <div
            className="flex"
            style={{
              // The track is a block-level flex container: its own width equals
              // one viewport (children overflow it), so translateX(-100%) moves
              // exactly one slide. Drag offset is added in px.
              transform: `translateX(calc(${-active * 100}% + ${dragPx}px))`,
              transition:
                dragging || reduce ? "none" : "transform 0.6s var(--ease-brand)",
              willChange: "transform",
            }}
          >
            {SHOWCASE_PROJECTS.map((p, i) => (
              <div
                key={p.id}
                dir="rtl"
                data-slide={i}
                className="relative w-full shrink-0 h-[70vh] min-h-[460px] md:h-[82svh] md:min-h-[560px]"
              >
                {p.video ? (
                  <DeferredVideo
                    className="absolute inset-0 h-full w-full object-cover"
                    poster={p.image}
                    posterVariants={p.posterVariants}
                    playDelayMs={3000}
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
                    className="object-cover pointer-events-none"
                    draggable={false}
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
                  {p.href && (
                    <Link
                      href={p.href}
                      draggable={false}
                      className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 font-display text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold-400)]"
                    >
                      לצפייה בעמוד הפרויקט
                      <span aria-hidden="true">←</span>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prev / next controls — one on each side */}
        <button
          type="button"
          aria-label="הפרויקט הקודם"
          onClick={prev}
          className="glass-btn showcase-nav !w-11 !h-11 !p-0 !rounded-full !absolute start-4 md:start-8 top-1/2 -translate-y-1/2 z-10"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 rtl:-scale-x-100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="הפרויקט הבא"
          onClick={next}
          className="glass-btn showcase-nav !w-11 !h-11 !p-0 !rounded-full !absolute end-4 md:end-8 top-1/2 -translate-y-1/2 z-10"
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
