import Image from "next/image";
import { ARTICLES } from "@/lib/content";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

// Real model photos, shown in a uniform navy monochrome (duotone) treatment.
const ARTICLE_IMAGES = [
  "/projects/neve-gan.webp",
  "/projects/gindi-bait-bapark.jpg",
  "/projects/preshkovsky-tabaa.jpg",
  "/projects/tzavta-shapir.jpg",
];

export function Articles() {
  return (
    <section id="articles" className="surface-white section" aria-label={ARTICLES.heading}>
      <div className="container-x">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <SectionHeading eyebrow="בלוג" title={ARTICLES.heading} tone="dark" />
          <Reveal>
            <a
              href="#articles"
              className="text-[color:var(--gold-700)] font-semibold hover:underline underline-offset-4 mb-1"
            >
              {ARTICLES.allLink} ←
            </a>
          </Reveal>
        </div>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
          {ARTICLES.items.map((article, i) => (
            <Reveal as="li" index={i} key={article.title}>
              <a
                href="#articles"
                className="group flex h-full flex-col rounded-2xl overflow-hidden bg-[color:var(--ice-050)] border border-black/5 transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="aspect-[16/10] relative overflow-hidden bg-[color:var(--navy-900)]">
                  <Image
                    src={ARTICLE_IMAGES[i % ARTICLE_IMAGES.length]}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover grayscale transition-transform duration-500 group-hover:scale-[1.05]"
                  />
                  {/* Navy duotone tint for a uniform, non-colourful look */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(155deg, rgba(7,13,23,0.55), rgba(18,35,59,0.8))",
                      mixBlendMode: "multiply",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                  <span
                    className="absolute bottom-3 start-4 num text-white/55 text-4xl font-bold"
                    dir="ltr"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="p-5 flex flex-col gap-3 flex-1">
                  <h3 className="font-display text-lg leading-snug text-[color:var(--ink-950)] group-hover:text-[color:var(--gold-700)] transition-colors">
                    {article.title}
                  </h3>
                  <span className="caption text-[color:var(--ink-950)]/50 mt-auto">
                    {article.readingTime}
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
