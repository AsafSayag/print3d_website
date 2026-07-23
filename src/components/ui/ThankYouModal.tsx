"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  open: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
};

/**
 * Success popup shown after a visitor leaves their details.
 * Brand-styled (navy surface + gold accent), RTL, and accessible:
 * closes on Escape / backdrop click, locks page scroll, and moves focus in.
 */
export function ThankYouModal({
  open,
  onClose,
  title = "תודה שהשארת פרטים !",
  subtitle = "נחזור אלייך בהקדם האפשרי.",
}: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);

  // Escape to close + lock body scroll while the modal is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  // No `document` during SSR. Rendering null there is not a hydration risk:
  // a portal contributes nothing at this position in the tree either way, and
  // `open` can only become true from a client-side interaction.
  if (typeof document === "undefined") return null;

  // Rendered into <body> rather than in place. `position: fixed` resolves
  // against the nearest ancestor with a transform / filter / will-change, and
  // every <LeadForm> sits inside a <Reveal> (which sets will-change) — in place,
  // this overlay was being clipped to the form card (524x606 instead of the full
  // viewport) instead of covering the page. `html.a11y-contrast main` applies a
  // filter too, so the portal is the fix that holds in both cases.
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          aria-hidden={false}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-[color:var(--navy-950)]/70 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Dialog */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="thankyou-title"
            aria-describedby="thankyou-subtitle"
            dir="rtl"
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-[color:var(--gold-500)]/30 bg-[color:var(--navy-950)] px-8 py-10 text-center shadow-[0_40px_90px_-30px_rgba(10,21,38,0.85)]"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Soft gold glow */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-[color:var(--gold-500)]/25 blur-3xl"
            />

            {/* Close button */}
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="סגירה"
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full text-white transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold-400)]"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            {/* Animated success check */}
            <span
              className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-[color:var(--gold-500)]/40 bg-[color:var(--gold-500)]/10"
              aria-hidden="true"
            >
              <svg viewBox="0 0 60 60" className="h-11 w-11" fill="none">
                <circle className="success-ring" cx="30" cy="30" r="27.4" stroke="var(--gold-500)" strokeWidth="3" strokeLinecap="round" />
                <path className="success-mark" d="M19 31.5l7.5 7.5L42 22" stroke="var(--gold-400)" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>

            <h2 id="thankyou-title" className="h3 text-white">
              {title}
            </h2>
            <p id="thankyou-subtitle" className="mt-3 text-lg text-white/70">
              {subtitle}
            </p>

            <button
              type="button"
              onClick={onClose}
              className="glass-btn glass-btn--primary mt-8 min-w-[180px]"
            >
              סגירה
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
