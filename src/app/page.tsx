import dynamic from "next/dynamic";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { CallbackCta } from "@/components/CallbackCta";
import { Services } from "@/components/Services";
import { ContactBand } from "@/components/ContactBand";
import { WhoFor } from "@/components/WhoFor";
import { Articles } from "@/components/Articles";
import { ContactCta } from "@/components/ContactCta";
import { Footer } from "@/components/Footer";
import { FaqJsonLd } from "@/components/JsonLd";

// Below-the-fold sections that carry heavy CLIENT JS are code-split so their
// hydration bundles load on demand instead of in the initial route JS — this
// frees the main thread during the hero's LCP window (faster LCP/FCP), while
// the server still renders their HTML (SSR kept, so SEO/markup/layout and CLS
// are unchanged; only hydration is deferred). The static server sections
// (CallbackCta, Services, WhoFor, ContactBand…) ship ~no JS, so they stay
// statically imported.
//   ScrollSequence — canvas frame-scrubber
//   Faq            — framer-motion accordion
//   ClientLogos    — rAF/observer-driven logo marquee
//   WhySection     — CountUp counters
//   Portfolio      — the 312-line ProjectShowcase client grid
const ScrollSequence = dynamic(() =>
  import("@/components/ScrollSequence").then((m) => m.ScrollSequence),
);
const Faq = dynamic(() => import("@/components/Faq").then((m) => m.Faq));
const ClientLogos = dynamic(() =>
  import("@/components/ClientLogos").then((m) => m.ClientLogos),
);
const WhySection = dynamic(() =>
  import("@/components/WhySection").then((m) => m.WhySection),
);
const Portfolio = dynamic(() =>
  import("@/components/Portfolio").then((m) => m.Portfolio),
);

export default function Home() {
  return (
    <>
      <FaqJsonLd />
      <Header />
      <main id="main" className="flex-1">
        <Hero />
        <WhySection />
        <ClientLogos />
        <CallbackCta />
        <ScrollSequence />
        <Services />
        <Portfolio />
        <ContactBand />
        <WhoFor />
        <Faq />
        <Articles />
        <ContactCta />
      </main>
      <Footer />
    </>
  );
}
