import { CONTACT } from "@/lib/constants";
import { FAQ } from "@/lib/content";

/**
 * Site-wide structured data: LocalBusiness (which extends Organization).
 * Emitted in the root layout, so it applies to every page.
 */
export function JsonLd() {
  const business = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Print3D",
    description:
      "ייצור מודלים אדריכליים פיזיים לפרויקטי נדל״ן — טכנולוגיות מתקדמות וגימור יד אומן.",
    url: CONTACT.siteUrl,
    telephone: "+972-3-6473338",
    email: CONTACT.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTACT.addressStreet,
      addressLocality: CONTACT.addressCity,
      addressCountry: "IL",
    },
    areaServed: "IL",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(business) }}
    />
  );
}

/**
 * FAQPage structured data. Rendered only on the homepage, where the matching
 * questions are actually displayed — required for Google's FAQ rich results.
 */
export function FaqJsonLd() {
  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
    />
  );
}
