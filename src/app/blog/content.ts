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

export type ArticleBlock =
  | { type: "lead"; text: string }
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "stats"; items: { label: string; value: string }[] };

export type BlogArticle = {
  slug: string;
  title: string;
  category: BlogCategory;
  /** Display date, DD.MM.YY — echoes the reference's date treatment. */
  date: string;
  readingTime: string;
  image: string;
  /** Present only for articles with real written content; others fall back to the placeholder. */
  body?: ArticleBlock[];
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
      body: [
        {
          type: "lead",
          text: "מודל אדריכלי טוב הוא לא קישוט למשרד המכירות — הוא כלי השכנוע החזק ביותר שיש ליזם בדרך לחתימה. אבל כדי שהמודל באמת יעבוד, יש כמה החלטות שצריך לקבל הרבה לפני שמתחילים לחתוך חומר.",
        },
        {
          type: "heading",
          text: "1. להגדיר את המטרה של המודל",
        },
        {
          type: "paragraph",
          text: "מודל שנועד לעמוד במשרד מכירות ולשכנע רוכשים בודדים שונה מהותית ממודל שמיועד לתערוכה, לוועדת תכנון או לדירקטוריון. לפני שפונים ליצרן, כדאי להגדיר מי הקהל, איפה המודל יעמוד, וכמה זמן הוא צריך 'לחיות' — כי זה קובע את קנה המידה, את רמת הפירוט ואת התקציב.",
        },
        {
          type: "heading",
          text: "2. לבחור קנה מידה שמשרת את הסיפור",
        },
        {
          type: "paragraph",
          text: "קנה מידה גדול מדי מייקר את הפרויקט בלי תועלת שיווקית; קנה מידה קטן מדי מאבד את הפרטים שמוכרים — מרפסות, חזיתות, נוף. הכלל הפשוט: ככל שהמודל מתמקד בבניין בודד ובדירות, עדיף קנה מידה גדול יותר (1:100–1:50); ככל שהמטרה להראות פרויקט שלם בהקשר עירוני, עוברים לקני מידה קטנים יותר (1:500–1:200).",
        },
        {
          type: "image",
          src: "/projects/gindi-bait-bapark.jpg",
          alt: "מודל אדריכלי מפורט של פרויקט מגורים",
          caption: "מודל בקנה מידה 1:100, כולל תאורה פנימית ופיתוח סביבתי.",
        },
        {
          type: "quote",
          text: "היזמים שמצליחים הכי הרבה עם המודל שלהם הם אלה שמגיעים אלינו עם תשובה ברורה לשאלה אחת: מה אנחנו רוצים שהרוכש ירגיש כשהוא מסתכל על זה?",
          attribution: "מצוות הייצור של Print3D",
        },
        {
          type: "heading",
          text: "3. לתכנן זמן ותקציב מראש",
        },
        {
          type: "paragraph",
          text: "מודל אדריכלי איכותי דורש עבודה משולבת של תכנון, הדפסת תלת מימד, גימור ידני והרכבה — תהליך שיכול לקחת בין שבועיים לחודשיים בהתאם למורכבות. יזמים שמשלבים את הזמנת המודל כבר בשלב התכנון השיווקי חוסכים לעצמם לחץ מיותר סמוך להשקה.",
        },
        {
          type: "stats",
          items: [
            { label: "זמן ייצור ממוצע", value: "3-6 שבועות" },
            { label: "טווח קני מידה נפוצים", value: "1:500 - 1:50" },
            { label: "פרויקטים שהופקו", value: "120+" },
          ],
        },
        {
          type: "heading",
          text: "4. לבדוק את היכולת לשלב טכנולוגיה",
        },
        {
          type: "paragraph",
          text: "תאורת LED, זיהוי מגע ואינטגרציה עם מסכים הופכים מודל סטטי לחוויה. לא כל מודל צריך את זה, אבל כדאי לשאול את היצרן מראש אם המודל בנוי כך שאפשר יהיה להוסיף שכבות טכנולוגיות בעתיד בלי לפרק הכול מחדש.",
        },
      ],
    },
    {
      slug: "scale-models-real-estate-marketing",
      title: 'איך מודל פיזי מגדיל מכירות בפרויקט נדל"ן',
      category: "תובנות",
      date: "18.06.26",
      readingTime: "7 דקות קריאה",
      image: "/projects/shikun-binui-or-yam.jpg",
      body: [
        {
          type: "lead",
          text: "בעולם שבו כל פרויקט נדל\"ן מגיע עם הדמיות מרהיבות וסיורי VR, יש משהו שדווקא המודל הפיזי הישן והטוב עדיין עושה טוב יותר מכל טכנולוגיה: הוא גורם לרוכש לעצור.",
        },
        {
          type: "heading",
          text: "המגע שההדמיה לא נותנת",
        },
        {
          type: "paragraph",
          text: "מחקרי חוויית משתמש במשרדי מכירות מראים שוב ושוב: רוכשים מבלים זמן רב יותר ליד מודל פיזי מאשר ליד מסך. יש משהו בתלת-ממד המוחשי — היכולת לסובב, להתקרב, להצביע על הדירה הספציפית — שיוצר תחושת בעלות עוד לפני החתימה.",
        },
        {
          type: "image",
          src: "/projects/shikun-binui-or-yam.jpg",
          alt: "מודל אדריכלי של פרויקט מגורים על חוף הים",
          caption: "מודל פרויקט מגורים, כולל פיתוח סביבתי וקו חוף.",
        },
        {
          type: "heading",
          text: "כלי מכירה, לא רק כלי תצוגה",
        },
        {
          type: "paragraph",
          text: "אנשי מכירות מנוסים משתמשים במודל כתסריט שיחה: הם מתחילים מהתמונה הרחבה — המיקום, הסביבה, הנוף — ואז 'נוחתים' עם האצבע על הבניין והדירה הרלוונטית. זה הופך שיחת מכירה למסע מודרך, ומקצר משמעותית את הדרך מהתעניינות להחלטה.",
        },
        {
          type: "quote",
          text: "אחרי שהוספנו מודל פיזי למשרד המכירות, שמנו לב שזמן השהייה של רוכשים באזור המכירה עלה משמעותית, ויחד איתו גם קצב הסגירות.",
          attribution: "לקוח, יזם נדל\"ן מרכזי",
        },
        {
          type: "heading",
          text: "השקעה שמחזירה את עצמה",
        },
        {
          type: "paragraph",
          text: "עלות מודל אדריכלי מקצועי היא שולית ביחס לתקציב השיווק הכולל של פרויקט נדל\"ן, אבל ההשפעה שלו על תחושת האמון והרצינות שהפרויקט משדר — גבוהה בהרבה מהעלות היחסית שלו.",
        },
        {
          type: "stats",
          items: [
            { label: "זמן שהייה ממוצע ליד מודל", value: "כ-4 דקות" },
            { label: "פרויקטים עם מודל במשרד המכירות", value: "רוב הפרויקטים המובילים" },
            { label: "עלות יחסית מתקציב שיווק", value: "פחות מ-1%" },
          ],
        },
        {
          type: "heading",
          text: "מתי המודל הכי אפקטיבי",
        },
        {
          type: "paragraph",
          text: "המודל עובד הכי טוב כשהוא מוצג לצד חומרים משלימים — הדמיות, סרטון פרויקט ותוכניות דירות — ולא לבדו. השילוב בין המוחשי לדיגיטלי הוא מה שבונה את התמונה המלאה בראש הרוכש.",
        },
      ],
    },
    {
      slug: "architectural-model-pricing-2026",
      title: "כמה עולה מודל אדריכלי? מדריך תמחור 2026",
      category: "תמחור",
      date: "27.05.26",
      readingTime: "8 דקות קריאה",
      image: "/projects/gindi-bait-bapark.jpg",
      body: [
        {
          type: "lead",
          text: "אחת השאלות הראשונות שכל יזם שואל היא הכי פשוטה ולעתים הכי קשה לענות עליה: כמה זה עולה? הנה פירוט של הגורמים שבאמת קובעים את המחיר של מודל אדריכלי ב-2026.",
        },
        {
          type: "heading",
          text: "גודל וקנה מידה",
        },
        {
          type: "paragraph",
          text: "ככל שקנה המידה גדול יותר (למשל 1:50 לעומת 1:500), כך יש יותר פרטים לייצר, לגמר ולהרכיב — וזה משפיע ישירות על העלות. פרויקט שדורש להראות בניין בודד לעומק שונה לגמרי מפרויקט שמציג שכונה שלמה בתמונת-על.",
        },
        {
          type: "heading",
          text: "רמת הפירוט והגימור",
        },
        {
          type: "paragraph",
          text: "מודל בסיסי עם נפחים אחידים וצבע לבן נקי עולה פחות ממודל עם חזיתות מפורטות, זיגוג, גינון מלאכותי ותאורה פנימית. הבחירה כאן היא לא רק אסתטית — היא צריכה להתאים למטרת המודל ולקהל היעד שלו.",
        },
        {
          type: "image",
          src: "/projects/levinstein.jpg",
          alt: "מודל אדריכלי עם רמת פירוט גבוהה וגימור חזיתות",
          caption: "גימור חזיתות ברמת פירוט גבוהה מעלה את עלות הייצור אך משפר משמעותית את חוויית הצפייה.",
        },
        {
          type: "heading",
          text: "טכנולוגיה מוספת",
        },
        {
          type: "paragraph",
          text: "תאורת LED מתוכנתת, אינטראקציה עם מסך מגע, או מנגנוני הרמה והזזה של חלקים במודל — כל אלה מוסיפים שכבת עלות משלהם, אבל גם הופכים את המודל לחוויה שנשארת בזיכרון.",
        },
        {
          type: "stats",
          items: [
            { label: "מודל בסיסי (1:500, ללא תאורה)", value: "מ-₪8,000" },
            { label: "מודל בינוני (1:200, תאורה חלקית)", value: "מ-₪18,000" },
            { label: "מודל פרימיום (1:100, תאורה מלאה)", value: "מ-₪35,000" },
          ],
        },
        {
          type: "quote",
          text: "המחיר הכי נמוך לא תמיד הכי משתלם. מודל שמשכנע רוכש אחד נוסף מחזיר את ההשקעה שלו פי כמה.",
          attribution: "מצוות הייעוץ של Print3D",
        },
        {
          type: "heading",
          text: "לוחות זמנים כגורם מחיר",
        },
        {
          type: "paragraph",
          text: "הזמנה דחופה שדורשת עבודה בסופי שבוע או קיצור זמני ייצור סטנדרטיים תיתמע בתוספת עלות. תכנון מוקדם, כבר בשלב האדריכלות, הוא הדרך הכי בטוחה לשמור על תקציב הגיוני.",
        },
      ],
    },
    {
      slug: "physical-model-vs-digital-render",
      title: "מודל אדריכלי מול הדמיה דיגיטלית",
      category: "השוואות",
      date: "09.05.26",
      readingTime: "5 דקות קריאה",
      image: "/projects/preshkovsky-tabaa.jpg",
      body: [
        {
          type: "lead",
          text: "הדמיה דיגיטלית ומודל פיזי אינם מתחרים זה בזה — הם משרתים צרכים שונים. אבל כשצריך לבחור איפה להשקיע קודם, כדאי להבין מה כל אחד מהם נותן ומה הוא לא יכול לתת.",
        },
        {
          type: "heading",
          text: "מה שהדמיה עושה טוב",
        },
        {
          type: "paragraph",
          text: "הדמיה דיגיטלית גמישה, זולה יחסית לעדכן, ומאפשרת להראות אור טבעי, זמן יום ומצב רוח בקלות. היא מצוינת לשיווק דיגיטלי, אתרי אינטרנט ורשתות חברתיות — כל מקום שבו הצפייה מתרחשת מרחוק, על מסך.",
        },
        {
          type: "heading",
          text: "מה שרק מודל פיזי נותן",
        },
        {
          type: "paragraph",
          text: "מודל פיזי הוא נוכחות. הוא לא נעלם כשסוגרים חלון דפדפן, הוא לא תלוי בחיבור אינטרנט, והוא יוצר אינטראקציה גופנית — רוכש שמסתובב סביבו, מתכופף להסתכל מזווית של הדירה שלו, קורא לבן/בת הזוג להצביע יחד על הבניין. זו חוויה שיווקית שהדמיה, כמה שתהיה מרשימה, לא יכולה לשחזר במשרד מכירות פיזי.",
        },
        {
          type: "image",
          src: "/projects/preshkovsky-tabaa.jpg",
          alt: "מודל אדריכלי מוצג לצד הדמיה דיגיטלית",
          caption: "שילוב בין מודל פיזי להדמיה דיגיטלית במשרד מכירות.",
        },
        {
          type: "quote",
          text: "אנחנו לא ממליצים לבחור אחד על חשבון השני. הפרויקטים הכי חזקים שראינו משלבים את שניהם — כל אחד במקום הנכון בתהליך המכירה.",
          attribution: "מצוות הייצור של Print3D",
        },
        {
          type: "heading",
          text: "טבלת החלטה מהירה",
        },
        {
          type: "paragraph",
          text: "שיווק דיגיטלי, קמפיינים ורשתות חברתיות — הדמיה. משרד מכירות, אירועי השקה ותערוכות — מודל פיזי. הצגה לוועדות תכנון ולדירקטוריון — לרוב שניהם ביחד עובדים הכי טוב.",
        },
        {
          type: "stats",
          items: [
            { label: "עדכון הדמיה", value: "שעות עד ימים" },
            { label: "ייצור מודל פיזי", value: "שבועות" },
            { label: "אורך חיים של מודל", value: "שנים, לאורך כל תקופת המכירה" },
          ],
        },
      ],
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
