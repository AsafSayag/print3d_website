import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLdScript, FaqPageJsonLd } from "@/components/JsonLd";
import { Breadcrumbs, type Crumb } from "@/components/legal/Breadcrumbs";
import { LegalJsonLd } from "@/components/legal/LegalJsonLd";
import { GlassButton } from "@/components/ui/GlassButton";
import { LeadForm } from "@/components/ui/LeadForm";
import { analyticsAttrs } from "@/lib/analytics";
import { CONTACT } from "@/lib/constants";
import { buildPageMeta } from "@/lib/pageMeta";
import { PORTFOLIO_PROJECTS } from "@/lib/portfolioContent";
import { absoluteUrl, organizationRef } from "@/lib/schema";

const path = "/services/architectural-models";
const title = "ייצור מודלים אדריכליים";
const description =
  "Print3D מתכננת ומייצרת מודלים אדריכליים לפרויקטי נדל״ן, ממודלים למשרדי מכירות ועד מודלים עירוניים. הכירו את התהליך, צפו בפרויקטים ובקשו הצעה לפרויקט שלכם.";

export const metadata: Metadata = buildPageMeta({ title, description, path });

const breadcrumbs: Crumb[] = [
  { label: "בית", href: "/" },
  { label: title },
];

const projectIds = ["avisror-sde-dov", "levinstein", "beit-hakerem"];
const projects = projectIds.flatMap((id) => {
  const project = PORTFOLIO_PROJECTS.find((item) => item.id === id);
  return project?.href ? [project] : [];
});

const useCases = [
  {
    number: "01",
    title: "מודלים למשרדי מכירות",
    text: "הצגה מוחשית של המבנים, הפיתוח והסביבה כדי שרוכשים יוכלו להבין את הפרויקט במבט אחד.",
  },
  {
    number: "02",
    title: "מודלים לתצוגה ומשקיעים",
    text: "מודל שמציג את הרעיון האדריכלי בלובי, במשרד או בפגישה עם שותפים ומשקיעים.",
  },
  {
    number: "03",
    title: "מודלים עירוניים ותכנוניים",
    text: "המחשת תוכניות, מתחמים ומבני ציבור לצד ההקשר שלהם לסביבה העירונית.",
  },
] as const;

const steps = [
  { number: "01", title: "מבינים את הפרויקט", text: "מגדירים את מטרת המודל, קהל היעד, מקום התצוגה ורמת הפירוט הרצויה." },
  { number: "02", title: "מתכננים את המודל", text: "עוברים על התוכניות והקבצים, בוחרים קנה מידה ומתאימים את שיטת הייצור." },
  { number: "03", title: "מייצרים ומסיימים", text: "משלבים ייצור מדויק, הרכבה וגימור ידני, עד למסירה ולהצבה של המודל." },
] as const;

const questions = [
  {
    q: "אילו חומרים צריך לשלוח כדי להתחיל?",
    a: "אפשר להתחיל עם תוכניות אדריכליות, קובצי CAD או מודל BIM, בהתאם למה שכבר קיים בפרויקט. בשיחה ראשונית נבדוק יחד מה חסר לפני הכנת הצעה.",
  },
  {
    q: "איך בוחרים קנה מידה למודל?",
    a: "קנה המידה נקבע לפי גודל הפרויקט, המקום שבו המודל יוצג ורמת הפירוט שחשובה לכם. מודל של מגדל יחיד ומודל של שכונה שלמה דורשים בחירה שונה.",
  },
  {
    q: "כמה זמן לוקח לייצר מודל אדריכלי?",
    a: "משך הייצור תלוי בהיקף הפרויקט, במורכבות המודל ובמוכנות הקבצים. אחרי שנראה את החומרים והדרישות נוכל לתת הערכת זמן לפרויקט הספציפי.",
  },
] as const;

