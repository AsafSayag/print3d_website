/**
 * All copy for the מלון בת ים project page.
 * Rows marked `pending` are fields that still need to be filled in.
 *
 * Server-only: `projectImages` reads the filesystem, so never import this
 * module from a "use client" file — pass the image arrays down as props.
 */
import { projectImages } from "@/lib/projectImages";

export const SEO_TITLE_TAG =
  "מודל אדריכלי מלון בת ים | קנה מידה 1:125 | פרינט תלת מימד";

export const IMAGE_ALT =
  "מודל אדריכלי בקנה מידה 1:125 של מגדל מלון על קו החוף בבת ים — הדפסת תלת מימד וחיתוך לייזר";

export const HERO = {
  eyebrow: "",
  title: "מלון בת ים",
  scale: "1:125",
};

/** Dedicated background image for the מפרט טכני section. */
/**
 * Image lists come from the asset folder, not from this file — see
 * `projectImages`. Add, reorder or reclassify photos by renaming files.
 */
const IMAGES = projectImages("bat_yam_hotel_project");

export const SPEC_BG = IMAGES.bg;

export type SpecRow = {
  label: string;
  value?: string;
  pending?: boolean;
  pendingHint?: string;
};

export const SPECS: SpecRow[] = [
  { label: "שם המודל", value: "מודל אדריכלי — מלון בת ים" },
  { label: "סוג המודל", value: "מודל שיווקי ותכנוני של מגדל מלונאות" },
  { label: "קנה מידה", value: "1:125" },
  {
    label: "שיטות ייצור",
    value: "הדפסת תלת מימד, חיתוך לייזר, הרכבה וגימור בעבודת יד",
  },
  {
    label: "חומרים וגימורים",
    value:
      "מגדל בגימור אקרילי שקוף עם רשת מרפסות לבנה, בסיס בגוון שמנת, חול וים בעבודת יד על משטח אקרילי",
  },
  { label: "תאורה", pending: true, pendingHint: "האם שולבה תאורת LED במודל" },
  {
    label: "אלמנטים במודל",
    value:
      "מגדל מלון גבוה מעל מפלס לובי ובריכות, קו החוף המלא עם חול, ים, שמשיות ומיטות שיזוף, דקלים, מרפסת נוף, כביש ראשי עם כלי רכב ודמויות בקנה מידה",
  },
  { label: "ייעוד", value: "תצוגה ותכנון — הצגת הפרויקט ליזם ולרשויות" },
];

export const GALLERY_ITEMS = IMAGES.gallery;

/** Hero carousel — the IMG_ subset, in numeric order. GAL_ photos are skipped. */
export const HERO_SLIDES = IMAGES.slides;
