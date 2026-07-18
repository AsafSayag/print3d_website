/**
 * All copy for the בוני בניין, ההגנה project page.
 * Rows marked `pending` are fields that still need to be filled in.
 */

export const SEO_TITLE_TAG =
  "מודל אדריכלי בוני בניין, ההגנה | קנה מידה 1:100 | פרינט תלת מימד";

export const IMAGE_ALT =
  "מודל אדריכלי בקנה מידה 1:100 של פרויקט בוני בניין, ההגנה רעננה — הדפסת תלת מימד וחיתוך לייזר";

export const HERO = {
  eyebrow: "",
  title: "בוני בניין, ההגנה",
  scale: "1:100",
  src: "/project_pages/bonei_binyan_hahagana_raanana_project/bonei_binyan_hero.webp",
};

export const FULL_BLEED_HERO =
  "/project_pages/bonei_binyan_hahagana_raanana_project/design_1_hero.webp";

/** Dedicated background image for the מפרט טכני section. */
export const SPEC_BG =
  "/project_pages/bonei_binyan_hahagana_raanana_project/bg_placeholder.webp";

export type SpecRow = {
  label: string;
  value?: string;
  pending?: boolean;
  pendingHint?: string;
};

export const SPECS: SpecRow[] = [
  { label: "שם המודל", value: "מודל אדריכלי — פרויקט בוני בניין, ההגנה" },
  { label: "סוג המודל", pending: true, pendingHint: "שיווקי / עירוני / אחר" },
  { label: "קנה מידה", value: "1:100" },
  { label: "מידות המודל", pending: true, pendingHint: 'אורך × רוחב בס"מ' },
  { label: "שיטות ייצור", pending: true, pendingHint: "הדפסה, חיתוך לייזר וכו׳" },
  { label: "חומרים וגימורים", pending: true, pendingHint: "חזיתות, זיגוג, צביעה" },
  { label: "תאורה", pending: true, pendingHint: "יש/אין LED, ופירוט אם יש" },
  { label: "אלמנטים במודל", pending: true, pendingHint: "פיתוח סביבתי, גינון וכו׳" },
  { label: "ייעוד", pending: true, pendingHint: "תצוגה במשרד מכירות וכו׳" },
  { label: "משך ייצור", pending: true, pendingHint: "בשבועות" },
];

export const GALLERY_IMAGES = [
  "/project_pages/bonei_binyan_hahagana_raanana_project/IMG_01.webp",
  "/project_pages/bonei_binyan_hahagana_raanana_project/IMG_02.webp",
  "/project_pages/bonei_binyan_hahagana_raanana_project/IMG_03.webp",
  "/project_pages/bonei_binyan_hahagana_raanana_project/IMG_04.webp",
  "/project_pages/bonei_binyan_hahagana_raanana_project/IMG_05.webp",
  "/project_pages/bonei_binyan_hahagana_raanana_project/IMG_06.webp",
  "/project_pages/bonei_binyan_hahagana_raanana_project/IMG_07.webp",
  "/project_pages/bonei_binyan_hahagana_raanana_project/IMG_08.webp",
  "/project_pages/bonei_binyan_hahagana_raanana_project/IMG_09.webp",
  "/project_pages/bonei_binyan_hahagana_raanana_project/IMG_10.webp",
  "/project_pages/bonei_binyan_hahagana_raanana_project/IMG_11.webp",
  "/project_pages/bonei_binyan_hahagana_raanana_project/IMG_12.webp",
  "/project_pages/bonei_binyan_hahagana_raanana_project/IMG_13.webp",
  "/project_pages/bonei_binyan_hahagana_raanana_project/IMG_14.webp",
  "/project_pages/bonei_binyan_hahagana_raanana_project/IMG_15.webp",
  HERO.src,
  FULL_BLEED_HERO,
];

export const HERO_SLIDES = [
  FULL_BLEED_HERO,
  HERO.src,
  ...GALLERY_IMAGES.filter((src) => src !== FULL_BLEED_HERO && src !== HERO.src),
];
