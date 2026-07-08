import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ScrollSequence } from "@/components/ScrollSequence";
import { StatBar } from "@/components/StatBar";
import { ClientLogos } from "@/components/ClientLogos";
import { WhySection } from "@/components/WhySection";
import { Services } from "@/components/Services";
import { Portfolio } from "@/components/Portfolio";
import { WhoFor } from "@/components/WhoFor";
import { Articles } from "@/components/Articles";
import { Brochure } from "@/components/Brochure";
import { Faq } from "@/components/Faq";
import { ContactCta } from "@/components/ContactCta";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">
        דלגו לתוכן הראשי
      </a>
      <Header />
      <main id="main" className="flex-1">
        <Hero />
        <ScrollSequence />
        <StatBar />
        <ClientLogos />
        <WhySection />
        <Services />
        <Portfolio />
        <WhoFor />
        <Articles />
        <Brochure />
        <Faq />
        <ContactCta />
      </main>
      <Footer />
    </>
  );
}
