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
}: Props) {
  const [ref, shown] = useInViewOnce<HTMLElement>();
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const totalDelay = delay + index * MOTION.staggerStep;
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
