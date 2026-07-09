import { Reveal } from "@/components/ui/Reveal";
import type { LegalBlock, LegalSectionData } from "@/lib/legal";

/**
 * A single legal section: an H2 anchored by id (the table-of-contents target),
 * followed by its content blocks. `scroll-mt` keeps the heading clear of the
 * fixed header when navigated to via an in-page anchor.
 */
export function LegalSection({
  section,
  index,
}: {
  section: LegalSectionData;
  index: number;
}) {
  return (
    <section
      id={section.id}
      className="scroll-mt-28 md:scroll-mt-32 pt-10 first:pt-0"
    >
      <Reveal>
        <h2 className="h3 heading-accent">
          <span className="text-[color:var(--gold-700)] num me-2 text-base font-[var(--font-num)]">
            {String(index + 1).padStart(2, "0")}
          </span>
          {section.title}
        </h2>
        <div className="legal-prose mt-5">
          {section.blocks.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function Block({ block }: { block: LegalBlock }) {
  switch (block.type) {
    case "p":
      return <p>{block.text}</p>;
    case "list":
      return (
        <ul>
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    case "cards":
      return (
        <div className="grid gap-3 sm:grid-cols-2 my-5">
          {block.cards.map((card, i) => (
            <div
              key={i}
              className="rounded-2xl border border-[color:var(--ink-950)]/8 bg-[color:var(--ice-050)] p-5"
            >
              <p className="font-display text-base text-[color:var(--ink-950)]">
                {card.title}
              </p>
              <p className="caption text-[color:var(--ink-950)]/65 mt-1.5">
                {card.text}
              </p>
            </div>
          ))}
        </div>
      );
  }
}
