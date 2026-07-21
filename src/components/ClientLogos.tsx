"use client";

import { useEffect, useRef } from "react";
import { CLIENT_LOGOS, CLIENTS_HEADING } from "@/lib/content";

// Auto-scroll speed in px/second — time-based, so it's identical on 60Hz and
// 120Hz displays (the old per-frame constant ran twice as fast on high-refresh
// screens). Mobile runs a touch quicker: the strip is narrower there, so a
// higher rate keeps the logos gliding past at a lively, legible pace.
const AUTO_SPEED_DESKTOP = 46;
const AUTO_SPEED_MOBILE = 78;
const MOBILE_QUERY = "(max-width: 767px)";
const RESUME_DELAY = 1600; // ms of quiet before auto-scroll resumes
// Flick momentum — a released swipe keeps gliding and decays instead of
// dead-stopping, which is what makes manual scrubbing feel natural on touch.
// FRICTION is applied per ~60fps frame; MIN is the px/s speed below which the
// glide ends (and, for a release, the threshold for it to count as a flick at
// all rather than a slow drag-and-hold that should just settle in place).
const FLING_FRICTION = 0.94;
const FLING_MIN = 12;

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

    // Speed follows the viewport: mobile scrolls a bit faster. Kept live so a
    // rotate / resize across the breakpoint updates it.
    const mql = window.matchMedia(MOBILE_QUERY);
    let autoSpeed = mql.matches ? AUTO_SPEED_MOBILE : AUTO_SPEED_DESKTOP;
    const onMedia = () =>
      (autoSpeed = mql.matches ? AUTO_SPEED_MOBILE : AUTO_SPEED_DESKTOP);
    mql.addEventListener("change", onMedia);

    let raf = 0;
    let running = false;
    let frame = 0;
    let pauseUntil = 0;
    let lastT = now(); // for time-based (dt) stepping
    let fling = 0; // px/sec glide carried after a swipe release
    // Current translate offset (px); translateX(-offset) moves the logos left as
    // it grows. Sub-pixel values are fine — transforms aren't pixel-rounded.
    let offset = seg(); // start in the middle copy → a full segment of runway both ways
    const drag = { active: false, startX: 0, startOffset: 0, velX: 0, lastX: 0, lastT: 0 };

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
      const t = now();
      const dt = Math.min(t - lastT, 50); // ms; clamp jumps after a tab switch
      lastT = t;
      if (!drag.active) {
        if (Math.abs(fling) > FLING_MIN) {
          // Glide from the swipe, decaying by friction each frame.
          offset += (fling * dt) / 1000;
          fling *= Math.pow(FLING_FRICTION, dt / 16.67);
        } else if (!reduced && t >= pauseUntil) {
          fling = 0;
          offset += (autoSpeed * dt) / 1000;
        }
      }
      wrap();
      render();
      if ((frame++ & 7) === 0) updateCenter();
      raf = requestAnimationFrame(tick);
    };
    const start = () => {
      if (running) return;
      running = true;
      lastT = now(); // avoid a huge first dt after being stopped
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
      drag.lastX = e.clientX;
      drag.lastT = now();
      drag.velX = 0;
      fling = 0; // a new grab cancels any in-flight glide
      pause();
      try {
        viewport.setPointerCapture(e.pointerId);
      } catch {}
      viewport.classList.add("is-dragging");
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!drag.active) return;
      // Content follows the finger: dragging right slides the logos right.
      // Track a smoothed velocity (in offset space, opposite the finger) so a
      // release can carry momentum.
      const t = now();
      const dt = t - drag.lastT;
      if (dt > 0) {
        const inst = (-(e.clientX - drag.lastX) / dt) * 1000; // px/sec
        drag.velX = drag.velX * 0.7 + inst * 0.3;
        drag.lastX = e.clientX;
        drag.lastT = t;
      }
      offset = drag.startOffset - (e.clientX - drag.startX);
      wrap();
      render();
    };
    const onPointerUp = (e: PointerEvent) => {
      if (!drag.active) return;
      drag.active = false;
      // Carry the release velocity into a glide, but only for a real flick — a
      // slow drag-and-hold should settle right where it was let go.
      fling = Math.abs(drag.velX) > FLING_MIN ? drag.velX : 0;
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
      mql.removeEventListener("change", onMedia);
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
