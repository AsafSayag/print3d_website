/** Project copy and image references for צרפתי, ארנונה מגרש 12. Server-only. */
import { projectImages } from "@/lib/projectImages";

export const SEO_TITLE_TAG =
  "מודל אדריכלי צרפתי ארנונה מגרש 12 | קנה מידה 1:100 | פרינט תלת מימד";

export const IMAGE_ALT =
  "מודל אדריכלי בקנה מידה 1:100 של פרויקט צרפתי, ארנונה מגרש 12 בירושלים, עם שלושה מגדלי מגורים מוארים ופיתוח נופי";

export const META_DESCRIPTION =
  "מודל אדריכלי בקנה מידה 1:100 של צרפתי, ארנונה מגרש 12 בירושלים: שלושה מגדלי מגורים עם תאורת LED חמה, מרפסות גג מדורגות וגן משחקים. נבנה לתצוגה במשרד המכירות.";

export const HERO = {
  eyebrow: "",
  title: "צרפתי, ארנונה מגרש 12",
  scale: "1:100",
};

const IMAGES = projectImages("sarfati_arnona_migrash_12_project");

export const SPEC_BG = IMAGES.bg;

export type SpecRow = {
  label: string;
  value?: string;
  pending?: boolean;
  pendingHint?: string;
};

export const SPECS: SpecRow[] = [
  { label: "שם המודל", value: "מודל אדריכלי — צרפתי, ארנונה ירושלים מגרש 12" },
  { label: "קנה מידה", value: "1:100" },
  {
    label: "שיטות ייצור",
    value: "הדפסת תלת מימד, חיתוך לייזר, הרכבה וגימור בעבודת יד",
  },
  {
    label: "תאורה",
    value: "תאורת LED חמה בכל יחידות הדיור, בלובי הכניסה ובעמודי תאורת הרחוב",
  },
  {
    label: "אלמנטים במודל",
    value:
      "שלושה מגדלי מגורים בחיפוי אבן בהיר עם מעקות ופרגולות בגוון חום כהה ומרפסות גג מדורגות, גן משחקים עם משטח צהוב, מדרון מדשאה עם שביל הולכי רגל, קירות תמך בחיפוי אבן וגינות מדורגות, עצי הדר, כביש עם עמודי תאורה, כלי רכב ודמויות בקנה מידה",
  },
  { label: "ייעוד", value: "תצוגה במשרד מכירות" },
];

export const GALLERY_ITEMS = IMAGES.gallery;
export const HERO_SLIDES = IMAGES.slides;
