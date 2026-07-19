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
    <section aria-label={PORTFOLIO_HERO.eyebrow}>
      <div className="container-x pt-8 md:pt-12 pb-2">
        {/* A prominent scroll cue near the top hints that the projects carousel
            is just below. Shown on every breakpoint (mobile + desktop) and
            emphasised in the brand accent colour. */}
        <Reveal>
          <div className="mb-8 flex flex-col items-center gap-2.5 text-[color:var(--gold-400)]">
            <span className="text-lg md:text-2xl font-bold tracking-wide">
              גללו לצפייה בפרויקטים
            </span>
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-7 w-7 md:h-8 md:w-8 animate-bounce"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M6 13l6 6 6-6" />
            </svg>
          </div>
        </Reveal>

        <Reveal>
          <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:gap-10">
            <div className="portfolio-hero-glass max-w-3xl lg:flex-1">
              <p className="text-black text-lg leading-relaxed font-medium">
                {PORTFOLIO_HERO.subtitle}
              </p>
              {/* Mobile / tablet: the CTA stays inside the glass frame. */}
              <div className="mt-7 lg:hidden">
                <Cta />
              </div>
            </div>

            {/* Desktop: the CTA sits OUTSIDE the frame, to its left. */}
            <div className="hidden lg:block shrink-0">
              <Cta />
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}

function Cta() {
  return (
    <GlassButton
      href={CONTACT.contactPath}
      variant="primary"
      className="cta-glow !px-9 !py-4 !text-lg"
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
  );
}
