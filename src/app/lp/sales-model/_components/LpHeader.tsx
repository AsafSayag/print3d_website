"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { GlassButton } from "@/components/ui/GlassButton";
import { CONTACT } from "@/lib/constants";
import { analyticsAttrs } from "@/lib/analytics";
import { LP_HEADER_CTA, LP_LOCATION } from "../content";

/**
 * Stripped-down header for paid traffic: no navigation (every exit link is a
 * leak from the funnel) — just the brand, a phone line and the single CTA.
 * The one deliberate exit is the logo, which follows the universal convention
 * of leading to the main site's homepage (the site itself never links back
 * here — this page is ad-only and noindex).
 * Transparent over the hero, turns to dark glass once the visitor scrolls.
 * The thin progress rail along its bottom edge is the page's "you're moving
 * forward" cue.
 */
export function LpHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(window.scrollY > 40);
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header className={`lp-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="container-x flex items-center justify-between gap-4 h-16 md:h-[72px]">
        <Logo size={28} href="/" prefetch={false} />
        <div className="flex items-center gap-2 sm:gap-4">
          <a
            href={CONTACT.phoneHref}
            dir="ltr"
            className="hidden sm:inline text-white/80 hover:text-white transition-colors font-semibold"
            {...analyticsAttrs("phone_click", {
              location: `${LP_LOCATION}_header`,
              phone_type: "office",
            })}
          >
            {CONTACT.phone}
          </a>
          <GlassButton
            href="#lead"
            variant="primary"
            className="lp-header-cta"
            {...analyticsAttrs("cta_click", {
              cta_name: "quote_request",
              location: `${LP_LOCATION}_header`,
            })}
          >
            {LP_HEADER_CTA}
          </GlassButton>
        </div>
      </div>
      <span
        aria-hidden="true"
        className="lp-header-progress"
        style={{ transform: `scaleX(${progress})` }}
      />
    </header>
  );
}
