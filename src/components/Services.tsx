import Image from "next/image";
import { SERVICES } from "@/lib/content";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

// Real model photos from the Print3D portfolio, matched to each service.
const SERVICE_IMAGES = [
  { src: "/projects/gindi-bait-bapark.jpg", alt: "מודל שיווקי למשרד מכירות — גינדי החזקות, בית בפארק" },
  { src: "/projects/neve-gan.jpg", alt: "מודל מגדל מגורים מואר — נווה גן" },
  { src: "/projects/preshkovsky-tabaa.jpg", alt: "מודל תב״ע עירוני — פרשקובסקי" },
  { src: "/projects/tzavta-shapir.jpg", alt: "מעמד תצוגה ממותג — צוותא, שפיר" },
];

export function Services() {
  return (
    <section id="services" className="surface-ice section" aria-label={SERVICES.heading}>
      <div className="container-x">
        <SectionHeading eyebrow="מה אנחנו בונים" title={SERVICES.heading} tone="dark" />

        <Reveal delay={0.05}>
          <p className="text-[color:var(--ink-950)]/75 text-lg leading-[1.85] max-w-4xl mt-6 text-pretty">
            {SERVICES.paragraph}
          </p>
        </Reveal>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-14">
          {SERVICES.cards.map((card, i) => (
            <Reveal as="li" index={i} key={card.title}>
              <article className="group h-full rounded-2xl overflow-hidden bg-white border border-black/5 shadow-[0_1px_0_rgba(0,0,0,0.04)]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={SERVICE_IMAGES[i].src}
                    alt={SERVICE_IMAGES[i].alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="h3 mb-2 text-xl">{card.title}</h3>
                  <p className="text-[color:var(--ink-950)]/65 text-[15px] leading-relaxed">
                    {card.text}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
