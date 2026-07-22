/**
 * All copy for the Gindi · כפר אז"ר project page, verbatim from the brief PDF.
 * Rows marked `pending` are fields the brief flags as "להשלמה" (David/Nevo to fill).
 *
 * Server-only: `projectImages` reads the filesystem, so never import this
 * module from a "use client" file — pass the image arrays down as props.
 */
import { projectImages } from "@/lib/projectImages";

export const SEO_TITLE_TAG =
  'מודל אדריכלי גינדי כפר אז"ר | קנה מידה 1:100 | פרינט תלת מימד';

export const IMAGE_ALT =
  'מודל אדריכלי בקנה מידה 1:100 של פרויקט מגורים גינדי בכפר אז"ר — הדפסת תלת מימד וחיתוך לייזר';

export const HERO = {
  eyebrow: "",
  title: 'גינדי, כפר אז"ר',
  scale: "1:100",
};

/** Dedicated background image for the מפרט טכני section. */
/**
 * Image lists come from the asset folder, not from this file — see
 * `projectImages`. Add, reorder or reclassify photos by renaming files.
 */
const IMAGES = projectImages("gindi_kfar_azar_project");

export const SPEC_BG = IMAGES.bg;

export type SpecRow = {
  label: string;
  value?: string;
  pending?: boolean;
  pendingHint?: string;
};

export const SPECS: SpecRow[] = [
  { label: "שם המודל", value: 'מודל אדריכלי — פרויקט גינדי, כפר אז"ר' },
  { label: "סוג המודל", value: "מודל שיווקי למשרד מכירות" },
  { label: "קנה מידה", value: "1:100" },
  {
    label: "שיטות ייצור",
    value: "הדפסת תלת מימד, חיתוך לייזר, הרכבה וגימור בעבודת יד",
  },
  {
    label: "חומרים וגימורים",
    value: "חזיתות בגוון לבן עם פירוט מרפסות מלא, זיגוג שקוף, צביעה בהתזה",
  },
  { label: "תאורה", pending: true, pendingHint: "יש/אין LED, ופירוט אם יש" },
  {
    label: "אלמנטים במודל",
    value:
      "4 בנייני מגורים בני כ-9 קומות, פיתוח סביבתי מלא (עצים, שבילים, גינון, ריצוף מדומה), קומת קרקע מפורטת",
  },
  { label: "ייעוד", value: "תצוגה במשרד מכירות" },
];

export const ABOUT = {
  heading: "על הפרויקט",
  client: "גינדי",
  represented: 'פרויקט מגורים בכפר אז"ר',
  pendingHint: 'מס\' יח"ד, שלב שיווק',
};

export const GALLERY_ITEMS = IMAGES.gallery;

/** Hero carousel — the IMG_ subset, in numeric order. GAL_ photos are skipped. */
export const HERO_SLIDES = IMAGES.slides;
