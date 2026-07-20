/**
 * All copy for the פרשקובסקי, רמת הנשיא project page.
 * Rows marked `pending` are fields that still need to be filled in.
 *
 * Server-only: `projectImages` reads the filesystem, so never import this
 * module from a "use client" file — pass the image arrays down as props.
 */
import { projectImages } from "@/lib/projectImages";

export const SEO_TITLE_TAG =
  "מודל אדריכלי פרשקובסקי רמת הנשיא | קנה מידה 1:200 | פרינט תלת מימד";

export const IMAGE_ALT =
  "מודל אדריכלי בקנה מידה 1:200 של פרויקט המגורים פרשקובסקי, רמת הנשיא — מגדלי מגורים, חורש טבעי ופיתוח נוף";

export const HERO = {
  eyebrow: "",
  title: "פרשקובסקי, רמת הנשיא",
  scale: "1:200",
};

/** Dedicated background image for the מפרט טכני section. */
/**
 * Image lists come from the asset folder, not from this file — see
 * `projectImages`. Add, reorder or reclassify photos by renaming files.
 */
const IMAGES = projectImages("prashkovski_ramat_hanasi_project");

export const SPEC_BG = IMAGES.bg;

export type SpecRow = {
  label: string;
  value?: string;
  pending?: boolean;
  pendingHint?: string;
};

export const SPECS: SpecRow[] = [
  { label: "שם המודל", value: "מודל אדריכלי — פרויקט פרשקובסקי, רמת הנשיא" },
  { label: "סוג המודל", value: "מודל שיווקי לוויטרינה במשרד מכירות" },
  { label: "קנה מידה", value: "1:200" },
  { label: "מידות המודל", pending: true, pendingHint: 'אורך × רוחב בס"מ' },
  {
    label: "שיטות ייצור",
    value: "הדפסת תלת מימד, חיתוך לייזר, הרכבה וגימור בעבודת יד",
  },
  {
    label: "חומרים וגימורים",
    value:
      "מגדלי מגורים בגווני לבן ואפור כהה עם חזיתות מפורטות ומרפסות, שטחי נוף עם צמחייה בגוונים מגוונים, קרקע סלעית ומגרשי ספורט צבעוניים",
  },
  {
    label: "תאורה",
    pending: true,
    pendingHint: "לאישור — האם הותקנה תאורת LED במודל",
  },
  {
    label: "אלמנטים במודל",
    value:
      "שדרת מגדלי מגורים לאורך רחוב ראשי, חורש טבעי נרחב עם עצים בוגרים ושבילי הליכה, פארק שכונתי עם גני משחקים ומתקני מים, מגרשי ספורט, מדרכות משתלבות, כלי רכב ודמויות בקנה מידה",
  },
  { label: "ייעוד", value: "תצוגה בוויטרינה במשרד מכירות" },
  { label: "משך ייצור", pending: true, pendingHint: "בשבועות" },
];

export const GALLERY_ITEMS = IMAGES.gallery;

/** Hero carousel — the IMG_ subset, in numeric order. GAL_ photos are skipped. */
export const HERO_SLIDES = IMAGES.slides;
