/**
 * All copy for the צרפתי, ארנונה ירושלים project page.
 * Rows marked `pending` are fields that still need to be filled in.
 *
 * This project has a single supplied photograph, so it serves as the leader,
 * the only carousel slide and the מפרט טכני background alike.
 */

export const SEO_TITLE_TAG =
  "מודל אדריכלי צרפתי ארנונה ירושלים | קנה מידה 1:100 | פרינט תלת מימד";

export const IMAGE_ALT =
  "מודל אדריכלי בקנה מידה 1:100 של פרויקט המגורים צרפתי, ארנונה ירושלים מתחם 10 — הדפסת תלת מימד וחיתוך לייזר";

export const HERO = {
  eyebrow: "",
  title: "צרפתי, ארנונה ירושלים",
  scale: "1:100",
  src: "/project_pages/sarfati_arnona_jerusalem_project/sarfati_hero.webp",
};

/** Dedicated background image for the מפרט טכני section. */
export const SPEC_BG =
  "/project_pages/sarfati_arnona_jerusalem_project/bg_placeholder.webp";

export type SpecRow = {
  label: string;
  value?: string;
  pending?: boolean;
  pendingHint?: string;
};

export const SPECS: SpecRow[] = [
  {
    label: "שם המודל",
    value: "מודל אדריכלי — צרפתי, ארנונה ירושלים מתחם 10",
  },
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
      "חזיתות אבן ירושלמית בגוון שמנת, מרפסות עם מעקי זכוכית, פרגולות עץ וריהוט גן מפורט",
  },
  { label: "תאורה", pending: true, pendingHint: "האם שולבה תאורת LED במודל" },
  {
    label: "אלמנטים במודל",
    value:
      "שישה בנייני מגורים לאורך רחוב, פיתוח סביבתי מלא (עצים, מדשאות, שבילים, גינון), פארק עירוני, כביש עם מדרכות ומגרש חניה, כלי רכב ודמויות בקנה מידה",
  },
  { label: "ייעוד", value: "תצוגה במשרד מכירות" },
  { label: "משך ייצור", pending: true, pendingHint: "בשבועות" },
];

/** Only one photograph was supplied for this project. */
export const GALLERY_IMAGES = [HERO.src];

/** With a single photo there is nothing to cycle — the hero holds one slide. */
export const HERO_SLIDES = [HERO.src];
