import { Reveal } from "@/components/ui/Reveal";
import { GlassButton } from "@/components/ui/GlassButton";
import { CONTACT } from "@/lib/constants";
import { PORTFOLIO_HERO, PORTFOLIO_CTA } from "@/lib/portfolioContent";

/**
 * The portfolio banner's descriptive copy, lifted OFF the banner into its own
 * frosted-glass frame on the dark ambient surface directly beneath it — so it
 * reads cleanly in black without competing with the headline over the video.
 * Carries the page's primary CTA, sized up so it reads as the prominent next
 * step straight after the intro.
 */
export function PortfolioIntro() {
  return (
    <section className="portfolio-ambient" aria-label={PORTFOLIO_HERO.eyebrow}>
      <div className="container-x pt-8 md:pt-12 pb-2">
        <Reveal>
          <div className="portfolio-hero-glass max-w-3xl">
            <p className="text-black text-lg leading-relaxed font-medium">
              {PORTFOLIO_HERO.subtitle}
            </p>
            <div className="mt-7">
              <GlassButton
                href={CONTACT.contactPath}
                variant="primary"
                className="!px-9 !py-4 !text-lg shadow-[0_18px_50px_-16px_rgba(62, 121, 159,0.65)]"
              >
                {PORTFOLIO_CTA.button}
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 12H5M11 18l-6-6 6-6" />
                </svg>
              </GlassButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
