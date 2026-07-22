"use client";

import { useEffect, useState, type ReactNode } from "react";
import { MOTION } from "@/lib/constants";
import { useInViewOnce } from "@/lib/useInViewOnce";

type Props = {
  children: ReactNode;
  /** Stagger index — delays reveal by index * step. */
  index?: number;
  as?: "div" | "li" | "span" | "section";
  className?: string;
  /** Extra delay in seconds on top of the index stagger. */
  delay?: number;
  /**
   * Above-the-fold mode. Instead of gating the fade+rise on hydration + an
   * IntersectionObserver, run it as a pure-CSS entrance that plays on the first
   * paint. Use this ONLY for content that is the LCP element or sits with it in
   * the initial viewport (e.g. the hero heading): gating those on JS holds them
   * at opacity:0 until the bundle hydrates, which wrecks LCP. Off by default so
   * below-the-fold reveals keep their scroll-triggered behaviour.
   */
  immediate?: boolean;
};

/**
 * Fade + rise reveal, fired once when scrolled into view.
 * Driven by a rAF position check (see useInViewOnce) so it never leaves content
 * stuck invisible. Respects prefers-reduced-motion.
 */
export function Reveal({
  children,
  index = 0,
  as: Tag = "div",
  className,
  delay = 0,
  immediate = false,
}: Props) {
  const [ref, shown] = useInViewOnce<HTMLElement>();
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const totalDelay = delay + index * MOTION.staggerStep;

  // Immediate mode: no JS gate. The element is emitted visible in the SSR HTML
  // and animated by a pure-CSS keyframe (see .reveal-immediate) so it paints as
  // the LCP element on first frame rather than after hydration. The stagger is
  // carried by animation-delay instead of transition-delay.
  if (immediate) {
    return (
      <Tag
        ref={ref as never}
        className={className ? `reveal-immediate ${className}` : "reveal-immediate"}
        style={{ animationDelay: `${totalDelay}s` }}
      >
        {children}
      </Tag>
    );
  }

  const style: React.CSSProperties = reduce
    ? {}
    : {
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : `translateY(${MOTION.revealDistance}px)`,
        transition: `opacity ${MOTION.revealDuration}s var(--ease-brand) ${totalDelay}s, transform ${MOTION.revealDuration}s var(--ease-brand) ${totalDelay}s`,
        willChange: "opacity, transform",
      };

  return (
    // @ts-expect-error — dynamic tag with a shared ref type
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}
