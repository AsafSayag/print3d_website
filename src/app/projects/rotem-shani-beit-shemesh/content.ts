/**
 * All copy for the רותם שני, בית שמש project page.
 * Rows marked `pending` are fields that still need to be filled in.
 */

export const SEO_TITLE_TAG =
  "מודל אדריכלי רותם שני בית שמש | קנה מידה 1:100 | פרינט תלת מימד";

export const IMAGE_ALT =
  "מודל אדריכלי בקנה מידה 1:100 של פרויקט המגורים רותם שני, בית שמש — הדפסת תלת מימד, תאורת LED וחיתוך לייזר";

export const HERO = {
  eyebrow: "",
  title: "רותם שני, בית שמש",
  scale: "1:100",
  src: "/project_pages/rotem_shani_beit_shemesh_project/rotem_shani_hero.webp",
};

/** Dedicated shot used as the page's full-bleed hero. */
export const FULL_BLEED_HERO =
  "/project_pages/rotem_shani_beit_shemesh_project/design_1_hero.webp";

/** Dedicated background image for the מפרט טכני section. */
export const SPEC_BG =
  "/project_pages/rotem_shani_beit_shemesh_project/bg_placeholder.webp";

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
  { label: "מידות המודל", pending: true, pendingHint: 'אורך × רוחב בס"מ' },
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
  { label: "משך ייצור", pending: true, pendingHint: "בשבועות" },
];

export const GALLERY_IMAGES = [
  "/project_pages/rotem_shani_beit_shemesh_project/IMG_01.webp",
  "/project_pages/rotem_shani_beit_shemesh_project/IMG_02.webp",
  "/project_pages/rotem_shani_beit_shemesh_project/IMG_03.webp",
  "/project_pages/rotem_shani_beit_shemesh_project/IMG_04.webp",
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
