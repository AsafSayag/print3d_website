import { CONTACT } from "@/lib/constants";
import type { Crumb } from "@/components/legal/Breadcrumbs";
import type { BlogArticle } from "../content";

/**
 * Structured data for a blog article: Article, BreadcrumbList and FAQPage, all
 * emitted as JSON-LD. The site-wide Organization/LocalBusiness markup lives in
 * the root layout, so here we only reference it as publisher/author.
 */
export function ArticleJsonLd({
  article,
  breadcrumbs,
}: {
  article: BlogArticle;
  breadcrumbs: Crumb[];
}) {
  const url = `${CONTACT.siteUrl}/blog/${article.slug}`;
  const imageUrl = `${CONTACT.siteUrl}${article.image}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    image: [imageUrl],
    inLanguage: "he-IL",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    datePublished: article.publishDate,
    dateModified: article.updatedDate,
    keywords: article.keywords.join(", "),
    author: { "@type": "Organization", name: article.author, url: CONTACT.siteUrl },
    publisher: {
      "@type": "Organization",
      name: "Print3D",
      url: CONTACT.siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${CONTACT.siteUrl}/og-image.jpg`,
      },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `${CONTACT.siteUrl}${c.href}` } : {}),
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
