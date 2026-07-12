import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Faq } from "@/components/Faq";
import { LegalHero } from "@/components/legal/LegalHero";
import { LegalCTA } from "@/components/legal/LegalCTA";
import { LegalJsonLd } from "@/components/legal/LegalJsonLd";
import type { Crumb } from "@/components/legal/Breadcrumbs";
import { Reveal } from "@/components/ui/Reveal";
import { buildPageMeta } from "@/lib/pageMeta";
import { LEGAL_DOCS, LEGAL_HUB } from "@/lib/legal";

export const metadata: Metadata = buildPageMeta({
  title: LEGAL_HUB.title,
  description: LEGAL_HUB.description,
  path: LEGAL_HUB.path,
});

const breadcrumbs: Crumb[] = [
  { label: "בית", href: "/" },
  { label: LEGAL_HUB.navLabel },
];

export default function LegalHubPage() {
  return (
    <>
      <LegalJsonLd
        title={LEGAL_HUB.title}
        description={LEGAL_HUB.description}
        path={LEGAL_HUB.path}
        breadcrumbs={breadcrumbs}
      />
      <Header />
      <main id="main" className="flex-1">
        <LegalHero
          eyebrow={LEGAL_HUB.eyebrow}
          title={LEGAL_HUB.title}
          description={LEGAL_HUB.description}
          breadcrumbs={breadcrumbs}
          showUpdated={false}
        />

        <div className="surface-white section">
          <div className="container-x">
            <ul className="grid gap-5 sm:grid-cols-2">
              {LEGAL_DOCS.map((doc, i) => (
                <Reveal as="li" key={doc.slug} index={i}>
                  <Link
                    href={doc.path}
                    className="group flex h-full flex-col rounded-2xl border border-[color:var(--ink-950)]/10 p-7 transition-all duration-300 hover:border-[color:var(--gold-500)]/50 hover:shadow-[0_18px_44px_-28px_rgba(10,21,38,0.4)]"
                  >
                    <p className="eyebrow text-[color:var(--gold-700)]">
                      {doc.eyebrow}
                    </p>
                    <h2 className="h3 mt-3 text-[color:var(--ink-950)]">
                      {doc.navLabel}
                    </h2>
                    <p className="caption text-[color:var(--ink-950)]/65 mt-2 flex-1">
                      {doc.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[color:var(--gold-700)] group-hover:text-[color:var(--gold-500)] transition-colors">
                      למסמך המלא
                      <span
                        aria-hidden="true"
                        className="rtl:-scale-x-100 transition-transform duration-300 group-hover:-translate-x-1"
                      >
                        ←
                      </span>
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>

        <LegalCTA />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
