"use client";

import { useEffect, useRef } from "react";
import { CLIENT_LOGOS, CLIENTS_HEADING } from "@/lib/content";

const AUTO_SPEED = 0.5; // px per frame
const RESUME_DELAY = 1600; // ms of quiet before auto-scroll resumes

/**
 * Client-logo marquee. Auto-scrolls on its own, but the user can also scroll or
 * drag it horizontally — auto-scroll pauses during interaction and resumes.
 * The list is duplicated twice so scrollLeft can wrap seamlessly both ways.
 * The scroller runs LTR to keep scrollLeft behaviour consistent across browsers.
 */
export function ClientLogos() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pauseUntil = useRef(0);
  const drag = useRef<{ active: boolean; startX: number; startLeft: number }>({
    active: false,
    startX: 0,
    startLeft: 0,
  });

  const loop = [...CLIENT_LOGOS, ...CLIENT_LOGOS];
  const count = CLIENT_LOGOS.length;

  useEffect(() => {
    const scroller = scrollerRef.current;
    const track = trackRef.current;
    if (!scroller || !track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const now = () => performance.now();
    const pause = () => (pauseUntil.current = now() + RESUME_DELAY);
    const half = () => track.scrollWidth / 2;

    const wrap = () => {
      const h = half();
      if (h <= 0) return;
      if (scroller.scrollLeft >= h) scroller.scrollLeft -= h;
      else if (scroller.scrollLeft < 0) scroller.scrollLeft += h;
    };

    // Highlight the logo currently nearest the horizontal centre — the same
    // treatment hover gives, but driven by position so it works on touch too.
    // As the marquee moves, the centred tile lights up and hands the highlight
    // to the next one as it takes the centre. Throttled (every 8th frame) and
    // computed from live rects so it tracks both auto-scroll and user drags.
    let activeBox: HTMLElement | null = null;
    const updateCenter = () => {
      const r = scroller.getBoundingClientRect();
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

    // Fractional carry: mobile browsers (notably iOS Safari) round scrollLeft to
    // whole pixels, so `scrollLeft += 0.5` was silently discarded every frame and
    // the marquee never advanced on touch devices. Accumulate the sub-pixel step
    // and only ever apply whole-pixel deltas, so it moves on every platform.
    let carry = 0;
    let frame = 0;
    let active = false;
    const tick = () => {
      if (!active) return;
      if (now() >= pauseUntil.current && !drag.current.active) {
        carry += AUTO_SPEED;
        const whole = Math.trunc(carry);
        if (whole !== 0) {
          scroller.scrollLeft += whole;
          carry -= whole;
        }
      }
      wrap();
      if ((frame++ & 7) === 0) updateCenter();
      raf = requestAnimationFrame(tick);
    };
    const startLoop = () => {
      if (active) return;
      active = true;
      raf = requestAnimationFrame(tick);
    };
    const stopLoop = () => {
      active = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    // Pause on genuine user input only. (Do NOT listen to the "scroll" event —
    // the auto-scroll itself fires it, which would pause the auto-scroll.)
    const onWheel = () => pause();

    // Pointer drag-to-scroll (mouse).
    const onPointerDown = (e: PointerEvent) => {
      drag.current = {
        active: true,
        startX: e.clientX,
        startLeft: scroller.scrollLeft,
      };
      pause();
      scroller.setPointerCapture(e.pointerId);
      scroller.classList.add("is-dragging");
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!drag.current.active) return;
      scroller.scrollLeft = drag.current.startLeft - (e.clientX - drag.current.startX);
    };
    const onPointerUp = (e: PointerEvent) => {
      if (!drag.current.active) return;
      drag.current.active = false;
      pause();
      try {
        scroller.releasePointerCapture(e.pointerId);
      } catch {}
      scroller.classList.remove("is-dragging");
    };

    scroller.addEventListener("wheel", onWheel, { passive: true });
    scroller.addEventListener("touchstart", pause, { passive: true });
    scroller.addEventListener("pointerdown", onPointerDown);
    scroller.addEventListener("pointermove", onPointerMove);
    scroller.addEventListener("pointerup", onPointerUp);
    scroller.addEventListener("pointercancel", onPointerUp);

    // Only run the auto-scroll rAF while the marquee is actually on screen. It
    // sits below the pinned ScrollSequence, so without this it would keep
    // spending a frame every tick while the user scrubs the sequence above it.
    let io: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) startLoop();
          else stopLoop();
        },
        { rootMargin: "100px 0px" },
      );
      io.observe(scroller);
    }
    // Start immediately as a fallback. On real devices the observer corrects
    // this within a frame — pausing the loop if the marquee is actually
    // off-screen — but this guarantees it runs in environments where the
    // IntersectionObserver never fires (e.g. the headless preview).
    startLoop();

    return () => {
      stopLoop();
      activeBox?.classList.remove("is-active");
      io?.disconnect();
      scroller.removeEventListener("wheel", onWheel);
      scroller.removeEventListener("touchstart", pause);
      scroller.removeEventListener("pointerdown", onPointerDown);
      scroller.removeEventListener("pointermove", onPointerMove);
      scroller.removeEventListener("pointerup", onPointerUp);
      scroller.removeEventListener("pointercancel", onPointerUp);
    };
  }, []);

  return (
    <section id="clients" className="framer-logos-section" aria-label="לקוחות">
      <p className="framer-logos-subtitle">{CLIENTS_HEADING}</p>

      <div className="framer-marquee-container">
        <div className="framer-scroller" ref={scrollerRef} dir="ltr">
          <div className="framer-marquee-track" ref={trackRef}>
            {loop.map((logo, i) => (
              <div className="framer-logo-box" key={i}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logo.src}
                  alt={i < count ? logo.alt : ""}
                  aria-hidden={i >= count}
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
