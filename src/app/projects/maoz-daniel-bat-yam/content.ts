/**
 * All copy for the מעוז דניאל, כצנלסון בת ים project page.
 * Rows marked `pending` are fields that still need to be filled in.
 *
 * Server-only: `projectImages` reads the filesystem, so never import this
 * module from a "use client" file — pass the image arrays down as props.
 */
import { projectImages } from "@/lib/projectImages";

export const SEO_TITLE_TAG =
  "מודל אדריכלי מעוז דניאל, כצנלסון בת ים | קנה מידה 1:75 | פרינט תלת מימד";

export const IMAGE_ALT =
  "מודל אדריכלי בקנה מידה 1:75 של פרויקט מעוז דניאל, כצנלסון בת ים — הדפסת תלת מימד וחיתוך לייזר";

export const HERO = {
  eyebrow: "",
  title: "מעוז דניאל, כצנלסון בת ים",
  scale: "1:75",
};

/** Dedicated background image for the מפרט טכני section. */
/**
 * Image lists come from the asset folder, not from this file — see
 * `projectImages`. Add, reorder or reclassify photos by renaming files.
 */
const IMAGES = projectImages("maoz_daniel_bat_yam_project");

export const SPEC_BG = IMAGES.bg;

export type SpecRow = {
  label: string;
  value?: string;
  pending?: boolean;
  pendingHint?: string;
};

export const SPECS: SpecRow[] = [
  { label: "שם המודל", value: "מודל אדריכלי — פרויקט מעוז דניאל, כצנלסון בת ים" },
  { label: "סוג המודל", value: "מודל שיווקי למשרד מכירות" },
  { label: "קנה מידה", value: "1:75" },
  {
    label: "שיטות ייצור",
    value: "הדפסת תלת מימד, חיתוך לייזר, הרכבה וגימור בעבודת יד",
  },
  {
    label: "חומרים וגימורים",
    value:
      "חזיתות לבנות עם מרפסות רציפות ברצפת עץ ומעקי זכוכית, זיגוג כהה, פרגולות לבנות בגגות ובחצר המשותפת, כיכרות מרוצפות בדוגמת ריצוף עדינה",
  },
  {
    label: "תאורה",
    value:
      "תאורת LED חמה בכל יחידות הדיור, לצד תאורת פיתוח מוארת בחצר המשותפת ובשבילים",
  },
  {
    label: "אלמנטים במודל",
    value:
      "מספר מגדלי מגורים סביב חצר משותפת מוגבהת עם פרגולה וגגות ירוקים, מרפסות מפורטות עם ריהוט ועציצים, פארק שכונתי עם מדשאות, שדרת דקלים, ספסלים ופרגולות ישיבה, שני גני משחקים צבעוניים עם מתקנים ומצללות בד, כביש עם סימוני נתיבים ומדרכות משתלבות, כלי רכב, רוכב אופניים ודמויות בקנה מידה",
  },
  { label: "ייעוד", value: "תצוגה במשרד מכירות" },
];

export const GALLERY_ITEMS = IMAGES.gallery;

/** Hero carousel — the IMG_ subset, in numeric order. GAL_ photos are skipped. */
export const HERO_SLIDES = IMAGES.slides;
