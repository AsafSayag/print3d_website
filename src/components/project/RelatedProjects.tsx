import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/portfolioContent";

/**
 * A row of case-study cards linking to other project pages. Shown after a
 * project's gallery and at the end of every article (see lib/relatedProjects),
 * in the same card style as the catalog grid.
 */
export function RelatedProjects({
  projects,
  title = "פרויקטים נוספים",
  intro,
  className = "surface-white section",
}: {
  projects: Project[];
  title?: string;
  intro?: string;
  className?: string;
}) {
  if (projects.length === 0) return null;

  return (
    <section className={className} aria-labelledby="related-projects-title">
      <div className="container-x">
        <h2 id="related-projects-title" className="h2 heading-accent">
          {title}
        </h2>
        {intro && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[color:var(--ink-950)]/70">
            {intro}
          </p>
        )}
        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {projects.map((p) => (
            <li key={p.id}>
              <Link
                href={p.href!}
                className="portfolio-card group relative block aspect-[4/3] overflow-hidden rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold-500)]"
              >
                <Image
                  src={p.image}
                  alt={`${p.title} · מודל אדריכלי בקנה מידה ${p.scale}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition-transform duration-[1100ms] ease-[var(--ease-brand)] group-hover:scale-[1.07]"
                />
                <span
                  className="absolute inset-0 bg-gradient-to-t from-[color:var(--navy-950)]/85 via-[color:var(--navy-950)]/15 to-transparent"
                  aria-hidden
                />
                <span className="absolute inset-x-0 bottom-0 block p-4 md:p-5">
                  <span className="flex items-end justify-between gap-2">
                    <span className="font-display text-base leading-tight text-white md:text-lg">
                      {p.title}
                    </span>
                    <span
                      className="num shrink-0 rounded-full border border-white/10 bg-black/30 px-2 py-0.5 text-sm text-[color:var(--gold-400)] backdrop-blur"
                      dir="ltr"
                    >
                      {p.scale}
                    </span>
                  </span>
                  <span className="mt-1.5 block text-sm text-[color:var(--steel-300)]">
                    {p.client}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
