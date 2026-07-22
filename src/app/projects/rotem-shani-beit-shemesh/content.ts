/**
 * All copy for the רותם שני, בית שמש project page.
 * Rows marked `pending` are fields that still need to be filled in.
 *
 * Server-only: `projectImages` reads the filesystem, so never import this
 * module from a "use client" file — pass the image arrays down as props.
 */
import { projectImages } from "@/lib/projectImages";

export const SEO_TITLE_TAG =
  "מודל אדריכלי רותם שני בית שמש | קנה מידה 1:100 | פרינט תלת מימד";

export const IMAGE_ALT =
  "מודל אדריכלי בקנה מידה 1:100 של פרויקט המגורים רותם שני, בית שמש — הדפסת תלת מימד, תאורת LED וחיתוך לייזר";

export const HERO = {
  eyebrow: "",
  title: "רותם שני, בית שמש",
  scale: "1:100",
};

/** Dedicated background image for the מפרט טכני section. */
/**
 * Image lists come from the asset folder, not from this file — see
 * `projectImages`. Add, reorder or reclassify photos by renaming files.
 */
const IMAGES = projectImages("rotem_shani_beit_shemesh_project");

export const SPEC_BG = IMAGES.bg;

export type SpecRow = {
  label: string;
  value?: string;
  pending?: boolean;
  pendingHint?: string;
};

export const SPECS: SpecRow[] = [
  { label: "שם המודל", value: "מודל אדריכלי — פרויקט רותם שני, בית שמש" },
  { label: "סוג המודל", value: "מודל שיווקי למשרד מכירות" },
  { label: "קנה מידה", value: "1:100" },
  {
    label: "שיטות ייצור",
    value: "הדפסת תלת מימד, חיתוך לייזר, הרכבה וגימור בעבודת יד",
  },
  {
    label: "חומרים וגימורים",
    value:
      "חזיתות בגווני לבן, אפור וחיפוי עץ, מרפסות מפורטות עם ריהוט וצמחייה, זיגוג שקוף, חזיתות מסחר עם שילוט מוטבע",
  },
  {
    label: "תאורה",
    value: "תאורת LED חמה בכל יחידות הדיור, בחזיתות המסחר ובפיתוח",
  },
  {
    label: "אלמנטים במודל",
    value:
      "מגדל מגורים גבוה לצד אשכול בנייני מגורים נמוכים, קומת מסחר מוארת עם חנויות וכניסה לחניון, רחוב מסחרי עם שדרת עצים, גינון ופרחים, כלי רכב, ריהוט רחוב ודמויות בקנה מידה",
  },
  { label: "ייעוד", value: "תצוגה במשרד מכירות" },
];

export const GALLERY_ITEMS = IMAGES.gallery;

/** Hero carousel — the IMG_ subset, in numeric order. GAL_ photos are skipped. */
export const HERO_SLIDES = IMAGES.slides;
