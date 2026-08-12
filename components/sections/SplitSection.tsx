import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { RevealImage } from "@/components/ui/RevealImage";
import { TealRule } from "@/components/ui/TealRule";

type SplitSectionProps = {
  index?: string;
  eyebrow?: string;
  title: string;
  titleSecondary?: string;
  image: { src: string; alt: string };
  /** Which side the image sits on at `lg` and above. */
  imageSide?: "left" | "right";
  aspect?: string;
  children: ReactNode;
  className?: string;
  tone?: "white" | "mist";
  /** Adds a structural pattern panel behind the image edge. */
  pattern?: boolean;
};

/**
 * Text on one side, profile imagery on the other. The workhorse layout for the
 * about, services and delivery pages.
 */
export function SplitSection({
  index,
  eyebrow,
  title,
  titleSecondary,
  image,
  imageSide = "right",
  aspect = "aspect-[4/3]",
  children,
  className = "",
  tone = "white",
  pattern = false,
}: SplitSectionProps) {
  const bg = tone === "mist" ? "bg-mist" : "bg-white";
  const imageFirst = imageSide === "left";

  return (
    <section className={`relative overflow-hidden ${bg} py-20 lg:py-28 ${className}`}>
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <Reveal
            preset={imageFirst ? "right" : "left"}
            className={imageFirst ? "lg:order-2" : ""}
          >
            {index || eyebrow ? (
              <p className="flex items-baseline gap-4">
                {index ? (
                  <span className="section-index text-sm text-teal">{index}</span>
                ) : null}
                {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
              </p>
            ) : null}

            <h2 className="mt-4 text-balance font-display text-[2.125rem] leading-[0.96] sm:text-5xl lg:text-[3.25rem]">
              {title}
              {titleSecondary ? (
                <>
                  <br />
                  <span className="text-charcoal">{titleSecondary}</span>
                </>
              ) : null}
            </h2>

            <TealRule className="mt-6" />

            <div className="prose-jrs mt-7 text-pretty">{children}</div>
          </Reveal>

          <div className={`relative ${imageFirst ? "lg:order-1" : ""}`}>
            {pattern ? (
              <div
                aria-hidden="true"
                className={`bg-stack absolute -z-10 h-40 w-40 ${
                  imageFirst ? "-left-6 -top-6" : "-right-6 -top-6"
                } hidden lg:block`}
              />
            ) : null}
            <RevealImage
              src={image.src}
              alt={image.alt}
              aspect={aspect}
              sizes="(min-width: 1024px) 46vw, 92vw"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
