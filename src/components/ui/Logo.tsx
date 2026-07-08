import Link from "next/link";

type Props = {
  /** "light" = for dark surfaces (white wordmark); "dark" = for light surfaces. */
  variant?: "light" | "dark";
  /** Font size in px that scales the whole lockup. */
  size?: number;
  withSubtitle?: boolean;
  className?: string;
  href?: string | null;
  ariaLabel?: string;
};

/**
 * Print3D wordmark, rebuilt as crisp type (Montserrat) with the signature
 * tilted steel cube around "3D" — matching the brand logo.
 */
export function Logo({
  variant = "light",
  size = 26,
  withSubtitle = false,
  className,
  href = "/",
  ariaLabel = "Print3D — לעמוד הבית",
}: Props) {
  const wordColor = variant === "light" ? "#fff" : "var(--ink-950)";
  const subColor =
    variant === "light" ? "var(--steel-300)" : "var(--gold-700)";

  const content = (
    <span
      className={className}
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "flex-start",
        lineHeight: 1,
        gap: withSubtitle ? "0.35em" : 0,
      }}
      aria-hidden={href ? undefined : true}
    >
      <span
        dir="ltr"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.28em",
          fontFamily: "var(--font-num), sans-serif",
          fontWeight: 700,
          fontSize: size,
          letterSpacing: "-0.01em",
          color: wordColor,
        }}
      >
        <span dir="ltr">Print</span>
        <span
          dir="ltr"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "1.72em",
            height: "1.36em",
            color: "#fff",
            fontSize: "0.82em",
            fontWeight: 700,
            background: "var(--steel-500)",
            borderRadius: "0.34em",
            transform: "skewX(-9deg)",
            boxShadow: "0 2px 10px rgba(110,147,184,0.35)",
          }}
        >
          <span style={{ transform: "skewX(9deg)" }}>3D</span>
        </span>
      </span>
      {withSubtitle && (
        <span
          style={{
            fontFamily: "var(--font-num), sans-serif",
            fontWeight: 500,
            fontSize: size * 0.3,
            letterSpacing: "0.22em",
            color: subColor,
            textTransform: "uppercase",
          }}
          dir="ltr"
        >
          Architectural Modeling
        </span>
      )}
    </span>
  );

  if (!href) return content;

  return (
    <Link href={href} aria-label={ariaLabel} style={{ display: "inline-flex" }}>
      {content}
    </Link>
  );
}
