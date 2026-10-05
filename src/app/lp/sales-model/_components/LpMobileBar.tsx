"use client";

import { useEffect, useState } from "react";
import { CONTACT } from "@/lib/constants";
import { analyticsAttrs } from "@/lib/analytics";
import { LP_LOCATION, LP_MOBILE_BAR } from "../content";

/**
 * Slim CTA rail pinned to the bottom of the screen on phones only — the lead
 * form sits ~9 screens down there, so this keeps "get a quote" one tap away
 * without shouting: a thin dark-glass strip, a short line and a small link.
 *
 * Shown only between the hero (which has its own CTAs) and the form section
 * (no point pointing at what's already on screen). While visible it sets
 * `html.lp-bar-on`, which lifts the floating WhatsApp / accessibility buttons
 * clear of it (see .lp-mbar in globals.css).
 */
export function LpMobileBar() {
  const [pastHero, setPastHero] = useState(false);
  const [atForm, setAtForm] = useState(false);
  const visible = pastHero && !atForm;

  useEffect(() => {
    const hero = document.querySelector(".lp-hero");
    const form = document.getElementById("lead");
    if (!hero || !form || typeof IntersectionObserver === "undefined") return;

    const heroIo = new IntersectionObserver(([e]) => setPastHero(!e.isIntersecting));
    const formIo = new IntersectionObserver(([e]) => setAtForm(e.isIntersecting));
    heroIo.observe(hero);
    formIo.observe(form);
    return () => {
      heroIo.disconnect();
      formIo.disconnect();
    };
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
          href={CONTACT.phoneHref}
          className="lp-mbar-call"
          aria-label={`התקשרו ${CONTACT.phone}`}
          tabIndex={visible ? undefined : -1}
          {...analyticsAttrs("phone_click", {
            location: `${LP_LOCATION}_mobile_bar`,
            phone_type: "office",
          })}
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
          </svg>
        </a>
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
