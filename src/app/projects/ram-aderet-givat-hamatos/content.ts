/**
 * All copy for the רם אדרת, גבעת המטוס project page.
 * Rows marked `pending` are fields that still need to be filled in.
 */

export const SEO_TITLE_TAG =
  "מודל אדריכלי רם אדרת גבעת המטוס | קנה מידה 1:200 | פרינט תלת מימד";

export const IMAGE_ALT =
  "מודל אדריכלי אורבני בקנה מידה 1:200 של פרויקט רם אדרת, גבעת המטוס — מגדלי מגורים מוארים, מערך כבישים ופיתוח נוף";

export const HERO = {
  eyebrow: "",
  title: "רם אדרת, גבעת המטוס",
  scale: "1:200",
  src: "/project_pages/ram_aderet_givat_hamatos_project/ram_aderet_hero.webp",
};

/** Dedicated shot used as the page's full-bleed hero. */
export const FULL_BLEED_HERO =
  "/project_pages/ram_aderet_givat_hamatos_project/design_1_hero.webp";

/** Dedicated background image for the מפרט טכני section. */
export const SPEC_BG =
  "/project_pages/ram_aderet_givat_hamatos_project/bg_placeholder.webp";

export type SpecRow = {
  label: string;
  value?: string;
  pending?: boolean;
  pendingHint?: string;
};

export const SPECS: SpecRow[] = [
  { label: "שם המודל", value: "מודל אדריכלי — פרויקט רם אדרת, גבעת המטוס" },
  { label: "סוג המודל", value: "מודל אורבני שיווקי למשרד מכירות" },
  { label: "קנה מידה", value: "1:200" },
  { label: "מידות המודל", pending: true, pendingHint: 'אורך × רוחב בס"מ' },
  {
    label: "שיטות ייצור",
    value: "הדפסת תלת מימד, חיתוך לייזר, הרכבה וגימור בעבודת יד",
  },
  {
    label: "חומרים וגימורים",
    value:
      "בנייני המגורים מפורטים בגווני לבן ואפור עם מרפסות וזיגוג, סביבתם נפחי מסה לבנים המייצגים את התוכנית העירונית, כבישי אספלט מסומנים, מדרכות משתלבות וגינון צבעוני",
  },
  {
    label: "תאורה",
    value: "תאורת LED חמה בכל יחידות הדיור ובעמודי תאורת הרחוב",
  },
  {
    label: "אלמנטים במודל",
    value:
      "אשכולות מגדלי מגורים מוארים, מערך כבישים מלא עם כיכרות, מעברי חצייה ועמודי תאורה, פארק שכונתי עם גני משחקים ובריכות נוי, שדרות עצים וגינון, כלי רכב ודמויות בקנה מידה",
  },
  { label: "ייעוד", value: "תצוגה במשרד מכירות" },
  { label: "משך ייצור", pending: true, pendingHint: "בשבועות" },
];

export const GALLERY_IMAGES = [
  "/project_pages/ram_aderet_givat_hamatos_project/IMG_01.webp",
  "/project_pages/ram_aderet_givat_hamatos_project/IMG_02.webp",
  "/project_pages/ram_aderet_givat_hamatos_project/IMG_03.webp",
  "/project_pages/ram_aderet_givat_hamatos_project/IMG_04.webp",
  "/project_pages/ram_aderet_givat_hamatos_project/IMG_05.webp",
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
