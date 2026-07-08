import type { Metadata } from "next";
import { Frank_Ruhl_Libre, Assistant, Montserrat } from "next/font/google";
import { CONTACT } from "@/lib/constants";
import { JsonLd } from "@/components/JsonLd";
import "./globals.css";

/* Display serif — heritage & craft */
const frankRuhl = Frank_Ruhl_Libre({
  variable: "--font-display",
  subsets: ["hebrew", "latin"],
  weight: ["500", "700"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

/* Body & UI */
const assistant = Assistant({
  variable: "--font-body",
  subsets: ["hebrew", "latin"],
  weight: ["400", "600"],
  display: "swap",
  preload: true,
});

/* Numbers & Latin — matches the logo */
const montserrat = Montserrat({
  variable: "--font-num",
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
  preload: false,
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
      className={`${frankRuhl.variable} ${assistant.variable} ${montserrat.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
