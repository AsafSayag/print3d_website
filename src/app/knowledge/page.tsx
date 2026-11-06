import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import type { Crumb } from "@/components/legal/Breadcrumbs";
import { buildPageMeta } from "@/lib/pageMeta";
import { HubJsonLd } from "./_components/HubJsonLd";
import { KnowledgeHub } from "./_components/KnowledgeHub";
import { ReadingProgress } from "./_components/ReadingProgress";
import { BLOG_2 } from "./content";
import { GLOSSARY_TERMS, glossaryShort } from "./glossary";
import { HUB_FAQ } from "./hub-faq";

const TITLE = "מרכז הידע למודלים אדריכליים";
const DESCRIPTION =
  "מרכז הידע המקיף בישראל למודלים אדריכליים: מדריכים מקצועיים, מילון מונחים ותשובות לכל שאלה — על ייצור, קנה מידה, חומרים, עלויות ושיווק פרויקטי נדל״ן.";

export const metadata: Metadata = buildPageMeta({
  title: TITLE,
  description: DESCRIPTION,
  path: "/knowledge",
});

const breadcrumbs: Crumb[] = [
  { label: "בית", href: "/" },
  { label: "מרכז הידע" },
];

const FEATURED_SLUGS = [
  "architectural-model",
  "scale",
  "sales-office-model",
  "marketing-model",
  "3d-printing",
  "bim",
];

// Send only what the cards display across the server/client boundary.
const articleTeasers = BLOG_2.items.slice(0, 4).map((article) => ({
  slug: article.slug,
  image: article.image,
  category: article.category,
  readingTime: article.readingTime,
  title: article.title,
  metaDescription: article.metaDescription,
}));
const featuredTerms = FEATURED_SLUGS.map((slug) => GLOSSARY_TERMS.find((t) => t.slug === slug))
  .filter((term) => term !== undefined)
  .map((term) => ({ slug: term.slug, term: term.term, summary: glossaryShort(term.definition) }));

/** The hub is as fresh as its newest article, so "updated" (visible and in the
 *  JSON-LD dateModified) follows the latest article instead of a fixed date. */
const HUB_PUBLISHED = "2026-07-17";
const HUB_UPDATED = BLOG_2.items.reduce(
  (latest, a) => (a.updatedDate > latest ? a.updatedDate : latest),
  HUB_PUBLISHED,
);
const HUB_UPDATED_LABEL = new Intl.DateTimeFormat("he-IL", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
}).format(new Date(`${HUB_UPDATED}T00:00:00Z`));

export default function KnowledgePage() {
  return (
    <>
      <ReadingProgress />
      <HubJsonLd
        title={TITLE}
        description={DESCRIPTION}
        path="/knowledge"
        publishDate={HUB_PUBLISHED}
        updatedDate={HUB_UPDATED}
        breadcrumbs={breadcrumbs}
        faq={HUB_FAQ}
      />
      <a href="#main" className="skip-link">
        דלגו לתוכן הראשי
      </a>
      <Header />
      <main id="main" className="flex-1">
        <KnowledgeHub
          articles={articleTeasers}
          featuredTerms={featuredTerms}
          termCount={GLOSSARY_TERMS.length}
          faq={HUB_FAQ}
          updated={{ iso: HUB_UPDATED, label: HUB_UPDATED_LABEL }}
        />
      </main>
      <Footer />
    </>
  );
}
