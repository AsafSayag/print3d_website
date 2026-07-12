/**
 * Blog editorial content (Henning Larsen–style grid).
 *
 * Kept local to the /blog route, mirroring how the gindi-kfar-azar page owns its
 * own content.ts. The shared ARTICLES in src/lib/content.ts stays untouched, so
 * the homepage teaser (Articles.tsx) is unaffected.
 *
 * These items are a superset of the four base articles (same slug/title/image so
 * their placeholder detail pages keep resolving) plus extra invented titles used
 * only to fill the editorial grid. No article bodies yet — every card links to
 * the shared "בקרוב" placeholder at /blog/[slug].
 */

export type BlogCategory =
  | "מדריכים"
  | "תמחור"
  | "תובנות"
  | "השוואות"
  | "תהליך ייצור";

export type BlogArticle = {
  slug: string;
  title: string;
  category: BlogCategory;
  /** Display date, DD.MM.YY — echoes the reference's date treatment. */
  date: string;
  readingTime: string;
  image: string;
};

export const BLOG_2 = {
  eyebrow: "",
  heading: "בלוג, מאמרים ותובנות",
  intro:
    "מדריכים, השוואות ותובנות מאחורי הקלעים של מודלים אדריכליים — מתמחור ועד תהליכי הייצור שהופכים חזון לפרויקט מוחשי.",
  /** First entry ("הכל") is the reset/all filter. */
  categories: [
    "הכל",
    "מדריכים",
    "תמחור",
    "תובנות",
    "השוואות",
    "תהליך ייצור",
  ] as const,
  items: [
    {
      slug: "ordering-architectural-model-guide",
      title: 'כל מה שיזם נדל"ן צריך לדעת לפני הזמנת מודל אדריכלי',
      category: "מדריכים",
      date: "02.07.26",
      readingTime: "6 דקות קריאה",
      image: "/projects/neve-gan.webp",
    },
    {
      slug: "scale-models-real-estate-marketing",
      title: 'איך מודל פיזי מגדיל מכירות בפרויקט נדל"ן',
      category: "תובנות",
      date: "18.06.26",
      readingTime: "7 דקות קריאה",
      image: "/projects/shikun-binui-or-yam.jpg",
    },
    {
      slug: "architectural-model-pricing-2026",
      title: "כמה עולה מודל אדריכלי? מדריך תמחור 2026",
      category: "תמחור",
      date: "27.05.26",
      readingTime: "8 דקות קריאה",
      image: "/projects/gindi-bait-bapark.jpg",
    },
    {
      slug: "physical-model-vs-digital-render",
      title: "מודל אדריכלי מול הדמיה דיגיטלית",
      category: "השוואות",
      date: "09.05.26",
      readingTime: "5 דקות קריאה",
      image: "/projects/preshkovsky-tabaa.jpg",
    },
    {
      slug: "choosing-model-scale",
      title: "בחירת קנה מידה למודל אדריכלי: המדריך המלא",
      category: "מדריכים",
      date: "21.04.26",
      readingTime: "6 דקות קריאה",
      image: "/projects/beit-hakerem.jpg",
    },
    {
      slug: "handmade-vs-automated-production",
      title: "עבודת יד מול ייצור אוטומטי",
      category: "תהליך ייצור",
      date: "30.03.26",
      readingTime: "4 דקות קריאה",
      image: "/projects/tzavta-shapir.jpg",
    },
    {
      slug: "materials-in-architectural-models",
      title: "החומרים שמאחורי מודל אדריכלי מקצועי",
      category: "תהליך ייצור",
      date: "12.03.26",
      readingTime: "5 דקות קריאה",
      image: "/projects/levinstein.jpg",
    },
    {
      slug: "led-lighting-in-models",
      title: "תאורת LED במודלים: איך מוסיפים דרמה לפרויקט",
      category: "תובנות",
      date: "24.02.26",
      readingTime: "4 דקות קריאה",
      image: "/projects/gindi-tlv.webp",
    },
    {
      slug: "model-vs-vr-experience",
      title: "מודל פיזי מול חוויית VR: מה באמת משכנע יזמים",
      category: "השוואות",
      date: "05.02.26",
      readingTime: "6 דקות קריאה",
      image: "/projects/gindi_kfar_azar.webp",
    },
    {
      slug: "timeline-for-model-production",
      title: "כמה זמן לוקח לייצר מודל אדריכלי — לוחות זמנים ותקציב",
      category: "תמחור",
      date: "16.01.26",
      readingTime: "5 דקות קריאה",
      image: "/projects/gindi-bait-bapark.jpg",
    },
  ] satisfies BlogArticle[],
} as const;

/** All slugs that should render a (placeholder) detail page. */
export const blogArticleSlugs = (): string[] =>
  BLOG_2.items.map((a) => a.slug);

/** Resolve a single article by slug, or undefined. */
export const getBlogArticle = (slug: string): BlogArticle | undefined =>
  BLOG_2.items.find((a) => a.slug === slug);
