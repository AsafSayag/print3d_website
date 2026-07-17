"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { BLOG_2, type BlogArticle } from "../content";

/** Brand easing, mirrored from --ease-brand for framer-motion. */
const EASE = [0.2, 0.8, 0.2, 1] as const;

/** Column span + image aspect per position, giving the grid an editorial rhythm:
 *  a wide featured lead, a taller secondary, then a uniform run. */
function layoutFor(pos: number) {
  if (pos === 0)
    return {
      span: "md:col-span-2 lg:col-span-8",
      aspect: "aspect-[16/9]",
      lead: true,
      sizes: "(min-width:1024px) 66vw, 100vw",
    };
  if (pos === 1)
    return {
      span: "md:col-span-1 lg:col-span-4",
      aspect: "aspect-[4/5]",
      lead: false,
      sizes: "(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw",
    };
  return {
    span: "md:col-span-1 lg:col-span-4",
    aspect: "aspect-[4/3]",
    lead: false,
    sizes: "(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw",
  };
}

export function BlogEditorial() {
  const [active, setActive] = useState<string>("הכל");
  const reduce = useReducedMotion();

  const items = useMemo<BlogArticle[]>(
    () =>
      active === "הכל"
        ? [...BLOG_2.items]
        : BLOG_2.items.filter((a) => a.category === active),
    [active]
  );

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 26 },
    show: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: reduce ? 0 : -12, scale: reduce ? 1 : 0.98 },
  };

  return (
    <div className="surface-white">
      {/* Header block — clears the fixed navbar */}
      <div className="pt-[92px] md:pt-28">
        <div className="container-x">
          <span className="eyebrow text-[color:var(--gold-700)]">
            {BLOG_2.eyebrow}
          </span>
          <h1 className="heading-accent h1 mt-2 text-[color:var(--ink-950)]">
            {BLOG_2.heading}
          </h1>
          <p className="mt-5 max-w-2xl text-[color:var(--ink-950)]/70 leading-relaxed">
            {BLOG_2.intro}
          </p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="container-x mt-10 md:mt-12">
        <div
          role="tablist"
          aria-label="סינון מאמרים לפי נושא"
          className="flex flex-wrap gap-x-6 gap-y-3 border-b border-black/10 pb-4"
        >
          {BLOG_2.categories.map((cat) => {
            const on = active === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={on}
                aria-pressed={on}
                onClick={() => setActive(cat)}
                className={`relative pb-1 text-sm font-semibold tracking-wide transition-colors ${
                  on
                    ? "text-[color:var(--ink-950)]"
                    : "text-[color:var(--ink-950)]/45 hover:text-[color:var(--ink-950)]/80"
                }`}
              >
                {cat}
                {on && (
                  <motion.span
                    layoutId="blog-filter-underline"
                    className="absolute inset-x-0 -bottom-[17px] h-[2px] rounded bg-[color:var(--gold-500)]"
                    transition={{ duration: 0.4, ease: EASE }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Editorial grid */}
      <div className="container-x pb-[clamp(4.5rem,9vw,8rem)] pt-10 md:pt-12">
        <motion.ul
          layout
          className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-12"
        >
          <AnimatePresence mode="popLayout">
            {items.map((article, i) => {
              const { span, aspect, lead, sizes } = layoutFor(i);
              return (
                <motion.li
                  key={article.slug}
                  layout
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="show"
                  exit="exit"
                  viewport={{ once: true, margin: "-8%" }}
                  transition={{ duration: 0.6, ease: EASE, delay: (i % 3) * 0.06 }}
                  className={`col-span-1 ${span}`}
                >
                  <Link
                    href={`/blog/${article.slug}`}
                    className="group block text-right"
                  >
                    <div
                      className={`relative w-full overflow-hidden rounded-lg bg-[color:var(--ice-050)] ${aspect}`}
                    >
                      <Image
                        src={article.image}
                        alt=""
                        fill
                        sizes={sizes}
                        priority={i < 2}
                        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.04]"
                      />
                    </div>

                    <div className="mt-4">
                      <div className="caption flex items-center justify-end gap-2 text-[color:var(--ink-950)]/55">
                        <span className="font-semibold uppercase tracking-[0.12em] text-[color:var(--gold-700)]">
                          {article.category}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="num" dir="ltr">
                          {article.dateDisplay}
                        </span>
                      </div>

                      <h2
                        className={`font-display mt-2 font-bold leading-snug text-[color:var(--ink-950)] transition-colors duration-300 group-hover:text-[color:var(--gold-700)] ${
                          lead ? "text-2xl md:text-4xl" : "text-xl md:text-2xl"
                        }`}
                      >
                        <span className="bg-gradient-to-l from-[color:var(--gold-500)] to-[color:var(--gold-500)] bg-[length:0%_2px] bg-right-bottom bg-no-repeat pb-1 transition-[background-size] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:bg-[length:100%_2px]">
                          {article.title}
                        </span>
                      </h2>

                      <span className="caption mt-2 block text-[color:var(--ink-950)]/50">
                        {article.readingTime}
                      </span>
                    </div>
                  </Link>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ul>
      </div>
    </div>
  );
}
