"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { EASE_OUT } from "@/lib/motion";

type HeroProps = {
  image: { src: string; alt: string };
  eyebrow?: string;
  title: string;
  /** Word or phrase within `title` rendered in teal. */
  highlight?: string;
  body: string;
  primaryCta: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
};

/** Splits the heading so a single phrase can carry the teal accent. */
function Heading({ title, highlight }: { title: string; highlight?: string }) {
  if (!highlight || !title.includes(highlight)) {
    return <>{title}</>;
  }
  const [before, after] = title.split(highlight);
  return (
    <>
      {before}
      <span className="text-teal-300">{highlight}</span>
      {after}
    </>
  );
}

export function Hero({
  image,
  eyebrow,
  title,
  highlight,
  body,
  primaryCta,
  secondaryCta,
}: HeroProps) {
  const reduced = useReducedMotion();
  const rise = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.75, delay, ease: EASE_OUT },
        };

  return (
    <section className="relative isolate flex min-h-[86svh] items-end overflow-hidden bg-navy pt-24 lg:min-h-[92svh]">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Flat tonal scrims — solid colour at fixed opacity, never a gradient. */}
      <div aria-hidden="true" className="absolute inset-0 bg-navy/62" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-navy/28" />
      <div
        aria-hidden="true"
        className="bg-stack-inverse bg-stack-drift pointer-events-none absolute inset-0 opacity-90"
      />

      {/* Structural corner rules. */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-24 hidden h-40 w-px bg-white/25 lg:block"
      />
      <div
        aria-hidden="true"
        className="absolute right-0 bottom-0 hidden h-56 w-px bg-white/25 lg:block"
      />

      <Container className="relative z-10 pb-16 pt-20 lg:pb-24">
        <div className="max-w-4xl">
          {eyebrow ? (
            <motion.p
              data-reveal=""
              {...rise(0.05)}
              className="text-[0.6875rem] font-bold uppercase tracking-[0.24em] text-teal-300"
            >
              {eyebrow}
            </motion.p>
          ) : null}

          <motion.h1
            data-reveal=""
            {...rise(0.14)}
            className="mt-5 max-w-3xl text-balance font-display text-[2.75rem] leading-[0.92] text-white sm:text-6xl lg:text-7xl xl:text-[5.25rem]"
          >
            <Heading title={title} highlight={highlight} />
          </motion.h1>

          <motion.span
            data-reveal=""
            aria-hidden="true"
            {...(reduced
              ? {}
              : {
                  initial: { scaleX: 0 },
                  animate: { scaleX: 1 },
                  transition: { duration: 0.7, delay: 0.3, ease: EASE_OUT },
                })}
            className="mt-8 block h-[3px] w-24 origin-left bg-teal"
          />

          <motion.p
            data-reveal=""
            {...rise(0.34)}
            className="mt-8 max-w-2xl text-pretty text-base leading-relaxed text-white/80 sm:text-lg"
          >
            {body}
          </motion.p>

          <motion.div data-reveal="" {...rise(0.44)} className="mt-10 flex flex-wrap gap-4">
            <ButtonLink href={primaryCta.href} variant="onDark">
              {primaryCta.label}
            </ButtonLink>
            {secondaryCta ? (
              <ButtonLink
                href={secondaryCta.href}
                variant="secondary"
                className="border-white/35 text-white hover:border-teal-300 hover:text-teal-300"
              >
                {secondaryCta.label}
              </ButtonLink>
            ) : null}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
