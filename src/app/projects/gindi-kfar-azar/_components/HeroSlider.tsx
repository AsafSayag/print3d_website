"use client";

import { useCallback, useEffect, useState } from "react";
import { ScrollHint } from "./ScrollHint";

type Props = {
  slides: string[];
  alt: string;
  eyebrow?: string;
  title: string;
};

/**
 * Full-bleed hero image slider for the project page. Crossfades between the
 * project shots automatically, and gives the user manual control via a left
 * and a right arrow (and dots). Any manual interaction pauses the auto-advance.
 */
export function HeroSlider({ slides, alt, eyebrow, title }: Props) {
  const n = slides.length;
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (delta: number) => {
      setPaused(true);
      setIdx((i) => (i + delta + n) % n);
    },
    [n],
  );

  // Auto-advance (skipped while paused or with a single slide).
  useEffect(() => {
    if (paused || n <= 1) return;
    const t = window.setInterval(() => setIdx((i) => (i + 1) % n), 5000);
    return () => window.clearInterval(t);
  }, [paused, n]);

  return (
    <section className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-[color:var(--navy-950)]">
      {slides.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt={i === idx ? alt : ""}
          aria-hidden={i !== idx}
          fetchPriority={i === 0 ? "high" : undefined}
          loading={i === 0 ? "eager" : "lazy"}
          className="absolute inset-0 h-full w-full object-cover object-[center_55%] transition-opacity duration-[1100ms] ease-[var(--ease-brand)]"
          style={{ opacity: i === idx ? 1 : 0 }}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(7,13,23,0.92)] via-[rgba(7,13,23,0.32)] to-[rgba(7,13,23,0.12)]" />

      {/* Copy */}
      <div className="container-x relative h-full flex flex-col items-center justify-center text-center text-white">
        {eyebrow ? (
          <p className="eyebrow text-[color:var(--steel-300)] mb-3">{eyebrow}</p>
        ) : null}
        <h1
          className="h1 heading-accent heading-accent--center max-w-3xl font-bold"
          style={{ fontSize: "clamp(2.75rem, 6.5vw, 4.75rem)" }}
        >
          {title}
        </h1>
      </div>

      {/* Navigation arrows */}
      {n > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="התמונה הבאה"
            className="hero-arrow absolute start-3 sm:start-6 top-1/2 -translate-y-1/2 z-20"
          >
            <Chevron dir="start" />
          </button>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="התמונה הקודמת"
            className="hero-arrow absolute end-3 sm:end-6 top-1/2 -translate-y-1/2 z-20"
          >
            <Chevron dir="end" />
          </button>

          {/* Dots */}
          <div className="absolute inset-x-0 bottom-24 sm:bottom-28 z-20 flex justify-center gap-2">
            {slides.map((s, i) => (
              <button
                key={s}
                type="button"
                aria-label={`מעבר לתמונה ${i + 1}`}
                aria-current={i === idx}
                onClick={() => {
                  setPaused(true);
                  setIdx(i);
                }}
                className="h-2.5 rounded-full transition-all duration-300"
                style={{
                  width: i === idx ? 26 : 10,
                  background:
                    i === idx ? "var(--gold-400)" : "rgba(255,255,255,0.55)",
                }}
              />
            ))}
          </div>
        </>
      )}

      <ScrollHint />

      <style>
        {
          ".hero-arrow{display:grid;place-items:center;width:44px;height:44px;border-radius:9999px;color:#fff;border:1px solid rgba(255,255,255,0.35);background:rgba(9,15,26,0.4);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);box-shadow:0 10px 30px -14px rgba(0,0,0,0.7);transition:background .3s,transform .3s,border-color .3s}.hero-arrow:hover{background:rgba(9,15,26,0.7);border-color:rgba(255,255,255,0.6);transform:translateY(-50%) scale(1.08)}@media (min-width:640px){.hero-arrow{width:52px;height:52px}}"
        }
      </style>
    </section>
  );
}

function Chevron({ dir }: { dir: "start" | "end" }) {
  // "start" arrow points toward the inline-start (right in RTL); "end" the
  // opposite. rtl:-scale-x-100 flips the glyph so it always points outward.
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="rtl:-scale-x-100"
    >
      {dir === "start" ? (
        <path d="M15 6l-6 6 6 6" />
      ) : (
        <path d="M9 6l6 6-6 6" />
      )}
    </svg>
  );
}
