import { ARTICLES } from "@/lib/content";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

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
                <div
                  className="aspect-[16/10] relative overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--navy-800), var(--navy-950))",
                  }}
                >
                  <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:14px_14px]" />
                  <span className="absolute bottom-3 start-4 text-white/40 font-[var(--font-num)] text-4xl font-bold" dir="ltr">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="p-5 flex flex-col gap-3 flex-1">
                  <h3 className="font-[var(--font-display)] text-lg leading-snug text-[color:var(--ink-950)] group-hover:text-[color:var(--gold-700)] transition-colors">
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
