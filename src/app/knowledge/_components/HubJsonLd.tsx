import { CONTACT } from "@/lib/constants";
import type { Crumb } from "@/components/legal/Breadcrumbs";
import type { HubFaqItem } from "../hub-faq";

/**
 * Structured data for the /knowledge hub: Article (describing the hub
 * page itself), FAQPage (the extended FAQ set) and BreadcrumbList — all
 * emitted as JSON-LD, mirroring the pattern used on individual article pages.
 */
export function HubJsonLd({
  title,
  description,
  path,
  publishDate,
  updatedDate,
  breadcrumbs,
  faq,
}: {
  title: string;
  description: string;
  path: string;
  publishDate: string;
  updatedDate: string;
  breadcrumbs: Crumb[];
  faq: HubFaqItem[];
}) {
  const url = `${CONTACT.siteUrl}${path}`;
  const imageUrl = `${CONTACT.siteUrl}/og-image.jpg`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: [imageUrl],
    inLanguage: "he-IL",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    datePublished: publishDate,
    dateModified: updatedDate,
    author: { "@type": "Organization", name: "צוות Print3D", url: CONTACT.siteUrl },
    publisher: {
      "@type": "Organization",
      name: "Print3D",
      url: CONTACT.siteUrl,
      logo: { "@type": "ImageObject", url: imageUrl },
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
    mainEntity: faq.map((f) => ({
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
