/**
 * All copy for the Tidhar · דפנה project page.
 * Rows marked `pending` are fields that still need to be filled in.
 */

export const SEO_TITLE_TAG =
  "מודל אדריכלי תדהר דפנה | קנה מידה 1:100 | פרינט תלת מימד";

export const IMAGE_ALT =
  "מודל אדריכלי בקנה מידה 1:100 של פרויקט מגורים תדהר דפנה — הדפסת תלת מימד וחיתוך לייזר";

export const HERO = {
  eyebrow: "",
  title: "תדהר, דפנה",
  scale: "1:100",
  src: "/dafna_tidhar_project/dafna_hero.webp",
};

/** Dedicated shot used as the page's full-bleed hero. */
export const FULL_BLEED_HERO = "/dafna_tidhar_project/design_1_hero.webp";

export type SpecRow = {
  label: string;
  value?: string;
  pending?: boolean;
  pendingHint?: string;
};

export const SPECS: SpecRow[] = [
  { label: "שם המודל", value: "מודל אדריכלי — פרויקט תדהר, דפנה" },
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
      "מגדל מגורים גבוה ובניין נמוך צמוד, פיתוח סביבתי מלא (עצים, שבילים, גינון, ריצוף מדומה), חצר פנימית מפורטת",
  },
  { label: "ייעוד", value: "תצוגה במשרד מכירות" },
  { label: "משך ייצור", pending: true, pendingHint: "בשבועות" },
];

export const ABOUT = {
  heading: "על הפרויקט",
  client: "תדהר",
  represented: "פרויקט מגורים דפנה",
  pendingHint: 'מס\' יח"ד, שלב שיווק',
};

export const GALLERY_IMAGES = [
  "/dafna_tidhar_project/IMG_01.webp",
  "/dafna_tidhar_project/IMG_03.webp",
  "/dafna_tidhar_project/IMG_04.webp",
  "/dafna_tidhar_project/IMG_08.webp",
  "/dafna_tidhar_project/IMG_09.webp",
  "/dafna_tidhar_project/IMG_10.webp",
  "/dafna_tidhar_project/IMG_11.webp",
  "/dafna_tidhar_project/IMG_12.webp",
  HERO.src,
  FULL_BLEED_HERO,
];

/** Hero slider cycles through every project photo, starting with the full-bleed shot. */
export const HERO_SLIDES = [
  FULL_BLEED_HERO,
  HERO.src,
  ...GALLERY_IMAGES.filter((src) => src !== FULL_BLEED_HERO && src !== HERO.src),
];
