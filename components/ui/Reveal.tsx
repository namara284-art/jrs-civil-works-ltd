"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ElementType, ReactNode } from "react";
import { VIEWPORT, fadeIn, fadeUp, slideInLeft, slideInRight } from "@/lib/motion";

const PRESETS = {
  up: fadeUp,
  fade: fadeIn,
  left: slideInLeft,
  right: slideInRight,
} as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Direction of travel. `fade` moves nothing. */
  preset?: keyof typeof PRESETS;
  delay?: number;
  as?: ElementType;
  /** Custom variants win over `preset`. */
  variants?: Variants;
};

/**
 * Scroll-triggered reveal. Under `prefers-reduced-motion` the content renders
 * immediately at its final position with no transition at all.
 */
export function Reveal({
  children,
  className,
  preset = "up",
  delay = 0,
  as = "div",
  variants,
}: RevealProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  if (reduced) {
    const Tag = as as ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      data-reveal=""
      className={className}
      variants={variants ?? PRESETS[preset]}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  staggerChildren?: number;
  delayChildren?: number;
};

/** Parent wrapper that staggers any `RevealItem` children beneath it. */
export function RevealGroup({
  children,
  className,
  as = "div",
  staggerChildren = 0.08,
  delayChildren = 0,
}: StaggerProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  if (reduced) {
    const Tag = as as ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      data-reveal=""
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={{ hidden: {}, visible: { transition: { staggerChildren, delayChildren } } }}
    >
      {children}
    </MotionTag>
  );
}

type ItemProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  preset?: keyof typeof PRESETS;
  variants?: Variants;
};

/** Child of `RevealGroup`. Inherits the parent's stagger timing. */
export function RevealItem({
  children,
  className,
  as = "div",
  preset = "up",
  variants,
}: ItemProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  if (reduced) {
    const Tag = as as ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag data-reveal="" className={className} variants={variants ?? PRESETS[preset]}>
      {children}
    </MotionTag>
  );
}
