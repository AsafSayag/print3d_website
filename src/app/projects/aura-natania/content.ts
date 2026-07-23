/**
 * All copy for the אאורה, נתניה project page.
 * Rows marked `pending` are fields that still need to be filled in.
 *
 * Server-only: `projectImages` reads the filesystem, so never import this
 * module from a "use client" file — pass the image arrays down as props.
 */
import { projectImages } from "@/lib/projectImages";

export const SEO_TITLE_TAG =
  "מודל אדריכלי אאורה, נתניה | קנה מידה 1:150 | פרינט תלת מימד";

export const IMAGE_ALT =
  "מודל אדריכלי בקנה מידה 1:150 של פרויקט אאורה, נתניה — הדפסת תלת מימד וחיתוך לייזר";

export const HERO = {
  eyebrow: "",
  title: "אאורה, נתניה",
  scale: "1:150",
};

/** Dedicated background image for the מפרט טכני section. */
/**
 * Image lists come from the asset folder, not from this file — see
 * `projectImages`. Add, reorder or reclassify photos by renaming files.
 */
const IMAGES = projectImages("aura_natania_project");

export const SPEC_BG = IMAGES.bg;

export type SpecRow = {
  label: string;
  value?: string;
  pending?: boolean;
  pendingHint?: string;
};

export const SPECS: SpecRow[] = [
  { label: "שם המודל", value: "מודל אדריכלי — פרויקט אאורה, נתניה" },
  { label: "קנה מידה", value: "1:150" },
  {
    label: "שיטות ייצור",
    value: "הדפסת תלת מימד, חיתוך לייזר, הרכבה וגימור בעבודת יד",
  },
  {
    label: "תאורה",
    value: "תאורת LED חמה בכל יחידות הדיור, בלובי הכניסה ובעמודי תאורת הרחוב",
  },
  {
    label: "אלמנטים במודל",
    value:
      "אשכול מגדלי מגורים גבוהים לצד בנייני בוטיק נמוכים, נפחי מסה לבנים המייצגים את הסביבה הבנויה, רחוב ראשי עם סימוני נתיבים, מעברי חצייה, מדרכות משתלבות וכיכר עם עץ פורח, חצר פנימית עם שבילים, מדשאות, ספסלים וגן משחקים, שדרות עצים וצמחייה פורחת, כלי רכב בקנה מידה",
  },
  { label: "ייעוד", value: "תצוגה במשרד מכירות" },
];

export const GALLERY_ITEMS = IMAGES.gallery;

/** Hero carousel — the IMG_ subset, in numeric order. GAL_ photos are skipped. */
export const HERO_SLIDES = IMAGES.slides;
