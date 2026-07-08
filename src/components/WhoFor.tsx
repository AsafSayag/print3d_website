import { WHO_FOR } from "@/lib/content";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

// Minimal line icons, one per audience.
const ICONS = [
  // developers / building
  "M3 21h18M5 21V7l7-4 7 4v14M9 21v-5h6v5M9 11h.01M15 11h.01M9 15h.01M15 15h.01",
  // marketing / megaphone
  "M3 11v2a1 1 0 0 0 1 1h2l4 4V6L6 10H4a1 1 0 0 0-1 1ZM14 8a4 4 0 0 1 0 8M17 5a8 8 0 0 1 0 14",
  // architects / compass-drafting
  "M12 3v6M12 9 5 21M12 9l7 12M8.5 15h7",
  // authorities / landmark
  "M3 21h18M4 10h16M12 3 4 7v3h16V7l-8-4ZM6 10v11M10 10v11M14 10v11M18 10v11",
];

export function WhoFor() {
  return (
    <section
      className="surface-navy-900 section"
      aria-label={WHO_FOR.heading}
    >
      <div className="container-x">
        <div className="grid lg:grid-cols-12 gap-x-12 gap-y-6 items-start">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="הלקוחות שלנו" title={WHO_FOR.heading} tone="light" />
          </div>
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-white/75 text-lg leading-[1.85] text-pretty">
                {WHO_FOR.paragraph}
              </p>
            </Reveal>
          </div>
        </div>

        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16">
          {WHO_FOR.items.map((item, i) => (
            <Reveal as="li" index={i} key={item}>
              <div className="h-full rounded-2xl p-6 bg-white/[0.03] border border-white/10 flex flex-col gap-4">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-8 h-8 text-[color:var(--steel-500)]"
                  aria-hidden="true"
                >
                  <path d={ICONS[i]} />
                </svg>
                <span className="text-white font-display text-lg leading-snug">
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
