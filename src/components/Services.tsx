"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { WE_BUILD } from "@/lib/content";
import { analyticsAttrs } from "@/lib/analytics";
import { Reveal } from "./ui/Reveal";

/**
 * "מה אנחנו בונים" — a central "mirror" heading that flips to reveal each
 * category's title + description. On desktop it reacts to hover/focus; on
 * touch devices a tap toggles it. The swap is a vertical 3D flip (rotateX),
 * reading like a mirror turning over. Reduced-motion falls back to a crossfade.
 */
export function Services() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);
  const [hasHover, setHasHover] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setHasHover(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const activeCard = active !== null ? WE_BUILD.cards[active] : null;

  const onEnter = (i: number) => hasHover && setActive(i);
  const onLeave = () => hasHover && setActive(null);
  // Click/tap toggles on every device (touch taps, and desktop clicks or
  // keyboard Enter/Space) — hover just previews on top of it.
  const onToggle = (i: number) =>
    setActive((prev) => (prev === i ? null : i));

  return (
    <section
      id="services"
      className="surface-ice section"
      aria-label={WE_BUILD.heading}
    >
      <div className="container-x">
        <Reveal>
          <p className="eyebrow text-center text-[color:var(--gold-700)]">
            {WE_BUILD.eyebrow}
          </p>
        </Reveal>

        {/* Mirror — the flipping heading */}
        <div className="wb-mirror" style={{ perspective: "1000px" }}>
          <motion.div
            key={active ?? "default"}
            className="wb-mirror-face"
            initial={reduce ? { opacity: 0 } : { rotateX: 90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
            style={{ transformOrigin: "50% 50%", backfaceVisibility: "hidden" }}
          >
            {activeCard ? (
              <>
                <h2 className="wb-mirror-title">{activeCard.title}</h2>
                <p className="wb-mirror-sub">{activeCard.text}</p>
              </>
            ) : (
              <h2 className="wb-mirror-heading heading-accent heading-accent--center">
                {WE_BUILD.heading}
              </h2>
            )}
          </motion.div>
        </div>

        {/* Category cards — the flip triggers */}
        <ul className="wb-grid">
          {WE_BUILD.cards.map((card, i) => (
            <Reveal as="li" index={i} key={card.title}>
              <button
                type="button"
                className={`wb-card${active === i ? " is-active" : ""}`}
                onMouseEnter={() => onEnter(i)}
                onMouseLeave={onLeave}
                onFocus={() => onEnter(i)}
                onBlur={onLeave}
                onClick={() => onToggle(i)}
                aria-pressed={active === i}
                aria-label={card.title}
              >
                <span className="wb-card-media">
                  <Image
                    src={card.image.src}
                    alt={card.image.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                  <span aria-hidden="true" className="wb-card-scrim" />
                </span>
                <span className="wb-card-title">{card.title}</span>
                {/* Full description kept in the DOM for SEO / screen readers */}
                <span className="sr-only">{card.text}</span>
              </button>
            </Reveal>
          ))}
        </ul>

        <div className="mt-9 text-center">
          <Link
            href="/projects"
            className="wb-catalog-link"
            {...analyticsAttrs("cta_click", {
              cta_name: "view_projects",
              location: "home_services",
            })}
          >
            לצפייה בקטלוג הפרויקטים
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M11 6l-6 6 6 6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
