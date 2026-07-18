import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactBand } from "@/components/ContactBand";
import { Breadcrumbs, type Crumb } from "@/components/legal/Breadcrumbs";
import { LegalJsonLd } from "@/components/legal/LegalJsonLd";
import { buildPageMeta } from "@/lib/pageMeta";
import { CONTACT } from "@/lib/constants";
import { BLOG_2 } from "../content";
import { ArticleCard } from "../_components/ArticleCard";

const TITLE = "מאמרים על מודלים אדריכליים";
const DESCRIPTION =
  "כל המדריכים והמאמרים המקצועיים של Print3D על מודלים אדריכליים — תמחור, חומרי גלם, קנה מידה, תהליכי ייצור, שיווק נדל״ן ובחירת ספק.";

export const metadata: Metadata = buildPageMeta({
  title: TITLE,
  description: DESCRIPTION,
  path: "/knowledge/articles",
});

const breadcrumbs: Crumb[] = [
  { label: "בית", href: "/" },
  { label: "מרכז הידע", href: "/knowledge" },
  { label: "מאמרים" },
];

export default function ArticlesPage() {
  const articles = BLOG_2.items;

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: TITLE,
    itemListElement: articles.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${CONTACT.siteUrl}/knowledge/${a.slug}`,
      name: a.title,
    })),
  };

  return (
    <>
      <LegalJsonLd
        title={TITLE}
        description={DESCRIPTION}
        path="/knowledge/articles"
        breadcrumbs={breadcrumbs}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
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
              מאמרים
            </h1>
            <p className="mt-5 max-w-2xl text-[color:var(--ink-950)]/70 leading-relaxed">
              {DESCRIPTION}
            </p>
          </div>
        </section>

        <section className="surface-white section">
          <div className="container-x">
            <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article, i) => (
                <li key={article.slug}>
                  <ArticleCard article={article} priority={i < 3} />
                </li>
              ))}
            </ul>
          </div>
        </section>

        <ContactBand />
      </main>
      <Footer />
    </>
  );
}