export default function ArchitecturalModelsPage() {
  return (
    <>
      <LegalJsonLd title={title} description={description} path={path} breadcrumbs={breadcrumbs} />
      <JsonLdScript
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          "@id": `${absoluteUrl(path)}#service`,
          name: title,
          description,
          url: absoluteUrl(path),
          serviceType: "תכנון וייצור מודלים אדריכליים פיזיים",
          provider: organizationRef,
          areaServed: { "@type": "Country", name: "Israel" },
        }}
      />
      <FaqPageJsonLd items={questions} />
      <Header />
      <main id="main" className="flex-1">
        <section className="surface-navy-950 relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24" aria-labelledby="service-title">
          <div className="absolute inset-0 cta-grid opacity-35" aria-hidden />
          <div className="container-x relative grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
            <div>
              <Breadcrumbs items={breadcrumbs} className="mb-9 text-sm" />
              <p className="eyebrow mb-4 text-[color:var(--steel-300)]">מחשבה שהופכת למשהו שאפשר לראות</p>
              <h1 id="service-title" className="h1 heading-accent max-w-xl text-balance text-white">
                ייצור מודלים אדריכליים לפרויקטים שרוצים להציג נכון
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/75">
                אנחנו מתכננים ומייצרים מודלים אדריכליים פיזיים עבור יזמים, חברות בנייה, אדריכלים ורשויות. כל מודל מותאם לפרויקט, למקום שבו יציגו אותו ולאנשים שצריכים להבין אותו.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <GlassButton href="#service-contact" variant="primary" {...analyticsAttrs("cta_click", { cta_name: "quote_request", location: "service_hero" })}>
                  בואו נדבר על המודל שלכם
                </GlassButton>
                <GlassButton href="#service-projects" {...analyticsAttrs("cta_click", { cta_name: "view_projects", location: "service_hero" })}>
                  לראות פרויקטים
                </GlassButton>
              </div>
            </div>
            <figure className="relative min-h-[350px] overflow-hidden rounded-[1.75rem] border border-white/15 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)] sm:min-h-[450px] lg:min-h-[600px]">
              <Image
                src="/projects/avisror-sde-dov.webp"
                alt="מודל אדריכלי מואר של פרויקט אביסרור בשדה דב"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[color:var(--navy-950)]/95 via-[color:var(--navy-950)]/35 to-transparent px-6 pb-6 pt-20 text-white">
                <figcaption className="text-sm font-semibold">אביסרור, שדה דב <span className="mx-2 text-white/45">/</span> מודל בקנה מידה 1:100</figcaption>
              </div>
            </figure>
          </div>
        </section>

        <section className="surface-white py-16 sm:py-20" aria-labelledby="service-answer">
          <div className="container-x grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="eyebrow mb-3 text-[color:var(--gold-700)]">בקצרה</p>
              <h2 id="service-answer" className="h2 heading-accent max-w-md text-balance">מה כולל ייצור מודל אדריכלי?</h2>
            </div>
            <div className="border-r-2 border-[color:var(--gold-500)] pr-6 text-lg leading-relaxed text-[color:var(--ink-950)]/75 sm:pr-8">
              <p>מודל אדריכלי הוא ייצוג פיזי בקנה מידה של מבנה, מתחם או תוכנית. כדי לייצר אותו בוחנים את התוכניות, מגדירים מה חשוב להמחיש, בוחרים קנה מידה, מייצרים את החלקים ומסיימים בהרכבה ובגימור.</p>
              <p className="mt-4">התוצאה נותנת למבקרים דרך לראות יחד את הפרויקט, את הפרטים שלו ואת הקשר שלו לסביבה.</p>
            </div>
          </div>
        </section>

        <section className="surface-ice py-16 sm:py-20" aria-labelledby="service-uses">
          <div className="container-x">
            <p className="eyebrow mb-3 text-[color:var(--gold-700)]">לכל פרויקט יש מטרה אחרת</p>
            <h2 id="service-uses" className="h2 heading-accent max-w-xl text-balance">המודל הנכון למקום שבו תציגו אותו</h2>
            <div className="mt-9 grid gap-4 md:grid-cols-3">
              {useCases.map((item) => (
                <article key={item.number} className="rounded-2xl border border-[color:var(--navy-950)]/10 bg-white p-7 shadow-[0_14px_36px_-30px_rgba(10,21,38,0.4)]">
                  <span className="font-display text-sm text-[color:var(--gold-700)]">{item.number}</span>
                  <h3 className="h3 mt-5 text-[color:var(--navy-950)]">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-[color:var(--ink-950)]/65">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="service-projects" className="surface-white py-16 sm:py-20" aria-labelledby="service-work">
          <div className="container-x">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="eyebrow mb-3 text-[color:var(--gold-700)]">מהסטודיו אל העולם האמיתי</p>
                <h2 id="service-work" className="h2 heading-accent">מודלים שייצרנו</h2>
              </div>
              <Link href="/projects" className="text-base font-semibold text-[color:var(--gold-700)] underline underline-offset-4 transition-colors hover:text-[color:var(--navy-950)]">לכל הפרויקטים ←</Link>
            </div>
            <div className="mt-9 grid gap-5 md:grid-cols-3">
              {projects.map((project) => (
                <Link key={project.id} href={project.href!} className="group overflow-hidden rounded-2xl border border-[color:var(--navy-950)]/10 bg-[color:var(--ice-050)] transition-shadow hover:shadow-[0_20px_50px_-30px_rgba(10,21,38,0.35)]">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src={project.image} alt={`מודל אדריכלי לפרויקט ${project.title}`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-semibold text-[color:var(--gold-700)]">{project.client} · {project.scale}</p>
                    <h3 className="h3 mt-2 text-[color:var(--navy-950)]">{project.title}</h3>
                    <span className="mt-3 inline-block text-sm font-semibold text-[color:var(--gold-700)]">לצפייה בפרויקט ←</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="surface-navy-900 py-16 sm:py-20" aria-labelledby="service-process">
          <div className="container-x">
            <p className="eyebrow mb-3 text-[color:var(--steel-300)]">מהרעיון עד ההצבה</p>
            <h2 id="service-process" className="h2 heading-accent max-w-xl text-balance text-white">תהליך ברור, שלב אחרי שלב</h2>
            <div className="mt-9 grid gap-7 md:grid-cols-3">
              {steps.map((step) => (
                <div key={step.number} className="border-t border-white/20 pt-5">
                  <span className="font-display text-sm text-[color:var(--steel-300)]">{step.number}</span>
                  <h3 className="h3 mt-4 text-white">{step.title}</h3>
                  <p className="mt-3 leading-relaxed text-white/65">{step.text}</p>
                </div>
              ))}
            </div>
            <p className="mt-10 text-sm text-white/65">
              רוצים להכיר את התהליך לעומק? <Link href="/knowledge/architectural-model-production-process" className="font-semibold text-white underline underline-offset-4 hover:text-[color:var(--steel-300)]">קראו את המדריך המלא לייצור מודל אדריכלי</Link>.
            </p>
          </div>
        </section>

        <section className="surface-ice py-16 sm:py-20" aria-labelledby="service-questions">
          <div className="container-x grid gap-9 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
            <div>
              <p className="eyebrow mb-3 text-[color:var(--gold-700)]">כדאי לדעת</p>
              <h2 id="service-questions" className="h2 heading-accent">שאלות לפני שמתחילים</h2>
              <p className="mt-5 max-w-sm text-[color:var(--ink-950)]/65">לכל מודל יש דרישות משלו. הנה התשובות לשאלות הראשונות שעולות בדרך כלל.</p>
            </div>
            <div className="space-y-3">
              {questions.map((item) => (
                <details key={item.q} className="group rounded-2xl border border-[color:var(--navy-950)]/10 bg-white p-5 open:shadow-[0_18px_38px_-30px_rgba(10,21,38,0.3)]">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[color:var(--navy-950)] [&::-webkit-details-marker]:hidden">
                    {item.q}<span aria-hidden className="text-2xl leading-none text-[color:var(--gold-700)] group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="mt-4 leading-relaxed text-[color:var(--ink-950)]/65">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="service-contact" className="surface-navy-950 py-16 sm:py-20" aria-labelledby="service-contact-title">
          <div className="container-x grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <p className="eyebrow mb-3 text-[color:var(--steel-300)]">מתחילים בפרויקט שלכם</p>
              <h2 id="service-contact-title" className="h2 heading-accent max-w-md text-balance text-white">בואו נראה מה נכון לבנות</h2>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-white/70">ספרו לנו בקצרה על הפרויקט ועל השימוש המתוכנן במודל. נחזור אליכם כדי להבין את הצורך ולהתקדם להצעה מתאימה.</p>
              <p className="mt-7 text-sm text-white/60">מעדיפים לדבר? <a href={CONTACT.phoneHref} className="font-semibold text-white underline underline-offset-4" dir="ltr">{CONTACT.phone}</a></p>
            </div>
            <div className="rounded-3xl border border-white/15 bg-white/[0.04] p-6 shadow-[0_30px_70px_-40px_rgba(0,0,0,0.55)] sm:p-9">
              <h3 className="h3 mb-2 text-white">השאירו פרטים ונחזור אליכם</h3>
              <p className="mb-7 text-white/60">שם, טלפון ואימייל — ואת שאר הפרטים אפשר לספר בהמשך.</p>
              <LeadForm location="service_architectural_models" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
