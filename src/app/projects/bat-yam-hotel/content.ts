/**
 * All copy for the מלון בת ים project page.
 * Rows marked `pending` are fields that still need to be filled in.
 */

export const SEO_TITLE_TAG =
  "מודל אדריכלי מלון בת ים | קנה מידה 1:125 | פרינט תלת מימד";

export const IMAGE_ALT =
  "מודל אדריכלי בקנה מידה 1:125 של מגדל מלון על קו החוף בבת ים — הדפסת תלת מימד וחיתוך לייזר";

export const HERO = {
  eyebrow: "",
  title: "מלון בת ים",
  scale: "1:125",
  src: "/project_pages/bat_yam_hotel_project/bat_yam_hotel_hero.webp",
};

/** Dedicated shot used as the page's full-bleed hero. */
export const FULL_BLEED_HERO =
  "/project_pages/bat_yam_hotel_project/design_1_hero.webp";

/** Dedicated background image for the מפרט טכני section. */
export const SPEC_BG =
  "/project_pages/bat_yam_hotel_project/bg_placeholder.webp";

export type SpecRow = {
  label: string;
  value?: string;
  pending?: boolean;
  pendingHint?: string;
};

export const SPECS: SpecRow[] = [
  { label: "שם המודל", value: "מודל אדריכלי — מלון בת ים" },
  { label: "סוג המודל", value: "מודל שיווקי ותכנוני של מגדל מלונאות" },
  { label: "קנה מידה", value: "1:125" },
  { label: "מידות המודל", pending: true, pendingHint: 'אורך × רוחב בס"מ' },
  {
    label: "שיטות ייצור",
    value: "הדפסת תלת מימד, חיתוך לייזר, הרכבה וגימור בעבודת יד",
  },
  {
    label: "חומרים וגימורים",
    value:
      "מגדל בגימור אקרילי שקוף עם רשת מרפסות לבנה, בסיס בגוון שמנת, חול וים בעבודת יד על משטח אקרילי",
  },
  { label: "תאורה", pending: true, pendingHint: "האם שולבה תאורת LED במודל" },
  {
    label: "אלמנטים במודל",
    value:
      "מגדל מלון גבוה מעל מפלס לובי ובריכות, קו החוף המלא עם חול, ים, שמשיות ומיטות שיזוף, דקלים, מרפסת נוף, כביש ראשי עם כלי רכב ודמויות בקנה מידה",
  },
  { label: "ייעוד", value: "תצוגה ותכנון — הצגת הפרויקט ליזם ולרשויות" },
  { label: "משך ייצור", pending: true, pendingHint: "בשבועות" },
];

export const GALLERY_IMAGES = [
  "/project_pages/bat_yam_hotel_project/IMG_01.webp",
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
