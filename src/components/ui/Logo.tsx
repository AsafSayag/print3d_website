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
 * Print3D wordmark — rebuilt to echo the mark shown on the wall in the hero
 * video: uppercase "PRINT" set in crisp type beside an isometric blue "3D"
 * cube (a hexagon with a lighter top face), over the "ARCHITECTURAL MODELING"
 * subtitle.
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
          gap: "0.3em",
          fontFamily: "var(--font-num), sans-serif",
          fontWeight: 700,
          fontSize: size,
          letterSpacing: "0.02em",
          color: wordColor,
        }}
      >
        <span dir="ltr">PRINT</span>
        <CubeMark />
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

/**
 * Isometric blue "3D" cube — a hexagon body with a lighter top face and a
 * faint shaded side, echoing the dimensional cube in the hero-video logo.
 * Sized in `em` so it scales with the wordmark.
 */
function CubeMark() {
  return (
    <svg
      viewBox="0 0 46 50"
      width="1.46em"
      height="1.58em"
      role="img"
      aria-label="3D"
      shapeRendering="geometricPrecision"
      style={{ display: "block", flexShrink: 0 }}
    >
      <defs>
        <linearGradient id="p3d-cube-body" x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0" stopColor="#4d8fd6" />
          <stop offset="0.55" stopColor="#2f6fc0" />
          <stop offset="1" stopColor="#1e4f96" />
        </linearGradient>
        <linearGradient id="p3d-cube-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8fbdec" />
          <stop offset="1" stopColor="#5f9ce0" />
        </linearGradient>
      </defs>
      {/* Cube body (hexagon) */}
      <path
        d="M23 2.4 42.6 13.5 V36.5 L23 47.6 3.4 36.5 V13.5 Z"
        fill="url(#p3d-cube-body)"
      />
      {/* Lighter top face for a clean, dimensional read */}
      <path d="M23 2.4 42.6 13.5 23 24.6 3.4 13.5 Z" fill="url(#p3d-cube-top)" />
      {/* 3D wordlet */}
      <text
        x="23"
        y="39.4"
        textAnchor="middle"
        fontFamily="var(--font-num), sans-serif"
        fontWeight="700"
        fontSize="15"
        fill="#fff"
      >
        3D
      </text>
    </svg>
  );
}
