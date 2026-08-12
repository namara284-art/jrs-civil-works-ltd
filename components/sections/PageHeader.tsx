import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { TealRule } from "@/components/ui/TealRule";
import { Reveal } from "@/components/ui/Reveal";

type PageHeaderProps = {
  index: string;
  title: string;
  /** Second line of the heading, set in charcoal for the two-tone profile look. */
  titleSecondary?: string;
  intro?: string;
  image?: { src: string; alt: string };
};

/**
 * Shared page masthead. With an image it becomes a navy band; without one it is
 * a light structural header. Both echo the profile's two-tone headline
 * treatment — navy on the first line, charcoal on the second.
 */
export function PageHeader({
  index,
  title,
  titleSecondary,
  intro,
  image,
}: PageHeaderProps) {
  if (image) {
    return (
      <section className="relative isolate overflow-hidden bg-navy pt-24">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-navy/78" />
        <div
          aria-hidden="true"
          className="bg-stack-inverse pointer-events-none absolute inset-0 opacity-70"
        />

        <Container className="relative z-10 py-16 lg:py-24">
          <Reveal>
            <p className="section-index text-sm text-teal-300">{index}</p>
            <h1 className="mt-4 max-w-3xl text-balance font-display text-[2.5rem] leading-[0.94] text-white sm:text-6xl lg:text-7xl">
              {title}
              {titleSecondary ? (
                <>
                  <br />
                  <span className="text-white/55">{titleSecondary}</span>
                </>
              ) : null}
            </h1>
            <TealRule className="mt-7" width="5rem" tone="light" />
            {intro ? (
              <p className="mt-7 max-w-2xl text-pretty leading-relaxed text-white/80">
                {intro}
              </p>
            ) : null}
          </Reveal>
        </Container>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden border-b border-line bg-white pt-24">
      <div
        aria-hidden="true"
        className="bg-stack pointer-events-none absolute inset-0"
      />
      <Container className="relative py-16 lg:py-24">
        <Reveal>
          <p className="section-index text-sm text-teal">{index}</p>
          <h1 className="mt-4 max-w-3xl text-balance font-display text-[2.5rem] leading-[0.94] sm:text-6xl lg:text-7xl">
            {title}
            {titleSecondary ? (
              <>
                <br />
                <span className="text-charcoal">{titleSecondary}</span>
              </>
            ) : null}
          </h1>
          <TealRule className="mt-7" width="5rem" />
          {intro ? (
            <p className="prose-jrs mt-7 max-w-2xl text-pretty leading-relaxed text-charcoal-600">
              {intro}
            </p>
          ) : null}
        </Reveal>
      </Container>
    </section>
  );
}
