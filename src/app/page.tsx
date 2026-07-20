import dynamic from "next/dynamic";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ClientLogos } from "@/components/ClientLogos";
import { CallbackCta } from "@/components/CallbackCta";
import { WhySection } from "@/components/WhySection";
import { Services } from "@/components/Services";
import { Portfolio } from "@/components/Portfolio";
import { ContactBand } from "@/components/ContactBand";
import { WhoFor } from "@/components/WhoFor";
import { Articles } from "@/components/Articles";
import { ContactCta } from "@/components/ContactCta";
import { Footer } from "@/components/Footer";
import { FaqJsonLd } from "@/components/JsonLd";

// Both sit below the fold and carry heavy client JS (ScrollSequence: a canvas
// frame-scrubber; Faq: the framer-motion accordion). Code-split so their JS
// loads on demand instead of in the initial route bundle — the server still
// renders their HTML (SSR kept for SEO/no-CLS), only hydration is deferred.
const ScrollSequence = dynamic(() =>
  import("@/components/ScrollSequence").then((m) => m.ScrollSequence),
);
const Faq = dynamic(() => import("@/components/Faq").then((m) => m.Faq));

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
