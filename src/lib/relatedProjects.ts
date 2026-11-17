import { PORTFOLIO_PROJECTS, type Project } from "@/lib/portfolioContent";

/**
 * Picks the case studies linked from the "פרויקטים נוספים" blocks on project
 * pages and articles.
 *
 * Without these blocks a case study was reachable only from the catalog and
 * the homepage, so search engines saw two internal links to each and none from
 * the articles. The picks are deterministic (the same page always shows the
 * same projects, so the links are stable for crawlers) and spread across the
 * whole catalog, so every case study gets links rather than the same few.
 */

/** Live projects that have their own page (hidden ones are already filtered out). */
const LINKABLE: Project[] = PORTFOLIO_PROJECTS.filter((p) => Boolean(p.href));

/**
 * For a project page: other projects by the same client first, then the next
 * projects in catalog order (wrapping around). Walking forward from each page
 * means every project is picked by the pages just before it, so inbound links
 * are spread evenly across the catalog.
 */
export function relatedProjectsFor(slug: string, count = 3): Project[] {
  const index = LINKABLE.findIndex((p) => p.id === slug);
  const self = LINKABLE[index];
  const others = LINKABLE.filter((p) => p.id !== slug);
  if (!self) return others.slice(0, count);

  const sameClient = others.filter((p) => p.client === self.client);
  const following = [
    ...LINKABLE.slice(index + 1),
    ...LINKABLE.slice(0, index),
  ].filter((p) => p.client !== self.client);

  return [...sameClient, ...following].slice(0, count);
}

/**
 * For an article: a stable window of the catalog chosen by the article's slug,
 * so different articles link to different case studies.
 */
export function projectsForArticle(slug: string, count = 3): Project[] {
  if (LINKABLE.length === 0) return [];
  let hash = 0;
  for (const ch of slug) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  const start = hash % LINKABLE.length;
  // Step through the catalog 7 at a time so one article's picks aren't three
  // projects by the same client (they sit next to each other in the list).
  const picks = new Set<Project>();
  for (let i = 0; picks.size < Math.min(count, LINKABLE.length); i++) {
    picks.add(LINKABLE[(start + i * 7 + Math.floor((i * 7) / LINKABLE.length)) % LINKABLE.length]);
  }
  return [...picks];
}
