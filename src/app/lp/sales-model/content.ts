/**
 * Copy for the paid-traffic landing page (/lp/sales-model).
 *
 * Everything factual here is taken from claims the site already makes
 * elsewhere (lib/content.ts: BUSINESS_VALUE stats, FAQ answers, the one-business-
 * day quote promise). Nothing new is invented —
 * if a number changes on the main site, change it here too.
 */

export const LP_PATH = "/lp/sales-model";
export const LP_THANK_YOU_PATH = `${LP_PATH}/thank-you`;

/** Stable id for this surface in GA4 (`location` param) and the lead form. */
export const LP_LOCATION = "lp_sales_model";

export const LP_META = {
  title: "מודל אדריכלי שמוכר את הפרויקט",
  description:
    "מודל אדריכלי פיזי למשרד המכירות: הרוכש מבין מהר יותר, מתחבר חזק יותר ומחליט בביטחון. הצעת מחיר מסודרת תוך יום עסקים.",
} as const;

export const LP_HERO = {
  /** Names the product, not one kind of buyer — an "only for sales offices"
   *  line made everyone without one feel the page wasn't for them. */
  eyebrow: "מודלים אדריכליים פיזיים לפרויקטי נדל״ן",
  /** Leads with what sets a model apart from the renders every project
   *  already has, instead of a promise a render studio could make too. */
  titleTop: "הדמיה מסבירה את הפרויקט.",
  titleBottom: "מודל מוכר אותו.",
  subtitle:
    "מודל פיזי מציג לרוכש את כל חווית המגורים במבט אחד, והוא מחליט מהר יותר ובביטחון.",
  primaryCta: "קבלו הצעה לפרויקט שלכם",
  secondaryCta: "דברו איתנו בוואטסאפ",
  microcopy: "הצעת מחיר מסודרת תוך יום עסקים · בלי התחייבות",
  /** Concrete service promises (all from the main site's FAQ). Experience and
   *  project count live in the logos line right below, so they aren't
   *  repeated here. */
  trust: ["גימור ידני בכל פרט", "אישור שלכם לפני הייצור", "הובלה והצבה בכל הארץ"],
  /** A retouched copy of project_pages/bonei_binyan_hahagana_raanana_project/
   *  IMG_06.webp: the grey wall behind the model is replaced with the page's
   *  dark navy (with a soft warm spill), and the model itself is sharpened and
   *  given more local contrast — so the lit model glows like in a dark
   *  showroom. Lives outside project_pages/, whose folders only accept the
   *  project-page file names. */
  image: {
    src: "/landing/sales-model-hero-raanana-desktop.webp",
    alt: "מודל אדריכלי מואר של שני בנייני מגורים עם גינה וחניה, בוני בניין ההגנה רעננה",
  },
  /** `image` is cropped to x 300–1900, y 120–1380 of the 2000×1500 retouch
   *  (room on the copy side so the fade never reaches the towers). Phones get
   *  a portrait crop of the retouch instead: x 700–1825, full height (centred
   *  on the right-hand building), resized to 900×1200. */
  imageMobile: {
    src: "/landing/sales-model-hero-raanana-mobile.webp",
  },
} as const;

export const LP_JOURNEY = {
  eyebrow: "מה קורה במשרד מכירות עם מודל",
  title: "ככה נראית פגישת מכירה שזורמת",
  steps: [
    {
      title: "הלקוח נכנס ומבין הכל ברגע",
      text: "זה רגע ה-WOW. מולו עומדת חווית המגורים עצמה: הבניינים, הרחובות והגינות, כיווני האוויר והשמש, איפה השכנים ומה נשקף מכל כיוון. מה שכלים וירטואליים מסבירים לאורך זמן, הוא מבין במבט אחד.",
      image: {
        src: "/project_pages/aura_natania_project/IMG_01.webp",
        alt: "מודל אדריכלי מוצב במרכז משרד המכירות של אאורה נתניה",
        w: 1600,
        h: 1200,
      },
    },
    {
      title: "הלקוח בוחר את הבית שלו",
      text: "הוא לא מצביע על קומה, הוא בוחר אותה. רואה את עצמו במרפסת עם כוס קפה, ומבין איזה שדרוג מחכה לחיים שלו בבית החדש שהרגע בחר לעצמו.",
      image: {
        src: "/project_pages/avisror_ramat_hasharon_project/bg.webp",
        alt: "מבט מקרוב על חזית ומרפסות במודל אדריכלי, אביסרור רמת השרון",
        w: 2000,
        h: 1500,
      },
    },
    {
      title: "הלקוח מרגיש את הסביבה",
      text: "שבילים, גינות, תאורה ודמויות. הוא כבר מדמיין את הבוקר הראשון שלו שם.",
      image: {
        src: "/project_pages/dafna_tidhar_project/bg.webp",
        alt: "חצר פנימית מגוננת ומוארת במודל אדריכלי, תדהר דפנה",
        w: 2048,
        h: 1536,
      },
    },
    {
      title: "הלקוח מחליט בביטחון",
      text: "פחות שאלות פתוחות, פחות חשש, פחות לחץ על המחיר. השיחה עוברת מ״האם״ ל״איזו דירה״.",
      image: {
        src: "/project_pages/sarfati_arnona_jerusalem_project/bg.webp",
        alt: "מודל אדריכלי על שולחן תצוגה במשרד מכירות, צרפתי ארנונה ירושלים",
        w: 2000,
        h: 1500,
      },
    },
  ],
} as const;

