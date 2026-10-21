import { CONTACT } from "@/lib/constants";
import { FaqPageJsonLd, JsonLdScript } from "@/components/JsonLd";
import type { Crumb } from "@/components/legal/Breadcrumbs";
import {
  absoluteUrl,
  breadcrumbListSchema,
  organizationRef,
} from "@/lib/schema";
import type { BlogArticle } from "../content";

/**
 * Structured data for a blog article: Article, BreadcrumbList and FAQPage, all
 * emitted as JSON-LD. The site-wide Organization/LocalBusiness markup lives in
 * the root layout, so here we only reference it as publisher.
 */
export function ArticleJsonLd({
  article,
  breadcrumbs,
}: {
  article: BlogArticle;
  breadcrumbs: Crumb[];
}) {
  const url = absoluteUrl(`/knowledge/${article.slug}`);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    image: [absoluteUrl(article.image)],
    inLanguage: "he-IL",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    datePublished: article.publishDate,
    dateModified: article.updatedDate,
    keywords: article.keywords.join(", "),
    author: { "@type": "Organization", name: article.author, url: CONTACT.siteUrl },
    publisher: organizationRef,
  };

  return (
    <>
      <JsonLdScript data={articleSchema} />
      <JsonLdScript data={breadcrumbListSchema(breadcrumbs)} />
      <FaqPageJsonLd items={article.faq} />
    </>
  );
}
