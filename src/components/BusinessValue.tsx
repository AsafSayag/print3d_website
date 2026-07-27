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
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 3v5c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6l7-3z" />
      <path d="M12 8.6c-1.5 0-2.3.8-2.3 1.8 0 2.1 4 1.2 4 3.2 0 1-1 1.8-2.4 1.8-1 0-1.9-.4-2.3-1M12 7.6v.9M12 16.3v.9" />
    </>
  ),
  eye: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
      <circle cx="12" cy="12" r="3.2" />
    </>
  ),
  chat: (
    <>
      <path d="M4 5.5h16a1 1 0 0 1 1 1V15a1 1 0 0 1-1 1H9l-4 3.5V16H4a1 1 0 0 1-1-1V6.5a1 1 0 0 1 1-1z" />
      <path d="M8 10.7h.01M12 10.7h.01M16 10.7h.01" />
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
          className="mt-10 md:mt-14 grid gap-4 md:gap-6 md:grid-cols-2"
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
            <GlassButton href="/contact" variant="primary">
              {BUSINESS_VALUE.cta}
            </GlassButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
