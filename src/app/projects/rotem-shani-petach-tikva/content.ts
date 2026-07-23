/**
 * All copy for the רותם שני, פתח תקווה project page.
 * Rows marked `pending` are fields that still need to be filled in.
 *
 * Server-only: `projectImages` reads the filesystem, so never import this
 * module from a "use client" file — pass the image arrays down as props.
 */
import { projectImages } from "@/lib/projectImages";

export const SEO_TITLE_TAG =
  "מודל אדריכלי רותם שני פתח תקווה | קנה מידה 1:100 | פרינט תלת מימד";

export const IMAGE_ALT =
  "מודל אדריכלי בקנה מידה 1:100 של פרויקט המגורים רותם שני, פתח תקווה — הדפסת תלת מימד וחיתוך לייזר";

export const HERO = {
  eyebrow: "",
  title: "רותם שני, פתח תקווה",
  scale: "1:100",
};

/** Dedicated background image for the מפרט טכני section. */
/**
 * Image lists come from the asset folder, not from this file — see
 * `projectImages`. Add, reorder or reclassify photos by renaming files.
 */
const IMAGES = projectImages("rotem_shani_petach_tikva_project");

export const SPEC_BG = IMAGES.bg;

export type SpecRow = {
  label: string;
  value?: string;
  pending?: boolean;
  pendingHint?: string;
};

export const SPECS: SpecRow[] = [
  { label: "שם המודל", value: "מודל אדריכלי — פרויקט רותם שני, פתח תקווה" },
  { label: "קנה מידה", value: "1:100" },
  {
    label: "שיטות ייצור",
    value: "הדפסת תלת מימד, חיתוך לייזר, הרכבה וגימור בעבודת יד",
  },
  {
    label: "תאורה",
    value: "תאורת LED חמה בכל יחידות הדיור, בלובי הכניסה ובתאורת החצרות",
  },
  {
    label: "אלמנטים במודל",
    value:
      "בניין מגורים בוטיק לצד בנייני הסביבה, חצרות פרטיות עם דקי עץ, פרגולות, מדשאות וגדרות חיה, רמפת ירידה לחניון תת-קרקעי, פארק שכונתי עם עצים פורחים ומצללות, רחוב עם סימוני נתיבים, מפרצי חניה, מדרכות משתלבות ותאורת רחוב, כלי רכב ודמויות בקנה מידה",
  },
  { label: "ייעוד", value: "תצוגה במשרד מכירות" },
];

export const ABOUT = {
  heading: "על הפרויקט",
  client: "רותם שני",
  represented: "פרויקט מגורים, פתח תקווה",
  pendingHint: 'מס\' יח"ד, שלב שיווק',
};

export const GALLERY_ITEMS = IMAGES.gallery;

/** Hero carousel — the IMG_ subset, in numeric order. GAL_ photos are skipped. */
export const HERO_SLIDES = IMAGES.slides;
