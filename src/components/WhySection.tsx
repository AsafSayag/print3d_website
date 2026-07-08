import { WHY } from "@/lib/content";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

export function WhySection() {
  return (
    <section id="about" className="surface-white section on-light" aria-label={WHY.heading}>
      <div className="container-x">
        <div className="grid lg:grid-cols-12 gap-x-12 gap-y-8 items-start">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="השיטה" title={WHY.heading} tone="dark" />
          </div>
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-[color:var(--ink-950)]/75 text-lg leading-[1.85] text-pretty">
                {WHY.paragraph}
              </p>
            </Reveal>
          </div>
        </div>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-16">
          {WHY.cards.map((card, i) => (
            <Reveal as="li" index={i} key={card.n}>
              <article
                className="h-full rounded-2xl p-6 bg-[color:var(--ice-050)] border border-black/5
                           transition-transform duration-300 hover:-translate-y-1"
              >
                <span
                  className="num block text-[color:var(--gold-700)] font-bold mb-4"
                  dir="ltr"
                  style={{ fontSize: "1.75rem" }}
                >
                  {String(card.n).padStart(2, "0")}
                </span>
                <h3 className="h3 mb-2">{card.title}</h3>
                <p className="text-[color:var(--ink-950)]/65 text-base leading-relaxed">
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
