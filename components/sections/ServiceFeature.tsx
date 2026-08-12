import { Container } from "@/components/ui/Container";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { RevealImage } from "@/components/ui/RevealImage";
import { TealRule } from "@/components/ui/TealRule";
import { ButtonLink } from "@/components/ui/Button";
import type { Service } from "@/content/services";

/**
 * Full-width service feature: numeral and copy on one side, a large profile
 * photograph on the other. Sides alternate down the page and the background
 * alternates white / light gray to set the visual rhythm.
 */
export function ServiceFeature({
  service,
  position,
}: {
  service: Service;
  position: number;
}) {
  const imageLeft = position % 2 === 1;
  const mist = position % 2 === 1;

  return (
    <section
      id={service.slug}
      aria-labelledby={`${service.slug}-title`}
      className={`relative overflow-hidden py-20 lg:py-28 ${mist ? "bg-mist" : "bg-white"}`}
    >
      {mist ? (
        <div
          aria-hidden="true"
          className="bg-stack pointer-events-none absolute inset-y-0 right-0 w-40 opacity-90 lg:w-64"
        />
      ) : null}

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className={`lg:col-span-6 ${imageLeft ? "lg:order-2" : ""}`}>
            <Reveal preset={imageLeft ? "right" : "left"}>
              <p className="section-index text-4xl text-teal/30 lg:text-5xl">
                {service.index}
              </p>

              <h2
                id={`${service.slug}-title`}
                className="mt-3 text-balance font-display text-[2rem] leading-[0.98] sm:text-[2.75rem] lg:text-[3.25rem]"
              >
                {service.title}
              </h2>

              <TealRule className="mt-6" />

              <p className="prose-jrs mt-6 max-w-xl text-pretty leading-relaxed text-charcoal-600">
                {service.description}
              </p>
            </Reveal>

            <RevealGroup
              as="ul"
              className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2"
              staggerChildren={0.06}
            >
              {service.scope.map((item) => (
                <RevealItem as="li" key={item} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-[0.55rem] block h-[2px] w-4 shrink-0 bg-teal"
                  />
                  <span className="text-sm leading-relaxed text-charcoal">{item}</span>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal delay={0.1}>
              <ButtonLink
                href={`/contact?service=${encodeURIComponent(service.title)}#enquiry`}
                variant="secondary"
                className="mt-9"
              >
                Enquire about this service
              </ButtonLink>
            </Reveal>
          </div>

          <div className={`relative lg:col-span-6 ${imageLeft ? "lg:order-1" : ""}`}>
            <RevealImage
              src={service.image.src}
              alt={service.image.alt}
              aspect="aspect-[4/3]"
              sizes="(min-width: 1024px) 48vw, 92vw"
            />
            <span
              aria-hidden="true"
              className={`absolute -bottom-4 hidden h-16 w-[3px] bg-teal lg:block ${
                imageLeft ? "-left-4" : "-right-4"
              }`}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
