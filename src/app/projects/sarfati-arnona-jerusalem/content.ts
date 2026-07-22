/**
 * All copy for the צרפתי, ארנונה ירושלים project page.
 * Rows marked `pending` are fields that still need to be filled in.
 *
 * This project has a single supplied photograph, so it serves as the leader,
 * the only carousel slide and the מפרט טכני background alike.
 *
 * Server-only: `projectImages` reads the filesystem, so never import this
 * module from a "use client" file — pass the image arrays down as props.
 */
import { projectImages } from "@/lib/projectImages";

export const SEO_TITLE_TAG =
  "מודל אדריכלי צרפתי ארנונה ירושלים | קנה מידה 1:100 | פרינט תלת מימד";

export const IMAGE_ALT =
  "מודל אדריכלי בקנה מידה 1:100 של פרויקט המגורים צרפתי, ארנונה ירושלים מתחם 10 — הדפסת תלת מימד וחיתוך לייזר";

export const HERO = {
  eyebrow: "",
  title: "צרפתי, ארנונה ירושלים",
  scale: "1:100",
};

/** Dedicated background image for the מפרט טכני section. */
/**
 * Image lists come from the asset folder, not from this file — see
 * `projectImages`. Add, reorder or reclassify photos by renaming files.
 */
const IMAGES = projectImages("sarfati_arnona_jerusalem_project");

export const SPEC_BG = IMAGES.bg;

export type SpecRow = {
  label: string;
  value?: string;
  pending?: boolean;
  pendingHint?: string;
};

export const SPECS: SpecRow[] = [
  {
    label: "שם המודל",
    value: "מודל אדריכלי — צרפתי, ארנונה ירושלים מתחם 10",
  },
  { label: "סוג המודל", value: "מודל שיווקי למשרד מכירות" },
  { label: "קנה מידה", value: "1:100" },
  {
    label: "שיטות ייצור",
    value: "הדפסת תלת מימד, חיתוך לייזר, הרכבה וגימור בעבודת יד",
  },
  {
    label: "חומרים וגימורים",
    value:
      "חזיתות אבן ירושלמית בגוון שמנת, מרפסות עם מעקי זכוכית, פרגולות עץ וריהוט גן מפורט",
  },
  {
    label: "תאורה",
    value: "ללא תאורה פנימית — המודל מוצג בגימור יום מלא בתוך ויטרינת תצוגה",
  },
  {
    label: "אלמנטים במודל",
    value:
      "שישה בנייני מגורים לאורך רחוב, פיתוח סביבתי מלא (עצים, מדשאות, שבילים, גינון), פארק עירוני, כביש עם מדרכות ומגרש חניה, כלי רכב ודמויות בקנה מידה",
  },
  { label: "ייעוד", value: "תצוגה במשרד מכירות" },
];

/** Only one photograph was supplied for this project. */
export const GALLERY_ITEMS = IMAGES.gallery;

/** Hero carousel — the IMG_ subset, in numeric order. GAL_ photos are skipped. */
export const HERO_SLIDES = IMAGES.slides;
