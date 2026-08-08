import { GlassButton } from "./ui/GlassButton";
import { Reveal } from "./ui/Reveal";
import { CONTACT } from "@/lib/constants";
import { analyticsAttrs } from "@/lib/analytics";
import { HOME_CONTACT_BAND } from "@/lib/content";

/**
 * Elegant, minimal mid-page contact prompt. A single centered card that invites
 * the visitor to the dedicated contact page. Deliberately light and airy to act
 * as a calm "intermission" between the darker portfolio and about sections.
 */
export function ContactBand({
  ctaHref = CONTACT.contactPath,
}: {
  /** On the home page this points to the in-page lead form (#contact). */
  ctaHref?: string;
}) {
  return (
    <section
      className="surface-white py-12 md:py-16"
      aria-label={HOME_CONTACT_BAND.title}
    >
      <div className="container-x">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center rounded-3xl border border-[color:var(--ink-950)]/10 bg-[color:var(--ice-050)] px-6 py-11 sm:px-12 sm:py-12">
            <p className="eyebrow text-[color:var(--gold-700)]">
              {HOME_CONTACT_BAND.eyebrow}
            </p>
            <h2 className="h2 heading-accent heading-accent--center mt-3 inline-block text-[color:var(--ink-950)]">
              {HOME_CONTACT_BAND.title}
            </h2>
            <p className="mt-4 text-[color:var(--ink-950)]/65 text-lg max-w-xl mx-auto">
              {HOME_CONTACT_BAND.text}
            </p>
            <div className="mt-8 flex justify-center on-light">
              <GlassButton
                href={ctaHref}
                variant="primary"
                {...analyticsAttrs("cta_click", {
                  cta_name: "quote_request",
                  location: "contact_band",
                })}
              >
                {HOME_CONTACT_BAND.button}
              </GlassButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
