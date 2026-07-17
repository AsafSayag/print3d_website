import Image from "next/image";
import type { ArticleBlock } from "../content";
import { RichText } from "./RichText";

/**
 * Editorial article body: headed sections (each with a stable id so the table
 * of contents can deep-link to it), paragraphs with inline emphasis/links,
 * ordered/unordered lists, an accented pull quote, and lazy-loaded in-body
 * images with detailed alt text + captions.
 */
export function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="mx-auto max-w-[42rem]">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "heading":
            return (
              <h2
                key={i}
                id={block.id}
                className="mt-14 scroll-mt-28 font-display text-2xl font-bold leading-snug text-[color:var(--ink-950)] md:text-3xl"
              >
                {block.text}
              </h2>
            );
          case "subheading":
            return (
              <h3
                key={i}
                className="mt-9 font-display text-lg font-bold leading-snug text-[color:var(--ink-950)] md:text-xl"
              >
                {block.text}
              </h3>
            );
          case "paragraph":
            return (
              <p
                key={i}
                className="mt-5 leading-loose text-[color:var(--ink-950)]/80"
              >
                <RichText text={block.text} />
              </p>
            );
          case "list":
            return block.ordered ? (
              <ol
                key={i}
                className="mt-6 list-decimal space-y-3 pr-6 leading-loose text-[color:var(--ink-950)]/80 marker:font-bold marker:text-[color:var(--gold-700)]"
              >
                {block.items.map((it, j) => (
                  <li key={j} className="pr-1">
                    <RichText text={it} />
                  </li>
                ))}
              </ol>
            ) : (
              <ul
                key={i}
                className="mt-6 list-disc space-y-3 pr-6 leading-loose text-[color:var(--ink-950)]/80 marker:text-[color:var(--gold-500)]"
              >
                {block.items.map((it, j) => (
                  <li key={j} className="pr-1">
                    <RichText text={it} />
                  </li>
                ))}
              </ul>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className="mt-10 border-r-4 border-[color:var(--gold-500)] pr-6 pl-2"
              >
                <p className="font-display text-xl italic leading-relaxed text-[color:var(--navy-900)] md:text-2xl">
                  “{block.text}”
                </p>
                {block.attribution ? (
                  <cite className="caption mt-3 block not-italic text-[color:var(--gold-700)]">
                    {block.attribution}
                  </cite>
                ) : null}
              </blockquote>
            );
          case "image":
            return (
              <figure key={i} className="mt-10 -mx-6 md:-mx-16">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg">
                  <Image
                    src={block.src}
                    alt={block.alt}
                    fill
                    loading="lazy"
                    sizes="(min-width: 768px) 42rem, 100vw"
                    className="object-cover"
                  />
                </div>
                {block.caption ? (
                  <figcaption className="caption mt-2 text-center text-[color:var(--ink-950)]/60">
                    {block.caption}
                  </figcaption>
                ) : null}
              </figure>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
