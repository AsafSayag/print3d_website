/**
 * Content + data for the standalone "תיק עבודות" (portfolio) page.
 * Project names, scales and clients mirror the real archive already used in
 * Portfolio.tsx — kept in one place here so the hero carousel, filter grid and
 * highlights carousel all read from the same source.
 */

import { HIDDEN_PROJECT_SLUGS } from "@/lib/hiddenProjects";

export const PORTFOLIO_HERO = {
  eyebrow: "קטלוג",
  title: "כל פרויקט הוא סיפור שהופך למודל",
  subtitle:
    "מבחר מהמודלים האדריכליים וההדמיות התלת־ממדיות שליווינו, ממגדלי יוקרה ושכונות שלמות ועד תוכניות עירוניות, בקנה מידה שמאפשר לראות את הפרויקט לפני שהוא נבנה.",
} as const;

export type ProjectType = "marketing" | "residential" | "urban";

export type Project = {
  id: string;
  title: string;
  client: string;
  scale: string;
  type: ProjectType;
  image: string;
  /**
   * Set only when `image`'s derived poster cuts (`-mobile.{avif,webp,jpg}` and
   * `.{avif,jpg}`) actually sit next to it in `public/projects/`. Drives the
   * showcase carousel's responsive poster; omitting it just serves the `.webp`.
   * Never set it speculatively — a missing cut renders a blank poster rather
   * than falling back (see DeferredVideo).
   */
  posterVariants?: true;
  /** Real footage — when present, the showcase carousel plays this instead of
   * the static image (lazy-loaded, muted, looping; `image` doubles as poster). */
  video?: { mp4: string; webm: string };
  /** When present, the project card links through to its own case-study page. */
  href?: string;
};

