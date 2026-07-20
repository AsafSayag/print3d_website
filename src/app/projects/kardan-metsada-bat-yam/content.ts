/**
 * All copy for the כרדן, מצדה בת ים project page.
 * Rows marked `pending` are fields that still need to be filled in.
 */

export const SEO_TITLE_TAG =
  "מודל אדריכלי כרדן מצדה בת ים | קנה מידה 1:100 | פרינט תלת מימד";

export const IMAGE_ALT =
  "מודל אדריכלי בקנה מידה 1:100 של פרויקט מגורים כרדן מצדה, בת ים — הדפסת תלת מימד וחיתוך לייזר";

export const HERO = {
  eyebrow: "",
  title: "כרדן, מצדה בת ים",
  scale: "1:100",
  src: "/project_pages/kardan_metsada_bat_yam_project/kardan_hero.webp",
};

/** Dedicated shot used as the page's full-bleed hero. */
export const FULL_BLEED_HERO =
  "/project_pages/kardan_metsada_bat_yam_project/design_1_hero.webp";

/** Dedicated background image for the מפרט טכני section. */
export const SPEC_BG =
  "/project_pages/kardan_metsada_bat_yam_project/bg_placeholder.webp";

export type SpecRow = {
  label: string;
  value?: string;
  pending?: boolean;
  pendingHint?: string;
};

export const SPECS: SpecRow[] = [
  { label: "שם המודל", value: "מודל אדריכלי — פרויקט כרדן, מצדה בת ים" },
  { label: "סוג המודל", value: "מודל שיווקי למשרד מכירות" },
  { label: "קנה מידה", value: "1:100" },
  { label: "מידות המודל", pending: true, pendingHint: 'אורך × רוחב בס"מ' },
  {
    label: "שיטות ייצור",
    value: "הדפסת תלת מימד, חיתוך לייזר, הרכבה וגימור בעבודת יד",
  },
  {
    label: "חומרים וגימורים",
    value: "חזיתות בגווני אפור ולבן עם פירוט מרפסות מלא, זיגוג שקוף, צביעה בהתזה",
  },
  { label: "תאורה", value: "תאורת LED בכל יחידות הדיור ובחזיתות המסחר" },
  {
    label: "אלמנטים במודל",
    value:
      "שני מגדלי מגורים תאומים מעל קומות מסחר מוארות, פיתוח סביבתי מלא (עצים, שדרות, גינון, ריצוף מדומה), רחוב מסחרי עם חזיתות ראווה",
  },
  { label: "ייעוד", value: "תצוגה במשרד מכירות" },
  { label: "משך ייצור", pending: true, pendingHint: "בשבועות" },
];

export const GALLERY_IMAGES = [
  "/project_pages/kardan_metsada_bat_yam_project/IMG_01.webp",
  "/project_pages/kardan_metsada_bat_yam_project/IMG_02.webp",
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
