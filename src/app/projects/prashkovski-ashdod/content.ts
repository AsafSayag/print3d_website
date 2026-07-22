/**
 * All copy for the פרשקובסקי, אשדוד project page.
 * Rows marked `pending` are fields that still need to be filled in.
 *
 * Server-only: `projectImages` reads the filesystem, so never import this
 * module from a "use client" file — pass the image arrays down as props.
 */
import { projectImages } from "@/lib/projectImages";

export const SEO_TITLE_TAG =
  "מודל אדריכלי פרשקובסקי אשדוד | קנה מידה 1:100 | פרינט תלת מימד";

export const IMAGE_ALT =
  "מודל אדריכלי בקנה מידה 1:100 של פרויקט המגורים פרשקובסקי, אשדוד — הדפסת תלת מימד, תאורת LED וחיתוך לייזר";

export const HERO = {
  eyebrow: "",
  title: "פרשקובסקי, אשדוד",
  scale: "1:100",
};

/** Dedicated background image for the מפרט טכני section. */
/**
 * Image lists come from the asset folder, not from this file — see
 * `projectImages`. Add, reorder or reclassify photos by renaming files.
 */
const IMAGES = projectImages("prashkovski_ashdod_project");

export const SPEC_BG = IMAGES.bg;

export type SpecRow = {
  label: string;
  value?: string;
  pending?: boolean;
  pendingHint?: string;
};

export const SPECS: SpecRow[] = [
  { label: "שם המודל", value: "מודל אדריכלי — פרויקט פרשקובסקי, אשדוד" },
  { label: "סוג המודל", value: "מודל שיווקי למשרד מכירות" },
  { label: "קנה מידה", value: "1:100" },
  {
    label: "שיטות ייצור",
    value: "הדפסת תלת מימד, חיתוך לייזר, הרכבה וגימור בעבודת יד",
  },
  {
    label: "חומרים וגימורים",
    value:
      "חזיתות בגווני שמנת ואפור כהה עם חיפוי אבן מדומה, מרפסות עם מעקי מתכת, זיגוג שקוף, פרגולות גג",
  },
  {
    label: "תאורה",
    value: "תאורת LED חמה בכל יחידות הדיור ובלובי הכניסה",
  },
  {
    label: "אלמנטים במודל",
    value:
      "ארבעה מגדלי מגורים סביב חצר משותפת, פיתוח סביבתי מלא (דקלים, עצים, גינון, שבילים מרוצפים), מתקני משחק וגני שעשועים, כבישים עם סימוני נתיבים, מגרשי חניה, כלי רכב ודמויות בקנה מידה",
  },
  { label: "ייעוד", value: "תצוגה במשרד מכירות" },
];

export const GALLERY_ITEMS = IMAGES.gallery;

/** Hero carousel — the IMG_ subset, in numeric order. GAL_ photos are skipped. */
export const HERO_SLIDES = IMAGES.slides;
