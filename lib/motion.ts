import type { Transition, Variants } from "framer-motion";

/**
 * Shared motion language.
 *
 * Movement is restrained on purpose: short distances, one easing curve, no
 * bounce. Framer Motion's `useReducedMotion` is honoured by the `Reveal`
 * primitive, and CSS animations are neutralised in `globals.css`.
 */

export const EASE_OUT: Transition["ease"] = [0.16, 1, 0.3, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7, ease: EASE_OUT } },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE_OUT } },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE_OUT } },
};

/** Image reveal: a gentle scale-down settle, no parallax. */
export const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 1.06 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: EASE_OUT },
  },
};

/** Teal rule that draws itself from the left. */
export const ruleDraw: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.7, ease: EASE_OUT },
  },
};

/** Parent that staggers its children's `hidden` → `visible` transition. */
export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
});

/**
 * Viewport settings shared by every scroll-triggered reveal.
 *
 * `amount` is deliberately small and the bottom margin negative, so an element
 * commits to its reveal as soon as its top edge clears the fold. A fast flick
 * then cannot leave a block stranded at opacity 0.
 */
export const VIEWPORT = {
  once: true,
  amount: 0.05,
  margin: "0px 0px -6% 0px",
} as const;
