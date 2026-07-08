import { CLIENT_LOGOS, CLIENTS_HEADING } from "@/lib/content";
import { Reveal } from "./ui/Reveal";

export function ClientLogos() {
  // Duplicate the list so the marquee can loop seamlessly (-50% shift).
  const loop = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

  return (
    <section id="clients" className="surface-white section" aria-label="לקוחות">
      <div className="container-x">
        <Reveal>
          <h2 className="h3 text-center text-[color:var(--ink-950)]/80 font-normal mb-12">
            {CLIENTS_HEADING}
          </h2>
        </Reveal>
      </div>

      <div
        className="marquee-track relative overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <ul className="marquee items-center gap-12 px-6" dir="ltr">
          {loop.map((name, i) => (
            <li
              key={i}
              aria-hidden={i >= CLIENT_LOGOS.length}
              className="logo-chip font-num text-[color:var(--ink-950)] font-semibold text-lg md:text-xl"
              dir="rtl"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
