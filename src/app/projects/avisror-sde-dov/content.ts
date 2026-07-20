/**
 * All copy for the אביסרור, שדה דב project page.
 * Rows marked `pending` are fields that still need to be filled in.
 */

export const SEO_TITLE_TAG =
  "מודל אדריכלי אביסרור שדה דב | קנה מידה 1:100 | פרינט תלת מימד";

export const IMAGE_ALT =
  "מודל אדריכלי בקנה מידה 1:100 של פרויקט מגורים אביסרור שדה דב — הדפסת תלת מימד וחיתוך לייזר";

export const HERO = {
  eyebrow: "",
  title: "אביסרור, שדה דב",
  scale: "1:100",
  src: "/project_pages/avisror_sde_dov_project/avisror_hero.webp",
};

/** Dedicated shot used as the page's full-bleed hero. */
export const FULL_BLEED_HERO =
  "/project_pages/avisror_sde_dov_project/design_1_hero.webp";

/** Dedicated background image for the מפרט טכני section. */
export const SPEC_BG = "/project_pages/avisror_sde_dov_project/bg_placeholder.webp";

export type SpecRow = {
  label: string;
  value?: string;
  pending?: boolean;
  pendingHint?: string;
};

export const SPECS: SpecRow[] = [
  { label: "שם המודל", value: "מודל אדריכלי — פרויקט אביסרור, שדה דב" },
  { label: "סוג המודל", value: "מודל שיווקי למשרד מכירות" },
  { label: "קנה מידה", value: "1:100" },
  { label: "מידות המודל", pending: true, pendingHint: 'אורך × רוחב בס"מ' },
  {
    label: "שיטות ייצור",
    value: "הדפסת תלת מימד, חיתוך לייזר, הרכבה וגימור בעבודת יד",
  },
  {
    label: "חומרים וגימורים",
    value: "חזיתות לבנות עם פירוט מרפסות מלא, זיגוג שקוף, צביעה בהתזה",
  },
  { label: "תאורה", value: "תאורת LED בכל יחידות הדיור ובקומות המסחר" },
  {
    label: "אלמנטים במודל",
    value:
      "מגדל מגורים גבוה ובנייני בוטיק צמודים, קומת מסחר מוארת, מועדון דיירים עם בריכה וחדר כושר, פיתוח סביבתי מלא (עצים, שבילים, גינון, ריצוף מדומה)",
  },
  { label: "ייעוד", value: "תצוגה במשרד מכירות" },
  { label: "משך ייצור", pending: true, pendingHint: "בשבועות" },
];

export const GALLERY_IMAGES = [
  "/project_pages/avisror_sde_dov_project/IMG_01.webp",
  "/project_pages/avisror_sde_dov_project/IMG_02.webp",
  "/project_pages/avisror_sde_dov_project/IMG_03.webp",
  "/project_pages/avisror_sde_dov_project/IMG_04.webp",
  "/project_pages/avisror_sde_dov_project/IMG_05.webp",
  "/project_pages/avisror_sde_dov_project/IMG_06.webp",
  HERO.src,
  FULL_BLEED_HERO,
];

/**
 * Hero slider cycles through every project photo. The labeled `hero.jpg`
 * (HERO.src) leads the carousel, followed by the full-bleed shot, then the rest.
 */
export const HERO_SLIDES = [
  HERO.src,
  FULL_BLEED_HERO,
  ...GALLERY_IMAGES.filter((src) => src !== HERO.src && src !== FULL_BLEED_HERO),
];
