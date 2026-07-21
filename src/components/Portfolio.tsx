import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { CountUp } from "./ui/CountUp";
import { GlassButton } from "./ui/GlassButton";
import { HIDDEN_PROJECT_SLUGS } from "@/lib/hiddenProjects";

// Real models from the Print3D archive, with their scales.
// `href` marks a project that links through to its own case-study page.
const PROJECTS: {
  src: string;
  title: string;
  scale: string;
  span: string;
  href?: string;
}[] = [
  {
    src: "/projects/gindi_kfar_azar.webp",
    title: 'גינדי כפר אז"ר',
    scale: "1:100",
    span: "",
    href: "/projects/gindi-kfar-azar",
  },
  {
    src: "/projects/dafna-tidhar.webp",
    title: "תדהר דפנה",
    scale: "1:100",
    span: "",
    href: "/projects/dafna-tidhar",
  },
  {
    src: "/projects/sela-baitar-hadera.webp",
    title: "סלע ביתר · חדרה",
    scale: "1:100",
    span: "",
    href: "/projects/sela-baitar-hadera",
  },
  {
    src: "/projects/shbiro-rishon-letzion.webp",
    title: "שבירו, ראשון לציון",
    scale: "1:200",
    span: "",
    href: "/projects/shbiro-rishon-letzion",
  },
  {
    src: "/projects/levinstein.webp",
    title: "מגדלי לוינשטיין",
    scale: "1:75",
    span: "",
    href: "/projects/levinstein",
  },
  {
    src: "/projects/beit-hakerem.webp",
    title: "בית הכרם",
    scale: "1:1000",
    span: "",
    href: "/projects/beit-hakerem",
  },
  {
    src: "/projects/maoz-daniel-bat-yam.webp",
    title: "מעוז דניאל, כצנלסון בת ים",
    scale: "1:75",
    span: "",
    href: "/projects/maoz-daniel-bat-yam",
  },
  {
    src: "/projects/avisror-costa-rica-jerusalem.webp",
    title: "אביסרור, קוסטה ריקה",
    scale: "1:150",
    span: "",
    href: "/projects/avisror-costa-rica-jerusalem",
  },
  {
    src: "/projects/avisror-ramat-hasharon.webp",
    title: "אביסרור, רמת השרון",
    scale: "1:150",
    span: "",
    href: "/projects/avisror-ramat-hasharon",
  },
  {
    src: "/projects/aura-natania.webp",
    title: "אאורה, נתניה",
    scale: "1:150",
    span: "",
    href: "/projects/aura-natania",
  },
  {
    src: "/projects/bonei-binyan-hahagana-raanana.webp",
    title: "בוני בניין, ההגנה",
    scale: "1:100",
    span: "",
    href: "/projects/bonei-binyan-hahagana-raanana",
  },
  {
    src: "/projects/avisror-sde-dov.webp",
    title: "אביסרור, שדה דב",
    scale: "1:100",
    span: "",
    href: "/projects/avisror-sde-dov",
  },
  {
    src: "/projects/kardan-metsada-bat-yam.webp",
    title: "כרדן, מצדה בת ים",
    scale: "1:100",
    span: "",
    href: "/projects/kardan-metsada-bat-yam",
  },
  {
    src: "/projects/vitania-har-hotzvim.webp",
    title: "ויטניה, הר חוצבים",
    scale: "1:250",
    span: "",
    href: "/projects/vitania-har-hotzvim",
  },
  {
    src: "/projects/sarfati-arnona-jerusalem.webp",
    title: "צרפתי, ארנונה ירושלים",
    scale: "1:100",
    span: "",
    href: "/projects/sarfati-arnona-jerusalem",
  },
  {
    src: "/projects/rotem-shani-beit-shemesh.webp",
    title: "רותם שני, בית שמש",
    scale: "1:100",
    span: "",
    href: "/projects/rotem-shani-beit-shemesh",
  },
  {
    src: "/projects/ashdar-tagor.webp",
    title: "אשדר, תג'ור",
    scale: "1:100",
    span: "",
    href: "/projects/ashdar-tagor",
  },
  {
    src: "/projects/guy-doron-levy-ramat-efal.webp",
    title: "גיא דורון לוי, רמת אפעל",
    scale: "1:75",
    span: "",
    href: "/projects/guy-doron-levy-ramat-efal",
  },
  {
    src: "/projects/bat-yam-hotel.webp",
    title: "מלון בת ים",
    scale: "1:125",
    span: "",
    href: "/projects/bat-yam-hotel",
  },
  {
    src: "/projects/hayiriya-kiryat-yam.webp",
    title: "הירייה, קרית ים",
    scale: "1:100",
    span: "",
    href: "/projects/hayiriya-kiryat-yam",
  },
  {
    src: "/projects/prashkovski-ashdod.webp",
    title: "פרשקובסקי, אשדוד",
    scale: "1:100",
    span: "",
    href: "/projects/prashkovski-ashdod",
  },
  {
    src: "/projects/avney-derech-beit-shemesh.webp",
    title: "אבני דרך, בית שמש",
    scale: "1:100",
    span: "",
    href: "/projects/avney-derech-beit-shemesh",
  },
  {
    src: "/projects/prashkovski-ramat-hanasi.webp",
    title: "פרשקובסקי, רמת הנשיא",
    scale: "1:200",
    span: "",
    href: "/projects/prashkovski-ramat-hanasi",
  },
  {
    src: "/projects/ram-aderet-givat-hamatos.webp",
    title: "רם אדרת, גבעת המטוס",
    scale: "1:200",
    span: "",
    href: "/projects/ram-aderet-givat-hamatos",
  },
  {
    src: "/projects/guy-doron-levy-tsur-hadassa.webp",
    title: "גיא דורון לוי, צור הדסה",
    scale: "1:100",
    span: "",
    href: "/projects/guy-doron-levy-tsur-hadassa",
  },
  {
    src: "/projects/azorim-beit-hakerem.webp",
    title: "אזורים, בית הכרם",
    scale: "1:200",
    span: "",
    href: "/projects/azorim-beit-hakerem",
  },
  {
    src: "/projects/rotem-shani-petach-tikva.webp",
    title: "רותם שני, פתח תקווה",
    scale: "1:100",
    span: "",
    href: "/projects/rotem-shani-petach-tikva",
  },
];

