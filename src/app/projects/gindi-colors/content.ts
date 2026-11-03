/** Project copy and image references for Gindi Colors. Server-only. */
import { projectImages } from "@/lib/projectImages";

export const SEO_TITLE_TAG =
  "מודל אדריכלי גינדי קולורס | קנה מידה 1:125 | פרינט תלת מימד";

export const IMAGE_ALT =
  "מודל אדריכלי של גינדי קולורס בקריית השרון בקנה מידה 1:125, עם בנייני מגורים, מסחר ושטחים ירוקים";

export const META_DESCRIPTION =
  "מודל אדריכלי של גינדי קולורס בקריית השרון בקנה מידה 1:125. שמונה בנייני מגורים, מתחמי מסחר, פארקים וגנים ציבוריים, עם תאורה חמה ופיתוח נופי מפורט.";

export const HERO = {
  eyebrow: "",
  title: "גינדי קולורס",
  scale: "1:125",
};

const IMAGES = projectImages("gindi_colors_project");

export const SPEC_BG = IMAGES.bg;

export type SpecRow = {
  label: string;
  value?: string;
  pending?: boolean;
  pendingHint?: string;
};

export const SPECS: SpecRow[] = [
  { label: "שם המודל", value: "מודל אדריכלי — גינדי קולורס, קריית השרון" },
  { label: "קנה מידה", value: "1:125" },
  { label: "שיטות ייצור", pending: true },
  {
    label: "תאורה",
    value: "תאורה חמה בחלונות הבניינים, בחזית המסחר ובשטחים הירוקים",
  },
  {
    label: "אלמנטים במודל",
    value:
      "שמונה בנייני מגורים בחיפוי בהיר וכהה, מתחמי קניות, פארקים וגנים ציבוריים עם עצים, שבילים, פינות ישיבה וכבישים",
  },
  { label: "ייעוד", value: "תצוגה במשרד המכירות" },
];

export const GALLERY_ITEMS = IMAGES.gallery;
export const HERO_SLIDES = IMAGES.slides;
