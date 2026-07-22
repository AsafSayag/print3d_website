/**
 * All copy for the גיא דורון לוי, רמת אפעל project page.
 * Rows marked `pending` are fields that still need to be filled in.
 *
 * Server-only: `projectImages` reads the filesystem, so never import this
 * module from a "use client" file — pass the image arrays down as props.
 */
import { projectImages } from "@/lib/projectImages";

export const SEO_TITLE_TAG =
  "מודל אדריכלי גיא דורון לוי רמת אפעל | קנה מידה 1:75 | פרינט תלת מימד";

export const IMAGE_ALT =
  "מודל אדריכלי בקנה מידה 1:75 של פרויקט המגורים גיא דורון לוי, רמת אפעל — הדפסת תלת מימד וחיתוך לייזר";

export const HERO = {
  eyebrow: "",
  title: "גיא דורון לוי, רמת אפעל",
  scale: "1:75",
};

/** Dedicated background image for the מפרט טכני section. */
/**
 * Image lists come from the asset folder, not from this file — see
 * `projectImages`. Add, reorder or reclassify photos by renaming files.
 */
const IMAGES = projectImages("guy_doron_levy_ramat_efal_project");

export const SPEC_BG = IMAGES.bg;

export type SpecRow = {
  label: string;
  value?: string;
  pending?: boolean;
  pendingHint?: string;
};

export const SPECS: SpecRow[] = [
  { label: "שם המודל", value: "מודל אדריכלי — גיא דורון לוי, רמת אפעל" },
  { label: "סוג המודל", value: "מודל שיווקי למשרד מכירות" },
  { label: "קנה מידה", value: "1:75" },
  {
    label: "שיטות ייצור",
    value: "הדפסת תלת מימד, חיתוך לייזר, הרכבה וגימור בעבודת יד",
  },
  {
    label: "חומרים וגימורים",
    value:
      "חזיתות לבנות עם מרפסות רציפות ומעקי זכוכית, זיגוג כהה, גימור בצביעה בהתזה",
  },
  {
    label: "תאורה",
    value: "ללא תאורה פנימית — המודל מוצג בגימור יום מלא",
  },
  {
    label: "אלמנטים במודל",
    value:
      "בניין מגורים בן שני אגפים, פארק ציבורי מפותח בצמוד לבניין (עצים, שבילים מתפתלים, מדשאות), בריכה, חצר פנימית, כביש עם מדרכות, מקומות חניה ותאורת רחוב",
  },
  { label: "ייעוד", value: "תצוגה במשרד מכירות" },
];

export const GALLERY_ITEMS = IMAGES.gallery;

/** Hero carousel — the IMG_ subset, in numeric order. GAL_ photos are skipped. */
export const HERO_SLIDES = IMAGES.slides;
