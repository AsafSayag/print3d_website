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
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 text-center md:h-full md:flex-nowrap md:justify-start md:text-start md:gap-6">
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

/**
 * A single decorative model tower flanking the value cards. Purely ambient
 * background (aria-hidden, non-interactive), desktop-only (lg+), matched to the
 * cards' height via the parent's `inset-y-0`. The cut-out PNG→WebP has a
 * transparent background so it blends into the module's navy without a box; a
 * soft mask fades its inner edge toward the cards and the opacity keeps it
 * subordinate to the content. `side="start"` sits on the right (RTL),
 * `side="end"` on the left.
 */
function TowerAside({ side }: { side: "start" | "end" }) {
  const isStart = side === "start";
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 z-0 hidden select-none opacity-90 lg:block"
      style={{
        aspectRatio: "526 / 760",
        // Anchor to the page edge (not the centred container) so the towers sit
        // out in the margin, clear of the cards, and read boldly. `100%` is the
        // wrapper width; the calc pushes the outer edge to the viewport edge.
        [isStart ? "insetInlineStart" : "insetInlineEnd"]:
          "calc((100% - 100vw) / 2 + 0.5rem)",
        // A gentle fade only on the very inner edge, so any sliver that reaches a
        // card melts away without dimming the tower itself.
        WebkitMaskImage: `linear-gradient(to ${isStart ? "left" : "right"}, #000 72%, transparent 100%)`,
        maskImage: `linear-gradient(to ${isStart ? "left" : "right"}, #000 72%, transparent 100%)`,
      }}
    >
      <Image
        src="/bizval-tower.webp"
        alt=""
        fill
        sizes="(min-width: 1024px) 30vw, 0px"
        className="object-contain object-center"
      />
    </div>
  );
}

const ICONS: Record<string, React.ReactNode> = {
  // Shorten the sale period → a rocket (speed / momentum)
  rocket: (
    <>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </>
  ),
  // Protect the sale price → a shield with a check
  shield: (
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  // Turn interest into desire to buy → a heart (emotional connection)
  heart: (
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" />
  ),
  // Fewer objections, more confidence → a thumbs-up
  thumbsUp: (
    <>
      <path d="M7 10v11" />
      <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88z" />
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

        {/* Cards — 3D fly-in from the sides. The wrapper is the reference box
            for the two flanking model towers: they span exactly the cards'
            height ("at the height of the cubes"), sit behind the cards as part
            of the ambient backdrop, and show only from lg up (desktop). */}
        <div className="relative mt-10 md:mt-12">
          <TowerAside side="start" />
          <TowerAside side="end" />

          <div
            className="relative z-10 grid gap-4 md:gap-5 md:grid-cols-2 md:max-w-4xl md:mx-auto"
            style={{ perspective: "1400px" }}
          >
            {BUSINESS_VALUE.cards.map((card, i) => (
              <ValueCard key={card.title} card={card} index={i} reduce={reduce} />
            ))}
          </div>
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
