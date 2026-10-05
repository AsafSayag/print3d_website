/**
 * Copy for the paid-traffic landing page (/lp/sales-model).
 *
 * Everything factual here is taken from claims the site already makes
 * elsewhere (lib/content.ts: BUSINESS_VALUE stats, FAQ answers, the one-business-
 * day quote promise). Nothing new is invented —
 * if a number changes on the main site, change it here too.
 */

export const LP_PATH = "/lp/sales-model";

/** Stable id for this surface in GA4 (`location` param) and the lead form. */
export const LP_LOCATION = "lp_sales_model";

export const LP_META = {
  title: "מודל אדריכלי שמוכר את הפרויקט",
  description:
    "מודל אדריכלי פיזי למשרד המכירות: הרוכש מבין מהר יותר, מתחבר חזק יותר ומחליט בביטחון. הצעת מחיר מסודרת תוך יום עסקים.",
} as const;

export const LP_HERO = {
  eyebrow: "מיועד למשרדי מכירות של פרויקטי נדל״ן",
  titleTop: "הרוכש לא קונה תוכנית.",
  titleBottom: "הוא קונה את מה שהוא מצליח לדמיין.",
  subtitle:
    "מודל פיזי מציג לרוכש את כל הפרויקט במבט אחד, והוא מחליט מהר יותר ובביטחון.",
  primaryCta: "קבלו הצעה לפרויקט שלכם",
  secondaryCta: "דברו איתנו בוואטסאפ",
  microcopy: "הצעת מחיר מסודרת תוך יום עסקים · בלי התחייבות",
  trust: ["15+ שנות ניסיון", "גימור יד אומן", "מדן ועד אילת"],
  image: {
    src: "/project_pages/avisror_costa_rica_jerusalem_project/bg.webp",
    alt: "מודל אדריכלי מואר של מגדלי מגורים, אביסרור קוסטה ריקה ירושלים",
  },
} as const;

