"use client";

import { useEffect, useState } from "react";
import { analyticsAttrs } from "@/lib/analytics";
import { LP_LOCATION, LP_MOBILE_BAR } from "../content";

/**
 * Slim CTA rail pinned to the bottom of the screen on phones only. The
 * screening question sits in the hero, so once the hero has scrolled away this
 * keeps the way back to it one tap away without shouting: a thin dark-glass
 * strip, a short line and a small link.
 *
 * While visible it sets `html.lp-bar-on`, which lifts the floating
 * accessibility button clear of it (see .lp-mbar in globals.css).
 */
export function LpMobileBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.querySelector(".lp-hero");
    if (!hero || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setVisible(!e.isIntersecting));
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("lp-bar-on", visible);
    return () => root.classList.remove("lp-bar-on");
  }, [visible]);

  return (
    <div className={`lp-mbar${visible ? " is-visible" : ""}`} aria-hidden={!visible}>
      <span className="lp-mbar-text">{LP_MOBILE_BAR.text}</span>
      <div className="lp-mbar-actions">
        <a
          href="#lead"
          className="lp-mbar-cta"
          tabIndex={visible ? undefined : -1}
          {...analyticsAttrs("cta_click", {
            cta_name: "quote_request",
            location: `${LP_LOCATION}_mobile_bar`,
          })}
        >
          {LP_MOBILE_BAR.cta}
        </a>
      </div>
    </div>
  );
}