/** Same four figures as the homepage BUSINESS_VALUE module. Framed as what
 *  clients report: these are the numbers developers measure on their own
 *  projects, and the reason they come back for the next one. */
export const LP_NUMBERS = {
  eyebrow: "הלקוחות שלנו מספרים",
  /** Two sentences, each kept on its own line(s) so a phone never breaks
   *  between "לפרויקט." and "השפעה". */
  titleTop: "השקעה קטנה ביחס לפרויקט.",
  titleBottom: "השפעה גדולה על המכירה.",
  intro:
    "אלה המדדים שהיזמים שעובדים איתנו מודדים בפרויקטים שלהם, ובגללם הם חוזרים אלינו בכל פרויקט חדש.",
  stats: [
    // "Financing costs" was dropped from the first card: it read as ambiguous
    // (the buyer's mortgage? the sales office?).
    { end: 20, suffix: "%", label: "תקופת מכירה קצרה יותר", text: "החלטה מהירה יותר ופחות עלויות שיווק" },
    { end: 10, suffix: "%", label: "פוטנציאל השבחה", text: "תפיסת ערך חזקה יותר, פחות צורך בהנחות" },
    { end: 85, suffix: "%", label: "מעדיפים מוחשי על הדמיה", text: "הרוכש רואה, מבין ומתחבר" },
    { end: 81, suffix: "%", label: "יותר ביטחון בהחלטה", text: "הצוות מפסיק להסביר ומתמקד בסגירה" },
  ],
  bannerTop: "לעיתים די בשיפור של עסקה אחת",
  bannerBottom: "כדי להחזיר את מלוא ההשקעה במודל.",
  cta: "בואו נבדוק את זה על הפרויקט שלכם",
} as const;

/**
 * Showcase carousel — one project per slide, chosen to show range rather
 * than seven variations of one shot: the slides alternate between the whole
 * model seen from afar, a close-up on a detail, lit buildings, and the
 * landscaping that tells the living story — and between angles, distances and
 * day/night light, so no two neighbours look alike. Only projects that are
 * public on the main site (none in HIDDEN_PROJECT_SLUGS), and none of the
 * photos already used elsewhere on this page. `client` is the large caption,
 * `project` the small one.
 */
export const LP_SHOWCASE = {
  eyebrow: "מהשטח",
  title: "מה שהיזמים המובילים כבר מציבים במשרדי המכירות",
  ctaLead: "רוצים שגם הפרויקט שלכם ייראה ככה?",
  cta: "קבלו הצעה לפרויקט שלכם",
  items: [
    // Whole model, from afar — a full neighbourhood in the sales office.
    {
      src: "/project_pages/shbiro_rishon_letzion_project/IMG_01.webp",
      alt: "מודל של שכונה שלמה מוצב במשרד המכירות של שבירו, ראשון לציון",
      w: 2048,
      h: 1536,
      client: "שבירו",
      project: "ראשון לציון",
    },
    // Lighting — a tower at night.
    {
      src: "/project_pages/levinstein_project/GAL_02.webp",
      alt: "מגדל מגורים מואר עם מרפסות ובריכת גג במודל אדריכלי, מגדלי לוינשטיין",
      w: 2048,
      h: 1536,
      client: "לוינשטיין הנדסה",
      project: "מגדלי לוינשטיין",
    },
    // Close-up — a courtyard at eye level.
    {
      src: "/project_pages/dafna_tidhar_project/IMG_08.webp",
      alt: "מבט קרוב על חצר פנימית עם דקלים, שבילים ופנסים במודל אדריכלי, תדהר דפנה",
      w: 1600,
      h: 1200,
      client: "תדהר",
      project: "דפנה",
    },
    // Landscaping — the park and playgrounds that sell the neighbourhood.
    {
      src: "/project_pages/ram_aderet_givat_hamatos_project/IMG_01.webp",
      alt: "שכונת מגורים מוארת עם פארק ומגרשי משחק במודל אדריכלי, רם אדרת גבעת המטוס",
      w: 2000,
      h: 1500,
      client: "רם אדרת",
      project: "גבעת המטוס, ירושלים",
    },
    // Close-up at street level — shopfronts, trees and pavement.
    // (Not IMG_04: that one is a phone photo of a render on a screen.)
    {
      src: "/project_pages/rotem_shani_beit_shemesh_project/IMG_01.webp",
      alt: "מבט מגובה הרחוב על חזיתות מסחר, עצים ומדרכה במודל אדריכלי, רותם שני בית שמש",
      w: 2000,
      h: 1125,
      client: "רותם שני",
      project: "בית שמש",
    },
    // Lighting + landscaping, straight on — towers over the playground.
    {
      src: "/project_pages/maoz_daniel_bat_yam_project/IMG_11.webp",
      alt: "שלושה מגדלי מגורים מוארים מעל גן משחקים במודל אדריכלי, מעוז דניאל בת ים",
      w: 2000,
      h: 1500,
      client: "מעוז דניאל",
      project: "כצנלסון, בת ים",
    },
    // Daylight — street, gardens and buildings together.
    {
      src: "/project_pages/avney_derech_beit_shemesh_project/bg.webp",
      alt: "רחוב מתעקל, גינות ובנייני מגורים באור יום במודל אדריכלי, אבני דרך בית שמש",
      w: 2000,
      h: 1125,
      client: "אבני דרך",
      project: "בית שמש",
    },
  ],
} as const;

