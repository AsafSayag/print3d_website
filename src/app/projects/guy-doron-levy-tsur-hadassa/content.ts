/**
 * All copy for the גיא דורון לוי, צור הדסה project page.
 * Rows marked `pending` are fields that still need to be filled in.
 */

export const SEO_TITLE_TAG =
  "מודל אדריכלי גיא דורון לוי צור הדסה | קנה מידה 1:100 | פרינט תלת מימד";

export const IMAGE_ALT =
  "מודל אדריכלי בקנה מידה 1:100 של פרויקט המגורים גיא דורון לוי, צור הדסה — הדפסת תלת מימד וחיתוך לייזר";

export const HERO = {
  eyebrow: "",
  title: "גיא דורון לוי, צור הדסה",
  scale: "1:100",
  src: "/project_pages/guy_doron_levy_tsur_hadassa_project/guy_doron_levy_hero.webp",
};

/** Dedicated background image for the מפרט טכני section. */
export const SPEC_BG =
  "/project_pages/guy_doron_levy_tsur_hadassa_project/bg_placeholder.webp";

export type SpecRow = {
  label: string;
  value?: string;
  pending?: boolean;
  pendingHint?: string;
};

export const SPECS: SpecRow[] = [
  { label: "שם המודל", value: "מודל אדריכלי — גיא דורון לוי, צור הדסה" },
  { label: "סוג המודל", value: "מודל שיווקי למשרד מכירות" },
  { label: "קנה מידה", value: "1:100" },
  { label: "מידות המודל", pending: true, pendingHint: 'אורך × רוחב בס"מ' },
  {
    label: "שיטות ייצור",
    value: "הדפסת תלת מימד, חיתוך לייזר, הרכבה וגימור בעבודת יד",
  },
  {
    label: "חומרים וגימורים",
    value: "חזיתות בגוון לבן עם פירוט מרפסות, זיגוג שקוף, צביעה בהתזה",
  },
  { label: "תאורה", pending: true, pendingHint: "יש/אין LED, ופירוט אם יש" },
  {
    label: "אלמנטים במודל",
    value:
      "שני מגרשי מגורים סמוכים (X2 מגרשים), פיתוח סביבתי מלא (עצים, שבילים, גינון, ריצוף מדומה)",
  },
  { label: "ייעוד", value: "תצוגה במשרד מכירות" },
  { label: "משך ייצור", pending: true, pendingHint: "בשבועות" },
];

export const ABOUT = {
  heading: "על הפרויקט",
  client: "גיא דורון לוי",
  represented: "פרויקט מגורים, צור הדסה",
  pendingHint: 'מס\' יח"ד, שלב שיווק',
};

export const GALLERY_IMAGES = [
  "/project_pages/guy_doron_levy_tsur_hadassa_project/IMG_01.webp",
  "/project_pages/guy_doron_levy_tsur_hadassa_project/IMG_02.webp",
  "/project_pages/guy_doron_levy_tsur_hadassa_project/IMG_03.webp",
];

/** Hero slider cycles through every project photo, starting with the hero shot. */
export const HERO_SLIDES = [HERO.src, ...GALLERY_IMAGES];
