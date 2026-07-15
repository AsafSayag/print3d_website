import type { CSSProperties } from "react";
import Image from "next/image";
import { WHO_FOR } from "@/lib/content";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

// Minimal line icons, one per audience.
const ICONS = [
  // developers / building
  "M3 21h18M5 21V7l7-4 7 4v14M9 21v-5h6v5M9 11h.01M15 11h.01M9 15h.01M15 15h.01",
  // marketing & sales / upward growth trend
  "M22 7 13.5 15.5 8.5 10.5 2 17M16 7h6v6",
  // architects / compass-drafting
  "M12 3v6M12 9 5 21M12 9l7 12M8.5 15h7",
  // authorities / landmark
  "M3 21h18M4 10h16M12 3 4 7v3h16V7l-8-4ZM6 10v11M10 10v11M14 10v11M18 10v11",
];

// One tasteful accent per card — cool steel, teal, warm gold, soft violet.
// Values are "R G B" triples so the CSS can build rgb(var(--accent) / α).
const ACCENTS = ["95 154 192", "55 179 160", "211 162 75", "154 134 224"];

export function WhoFor() {
  return (
    <section
      className="relative overflow-hidden section text-white"
      aria-label={WHO_FOR.heading}
    >
      {/* Background photo — Tel Aviv skyline. A navy scrim (matching the
          surrounding sections' tone) keeps the white copy and the frosted
          cards fully legible over the busy photo underneath. */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/whofor-bg.webp"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "56% 42%" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(14,26,44,0.78) 0%, rgba(14,26,44,0.62) 32%, rgba(14,26,44,0.54) 60%, rgba(14,26,44,0.78) 100%)",
          }}
        />
      </div>

      <div className="container-x">
        <div className="grid lg:grid-cols-12 gap-x-12 gap-y-6 items-start">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="הלקוחות שלנו" title={WHO_FOR.heading} tone="light" />
          </div>
          <div className="lg:col-span-7">
            <Reveal>
              {/* Glass frame around the copy — extra insurance for legibility
                  against the photo, and it echoes the cards' silver-glass look. */}
              <div
                className="rounded-2xl border p-6"
                style={{
                  background: "rgba(14,26,44,0.4)",
                  borderColor: "rgba(255,255,255,0.14)",
                  backdropFilter: "blur(10px) saturate(140%)",
                  WebkitBackdropFilter: "blur(10px) saturate(140%)",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.08), 0 20px 40px -26px rgba(7,13,23,0.7)",
                }}
              >
                <p className="text-white font-display text-xl sm:text-2xl leading-[1.5] text-balance mb-4">
                  {WHO_FOR.lead}
                </p>
                <p className="text-white/85 text-lg leading-[1.85] text-pretty">
                  {WHO_FOR.paragraph}
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16">
          {WHO_FOR.items.map((item, i) => (
            <Reveal as="li" index={i} key={item}>
              <div
                className="whofor-card group h-full p-6 flex flex-col gap-5"
                // backdrop-filter is set inline because the build's CSS
                // minifier drops it from the stylesheet rule.
                style={
                  {
                    "--accent": ACCENTS[i],
                    backdropFilter: "blur(16px) saturate(150%)",
                    WebkitBackdropFilter: "blur(16px) saturate(150%)",
                  } as CSSProperties
                }
              >
                <span className="whofor-badge relative z-[1]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    style={{ animationDelay: `${i * 0.8}s` }}
                  >
                    <path d={ICONS[i]} />
                  </svg>
                </span>
                <span className="relative z-[1] text-white font-display text-lg leading-snug">
                  {item}
                </span>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
