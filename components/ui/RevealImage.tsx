"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { VIEWPORT, imageReveal } from "@/lib/motion";

type RevealImageProps = {
  src: string;
  alt: string;
  /** Tailwind aspect utility, e.g. "aspect-[4/3]". */
  aspect?: string;
  className?: string;
  sizes: string;
  priority?: boolean;
  /** Applies a slow zoom on hover — used on cards, not on editorial imagery. */
  hoverZoom?: boolean;
};

/**
 * Image in a fixed-ratio frame that fades and settles from a slight scale-up
 * when it enters the viewport. Under reduced motion it renders statically.
 */
export function RevealImage({
  src,
  alt,
  aspect = "aspect-[4/3]",
  className = "",
  sizes,
  priority = false,
  hoverZoom = false,
}: RevealImageProps) {
  const reduced = useReducedMotion();

  const img = (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={`object-cover ${
        hoverZoom
          ? "transition-transform duration-[900ms] ease-out group-hover:scale-[1.045]"
          : ""
      }`}
    />
  );

  if (reduced) {
    return (
      <div className={`relative overflow-hidden bg-mist ${aspect} ${className}`}>{img}</div>
    );
  }

  return (
    <motion.div
      data-reveal=""
      className={`relative overflow-hidden bg-mist ${aspect} ${className}`}
      variants={imageReveal}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      {img}
    </motion.div>
  );
}
