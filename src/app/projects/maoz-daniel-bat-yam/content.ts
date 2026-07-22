/**
 * All copy for the מעוז דניאל, כצנלסון בת ים project page.
 * Rows marked `pending` are fields that still need to be filled in.
 *
 * Server-only: `projectImages` reads the filesystem, so never import this
 * module from a "use client" file — pass the image arrays down as props.
 */
import { projectImages } from "@/lib/projectImages";

export const SEO_TITLE_TAG =
  "מודל אדריכלי מעוז דניאל, כצנלסון בת ים | קנה מידה 1:75 | פרינט תלת מימד";

export const IMAGE_ALT =
  "מודל אדריכלי בקנה מידה 1:75 של פרויקט מעוז דניאל, כצנלסון בת ים — הדפסת תלת מימד וחיתוך לייזר";

export const HERO = {
  eyebrow: "",
  title: "מעוז דניאל, כצנלסון בת ים",
  scale: "1:75",
};

/** Dedicated background image for the מפרט טכני section. */
/**
 * Image lists come from the asset folder, not from this file — see
 * `projectImages`. Add, reorder or reclassify photos by renaming files.
 */
const IMAGES = projectImages("maoz_daniel_bat_yam_project");

export const SPEC_BG = IMAGES.bg;

export type SpecRow = {
  label: string;
  value?: string;
  pending?: boolean;
  pendingHint?: string;
};

export const SPECS: SpecRow[] = [
  { label: "שם המודל", value: "מודל אדריכלי — פרויקט מעוז דניאל, כצנלסון בת ים" },
  { label: "סוג המודל", pending: true, pendingHint: "שיווקי / עירוני / אחר" },
  { label: "קנה מידה", value: "1:75" },
  { label: "שיטות ייצור", pending: true, pendingHint: "הדפסה, חיתוך לייזר וכו׳" },
  { label: "חומרים וגימורים", pending: true, pendingHint: "חזיתות, זיגוג, צביעה" },
  { label: "תאורה", pending: true, pendingHint: "יש/אין LED, ופירוט אם יש" },
  { label: "אלמנטים במודל", pending: true, pendingHint: "פיתוח סביבתי, גינון וכו׳" },
  { label: "ייעוד", pending: true, pendingHint: "תצוגה במשרד מכירות וכו׳" },
];

export const GALLERY_ITEMS = IMAGES.gallery;

/** Hero carousel — the IMG_ subset, in numeric order. GAL_ photos are skipped. */
export const HERO_SLIDES = IMAGES.slides;
