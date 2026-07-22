/**
 * All copy for the מגדלי לוינשטיין (שדה דב) project page.
 * Rows marked `pending` are fields that still need to be filled in.
 *
 * Server-only: `projectImages` reads the filesystem, so never import this
 * module from a "use client" file — pass the image arrays down as props.
 */
import { projectImages } from "@/lib/projectImages";

export const SEO_TITLE_TAG =
  "מודל אדריכלי מגדלי לוינשטיין | קנה מידה 1:75 | פרינט תלת מימד";

export const IMAGE_ALT =
  "מודל אדריכלי בקנה מידה 1:75 של מגדלי לוינשטיין בשדה דב — הדפסת תלת מימד וחיתוך לייזר";

export const HERO = {
  eyebrow: "",
  title: "מגדלי לוינשטיין",
  scale: "1:75",
};

/** Dedicated background image for the מפרט טכני section. */
/**
 * Image lists come from the asset folder, not from this file — see
 * `projectImages`. Add, reorder or reclassify photos by renaming files.
 */
const IMAGES = projectImages("levinstein_project");

export const SPEC_BG = IMAGES.bg;

export type SpecRow = {
  label: string;
  value?: string;
  pending?: boolean;
  pendingHint?: string;
};

export const SPECS: SpecRow[] = [
  { label: "שם המודל", value: "מודל אדריכלי — מגדלי לוינשטיין, שדה דב" },
  { label: "סוג המודל", value: "מודל שיווקי למשרד מכירות" },
  { label: "קנה מידה", value: "1:75" },
  {
    label: "שיטות ייצור",
    value: "הדפסת תלת מימד, חיתוך לייזר, הרכבה וגימור בעבודת יד",
  },
  {
    label: "חומרים וגימורים",
    value:
      "חזיתות בגוון לבן עם פינות מעוגלות ורשת זיגוג כהה רציפה, מרפסות עם מעקי מתכת שחורים ורצפה בגוון עץ, גימור בצביעה בהתזה",
  },
  {
    label: "תאורה",
    value:
      "תאורת LED חמה בכל יחידות הדיור ובלובי, לצד עמודי תאורת גן מוארים בחצר ובשבילים",
  },
  {
    label: "אלמנטים במודל",
    value:
      "מגדלי מגורים סביב חצר משותפת מפותחת, מדשאות ועצים בוגרים, פינות ישיבה עם שולחנות ושמשיות, מזרקה ומתקני משחק, שדרת דקלים לאורך הכביש הראשי, רצועת פארק עם צמחייה צפופה, מדרכות משתלבות, מעברי חצייה ודמויות בקנה מידה",
  },
  { label: "ייעוד", value: "תצוגה במשרד מכירות" },
];

export const ABOUT = {
  heading: "על הפרויקט",
  client: "לוינשטיין הנדסה",
  represented: "מגדלי לוינשטיין, שדה דב",
  pendingHint: 'מס\' יח"ד, שלב שיווק',
};

export const GALLERY_ITEMS = IMAGES.gallery;

/** Hero carousel — the IMG_ subset, in numeric order. GAL_ photos are skipped. */
export const HERO_SLIDES = IMAGES.slides;
