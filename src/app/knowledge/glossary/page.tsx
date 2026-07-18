import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactBand } from "@/components/ContactBand";
import { Breadcrumbs, type Crumb } from "@/components/legal/Breadcrumbs";
import { LegalJsonLd } from "@/components/legal/LegalJsonLd";
import { buildPageMeta } from "@/lib/pageMeta";
import { CONTACT } from "@/lib/constants";
import { GLOSSARY_TERMS } from "../glossary";
import { GlossaryExplorer } from "../_components/GlossaryExplorer";

const TITLE = "מילון מונחים למודלים אדריכליים";
const DESCRIPTION =
  "מילון המונחים המקיף בישראל לעולם המודלים האדריכליים: קנה מידה, חומרי גלם, טכנולוגיות ייצור, תכנון ושיווק — הסבר ברור לכל מונח.";

export const metadata: Metadata = buildPageMeta({
  title: TITLE,
  description: DESCRIPTION,
  path: "/knowledge/glossary",
});

const breadcrumbs: Crumb[] = [
  { label: "בית", href: "/" },
  { label: "מרכז הידע", href: "/knowledge" },
  { label: "מילון מונחים" },
];

export default function GlossaryIndexPage() {
  const definedTermSet = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: TITLE,
    description: DESCRIPTION,
    url: `${CONTACT.siteUrl}/knowledge/glossary`,
    inLanguage: "he-IL",
    hasDefinedTerm: GLOSSARY_TERMS.map((t) => ({
      "@type": "DefinedTerm",
      name: t.term,
      url: `${CONTACT.siteUrl}/knowledge/glossary/${t.slug}`,
    })),
  };

  return (
    <>
      <LegalJsonLd
        title={TITLE}
        description={DESCRIPTION}
        path="/knowledge/glossary"
        breadcrumbs={breadcrumbs}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSet) }}
      />
      <a href="#main" className="skip-link">
        דלגו לתוכן הראשי
      </a>
      <Header />
      <main id="main" className="flex-1">
        <section className="surface-white pt-[104px] md:pt-32">
          <div className="container-x">
            <Breadcrumbs items={breadcrumbs} tone="dark" className="text-sm" />
            <h1 className="heading-accent h1 mt-6 text-[color:var(--ink-950)]">
              מילון מונחים
            </h1>
            <p className="mt-5 max-w-2xl text-[color:var(--ink-950)]/70 leading-relaxed">
              {GLOSSARY_TERMS.length} מונחים מעולם המודלים האדריכליים, תהליכי
              הייצור והתכנון — כל מונח והסבר קצר, עם קישור לעמוד מורחב.
            </p>
          </div>
        </section>

        <section className="surface-white section">
          <div className="container-x">
            <GlossaryExplorer terms={GLOSSARY_TERMS} />
          </div>
        </section>

        <ContactBand />
      </main>
      <Footer />
    </>
  );
}
