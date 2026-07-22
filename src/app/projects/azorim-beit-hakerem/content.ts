/**
 * All copy for the אזורים, בית הכרם project page.
 * Rows marked `pending` are fields that still need to be filled in.
 *
 * Server-only: `projectImages` reads the filesystem, so never import this
 * module from a "use client" file — pass the image arrays down as props.
 */
import { projectImages } from "@/lib/projectImages";

export const SEO_TITLE_TAG =
  "מודל אדריכלי אזורים בית הכרם | קנה מידה 1:200 | פרינט תלת מימד";

export const IMAGE_ALT =
  "מודל אדריכלי בקנה מידה 1:200 של פרויקט המגורים אזורים, בית הכרם — הדפסת תלת מימד וחיתוך לייזר";

export const HERO = {
  eyebrow: "",
  title: "אזורים, בית הכרם",
  scale: "1:200",
};

/** Dedicated background image for the מפרט טכני section. */
/**
 * Image lists come from the asset folder, not from this file — see
 * `projectImages`. Add, reorder or reclassify photos by renaming files.
 */
const IMAGES = projectImages("azorim_beit_hakerem_project");

export const SPEC_BG = IMAGES.bg;

export type SpecRow = {
  label: string;
  value?: string;
  pending?: boolean;
  pendingHint?: string;
};

export const SPECS: SpecRow[] = [
  { label: "שם המודל", value: "מודל אדריכלי — פרויקט אזורים, בית הכרם" },
  { label: "סוג המודל", value: "מודל שיווקי למשרד מכירות" },
  { label: "קנה מידה", value: "1:200" },
  {
    label: "שיטות ייצור",
    value: "הדפסת תלת מימד, חיתוך לייזר, הרכבה וגימור בעבודת יד",
  },
  {
    label: "חומרים וגימורים",
    value:
      "מגדל בגוון לבן אחיד עם רשת מרפסות ומסגרת אדריכלית בגגו, זיגוג שקוף וצביעה בהתזה, קירות תמך מאבן טבעית בפיתוח, בסיס תצוגה שחור עם כיסוי אקרילי שקוף",
  },
  {
    label: "תאורה",
    value: "תאורת LED חמה בכל יחידות הדיור, בקומות הבסיס ובעמודי תאורת הפיתוח",
  },
  {
    label: "אלמנטים במודל",
    value:
      "מגדל מגורים גבוה מעל קומות בסיס מזוגגות, פארק מדורג עם טרסות אבן, מדרגות נוף ופינות ישיבה, גינון בוגר וצמחייה פורחת, ציר תנועה ראשי עם שביל אופניים מסומן, מעברי חצייה, תאורת רחוב וכלי רכב בקנה מידה, שלט מפרט הפרויקט על הבסיס",
  },
  { label: "ייעוד", value: "תצוגה במשרד מכירות" },
];

export const ABOUT = {
  heading: "על הפרויקט",
  client: "אזורים",
  represented: "פרויקט מגורים, בית הכרם",
  pendingHint: 'מס\' יח"ד, שלב שיווק',
};

export const GALLERY_ITEMS = IMAGES.gallery;

/** Hero carousel — the IMG_ subset, in numeric order. GAL_ photos are skipped. */
export const HERO_SLIDES = IMAGES.slides;
