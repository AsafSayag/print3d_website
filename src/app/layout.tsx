import type { Metadata } from "next";
import { Open_Sans, Assistant } from "next/font/google";
import { CONTACT } from "@/lib/constants";
import { JsonLd } from "@/components/JsonLd";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { AnalyticsClickTracker } from "@/components/analytics/AnalyticsClickTracker";
import { PageViewTracker } from "@/components/analytics/PageViewTracker";
import { AccessibilityWidget } from "@/components/ui/AccessibilityWidget";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { InPageAnchorScroll } from "@/components/ui/InPageAnchorScroll";
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

/* Body & UI */
const assistant = Assistant({
  variable: "--font-body",
  subsets: ["hebrew", "latin"],
  weight: ["400", "600"],
  display: "swap",
  preload: true,
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
        <JsonLd />
        <InPageAnchorScroll />
        {children}
        <FloatingWhatsApp />
        <AccessibilityWidget />
        {GA_MEASUREMENT_ID && (
          <>
            <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
            {/* One delegated listener serves every tracked link and button on
                the site — see `analyticsAttrs` in lib/analytics.ts. */}
            <AnalyticsClickTracker />
            {/* The sole source of page_view — the bootstrap sets
                send_page_view:false so gtag sends none of its own. */}
            <PageViewTracker />
          </>
        )}
      </body>
    </html>
  );
}
