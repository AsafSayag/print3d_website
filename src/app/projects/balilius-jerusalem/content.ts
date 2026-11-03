/** Project copy and image references for בליליוס, ירושלים. Server-only. */
import { projectImages } from "@/lib/projectImages";

export const SEO_TITLE_TAG =
  "מודל אדריכלי בליליוס ירושלים | קנה מידה 1:150 | פרינט תלת מימד";

export const IMAGE_ALT =
  "מודל אדריכלי בקנה מידה 1:150 של פרויקט בליליוס בירושלים, עם מגדלי מגורים, חצר מרכזית מגוננת ופיתוח רחוב";

export const META_DESCRIPTION =
  "מודל אדריכלי בקנה מידה 1:150 של בליליוס בירושלים: שבעה מגדלי מגורים עם מרפסות מגוננות, חצר עם דקלים ונפחי בינוי מאקריליק שקוף. מוצג בוויטרינה במשרד המכירות.";

export const HERO = {
  eyebrow: "",
  title: "בליליוס, ירושלים",
  scale: "1:150",
};

const IMAGES = projectImages("balilius_jerusalem_project");

export const SPEC_BG = IMAGES.bg;

export type SpecRow = {
  label: string;
  value?: string;
  pending?: boolean;
  pendingHint?: string;
};

export const SPECS: SpecRow[] = [
  { label: "שם המודל", value: "מודל אדריכלי — בליליוס, ירושלים" },
  { label: "קנה מידה", value: "1:150" },
  {
    label: "שיטות ייצור",
    value: "הדפסת תלת מימד, חיתוך לייזר, הרכבה וגימור בעבודת יד",
  },
  { label: "תאורה", pending: true },
  {
    label: "אלמנטים במודל",
    value:
      "שבעה מגדלי מגורים בחזית לבנה עם מסגרות אפורות ומרפסות בגוון עץ עם עציצים ופרחים, מבנה לבן נמוך במרכז המתחם, חצר מרכזית עם דקלים, שבילים בדוגמה גאומטרית ורחבה מרוצפת, נפחי בינוי מאקריליק שקוף, כיכר תנועה עם אי דשא, ירידה לחניון תת־קרקעי, עצים, כלי רכב ודמויות בקנה מידה",
  },
  { label: "ייעוד", value: "תצוגה בוויטרינה במשרד מכירות" },
];

export const GALLERY_ITEMS = IMAGES.gallery;
export const HERO_SLIDES = IMAGES.slides;
