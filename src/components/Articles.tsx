import Image from "next/image";
import Link from "next/link";
import { ARTICLES } from "@/lib/content";
import { BLOG_2, type BlogCategory } from "@/app/knowledge/content";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

/**
 * Line-icon badge per article category, so the badge matches what the article
 * is about (it used to be picked by card position, which put a $ on an
 * article that isn't about price).
 */
const CATEGORY_ICON: Record<BlogCategory, string> = {
  // document
  מדריכים: "M7 3h10a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1ZM9 8h6M9 12h6M9 16h3",
  // calculator
  תמחור: "M7 3h10a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1ZM9 6.5h6v3H9ZM9 13h.01M12 13h.01M15 13h.01M9 16.5h.01M12 16.5h.01M15 16.5h.01",
  // trend line
  תובנות: "M22 7 13.5 15.5 8.5 10.5 2 17M16 7h6v6",
  // balance scale
  השוואות: "M12 3v18M7 21h10M5 7h14M5 7l-3 6a3 3 0 0 0 6 0L5 7ZM19 7l-3 6a3 3 0 0 0 6 0l-3-6Z",
  // stacked layers
  "תהליך ייצור": "M12 3 2 8l10 5 10-5-10-5ZM2 13l10 5 10-5M2 18l10 5 10-5",
};

/** The four newest articles, straight from the knowledge-hub source, so a new
 *  article reaches the homepage without editing a second list. Ties keep the
 *  source order. Each card uses the article's own project photo. */
const LATEST = [...BLOG_2.items]
  .sort((a, b) => b.publishDate.localeCompare(a.publishDate))
  .slice(0, 4);

export function Articles() {
  return (
    <section id="articles" className="surface-white section" aria-label={ARTICLES.heading}>
      <div className="container-x">
        <div className="flex flex-col items-center gap-4 text-center md:flex-row md:items-end md:justify-between md:text-start">
          <SectionHeading eyebrow="בלוג" title={ARTICLES.heading} tone="dark" />
          <Reveal>
            <Link
              href="/knowledge/articles"
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
          {LATEST.map((article, i) => {
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
                  href={`/knowledge/${article.slug}`}
                  className="group flex h-full flex-col rounded-2xl overflow-hidden bg-[color:var(--ice-050)] border border-black/5 transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="aspect-[16/10] relative overflow-hidden bg-[color:var(--navy-900)]">
                    <Image
                      src={article.image}
                      alt=""
                      aria-hidden="true"
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
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
                        <path d={CATEGORY_ICON[article.category]} />
                      </svg>
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
