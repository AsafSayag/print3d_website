import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs, type Crumb } from "@/components/legal/Breadcrumbs";
import { FaqAccordion } from "@/components/FaqAccordion";
import { GlassButton } from "@/components/ui/GlassButton";
import { buildPageMeta } from "@/lib/pageMeta";
import { CONTACT } from "@/lib/constants";
import { getBlogArticle, blogArticleSlugs } from "../content";
import { ArticleBody } from "../_components/ArticleBody";
import { ArticleJsonLd } from "../_components/ArticleJsonLd";
import { ReadingProgress } from "../_components/ReadingProgress";
import { TableOfContents, buildToc } from "../_components/TableOfContents";
import { RichText } from "../_components/RichText";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return blogArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getBlogArticle(slug);
  if (!article) return {};
  return buildPageMeta({
    title: article.metaTitle,
    description: article.metaDescription,
    path: `/blog/${slug}`,
  });
}

export default async function ArticlePage({ params }: { params: Params }) {
  const { slug } = await params;
  const article = getBlogArticle(slug);
  if (!article) notFound();

  const breadcrumbs: Crumb[] = [
    { label: "בית", href: "/" },
    { label: "בלוג", href: "/blog" },
    { label: article.title },
  ];

  // TOC = body headings + a fixed entry for the FAQ accordion below.
  const toc = buildToc(article.body, [{ id: "faq", text: "שאלות נפוצות" }]);

  const updatedLabel = new Date(article.updatedDate).toLocaleDateString("he-IL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <ReadingProgress />
      <ArticleJsonLd article={article} breadcrumbs={breadcrumbs} />
      <a href="#main" className="skip-link">
        דלגו לתוכן הראשי
      </a>
      <Header />
      <main id="main" className="flex-1">
        {/* Article header — breadcrumbs, single H1, byline/meta */}
        <section className="surface-white pb-8 pt-[104px] md:pt-32">
          <div className="container-x">
            <Breadcrumbs items={breadcrumbs} tone="dark" className="text-sm" />
            <span className="eyebrow mt-6 block text-[color:var(--gold-700)]">
              {article.category}
            </span>
            <h1 className="mt-3 max-w-[52rem] font-display text-3xl font-bold leading-tight text-[color:var(--ink-950)] md:text-[2.75rem]">
              {article.title}
            </h1>
            <div className="caption mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[color:var(--ink-950)]/60">
              <span>מאת {article.author}</span>
              <span aria-hidden="true">·</span>
              <span>{article.readingTime}</span>
              <span aria-hidden="true">·</span>
              <span>
                עודכן ב־
                <time dateTime={article.updatedDate}>{updatedLabel}</time>
              </span>
            </div>
          </div>
        </section>

        {/* Wide hero image — the one above-the-fold image loads eagerly (LCP) */}
        <div className="container-x">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg md:aspect-[21/9]">
            <Image
              src={article.image}
              alt={article.imageAlt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>

        <section className="surface-white section">
          <div className="container-x">
            {/* Lead + table of contents */}
            <div className="mx-auto max-w-[42rem]">
              <p className="font-display text-xl font-medium leading-relaxed text-[color:var(--ink-950)] md:text-2xl">
                {article.lead}
              </p>
              <div className="mt-10">
                <TableOfContents entries={toc} />
              </div>
              <hr className="mt-10 border-[color:var(--ink-950)]/10" />
            </div>

            {/* Body */}
            <ArticleBody blocks={article.body} />

            {/* FAQ — closed accordion, feeds the FAQPage schema above */}
            <div className="mx-auto mt-16 max-w-[42rem]">
              <h2
                id="faq"
                className="scroll-mt-28 font-display text-2xl font-bold leading-snug text-[color:var(--ink-950)] md:text-3xl"
              >
                שאלות נפוצות
              </h2>
              <div className="mt-6">
                <FaqAccordion items={article.faq} />
              </div>
            </div>

            {/* Closing CTA + internal links */}
            <div className="mx-auto mt-16 max-w-[42rem] rounded-2xl border border-black/10 bg-[color:var(--ice-050)] p-8 md:p-10">
              <h2 className="font-display text-2xl font-bold text-[color:var(--ink-950)] md:text-3xl">
                {article.cta.title}
              </h2>
              <p className="mt-4 leading-loose text-[color:var(--ink-950)]/80">
                <RichText text={article.cta.text} />
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-4">
                <GlassButton href={CONTACT.contactPath} variant="primary">
                  צרו קשר
                </GlassButton>
                <Link
                  href="/portfolio"
                  className="font-semibold text-[color:var(--gold-700)] underline-offset-4 hover:underline"
                >
                  לצפייה בפרויקטים ←
                </Link>
              </div>
              <nav
                aria-label="קישורים מהירים"
                className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-black/10 pt-6 text-sm"
              >
                {article.relatedLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-[color:var(--ink-950)]/70 hover:text-[color:var(--gold-700)]"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
