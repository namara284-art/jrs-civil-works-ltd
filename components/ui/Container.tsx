import type { ElementType, ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** `wide` relaxes the measure for full-bleed-adjacent layouts. */
  size?: "default" | "wide" | "narrow";
};

const SIZES = {
  narrow: "max-w-3xl",
  default: "max-w-7xl",
  wide: "max-w-[96rem]",
} as const;

export function Container({
  children,
  className = "",
  as: Tag = "div",
  size = "default",
}: ContainerProps) {
  return (
    <Tag className={`mx-auto w-full ${SIZES[size]} px-5 sm:px-8 lg:px-12 ${className}`}>
      {children}
    </Tag>
  );
}
