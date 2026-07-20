/**
 * All copy for the ויטניה, הר חוצבים project page.
 * Rows marked `pending` are fields that still need to be filled in.
 */

export const SEO_TITLE_TAG =
  "מודל אדריכלי ויטניה הר חוצבים | קנה מידה 1:250 | פרינט תלת מימד";

export const IMAGE_ALT =
  "מודל אדריכלי בקנה מידה 1:250 של מתחם המשרדים ויטניה, הר חוצבים ירושלים — הדפסת תלת מימד וחיתוך לייזר";

export const HERO = {
  eyebrow: "",
  title: "ויטניה, הר חוצבים",
  scale: "1:250",
  src: "/project_pages/vitania_har_hotzvim_project/vitania_hero.webp",
};

/** Dedicated shot used as the page's full-bleed hero. */
export const FULL_BLEED_HERO =
  "/project_pages/vitania_har_hotzvim_project/design_1_hero.webp";

/** Dedicated background image for the מפרט טכני section. */
export const SPEC_BG =
  "/project_pages/vitania_har_hotzvim_project/bg_placeholder.webp";

export type SpecRow = {
  label: string;
  value?: string;
  pending?: boolean;
  pendingHint?: string;
};

export const SPECS: SpecRow[] = [
  { label: "שם המודל", value: "מודל אדריכלי — מתחם ויטניה, הר חוצבים ירושלים" },
  { label: "סוג המודל", value: "מודל אורבני־תכנוני של מתחם משרדים" },
  { label: "קנה מידה", value: "1:250" },
  { label: "מידות המודל", pending: true, pendingHint: 'אורך × רוחב בס"מ' },
  {
    label: "שיטות ייצור",
    value: "הדפסת תלת מימד, חיתוך לייזר, הרכבה וגימור בעבודת יד",
  },
  {
    label: "חומרים וגימורים",
    value:
      "חזיתות מונוכרומטיות בגוון שמנת עם צלעות אנכיות רציפות, זיגוג שקוף בין הצלעות, פיתוח בגווני אדמה ואפור",
  },
  { label: "תאורה", pending: true, pendingHint: "האם שולבה תאורת LED במודל" },
  {
    label: "אלמנטים במודל",
    value:
      "מספר מבני משרדים בגבהים משתנים, פיתוח סביבתי מלא (עצים, שדרות, גינון), מערכת כבישים עם סימוני נתיבים, מעברי חצייה, כלי רכב ומגרשי חניה",
  },
  { label: "ייעוד", value: "תצוגה ותכנון — הצגת המתחם ליזם ולרשויות" },
  { label: "משך ייצור", pending: true, pendingHint: "בשבועות" },
];

export const GALLERY_IMAGES = [
  "/project_pages/vitania_har_hotzvim_project/IMG_01.webp",
  "/project_pages/vitania_har_hotzvim_project/IMG_02.webp",
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
