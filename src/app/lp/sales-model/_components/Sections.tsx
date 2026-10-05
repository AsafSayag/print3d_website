import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { GlassButton } from "@/components/ui/GlassButton";
import { LeadForm } from "@/components/ui/LeadForm";
import { CONTACT } from "@/lib/constants";
import { analyticsAttrs } from "@/lib/analytics";
import {
  LP_FAQ,
  LP_FINAL,
  LP_LOCATION,
  LP_NUMBERS,
  LP_PROCESS,
} from "../content";

/* ------------------------------------------------------------------ */
/* 2 · Numbers + ROI banner                                            */
/* ------------------------------------------------------------------ */
export function LpNumbers() {
  return (
    <section className="lp-numbers surface-navy-950 section-lp" aria-labelledby="lp-numbers-title">
      <div aria-hidden="true" className="lp-numbers-bg">
        {/* On a phone the section is far taller than the photo's 3:2, so it's
            cropped to height — request the full-resolution file there. */}
        <Image src={LP_NUMBERS.image.src} alt="" fill sizes="(max-width: 767px) 200vw, 100vw" className="lp-numbers-img" />
        <span className="lp-numbers-scrim" />
      </div>

      <div className="container-x relative">
        <div className="text-center max-w-3xl mx-auto">
          <Reveal>
            <p className="eyebrow text-white">{LP_NUMBERS.eyebrow}</p>
          </Reveal>
          <Reveal index={1}>
            <h2 id="lp-numbers-title" className="h2 mt-4 text-white text-balance">
              {LP_NUMBERS.title}
            </h2>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-4 grid-cols-2 lg:grid-cols-4">
          {LP_NUMBERS.stats.map((s, i) => (
            <Reveal as="li" key={s.label} index={i}>
              <div className="lp-stat">
                <div className="lp-stat-num num" dir="ltr">
                  <CountUp end={s.end} suffix={s.suffix} />
                </div>
                <p className="lp-stat-label">{s.label}</p>
                <p className="mt-2 text-white/60 text-[15px] leading-snug">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>

        <div className="mt-14 text-center">
          <Reveal>
            <p className="lp-banner">
              {LP_NUMBERS.bannerTop}
              <span className="block text-[color:var(--steel-300)]">{LP_NUMBERS.bannerBottom}</span>
            </p>
          </Reveal>
          <Reveal index={1} className="mt-8">
            <GlassButton
              href="#lead"
              variant="primary"
              className="lp-cta-lg"
              {...analyticsAttrs("cta_click", {
                cta_name: "quote_request",
                location: `${LP_LOCATION}_numbers`,
              })}
            >
              {LP_NUMBERS.cta}
            </GlassButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 4 · Process                                                         */
/* ------------------------------------------------------------------ */
export function LpProcess() {
  return (
    <section className="surface-ice section-lp" aria-labelledby="lp-process-title">
      <div className="container-x">
        <div className="text-center max-w-2xl mx-auto">
          <Reveal>
            <p className="eyebrow text-[color:var(--gold-700)]">{LP_PROCESS.eyebrow}</p>
          </Reveal>
          <Reveal index={1}>
            <h2 id="lp-process-title" className="h2 mt-4 text-[color:var(--ink-950)]">
              {LP_PROCESS.title}
            </h2>
          </Reveal>
        </div>

        <ol className="lp-process mt-12">
          {LP_PROCESS.steps.map((s, i) => (
            <Reveal as="li" key={s.title} index={i} className="lp-process-item">
              <span aria-hidden="true" className="lp-process-n num">{i + 1}</span>
              <h3 className="h3 mt-5 text-[color:var(--ink-950)]">{s.title}</h3>
              <p className="mt-2 text-[color:var(--ink-950)]/65 leading-relaxed">{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 5 · FAQ — native <details>, zero JS                                  */
/* ------------------------------------------------------------------ */
export function LpFaq() {
  return (
    <section className="surface-white lp-faq-section" aria-labelledby="lp-faq-title">
      {/* Kept deliberately compact: three questions, no eyebrow, tight rows —
          a quick objection-clearer on the way to the form, not a destination. */}
      <div className="container-x max-w-3xl">
        <Reveal>
          <h2 id="lp-faq-title" className="lp-faq-title text-center text-[color:var(--ink-950)]">
            {LP_FAQ.title}
          </h2>
        </Reveal>
        <div className="mt-5 space-y-2">
          {LP_FAQ.items.map((item, i) => (
            <Reveal key={item.q} index={i}>
              <details className="lp-faq" name="lp-faq">
                <summary>
                  <span>{item.q}</span>
                  <span aria-hidden="true" className="lp-faq-icon" />
                </summary>
                <p>{item.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 6 · Final CTA + form                                                */
/* ------------------------------------------------------------------ */
export function LpFinal() {
  const waHref = `https://wa.me/${CONTACT.whatsappNumber}`;
  return (
    <section id="lead" className="lp-final surface-navy-950 section-lp" aria-labelledby="lp-final-title">
      <div aria-hidden="true" className="lp-final-bg">
        {/* Panoramic photo: on a phone it's a band behind the heading (see
            .lp-final-bg) cropped to that band's height — full-res file there. */}
        <Image src={LP_FINAL.image.src} alt="" fill sizes="(max-width: 767px) 400vw, 100vw" className="lp-final-img" />
        <span className="lp-final-scrim" />
      </div>

      <div className="container-x relative">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14 items-center">
          <div>
            <Reveal>
              <p className="eyebrow text-[color:var(--steel-300)]">{LP_FINAL.eyebrow}</p>
            </Reveal>
            <Reveal index={1}>
              <h2 id="lp-final-title" className="lp-final-title mt-4 text-white text-balance">
                {LP_FINAL.title}
              </h2>
            </Reveal>
            <Reveal index={2}>
              <p className="lp-final-text mt-5 text-white/75 text-lg leading-relaxed max-w-md text-pretty">{LP_FINAL.text}</p>
            </Reveal>
            <Reveal index={3}>
              <div className="mt-8">
                <p className="caption text-white/55">{LP_FINAL.orCall}</p>
                <div className="mt-3 flex flex-wrap gap-3">
                  <GlassButton
                    href={CONTACT.phoneHref}
                    {...analyticsAttrs("phone_click", {
                      location: `${LP_LOCATION}_final`,
                      phone_type: "office",
                    })}
                  >
                    <span dir="ltr">{CONTACT.phone}</span>
                  </GlassButton>
                  <GlassButton
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    {...analyticsAttrs("whatsapp_click", { location: `${LP_LOCATION}_final` })}
                  >
                    וואטסאפ
                  </GlassButton>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="lp-form-card">
              <h3 className="h3 text-[color:var(--ink-950)]">{LP_FINAL.formTitle}</h3>
              <div className="mt-6">
                <LeadForm location={LP_LOCATION} source="lp_sales_model" emailOptional />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Minimal footer — legal links only (required for ad platforms)       */
/* ------------------------------------------------------------------ */
export function LpFooter() {
  return (
    <footer className="surface-navy-950 border-t border-white/8">
      <div className="container-x py-8 flex flex-col sm:flex-row items-center justify-between gap-4 caption text-white/50">
        <p>
          © {new Date().getFullYear()} Print3D · {CONTACT.address}
        </p>
        <nav aria-label="קישורים משפטיים" className="flex gap-5">
          <Link href="/legal/privacy" className="hover:text-white transition-colors">מדיניות פרטיות</Link>
          <Link href="/legal/terms" className="hover:text-white transition-colors">תנאי שימוש</Link>
          <Link href="/legal/accessibility" className="hover:text-white transition-colors">הצהרת נגישות</Link>
        </nav>
      </div>
    </footer>
  );
}
