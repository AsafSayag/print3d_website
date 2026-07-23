/**
 * All copy for the בוני בניין, ההגנה project page.
 * Rows marked `pending` are fields that still need to be filled in.
 *
 * Server-only: `projectImages` reads the filesystem, so never import this
 * module from a "use client" file — pass the image arrays down as props.
 */
import { projectImages } from "@/lib/projectImages";

export const SEO_TITLE_TAG =
  "מודל אדריכלי בוני בניין, ההגנה | קנה מידה 1:100 | פרינט תלת מימד";

export const IMAGE_ALT =
  "מודל אדריכלי בקנה מידה 1:100 של פרויקט בוני בניין, ההגנה רעננה — הדפסת תלת מימד וחיתוך לייזר";

export const HERO = {
  eyebrow: "",
  title: "בוני בניין, ההגנה",
  scale: "1:100",
};

/** Dedicated background image for the מפרט טכני section. */
/**
 * Image lists come from the asset folder, not from this file — see
 * `projectImages`. Add, reorder or reclassify photos by renaming files.
 */
const IMAGES = projectImages("bonei_binyan_hahagana_raanana_project");

export const SPEC_BG = IMAGES.bg;

export type SpecRow = {
  label: string;
  value?: string;
  pending?: boolean;
  pendingHint?: string;
};

export const SPECS: SpecRow[] = [
  { label: "שם המודל", value: "מודל אדריכלי — פרויקט בוני בניין, ההגנה" },
  { label: "קנה מידה", value: "1:100" },
  {
    label: "שיטות ייצור",
    value: "הדפסת תלת מימד, חיתוך לייזר, הרכבה וגימור בעבודת יד",
  },
  {
    label: "תאורה",
    value:
      "תאורת LED חמה בכל יחידות הדיור ובקומת הכניסה, לצד עמודי תאורת רחוב וגופי תאורת גן מוארים",
  },
  {
    label: "אלמנטים במודל",
    value:
      "שני בנייני מגורים במדרג גבהים, מרפסות גג מפורטות עם ריהוט גן, מיטות שיזוף, ג׳קוזי ועציצים, גינה משותפת עם מדשאות, עצים בוגרים ושיחים פורחים, קירות תמך וגדרות, רחוב עם מדרכות משתלבות, מפרצי חניה מסומנים, תאורת רחוב וכלי רכב בקנה מידה",
  },
  { label: "ייעוד", value: "תצוגה במשרד מכירות" },
];

export const GALLERY_ITEMS = IMAGES.gallery;

/** Hero carousel — the IMG_ subset, in numeric order. GAL_ photos are skipped. */
export const HERO_SLIDES = IMAGES.slides;
