import Image from "next/image";
import Link from "next/link";
import type { BlogArticle } from "../content";

/**
 * Shared article teaser card — used both in the knowledge-hub preview grid and
 * on the full /knowledge/articles listing, so the two always look identical.
 * `priority` eager-loads the image for the first few above-the-fold cards.
 */
export function ArticleCard({
  article,
  priority = false,
}: {
  article: BlogArticle;
  priority?: boolean;
}) {
  return (
    <Link href={`/knowledge/${article.slug}`} className="group block text-right">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-[color:var(--ice-050)]">
        <Image
          src={article.image}
          alt=""
          fill
          loading={priority ? undefined : "lazy"}
          priority={priority}
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
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[color:var(--ink-950)]/60">
        {article.metaDescription}
      </p>
    </Link>
  );
}
