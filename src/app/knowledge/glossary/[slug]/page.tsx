import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactBand } from "@/components/ContactBand";
import { Breadcrumbs, type Crumb } from "@/components/legal/Breadcrumbs";
import { JsonLdScript } from "@/components/JsonLd";
import { buildPageMeta } from "@/lib/pageMeta";
import { CONTACT } from "@/lib/constants";
import { PORTFOLIO_PROJECTS } from "@/lib/portfolioContent";
import { breadcrumbListSchema } from "@/lib/schema";
import { getBlogArticle } from "../../content";
import { MODEL_CONTEXT, glossaryResources } from "../../glossaryContext";
import {
  GLOSSARY_TERMS,
  getGlossaryTerm,
  glossaryTermSlugs,
  glossaryShort,
} from "../../glossary";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return glossaryTermSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const term = getGlossaryTerm(slug);
  if (!term) return {};
  return buildPageMeta({
    title: `${term.term} — מילון מונחים`,
    description: glossaryShort(term.definition, 150),
    path: `/knowledge/glossary/${slug}`,
  });
}

export default async function GlossaryTermPage({ params }: { params: Params }) {
  const { slug } = await params;
  const term = getGlossaryTerm(slug);
  if (!term) notFound();

  const bySlug = new Map(GLOSSARY_TERMS.map((t) => [t.slug, t]));
  const related = term.related
    .map((s) => bySlug.get(s))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));
  const resources = glossaryResources(term.slug);
  const articlePath = term.href ?? `/knowledge/${resources.article}`;
  const article = getBlogArticle(articlePath.replace("/knowledge/", ""));
  const project = PORTFOLIO_PROJECTS.find((p) => p.id === resources.project && p.href);
  const modelContext = MODEL_CONTEXT[term.slug];

  const breadcrumbs: Crumb[] = [
    { label: "בית", href: "/" },
    { label: "מרכז הידע", href: "/knowledge" },
    { label: "מילון מונחים", href: "/knowledge/glossary" },
    { label: term.term },
  ];

  const definedTerm = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: term.term,
    description: term.definition,
    url: `${CONTACT.siteUrl}/knowledge/glossary/${term.slug}`,
    inLanguage: "he-IL",
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "מילון מונחים למודלים אדריכליים",
      url: `${CONTACT.siteUrl}/knowledge/glossary`,
    },
  };

  return (
    <>
      <JsonLdScript data={definedTerm} />
      <JsonLdScript data={breadcrumbListSchema(breadcrumbs)} />
      <a href="#main" className="skip-link">
        דלגו לתוכן הראשי
      </a>
      <Header />
      <main id="main" className="flex-1">
        <section className="surface-white pt-[104px] md:pt-32">
          <div className="container-x">
            <Breadcrumbs items={breadcrumbs} tone="dark" className="text-sm" />
            <span className="eyebrow mt-6 block text-[color:var(--gold-700)]">
              מילון מונחים
            </span>
            <h1 className="mt-3 max-w-[52rem] font-display text-3xl font-bold leading-tight text-[color:var(--ink-950)] md:text-[2.75rem]">
              {term.term}
            </h1>
          </div>
        </section>

        <section className="surface-white section">
          <div className="container-x">
            <div className="mx-auto max-w-[42rem]">
              <p className="text-lg leading-loose text-[color:var(--ink-950)]/85">
                {term.definition}
              </p>

              {modelContext && (
                <section className="mt-8 rounded-2xl border border-black/10 bg-[color:var(--ice-050)] p-6">
                  <h2 className="font-display text-xl font-bold text-[color:var(--ink-950)]">
                    איך זה קשור למודל אדריכלי?
                  </h2>
                  <p className="mt-3 leading-relaxed text-[color:var(--ink-950)]/80">
                    {modelContext}
                  </p>
                </section>
              )}

              {(article || project) && (
                <section className="mt-8 rounded-2xl border border-black/10 bg-[color:var(--ice-050)] p-6">
                  <h2 className="font-display text-xl font-bold text-[color:var(--ink-950)]">
                    להעמקה ודוגמאות
                  </h2>
                  <ul className="mt-3 space-y-2 text-[color:var(--ink-950)]/80">
                    {article && (
                      <li>
                        מדריך: <Link href={articlePath} className="font-semibold text-[color:var(--gold-700)] underline-offset-4 hover:underline">{article.title}</Link>
                      </li>
                    )}
                    {project?.href && (
                      <li>
                        דוגמה למודל שביצענו: <Link href={project.href} className="font-semibold text-[color:var(--gold-700)] underline-offset-4 hover:underline">{project.title}</Link>
                      </li>
                    )}
                  </ul>
                </section>
              )}

              {related.length > 0 && (
                <div className="mt-12 border-t border-black/10 pt-8">
                  <h2 className="font-display text-xl font-bold text-[color:var(--ink-950)]">
                    מונחים קשורים
                  </h2>
                  <ul className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {related.map((r) => (
                      <li key={r.slug}>
                        <Link
                          href={`/knowledge/glossary/${r.slug}`}
                          className="group block rounded-xl border border-black/10 bg-white p-4 transition-colors hover:border-[color:var(--gold-500)]/50"
                        >
                          <span className="font-display font-bold text-[color:var(--ink-950)] transition-colors group-hover:text-[color:var(--gold-700)]">
                            {r.term}
                          </span>
                          <span className="mt-1 block text-sm text-[color:var(--ink-950)]/60">
                            {glossaryShort(r.definition, 80)}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-12">
                <Link
                  href="/knowledge/glossary"
                  className="font-semibold text-[color:var(--gold-700)] underline-offset-4 hover:underline"
                >
                  → חזרה למילון המונחים המלא
                </Link>
              </div>
            </div>
          </div>
        </section>

        <ContactBand />
      </main>
      <Footer />
    </>
  );
}
