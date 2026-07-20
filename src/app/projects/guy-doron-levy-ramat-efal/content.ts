/**
 * All copy for the גיא דורון לוי, רמת אפעל project page.
 * Rows marked `pending` are fields that still need to be filled in.
 */

export const SEO_TITLE_TAG =
  "מודל אדריכלי גיא דורון לוי רמת אפעל | קנה מידה 1:75 | פרינט תלת מימד";

export const IMAGE_ALT =
  "מודל אדריכלי בקנה מידה 1:75 של פרויקט המגורים גיא דורון לוי, רמת אפעל — הדפסת תלת מימד וחיתוך לייזר";

export const HERO = {
  eyebrow: "",
  title: "גיא דורון לוי, רמת אפעל",
  scale: "1:75",
  src: "/project_pages/guy_doron_levy_ramat_efal_project/guy_doron_levy_hero.webp",
};

/** Dedicated shot used as the page's full-bleed hero. */
export const FULL_BLEED_HERO =
  "/project_pages/guy_doron_levy_ramat_efal_project/design_1_hero.webp";

/** Dedicated background image for the מפרט טכני section. */
export const SPEC_BG =
  "/project_pages/guy_doron_levy_ramat_efal_project/bg_placeholder.webp";

export type SpecRow = {
  label: string;
  value?: string;
  pending?: boolean;
  pendingHint?: string;
};

export const SPECS: SpecRow[] = [
  { label: "שם המודל", value: "מודל אדריכלי — גיא דורון לוי, רמת אפעל" },
  { label: "סוג המודל", value: "מודל שיווקי למשרד מכירות" },
  { label: "קנה מידה", value: "1:75" },
  { label: "מידות המודל", pending: true, pendingHint: 'אורך × רוחב בס"מ' },
  {
    label: "שיטות ייצור",
    value: "הדפסת תלת מימד, חיתוך לייזר, הרכבה וגימור בעבודת יד",
  },
  {
    label: "חומרים וגימורים",
    value:
      "חזיתות לבנות עם מרפסות רציפות ומעקי זכוכית, זיגוג כהה, גימור בצביעה בהתזה",
  },
  { label: "תאורה", pending: true, pendingHint: "האם שולבה תאורת LED במודל" },
  {
    label: "אלמנטים במודל",
    value:
      "בניין מגורים בן שני אגפים, פארק ציבורי מפותח בצמוד לבניין (עצים, שבילים מתפתלים, מדשאות), בריכה, חצר פנימית, כביש עם מדרכות, מקומות חניה ותאורת רחוב",
  },
  { label: "ייעוד", value: "תצוגה במשרד מכירות" },
  { label: "משך ייצור", pending: true, pendingHint: "בשבועות" },
];

export const GALLERY_IMAGES = [HERO.src, FULL_BLEED_HERO];

/**
 * Hero slider cycles through every project photo. The chosen leader shot
 * (HERO.src) leads the carousel, followed by the full-bleed shot, then the rest.
 */
export const HERO_SLIDES = [
  HERO.src,
  FULL_BLEED_HERO,
  ...GALLERY_IMAGES.filter((src) => src !== HERO.src && src !== FULL_BLEED_HERO),
];
