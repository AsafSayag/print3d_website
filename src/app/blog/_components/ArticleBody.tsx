import Image from "next/image";
import type { ArticleBlock } from "../content";

/**
 * Editorial article body, styled after the Henning Larsen reference layout:
 * a larger lead paragraph, headed sections, an accented pull quote, in-body
 * images with captions, and an optional stats grid.
 */
export function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="mx-auto max-w-[42rem]">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "lead":
            return (
              <p
                key={i}
                className="font-display text-xl font-medium leading-relaxed text-[color:var(--ink-950)] md:text-2xl"
              >
                {block.text}
              </p>
            );
          case "heading":
            return (
              <h2
                key={i}
                className="mt-12 font-display text-2xl font-bold leading-snug text-[color:var(--ink-950)] md:text-3xl"
              >
                {block.text}
              </h2>
            );
          case "paragraph":
            return (
              <p
                key={i}
                className="mt-5 leading-relaxed text-[color:var(--ink-950)]/80"
              >
                {block.text}
              </p>
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
          case "stats":
            return (
              <div
                key={i}
                className="mt-10 grid grid-cols-1 gap-4 rounded-lg bg-[color:var(--ice-050)] p-6 sm:grid-cols-3"
              >
                {block.items.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="font-display text-lg font-bold text-[color:var(--gold-700)] md:text-xl">
                      {stat.value}
                    </div>
                    <div className="caption mt-1 text-[color:var(--ink-950)]/60">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
