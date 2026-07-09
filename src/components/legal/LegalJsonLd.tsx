import { CONTACT } from "@/lib/constants";
import type { Crumb } from "./Breadcrumbs";

/**
 * Structured data for a legal / utility page: WebSite, WebPage and a
 * BreadcrumbList built from the same crumbs shown in the UI. The site-wide
 * LocalBusiness (Organization) markup is emitted separately in the root layout.
 */
export function LegalJsonLd({
  title,
  description,
  path,
  breadcrumbs,
}: {
  title: string;
  description: string;
  /** Absolute path beginning with "/". */
  path: string;
  breadcrumbs: Crumb[];
}) {
  const url = `${CONTACT.siteUrl}${path}`;

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Print3D",
    url: CONTACT.siteUrl,
    inLanguage: "he-IL",
  };

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url,
    inLanguage: "he-IL",
    isPartOf: { "@type": "WebSite", name: "Print3D", url: CONTACT.siteUrl },
    publisher: { "@type": "Organization", name: "Print3D", url: CONTACT.siteUrl },
  };

  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `${CONTACT.siteUrl}${c.href}` } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }}
      />
    </>
  );
}
