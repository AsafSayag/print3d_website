import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GlassButton } from "@/components/ui/GlassButton";

export const metadata: Metadata = {
  title: "העמוד לא נמצא | Print3D",
  robots: { index: false, follow: true },
};

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
            העמוד לא נמצא
          </h1>
          <p
            className="text-white/70 text-lg mt-5 leading-relaxed legal-rise"
            style={{ animationDelay: "0.18s" }}
          >
            נראה שהעמוד שחיפשתם הועבר או שאינו קיים עוד. אפשר לחזור לעמוד הבית או
            לפנות אלינו — נשמח לעזור למצוא את מה שחיפשתם.
          </p>
          <div
            className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3 legal-rise"
            style={{ animationDelay: "0.26s" }}
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
