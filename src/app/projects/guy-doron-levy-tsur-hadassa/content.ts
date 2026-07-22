/**
 * All copy for the גיא דורון לוי, צור הדסה project page.
 * Rows marked `pending` are fields that still need to be filled in.
 *
 * Server-only: `projectImages` reads the filesystem, so never import this
 * module from a "use client" file — pass the image arrays down as props.
 */
import { projectImages } from "@/lib/projectImages";

export const SEO_TITLE_TAG =
  "מודל אדריכלי גיא דורון לוי צור הדסה | קנה מידה 1:100 | פרינט תלת מימד";

export const IMAGE_ALT =
  "מודל אדריכלי בקנה מידה 1:100 של פרויקט המגורים גיא דורון לוי, צור הדסה — הדפסת תלת מימד וחיתוך לייזר";

export const HERO = {
  eyebrow: "",
  title: "גיא דורון לוי, צור הדסה",
  scale: "1:100",
};

/** Dedicated background image for the מפרט טכני section. */
/**
 * Image lists come from the asset folder, not from this file — see
 * `projectImages`. Add, reorder or reclassify photos by renaming files.
 */
const IMAGES = projectImages("guy_doron_levy_tsur_hadassa_project");

export const SPEC_BG = IMAGES.bg;

export type SpecRow = {
  label: string;
  value?: string;
  pending?: boolean;
  pendingHint?: string;
};

export const SPECS: SpecRow[] = [
  { label: "שם המודל", value: "מודל אדריכלי — גיא דורון לוי, צור הדסה" },
  { label: "סוג המודל", value: "מודל שיווקי למשרד מכירות" },
  { label: "קנה מידה", value: "1:100" },
  {
    label: "שיטות ייצור",
    value: "הדפסת תלת מימד, חיתוך לייזר, הרכבה וגימור בעבודת יד",
  },
  {
    label: "חומרים וגימורים",
    value:
      "חזיתות בגוון לבן עם מרפסות ופרגולות, זיגוג שקוף, קירות תמך מחיפוי אבן טבעית לאורך המדרונות, בסיס תצוגה שחור ממותג עם כיסוי אקרילי שקוף",
  },
  {
    label: "תאורה",
    value: "תאורת LED חמה בכל יחידות הדיור ובעמודי תאורת הרחוב",
  },
  {
    label: "אלמנטים במודל",
    value:
      "תשעה בנייני מגורים נמוכים ובתים טוריים, ממוספרים לפי מגרשים לצורכי מכירה, בנויים במדרג טרסות על מדרון עם קירות תמך מאבן, גינון בוגר, מדשאות ושטח פארק, שבילים ומדרגות נוף, רחוב עם מדרכות, מפרצי חניה מסומנים ותאורת רחוב, כלי רכב ודמויות בקנה מידה",
  },
  { label: "ייעוד", value: "תצוגה במשרד מכירות" },
];

export const ABOUT = {
  heading: "על הפרויקט",
  client: "גיא דורון לוי",
  represented: "פרויקט מגורים, צור הדסה",
  pendingHint: 'מס\' יח"ד, שלב שיווק',
};

export const GALLERY_ITEMS = IMAGES.gallery;

/** Hero carousel — the IMG_ subset, in numeric order. GAL_ photos are skipped. */
export const HERO_SLIDES = IMAGES.slides;
