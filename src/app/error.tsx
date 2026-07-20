"use client";

// Runtime error boundary — shown when a page throws unexpectedly, so a visitor
// never hits a blank screen. Same friendly copy as the 404 page.

import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GlassButton } from "@/components/ui/GlassButton";
import { CONTACT } from "@/lib/constants";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <Header />
      <main
        id="main"
        className="legal-hero flex-1 flex items-center justify-center px-6 py-32 sm:py-40 text-center"
      >
        <span className="legal-grid" aria-hidden="true" />
        <div className="max-w-xl">
          <h1 className="h2 text-white legal-rise" style={{ animationDelay: "0.1s" }}>
            סליחה, משהו לא עבר תקין בתהליך
          </h1>
          <p
            className="text-white/70 text-lg mt-5 leading-relaxed legal-rise"
            style={{ animationDelay: "0.18s" }}
          >
            מוזמנים לנסות שוב מאוחר יותר, או לפנות אלינו בטלפון{" "}
            <a
              href={CONTACT.mobilePhoneHref}
              dir="ltr"
              className="font-semibold text-[color:var(--gold-400)] hover:text-[color:var(--gold-500)] transition-colors"
            >
              {CONTACT.mobilePhone}
            </a>
            .
          </p>
          <div
            className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3 legal-rise"
            style={{ animationDelay: "0.26s" }}
          >
            <GlassButton onClick={() => unstable_retry()} variant="primary">
              לנסות שוב
            </GlassButton>
            <GlassButton href="/" variant="secondary">
              חזרה לעמוד הבית
            </GlassButton>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
