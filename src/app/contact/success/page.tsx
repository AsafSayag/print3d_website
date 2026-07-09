import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GlassButton } from "@/components/ui/GlassButton";

export const metadata: Metadata = {
  title: "תודה שפנית אלינו | Print3D",
  description:
    "הפנייה התקבלה בהצלחה. אחד מאנשי הצוות של Print3D יחזור אליכם בהקדם.",
  robots: { index: false, follow: true },
};

export default function ContactSuccessPage() {
  return (
    <>
      <a href="#main" className="skip-link">
        דלגו לתוכן הראשי
      </a>
      <Header />
      <main
        id="main"
        className="legal-hero flex-1 flex items-center justify-center px-6 py-32 sm:py-40 text-center"
      >
        <span className="legal-grid" aria-hidden="true" />
        <div className="max-w-xl">
          {/* Animated success check */}
          <span
            className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-[color:var(--gold-500)]/40 bg-[color:var(--gold-500)]/10 legal-rise"
            aria-hidden="true"
          >
            <svg viewBox="0 0 60 60" className="h-11 w-11" fill="none">
              <circle
                className="success-ring"
                cx="30"
                cy="30"
                r="27.4"
                stroke="var(--gold-500)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                className="success-mark"
                d="M19 31.5l7.5 7.5L42 22"
                stroke="var(--gold-400)"
                strokeWidth="3.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>

          <h1 className="h1 text-white legal-rise" style={{ animationDelay: "0.1s" }}>
            תודה שפנית אלינו
          </h1>
          <p
            className="text-white/70 text-lg mt-5 leading-relaxed legal-rise"
            style={{ animationDelay: "0.18s" }}
          >
            הפרטים התקבלו בהצלחה ואחד מאנשי הצוות שלנו יחזור אליך בהקדם.
          </p>
          <p
            className="text-white/45 text-sm mt-4 legal-rise"
            style={{ animationDelay: "0.24s" }}
          >
            אנחנו מתייחסים לכל פנייה ברצינות ושומרים על פרטיותכם בהתאם למדיניות
            הפרטיות שלנו.
          </p>

          <div
            className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3 legal-rise"
            style={{ animationDelay: "0.3s" }}
          >
            <GlassButton href="/" variant="primary">
              חזרה לעמוד הבית
            </GlassButton>
            <GlassButton href="/contact" variant="secondary">
              צור קשר
            </GlassButton>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