export const LP_PROCESS = {
  eyebrow: "פשוט להתחיל",
  title: "שלושה צעדים, ואתם שם",
  steps: [
    {
      title: "שולחים לנו מה שיש",
      text: "תוכניות, הדמיות, או תיאור של הפרויקט, לוח הזמנים וסדרי הגודל. גם בלי קבצים מלאים נוכל לתת הערכה ראשונית.",
    },
    {
      title: "מקבלים הצעה תוך יום עסקים",
      text: "המלצה מקצועית על קנה המידה ורמת הפירוט שיתאימו לפרויקט, לצד לוח זמנים ומחיר. הכל כתוב ומסודר.",
    },
    {
      title: "המודל מגיע מוכן להצגה",
      text: "אנחנו מייצרים, אורזים, מובילים ומציבים את המודל בכל מקום בארץ. ולאורך כל הדרך: איכות ללא פשרות ושירות מהיר ומקצועי.",
    },
  ],
} as const;

/** Objection handling — answers mirror FAQ_PAGE on the main site. */
export const LP_FAQ = {
  eyebrow: "לפני שמשאירים פרטים",
  title: "מה ששואלים אותנו הכי הרבה",
  items: [
    {
      q: "כמה עולה מודל אדריכלי?",
      a: "המחיר נגזר מהיקף הפרויקט, קנה המידה, רמת הפירוט והסביבה הנדרשת. מודל שיווקי למשרד מכירות מתומחר אחרת ממודל מתחם שלם. שלחו לנו את פרטי הפרויקט ותקבלו הצעת מחיר מסודרת תוך יום עסקים.",
    },
    {
      q: "כמה זמן לוקח לייצר מודל?",
      a: "זה תלוי בגודל הפרויקט ובסוג המודל, ולכן כל פרויקט מקבל לוח זמנים משלו כבר בהצעת המחיר. דבר אחד לא משתנה: אנחנו לא מקצרים תהליכים על חשבון האיכות. כל מודל עובר דוגמת ייצור ואישור שלכם לפני הייצור המלא, ומגיע בגימור ללא פשרות.",
    },
    {
      q: "מה צריך כדי לקבל הצעת מחיר?",
      a: "סוג הפרויקט, קנה המידה הרצוי אם ידוע, לוח הזמנים וקבצי התכנון אם יש. גם בלי קבצים מלאים נוכל לתת הערכה ראשונית.",
    },
  ],
} as const;

export const LP_FINAL = {
  eyebrow: "הצעד הבא",
  title: "הפרויקט שלכם ראוי שיראו אותו.",
  text: "ספרו לנו בכמה מילים על הפרויקט. נחזור אליכם תוך יום עסקים עם הצעה מסודרת, בלי התחייבות.",
  formTitle: "השאירו פרטים ונחזור אליכם",
  orCall: "מעדיפים לדבר עכשיו?",
  image: {
    src: "/project_pages/beit_hakerem_project/bg.webp",
    alt: "",
  },
} as const;

export const LP_HEADER_CTA = "קבלו הצעה";

/** Slim bottom rail on phones (LpMobileBar) — kept short so it stays one line. */
export const LP_MOBILE_BAR = {
  text: "הצעת מחיר תוך יום עסקים",
  cta: "קבלו הצעה",
} as const;
