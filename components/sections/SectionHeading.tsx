import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { TealRule } from "@/components/ui/TealRule";

type SectionHeadingProps = {
  index?: string;
  eyebrow?: string;
  title: string;
  titleSecondary?: string;
  intro?: string;
  /** Aligns the block and constrains the intro measure. */
  align?: "left" | "center";
  tone?: "dark" | "light";
  /** Slot for a link or button rendered opposite the heading on wide screens. */
  aside?: ReactNode;
  className?: string;
  id?: string;
};

/** Standard section masthead: index, heading, teal rule, optional intro. */
export function SectionHeading({
  index,
  eyebrow,
  title,
  titleSecondary,
  intro,
  align = "left",
  tone = "dark",
  aside,
  className = "",
  id,
}: SectionHeadingProps) {
  const onDark = tone === "light";
  const centred = align === "center";

  return (
    <div
      className={`${
        aside ? "flex flex-col gap-8 md:flex-row md:items-end md:justify-between" : ""
      } ${className}`}
    >
      <Reveal className={centred ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
        {index || eyebrow ? (
          <p
            className={`flex items-baseline gap-4 ${centred ? "justify-center" : ""}`}
          >
            {index ? (
              <span
                className={`section-index text-sm ${onDark ? "text-teal-300" : "text-teal"}`}
              >
                {index}
              </span>
            ) : null}
            {eyebrow ? (
              <span
                className={`text-[0.6875rem] font-bold uppercase tracking-[0.22em] ${
                  onDark ? "text-teal-300" : "text-teal"
                }`}
              >
                {eyebrow}
              </span>
            ) : null}
          </p>
        ) : null}

        <h2
          id={id}
          className={`mt-4 text-balance font-display text-[2.125rem] leading-[0.96] sm:text-5xl lg:text-[3.25rem] ${
            onDark ? "text-white" : ""
          }`}
        >
          {title}
          {titleSecondary ? (
            <>
              <br />
              <span className={onDark ? "text-white/55" : "text-charcoal"}>
                {titleSecondary}
              </span>
            </>
          ) : null}
        </h2>

        <TealRule
          className={`mt-6 ${centred ? "mx-auto" : ""}`}
          tone={onDark ? "light" : "teal"}
        />

        {intro ? (
          <p
            className={`mt-6 max-w-2xl text-pretty leading-relaxed ${
              centred ? "mx-auto" : ""
            } ${onDark ? "text-white/75" : "text-charcoal-600"}`}
          >
            {intro}
          </p>
        ) : null}
      </Reveal>

      {aside ? <div className="shrink-0">{aside}</div> : null}
    </div>
  );
}
