/**
 * All copy for the אשדר, תג'ור project page.
 * Rows marked `pending` are fields that still need to be filled in.
 */

export const SEO_TITLE_TAG =
  "מודל אדריכלי אשדר תג'ור | קנה מידה 1:100 | פרינט תלת מימד";

export const IMAGE_ALT =
  "מודל אדריכלי בקנה מידה 1:100 של פרויקט המגורים אשדר, תג'ור — הדפסת תלת מימד, תאורת LED וחיתוך לייזר";

export const HERO = {
  eyebrow: "",
  title: "אשדר, תג'ור",
  scale: "1:100",
  src: "/project_pages/ashdar_tagor_project/ashdar_hero.webp",
};

/** Dedicated shot used as the page's full-bleed hero. */
export const FULL_BLEED_HERO =
  "/project_pages/ashdar_tagor_project/design_1_hero.webp";

/** Dedicated background image for the מפרט טכני section. */
export const SPEC_BG = "/project_pages/ashdar_tagor_project/bg_placeholder.webp";

export type SpecRow = {
  label: string;
  value?: string;
  pending?: boolean;
  pendingHint?: string;
};

export const SPECS: SpecRow[] = [
  { label: "שם המודל", value: "מודל אדריכלי — פרויקט אשדר, תג'ור" },
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
      "חזיתות בגווני לבן ואפור עם מרפסות פתוחות ופרגולות, זיגוג שקוף, ריהוט מרפסות וגגות מפורט",
  },
  {
    label: "תאורה",
    value: "תאורת LED חמה בכל יחידות הדיור, במרפסות ובגגות",
  },
  {
    label: "אלמנטים במודל",
    value:
      "מגדל מגורים גבוה לצד שני בנייני מגורים נמוכים, פיתוח סביבתי מלא (מדשאות, עצים, שבילים מרוצפים), חצר משותפת, ריהוט גג וגן, כביש ומדרכות עם תאורת רחוב",
  },
  { label: "ייעוד", value: "תצוגה במשרד מכירות" },
  { label: "משך ייצור", pending: true, pendingHint: "בשבועות" },
];

export const GALLERY_IMAGES = [
  "/project_pages/ashdar_tagor_project/IMG_01.webp",
  "/project_pages/ashdar_tagor_project/IMG_02.webp",
  "/project_pages/ashdar_tagor_project/IMG_03.webp",
  "/project_pages/ashdar_tagor_project/IMG_04.webp",
  "/project_pages/ashdar_tagor_project/IMG_05.webp",
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
