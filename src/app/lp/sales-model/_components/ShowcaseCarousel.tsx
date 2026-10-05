"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { GlassButton } from "@/components/ui/GlassButton";
import { Reveal } from "@/components/ui/Reveal";
import { analyticsAttrs } from "@/lib/analytics";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { LP_LOCATION, LP_SHOWCASE } from "../content";

/** Time each project stays on screen before auto-advancing. */
const AUTOPLAY_MS = 5500;

/**
 * Large project carousel: one project centred at a time, with the edges of its
 * neighbours peeking in on both sides so it's obvious there's more to swipe.
 *
 * Built on native horizontal scroll + scroll-snap (swipe, trackpad and keys
 * all work for free). On every scroll frame each slide gets `--p`, its signed
 * distance from the centre in slide widths (0 = centred, ±1 = one slot over);
 * the CSS turns that into the scroll effect — neighbours shrink and dim, the
 * photo drifts against the motion, the caption fades in only when centred.
 *
 * Endless: the list is rendered three times and the track starts on the
 * middle copy, so there is always a neighbour peeking on both sides. Once a
 * scroll settles outside the middle copy it's silently re-centred on the
 * identical slide inside it. The outer copies are hidden from assistive tech.
 *
 * Auto-advances while on screen, and stops for good the moment the visitor
 * takes control (swipe, wheel, arrows, dots).
 */
export function ShowcaseCarousel() {
  const items = LP_SHOWCASE.items;
  const n: number = items.length;
  const slides = [...items, ...items, ...items];
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  /** Index into `slides` of the centred slide. */
  const [pos, setPos] = useState<number>(n);
  const active = pos % n;
  const [userControlled, setUserControlled] = useState(false);
  const [inView, setInView] = useState(false);

  // Scroll the track (never the page) so slide `i` (index into `slides`) is centred.
  const centre = useCallback(
    (i: number, smooth: boolean) => {
      const track = trackRef.current;
      const el = slideRefs.current[i];
      if (!track || !el) return;
      const t = track.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      track.scrollTo({
        left:
          track.scrollLeft + (r.left + r.width / 2 - (t.left + t.width / 2)),
        behavior: smooth && !reduce ? "smooth" : "instant",
      });
    },
    [reduce],
  );
  const goTo = useCallback((i: number) => centre(i, true), [centre]);

  // Scroll → per-slide `--p` + which slide is centred; re-centre into the
  // middle copy once the scroll settles.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    let settle = 0;
    let current: number = n;
    const update = () => {
      raf = 0;
      const t = track.getBoundingClientRect();
      const centre = t.left + t.width / 2;
      let best = 0;
      let bestDist = Infinity;
      slideRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const p = (r.left + r.width / 2 - centre) / r.width;
        el.style.setProperty(
          "--p",
          Math.max(-1.5, Math.min(1.5, p)).toFixed(3),
        );
        if (Math.abs(p) < bestDist) {
          bestDist = Math.abs(p);
          best = i;
        }
      });
      current = best;
      setPos(best);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
      window.clearTimeout(settle);
      settle = window.setTimeout(() => {
        if (current < n) centre(current + n, false);
        else if (current >= 2 * n) centre(current - n, false);
      }, 160);
    };
    centre(n, false);
    update();
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.clearTimeout(settle);
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [n, centre]);

  // Only autoplay while the carousel is actually on screen.
  useEffect(() => {
    const track = trackRef.current;
    if (!track || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold: 0.5,
    });
    io.observe(track);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduce || userControlled || !inView) return;
    const id = window.setTimeout(() => {
      if (document.visibilityState === "visible") goTo(pos + 1);
    }, AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [pos, inView, reduce, userControlled, goTo]);

  const takeControl = () => setUserControlled(true);

  return (
    <section
      className="lp-showcase surface-white section-lp"
      aria-labelledby="lp-showcase-title"
    >
      <div className="container-x">
        <div className="text-center max-w-2xl mx-auto">
          <Reveal>
            <p className="eyebrow text-[color:var(--gold-700)]">
              {LP_SHOWCASE.eyebrow}
            </p>
          </Reveal>
          <Reveal index={1}>
            <h2
              id="lp-showcase-title"
              className="h2 mt-4 text-[color:var(--ink-950)] text-balance"
            >
              {LP_SHOWCASE.title}
            </h2>
          </Reveal>
        </div>
      </div>

      <div
        ref={trackRef}
        className="lp-car-track mt-10 md:mt-12"
        role="region"
        aria-roledescription="קרוסלה"
        aria-label="פרויקטים נבחרים"
        tabIndex={0}
        onPointerDown={takeControl}
        onWheel={takeControl}
        onKeyDown={takeControl}
      >
        {slides.map((item, i) => {
          const clone = i < n || i >= 2 * n;
          return (
            <div
              key={`${i}-${item.src}`}
              ref={(el) => {
                slideRefs.current[i] = el;
              }}
              className={`lp-car-slide${i === pos ? " is-active" : ""}`}
              {...(clone
                ? { "aria-hidden": true }
                : {
                    role: "group",
                    "aria-roledescription": "שקופית",
                    "aria-label": `${(i % n) + 1} מתוך ${n}: ${item.client}`,
                  })}
            >
              <div className="lp-car-card">
                <Image
                  src={item.src}
                  alt={clone ? "" : item.alt}
                  width={item.w}
                  height={item.h}
                  sizes="(min-width: 1280px) 980px, (min-width: 768px) 74vw, 78vw"
                  className="lp-car-img"
                />
                <div className="lp-car-cap">
                  <p className="lp-car-client">{item.client}</p>
                  <p className="lp-car-project">{item.project}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="container-x">
        <div className="lp-car-controls">
          <button
            type="button"
            className="lp-car-arrow"
            aria-label="הפרויקט הקודם"
            onClick={() => {
              takeControl();
              goTo(pos - 1);
            }}
          >
            {/* RTL: "previous" sits on the right and points right. */}
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8 4l6 6-6 6" />
            </svg>
          </button>
          <div className="lp-car-dots">
            {items.map((item, i) => (
              <button
                key={item.src}
                type="button"
                className={`lp-car-dot${i === active ? " is-active" : ""}`}
                aria-label={`עברו לפרויקט ${i + 1}: ${item.client}`}
                aria-current={i === active ? "true" : undefined}
                onClick={() => {
                  takeControl();
                  goTo(pos - active + i);
                }}
              />
            ))}
          </div>
          <button
            type="button"
            className="lp-car-arrow"
            aria-label="הפרויקט הבא"
            onClick={() => {
              takeControl();
              goTo(pos + 1);
            }}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 4l-6 6 6 6" />
            </svg>
          </button>
        </div>

        <div className="mt-12 flex flex-col items-center gap-5 text-center">
          <p className="lp-car-cta-lead">{LP_SHOWCASE.ctaLead}</p>
          <GlassButton
            href="#lead"
            variant="primary"
            className="cta-glow lp-cta-lg"
            {...analyticsAttrs("cta_click", {
              cta_name: "quote_request",
              location: `${LP_LOCATION}_showcase`,
            })}
          >
            {LP_SHOWCASE.cta}
          </GlassButton>
        </div>
      </div>
    </section>
  );
}
