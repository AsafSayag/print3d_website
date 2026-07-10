import Image from "next/image";
import { WHY } from "@/lib/content";
import { Reveal } from "./ui/Reveal";

export function WhySection() {
  return (
    <section id="about" className="surface-navy-950 section" aria-label={WHY.heading}>
      <div className="container-x">
        <div className="grid lg:grid-cols-12 gap-x-12 gap-y-8 items-start">
          <div className="lg:col-span-5">
            {/* Deep-gold heading in a slim architectural frame — corner marks
                (not a full box) keep it feeling precise and understated
                rather than like a badge or button. */}
            <Reveal>
              <div className="relative inline-block px-7 py-5 sm:px-8 sm:py-6">
                <span
                  aria-hidden="true"
                  className="absolute top-0 start-0 h-3.5 w-3.5 border-t border-s"
                  style={{ borderColor: "color-mix(in srgb, var(--gold-500) 65%, transparent)" }}
                />
                <span
                  aria-hidden="true"
                  className="absolute top-0 end-0 h-3.5 w-3.5 border-t border-e"
                  style={{ borderColor: "color-mix(in srgb, var(--gold-500) 65%, transparent)" }}
                />
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 start-0 h-3.5 w-3.5 border-b border-s"
                  style={{ borderColor: "color-mix(in srgb, var(--gold-500) 65%, transparent)" }}
                />
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 end-0 h-3.5 w-3.5 border-b border-e"
                  style={{ borderColor: "color-mix(in srgb, var(--gold-500) 65%, transparent)" }}
                />
                {/* Soft glow behind the text, contained to the frame */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -z-10"
                  style={{
                    background:
                      "radial-gradient(85% 120% at 50% 50%, color-mix(in srgb, var(--gold-500) 9%, transparent), transparent 70%)",
                  }}
                />
                <h2
                  className="h2"
                  style={{
                    background:
                      "linear-gradient(120deg, var(--gold-700) 0%, var(--gold-400) 48%, var(--gold-700) 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {WHY.heading}
                </h2>
              </div>
            </Reveal>

            {/* Small showroom photo — sits quietly under the heading, on
                every breakpoint. */}
            <Reveal delay={0.1} className="mt-8">
              <figure className="group relative w-full max-w-xs overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-[0_24px_60px_-40px_rgba(0,0,0,0.8)]">
                <div className="relative aspect-square">
                  <Image
                    src="/why-print3d.jpg"
                    alt="חלל תצוגה עם מודל אדריכלי מואר של מגדל — מעשה ידי Print3D"
                    fill
                    sizes="(max-width: 1024px) 80vw, 320px"
                    className="object-cover transition-transform duration-[900ms] ease-[var(--ease-brand)] group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--navy-950)]/70 via-transparent to-transparent" />
                </div>
              </figure>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-white/75 text-lg leading-[1.85] text-pretty">
                {WHY.paragraph}
              </p>
            </Reveal>
          </div>
        </div>

        {/* Editorial numbered list — a thin gold hairline and a faint serif
            numeral stand in for the earlier boxed "feature card" pattern,
            reading as considered typography rather than a generic UI tile. */}
        <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 mt-20">
          {WHY.cards.map((card, i) => (
            <Reveal as="li" index={i} key={card.n}>
              <article className="group relative pt-7">
                {/* Touch devices can't hover, so the gold reveal would never
                    show — mobile carries a permanent, subtle gold tint
                    instead; sm+ reverts to the white idle state + hover reveal. */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px bg-[color:var(--gold-500)]/30 sm:bg-white/15 transition-colors duration-700 sm:group-hover:bg-[color:var(--gold-500)]/70"
                />
                <span
                  className="block font-display text-[color:var(--gold-500)]/50 sm:text-white/20 transition-colors duration-700 sm:group-hover:text-[color:var(--gold-500)]"
                  dir="ltr"
                  style={{ fontSize: "2.75rem", fontWeight: 300, letterSpacing: "-0.02em" }}
                >
                  {String(card.n).padStart(2, "0")}
                </span>
                <h3 className="h3 mt-4 mb-2 text-white text-lg">{card.title}</h3>
                <p className="text-white/60 text-[15px] leading-relaxed">
                  {card.text}
                </p>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
