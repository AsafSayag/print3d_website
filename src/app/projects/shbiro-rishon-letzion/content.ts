/**
 * All copy for the שבירו · ראשון לציון project page.
 *
 * This page uses a bespoke, editorial layout (Yodezeen-style) rather than the
 * shared hero-slider layout — so there is no `HERO_SLIDES` and no `ABOUT`
 * accordion here. Rows marked `pending` still need real values.
 */

export const SEO_TITLE_TAG =
  "מודל אדריכלי שבירו ראשון לציון | קנה מידה 1:200 | פרינט תלת מימד";

export const IMAGE_ALT =
  "מודל אדריכלי עירוני בקנה מידה 1:200 של פרויקט המגורים שבירו בראשון לציון — הדפסת תלת מימד וחיתוך לייזר";

export const HERO = {
  eyebrow: "",
  /** Large display line shown centered over the hero slider. */
  title: "שבירו, ראשון לציון",
  scale: "1:200",
  src: "/shbiro_rishon_letzion_project/shbiro_hero.webp",
};

/** Full-bleed background image for the מפרט טכני section. */
export const SPEC_BG = "/shbiro_rishon_letzion_project/bg_placeholder.webp";

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
  { label: "מידות המודל", pending: true, pendingHint: 'אורך × רוחב בס"מ' },
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
  { label: "משך ייצור", pending: true, pendingHint: "בשבועות" },
];

export const GALLERY_IMAGES = [
  "/shbiro_rishon_letzion_project/IMG_04.webp",
  "/shbiro_rishon_letzion_project/IMG_05.webp",
  "/shbiro_rishon_letzion_project/IMG_06.webp",
  "/shbiro_rishon_letzion_project/IMG_07.webp",
  "/shbiro_rishon_letzion_project/IMG_08.webp",
  "/shbiro_rishon_letzion_project/IMG_09.webp",
  "/shbiro_rishon_letzion_project/IMG_10.webp",
];

/** Hero slider cycles through every project photo, starting with the hero shot. */
export const HERO_SLIDES = [
  HERO.src,
  ...GALLERY_IMAGES.filter((src) => src !== HERO.src),
];
