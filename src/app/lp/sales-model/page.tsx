import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { buildPageMeta } from "@/lib/pageMeta";
import { LpHeader } from "./_components/LpHeader";
import { LpHero } from "./_components/LpHero";
import { LpMobileBar } from "./_components/LpMobileBar";
import { CampaignTagManager } from "./_components/CampaignTagManager";
import {
  LpFaq,
  LpFinal,
  LpFooter,
  LpNumbers,
  LpProcess,
} from "./_components/Sections";
import { LP_META, LP_PATH } from "./content";

/**
 * Paid-traffic landing page — reached only from sponsored ads.
 *
 * noindex (and deliberately absent from sitemap.ts): it overlaps the homepage's
 * message, and ad landing pages shouldn't compete with it in organic search.
 * The header carries no navigation — one path, one goal: the lead form (#lead).
 */
export const metadata: Metadata = buildPageMeta({
  title: LP_META.title,
  description: LP_META.description,
  path: LP_PATH,
  index: false,
});

// Client-heavy, below the fold → code-split (SSR kept).
const FlowJourney = dynamic(() =>
  import("./_components/FlowJourney").then((m) => m.FlowJourney),
);
const ShowcaseCarousel = dynamic(() =>
  import("./_components/ShowcaseCarousel").then((m) => m.ShowcaseCarousel),
);
const ClientLogos = dynamic(() =>
  import("@/components/ClientLogos").then((m) => m.ClientLogos),
);

export default function SalesModelLandingPage() {
  return (
    <>
      <CampaignTagManager />
      <LpHeader />
      <main id="main" className="flex-1">
        <LpHero />
        <div className="lp-logos">
          <ClientLogos />
        </div>
        {/* The proof (numbers) comes straight after the logos, before the
            story of the sales meeting. */}
        <LpNumbers />
        <FlowJourney />
        <ShowcaseCarousel />
        <LpProcess />
        <LpFaq />
        <LpFinal />
      </main>
      <LpFooter />
      <LpMobileBar />
    </>
  );
}
