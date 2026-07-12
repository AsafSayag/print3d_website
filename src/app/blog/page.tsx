import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactBand } from "@/components/ContactBand";
import { Faq } from "@/components/Faq";
import { LegalJsonLd } from "@/components/legal/LegalJsonLd";
import type { Crumb } from "@/components/legal/Breadcrumbs";
import { buildPageMeta } from "@/lib/pageMeta";
import { BlogEditorial } from "./_components/BlogEditorial";

const DESCRIPTION =
  "מדריכים ותובנות על מודלים אדריכליים: תמחור, תהליכי ייצור והשוואות — הבלוג של Print3D.";

export const metadata: Metadata = buildPageMeta({
  title: "בלוג",
  description: DESCRIPTION,
  path: "/blog",
});

const breadcrumbs: Crumb[] = [{ label: "בית", href: "/" }, { label: "בלוג" }];

export default function BlogPage() {
  return (
    <>
      <LegalJsonLd
        title="בלוג"
        description={DESCRIPTION}
        path="/blog"
        breadcrumbs={breadcrumbs}
      />
      <a href="#main" className="skip-link">
        דלגו לתוכן הראשי
      </a>
      <Header />
      <main id="main" className="flex-1">
        <BlogEditorial />
        <ContactBand />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
