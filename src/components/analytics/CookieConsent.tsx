"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { readConsent, setConsent, type ConsentChoice } from "./consent";

const subscribe = () => () => {};
/** "none" = no stored choice yet; "ssr" = server render (never show). */
const getSnapshot = () => readConsent() ?? "none";
const getServerSnapshot = () => "ssr";

/**
 * Small cookie notice — a compact dark strip at the bottom that slides in
 * ~1.5s after load (never competing with the hero), with one-tap accept /
 * decline. Not a modal: the page stays fully usable while it's up. The policy
 * (who starts granted/denied) lives in consent.ts.
 *
 * While visible it publishes its height as `--consent-h` and sets
 * `html.consent-on`, which lifts the floating WhatsApp / accessibility buttons
 * above it on phones instead of letting it cover them (see .cookie-bar).
 */
export function CookieConsent() {
  const stored = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [chosen, setChosen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const open = stored === "none" && !chosen;

  useEffect(() => {
    const el = ref.current;
    if (!open || !el) return;
    const root = document.documentElement;
    const publish = () => root.style.setProperty("--consent-h", `${el.offsetHeight}px`);
    publish();
    root.classList.add("consent-on");
    const ro = new ResizeObserver(publish);
    ro.observe(el);
    return () => {
      ro.disconnect();
      root.classList.remove("consent-on");
      root.style.removeProperty("--consent-h");
    };
  }, [open]);

  if (!open) return null;

  const choose = (c: ConsentChoice) => {
    setConsent(c);
    setChosen(true);
  };

  return (
    <div ref={ref} className="cookie-bar" role="region" aria-label="הסכמה לשימוש בעוגיות">
      <p className="cookie-bar-text">
        אנחנו משתמשים בעוגיות כדי למדוד ולשפר את האתר.{" "}
        <Link href="/legal/cookies" className="cookie-bar-link">
          פרטים
        </Link>
      </p>
      <div className="cookie-bar-actions">
        <button type="button" className="cookie-btn cookie-btn--ok" onClick={() => choose("granted")}>
          אישור
        </button>
        <button type="button" className="cookie-btn cookie-btn--no" onClick={() => choose("denied")}>
          לא תודה
        </button>
      </div>
    </div>
  );
}
