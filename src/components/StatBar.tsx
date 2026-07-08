"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { STATS } from "@/lib/content";
import { useInViewOnce } from "@/lib/useInViewOnce";

const COUNT_DURATION = 1200; // ms

function CountUp({ target, suffix }: { target: number; suffix?: string }) {
  const [value, setValue] = useState(0);
  const [ref, inView] = useInViewOnce<HTMLSpanElement>();
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setValue(target);
      return;
    }
    let raf = 0;
    let start: number | null = null;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / COUNT_DURATION, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    // Safety net: guarantee the final value even if rAF is throttled/stalled.
    const settle = window.setTimeout(
      () => setValue(target),
      COUNT_DURATION + 150,
    );
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(settle);
    };
  }, [inView, target, reduce]);

  return (
    <span ref={ref} className="num" dir="ltr">
      {value}
      {suffix}
    </span>
  );
}

export function StatBar() {
  return (
    <section
      className="surface-navy-800"
      aria-label="נתוני החברה"
      style={{ borderBlock: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="container-x py-12 md:py-14">
        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {STATS.map((stat, i) => (
            <li key={i} className="text-center lg:text-start">
              <div
                className="num font-bold text-[color:var(--gold-500)] leading-none mb-2"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)" }}
              >
                {stat.value !== null ? (
                  <CountUp target={stat.value} suffix={stat.suffix} />
                ) : (
                  <span dir="ltr">{stat.display}</span>
                )}
              </div>
              <div className="text-white/70 text-sm md:text-base">
                {stat.label}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
