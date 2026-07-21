import type { Metadata } from "next";
import type { ComponentType } from "react";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { HIDDEN_PROJECT_SLUGS } from "@/lib/hiddenProjects";
import { buildProjectMeta, NOT_FOUND_METADATA } from "@/lib/pageMeta";

/**
 * Builds a project case-study page — both its `metadata` and its component.
 *
 * Every project page goes through here so that hiding a project is a single
 * edit to HIDDEN_PROJECT_SLUGS. Two things used to go wrong when each page
 * spelled this out itself:
 *
 *  1. The notFound() guard was copy-pasted, so most pages simply didn't have
 *     one. Listing such a slug dropped its card from the grid but left the
 *     page fully readable at its direct URL.
 *  2. Next evaluates a page's `metadata` export independently of its
 *     component, so a hidden project still shipped its real title, canonical
 *     URL and OG/Twitter cards inside the 404 response — the client and
 *     project names showed up in the browser tab and in view-source.
 *
 * Both are fixed here at once, and bundling them is the point: a page cannot
 * declare its metadata without also getting the matching guard, so the two
 * can no longer disagree.
 *
 * notFound() runs during prerender, so a hidden project ships as a static 404
 * — no per-request cost, and the correct status for crawlers.
 */
export function createProjectPage({
  slug,
  title,
  description,
  view: View,
}: {
  /** Bare slug, e.g. "levinstein" — must match the directory name. */
  slug: string;
  /** The project's SEO_TITLE_TAG (already brand-suffixed). */
  title: string;
  /** The project's IMAGE_ALT, used as the meta description. */
  description: string;
  /** The project's view component, from its own _components directory. */
  view: ComponentType;
}): { metadata: Metadata; ProjectPage: () => React.ReactElement } {
  const hidden = HIDDEN_PROJECT_SLUGS.includes(slug);

  const metadata = hidden
    ? NOT_FOUND_METADATA
    : buildProjectMeta({ title, description, slug });

  function ProjectPage() {
    if (hidden) notFound();

    return (
      <div className="relative">
        <Header />
        <View />
      </div>
    );
  }

  return { metadata, ProjectPage };
}
