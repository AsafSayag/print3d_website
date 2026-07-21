import { Footer } from "@/components/Footer";
import { Faq } from "@/components/Faq";
import { HeroSlider } from "./HeroSlider";
import { TechnicalSpec } from "./TechnicalSpec";
import { Gallery } from "@/components/project/Gallery";
import { IMAGE_ALT, HERO, HERO_SLIDES, GALLERY_ITEMS } from "../content";

/**
 * Page layout for שבירו · ראשון לציון:
 * hero slider → dark מפרט טכני block → editorial gallery → FAQ → footer.
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

      {/* מפרט טכני — full-bleed dark section over the model photo. */}
      <TechnicalSpec />

      {/* Gallery */}
      <section id="gallery" className="section surface-ice">
        <div className="container-x">
          <h2 className="h2 heading-accent mb-10">תמונות המודל</h2>
          <Gallery items={GALLERY_ITEMS} alt={IMAGE_ALT} />
        </div>
      </section>

      <Faq />

      <Footer />
    </main>
  );
}
