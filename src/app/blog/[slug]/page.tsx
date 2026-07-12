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
import { ArticleBody } from "../_components/ArticleBody";

type Params = Promise<{ slug: string }>;

const findArticle = (slug: string) => getBlogArticle(slug);

function ArticleCta() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
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
  );
}

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
  const leadBlock = article.body?.find((block) => block.type === "lead");
  return buildPageMeta({
    title: article.title,
    description: leadBlock?.text ?? `${article.title} — המאמר המלא יעלה בקרוב לבלוג של Print3D.`,
    path: `/blog/${slug}`,
    // Placeholder pages stay out of the index until the content lands.
    index: Boolean(article.body),
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

  const leadIndex = article.body?.findIndex((block) => block.type === "lead") ?? -1;
  const leadBlock =
    leadIndex >= 0 ? (article.body![leadIndex] as { type: "lead"; text: string }) : undefined;
  const leadText = leadBlock?.text ?? "";
  const restBlocks = article.body
    ? article.body.filter((_, i) => i !== leadIndex)
    : [];

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
        {/* Clear header: back link, plain h1, meta */}
        <section className="surface-white pb-8 pt-[104px] md:pt-32">
          <div className="container-x">
            <Link
              href="/blog"
              className="caption text-[color:var(--gold-700)] hover:underline underline-offset-4"
            >
              → חזרה לבלוג
            </Link>
            <h1 className="mt-4 max-w-[46rem] font-display text-3xl font-bold leading-snug text-[color:var(--ink-950)] md:text-4xl">
              {article.title}
            </h1>
            <span className="caption mt-3 block text-[color:var(--ink-950)]/60">
              {article.readingTime}
            </span>
          </div>
        </section>

        {/* Wide, clean hero image */}
        <div className="container-x">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg md:aspect-[21/9]">
            <Image
              src={article.image}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>

        {article.body ? (
          <section className="surface-white section">
            <div className="container-x">
              <div className="mx-auto max-w-[42rem]">
                <h2 className="font-display text-2xl font-bold leading-snug text-[color:var(--ink-950)] md:text-3xl">
                  {leadText}
                </h2>
                <hr className="mt-8 border-[color:var(--ink-950)]/10" />
              </div>
              <ArticleBody blocks={restBlocks} />
              <div className="mx-auto mt-16 max-w-[42rem] border-t border-[color:var(--ink-950)]/10 pt-10">
                <ArticleCta />
              </div>
            </div>
          </section>
        ) : (
          /* Coming-soon placeholder until the article content is written */
          <section className="surface-white section">
            <div className="container-x max-w-2xl text-center">
              <hr className="mb-8 border-[color:var(--ink-950)]/10" />
              <span className="eyebrow text-[color:var(--gold-700)]">
                בקרוב
              </span>
              <h2 className="h3 mt-2 text-[color:var(--ink-950)]">
                המאמר בדרך אלינו
              </h2>
              <p className="mt-4 text-[color:var(--ink-950)]/70 leading-relaxed">
                אנחנו עובדים על התוכן הזה ממש עכשיו. בינתיים, אפשר לחזור לבלוג
                ולעיין בשאר המאמרים — או לדבר איתנו ישירות על הפרויקט שלכם.
              </p>
              <div className="mt-8">
                <ArticleCta />
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
