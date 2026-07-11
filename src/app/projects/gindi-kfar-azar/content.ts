/**
 * All copy for the Gindi · כפר אז"ר project page, verbatim from the brief PDF.
 * Rows marked `pending` are fields the brief flags as "להשלמה" (David/Nevo to fill).
 */

export const SEO_TITLE_TAG =
  'מודל אדריכלי גינדי כפר אז"ר | קנה מידה 1:100 | פרינט תלת מימד';

export const IMAGE_ALT =
  'מודל אדריכלי בקנה מידה 1:100 של פרויקט מגורים גינדי בכפר אז"ר — הדפסת תלת מימד וחיתוך לייזר';

export const HERO = {
  eyebrow: "מודל אדריכלי · לקוח גינדי",
  title: 'מודל אדריכלי — פרויקט גינדי, כפר אז"ר',
  scale: "1:100",
  src: "/gindi_kfar_azar_project/gindi_hero.webp",
};

/** Design 1 uses a dedicated street-level shot as its full-bleed hero. */
export const DESIGN_ONE_HERO = "/gindi_kfar_azar_project/design_1_hero.webp";

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
  { label: "מידות המודל", pending: true, pendingHint: 'אורך × רוחב בס"מ' },
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
  { label: "משך ייצור", pending: true, pendingHint: "בשבועות" },
];

export const ABOUT = {
  heading: "על הפרויקט",
  client: "גינדי",
  represented: 'פרויקט מגורים בכפר אז"ר',
  pendingHint: 'מס\' יח"ד, שלב שיווק',
};

export const GALLERY_IMAGES = [
  "/gindi_kfar_azar_project/IMG_0943.webp",
  "/gindi_kfar_azar_project/IMG_0944.webp",
  "/gindi_kfar_azar_project/IMG_0945.webp",
  DESIGN_ONE_HERO,
];

/** Design 1 hero cycles through all project photos, starting with the street shot. */
export const DESIGN_ONE_HERO_SLIDES = [
  DESIGN_ONE_HERO,
  HERO.src,
  ...GALLERY_IMAGES.slice(0, 3),
];

/** Design 2 (product-page layout) shows the hero first, then every gallery shot. */
export const ALL_IMAGES = [HERO.src, ...GALLERY_IMAGES];
