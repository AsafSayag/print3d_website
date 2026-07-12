import Image from "next/image";
import Link from "next/link";
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
            <Link
              href="/blog"
              className="text-[color:var(--gold-700)] font-semibold hover:underline underline-offset-4 mb-1"
            >
              {ARTICLES.allLink} ←
            </Link>
          </Reveal>
        </div>

        {/* Mobile shows the first 2 articles; the rest reveal on tap. Desktop
            always shows all four — see .collapse-sm. */}
        <input
          type="checkbox"
          id="articles-more"
          className="more-toggle"
          aria-label="הצגת כל המאמרים"
        />
        <ul className="collapse-host grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
          {ARTICLES.items.map((article, i) => (
            <Reveal
              as="li"
              index={i}
              key={article.title}
              className={i >= 2 ? "collapse-sm" : ""}
            >
              <Link
                href={`/blog/${article.slug}`}
                className="group flex h-full flex-col rounded-2xl overflow-hidden bg-[color:var(--ice-050)] border border-black/5 transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="aspect-[16/10] relative overflow-hidden bg-[color:var(--navy-900)]">
                  <Image
                    src={article.image}
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
              </Link>
            </Reveal>
          ))}
        </ul>

        {/* Mobile-only "all articles" button */}
        <div className="more-btn-wrap mt-8 justify-center">
          <label
            htmlFor="articles-more"
            className="more-btn cursor-pointer inline-flex items-center gap-2 rounded-full border border-black/15 px-6 py-3 font-display text-[color:var(--ink-950)] transition-colors hover:bg-black/[0.04]"
          >
            {ARTICLES.allLink}
            <span aria-hidden="true">←</span>
          </label>
        </div>
      </div>
    </section>
  );
}
