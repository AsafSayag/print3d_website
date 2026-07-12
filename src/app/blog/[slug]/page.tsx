import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LegalJsonLd } from "@/components/legal/LegalJsonLd";
import type { Crumb } from "@/components/legal/Breadcrumbs";
import { GlassButton } from "@/components/ui/GlassButton";
import { buildPageMeta } from "@/lib/pageMeta";
import { CONTACT } from "@/lib/constants";
import { getBlogArticle, blogArticleSlugs } from "../content";

type Params = Promise<{ slug: string }>;

const findArticle = (slug: string) => getBlogArticle(slug);

export function generateStaticParams() {
  return blogArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = findArticle(slug);
  if (!article) return {};
  return buildPageMeta({
    title: article.title,
    description: `${article.title} — המאמר המלא יעלה בקרוב לבלוג של Print3D.`,
    path: `/blog/${slug}`,
    // Placeholder pages stay out of the index until the content lands.
    index: false,
  });
}

export default async function ArticlePage({ params }: { params: Params }) {
  const { slug } = await params;
  const article = findArticle(slug);
  if (!article) notFound();

  const breadcrumbs: Crumb[] = [
    { label: "בית", href: "/" },
    { label: "בלוג", href: "/blog" },
    { label: article.title },
  ];

  return (
    <>
      <LegalJsonLd
        title={article.title}
        description={`${article.title} — המאמר המלא יעלה בקרוב.`}
        path={`/blog/${slug}`}
        breadcrumbs={breadcrumbs}
      />
      <a href="#main" className="skip-link">
        דלגו לתוכן הראשי
      </a>
      <Header />
      <main id="main" className="flex-1">
        {/* Duotone hero, matching the blog rows */}
        <section className="relative flex min-h-[55dvh] items-end overflow-hidden bg-[color:var(--navy-950)] pt-[72px] md:pt-20">
          <Image
            src={article.image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover grayscale"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(155deg, rgba(7,13,23,0.55), rgba(18,35,59,0.8))",
              mixBlendMode: "multiply",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(7,13,23,0.85)] via-transparent to-transparent" />
          <div className="container-x relative z-10 pb-12 pt-20">
            <Link
              href="/blog"
              className="caption text-[color:var(--gold-400)] hover:underline underline-offset-4"
            >
              → חזרה לבלוג
            </Link>
            <h1 className="mt-4 max-w-[46rem] font-display text-3xl font-bold leading-snug text-white md:text-4xl">
              {article.title}
            </h1>
            <span className="caption mt-3 block text-white/70">
              {article.readingTime}
            </span>
          </div>
        </section>

        {/* Coming-soon placeholder until the article content is written */}
        <section className="surface-white section">
          <div className="container-x max-w-2xl text-center">
            <span className="eyebrow text-[color:var(--gold-700)]">בקרוב</span>
            <h2 className="h3 mt-2 text-[color:var(--ink-950)]">
              המאמר בדרך אלינו
            </h2>
            <p className="mt-4 text-[color:var(--ink-950)]/70 leading-relaxed">
              אנחנו עובדים על התוכן הזה ממש עכשיו. בינתיים, אפשר לחזור לבלוג
              ולעיין בשאר המאמרים — או לדבר איתנו ישירות על הפרויקט שלכם.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <GlassButton href={CONTACT.contactPath} variant="primary">
                דברו איתנו
              </GlassButton>
              <Link
                href="/blog"
                className="text-[color:var(--gold-700)] font-semibold hover:underline underline-offset-4"
              >
                לכל המאמרים ←
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
