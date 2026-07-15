import Image from "next/image";
import Link from "next/link";
import { SERVICES } from "@/lib/content";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

// Real model photos from the Print3D portfolio, matched to each service.
const SERVICE_IMAGES = [
  { src: "/projects/gindi-bait-bapark.jpg", alt: "מודל שיווקי למשרד מכירות, גינדי החזקות, בית בפארק" },
  { src: "/projects/neve-gan.webp", alt: "מודל מגדל מגורים מואר, נווה גן" },
  { src: "/projects/preshkovsky-tabaa.jpg", alt: "מודל תב״ע עירוני, פרשקובסקי" },
  { src: "/projects/tzavta-shapir.jpg", alt: "מעמד תצוגה ממותג, צוותא, שפיר" },
];

export function Services() {
  return (
    <section id="services" className="surface-ice section" aria-label={SERVICES.heading}>
      <div className="container-x">
        <SectionHeading eyebrow="מה אנחנו בונים" title={SERVICES.heading} tone="dark" />

        <Reveal delay={0.05}>
          <div className="max-w-4xl mt-6 space-y-4">
            {SERVICES.paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-[color:var(--ink-950)]/75 text-lg leading-[1.85] text-pretty"
              >
                {p}
              </p>
            ))}
          </div>
        </Reveal>

        {/* Each card links to the catalog. Full-width photo banner at the top
            (crisp — sized to the card, not a tiny cropped thumbnail). A shorter
            16:9 ratio on mobile keeps it from taking too much screen height;
            it grows to a taller 4:3 once the cards sit in a multi-column grid. */}
        <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-14">
          {SERVICES.cards.map((card, i) => (
            <Reveal as="li" index={i} key={card.title}>
              <Link
                href="/portfolio"
                className="group flex h-full flex-col rounded-2xl overflow-hidden bg-white border border-black/5 shadow-[0_1px_0_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-24px_rgba(0,0,0,0.25)]"
              >
                <div className="relative aspect-[16/9] sm:aspect-[4/3] overflow-hidden">
                  <Image
                    src={SERVICE_IMAGES[i].src}
                    alt={SERVICE_IMAGES[i].alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="h3 mb-2 text-xl">{card.title}</h3>
                  <p className="text-[color:var(--ink-950)]/65 text-[15px] leading-relaxed">
                    {card.text}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
