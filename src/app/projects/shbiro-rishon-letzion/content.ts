/**
 * All copy for the שבירו · ראשון לציון project page.
 *
 * This page uses a bespoke, editorial layout (Yodezeen-style) rather than the
 * shared hero-slider layout — so there is no `HERO_SLIDES` and no `ABOUT`
 * accordion here. Rows marked `pending` still need real values.
 *
 * Server-only: `projectImages` reads the filesystem, so never import this
 * module from a "use client" file — pass the image arrays down as props.
 */
import { projectImages } from "@/lib/projectImages";

export const SEO_TITLE_TAG =
  "מודל אדריכלי שבירו ראשון לציון | קנה מידה 1:200 | פרינט תלת מימד";

export const IMAGE_ALT =
  "מודל אדריכלי עירוני בקנה מידה 1:200 של פרויקט המגורים שבירו בראשון לציון — הדפסת תלת מימד וחיתוך לייזר";

export const HERO = {
  eyebrow: "",
  /** Large display line shown centered over the hero slider. */
  title: "שבירו, ראשון לציון",
  scale: "1:200",
};

/** Full-bleed background image for the מפרט טכני section. */
/**
 * Image lists come from the asset folder, not from this file — see
 * `projectImages`. Add, reorder or reclassify photos by renaming files.
 */
const IMAGES = projectImages("shbiro_rishon_letzion_project");

export const SPEC_BG = IMAGES.bg;

export type SpecRow = {
  label: string;
  value?: string;
  pending?: boolean;
  pendingHint?: string;
};

export const SPECS: SpecRow[] = [
  { label: "שם המודל", value: "מודל אדריכלי — פרויקט שבירו, ראשון לציון" },
  { label: "סוג המודל", value: "מודל עירוני שיווקי למשרד מכירות" },
  { label: "קנה מידה", value: "1:200" },
  {
    label: "שיטות ייצור",
    value: "הדפסת תלת מימד, חיתוך לייזר, הרכבה וגימור בעבודת יד",
  },
  {
    label: "חומרים וגימורים",
    value: "חזיתות בגוון לבן עם פירוט מרפסות, זיגוג שקוף, צביעה בהתזה",
  },
  { label: "תאורה", value: "תאורת LED בכל יחידות הדיור" },
  {
    label: "אלמנטים במודל",
    value:
      "מגדלי מגורים רבים, מערכת כבישים וצמתים, פארק מרכזי, מגרשי ספורט, פיתוח סביבתי מלא (עצים, שבילים, גינון, ריצוף מדומה)",
  },
  { label: "ייעוד", value: "תצוגה במשרד מכירות" },
];

export const GALLERY_ITEMS = IMAGES.gallery;

/** Hero carousel — the IMG_ subset, in numeric order. GAL_ photos are skipped. */
export const HERO_SLIDES = IMAGES.slides;
