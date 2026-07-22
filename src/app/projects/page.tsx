import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Faq } from "@/components/Faq";
import { BrightHero } from "@/components/BrightHero";
import { HERO_VIDEO } from "@/lib/heroVideo";
import { PortfolioIntro } from "@/components/portfolio/PortfolioIntro";
import { ProjectShowcase } from "@/components/portfolio/ProjectShowcase";
import { ProjectFilterGrid } from "@/components/portfolio/ProjectFilterGrid";
import { PortfolioCta } from "@/components/portfolio/PortfolioCta";
import { ProjectHighlights } from "@/components/portfolio/ProjectHighlights";
import { LegalJsonLd } from "@/components/legal/LegalJsonLd";
import type { Crumb } from "@/components/legal/Breadcrumbs";
import { buildPageMeta } from "@/lib/pageMeta";
import { PORTFOLIO_HERO } from "@/lib/portfolioContent";

export const metadata: Metadata = buildPageMeta({
  title: "קטלוג",
  description: PORTFOLIO_HERO.subtitle,
  path: "/projects",
});

const breadcrumbs: Crumb[] = [
  { label: "בית", href: "/" },
  { label: "קטלוג" },
];

export default function PortfolioPage() {
  return (
    <>
      <LegalJsonLd
        title={PORTFOLIO_HERO.title}
        description={PORTFOLIO_HERO.subtitle}
        path="/projects"
        breadcrumbs={breadcrumbs}
      />
      <Header />
      <main id="main" className="flex-1">
        <BrightHero
          eyebrow={PORTFOLIO_HERO.eyebrow}
          title={PORTFOLIO_HERO.title}
          breadcrumbs={breadcrumbs}
          video={HERO_VIDEO}
          singleLineTitle
          hideBreadcrumbs
          hideEyebrow
          centerOnMobile
        />
        {/* Intro + showcase share ONE continuous ambient surface so the
            background flows seamlessly between them (no per-section gradient
            reset). A luminous connector bridges the two as a premium hinge. */}
        <div className="portfolio-ambient">
          <PortfolioIntro />
          <div className="portfolio-seam" aria-hidden="true" />
          <ProjectShowcase />
        </div>
        <ProjectFilterGrid />
        <PortfolioCta />
        <ProjectHighlights />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
