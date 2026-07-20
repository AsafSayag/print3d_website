"use client";

import { useEffect, useRef } from "react";
import { CLIENT_LOGOS, CLIENTS_HEADING } from "@/lib/content";

const AUTO_SPEED = 0.5; // px per frame
const RESUME_DELAY = 1600; // ms of quiet before auto-scroll resumes

/**
 * Client-logo marquee. Auto-scrolls on its own; the user can also drag it
 * horizontally (pointer or touch) — the auto-advance pauses during interaction
 * and resumes after a short quiet period.
 *
 * The track is moved with `transform: translateX`, NOT native scrollLeft. A
 * native `overflow-x:auto` scroller fights the browser's own touch momentum on
 * mobile: the rAF loop writes scrollLeft every frame while iOS is still
 * animating its fling, so the two pull against each other and the strip visibly
 * ping-pongs between positions (the "flicker"). A transform-driven track has no
 * native scroll to fight → it stays smooth, composites on the GPU, and isn't
 * subject to iOS's whole-pixel scrollLeft rounding. Vertical page scrolling is
 * preserved via `touch-action: pan-y` (the viewport only claims horizontal
 * gestures; vertical ones scroll the page as usual).
 *
 * The list is tripled so the offset can wrap seamlessly in either direction —
 * kept inside the MIDDLE copy [seg, 2·seg) and jumped by one identical segment
 * whenever it drifts past an edge.
 */
export function ClientLogos() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const loop = [...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS];
  const count = CLIENT_LOGOS.length;

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;
    // Reduced motion disables only the auto-advance; manual dragging stays.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const now = () => performance.now();
    // Width of one copy of the tripled track (layout-based, unaffected by the
    // transform we apply below).
    const seg = () => track.scrollWidth / 3;

    let raf = 0;
    let running = false;
    let frame = 0;
    let pauseUntil = 0;
    // Current translate offset (px); translateX(-offset) moves the logos left as
    // it grows. Sub-pixel values are fine — transforms aren't pixel-rounded.
    let offset = seg(); // start in the middle copy → a full segment of runway both ways
    const drag = { active: false, startX: 0, startOffset: 0 };

    const pause = () => (pauseUntil = now() + RESUME_DELAY);
    const render = () => {
      track.style.transform = `translate3d(${-offset}px, 0, 0)`;
    };

    // Keep the offset inside the middle copy; a jump by one identical segment is
    // seamless.
    const wrap = () => {
      const s = seg();
      if (s <= 0) return;
      if (offset >= 2 * s) offset -= s;
      else if (offset < s) offset += s;
    };

    // Highlight the tile nearest the horizontal centre — the same treatment
    // hover gives, but position-driven so it works on touch. Throttled to every
    // 8th frame and computed from live rects, so it tracks auto-scroll and drags.
    let activeBox: HTMLElement | null = null;
    const updateCenter = () => {
      const r = viewport.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      let best: HTMLElement | null = null;
      let bestDist = Infinity;
      for (const child of track.children) {
        const box = child as HTMLElement;
        const b = box.getBoundingClientRect();
        const d = Math.abs(b.left + b.width / 2 - cx);
        if (d < bestDist) {
          bestDist = d;
          best = box;
        }
      }
      if (best && best !== activeBox) {
        activeBox?.classList.remove("is-active");
        best.classList.add("is-active");
        activeBox = best;
      }
    };

    const tick = () => {
      if (!running) return;
      if (!reduced && now() >= pauseUntil && !drag.active) {
        offset += AUTO_SPEED;
      }
      wrap();
      render();
      if ((frame++ & 7) === 0) updateCenter();
      raf = requestAnimationFrame(tick);
    };
    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    // Manual horizontal drag (pointer covers both mouse and touch). With
    // touch-action:pan-y the browser keeps vertical page scrolling and only
    // hands us the horizontal gestures.
    const onPointerDown = (e: PointerEvent) => {
      drag.active = true;
      drag.startX = e.clientX;
      drag.startOffset = offset;
      pause();
      try {
        viewport.setPointerCapture(e.pointerId);
      } catch {}
      viewport.classList.add("is-dragging");
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!drag.active) return;
      // Content follows the finger: dragging right slides the logos right.
      offset = drag.startOffset - (e.clientX - drag.startX);
      wrap();
      render();
    };
    const onPointerUp = (e: PointerEvent) => {
      if (!drag.active) return;
      drag.active = false;
      pause();
      try {
        viewport.releasePointerCapture(e.pointerId);
      } catch {}
      viewport.classList.remove("is-dragging");
    };
    const onWheel = () => pause();

    render();
    viewport.addEventListener("pointerdown", onPointerDown);
    viewport.addEventListener("pointermove", onPointerMove);
    viewport.addEventListener("pointerup", onPointerUp);
    viewport.addEventListener("pointercancel", onPointerUp);
    viewport.addEventListener("wheel", onWheel, { passive: true });

    // Only animate while on screen (it sits below the pinned ScrollSequence, so
    // otherwise it would burn a frame every tick during the scrub above it).
    let io: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) start();
          else stop();
        },
        { rootMargin: "100px 0px" },
      );
      io.observe(viewport);
    }
    // Fallback for environments where the observer never fires (e.g. headless).
    start();

    return () => {
      stop();
      activeBox?.classList.remove("is-active");
      io?.disconnect();
      viewport.removeEventListener("pointerdown", onPointerDown);
      viewport.removeEventListener("pointermove", onPointerMove);
      viewport.removeEventListener("pointerup", onPointerUp);
      viewport.removeEventListener("pointercancel", onPointerUp);
      viewport.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <section id="clients" className="framer-logos-section" aria-label="לקוחות">
      <p className="framer-logos-subtitle">{CLIENTS_HEADING}</p>
      <p className="framer-logos-stat">
        מעל 250 פרויקטים · יותר מ-15 שנה · עשרות מהיזמים המובילים בישראל
      </p>

      <div className="framer-marquee-container">
        {/* dir=ltr keeps the flex track laid out left-to-right so the transform
            math and logo order stay consistent inside the RTL page. */}
        <div className="framer-scroller" ref={viewportRef} dir="ltr">
          <div className="framer-marquee-track" ref={trackRef}>
            {loop.map((logo, i) => (
              <div className="framer-logo-box" key={i}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logo.src}
                  alt={i < count ? logo.alt : ""}
                  aria-hidden={i >= count}
                  width={logo.w}
                  height={logo.h}
                  loading="lazy"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
