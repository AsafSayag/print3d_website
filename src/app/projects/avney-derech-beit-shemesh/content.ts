/**
 * All copy for the אבני דרך, בית שמש project page.
 * Rows marked `pending` are fields that still need to be filled in.
 *
 * Server-only: `projectImages` reads the filesystem, so never import this
 * module from a "use client" file — pass the image arrays down as props.
 */
import { projectImages } from "@/lib/projectImages";

export const SEO_TITLE_TAG =
  "מודל אדריכלי אבני דרך בית שמש | קנה מידה 1:100 | פרינט תלת מימד";

export const IMAGE_ALT =
  "מודל אדריכלי בקנה מידה 1:100 של פרויקט המגורים אבני דרך, בית שמש — הדפסת תלת מימד, חיפוי אבן וגגות רעפים";

export const HERO = {
  eyebrow: "",
  title: "אבני דרך, בית שמש",
  scale: "1:100",
};

/** Dedicated background image for the מפרט טכני section. */
/**
 * Image lists come from the asset folder, not from this file — see
 * `projectImages`. Add, reorder or reclassify photos by renaming files.
 */
const IMAGES = projectImages("avney_derech_beit_shemesh_project");

export const SPEC_BG = IMAGES.bg;

export type SpecRow = {
  label: string;
  value?: string;
  pending?: boolean;
  pendingHint?: string;
};

export const SPECS: SpecRow[] = [
  { label: "שם המודל", value: "מודל אדריכלי — פרויקט אבני דרך, בית שמש" },
  { label: "סוג המודל", value: "מודל שיווקי למשרד מכירות" },
  { label: "קנה מידה", value: "1:100" },
  {
    label: "שיטות ייצור",
    value: "הדפסת תלת מימד, חיתוך לייזר, הרכבה וגימור בעבודת יד",
  },
  {
    label: "חומרים וגימורים",
    value:
      "חיפוי אבן בגווני בז' וקרם לצד טיח לבן, גגות רעפים בגוון טרקוטה, מרפסות עם מעקי זכוכית, סורגי הצללה מחוררים ופאנלים סולאריים על הגגות",
  },
  {
    label: "תאורה",
    value: "ללא תאורה פנימית — המודל מוצג בגימור יום מלא",
  },
  {
    label: "אלמנטים במודל",
    value:
      "אשכול בנייני מגורים על מדרון עם קירות תמך וטרסות, רחוב ראשי עם שביל אופניים, מדרכות משתלבות ומעברי חצייה, חניות ומרתפי חניה, גינון בוגר ועצי רחוב, כלי רכב ודמויות בקנה מידה",
  },
  { label: "ייעוד", value: "תצוגה במשרד מכירות" },
];

export const GALLERY_ITEMS = IMAGES.gallery;

/** Hero carousel — the IMG_ subset, in numeric order. GAL_ photos are skipped. */
export const HERO_SLIDES = IMAGES.slides;
