"use client";

// Homepage "business value" module — cinematic model background + 3D fly-in cards.
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { BUSINESS_VALUE } from "@/lib/content";
import { Reveal } from "./ui/Reveal";
import { GlassButton } from "./ui/GlassButton";

type Card = (typeof BUSINESS_VALUE.cards)[number];

/**
 * A single value card. Flies in from the side with a 3D perspective tilt when
 * scrolled into view — on both desktop and mobile. The right-column cards enter
 * from the right, the left-column cards from the left.
 */
function ValueCard({
  card,
  index,
  reduce,
}: {
  card: Card;
  index: number;
  reduce: boolean;
}) {
  const isRight = card.side === "right";
  const dir = isRight ? 1 : -1;
  const variants: Variants = {
    hidden: reduce
      ? { opacity: 0 }
      : { opacity: 0, x: dir * 130, rotateY: dir * -30, scale: 0.92 },
    shown: { opacity: 1, x: 0, rotateY: 0, scale: 1 },
  };

  return (
    <motion.article
      className="bizval-card"
      variants={variants}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.25 }}
      transition={
        reduce
          ? { duration: 0.4 }
          : {
              type: "spring",
              stiffness: 90,
              damping: 13,
              mass: 0.9,
              delay: (index % 2) * 0.12 + Math.floor(index / 2) * 0.16,
            }
      }
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* On phones the icon shares the number's row (compact, less scrolling);
          from md up it becomes the side-by-side layout. */}
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 text-center md:flex-nowrap md:justify-start md:text-start md:gap-6">
        {/* Stat */}
        <div className={`order-1 shrink-0 ${isRight ? "md:order-2" : "md:order-1"}`}>
          <div className="bizval-stat num" dir="ltr">
            {card.stat}
          </div>
          <div className="bizval-stat-label">{card.statLabel}</div>
        </div>

        {/* Title + text */}
        <div
          className={`order-3 basis-full md:basis-auto md:flex-1 ${
            isRight ? "md:order-1" : "md:order-2"
          }`}
        >
          <h3 className="h3 text-white text-lg md:text-xl">{card.title}</h3>
          <p className="mt-1.5 md:mt-2 text-white/60 text-[15px] leading-relaxed">
            {card.text}
          </p>
        </div>

        {/* Icon */}
        <span
          aria-hidden="true"
          className="bizval-icon order-2 ms-auto md:order-3 md:ms-0"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {ICONS[card.icon]}
          </svg>
        </span>
      </div>
    </motion.article>
  );
}

/**
 * Cinematic background — a real architectural masterplan model, sunk into a
 * deep-navy scrim so it reads as a premium ambient backdrop (warm model lights
 * glowing through) rather than a flat colour. A faint engineering grid keeps
 * the brand's blueprint signature over it.
 */
function BackgroundScene() {
  return (
    <div aria-hidden="true" className="bizval-bg">
      <Image
        src="/projects/maoz-daniel-bat-yam.webp"
        alt=""
        fill
        sizes="100vw"
        className="bizval-bg-img"
      />
      <span className="bizval-bg-scrim" />
      <span className="bizval-grid" />
      <span className="bizval-glow" />
    </div>
  );
}

const ICONS: Record<string, React.ReactNode> = {
  // Shorten the sale period → a stopwatch (time / speed)
  timer: (
    <>
      <circle cx="12" cy="14" r="7.5" />
      <path d="M12 14v-4" />
      <path d="M9.75 3.5h4.5" />
      <path d="M12 3.5v3" />
      <path d="M18.6 7.4 20 6" />
    </>
  ),
  // Protect the sale price → a price tag
  tag: (
    <>
      <path d="M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.83 0l-6.77-6.77A2 2 0 0 1 3.2 12.4V5a2 2 0 0 1 2-2h7.4a2 2 0 0 1 1.42.59l6.58 6.58a2 2 0 0 1 0 2.83z" />
      <circle cx="7.6" cy="7.6" r="1.4" />
    </>
  ),
  // The buyer sees the project → the physical building / model
  building: (
    <>
      <path d="M3 21h18" />
      <path d="M5 21V5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v16" />
      <path d="M14 21V9h4a1 1 0 0 1 1 1v11" />
      <path d="M8 7.5h3M8 11.5h3M8 15.5h3" />
    </>
  ),
  // Fewer objections, focus on closing → a signed / approved document
  contract: (
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
      <path d="M8.5 14.5l2 2 4-4" />
    </>
  ),
};

/**
 * "הערך העסקי של מודל אדריכלי" — sits directly after the hero. Four value
 * cards fly in from the sides with a 3D perspective tilt; the two right-column
 * cards enter from the right, the two left-column cards from the left.
 */
export function BusinessValue() {
  const reduce = useReducedMotion() ?? false;

  return (
    <section
      className="bizval surface-navy-950 section"
      aria-label={BUSINESS_VALUE.eyebrow}
    >
      <BackgroundScene />

      <div className="container-x relative">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <Reveal>
            <p className="eyebrow text-[color:var(--steel-300)]">
              {BUSINESS_VALUE.eyebrow}
            </p>
            <span aria-hidden="true" className="bizval-eyebrow-line" />
          </Reveal>
          <Reveal index={1}>
            <h2 className="h2 mt-5 text-white text-balance">
              {BUSINESS_VALUE.titleTop}
              <span className="block text-[color:var(--steel-300)]">
                {BUSINESS_VALUE.titleBottom}
              </span>
            </h2>
          </Reveal>
          <Reveal index={2}>
            <p className="mt-5 text-white/70 text-lg leading-relaxed text-pretty">
              {BUSINESS_VALUE.subtitle}
            </p>
          </Reveal>
        </div>

        {/* Cards — 3D fly-in from the sides */}
        <div
          className="mt-10 md:mt-12 grid gap-4 md:gap-5 md:grid-cols-2 md:max-w-4xl md:mx-auto"
          style={{ perspective: "1400px" }}
        >
          {BUSINESS_VALUE.cards.map((card, i) => (
            <ValueCard key={card.title} card={card} index={i} reduce={reduce} />
          ))}
        </div>

        {/* Closing banner + CTA */}
        <div className="mt-12 md:mt-16 text-center">
          <Reveal>
            <p className="bizval-banner">
              {BUSINESS_VALUE.bannerTop}
              <span className="block text-[color:var(--steel-300)]">
                {BUSINESS_VALUE.bannerBottom}
              </span>
            </p>
          </Reveal>
          <Reveal index={1} className="mt-8">
            <GlassButton href="#contact" variant="primary">
              {BUSINESS_VALUE.cta}
            </GlassButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
