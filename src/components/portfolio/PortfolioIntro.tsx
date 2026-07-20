import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { CONTACT } from "@/lib/constants";
import { PORTFOLIO_HERO, PORTFOLIO_CTA } from "@/lib/portfolioContent";

/**
 * Calm intro that bridges the hero video and the projects carousel. A centered
 * title + description lead into a single minimal glass "info card" (icon · stat ·
 * CTA). Deliberately understated — it reads as a premium transition between the
 * two moving sections rather than a heavy panel competing with them.
 */
export function PortfolioIntro() {
  return (
    <section aria-label={PORTFOLIO_HERO.eyebrow}>
      <div className="container-x pt-14 pb-6 md:pt-20 md:pb-10">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Reveal>
            <h2 className="font-display text-3xl leading-tight text-white md:text-5xl md:leading-[1.1]">
              ברוכים הבאים לקטלוג של Print3D
            </h2>
          </Reveal>

          <Reveal index={1}>
            <p className="mx-auto mt-6 max-w-[600px] text-base leading-relaxed text-[color:var(--steel-300)] md:text-lg">
              {PORTFOLIO_HERO.subtitle}
            </p>
          </Reveal>

          <Reveal index={2} className="mt-12 w-full md:mt-16">
            <div className="portfolio-intro-card mx-auto flex max-w-[760px] flex-col items-center">
              <span className="portfolio-intro-icon" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2 21 7v10l-9 5-9-5V7z" />
                  <path d="M12 2v20M3 7l9 5 9-5" />
                </svg>
              </span>

              <div className="mt-6 flex flex-col items-center">
                <span
                  className="font-display text-4xl text-white md:text-5xl"
                  dir="ltr"
                >
                  250+
                </span>
                <span className="mt-1.5 text-sm text-[color:var(--steel-300)]">
                  פרויקטים שהושלמו
                </span>
              </div>

              <span className="my-7 h-px w-16 bg-white/10" aria-hidden="true" />

              <Link href={CONTACT.contactPath} className="catalog-cta group">
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
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