export const LP_JOURNEY = {
  eyebrow: "מה קורה במשרד מכירות עם מודל",
  title: "ככה נראית פגישת מכירה שזורמת",
  steps: [
    {
      title: "הלקוח נכנס ורואה הכל",
      text: "הפרויקט עומד מולו בשלמותו: הבניינים, הרחובות, הגינות והאור. לא צריך להסביר. הוא מבין לבד.",
      image: {
        src: "/project_pages/aura_natania_project/IMG_01.webp",
        alt: "מודל אדריכלי מוצב במרכז משרד המכירות של אאורה נתניה",
        w: 1600,
        h: 1200,
      },
    },
    {
      title: "הלקוח מוצא את הבית שלו",
      text: "הוא מצביע על הקומה, רואה לאן פונה המרפסת ומה נשקף מהחלון. התוכנית הופכת למקום אמיתי.",
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

/** Same four figures as the homepage BUSINESS_VALUE module. */
export const LP_NUMBERS = {
  eyebrow: "מה זה עושה למכירות",
  title: "השקעה קטנה ביחס לפרויקט. השפעה גדולה על המכירה.",
  stats: [
    { end: 20, suffix: "%", label: "תקופת מכירה קצרה יותר", text: "החלטה מהירה יותר, פחות עלויות מימון ושיווק" },
    { end: 10, suffix: "%", label: "פוטנציאל השבחה", text: "תפיסת ערך חזקה יותר, פחות צורך בהנחות" },
    { end: 85, suffix: "%", label: "מעדיפים מוחשי על הדמיה", text: "הרוכש רואה, מבין ומתחבר" },
    { end: 81, suffix: "%", label: "יותר ביטחון בהחלטה", text: "הצוות מפסיק להסביר ומתמקד בסגירה" },
  ],
  bannerTop: "לעיתים די בשיפור של עסקה אחת",
  bannerBottom: "כדי להחזיר את מלוא ההשקעה במודל.",
  cta: "בואו נבדוק את זה על הפרויקט שלכם",
  image: {
    src: "/project_pages/maoz_daniel_bat_yam_project/IMG_01.webp",
    alt: "",
  },
} as const;

/**
 * Showcase carousel — one project per slide. Photos picked for clean, lit,
 * landscape shots; only projects that are public on the main site (none in
 * HIDDEN_PROJECT_SLUGS). `client` is the large caption, `project` the small one.
 */
export const LP_SHOWCASE = {
  eyebrow: "מהשטח",
  title: "מה שהיזמים המובילים כבר מציבים במשרדי המכירות",
  ctaLead: "רוצים שגם הפרויקט שלכם ייראה ככה?",
  cta: "קבלו הצעה לפרויקט שלכם",
  items: [
    {
      src: "/project_pages/avisror_costa_rica_jerusalem_project/IMG_01.webp",
      alt: "מגדלי מגורים מוארים ופארק שכונתי במודל אדריכלי, אביסרור קוסטה ריקה ירושלים",
      w: 2000,
      h: 1500,
      client: "אביסרור",
      project: "קוסטה ריקה, ירושלים",
    },
    {
      src: "/project_pages/levinstein_project/GAL_02.webp",
      alt: "מגדל מגורים מואר עם מרפסות ובריכת גג במודל אדריכלי, מגדלי לוינשטיין",
      w: 2048,
      h: 1536,
      client: "לוינשטיין הנדסה",
      project: "מגדלי לוינשטיין",
    },
    {
      src: "/project_pages/shbiro_rishon_letzion_project/IMG_02.webp",
      alt: "מודל שכונה שלמה עם מגדלים, רחובות ופארקים במשרד המכירות של שבירו",
      w: 2048,
      h: 1536,
      client: "שבירו",
      project: "ראשון לציון",
    },
    {
      src: "/project_pages/dafna_tidhar_project/IMG_06.webp",
      alt: "בנייני מגורים מוארים סביב חצר פנימית מגוננת במודל אדריכלי, תדהר דפנה",
      w: 2048,
      h: 1536,
      client: "תדהר",
      project: "דפנה",
    },
    {
      src: "/project_pages/maoz_daniel_bat_yam_project/IMG_11.webp",
      alt: "שלושה מגדלי מגורים מוארים מעל גן משחקים במודל אדריכלי, מעוז דניאל בת ים",
      w: 2000,
      h: 1500,
      client: "מעוז דניאל",
      project: "כצנלסון, בת ים",
    },
    {
      src: "/project_pages/sela_baitar_hadera_project/IMG_07.webp",
      alt: "זוג מגדלים מוארים מעל קומת מסחר וצומת רחובות במודל אדריכלי, סלע ביתר חדרה",
      w: 1600,
      h: 1200,
      client: "סלע ביתר",
      project: "חדרה",
    },
    {
      src: "/project_pages/ram_aderet_givat_hamatos_project/IMG_01.webp",
      alt: "שכונת מגורים מוארת עם פארק ומגרשי משחק במודל אדריכלי, רם אדרת גבעת המטוס",
      w: 2000,
      h: 1500,
      client: "רם אדרת",
      project: "גבעת המטוס, ירושלים",
    },
  ],
} as const;

export const LP_PROCESS = {
  eyebrow: "פשוט להתחיל",
  title: "שלושה צעדים, ואתם שם",
  steps: [
    {
      title: "שולחים לנו מה שיש",
      text: "תוכניות, הדמיות, או רק שם הפרויקט ולוח הזמנים. גם בלי קבצים מלאים נוכל לתת הערכה ראשונית.",
    },
    {
      title: "מקבלים הצעה תוך יום עסקים",
      text: "קנה מידה מומלץ, רמת פירוט, לוח זמנים ומחיר. הכל כתוב ומסודר.",
    },
    {
      title: "המודל מגיע למשרד המכירות",
      text: "זמן הייצור נקבע לפי גודל הפרויקט וסוגו, ותקבלו לוח זמנים מדויק כבר בהצעה. מה שלא משתנה הוא האיכות: גימור ללא פשרות, בכל פרט ובכל קנה מידה.",
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
