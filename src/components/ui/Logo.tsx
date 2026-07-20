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
  // Intrinsic file dimensions — passed as width/height so the browser reserves
  // the correct box from the aspect ratio (no layout shift). `style` still sets
  // the rendered height; width stays auto. Keep in sync with the source files.
  const { src, w, h } = withSubtitle
    ? { src: "/brand/print3d-logo.webp", w: 578, h: 180 }
    : { src: "/brand/print3d-mark.webp", w: 521, h: 120 };

  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="Print3D"
      width={w}
      height={h}
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
