"use client";

import { useState } from "react";
import Image from "next/image";
import { WHY } from "@/lib/content";
import { Reveal } from "./ui/Reveal";

export function WhySection() {
  const [showMore, setShowMore] = useState(false);

  return (
    <section id="about" className="surface-navy-950 section" aria-label={WHY.heading}>
      <div className="container-x">
        <div className="grid lg:grid-cols-12 gap-x-12 gap-y-8 items-start">
          <div className="lg:col-span-5 max-md:text-center">
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
                <h2 className="h2 text-white">{WHY.heading}</h2>
              </div>
            </Reveal>

            {/* Small showroom photo — sits quietly under the heading, on
                every breakpoint. */}
            <Reveal delay={0.1} className="mt-8">
              <figure className="group relative w-full max-w-xs overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-[0_24px_60px_-40px_rgba(0,0,0,0.8)]">
                <div className="relative aspect-square">
                  <Image
                    src="/why-print3d.jpg"
                    alt="חלל תצוגה עם מודל אדריכלי מואר של מגדל, מעשה ידי Print3D"
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
              {/* On mobile (<768px) the long copy is collapsed behind a
                  small-but-prominent gold "מידע נוסף" toggle; from tablet/desktop
                  up the toggle is hidden and the paragraph is always shown. */}
              <button
                type="button"
                onClick={() => setShowMore((v) => !v)}
                aria-expanded={showMore}
                className="md:hidden inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors"
                style={{
                  border:
                    "1px solid color-mix(in srgb, var(--gold-500) 55%, transparent)",
                  background: "color-mix(in srgb, var(--gold-500) 10%, transparent)",
                  color: "var(--gold-400)",
                }}
              >
                {showMore ? "הצג פחות" : "מידע נוסף"}
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-300"
                  style={{ transform: showMore ? "rotate(180deg)" : "none" }}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              <div
                className={`${
                  showMore ? "block" : "hidden"
                } md:block mt-6 md:mt-0 space-y-4`}
                style={{ animation: "whyFade 0.4s var(--ease-brand) both" }}
              >
                {WHY.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="text-white/75 text-lg leading-[1.85] text-pretty"
                  >
                    {p}
                  </p>
                ))}
              </div>
              <style>{"@keyframes whyFade{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}"}</style>
            </Reveal>
          </div>
        </div>

        {/* Editorial list — a thin blue hairline and a glowing arrow (pointing
            in the RTL reading direction) stand in for the earlier numeral,
            reading as considered typography rather than a generic UI tile. */}
        <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 mt-20">
          {WHY.cards.map((card, i) => (
            <Reveal as="li" index={i} key={card.n}>
              <article className="group relative pt-7">
                {/* Touch devices can't hover, so the blue reveal would never
                    show — mobile carries a permanent, subtle blue tint
                    instead; sm+ reverts to the white idle state + hover reveal. */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px bg-[color:var(--gold-500)]/30 sm:bg-white/15 transition-colors duration-700 sm:group-hover:bg-[color:var(--gold-500)]/70"
                />
                <span className="why-arrow" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    width="34"
                    height="34"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 12H5M11 6l-6 6 6 6" />
                  </svg>
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
