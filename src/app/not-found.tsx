import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GlassButton } from "@/components/ui/GlassButton";
import { CONTACT } from "@/lib/constants";
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
          <h1 className="h2 text-white mt-2 legal-rise" style={{ animationDelay: "0.1s" }}>
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
            <GlassButton href="/" variant="primary">
              חזרה לעמוד הבית
            </GlassButton>
            <GlassButton href={CONTACT.mobilePhoneHref} variant="secondary">
              חייגו אלינו
            </GlassButton>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