const VISIBLE_PROJECTS = PROJECTS.filter(
  (p) => !p.href || !HIDDEN_PROJECT_SLUGS.includes(p.href.replace("/projects/", ""))
);

const STATS = [
  { end: 15, label: "שנות ניסיון" },
  { end: 250, label: "פרויקטים שהושלמו" },
] as const;

export function Portfolio() {
  return (
    <section
      id="portfolio"
      className="portfolio-ambient section text-white"
      aria-label="קטלוג"
    >
      <div className="container-x">
        {/* Heading + subtitle on the start side, animated stats on the end side */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          <div className="max-w-2xl max-md:mx-auto max-md:text-center">
            <SectionHeading eyebrow="קטלוג" title="פרויקטים נבחרים" tone="light" />
            <Reveal index={2} className="lg:hidden mt-6">
              <GlassButton href="/projects" variant="primary">
                לכל הפרויקטים
              </GlassButton>
            </Reveal>
            <Reveal index={2}>
              <p className="mt-5 text-[color:var(--steel-300)] text-base md:text-lg leading-relaxed">
                מעל 15 שנות ניסיון ולמעלה מ־250 פרויקטים מוגמרים, ממגדלי יוקרה
                ושכונות שלמות ועד מודלים תכנוניים, עבור חברות הנדל״ן והאדריכלים
                המובילים בישראל.
              </p>
            </Reveal>
          </div>

          <Reveal index={3} className="shrink-0">
            <div className="hidden lg:block mb-6">
              <GlassButton href="/projects" variant="primary">
                לכל הפרויקטים
              </GlassButton>
            </div>
            <div className="flex items-stretch gap-8 lg:gap-10">
              {STATS.map((s, i) => (
                <div
                  key={s.label}
                  className={
                    i > 0 ? "ps-8 lg:ps-10 border-s border-white/10" : ""
                  }
                >
                  <div className="font-display text-4xl md:text-5xl text-[#d9e2ec]">
                    <CountUp end={s.end} suffix="+" />
                  </div>
                  <div className="mt-1.5 text-sm text-[color:var(--steel-300)]">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Mobile shows the first 3 projects; the rest reveal on tap (pure-CSS
            toggle). Desktop always shows the full grid — see .collapse-sm. */}
        <input
          type="checkbox"
          id="portfolio-more"
          className="more-toggle"
          aria-label="הצגת כל הפרויקטים"
        />
        <div className="collapse-host grid grid-cols-2 lg:grid-cols-3 auto-rows-[220px] md:auto-rows-[260px] gap-4 mt-12 md:mt-16">
          {VISIBLE_PROJECTS.map((p, i) => (
            <Reveal
              key={p.src}
              index={i % 3}
              className={`${p.span} ${i >= 3 ? "collapse-sm" : ""}`}
            >
              {/* Hover transforms live on this inner card — Reveal owns the
                  element's inline transform, so the two must not share a node. */}
              <div className="portfolio-card group relative h-full overflow-hidden rounded-2xl">
                <Image
                  src={p.src}
                  alt={`${p.title} · מודל אדריכלי בקנה מידה ${p.scale}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[1100ms] ease-[var(--ease-brand)] group-hover:scale-[1.07]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <div className="portfolio-card-sheen" aria-hidden />
                <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                  <div className="portfolio-card-line" aria-hidden />
                  {/* Mobile: badge stacked above the title (long titles wrap
                      badly beside it); sm+: side by side as before. */}
                  <div className="mt-3 flex flex-col items-start gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <span
                      className="num sm:order-last text-[#d9e2ec] text-sm shrink-0 bg-black/30 backdrop-blur px-2 py-0.5 rounded-full border border-white/10 transition-colors duration-500 group-hover:border-[#d9e2ec]/70"
                      dir="ltr"
                    >
                      {p.scale}
                    </span>
                    <span className="text-white font-display text-base md:text-lg leading-tight transition-transform duration-500 ease-[var(--ease-brand)] group-hover:-translate-y-0.5">
                      {p.title}
                    </span>
                  </div>
                </div>
                {p.href && (
                  <Link
                    href={p.href}
                    aria-label={`${p.title} — לצפייה בעמוד הפרויקט`}
                    className="absolute inset-0 z-10 rounded-2xl ring-[#d9e2ec]/0 transition group-hover:ring-2 focus-visible:outline-none focus-visible:ring-2"
                  />
                )}
              </div>
            </Reveal>
          ))}
        </div>

        {/* Mobile-only "view full gallery" button */}
        <div className="more-btn-wrap mt-8 justify-center">
          <label
            htmlFor="portfolio-more"
            className="more-btn cursor-pointer inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 font-display text-white transition-colors hover:bg-white/10"
          >
            לכל הקטלוג
            <span aria-hidden="true">←</span>
          </label>
        </div>
      </div>
    </section>
  );
}
