import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactHero } from "@/components/ContactHero";
import { FaqAccordion } from "@/components/FaqAccordion";
import { LeadForm } from "@/components/ui/LeadForm";
import { Reveal } from "@/components/ui/Reveal";
import { LegalJsonLd } from "@/components/legal/LegalJsonLd";
import { FaqPageJsonLd } from "@/components/JsonLd";
import type { Crumb } from "@/components/legal/Breadcrumbs";
import { buildPageMeta } from "@/lib/pageMeta";
import { FAQ_PAGE, FAQ_ALL, CONTACT_CTA } from "@/lib/content";

export const metadata: Metadata = buildPageMeta({
  title: FAQ_PAGE.eyebrow,
  description: FAQ_PAGE.subtitle,
  path: "/faq",
});

const breadcrumbs: Crumb[] = [
  { label: "בית", href: "/" },
  { label: FAQ_PAGE.eyebrow },
];

export default function FaqPage() {
  return (
    <>
      <LegalJsonLd
        title={FAQ_PAGE.title}
        description={FAQ_PAGE.subtitle}
        path="/faq"
        breadcrumbs={breadcrumbs}
      />
      <FaqPageJsonLd items={FAQ_ALL} />
      <Header />
      <main id="main" className="flex-1">
        <ContactHero
          eyebrow={FAQ_PAGE.eyebrow}
          title={FAQ_PAGE.title}
          description={FAQ_PAGE.subtitle}
          breadcrumbs={breadcrumbs}
        />

        {/* All questions */}
        <section
          className="surface-white section"
          aria-label={FAQ_PAGE.eyebrow}
        >
          <div className="container-x max-w-3xl">
            <FaqAccordion items={FAQ_ALL} />
          </div>
        </section>

        {/* Lead-capture module (same as the homepage) */}
        <section
          className="surface-navy-950 section"
          aria-label={CONTACT_CTA.heading}
        >
          <div className="container-x max-w-3xl text-center">
            <Reveal>
              <p className="eyebrow text-[color:var(--gold-500)] mb-3">
                לא מצאתם תשובה?
              </p>
            </Reveal>
            <Reveal index={1}>
              <h2 className="h2 text-white">{CONTACT_CTA.heading}</h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="text-white/70 mt-4 text-lg">{CONTACT_CTA.line}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-10">
                <LeadForm />
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
