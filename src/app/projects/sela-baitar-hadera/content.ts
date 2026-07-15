/**
 * All copy for the Sela Baitar · חדרה project page.
 * Spec rows follow the established set; rows marked `pending` still need to be
 * filled in (starting template copied from the Gindi brief).
 */

export const SEO_TITLE_TAG =
  "מודל אדריכלי סלע ביתר חדרה | קנה מידה 1:100 | פרינט תלת מימד";

export const IMAGE_ALT =
  "מודל אדריכלי בקנה מידה 1:100 של פרויקט מגורים סלע ביתר בחדרה — הדפסת תלת מימד וחיתוך לייזר";

export const HERO = {
  eyebrow: "",
  title: "סלע ביתר, חדרה",
  scale: "1:100",
  src: "/project_pages/sela_baitar_hadera_project/sela_hero.webp",
};

/** Dedicated background image for the מפרט טכני section. */
export const SPEC_BG = "/project_pages/sela_baitar_hadera_project/bg_placeholder.webp";

export type SpecRow = {
  label: string;
  value?: string;
  pending?: boolean;
  pendingHint?: string;
};

export const SPECS: SpecRow[] = [
  { label: "שם המודל", value: "מודל אדריכלי — פרויקט סלע ביתר, חדרה" },
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
  { label: "תאורה", value: "תאורת LED בכל יחידות הדיור" },
  {
    label: "אלמנטים במודל",
    value:
      "שני מגדלי מגורים גבוהים, פיתוח סביבתי ותשתית עירונית מלאה (כבישים, מעברי חצייה, שבילים, גינון וריצוף מדומה), בנייני סביבה ומגרשים מדומים",
  },
  { label: "ייעוד", value: "תצוגה במשרד מכירות" },
  { label: "משך ייצור", pending: true, pendingHint: "בשבועות" },
];

export const ABOUT = {
  heading: "על הפרויקט",
  client: "סלע ביתר",
  represented: "פרויקט מגורים בחדרה",
  pendingHint: 'מס\' יח"ד, שלב שיווק',
};

export const GALLERY_IMAGES = [
  "/project_pages/sela_baitar_hadera_project/IMG_01.webp",
  "/project_pages/sela_baitar_hadera_project/IMG_02.webp",
  "/project_pages/sela_baitar_hadera_project/IMG_12.webp",
  "/project_pages/sela_baitar_hadera_project/IMG_14.webp",
  "/project_pages/sela_baitar_hadera_project/IMG_16.webp",
  "/project_pages/sela_baitar_hadera_project/IMG_17.webp",
  "/project_pages/sela_baitar_hadera_project/IMG_19.webp",
  "/project_pages/sela_baitar_hadera_project/IMG_20.webp",
];

/** Hero slider cycles through every project photo, starting with the hero shot. */
export const HERO_SLIDES = [
  HERO.src,
  ...GALLERY_IMAGES.filter((src) => src !== HERO.src),
];
