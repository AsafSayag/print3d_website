/**
 * All copy for the רם אדרת, גבעת המטוס project page.
 * Rows marked `pending` are fields that still need to be filled in.
 *
 * Server-only: `projectImages` reads the filesystem, so never import this
 * module from a "use client" file — pass the image arrays down as props.
 */
import { projectImages } from "@/lib/projectImages";

export const SEO_TITLE_TAG =
  "מודל אדריכלי רם אדרת גבעת המטוס | קנה מידה 1:200 | פרינט תלת מימד";

export const IMAGE_ALT =
  "מודל אדריכלי אורבני בקנה מידה 1:200 של פרויקט רם אדרת, גבעת המטוס — מגדלי מגורים מוארים, מערך כבישים ופיתוח נוף";

export const HERO = {
  eyebrow: "",
  title: "רם אדרת, גבעת המטוס",
  scale: "1:200",
};

/** Dedicated background image for the מפרט טכני section. */
/**
 * Image lists come from the asset folder, not from this file — see
 * `projectImages`. Add, reorder or reclassify photos by renaming files.
 */
const IMAGES = projectImages("ram_aderet_givat_hamatos_project");

export const SPEC_BG = IMAGES.bg;

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

export const GALLERY_ITEMS = IMAGES.gallery;

/** Hero carousel — the IMG_ subset, in numeric order. GAL_ photos are skipped. */
export const HERO_SLIDES = IMAGES.slides;
