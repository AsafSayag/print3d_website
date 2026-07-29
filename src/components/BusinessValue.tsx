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
          {ICONS[card.icon]}
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

/**
 * The four value icons — a cohesive duotone "illustrated" set (crisp filled
 * shapes over a light steel-blue base, matching the signed-contract reference
 * for the "more signatures" card). Each returns a complete <svg> so it can carry
 * its own multi-fill artwork; the container sizes it via `.bizval-icon svg`.
 *
 * Shared palette (steel-blue, on-brand): base #eaf4ff · accent #7cb2da /
 * #4f8fbf · highlight #aad3ef · deep detail #17384f.
 */
const ICONS: Record<string, React.ReactNode> = {
  // Shorten the sale period → a clock with motion lines (time / speed)
  clock: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6 24h12.5M10 17.5h8.5M10 30.5h8.5"
        stroke="#7cb2da"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <circle cx="32" cy="24" r="12.5" fill="#eaf4ff" />
      <circle cx="32" cy="24" r="12.5" stroke="#7cb2da" strokeWidth="2" />
      <path
        d="M32 24V16.5M32 24l6.4 3.6"
        stroke="#17384f"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="24" r="1.7" fill="#17384f" />
    </svg>
  ),
  // Protect the sale price → a shield with a check
  shield: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M24 4l15 6v10.5c0 10-6.7 16.5-15 21C15.7 37 9 30.5 9 20.5V10l15-6z"
        fill="#eaf4ff"
      />
      <path d="M24 4l15 6v10.5c0 10-6.7 16.5-15 21V4z" fill="#cfe6f8" />
      <path
        d="M16.8 23.2l5 5 9.4-10.4"
        stroke="#2f6f9c"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  // Prefer the tangible over a render → a building with a small tree beside it
  // (a physical architectural model), in the shared duotone style.
  building: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* small tree — round bushy canopy on a short trunk */}
      <rect x="10.6" y="31" width="2.8" height="11" rx="1.2" fill="#4f8fbf" />
      <circle cx="15.4" cy="28" r="4" fill="#cfe6f8" />
      <circle cx="8.6" cy="28" r="4" fill="#eaf4ff" />
      <circle cx="12" cy="24.3" r="5" fill="#eaf4ff" />
      {/* building */}
      <rect x="19.4" y="7.4" width="17.2" height="2.6" rx="1.1" fill="#7cb2da" />
      <rect x="20" y="10" width="16" height="32" fill="#eaf4ff" />
      <path d="M30.5 10H36v32h-5.5z" fill="#cfe6f8" />
      <g fill="#4f8fbf">
        <rect x="22" y="12.5" width="2.8" height="3.4" rx="0.5" />
        <rect x="26.6" y="12.5" width="2.8" height="3.4" rx="0.5" />
        <rect x="31.2" y="12.5" width="2.8" height="3.4" rx="0.5" />
        <rect x="22" y="18" width="2.8" height="3.4" rx="0.5" />
        <rect x="26.6" y="18" width="2.8" height="3.4" rx="0.5" />
        <rect x="31.2" y="18" width="2.8" height="3.4" rx="0.5" />
        <rect x="22" y="23.5" width="2.8" height="3.4" rx="0.5" />
        <rect x="26.6" y="23.5" width="2.8" height="3.4" rx="0.5" />
        <rect x="31.2" y="23.5" width="2.8" height="3.4" rx="0.5" />
      </g>
      {/* entrance */}
      <path d="M25 42v-8.5a3 3 0 0 1 6 0V42h-6z" fill="#17384f" />
    </svg>
  ),
  // Fewer explanations, more signatures → a signed contract with a pen
  signature: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13 4h13l8 8v28a4 4 0 0 1-4 4H13a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4z"
        fill="#eaf4ff"
      />
      <path d="M26 4l8 8h-6a2 2 0 0 1-2-2V4z" fill="#7cb2da" />
      <rect x="14" y="16" width="13" height="2.6" rx="1.3" fill="#7cb2da" />
      <rect x="14" y="21.5" width="9" height="2.6" rx="1.3" fill="#7cb2da" />
      <path
        d="M13.5 33c2.2-3.5 3.9 2.9 5.7.4 1.2-1.6 2.3 1.9 4.1.2 1.4-1.3 3.1.8 5.5-1"
        stroke="#17384f"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M39.4 15.9a3.1 3.1 0 0 1 4.3 4.3L30 33.9l-5.8 1.7 1.7-5.8L39.4 15.9z"
        fill="#4f8fbf"
      />
      <path d="M24.2 35.6l1.7-5.8 4.1 4.1-5.8 1.7z" fill="#17384f" />
      <path d="M39.4 15.9a3.1 3.1 0 0 1 4.3 4.3l-2 2-4.3-4.3 2-2z" fill="#aad3ef" />
    </svg>
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
