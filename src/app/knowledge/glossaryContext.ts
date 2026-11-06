/** Editorial context for broad planning terms that do not mention models in
 * their definitions. These are examples of how the concept can be represented,
 * not claims that a particular client project contains the feature. */
export const MODEL_CONTEXT: Record<string, string> = {
  facade: "במודל אדריכלי אפשר להמחיש את קצב הפתחים, חומרי החיפוי והיחס בין החזית לרחוב, כך שהיזם והמתכננים רואים את הבניין כמכלול.",
  "site-plan": "מודל של המתחם מתרגם את תוכנית ההעמדה למרחב מוחשי: מיקום המבנים, המרחקים ביניהם, הכניסות והשטחים הפתוחים נראים יחד.",
  "mixed-use": "במודל מתחם אפשר להבחין בין אזורי מגורים, מסחר ותעסוקה ולראות כיצד הכניסות והשטחים הציבוריים מחברים ביניהם.",
  "commercial-building": "מודל אדריכלי של מבנה מסחרי יכול להציג את החזיתות, הכניסות, דרכי הגישה והקשר של הבניין לרחוב או למתחם שסביבו.",
  "public-building": "מודל פיזי של מבנה ציבור יכול להראות את מיקומו בשכונה, את דרכי הגישה ואת היחס בינו לבין שטחים פתוחים ומבנים סמוכים.",
  "urban-planning": "מודל עירוני מציג החלטות תכנון בקנה מידה אחד: גובה המבנים, רצף הרחובות, השטחים הירוקים והקשר בין המתחמים.",
  "green-areas": "במודל שכונתי אפשר לסמן פארקים, חצרות ושדרות ולבחון כיצד הם מתחברים לבניינים, למדרכות ולכניסות.",
  parking: "מודל אדריכלי יכול להציג את מיקום החניון והכניסות אליו; כשחשוב להסביר מפלסים תת־קרקעיים, ניתן להיעזר גם בחתך של המתחם.",
  infrastructure: "במודל תכנוני אפשר להמחיש תשתיות גלויות כמו כבישים, גשרים וכניסות למתחם, לצד מסלולי התנועה שהן יוצרות.",
  "road-network": "מודל עירוני מאפשר לראות את היררכיית הרחובות, הצמתים ודרכי הגישה ביחס למבנים ולשטחים הציבוריים.",
  "building-permit": "לקראת הצגת תכנון לרשות, מודל פיזי עשוי לסייע בהמחשת נפח הבנייה והשתלבות המבנה בסביבתו; הוא אינו מחליף תוכניות ומסמכי היתר.",
  tashrit: "תשריט מדויק יכול לשמש בסיס למיקום המגרש והמבנים במודל תכנוני, אך המודל הוא כלי המחשה ואינו מסמך מדידה מחייב.",
  taba: "מודל תכנוני יכול להמחיש את הבינוי שמאפשרת התב״ע ואת היחס בינו לבין המרחב הקיים, בלי להחליף את המסמכים הסטטוטוריים.",
  "housing-unit": "במודל של פרויקט מגורים מציגים לעיתים את מספר המבנים, גובהם והקשר בין הדירות לשטחים המשותפים; תכנון יחידת דיור עצמה דורש תוכניות מפורטות.",
  "built-area": "מודל נפחי יכול להמחיש את היקף הבנייה המוצעת ואת היחס בין המסה הבנויה לשטח המגרש ולמבנים סמוכים.",
  "main-area": "כאשר מציגים חלוקה פנימית במודל חתך או במודל קומות נשלפות, ניתן להבדיל בין השטח העיקרי לשטחים הנלווים.",
  "service-area": "מודל חתך או קומות נשלפות יכול לעזור להסביר את היחס בין חללים עיקריים לשטחי שירות, בהתאם לרמת הפירוט הנדרשת.",
  "piloti-floor": "במודל אדריכלי ניתן להציג קומת עמודים פתוחה ואת המעבר שהיא יוצרת בין הרחוב, הכניסה למבנה והשטח הציבורי.",
  "green-roof": "מודל המציג את גג המבנה מלמעלה יכול להמחיש את חלוקת שטחי הצמחייה, אזורי השהייה והמערכות שעל הגג.",
  "commercial-facade": "במודל של רחוב מסחרי אפשר להציג את חזית החנויות, רצף הפתחים, המדרכה והקשר לקומות שמעליהן.",
  "mamad-safe-room": "במודל חתך או במודל קומות נשלפות אפשר להראות את מיקום הממ״ד ביחס לדירה, אך הפרטים ההנדסיים נקבעים בתוכניות המחייבות.",
  "sun-balcony": "במודל מגורים המרפסות עוזרות להבין את מקצב החזית, את כיווני הפנייה ואת הקשר בין הדירות למרחב החיצוני.",
  pergola: "במודל אדריכלי פרגולה יכולה להמחיש הצללה ואופי של מרפסת, גג או חצר, במיוחד כשחשוב להראות את המפגש עם הבניין.",
  "green-boulevard": "מודל שכונתי יכול להראות כיצד שדרה ירוקה מחברת בין מבנים, כיכרות, שבילים ומוקדי פעילות לאורך הרחוב.",
  "urban-square": "במודל עירוני הכיכר היא נקודת ייחוס להבנת המרחקים בין המבנים, החזיתות הפעילות ותנועת הולכי הרגל.",
  "bike-path": "במודל שכונתי ניתן לסמן שביל אופניים כחלק ממערך התנועה ולבחון את הקשר שלו לרחובות, למעברי החצייה ולשטחים הפתוחים.",
  "employment-district": "מודל מתחם תעסוקה יכול להציג יחד את נפחי המשרדים, שטחי המסחר, הכניסות ודרכי הגישה בשעות פעילות שונות.",
  "shopping-mall": "מודל של מרכז מסחרי יכול להמחיש את מיקום החנויות והכניסות, את הקשר לחניה ואת השתלבות המבנה בסביבה העירונית.",
};

const URBAN_TERMS = new Set([
  "urban-model", "site-plan", "master-plan", "urban-renewal", "mixed-use",
  "public-building", "landscape", "urban-planning", "green-areas", "infrastructure",
  "road-network", "bridge", "planning-committee", "building-permit", "tashrit",
  "taba", "green-roof", "green-boulevard", "urban-square", "bike-path",
  "employment-district", "topography", "contour-lines", "miniature-trees",
  "street-furniture", "miniature-signage",
]);

const MARKETING_TERMS = new Set([
  "marketing-model", "sales-office-model", "commercial-building", "commercial-facade",
  "entrance-lobby", "shopping-mall", "interactive-model", "virtual-tour",
  "augmented-reality", "virtual-reality", "smart-home-display",
]);

const MATERIAL_TERMS = new Set([
  "resin", "pla", "petg", "abs", "pvc", "acrylic", "perspex", "mdf",
  "foam-board", "styrene", "wood", "led", "painting", "finishing", "gluing",
  "sanding", "primer", "lacquer", "ral-color", "fiber-optic-lighting",
]);

/** Match each glossary page to a useful guide and a real case study. */
export function glossaryResources(slug: string) {
  if (URBAN_TERMS.has(slug))
    return { article: "who-needs-architectural-models", project: "beit-hakerem" };
  if (MARKETING_TERMS.has(slug))
    return { article: "architectural-models-real-estate-marketing", project: "avisror-sde-dov" };
  if (MATERIAL_TERMS.has(slug))
    return { article: "architectural-model-materials", project: "levinstein" };
  return { article: "architectural-model-production-process", project: "levinstein" };
}
