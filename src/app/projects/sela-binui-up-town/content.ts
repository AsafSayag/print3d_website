/**
 * All copy for the סלע בינוי · Up Town project page.
 * Rows marked `pending` are fields that still need to be filled in.
 *
 * Server-only: `projectImages` reads the filesystem, so never import this
 * module from a "use client" file — pass the image arrays down as props.
 */
import { projectImages } from "@/lib/projectImages";

export const SEO_TITLE_TAG =
  "מודל אדריכלי סלע בינוי Up Town | קנה מידה 1:75 | פרינט תלת מימד";

export const IMAGE_ALT =
  "מודל אדריכלי בקנה מידה 1:75 של מגדל המשרדים והמגורים Up Town של סלע בינוי — הדפסת תלת מימד, חזית זכוכית ותאורת LED";

export const HERO = {
  eyebrow: "",
  title: "סלע בינוי · Up Town",
  scale: "1:75",
};

/** Dedicated background image for the מפרט טכני section. */
/**
 * Image lists come from the asset folder, not from this file — see
 * `projectImages`. Add, reorder or reclassify photos by renaming files.
 */
const IMAGES = projectImages("sela_binui_up_town_project");

export const SPEC_BG = IMAGES.bg;

export type SpecRow = {
  label: string;
  value?: string;
  pending?: boolean;
  pendingHint?: string;
};

export const SPECS: SpecRow[] = [
  { label: "שם המודל", value: "מודל אדריכלי — פרויקט Up Town, סלע בינוי" },
  { label: "קנה מידה", value: "1:75" },
  {
    label: "שיטות ייצור",
    value:
      "הדפסת תלת מימד, חיתוך לייזר, מסך זכוכית שקוף עם רשת מולאיונים, הרכבה וגימור בעבודת יד",
  },
  {
    label: "תאורה",
    value:
      "תאורת LED חמה מאחורי כל קומות הזכוכית, בלובי הכפול, בקומות הספורט והבריכה ובתאורת הרחוב והפיתוח — נדלקת ונכבית לתצוגה",
  },
  {
    label: "אלמנטים במודל",
    value:
      "מגדל זכוכית בן כ־25 קומות עם חזית מסך רציפה, פודיום עם לובי כפול־גובה, קומות מועדון דיירים מרוהטות (חדר כושר, בריכה ולאונג') ומרפסות גג מגודרות ברשת מתכת, כיכר עירונית מרוצפת עם עשרות עצים, מדשאות, רחוב ראשי עם מדרכות, מעברי חצייה, פנסי רחוב, כלי רכב ודמויות.",
  },
  { label: "ייעוד", value: "תצוגה במשרד מכירות" },
];

export const GALLERY_ITEMS = IMAGES.gallery;

/** Hero carousel — the IMG_ subset, in numeric order. GAL_ photos are skipped. */
export const HERO_SLIDES = IMAGES.slides;
