"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Reveal } from "./ui/Reveal";

type Item = { q: string; a: string };

/**
 * Standalone FAQ accordion for the full /faq page. Same open/close behaviour
 * and visual language as the homepage FAQ module, but driven by a passed-in
 * list so it can render the complete question set.
 */
export function FaqAccordion({ items }: { items: readonly Item[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const reduce = useReducedMotion();

  return (
    <ul className="divide-y divide-black/10 border-y border-black/10">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <Reveal as="li" index={i % 6} key={item.q}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-4 py-5 text-start"
              >
                <span className="font-display text-lg md:text-xl text-[color:var(--ink-950)]">
                  {item.q}
                </span>
                <span
                  className="shrink-0 grid place-items-center w-8 h-8 rounded-full border border-black/15 text-[color:var(--gold-700)] transition-transform duration-300"
                  style={{ transform: isOpen ? "rotate(45deg)" : "none" }}
                  aria-hidden="true"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={reduce ? undefined : { height: 0, opacity: 0 }}
                  animate={reduce ? undefined : { height: "auto", opacity: 1 }}
                  exit={reduce ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 text-[color:var(--ink-950)]/70 leading-relaxed">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </Reveal>
        );
      })}
    </ul>
  );
}
