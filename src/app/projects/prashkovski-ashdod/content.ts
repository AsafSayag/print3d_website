/**
 * All copy for the פרשקובסקי, אשדוד project page.
 * Rows marked `pending` are fields that still need to be filled in.
 */

export const SEO_TITLE_TAG =
  "מודל אדריכלי פרשקובסקי אשדוד | קנה מידה 1:100 | פרינט תלת מימד";

export const IMAGE_ALT =
  "מודל אדריכלי בקנה מידה 1:100 של פרויקט המגורים פרשקובסקי, אשדוד — הדפסת תלת מימד, תאורת LED וחיתוך לייזר";

export const HERO = {
  eyebrow: "",
  title: "פרשקובסקי, אשדוד",
  scale: "1:100",
  src: "/project_pages/prashkovski_ashdod_project/prashkovski_hero.webp",
};

/** Dedicated shot used as the page's full-bleed hero. */
export const FULL_BLEED_HERO =
  "/project_pages/prashkovski_ashdod_project/design_1_hero.webp";

/** Dedicated background image for the מפרט טכני section. */
export const SPEC_BG =
  "/project_pages/prashkovski_ashdod_project/bg_placeholder.webp";

export type SpecRow = {
  label: string;
  value?: string;
  pending?: boolean;
  pendingHint?: string;
};

export const SPECS: SpecRow[] = [
  { label: "שם המודל", value: "מודל אדריכלי — פרויקט פרשקובסקי, אשדוד" },
  { label: "סוג המודל", value: "מודל שיווקי למשרד מכירות" },
  { label: "קנה מידה", value: "1:100" },
  { label: "מידות המודל", pending: true, pendingHint: 'אורך × רוחב בס"מ' },
  {
    label: "שיטות ייצור",
    value: "הדפסת תלת מימד, חיתוך לייזר, הרכבה וגימור בעבודת יד",
  },
  {
    label: "חומרים וגימורים",
    value:
      "חזיתות בגווני שמנת ואפור כהה עם חיפוי אבן מדומה, מרפסות עם מעקי מתכת, זיגוג שקוף, פרגולות גג",
  },
  {
    label: "תאורה",
    value: "תאורת LED חמה בכל יחידות הדיור ובלובי הכניסה",
  },
  {
    label: "אלמנטים במודל",
    value:
      "ארבעה מגדלי מגורים סביב חצר משותפת, פיתוח סביבתי מלא (דקלים, עצים, גינון, שבילים מרוצפים), מתקני משחק וגני שעשועים, כבישים עם סימוני נתיבים, מגרשי חניה, כלי רכב ודמויות בקנה מידה",
  },
  { label: "ייעוד", value: "תצוגה במשרד מכירות" },
  { label: "משך ייצור", pending: true, pendingHint: "בשבועות" },
];

export const GALLERY_IMAGES = [
  "/project_pages/prashkovski_ashdod_project/IMG_01.webp",
  "/project_pages/prashkovski_ashdod_project/IMG_02.webp",
  HERO.src,
  FULL_BLEED_HERO,
];

/**
 * Hero slider cycles through every project photo. The chosen leader shot
 * (HERO.src) leads the carousel, followed by the full-bleed shot, then the rest.
 */
export const HERO_SLIDES = [
  HERO.src,
  FULL_BLEED_HERO,
  ...GALLERY_IMAGES.filter((src) => src !== HERO.src && src !== FULL_BLEED_HERO),
];
