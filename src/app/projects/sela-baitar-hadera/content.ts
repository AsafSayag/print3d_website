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
  src: "/sela_baitar_hadera_project/sela_hero.webp",
};

/** Dedicated wide masterplan shot used as the page's full-bleed hero. */
export const FULL_BLEED_HERO = "/sela_baitar_hadera_project/design_1_hero.webp";

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
  "/sela_baitar_hadera_project/IMG_01.webp",
  "/sela_baitar_hadera_project/IMG_02.webp",
  "/sela_baitar_hadera_project/IMG_03.webp",
  "/sela_baitar_hadera_project/IMG_04.webp",
  "/sela_baitar_hadera_project/IMG_05.webp",
  "/sela_baitar_hadera_project/IMG_06.webp",
  "/sela_baitar_hadera_project/IMG_07.webp",
  "/sela_baitar_hadera_project/IMG_08.webp",
  "/sela_baitar_hadera_project/IMG_09.webp",
  "/sela_baitar_hadera_project/IMG_10.webp",
  "/sela_baitar_hadera_project/IMG_11.webp",
  "/sela_baitar_hadera_project/IMG_12.webp",
  "/sela_baitar_hadera_project/IMG_13.webp",
  "/sela_baitar_hadera_project/IMG_14.webp",
  "/sela_baitar_hadera_project/IMG_15.webp",
  "/sela_baitar_hadera_project/IMG_16.webp",
  "/sela_baitar_hadera_project/IMG_17.webp",
  "/sela_baitar_hadera_project/IMG_18.webp",
  "/sela_baitar_hadera_project/IMG_19.webp",
  "/sela_baitar_hadera_project/IMG_20.webp",
  "/sela_baitar_hadera_project/IMG_21.webp",
  "/sela_baitar_hadera_project/IMG_22.webp",
  "/sela_baitar_hadera_project/IMG_23.webp",
  "/sela_baitar_hadera_project/IMG_24.webp",
  "/sela_baitar_hadera_project/IMG_25.webp",
  HERO.src,
  FULL_BLEED_HERO,
];

/** Hero slider cycles through every project photo, starting with the full-bleed shot. */
export const HERO_SLIDES = [
  FULL_BLEED_HERO,
  HERO.src,
  ...GALLERY_IMAGES.filter((src) => src !== FULL_BLEED_HERO && src !== HERO.src),
];
