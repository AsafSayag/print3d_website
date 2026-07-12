import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ScrollSequence } from "@/components/ScrollSequence";
import { ClientLogos } from "@/components/ClientLogos";
import { CallbackCta } from "@/components/CallbackCta";
import { WhySection } from "@/components/WhySection";
import { Services } from "@/components/Services";
import { Portfolio } from "@/components/Portfolio";
import { ContactBand } from "@/components/ContactBand";
import { WhoFor } from "@/components/WhoFor";
import { Articles } from "@/components/Articles";
import { Faq } from "@/components/Faq";
import { ContactCta } from "@/components/ContactCta";
import { Footer } from "@/components/Footer";
import { FaqJsonLd } from "@/components/JsonLd";

export default function Home() {
  return (
    <>
      <FaqJsonLd />
      <a href="#main" className="skip-link">
        דלגו לתוכן הראשי
      </a>
      <Header />
      <main id="main" className="flex-1">
        <Hero />
        <ClientLogos />
        <CallbackCta />
        <ScrollSequence />
        <WhySection />
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
