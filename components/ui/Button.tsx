import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "onDark";

const BASE =
  "group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-[0.8125rem] font-bold uppercase tracking-[0.14em] transition-colors duration-200 border";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-navy text-white border-navy hover:bg-teal hover:border-teal",
  secondary:
    "bg-transparent text-navy border-navy/25 hover:border-teal hover:text-teal",
  ghost:
    "bg-transparent text-navy border-transparent px-0 py-1 hover:text-teal",
  onDark:
    "bg-white text-navy border-white hover:bg-teal hover:text-white hover:border-teal",
};

/** Small chevron that nudges forward on hover. */
function Arrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="h-3 w-3 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M1 8h13M9 3l5 5-5 5" strokeLinecap="square" />
    </svg>
  );
}

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  withArrow?: boolean;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
  withArrow = true,
  ...rest
}: ButtonLinkProps) {
  return (
    <Link href={href} className={`${BASE} ${VARIANTS[variant]} ${className}`} {...rest}>
      {children}
      {withArrow ? <Arrow /> : null}
    </Link>
  );
}

type ButtonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  withArrow?: boolean;
} & ComponentProps<"button">;

export function Button({
  children,
  variant = "primary",
  className = "",
  withArrow = false,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`${BASE} ${VARIANTS[variant]} disabled:cursor-not-allowed disabled:opacity-55 ${className}`}
      {...rest}
    >
      {children}
      {withArrow ? <Arrow /> : null}
    </button>
  );
}
