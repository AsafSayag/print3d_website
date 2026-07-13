import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Faq } from "@/components/Faq";
import { PortfolioHero } from "@/components/portfolio/PortfolioHero";
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
  path: "/portfolio",
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
        path="/portfolio"
        breadcrumbs={breadcrumbs}
      />
      <Header />
      <main id="main" className="flex-1">
        <PortfolioHero />
        <PortfolioIntro />
        <ProjectShowcase />
        <ProjectFilterGrid />
        <PortfolioCta />
        <ProjectHighlights />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
