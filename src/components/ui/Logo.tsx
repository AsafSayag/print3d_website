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
  /** Forwarded to next/link when the logo is a link. */
  prefetch?: boolean;
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
  prefetch,
}: Props) {
  // Intrinsic file dimensions — passed as width/height so the browser reserves
  // the correct box from the aspect ratio (no layout shift). `style` still sets
  // the rendered height; width stays auto. Keep in sync with the source files.
  // `small` is an optional ~2x-of-header-size cut, offered via srcSet so a
  // 34px-tall header logo doesn't download the full 521px-wide file on every
  // page; 3x screens still pick the full file.
  const { src, w, h, small } = withSubtitle
    ? { src: "/brand/print3d-logo.webp", w: 578, h: 180, small: null }
    : {
        src: "/brand/print3d-mark.webp",
        w: 521,
        h: 120,
        small: { src: "/brand/print3d-mark-300.webp", w: 300 },
      };

  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      srcSet={small ? `${small.src} ${small.w}w, ${src} ${w}w` : undefined}
      sizes={small ? `${Math.round((size * w) / h)}px` : undefined}
      alt="Print3D"
      width={w}
      height={h}
      draggable={false}
      className={className}
      style={{ height: `${size}px`, width: "auto", display: "block" }}
    />
  );

  if (!href) return <span role="img" aria-label={ariaLabel}>{img}</span>;

  return (
    <Link href={href} aria-label={ariaLabel} prefetch={prefetch} style={{ display: "inline-flex" }}>
      {img}
    </Link>
  );
}
