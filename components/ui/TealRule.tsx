"use client";

import { motion, useReducedMotion } from "framer-motion";
import { VIEWPORT, ruleDraw } from "@/lib/motion";

type TealRuleProps = {
  className?: string;
  /** Rule width. */
  width?: string;
  /** `light` renders the rule on dark panels. */
  tone?: "teal" | "light";
};

/**
 * The short structural rule that opens most sections. It draws itself from the
 * left when scrolled into view, and simply appears under reduced motion.
 */
export function TealRule({
  className = "",
  width = "4rem",
  tone = "teal",
}: TealRuleProps) {
  const reduced = useReducedMotion();
  const colour = tone === "teal" ? "bg-teal" : "bg-teal-300";

  if (reduced) {
    return (
      <span
        aria-hidden="true"
        className={`block h-[3px] ${colour} ${className}`}
        style={{ width }}
      />
    );
  }

  return (
    <motion.span
      data-reveal=""
      aria-hidden="true"
      className={`block h-[3px] origin-left ${colour} ${className}`}
      style={{ width }}
      variants={ruleDraw}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    />
  );
}
