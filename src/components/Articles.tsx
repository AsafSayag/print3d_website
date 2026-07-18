import Image from "next/image";
import Link from "next/link";
import { ARTICLES } from "@/lib/content";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

/**
 * Card art per article: a real photo from the Print3D project archive (real
 * estate / architectural models — on-topic, not stock art), shown as-is with
 * no colour wash. A small line-icon badge marks the article's theme.
 */
const CARD_ART = [
  {
    image: "/projects/neve-gan.webp",
    icon: "M7 3h10a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1ZM9 8h6M9 12h6M9 16h3",
  },
  {
    image: "/projects/shikun-binui-or-yam.jpg",
    icon: "M22 7 13.5 15.5 8.5 10.5 2 17M16 7h6v6",
  },
  {
    image: "/projects/gindi-bait-bapark.jpg",
    icon: "M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
  },
  {
    image: "/projects/preshkovsky-tabaa.jpg",
    icon: "M8 3H4a1 1 0 0 0-1 1v4M16 3h4a1 1 0 0 1 1 1v4M8 21H4a1 1 0 0 1-1-1v-4M16 21h4a1 1 0 0 0 1-1v-4",
  },
];

export function Articles() {
  return (
    <section id="articles" className="surface-white section" aria-label={ARTICLES.heading}>
      <div className="container-x">
        <div className="flex flex-col items-center gap-4 text-center md:flex-row md:items-end md:justify-between md:text-start">
          <SectionHeading eyebrow="בלוג" title={ARTICLES.heading} tone="dark" />
          <Reveal>
            <Link
              href="/blog"
              className="text-[color:var(--gold-700)] font-semibold hover:underline underline-offset-4 md:mb-1"
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
          {ARTICLES.items.map((article, i) => {
            const art = CARD_ART[i % CARD_ART.length];
            return (
              <Reveal
                as="li"
                index={i}
                key={article.slug}
                className={`${i >= 2 ? "collapse-sm" : ""} ${
                  i >= 4 ? "collapse-lg" : ""
                }`.trim()}
              >
                <Link
                  href={`/blog/${article.slug}`}
                  className="group flex h-full flex-col rounded-2xl overflow-hidden bg-[color:var(--ice-050)] border border-black/5 transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="aspect-[16/10] relative overflow-hidden bg-[color:var(--navy-900)]">
                    <Image
                      src={art.image}
                      alt=""
                      aria-hidden="true"
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                    />
                    {/* Bottom gradient only — keeps the white number legible
                        without washing the photo in colour. */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,0.55) 100%)",
                      }}
                    />
                    {/* Small icon badge — a neutral dark disc keeps it legible
                        over any part of the photo, no colour tint involved. */}
                    <span
                      className="absolute top-3 end-3 grid place-items-center w-9 h-9 rounded-full transition-transform duration-500 group-hover:scale-110"
                      style={{ background: "rgba(7,13,23,0.45)", backdropFilter: "blur(6px)" }}
                      aria-hidden="true"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="w-5 h-5"
                        fill="none"
                        stroke="white"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d={art.icon} />
                      </svg>
                    </span>
                    <span
                      className="absolute bottom-3 start-4 num text-white/80 text-4xl font-bold"
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
            );
          })}
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
