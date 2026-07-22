/**
 * All copy for the ויטניה, הר חוצבים project page.
 * Rows marked `pending` are fields that still need to be filled in.
 *
 * Server-only: `projectImages` reads the filesystem, so never import this
 * module from a "use client" file — pass the image arrays down as props.
 */
import { projectImages } from "@/lib/projectImages";

export const SEO_TITLE_TAG =
  "מודל אדריכלי ויטניה הר חוצבים | קנה מידה 1:250 | פרינט תלת מימד";

export const IMAGE_ALT =
  "מודל אדריכלי בקנה מידה 1:250 של מתחם המשרדים ויטניה, הר חוצבים ירושלים — הדפסת תלת מימד וחיתוך לייזר";

export const HERO = {
  eyebrow: "",
  title: "ויטניה, הר חוצבים",
  scale: "1:250",
};

/** Dedicated background image for the מפרט טכני section. */
/**
 * Image lists come from the asset folder, not from this file — see
 * `projectImages`. Add, reorder or reclassify photos by renaming files.
 */
const IMAGES = projectImages("vitania_har_hotzvim_project");

export const SPEC_BG = IMAGES.bg;

export type SpecRow = {
  label: string;
  value?: string;
  pending?: boolean;
  pendingHint?: string;
};

export const SPECS: SpecRow[] = [
  { label: "שם המודל", value: "מודל אדריכלי — מתחם ויטניה, הר חוצבים ירושלים" },
  { label: "סוג המודל", value: "מודל אורבני־תכנוני של מתחם משרדים" },
  { label: "קנה מידה", value: "1:250" },
  {
    label: "שיטות ייצור",
    value: "הדפסת תלת מימד, חיתוך לייזר, הרכבה וגימור בעבודת יד",
  },
  {
    label: "חומרים וגימורים",
    value:
      "חזיתות מונוכרומטיות בגוון שמנת עם צלעות אנכיות רציפות, זיגוג שקוף בין הצלעות, פיתוח בגווני אדמה ואפור",
  },
  {
    label: "תאורה",
    value: "ללא תאורה פנימית — המודל מוצג בגימור יום מלא",
  },
  {
    label: "אלמנטים במודל",
    value:
      "מספר מבני משרדים בגבהים משתנים, פיתוח סביבתי מלא (עצים, שדרות, גינון), מערכת כבישים עם סימוני נתיבים, מעברי חצייה, כלי רכב ומגרשי חניה",
  },
  { label: "ייעוד", value: "תצוגה ותכנון — הצגת המתחם ליזם ולרשויות" },
];

export const GALLERY_ITEMS = IMAGES.gallery;

/** Hero carousel — the IMG_ subset, in numeric order. GAL_ photos are skipped. */
export const HERO_SLIDES = IMAGES.slides;
