"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { TealRule } from "@/components/ui/TealRule";
import type { ProcessStage } from "@/content/process";

type ProcessStepsProps = {
  stages: ProcessStage[];
  /** Show the accompanying photograph for each stage. */
  withImages?: boolean;
  tone?: "white" | "mist";
};

/**
 * Numbered delivery timeline. A teal spine draws itself down the section as the
 * reader scrolls, and each stage fades up as it arrives. With reduced motion
 * the spine is drawn in full and the stages simply render.
 */
export function ProcessSteps({
  stages,
  withImages = false,
  tone = "white",
}: ProcessStepsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "end 0.6"],
  });
  const rawScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const spineScale = useSpring(rawScale, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <section className={`relative py-20 lg:py-28 ${tone === "mist" ? "bg-mist" : "bg-white"}`}>
      <Container>
        <div ref={ref} className="relative">
          {/* Spine: a static hairline with a teal fill that tracks scroll. */}
          <div
            aria-hidden="true"
            className="absolute left-[1.4375rem] top-2 hidden h-[calc(100%-1rem)] w-px bg-line md:block lg:left-[2.1875rem]"
          >
            <motion.span
              data-reveal=""
              className="block h-full w-px origin-top bg-teal"
              style={{ scaleY: reduced ? 1 : spineScale }}
            />
          </div>

          <ol className="space-y-16 lg:space-y-24">
            {stages.map((stage, i) => (
              <li key={stage.index} className="relative md:pl-20 lg:pl-28">
                {/* Numeral marker sitting on the spine. */}
                <Reveal
                  preset="fade"
                  className="absolute left-0 top-0 hidden md:block"
                >
                  <span className="flex h-12 w-12 items-center justify-center bg-navy font-display text-lg text-white lg:h-[4.375rem] lg:w-[4.375rem] lg:text-2xl">
                    {stage.index}
                  </span>
                </Reveal>

                <div
                  className={
                    withImages
                      ? "grid items-center gap-8 lg:grid-cols-2 lg:gap-14"
                      : ""
                  }
                >
                  <Reveal>
                    <p className="section-index text-3xl text-teal/35 md:hidden">
                      {stage.index}
                    </p>

                    <h3 className="mt-3 text-balance font-display text-[1.875rem] leading-[1] sm:text-[2.25rem] lg:text-[2.75rem] md:mt-0">
                      {stage.title}
                    </h3>

                    <TealRule className="mt-5" />

                    <p className="mt-5 max-w-xl text-pretty leading-relaxed text-charcoal-600">
                      {stage.description}
                    </p>

                    <ul className="mt-6 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                      {stage.activities.map((activity) => (
                        <li key={activity} className="flex items-start gap-3">
                          <span
                            aria-hidden="true"
                            className="mt-[0.55rem] block h-[2px] w-4 shrink-0 bg-teal"
                          />
                          <span className="text-sm leading-relaxed text-charcoal">
                            {activity}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </Reveal>

                  {withImages ? (
                    <motion.div
                      data-reveal=""
                      className="relative aspect-[4/3] overflow-hidden bg-mist"
                      initial={reduced ? false : { opacity: 0, scale: 1.05 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Image
                        src={stage.image.src}
                        alt={stage.image.alt}
                        fill
                        sizes="(min-width: 1024px) 44vw, 92vw"
                        className="object-cover"
                        loading={i === 0 ? "eager" : "lazy"}
                      />
                    </motion.div>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
