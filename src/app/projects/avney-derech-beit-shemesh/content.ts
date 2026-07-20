/**
 * All copy for the אבני דרך, בית שמש project page.
 * Rows marked `pending` are fields that still need to be filled in.
 */

export const SEO_TITLE_TAG =
  "מודל אדריכלי אבני דרך בית שמש | קנה מידה 1:100 | פרינט תלת מימד";

export const IMAGE_ALT =
  "מודל אדריכלי בקנה מידה 1:100 של פרויקט המגורים אבני דרך, בית שמש — הדפסת תלת מימד, חיפוי אבן וגגות רעפים";

export const HERO = {
  eyebrow: "",
  title: "אבני דרך, בית שמש",
  scale: "1:100",
  src: "/project_pages/avney_derech_beit_shemesh_project/avney_derech_hero.webp",
};

/** Dedicated shot used as the page's full-bleed hero. */
export const FULL_BLEED_HERO =
  "/project_pages/avney_derech_beit_shemesh_project/design_1_hero.webp";

/** Dedicated background image for the מפרט טכני section. */
export const SPEC_BG =
  "/project_pages/avney_derech_beit_shemesh_project/bg_placeholder.webp";

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
  { label: "מידות המודל", pending: true, pendingHint: 'אורך × רוחב בס"מ' },
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
    pending: true,
    pendingHint: "לאישור — האם הותקנה תאורת LED במודל",
  },
  {
    label: "אלמנטים במודל",
    value:
      "אשכול בנייני מגורים על מדרון עם קירות תמך וטרסות, רחוב ראשי עם שביל אופניים, מדרכות משתלבות ומעברי חצייה, חניות ומרתפי חניה, גינון בוגר ועצי רחוב, כלי רכב ודמויות בקנה מידה",
  },
  { label: "ייעוד", value: "תצוגה במשרד מכירות" },
  { label: "משך ייצור", pending: true, pendingHint: "בשבועות" },
];

export const GALLERY_IMAGES = [
  "/project_pages/avney_derech_beit_shemesh_project/IMG_01.webp",
  "/project_pages/avney_derech_beit_shemesh_project/IMG_02.webp",
  "/project_pages/avney_derech_beit_shemesh_project/IMG_03.webp",
  "/project_pages/avney_derech_beit_shemesh_project/IMG_04.webp",
  HERO.src,
  FULL_BLEED_HERO,
];

/**
 * Hero slider cycles through every project photo. The chosen leader shot
 * (HERO.src) leads the carousel, followed by the full-bleed shot, then the rest.
 */
export const HERO_SLIDES = [
  HERO.src,
  FULL_BLEED_HERO,
  ...GALLERY_IMAGES.filter((src) => src !== HERO.src && src !== FULL_BLEED_HERO),
];
