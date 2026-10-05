"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { LP_JOURNEY } from "../content";

type Step = (typeof LP_JOURNEY.steps)[number];

/**
 * The heart of the page: the buyer's path through a sales meeting, drawn as a
 * glowing line that fills as the visitor scrolls. Each station lights up when
 * the line reaches it and its photo wipes open — so reading the page literally
 * feels like moving forward along a path.
 *
 * Desktop: line in the centre, steps alternate sides. Mobile: line along the
 * inline-start edge, steps stacked beside it.
 */
export function FlowJourney() {
  const reduce = useReducedMotion() ?? false;
  const trackRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 65%", "end 55%"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });

  // Which station the line has reached — drives the node glow.
  const count = LP_JOURNEY.steps.length;
  const [reached, setReached] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (reduce) return;
    const next = Math.min(count, Math.floor(v * count + 0.35));
    if (next !== reached) setReached(next);
  });

  return (
    <section id="lp-journey" className="lp-journey surface-navy-950 section-lp" aria-labelledby="lp-journey-title">
      <div aria-hidden="true" className="lp-journey-bg" />
      <div className="container-x relative">
        <motion.div
          className="text-center max-w-2xl mx-auto"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <p className="eyebrow text-[color:var(--steel-300)]">{LP_JOURNEY.eyebrow}</p>
          <h2 id="lp-journey-title" className="h2 mt-4 text-white text-balance">
            {LP_JOURNEY.title}
          </h2>
        </motion.div>

        <ol ref={trackRef} className="lp-track">
          {/* Rail + animated fill */}
          <span aria-hidden="true" className="lp-rail">
            <motion.span
              className="lp-rail-fill"
              style={reduce ? { scaleY: 1 } : { scaleY: fill }}
            />
          </span>

          {LP_JOURNEY.steps.map((step, i) => (
            <JourneyStep
              key={step.title}
              step={step}
              index={i}
              lit={reduce || i < reached}
              reduce={reduce}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}

function JourneyStep({
  step,
  index,
  lit,
  reduce,
}: {
  step: Step;
  index: number;
  lit: boolean;
  reduce: boolean;
}) {
  const flip = index % 2 === 1;

  return (
    <li className={`lp-step${flip ? " is-flip" : ""}${lit ? " is-lit" : ""}`}>
      <span aria-hidden="true" className="lp-node">
        <span className="lp-node-core num">{index + 1}</span>
      </span>

      <motion.div
        className="lp-step-text"
        initial={reduce ? false : { opacity: 0, x: flip ? -36 : 36 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.75, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <p className="lp-step-kicker">שלב {index + 1}</p>
        <h3 className="h3 text-white mt-1">{step.title}</h3>
        <p className="mt-3 text-white/70 leading-relaxed">{step.text}</p>
      </motion.div>

      <motion.div
        className="lp-step-media"
        initial={reduce ? false : { clipPath: "inset(12% 12% 12% 12% round 24px)", opacity: 0.2 }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0% round 24px)", opacity: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <Image
          src={step.image.src}
          alt={step.image.alt}
          width={step.image.w}
          height={step.image.h}
          sizes="(min-width: 1024px) 480px, 90vw"
          className="lp-step-img"
        />
      </motion.div>
    </li>
  );
}
