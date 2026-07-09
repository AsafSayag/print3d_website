import Image from "next/image";
import { WHY } from "@/lib/content";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

export function WhySection() {
  return (
    <section id="about" className="surface-navy-950 section" aria-label={WHY.heading}>
      <div className="container-x">
        <div className="grid lg:grid-cols-12 gap-x-12 gap-y-8 items-start">
          <div className="lg:col-span-5">
            <SectionHeading title={WHY.heading} tone="light" />

            {/* Small showroom photo — sits quietly under the heading */}
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

        <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-16">
          {WHY.cards.map((card, i) => (
            <Reveal as="li" index={i} key={card.n}>
              <article
                className="h-full rounded-2xl p-6 bg-white/[0.03] border border-white/10
                           transition-transform duration-300 hover:-translate-y-1"
              >
                <span
                  className="num block text-[color:var(--gold-500)] font-bold mb-4"
                  dir="ltr"
                  style={{ fontSize: "1.75rem" }}
                >
                  {String(card.n).padStart(2, "0")}
                </span>
                <h3 className="h3 mb-2 text-white">{card.title}</h3>
                <p className="text-white/65 text-base leading-relaxed">
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
