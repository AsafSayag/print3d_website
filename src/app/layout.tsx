import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import localFont from "next/font/local";
import { CONTACT } from "@/lib/constants";
import { JsonLd } from "@/components/JsonLd";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { CookieConsent } from "@/components/analytics/CookieConsent";
import { CONSENT_BOOTSTRAP } from "@/components/analytics/consent";
import { AnalyticsClickTracker } from "@/components/analytics/AnalyticsClickTracker";
import { PageViewTracker } from "@/components/analytics/PageViewTracker";
import { AttributionCapture } from "@/components/analytics/AttributionCapture";
import { AccessibilityWidget } from "@/components/ui/AccessibilityWidget";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { InPageAnchorScroll } from "@/components/ui/InPageAnchorScroll";
import { REVEAL_BOOTSTRAP } from "@/components/ui/Reveal";
import "./globals.css";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/* Display — Open Sans Bold for all headings */
const openSans = Open_Sans({
  variable: "--font-display",
  subsets: ["hebrew", "latin"],
  weight: ["600", "700"],
  display: "swap",
  preload: true,
});

/* Body & UI — self-hosted (Google Fonts CDN for Assistant started 404ing on
   build, breaking `next/font/google`'s fetch). Files vendored from
   @fontsource/assistant 5.3.0 (OFL-licensed); see src/fonts/assistant/OFL.txt. */
const assistant = localFont({
  variable: "--font-body",
  display: "swap",
  preload: true,
  src: [
    {
      path: "../fonts/assistant/assistant-hebrew-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/assistant/assistant-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/assistant/assistant-hebrew-600-normal.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/assistant/assistant-latin-600-normal.woff2",
      weight: "600",
      style: "normal",
    },
  ],
});

const SITE_TITLE = "Print3D — מודלים אדריכליים פיזיים לפרויקטי נדל״ן";
const SITE_DESCRIPTION =
  "Print3D מייצרת מודלים אדריכליים פיזיים ברמת גימור יוצאת דופן לפרויקטי נדל״ן — טכנולוגיות ייצור מתקדמות וגימור יד אומן, כבר יותר מ-15 שנה.";

export const metadata: Metadata = {
  metadataBase: new URL(CONTACT.siteUrl),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "he_IL",
    siteName: "Print3D",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: CONTACT.siteUrl,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Print3D — מודלים אדריכליים פיזיים לפרויקטי נדל״ן",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: CONTACT.siteUrl },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="he"
      dir="rtl"
      data-scroll-behavior="smooth"
      className={`${openSans.variable} ${assistant.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">
        {/* Scroll-reveal bootstrap — a plain inline <script> (not next/script,
            whose inline App Router scripts only run once the Next runtime has
            loaded) so it executes while the HTML is still parsing, before any
            content paints. See REVEAL_BOOTSTRAP in components/ui/Reveal.tsx. */}
        <script dangerouslySetInnerHTML={{ __html: REVEAL_BOOTSTRAP }} />
        {GA_MEASUREMENT_ID && (
          <>
            {/* Set consent defaults before the GA4 configuration runs. */}
            <script dangerouslySetInnerHTML={{ __html: CONSENT_BOOTSTRAP }} />
            <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
          </>
        )}
        <JsonLd />
        <InPageAnchorScroll />
        {children}
        <FloatingWhatsApp />
        <AccessibilityWidget />
        {/* Independent of GA: the lead form records the ad click id / UTMs
            even where no analytics ID is configured. */}
        <AttributionCapture />
        {GA_MEASUREMENT_ID && (
          <>
            {/* One delegated listener serves every tracked link and button on
                the site — see `analyticsAttrs` in lib/analytics.ts. */}
            <AnalyticsClickTracker />
            {/* GA4's automatic page view is disabled in GoogleAnalytics. */}
            <PageViewTracker />
            <CookieConsent />
          </>
        )}
      </body>
    </html>
  );
}
