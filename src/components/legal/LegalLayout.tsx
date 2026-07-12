import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Faq } from "@/components/Faq";
import { LegalHero } from "./LegalHero";
import { LegalSection } from "./LegalSection";
import { LegalTableOfContents } from "./LegalTableOfContents";
import { LegalNavigation } from "./LegalNavigation";
import { LegalCTA } from "./LegalCTA";
import { LegalJsonLd } from "./LegalJsonLd";
import type { Crumb } from "./Breadcrumbs";
import { LEGAL_DOCS, LEGAL_HUB, type LegalDoc } from "@/lib/legal";

/**
 * Full page scaffold for a single legal document. Composes the site header and
 * footer with a legal hero, a sticky table of contents (desktop) / collapsible
 * one (mobile), the rendered sections, prev/next navigation and a closing CTA.
 *
 * Everything is data-driven from the `LegalDoc`, so each page component is a
 * one-liner that passes its document in.
 */
export function LegalLayout({ doc }: { doc: LegalDoc }) {
  const index = LEGAL_DOCS.findIndex((d) => d.slug === doc.slug);
  const prev = index > 0 ? LEGAL_DOCS[index - 1] : undefined;
  const next =
    index < LEGAL_DOCS.length - 1 ? LEGAL_DOCS[index + 1] : undefined;

  const breadcrumbs: Crumb[] = [
    { label: "בית", href: "/" },
    { label: LEGAL_HUB.navLabel, href: LEGAL_HUB.path },
    { label: doc.navLabel },
  ];

  const tocItems = doc.sections.map((s) => ({ id: s.id, title: s.title }));

  return (
    <>
      <LegalJsonLd
        title={doc.title}
        description={doc.description}
        path={doc.path}
        breadcrumbs={breadcrumbs}
      />
      <Header />
      <main id="main" className="flex-1">
        <LegalHero
          eyebrow={doc.eyebrow}
          title={doc.title}
          description={doc.description}
          breadcrumbs={breadcrumbs}
        />

        <div className="surface-white section">
          <div className="container-x">
            <div className="lg:grid lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-14">
              {/* Sidebar TOC (desktop) */}
              <aside className="hidden lg:block">
                <LegalTableOfContents items={tocItems} variant="sidebar" />
              </aside>

              {/* Document body */}
              <article className="min-w-0">
                <div className="lg:hidden mb-8">
                  <LegalTableOfContents items={tocItems} variant="mobile" />
                </div>

                {doc.sections.map((section, i) => (
                  <LegalSection key={section.id} section={section} index={i} />
                ))}

                <LegalNavigation prev={prev} next={next} />
              </article>
            </div>
          </div>
        </div>

        <LegalCTA />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
