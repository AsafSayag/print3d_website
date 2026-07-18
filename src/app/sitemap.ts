import type { MetadataRoute } from "next";
import { CONTACT } from "@/lib/constants";
import { blogArticleSlugs } from "./knowledge/content";
import { glossaryTermSlugs } from "./knowledge/glossary";

/** Individual project pages that have their own route under /projects. */
const PROJECT_SLUGS = [
  "beit-hakerem",
  "dafna-tidhar",
  "gindi-kfar-azar",
  "levinstein",
  "sela-baitar-hadera",
  "shbiro-rishon-letzion",
];

/** Fixed content-update stamp — keeps the sitemap fully static (no request-time
 *  API), so it stays SSG/cache-friendly. Bump when content changes materially. */
const LAST_MODIFIED = "2026-07-17";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = CONTACT.siteUrl;
  const entry = (
    path: string,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
    priority: number
  ): MetadataRoute.Sitemap[number] => ({
    url: `${base}${path}`,
    lastModified: LAST_MODIFIED,
    changeFrequency,
    priority,
  });

  const staticPages: MetadataRoute.Sitemap = [
    entry("/", "weekly", 1),
    entry("/about", "monthly", 0.7),
    entry("/contact", "yearly", 0.6),
    entry("/projects", "weekly", 0.9),
    entry("/knowledge", "weekly", 0.9),
    entry("/knowledge/articles", "weekly", 0.8),
    entry("/knowledge/glossary", "weekly", 0.8),
    entry("/faq", "monthly", 0.6),
    entry("/legal", "yearly", 0.3),
    entry("/legal/privacy", "yearly", 0.3),
    entry("/legal/terms", "yearly", 0.3),
    entry("/legal/cookies", "yearly", 0.3),
    entry("/legal/accessibility", "yearly", 0.3),
  ];

  const projects = PROJECT_SLUGS.map((slug) =>
    entry(`/projects/${slug}`, "monthly", 0.7)
  );

  const articles = blogArticleSlugs().map((slug) =>
    entry(`/knowledge/${slug}`, "monthly", 0.8)
  );

  const glossary = glossaryTermSlugs().map((slug) =>
    entry(`/knowledge/glossary/${slug}`, "monthly", 0.5)
  );

  return [...staticPages, ...projects, ...articles, ...glossary];
}
