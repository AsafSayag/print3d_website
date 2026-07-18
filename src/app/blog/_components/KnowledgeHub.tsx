"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CONTACT } from "@/lib/constants";
import { GlassButton } from "@/components/ui/GlassButton";
import { FaqAccordion } from "@/components/FaqAccordion";
import type { BlogArticle } from "../content";
import type { GlossaryTerm } from "../glossary";
import type { HubFaqItem } from "../hub-faq";

/** Canonical Hebrew alphabet order, base letters only (finals folded in the data layer). */
const ALEF_BET = [
  "א", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט", "י", "כ", "ל",
  "מ", "נ", "ס", "ע", "פ", "צ", "ק", "ר", "ש", "ת",
] as const;

/** A short set of foundational terms shown before the full glossary is expanded. */
const FEATURED_SLUGS = [
  "architectural-model",
  "scale",
  "sales-office-model",
  "marketing-model",
  "3d-printing",
];

function norm(s: string) {
  return s.trim().toLowerCase();
}

export function KnowledgeHub({
  articles,
  terms,
  faq,
}: {
  articles: BlogArticle[];
  terms: GlossaryTerm[];
  faq: HubFaqItem[];
}) {
  const [query, setQuery] = useState("");
  const [showAllTerms, setShowAllTerms] = useState(false);

  const termBySlug = useMemo(() => {
    const map = new Map<string, GlossaryTerm>();
    terms.forEach((t) => map.set(t.slug, t));
    return map;
  }, [terms]);

  const q = norm(query);

  const filteredArticles = useMemo(() => {
    if (!q) return articles;
    return articles.filter((a) =>
      [a.title, a.lead, ...a.keywords].some((s) => norm(s).includes(q))
    );
  }, [articles, q]);

  const filteredTerms = useMemo(() => {
    if (!q) return terms;
    return terms.filter(
      (t) => norm(t.term).includes(q) || norm(t.definition).includes(q)
    );
  }, [terms, q]);

  const grouped = useMemo(() => {
    const map = new Map<string, GlossaryTerm[]>();
    for (const t of filteredTerms) {
      const list = map.get(t.letter) ?? [];
      list.push(t);
      map.set(t.letter, list);
    }
    for (const list of map.values()) {
      list.sort((a, b) => a.term.localeCompare(b.term, "he"));
    }
    return map;
  }, [filteredTerms]);

  const availableLetters = ALEF_BET.filter((l) => (grouped.get(l)?.length ?? 0) > 0);

  const featuredTerms = useMemo(
    () =>
      FEATURED_SLUGS.map((slug) => termBySlug.get(slug)).filter(
        (t): t is GlossaryTerm => Boolean(t)
      ),
    [termBySlug]
  );

  return (
    <div className="surface-white">
      {/* ============ HERO ============ */}
      <section className="pt-[92px] md:pt-28">
        <div className="container-x">
          <h1 className="heading-accent h1 max-w-4xl text-[color:var(--ink-950)]">
            מרכז הידע למודלים אדריכליים
          </h1>
          <span className="eyebrow mt-3 block text-[color:var(--gold-700)]">
            מרכז הידע של Print3D
          </span>
          <p className="mt-5 max-w-2xl text-[color:var(--ink-950)]/70 leading-relaxed">
            מדריכים מקצועיים, מילון מונחים מקיף ותשובות לכל שאלה בנושא מודלים
            אדריכליים — קנה מידה, חומרי גלם, תהליכי ייצור, עלויות ושיווק
            פרויקטי נדל״ן. מרכז הידע המקיף ביותר בישראל בתחום.
          </p>

          <div className="caption mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[color:var(--ink-950)]/55">
            <span>מאת צוות Print3D</span>
            <span aria-hidden="true">·</span>
            <span>18 דקות עיון</span>
            <span aria-hidden="true">·</span>
            <span>
              עודכן ב־<time dateTime="2026-07-17">17 ביולי 2026</time>
            </span>
          </div>

          {/* Nav cards */}
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { id: "articles", title: "מאמרים", text: "מדריכים מעמיקים על ייצור, תמחור ושיווק." },
              { id: "glossary", title: "מילון מושגים", text: `למעלה מ-${terms.length} מונחים מוסברים לפי א׳-ת׳.` },
              { id: "faq", title: "שאלות נפוצות", text: "תשובות מהירות לשאלות הנפוצות ביותר." },
            ].map((card) => (
              <a
                key={card.id}
                href={`#${card.id}`}
                className="group rounded-2xl border border-black/10 bg-[color:var(--ice-050)] p-6 transition-colors hover:border-[color:var(--gold-500)]/50"
              >
                <span className="font-display text-lg font-bold text-[color:var(--ink-950)] transition-colors group-hover:text-[color:var(--gold-700)]">
                  {card.title}
                </span>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--ink-950)]/65">
                  {card.text}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ARTICLES ============ */}
      <section id="articles" className="section scroll-mt-24">
        <div className="container-x">
          <h2 className="font-display text-2xl font-bold text-[color:var(--ink-950)] md:text-3xl">
            מאמרים
          </h2>
          <p className="mt-3 max-w-2xl text-[color:var(--ink-950)]/65">
            כל המדריכים המקצועיים של Print3D על מודלים אדריכליים — מתמחור ועד
            תהליכי ייצור, שיווק ובחירת ספק.
          </p>

          {filteredArticles.length === 0 ? (
            <p className="mt-8 text-[color:var(--ink-950)]/60">
              לא נמצאו מאמרים התואמים את החיפוש.
            </p>
          ) : (
            <ul className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredArticles.map((article, i) => (
                <li key={article.slug}>
                  <Link href={`/blog/${article.slug}`} className="group block text-right">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-[color:var(--ice-050)]">
                      <Image
                        src={article.image}
                        alt=""
                        fill
                        loading={i < 3 ? undefined : "lazy"}
                        priority={i < 3}
                        sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.04]"
                      />
                    </div>
                    <div className="caption mt-3 flex items-center justify-end gap-2 text-[color:var(--ink-950)]/55">
                      <span className="font-semibold uppercase tracking-[0.12em] text-[color:var(--gold-700)]">
                        {article.category}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{article.readingTime}</span>
                    </div>
                    <h3 className="font-display mt-2 text-lg font-bold leading-snug text-[color:var(--ink-950)] transition-colors group-hover:text-[color:var(--gold-700)] md:text-xl">
                      {article.title}
                    </h3>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* ============ GLOSSARY ============ */}
      <section id="glossary" className="section scroll-mt-24 border-t border-black/10">
        <div className="container-x">
          <h2 className="font-display text-2xl font-bold text-[color:var(--ink-950)] md:text-3xl">
            מילון מושגים למודלים אדריכליים
          </h2>
          <p className="mt-3 max-w-2xl text-[color:var(--ink-950)]/65">
            {terms.length} מונחים מעולם המודלים האדריכליים, תהליכי הייצור
            והתכנון — הסבר קצר לכל מונח, מונחים קשורים וקישורים למאמרים
            מורחבים.
          </p>

          <div className="relative mt-8">
            <label htmlFor="glossary-search" className="sr-only">
              חיפוש מונח במילון
            </label>
            <input
              id="glossary-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="חיפוש מונח — לדוגמה: קנה מידה, CNC, מודל למשרד מכירות…"
              className="w-full max-w-xl rounded-full border border-black/15 bg-white py-3.5 px-5 text-[color:var(--ink-950)] shadow-sm outline-none transition-colors focus:border-[color:var(--gold-500)]"
            />
          </div>

          <div className="mt-10">
            {q ? (
              /* Search results */
              filteredTerms.length === 0 ? (
                <p className="text-[color:var(--ink-950)]/60">
                  לא נמצאו מושגים התואמים את החיפוש &quot;{query}&quot;.
                </p>
              ) : (
                <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {filteredTerms.map((t) => (
                    <GlossaryCard key={t.slug} term={t} termBySlug={termBySlug} />
                  ))}
                </ul>
              )
            ) : showAllTerms ? (
              /* Full glossary, grouped by letter */
              <div className="space-y-14">
                {availableLetters.map((l) => (
                  <div key={l} className="scroll-mt-28">
                    <h3 className="num font-display text-xl font-bold text-[color:var(--gold-700)]">
                      {l}
                    </h3>
                    <ul className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                      {(grouped.get(l) ?? []).map((t) => (
                        <GlossaryCard key={t.slug} term={t} termBySlug={termBySlug} />
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              /* Collapsed: a few foundational terms + expand button */
              <>
                <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {featuredTerms.map((t) => (
                    <GlossaryCard key={t.slug} term={t} termBySlug={termBySlug} />
                  ))}
                </ul>
                <div className="mt-10 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setShowAllTerms(true)}
                    className="inline-flex items-center gap-2 rounded-full border border-black/15 px-6 py-3 font-display font-semibold text-[color:var(--ink-950)] transition-colors hover:bg-black/[0.04]"
                  >
                    לכל המושגים ({terms.length})
                    <span aria-hidden="true">←</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section id="faq" className="section scroll-mt-24 border-t border-black/10">
        <div className="container-x max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-[color:var(--ink-950)] md:text-3xl">
            שאלות נפוצות
          </h2>
          <p className="mt-3 text-[color:var(--ink-950)]/65">
            התשובות לשאלות שאנחנו שומעים הכי הרבה על מודלים אדריכליים.
          </p>
          <div className="mt-8">
            <FaqAccordion items={faq} />
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="section border-t border-black/10">
        <div className="container-x">
          <div className="mx-auto max-w-3xl rounded-3xl border border-[color:var(--ink-950)]/10 bg-[color:var(--ice-050)] px-6 py-14 text-center sm:px-12 sm:py-16">
            <h2 className="font-display text-2xl font-bold text-[color:var(--ink-950)] md:text-4xl">
              מוכנים להפוך את הפרויקט שלכם למודל אדריכלי?
            </h2>
            <p className="mt-4 max-w-xl mx-auto text-[color:var(--ink-950)]/65">
              צוות Print3D ילווה אתכם משלב התכנון ועד למודל מוגמר ברמת גימור
              גבוהה — עבור משרד מכירות, פגישת משקיעים או ועדת תכנון.
            </p>
            <div className="mt-8 flex justify-center">
              <GlassButton href={CONTACT.contactPath} variant="primary">
                צור קשר
              </GlassButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function GlossaryCard({
  term,
  termBySlug,
}: {
  term: GlossaryTerm;
  termBySlug: Map<string, GlossaryTerm>;
}) {
  return (
    <li
      id={`term-${term.slug}`}
      className="scroll-mt-28 rounded-2xl border border-black/10 bg-white p-6"
    >
      <h4 className="font-display text-lg font-bold text-[color:var(--ink-950)]">
        {term.term}
      </h4>
      <p className="mt-2 text-sm leading-relaxed text-[color:var(--ink-950)]/70">
        {term.definition}
      </p>
      {term.href && (
        <Link
          href={term.href}
          className="mt-3 inline-block text-sm font-semibold text-[color:var(--gold-700)] underline-offset-4 hover:underline"
        >
          קראו את המאמר המורחב ←
        </Link>
      )}
      {term.related.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2 border-t border-black/10 pt-4">
          {term.related.map((slug) => {
            const rel = termBySlug.get(slug);
            if (!rel) return null;
            return (
              <a
                key={slug}
                href={`#term-${slug}`}
                className="rounded-full bg-[color:var(--ice-050)] px-3 py-1 text-xs font-semibold text-[color:var(--ink-950)]/70 transition-colors hover:text-[color:var(--gold-700)]"
              >
                {rel.term}
              </a>
            );
          })}
        </div>
      )}
    </li>
  );
}
