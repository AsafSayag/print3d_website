import Image from "next/image";
import { ContactHero } from "@/components/ContactHero";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LegalJsonLd } from "@/components/legal/LegalJsonLd";
import { GlassButton } from "@/components/ui/GlassButton";
import { LeadForm } from "@/components/ui/LeadForm";
import { buildPageMeta } from "@/lib/pageMeta";

const path = "/partners";
const programName = "תוכנית השותפים של Print3D";
const title = "מכירים פרויקט שצריך מודל אדריכלי?";
const description =
  "חברו את הלקוחות שלכם ל־Print3D והציעו להם דרך להמחיש את הפרויקט במודל פיזי. אנחנו נטפל באפיון, בהצעת המחיר ובביצוע.";
const breadcrumbs = [{ label: "בית", href: "/" }, { label: "תוכנית השותפים" }];
const formHref = "#partnership";
const cta = "בדיקת התאמה לשותפות";

export const metadata = buildPageMeta({
  title: "תוכנית השותפים למודלים אדריכליים",
  description,
  path,
  index: false,
});

const opportunities = [
  {
    title: "פתיחת משרד מכירות",
    description: "מודל פיזי עוזר לרוכשים להבין איפה תהיה הדירה שלהם ואיך היא משתלבת בבניין ובסביבה.",
    image: "/projects/avisror-sde-dov.jpg",
    alt: "מודל אדריכלי של פרויקט אביסרור בשדה דב",
  },
  {
    title: "השקת פרויקט",
    description: "לקראת השקה או פגישת משקיעים, מודל נותן לקהל דרך לראות את הפרויקט בקנה מידה אחד.",
    image: "/projects/sarfati-arnona-jerusalem.jpg",
    alt: "מודל אדריכלי של פרויקט צרפתי בארנונה",
  },
  {
    title: "מתחם שקשה להסביר בתמונה",
    description: "כשיש כמה בניינים, מפלסים או שלבי בנייה, המודל עוזר להבין איך כל החלקים מתחברים.",
    image: "/projects/gindi-bait-bapark.jpg",
    alt: "מודל אדריכלי של מתחם גינדי בית בפארק",
  },
];

const steps = [
  ["מזהים פרויקט מתאים", "חושבים על לקוח שמכין השקה, פותח משרד מכירות או צריך להמחיש מתחם מורכב."],
  ["יוצרים את החיבור", "מעבירים את פרטי הפרויקט בשלב הרישום. אנחנו בודקים התאמה ומאשרים את ההזדמנות בכתב."],
  ["אנחנו מקדמים את הפרויקט", "אנחנו מנהלים את האפיון, התמחור והמכירה. כשפרויקט מתקדם לייצור, אנחנו מטפלים גם בביצוע."],
];

const questions = [
  ["אפשר לפנות גם בלי פרויקט כרגע?", "כן. אפשר להכיר את התוכנית עכשיו ולפנות אלינו כשעולה פרויקט מתאים."],
  ["אפשר להיות מעורבים בשיחת המכירה?", "כן. בהזדמנויות שנאשר מראש אפשר גם להוביל את השיחה המסחרית, על בסיס הצעת מחיר ש־Print3D מכינה ומאשרת."],
  ["מה צריך להכין כשיש פרויקט?", "אפשר להתחיל עם תיאור קצר של הצורך. אחרי שנדבר, נוכל לבדוק תכניות או הדמיות שכבר זמינות לפרויקט."],
];

export default function PartnersPage() {
  return (
    <>
      <LegalJsonLd title={programName} description={description} path={path} breadcrumbs={breadcrumbs} />
      <Header />
      <main id="main" className="flex-1">
        <ContactHero
          eyebrow={programName}
          title={title}
          description={description}
          breadcrumbs={breadcrumbs}
          background="blueprint"
          action={<GlassButton href={formHref} variant="primary">{cta}</GlassButton>}
        />

        <section className="surface-ice section" aria-labelledby="partner-fit">
          <div className="container-x">
            <h2 id="partner-fit" className="h2 heading-accent">מתי שווה לחבר אותנו לפרויקט?</h2>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[color:var(--ink-950)]/75">
              אם אתם עובדים עם יזמים וחברות נדל״ן בתחומי האדריכלות, ההדמיה, השיווק או ניהול הפרויקטים, יש סיכוי שאתם כבר פוגשים את הרגעים האלה בעבודה.
            </p>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {opportunities.map((item) => (
                <article key={item.title} className="overflow-hidden rounded-2xl border border-[color:var(--ink-950)]/10 bg-white">
                  <div className="relative aspect-[16/10]">
                    <Image src={item.image} alt={item.alt} fill sizes="(min-width: 768px) 31vw, 92vw" className="object-cover" />
                  </div>
                  <div className="p-5 sm:p-6">
                    <h3 className="h3">{item.title}</h3>
                    <p className="mt-2 leading-relaxed text-[color:var(--ink-950)]/75">{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="surface-navy-950 section" aria-labelledby="partner-process">
          <div className="container-x">
            <h2 id="partner-process" className="h2 heading-accent text-white">איך זה עובד?</h2>
            <ol className="mt-8 grid gap-4 md:grid-cols-3">
              {steps.map(([heading, body], index) => (
                <li key={heading} className="stat-card p-6">
                  <span className="text-lg font-bold text-[color:var(--gold-400)]">{index + 1}.</span>
                  <h3 className="h3 mt-2 text-white">{heading}</h3>
                  <p className="mt-2 leading-relaxed text-white/75">{body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="partnership" className="surface-ice section scroll-mt-24" aria-labelledby="partner-contact">
          <div className="container-x grid items-start gap-8 lg:grid-cols-2 lg:gap-14">
            <div>
              <h2 id="partner-contact" className="h2 heading-accent">בואו נדבר על שותפות</h2>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-[color:var(--ink-950)]/75">
                השאירו פרטים ונחזור אליכם לשיחת היכרות קצרה על אופי שיתוף הפעולה והתנאים.
              </p>
              <div className="mt-6 divide-y divide-[color:var(--ink-950)]/15">
                {questions.map(([question, answer]) => (
                  <details key={question} className="py-4">
                    <summary className="cursor-pointer font-semibold">{question}</summary>
                    <p className="mt-2 leading-relaxed text-[color:var(--ink-950)]/75">{answer}</p>
                  </details>
                ))}
              </div>
            </div>
            <div className="surface-navy-950 rounded-3xl p-6 sm:p-9 shadow-[0_30px_70px_-40px_rgba(10,21,38,0.55)]">
              <LeadForm
                location="partners_page"
                formName="partnership_form"
                source="partners"
                emailOptional
                noteLabel="שם העסק או תחום הפעילות"
                submitLabel={cta}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