/** Real models from the Print3D archive — same source as Portfolio.tsx. */
const ALL_PORTFOLIO_PROJECTS: Project[] = [
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
    id: "gindi-kfar-azar",
    title: 'גינדי כפר אז"ר',
    client: "גינדי",
    scale: "1:100",
    type: "residential",
    image: "/videos/projects/gindi-kfar-azar.webp",
    // Full poster-cut set exists on disk (avif + `-mobile.*` + jpg), so serve
    // the responsive/AVIF poster: fewer bytes at the same resolution.
    posterVariants: true,
    // Carousel-only footage: `video` is read solely by the showcase carousel
    // (ProjectShowcase). The project's own case-study page draws from its
    // separate content.ts/HeroSlider, so this clip never appears there.
    video: {
      mp4: "/videos/projects/gindi-kfar-azar.mp4",
      webm: "/videos/projects/gindi-kfar-azar.webm",
    },
    href: "/projects/gindi-kfar-azar",
  },
  {
    id: "dafna-tidhar",
    title: "תדהר דפנה",
    client: "תדהר",
    scale: "1:100",
    type: "residential",
    image: "/projects/dafna-tidhar.webp",
    video: {
      mp4: "/videos/projects/dafna-tidhar.mp4",
      webm: "/videos/projects/dafna-tidhar.webm",
    },
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
    // The only project image with the full derived cut set on disk.
    posterVariants: true,
    // Carousel-only footage: `video` is read solely by the showcase carousel
    // (ProjectShowcase). The project's own case-study page draws from its
    // separate content.ts/HeroSlider, so this clip never appears there.
    video: {
      mp4: "/videos/projects/shbiro-rishon-letzion.mp4",
      webm: "/videos/projects/shbiro-rishon-letzion.webm",
    },
    href: "/projects/shbiro-rishon-letzion",
  },
  {
    id: "maoz-daniel-bat-yam",
    title: "מעוז דניאל, כצנלסון בת ים",
    client: "מעוז דניאל",
    scale: "1:75",
    type: "residential",
    image: "/projects/maoz-daniel-bat-yam.webp",
    href: "/projects/maoz-daniel-bat-yam",
  },
  {
    id: "avisror-costa-rica-jerusalem",
    title: "אביסרור, קוסטה ריקה",
    client: "אביסרור",
    scale: "1:150",
    type: "residential",
    image: "/projects/avisror-costa-rica-jerusalem.webp",
    href: "/projects/avisror-costa-rica-jerusalem",
  },
  {
    id: "avisror-ramat-hasharon",
    title: "אביסרור, רמת השרון",
    client: "אביסרור",
    scale: "1:150",
    type: "residential",
    image: "/projects/avisror-ramat-hasharon.webp",
    href: "/projects/avisror-ramat-hasharon",
  },
  {
    id: "aura-natania",
    title: "אאורה, נתניה",
    client: "אאורה",
    scale: "1:150",
    type: "residential",
    image: "/projects/aura-natania.webp",
    href: "/projects/aura-natania",
  },
  {
    id: "bonei-binyan-hahagana-raanana",
    title: "בוני בניין, ההגנה",
    client: "בוני בניין",
    scale: "1:100",
    type: "residential",
    image: "/projects/bonei-binyan-hahagana-raanana.webp",
    href: "/projects/bonei-binyan-hahagana-raanana",
  },
  {
    id: "avisror-sde-dov",
    title: "אביסרור, שדה דב",
    client: "אביסרור",
    scale: "1:100",
    type: "residential",
    image: "/projects/avisror-sde-dov.webp",
    // Full poster-cut set exists on disk (avif + `-mobile.*` + jpg), so serve
    // the responsive/AVIF poster: fewer bytes at the same resolution.
    posterVariants: true,
    // Carousel-only footage: `video` is read solely by the showcase carousel
    // (ProjectShowcase). The project's own case-study page draws from its
    // separate content.ts/HeroSlider, so this clip never appears there.
    video: {
      mp4: "/videos/projects/avisror-sde-dov.mp4",
      webm: "/videos/projects/avisror-sde-dov.webm",
    },
    href: "/projects/avisror-sde-dov",
  },
  {
    id: "kardan-metsada-bat-yam",
    title: "כרדן, מצדה בת ים",
    client: "כרדן",
    scale: "1:100",
    type: "residential",
    image: "/projects/kardan-metsada-bat-yam.webp",
    href: "/projects/kardan-metsada-bat-yam",
  },
  {
    id: "vitania-har-hotzvim",
    title: "ויטניה, הר חוצבים",
    client: "ויטניה",
    scale: "1:250",
    type: "urban",
    image: "/projects/vitania-har-hotzvim.webp",
    href: "/projects/vitania-har-hotzvim",
  },
  {
    id: "sarfati-arnona-jerusalem",
    title: "צרפתי, ארנונה ירושלים",
    client: "צרפתי",
    scale: "1:100",
    type: "residential",
    image: "/projects/sarfati-arnona-jerusalem.webp",
    // Full poster-cut set exists on disk (avif + `-mobile.*` + jpg), so serve
    // the responsive/AVIF poster: fewer bytes at the same resolution.
    posterVariants: true,
    // Carousel-only footage: `video` is read solely by the showcase carousel
    // (ProjectShowcase). The project's own case-study page draws from its
    // separate content.ts/HeroSlider, so this clip never appears there.
    video: {
      mp4: "/videos/projects/sarfati-arnona-jerusalem.mp4",
      webm: "/videos/projects/sarfati-arnona-jerusalem.webm",
    },
    href: "/projects/sarfati-arnona-jerusalem",
  },
  {
    id: "rotem-shani-beit-shemesh",
    title: "רותם שני, בית שמש",
    client: "רותם שני",
    scale: "1:100",
    type: "residential",
    image: "/projects/rotem-shani-beit-shemesh.webp",
    href: "/projects/rotem-shani-beit-shemesh",
  },
  {
    id: "ashdar-tagor",
    title: "אשדר, תג'ור",
    client: "אשדר",
    scale: "1:100",
    type: "residential",
    image: "/projects/ashdar-tagor.webp",
    href: "/projects/ashdar-tagor",
  },
  {
    id: "guy-doron-levy-ramat-efal",
    title: "גיא דורון לוי, רמת אפעל",
    client: "גיא דורון לוי",
    scale: "1:75",
    type: "residential",
    image: "/projects/guy-doron-levy-ramat-efal.webp",
    href: "/projects/guy-doron-levy-ramat-efal",
  },
  {
    id: "bat-yam-hotel",
    title: "מלון בת ים",
    client: "פרויקט מלונאות",
    scale: "1:125",
    type: "marketing",
    image: "/projects/bat-yam-hotel.webp",
    href: "/projects/bat-yam-hotel",
  },
  {
    id: "hayiriya-kiryat-yam",
    title: "הירייה, קרית ים",
    client: "בריטניה ישראל",
    scale: "1:100",
    type: "residential",
    image: "/projects/hayiriya-kiryat-yam.webp",
    href: "/projects/hayiriya-kiryat-yam",
  },
  {
    id: "prashkovski-ashdod",
    title: "פרשקובסקי, אשדוד",
    client: "פרשקובסקי",
    scale: "1:100",
    type: "residential",
    image: "/projects/prashkovski-ashdod.webp",
    href: "/projects/prashkovski-ashdod",
  },
  {
    id: "avney-derech-beit-shemesh",
    title: "אבני דרך, בית שמש",
    client: "אבני דרך",
    scale: "1:100",
    type: "residential",
    image: "/projects/avney-derech-beit-shemesh.webp",
    href: "/projects/avney-derech-beit-shemesh",
  },
  {
    id: "prashkovski-ramat-hanasi",
    title: "פרשקובסקי, רמת הנשיא",
    client: "פרשקובסקי",
    scale: "1:200",
    type: "residential",
    image: "/projects/prashkovski-ramat-hanasi.webp",
    // Full poster-cut set exists on disk (avif + `-mobile.*` + jpg), so serve
    // the responsive/AVIF poster: fewer bytes at the same resolution.
    posterVariants: true,
    // Carousel-only footage: `video` is read solely by the showcase carousel
    // (ProjectShowcase). The project's own case-study page draws from its
    // separate content.ts/HeroSlider, so this clip never appears there.
    video: {
      mp4: "/videos/projects/prashkovski-ramat-hanasi.mp4",
      webm: "/videos/projects/prashkovski-ramat-hanasi.webm",
    },
    href: "/projects/prashkovski-ramat-hanasi",
  },
  {
    id: "ram-aderet-givat-hamatos",
    title: "רם אדרת, גבעת המטוס",
    client: "רם אדרת",
    scale: "1:200",
    type: "residential",
    image: "/projects/ram-aderet-givat-hamatos.webp",
    href: "/projects/ram-aderet-givat-hamatos",
  },
  {
    id: "guy-doron-levy-tsur-hadassa",
    title: "גיא דורון לוי, צור הדסה",
    client: "גיא דורון לוי",
    scale: "1:100",
    type: "residential",
    image: "/projects/guy-doron-levy-tsur-hadassa.webp",
    href: "/projects/guy-doron-levy-tsur-hadassa",
  },
  {
    id: "azorim-beit-hakerem",
    title: "אזורים, בית הכרם",
    client: "אזורים",
    scale: "1:200",
    type: "residential",
    image: "/projects/azorim-beit-hakerem.webp",
    href: "/projects/azorim-beit-hakerem",
  },
  {
    id: "rotem-shani-petach-tikva",
    title: "רותם שני, פתח תקווה",
    client: "רותם שני",
    scale: "1:100",
    type: "residential",
    image: "/projects/rotem-shani-petach-tikva.webp",
    href: "/projects/rotem-shani-petach-tikva",
  },
];

export const PORTFOLIO_PROJECTS: Project[] = ALL_PORTFOLIO_PROJECTS.filter(
  (p) => !HIDDEN_PROJECT_SLUGS.includes(p.id)
);

export const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
  marketing: 'שיווק נדל"ן',
  residential: "מגורים ושכונות",
  urban: "עירוני ורשויות",
};

export const PORTFOLIO_SHOWCASE = {
  title: "פרויקטים נבחרים",
} as const;

/** The curated set — and exact order — shown in the main showcase carousel.
 *  The carousel is a video reel, so it lists only projects that have real
 *  footage (a `video`); ProjectShowcase also guards on this. Image-only
 *  projects are intentionally left out here but stay fully discoverable through
 *  the filter grid below, which lists every project. */
export const SHOWCASE_PROJECT_IDS: readonly string[] = [
  "dafna-tidhar",
  "beit-hakerem",
  "levinstein",
  "prashkovski-ramat-hanasi",
  "gindi-kfar-azar",
  "shbiro-rishon-letzion",
  "avisror-sde-dov",
  "sarfati-arnona-jerusalem",
];

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
