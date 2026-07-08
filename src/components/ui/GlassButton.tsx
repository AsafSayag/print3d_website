import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "secondary";

type CommonProps = {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
};

type AsLink = CommonProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, "className" | "children"> & {
    href: string;
  };

type AsButton = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, "className" | "children"> & {
    href?: undefined;
  };

type Props = AsLink | AsButton;

function classes(variant: Variant, className?: string) {
  return [
    "glass-btn",
    variant === "primary" ? "glass-btn--primary" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");
}

/**
 * Liquid-glass button. Renders an anchor when `href` is present, else a button.
 * The gold `primary` variant is reserved for the single main CTA per surface.
 */
export function GlassButton({
  variant = "secondary",
  className,
  children,
  ...rest
}: Props) {
  if ("href" in rest && rest.href) {
    const { href, ...linkProps } = rest as AsLink;
    return (
      <Link href={href} className={classes(variant, className)} {...linkProps}>
        {children}
      </Link>
    );
  }
  const buttonProps = rest as AsButton;
  return (
    <button className={classes(variant, className)} {...buttonProps}>
      {children}
    </button>
  );
}
