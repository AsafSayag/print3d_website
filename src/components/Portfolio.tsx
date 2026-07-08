import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

// Real models from the Print3D archive, with their scales.
// `href` marks a project that links through to its own case-study page.
const PROJECTS = [
  { src: "/projects/neve-gan.jpg", title: "נווה גן", scale: "1:75", span: "row-span-2" },
  {
    src: "/gindi_project/gindi_hero.webp",
    title: 'גינדי כפר אז"ר',
    scale: "1:100",
    span: "",
    href: "/projects/gindi-kfar-azar",
  },
  { src: "/projects/gindi-bait-bapark.jpg", title: "גינדי החזקות · בית בפארק", scale: "1:100", span: "" },
  { src: "/projects/shikun-binui-or-yam.jpg", title: "שיכון ובינוי · אור ים", scale: "1:200", span: "" },
  { src: "/projects/gindi-tlv.png", title: "גינדי TLV", scale: "1:200", span: "" },
  { src: "/projects/tzavta-shapir.jpg", title: "צוותא · שפיר", scale: "1:150", span: "" },
  { src: "/projects/preshkovsky-tabaa.jpg", title: "פרשקובסקי · מודל תב״ע", scale: "1:500", span: "" },
];

export function Portfolio() {
  return (
    <section
      id="portfolio"
      className="surface-navy-950 section"
      aria-label="תיק עבודות"
    >
      <div className="container-x">
        <SectionHeading eyebrow="תיק עבודות" title="פרויקטים נבחרים" tone="light" />

        <div className="grid grid-cols-2 lg:grid-cols-3 auto-rows-[220px] md:auto-rows-[260px] gap-4 mt-12">
          {PROJECTS.map((p, i) => (
            <Reveal
              key={p.src}
              index={i % 3}
              className={`group relative overflow-hidden rounded-2xl border border-white/8 ${p.span}`}
            >
              <Image
                src={p.src}
                alt={`${p.title} · מודל אדריכלי בקנה מידה ${p.scale}`}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 flex items-end justify-between gap-2">
                <span className="text-white font-display text-base md:text-lg leading-tight">
                  {p.title}
                </span>
                <span
                  className="num text-[color:var(--gold-400)] text-sm shrink-0 bg-black/30 backdrop-blur px-2 py-0.5 rounded-full border border-white/10"
                  dir="ltr"
                >
                  {p.scale}
                </span>
              </div>
              {p.href && (
                <Link
                  href={p.href}
                  aria-label={`${p.title} — לצפייה בעמוד הפרויקט`}
                  className="absolute inset-0 z-10 rounded-2xl ring-[color:var(--gold-400)]/0 transition group-hover:ring-2 focus-visible:outline-none focus-visible:ring-2"
                />
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
