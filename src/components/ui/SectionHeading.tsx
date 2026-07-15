import { Reveal } from "./Reveal";

type Props = {
  eyebrow?: string;
  title: string;
  align?: "start" | "center";
  tone?: "light" | "dark";
  className?: string;
};

/**
 * Section heading with the thin gold accent line beneath it.
 */
export function SectionHeading({
  eyebrow,
  title,
  align = "start",
  tone = "dark",
  className,
}: Props) {
  const isCenter = align === "center";
  const eyebrowColor =
    tone === "light" ? "text-[color:var(--steel-300)]" : "text-[color:var(--gold-700)]";

  return (
    <div
      className={[
        // Mobile always centers the heading (title, eyebrow and the
        // accent underline — see the matching media query in globals.css);
        // the `align` prop only takes effect from md: up.
        "max-md:text-center max-md:mx-auto",
        isCenter ? "md:text-center md:mx-auto" : "",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {eyebrow && (
        <Reveal>
          <p className={`eyebrow mb-3 ${eyebrowColor}`}>{eyebrow}</p>
        </Reveal>
      )}
      <Reveal index={eyebrow ? 1 : 0}>
        <h2
          className={`h2 heading-accent ${isCenter ? "heading-accent--center" : ""}`}
        >
          {title}
        </h2>
      </Reveal>
    </div>
  );
}
