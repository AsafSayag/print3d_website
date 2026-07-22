import type { Metadata } from "next";
import { Open_Sans, Assistant } from "next/font/google";
import { CONTACT } from "@/lib/constants";
import { JsonLd } from "@/components/JsonLd";
import { AccessibilityWidget } from "@/components/ui/AccessibilityWidget";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import "./globals.css";

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
        {children}
        <FloatingWhatsApp />
        <AccessibilityWidget />
      </body>
    </html>
  );
}
