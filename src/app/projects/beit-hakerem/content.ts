/**
 * All copy for the בית הכרם project page.
 * Rows marked `pending` are fields that still need to be filled in.
 *
 * Server-only: `projectImages` reads the filesystem, so never import this
 * module from a "use client" file — pass the image arrays down as props.
 */
import { projectImages } from "@/lib/projectImages";

export const SEO_TITLE_TAG =
  "מודל אדריכלי בית הכרם | קנה מידה 1:1000 | פרינט תלת מימד";

export const IMAGE_ALT =
  "מודל אדריכלי עירוני בקנה מידה 1:1000 של פרויקט בית הכרם — הדפסת תלת מימד וחיתוך לייזר";

export const HERO = {
  eyebrow: "",
  title: "בית הכרם",
  scale: "1:1000",
};

/** Dedicated background image for the מפרט טכני section. */
/**
 * Image lists come from the asset folder, not from this file — see
 * `projectImages`. Add, reorder or reclassify photos by renaming files.
 */
const IMAGES = projectImages("beit_hakerem_project");

export const SPEC_BG = IMAGES.bg;

export type SpecRow = {
  label: string;
  value?: string;
  pending?: boolean;
  pendingHint?: string;
};

export const SPECS: SpecRow[] = [
  { label: "שם המודל", value: "מודל אדריכלי — פרויקט בית הכרם" },
  { label: "קנה מידה", value: "1:1000" },
  {
    label: "שיטות ייצור",
    value: "הדפסת תלת מימד, חיתוך לייזר, הרכבה וגימור בעבודת יד",
  },
  {
    label: "תאורה",
    value: "תאורת LED חמה בכל יחידות הדיור, מופעלת במתג בבסיס הוויטרינה",
  },
  {
    label: "אלמנטים במודל",
    value:
      "שני מודלים בוויטרינות נפרדות המציגים חלופות תכנון למתחם, מגדלי ובנייני מגורים רבים במדרג גבהים, טופוגרפיה משופעת עם קירות תמך, כביש ראשי מסומן עם מפרצי חניה, שדרות עצים וגינון",
  },
  { label: "ייעוד", value: "תצוגה במשרד מכירות" },
];

export const ABOUT = {
  heading: "על הפרויקט",
  client: "אלעד ישראל מגורים",
  represented: "פרויקט בית הכרם",
  pendingHint: 'מס\' יח"ד, שלב שיווק',
};

export const GALLERY_ITEMS = IMAGES.gallery;

/** Hero carousel — the IMG_ subset, in numeric order. GAL_ photos are skipped. */
export const HERO_SLIDES = IMAGES.slides;
