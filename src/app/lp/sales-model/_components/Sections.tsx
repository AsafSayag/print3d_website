import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { GlassButton } from "@/components/ui/GlassButton";
import { CONTACT } from "@/lib/constants";
import { analyticsAttrs } from "@/lib/analytics";
import { LP_FINAL, LP_LOCATION, LP_NUMBERS } from "../content";

/* ------------------------------------------------------------------ */
/* 2 · Numbers + ROI banner                                            */
/* ------------------------------------------------------------------ */
export function LpNumbers() {
  // A light surface (no photo) between the dark logos band and the dark
  // journey: the stats read at a glance, and the change of surface marks
  // where one section ends and the next begins.
  return (
    <section id="lp-numbers" className="lp-numbers surface-ice section-lp" aria-labelledby="lp-numbers-title">
      <div className="container-x">
        <div className="text-center max-w-3xl mx-auto">
          <Reveal>
            <p className="eyebrow text-[color:var(--gold-700)]">{LP_NUMBERS.eyebrow}</p>
          </Reveal>
          <Reveal index={1}>
            <h2 id="lp-numbers-title" className="h2 mt-4 text-[color:var(--ink-950)] text-balance">
              <span className="block">{LP_NUMBERS.titleTop}</span>
              <span className="block">{LP_NUMBERS.titleBottom}</span>
            </h2>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-4 grid-cols-2 lg:grid-cols-4">
          {LP_NUMBERS.stats.map((s, i) => (
            <Reveal as="li" key={s.label} index={i}>
              <div className="lp-stat">
                {/* The figure is LTR ("20%") inside an RTL card; the whole card
                    is centred so number and copy share one axis. */}
                <div className="lp-stat-num num">
                  <span dir="ltr">
                    <CountUp end={s.end} suffix={s.suffix} />
                  </span>
                </div>
                <p className="lp-stat-label">{s.label}</p>
                <p className="mt-2 text-[color:var(--ink-950)]/60 text-[15px] leading-snug">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>

        <div className="mt-14 text-center">
          <Reveal>
            <p className="lp-banner">
              {LP_NUMBERS.bannerTop}
              <span className="block text-[color:var(--gold-500)]">{LP_NUMBERS.bannerBottom}</span>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Closing line — one sentence and the way back up to the question      */
/* ------------------------------------------------------------------ */
export function LpFinal() {
  return (
    <section className="lp-final surface-navy-950 section-lp" aria-labelledby="lp-final-title">
      <div className="container-x text-center">
        <Reveal>
          <h2 id="lp-final-title" className="lp-final-title text-white text-balance">
            {LP_FINAL.title}
          </h2>
        </Reveal>
        <Reveal index={1}>
          <p className="mt-4 text-white/75 text-lg leading-relaxed text-pretty">{LP_FINAL.text}</p>
        </Reveal>
        <Reveal index={2} className="mt-8">
          <GlassButton
            href="#lead"
            variant="primary"
            className="cta-glow lp-cta-lg"
            {...analyticsAttrs("cta_click", {
              cta_name: "quote_request",
              location: `${LP_LOCATION}_final`,
            })}
          >
            {LP_FINAL.cta}
          </GlassButton>
        </Reveal>
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
        <nav aria-label="קישורים משפטיים" className="flex flex-wrap justify-center gap-x-5 gap-y-2">
          <a href="/legal/privacy" className="-my-1 inline-block py-1 hover:text-white transition-colors">מדיניות פרטיות</a>
          <a href="/legal/cookies" className="-my-1 inline-block py-1 hover:text-white transition-colors">מדיניות עוגיות</a>
          <a href="/legal/terms" className="-my-1 inline-block py-1 hover:text-white transition-colors">תנאי שימוש</a>
          <a href="/legal/accessibility" className="-my-1 inline-block py-1 hover:text-white transition-colors">הצהרת נגישות</a>
        </nav>
      </div>
    </footer>
  );
}
