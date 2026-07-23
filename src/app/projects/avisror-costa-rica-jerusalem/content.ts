/**
 * All copy for the אביסרור, קוסטה ריקה project page.
 * Rows marked `pending` are fields that still need to be filled in.
 *
 * Server-only: `projectImages` reads the filesystem, so never import this
 * module from a "use client" file — pass the image arrays down as props.
 */
import { projectImages } from "@/lib/projectImages";

export const SEO_TITLE_TAG =
  "מודל אדריכלי אביסרור, קוסטה ריקה | קנה מידה 1:150 | פרינט תלת מימד";

export const IMAGE_ALT =
  "מודל אדריכלי בקנה מידה 1:150 של פרויקט אביסרור, קוסטה ריקה ירושלים — הדפסת תלת מימד וחיתוך לייזר";

export const HERO = {
  eyebrow: "",
  title: "אביסרור, קוסטה ריקה",
  scale: "1:150",
};

/** Dedicated background image for the מפרט טכני section. */
/**
 * Image lists come from the asset folder, not from this file — see
 * `projectImages`. Add, reorder or reclassify photos by renaming files.
 */
const IMAGES = projectImages("avisror_costa_rica_jerusalem_project");

export const SPEC_BG = IMAGES.bg;

export type SpecRow = {
  label: string;
  value?: string;
  pending?: boolean;
  pendingHint?: string;
};

export const SPECS: SpecRow[] = [
  { label: "שם המודל", value: "מודל אדריכלי — פרויקט אביסרור, קוסטה ריקה" },
  { label: "קנה מידה", value: "1:150" },
  {
    label: "שיטות ייצור",
    value: "הדפסת תלת מימד, חיתוך לייזר, הרכבה וגימור בעבודת יד",
  },
  {
    label: "תאורה",
    value: "תאורת LED חמה בכל יחידות הדיור, במבני הציבור ובעמודי תאורת הרחוב",
  },
  {
    label: "אלמנטים במודל",
    value:
      "אשכול מגדלי מגורים גבוהים מוארים, מבנה ציבור מזוגג, פארק שכונתי נרחב עם גני משחקים, מתקני מים וחורש טבעי, בית ספר ומגרש ספורט, מערך כבישים מלא עם כיכרות, מעברי חצייה ושביל אופניים, כניסה למנהרת חניון, נפחי מסה לבנים לסביבה הבנויה, כלי רכב ודמויות בקנה מידה",
  },
  { label: "ייעוד", value: "תצוגה במשרד מכירות" },
];

export const GALLERY_ITEMS = IMAGES.gallery;

/** Hero carousel — the IMG_ subset, in numeric order. GAL_ photos are skipped. */
export const HERO_SLIDES = IMAGES.slides;
