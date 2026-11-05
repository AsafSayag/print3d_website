import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GlassButton } from "@/components/ui/GlassButton";
import { CONTACT } from "@/lib/constants";
import { analyticsAttrs } from "@/lib/analytics";
import { NOT_FOUND_METADATA } from "@/lib/pageMeta";

export const metadata = NOT_FOUND_METADATA;

export default function NotFound() {
  return (
    <>
      <Header />
      <main
        id="main"
        className="legal-hero flex-1 flex items-center justify-center px-6 py-32 sm:py-40 text-center"
      >
        <span className="legal-grid" aria-hidden="true" />
        <div className="max-w-xl">
          <p className="error-code legal-rise" aria-hidden="true">
            404
          </p>
          {/* Copy is "not found", not the error boundary's "try again later":
              a visitor here followed a stale or mistyped link (the site moved
              /blog → /knowledge and /portfolio → /projects), so the page says
              so and offers the main destinations instead of a retry. */}
          <h1 className="h2 text-white mt-2 legal-rise" style={{ animationDelay: "0.1s" }}>
            הדף שחיפשתם לא נמצא
          </h1>
          <p
            className="text-white/70 text-lg mt-5 leading-relaxed legal-rise"
            style={{ animationDelay: "0.18s" }}
          >
            ייתכן שהקישור השתנה או שהדף הועבר. אפשר להמשיך לאחד הדפים המרכזיים, או להתקשר אלינו{" "}
            <a
              href={CONTACT.mobilePhoneHref}
              dir="ltr"
              {...analyticsAttrs("phone_click", {
                location: "not_found_page",
                phone_type: "mobile",
              })}
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
            <GlassButton href="/" variant="primary">
              חזרה לעמוד הבית
            </GlassButton>
            <GlassButton href="/projects" variant="secondary">
              לכל הפרויקטים
            </GlassButton>
            <GlassButton href="/services/architectural-models" variant="secondary">
              ייצור מודלים אדריכליים
            </GlassButton>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
