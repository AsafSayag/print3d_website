import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import type { Crumb } from "@/components/legal/Breadcrumbs";
import { buildPageMeta } from "@/lib/pageMeta";
import { HubJsonLd } from "./_components/HubJsonLd";
import { KnowledgeHub } from "./_components/KnowledgeHub";
import { ReadingProgress } from "./_components/ReadingProgress";
import { BLOG_2 } from "./content";
import { GLOSSARY_TERMS } from "./glossary";
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

export default function KnowledgePage() {
  return (
    <>
      <ReadingProgress />
      <HubJsonLd
        title={TITLE}
        description={DESCRIPTION}
        path="/knowledge"
        publishDate="2026-07-17"
        updatedDate="2026-07-17"
        breadcrumbs={breadcrumbs}
        faq={HUB_FAQ}
      />
      <a href="#main" className="skip-link">
        דלגו לתוכן הראשי
      </a>
      <Header />
      <main id="main" className="flex-1">
        <KnowledgeHub articles={[...BLOG_2.items]} terms={GLOSSARY_TERMS} faq={HUB_FAQ} />
      </main>
      <Footer />
    </>
  );
}
