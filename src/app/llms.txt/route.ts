import { BUSINESS_HOURS, CONTACT } from "@/lib/constants";
import { SERVICES, WHO_FOR } from "@/lib/content";
import { PORTFOLIO_PROJECTS } from "@/lib/portfolioContent";
import { absoluteUrl } from "@/lib/schema";
import { BLOG_2 } from "../knowledge/content";
import { GLOSSARY_TERMS } from "../knowledge/glossary";

/**
 * /llms.txt — a plain-markdown map of the site for AI assistants and answer
 * engines (the llmstxt.org format): who Print3D is, what it makes, and where
 * the substantive pages are. Built from the same content sources the pages
 * render, so it cannot drift from the site; prerendered at build time.
 *
 * The articles and projects lists follow the live content automatically —
 * hidden projects are already filtered out of PORTFOLIO_PROJECTS.
 */
export const dynamic = "force-static";

const link = (title: string, path: string, note?: string) =>
  `- [${title}](${absoluteUrl(path)})${note ? `: ${note}` : ""}`;

const projects = PORTFOLIO_PROJECTS.flatMap((p) =>
  p.href
    ? [link(p.title, p.href, `קנה מידה ${p.scale} · לקוח: ${p.client}`)]
    : []
);

const body = [
  "# Print3D — פרינט תלת מימד",
  "",
  "> Print3D מתכננת ומייצרת מודלים אדריכליים פיזיים לפרויקטי נדל״ן בישראל — למשרדי מכירות, לוועדות תכנון ולרשויות — בהדפסת תלת מימד, חיתוך לייזר וגימור יד אומן, כבר יותר מ־15 שנה.",
  "> Print3D designs and builds physical architectural scale models for real-estate projects in Israel.",
  "",
  WHO_FOR.paragraph,
  "",
  "תחומי עבודה:",
  ...SERVICES.cards.map((c) => `- ${c.title} — ${c.text}`),
  "",
  `יצירת קשר: טלפון ${CONTACT.phone} · דוא״ל ${CONTACT.email} · ${CONTACT.address} · שעות פעילות ${BUSINESS_HOURS.daysLabel} ${BUSINESS_HOURS.opens}–${BUSINESS_HOURS.closes}`,
  "",
  "## עמודים מרכזיים",
  link("דף הבית", "/", "סקירת השירותים, הלקוחות ותהליך העבודה"),
  link("אודות", "/about", "מי אנחנו ואיך אנחנו עובדים"),
  link("קטלוג פרויקטים", "/projects", "מודלים שייצרנו ליזמים מובילים"),
  link("שאלות נפוצות", "/faq", "זמני ייצור, מחיר, קנה מידה ותהליך"),
  link("יצירת קשר", "/contact", "קבלת הצעת מחיר"),
  "",
  "## מדריכים ומאמרים",
  ...BLOG_2.items.map((a) =>
    link(a.title, `/knowledge/${a.slug}`, a.metaDescription)
  ),
  "",
  "## פרויקטים",
  ...projects,
  "",
  "## מילון מונחים",
  link(
    "מילון מונחים למודלים אדריכליים",
    "/knowledge/glossary",
    `${GLOSSARY_TERMS.length} מונחים מעולם המודלים האדריכליים, עם הגדרה לכל מונח`
  ),
  "",
  "## Optional",
  link("מרכז הידע", "/knowledge"),
  link("מדיניות פרטיות", "/legal/privacy"),
  link("תנאי שימוש", "/legal/terms"),
  link("הצהרת נגישות", "/legal/accessibility"),
  "",
].join("\n");

export function GET() {
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
