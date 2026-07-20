/**
 * All copy for the אשדר, תג'ור project page.
 * Rows marked `pending` are fields that still need to be filled in.
 *
 * Server-only: `projectImages` reads the filesystem, so never import this
 * module from a "use client" file — pass the image arrays down as props.
 */
import { projectImages } from "@/lib/projectImages";

export const SEO_TITLE_TAG =
  "מודל אדריכלי אשדר תג'ור | קנה מידה 1:100 | פרינט תלת מימד";

export const IMAGE_ALT =
  "מודל אדריכלי בקנה מידה 1:100 של פרויקט המגורים אשדר, תג'ור — הדפסת תלת מימד, תאורת LED וחיתוך לייזר";

export const HERO = {
  eyebrow: "",
  title: "אשדר, תג'ור",
  scale: "1:100",
};

/** Dedicated background image for the מפרט טכני section. */
/**
 * Image lists come from the asset folder, not from this file — see
 * `projectImages`. Add, reorder or reclassify photos by renaming files.
 */
const IMAGES = projectImages("ashdar_tagor_project");

export const SPEC_BG = IMAGES.bg;

export type SpecRow = {
  label: string;
  value?: string;
  pending?: boolean;
  pendingHint?: string;
};

export const SPECS: SpecRow[] = [
  { label: "שם המודל", value: "מודל אדריכלי — פרויקט אשדר, תג'ור" },
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
      "חזיתות בגווני לבן ואפור עם מרפסות פתוחות ופרגולות, זיגוג שקוף, ריהוט מרפסות וגגות מפורט",
  },
  {
    label: "תאורה",
    value: "תאורת LED חמה בכל יחידות הדיור, במרפסות ובגגות",
  },
  {
    label: "אלמנטים במודל",
    value:
      "מגדל מגורים גבוה לצד שני בנייני מגורים נמוכים, פיתוח סביבתי מלא (מדשאות, עצים, שבילים מרוצפים), חצר משותפת, ריהוט גג וגן, כביש ומדרכות עם תאורת רחוב",
  },
  { label: "ייעוד", value: "תצוגה במשרד מכירות" },
  { label: "משך ייצור", pending: true, pendingHint: "בשבועות" },
];

export const GALLERY_ITEMS = IMAGES.gallery;

/** Hero carousel — the IMG_ subset, in numeric order. GAL_ photos are skipped. */
export const HERO_SLIDES = IMAGES.slides;
