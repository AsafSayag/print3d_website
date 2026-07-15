/**
 * Content + data for the standalone "תיק עבודות" (portfolio) page.
 * Project names, scales and clients mirror the real archive already used in
 * Portfolio.tsx — kept in one place here so the hero carousel, filter grid and
 * highlights carousel all read from the same source.
 */

export const PORTFOLIO_HERO = {
  eyebrow: "קטלוג",
  title: "כל פרויקט הוא סיפור שהופך למודל",
  subtitle:
    "מבחר מהמודלים האדריכליים וההדמיות התלת־ממדיות שליווינו — ממגדלי יוקרה ושכונות שלמות ועד תוכניות עירוניות, בקנה מידה שמאפשר לראות את הפרויקט לפני שהוא נבנה.",
} as const;

export type ProjectType = "marketing" | "residential" | "urban";

export type Project = {
  id: string;
  title: string;
  client: string;
  scale: string;
  type: ProjectType;
  image: string;
  /** Real footage — when present, the showcase carousel plays this instead of
   * the static image (lazy-loaded, muted, looping; `image` doubles as poster). */
  video?: { mp4: string; webm: string };
  /** When present, the project card links through to its own case-study page. */
  href?: string;
};

/** Real models from the Print3D archive — same source as Portfolio.tsx. */
export const PORTFOLIO_PROJECTS: Project[] = [
  {
    id: "levinstein",
    title: "מגדלי לוינשטיין",
    client: "לוינשטיין הנדסה",
    scale: "1:75",
    type: "residential",
    image: "/projects/levinstein.webp",
    video: {
      mp4: "/videos/projects/levinstein.mp4",
      webm: "/videos/projects/levinstein.webm",
    },
    href: "/projects/levinstein",
  },
  {
    id: "beit-hakerem",
    title: "בית הכרם",
    client: "אלעד ישראל מגורים",
    scale: "1:1000",
    type: "urban",
    image: "/projects/beit-hakerem.webp",
    video: {
      mp4: "/videos/projects/beit-hakerem.mp4",
      webm: "/videos/projects/beit-hakerem.webm",
    },
    href: "/projects/beit-hakerem",
  },
  {
    id: "neve-gan",
    title: "נווה גן",
    client: "אלעד מגורים",
    scale: "1:75",
    type: "residential",
    image: "/projects/neve-gan.webp",
  },
  {
    id: "gindi-bait-bapark",
    title: "גינדי החזקות · בית בפארק",
    client: "גינדי החזקות",
    scale: "1:100",
    type: "marketing",
    image: "/projects/gindi-bait-bapark.jpg",
  },
  {
    id: "shikun-binui-or-yam",
    title: "שיכון ובינוי · אור ים",
    client: "שיכון ובינוי",
    scale: "1:200",
    type: "residential",
    image: "/projects/shikun-binui-or-yam.jpg",
  },
  {
    id: "gindi-tlv",
    title: "גינדי TLV",
    client: "גינדי השקעות",
    scale: "1:200",
    type: "marketing",
    image: "/projects/gindi-tlv.webp",
  },
  {
    id: "tzavta-shapir",
    title: "צוותא · שפיר",
    client: "שפיר",
    scale: "1:150",
    type: "marketing",
    image: "/projects/tzavta-shapir.jpg",
  },
  {
    id: "preshkovsky-tabaa",
    title: "פרשקובסקי · מודל תב״ע",
    client: "פרשקובסקי",
    scale: "1:500",
    type: "urban",
    image: "/projects/preshkovsky-tabaa.jpg",
  },
  {
    id: "gindi-kfar-azar",
    title: 'גינדי כפר אז"ר',
    client: "גינדי",
    scale: "1:100",
    type: "residential",
    image: "/videos/projects/gindi-kfar-azar.webp",
    href: "/projects/gindi-kfar-azar",
  },
  {
    id: "dafna-tidhar",
    title: "תדהר דפנה",
    client: "תדהר",
    scale: "1:100",
    type: "residential",
    image: "/projects/dafna-tidhar.webp",
    href: "/projects/dafna-tidhar",
  },
  {
    id: "sela-baitar-hadera",
    title: "סלע ביתר · חדרה",
    client: "סלע ביתר",
    scale: "1:100",
    type: "residential",
    image: "/projects/sela-baitar-hadera.webp",
    href: "/projects/sela-baitar-hadera",
  },
  {
    id: "shbiro-rishon-letzion",
    title: "שבירו, ראשון לציון",
    client: "שבירו",
    scale: "1:200",
    type: "urban",
    image: "/projects/shbiro-rishon-letzion.webp",
    href: "/projects/shbiro-rishon-letzion",
  },
];

export const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
  marketing: 'שיווק נדל"ן',
  residential: "מגורים ושכונות",
  urban: "עירוני ורשויות",
};

export const PORTFOLIO_SHOWCASE = {
  eyebrow: "קטלוג · פרויקטים נבחרים",
  note: "באתר מוצגים חלק גדול מהפרויקטים שהחברה עשתה, אך לא כולם.",
} as const;

export const PORTFOLIO_FILTERS = {
  eyebrow: "לפי סינון",
  title: "מצאו את הפרויקט שמדבר אליכם",
  all: "כל הפרויקטים",
  brandLabel: "מותג",
  scaleLabel: "קנה מידה",
  typeLabel: "סוג פרויקט",
  empty: "לא נמצאו פרויקטים התואמים לסינון שנבחר.",
} as const;

export const PORTFOLIO_CTA = {
  eyebrow: "יש לכם פרויקט חדש?",
  title: "בואו נהפוך את התוכנית שלכם למודל שקשה להתעלם ממנו",
  text: "ספרו לנו על הפרויקט, ותוך יום עסקים תקבלו הצעת מחיר מסודרת ולוח זמנים לביצוע.",
  button: "קבלו הצעת מחיר",
} as const;

export const PORTFOLIO_HIGHLIGHTS = {
  eyebrow: "עוד מהקטלוג שלנו",
  title: "פרויקטים נוספים שמדברים בעד עצמם",
} as const;
