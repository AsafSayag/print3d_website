import { Footer } from "@/components/Footer";
import { Faq } from "@/components/Faq";
import { TechnicalSpec } from "./TechnicalSpec";
import { HeroSlider } from "./HeroSlider";
import { Gallery } from "@/components/project/Gallery";
import { AboutProject } from "./AboutProject";
import { IMAGE_ALT, HERO, HERO_SLIDES, ABOUT, GALLERY_ITEMS } from "../content";

/**
 * The project page layout: full-bleed hero, spec sheet, image gallery and an
 * about accordion.
 */
export function ProjectView() {
  return (
    <main>
      {/* Hero — full-bleed image slider with manual arrows + auto-advance. */}
      <HeroSlider
        slides={HERO_SLIDES}
        alt={IMAGE_ALT}
        eyebrow={HERO.eyebrow}
        title={HERO.title}
      />

      {/* מפרט טכני — dark, full-bleed section with a frosted-glass spec panel. */}
      <TechnicalSpec />

      {/* Gallery */}
      <section className="section surface-ice">
        <div className="container-x">
          <h2 className="h2 heading-accent mb-10">תמונות המודל</h2>
          <Gallery items={GALLERY_ITEMS} alt={IMAGE_ALT} />
        </div>
      </section>

      {/* About project */}
      <section className="section surface-white">
        <div className="container-x max-w-4xl">
          <AboutProject about={ABOUT} />
        </div>
      </section>

      <Faq />

      <Footer />
    </main>
  );
}
