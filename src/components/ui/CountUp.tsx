"use client";

import { useEffect, useState } from "react";
import { useInViewOnce } from "@/lib/useInViewOnce";

type Props = {
  /** Final value counted up to. */
  end: number;
  /** Appended after the number, e.g. "+". */
  suffix?: string;
  /** Count duration in seconds. */
  duration?: number;
  className?: string;
};

/**
 * Number that counts up from 0 when scrolled into view, with an ease-out
 * curve. Respects prefers-reduced-motion (jumps straight to the end value).
 */
export function CountUp({ end, suffix = "", duration = 1.8, className }: Props) {
  const [ref, inView] = useInViewOnce<HTMLSpanElement>();
  // Start at the FINAL value so the number is present in the server-rendered
  // HTML (SEO) and shows correctly even without JS. Once the element scrolls
  // into view the animation restarts from 0 and counts up over it.
  const [value, setValue] = useState(end);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setValue(end);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      setValue(Math.round(end * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, end, duration]);

  return (
    <span ref={ref} dir="ltr" className={`num ${className ?? ""}`}>
      {value}
      {suffix}
    </span>
  );
}
