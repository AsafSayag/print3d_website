import Link from "next/link";
import { Fragment } from "react";

/**
 * Renders a paragraph/list string with lightweight inline markup:
 *   **bold**        → <strong> (emphasis for important text)
 *   [label](/path)  → internal <Link>
 *
 * Kept deliberately small: it tokenises on the two patterns only, so the
 * article content stays plain, translation-friendly strings in content.ts.
 */
export function RichText({ text }: { text: string }) {
  // Fresh regex per render: a module-level `/…/g` carries its `lastIndex`
  // across calls (shared mutable state). A local literal gives each render a
  // clean instance starting at 0, so no reset is needed.
  const pattern = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
  const nodes: React.ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));

    if (match[1] !== undefined) {
      // **bold**
      nodes.push(
        <strong key={match.index} className="font-bold text-[color:var(--ink-950)]">
          {match[1]}
        </strong>
      );
    } else {
      // [label](href)
      const label = match[2];
      const href = match[3];
      nodes.push(
        <Link
          key={match.index}
          href={href}
          className="font-semibold text-[color:var(--gold-700)] underline decoration-[color:var(--gold-500)]/40 underline-offset-4 transition-colors hover:decoration-[color:var(--gold-500)]"
        >
          {label}
        </Link>
      );
    }
    last = match.index + match[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));

  return (
    <>
      {nodes.map((n, i) => (
        <Fragment key={i}>{n}</Fragment>
      ))}
    </>
  );
}
