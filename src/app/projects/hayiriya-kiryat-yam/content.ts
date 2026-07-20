/**
 * All copy for the הירייה, קרית ים project page.
 * Rows marked `pending` are fields that still need to be filled in.
 */

export const SEO_TITLE_TAG =
  "מודל אדריכלי הירייה קרית ים | קנה מידה 1:100 | פרינט תלת מימד";

export const IMAGE_ALT =
  "מודל אדריכלי בקנה מידה 1:100 של פרויקט המגורים הירייה, קרית ים — הדפסת תלת מימד, תאורת LED וחיתוך לייזר";

export const HERO = {
  eyebrow: "",
  title: "הירייה, קרית ים",
  scale: "1:100",
  src: "/project_pages/hayiriya_kiryat_yam_project/hayiriya_hero.webp",
};

/** Dedicated shot used as the page's full-bleed hero. */
export const FULL_BLEED_HERO =
  "/project_pages/hayiriya_kiryat_yam_project/design_1_hero.webp";

/** Dedicated background image for the מפרט טכני section. */
export const SPEC_BG =
  "/project_pages/hayiriya_kiryat_yam_project/bg_placeholder.webp";

export type SpecRow = {
  label: string;
  value?: string;
  pending?: boolean;
  pendingHint?: string;
};

export const SPECS: SpecRow[] = [
  { label: "שם המודל", value: "מודל אדריכלי — פרויקט הירייה, קרית ים" },
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
      "חזיתות בגווני לבן ואפור עם פירוט מרפסות מלא, זיגוג שקוף, חזיתות מסחר מזוגגות עם פנים מפורט",
  },
  {
    label: "תאורה",
    value: "תאורת LED חמה בכל יחידות הדיור ובקומת המסחר",
  },
  {
    label: "אלמנטים במודל",
    value:
      "מגדלי מגורים מעל קומת מסחר מוארת, כיכר עירונית מרוצפת עם מזרקה, פיתוח סביבתי מלא (עצים, גינון, שבילים), רחוב משה שרת עם מדרכות, מגרשי חניה, כלי רכב ודמויות בקנה מידה",
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
