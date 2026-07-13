import Link from "next/link";

type Props = {
  /** Kept for API compatibility; the wordmark image is white-on-transparent
   * and is only used on dark surfaces. */
  variant?: "light" | "dark";
  /** Rendered height of the logo, in px. */
  size?: number;
  /** Show the full lockup (with the "Architectural Modeling" subtitle). */
  withSubtitle?: boolean;
  className?: string;
  href?: string | null;
  ariaLabel?: string;
};

/**
 * Print3D wordmark — the official brand logo (uppercase PRINT + the isometric
 * blue/grey "3D" cube), served as a transparent image. `withSubtitle` swaps in
 * the full lockup that also carries "Architectural Modeling".
 */
export function Logo({
  size = 34,
  withSubtitle = false,
  className,
  href = "/",
  ariaLabel = "Print3D — לעמוד הבית",
}: Props) {
  const src = withSubtitle
    ? "/brand/print3d-logo.webp"
    : "/brand/print3d-mark.webp";

  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="Print3D"
      draggable={false}
      className={className}
      style={{ height: `${size}px`, width: "auto", display: "block" }}
    />
  );

  if (!href) return <span aria-hidden="true">{img}</span>;

  return (
    <Link href={href} aria-label={ariaLabel} style={{ display: "inline-flex" }}>
      {img}
    </Link>
  );
}
