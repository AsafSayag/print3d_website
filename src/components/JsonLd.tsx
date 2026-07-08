import { CONTACT } from "@/lib/constants";
import { FAQ } from "@/lib/content";

/**
 * Structured data for SEO: LocalBusiness (which extends Organization)
 * plus a FAQPage built from the on-page questions.
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(business) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
    </>
  );
}
