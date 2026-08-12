import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { RevealImage } from "@/components/ui/RevealImage";
import { PageHeader } from "@/components/sections/PageHeader";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { SectorGrid } from "@/components/sections/SectorGrid";
import { CTAPanel } from "@/components/sections/CTAPanel";
import { TealRule } from "@/components/ui/TealRule";
import { sectorsIntro } from "@/content/sectors";
import { whyJrs } from "@/content/company";

export const metadata = pageMetadata({
  title: "Sectors We Serve",
  description:
    "Roads and transport, commercial and industrial development, water and agricultural infrastructure, public infrastructure, real estate, and mining, quarrying and materials operations.",
  path: "/sectors",
});

export default function SectorsPage() {
  return (
    <>
      <PageHeader
        index="04"
        title="Sectors"
        titleSecondary="we serve"
        intro={sectorsIntro}
        image={{
          src: "/images/road-tarmac.jpg",
          alt: "A completed sealed road curving through green countryside, with a road user travelling along it.",
        }}
      />

      <section aria-labelledby="sector-list" className="bg-white py-16 lg:py-24">
        <Container>
          {/* Keeps the heading order intact: the grid's cards are h3. */}
          <h2 id="sector-list" className="sr-only">
            The sectors we work in
          </h2>
          <SectorGrid />
        </Container>
      </section>

      {/* Split: imagery from the profile alongside the "why JRS" points. */}
      <section className="relative overflow-hidden bg-mist py-20 lg:py-28">
        <div
          aria-hidden="true"
          className="bg-stack pointer-events-none absolute inset-y-0 left-0 w-32 lg:w-56"
        />
        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <SectionHeading
                index="05"
                eyebrow="Why JRS"
                title="Why JRS"
                titleSecondary="Civil Works Ltd"
              />

              <ul className="mt-10">
                {whyJrs.map((reason, i) => (
                  <Reveal
                    as="li"
                    key={reason.title}
                    delay={i * 0.06}
                    className="group flex gap-6 border-b border-line/80 py-6 first:pt-0 last:border-b-0"
                  >
                    <span className="section-index shrink-0 text-2xl text-teal/40 transition-colors duration-300 group-hover:text-teal">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-[1.25rem] leading-[1.1] lg:text-[1.5rem]">
                        {reason.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-charcoal-600">
                        {reason.description}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:col-span-6 lg:grid-cols-2">
              <RevealImage
                src="/images/crusher-plant-wide.jpg"
                alt="A stone crushing and screening plant with conveyors and stockpiles at a materials yard."
                aspect="aspect-[4/5]"
                sizes="(min-width: 1024px) 24vw, 46vw"
              />
              <RevealImage
                src="/images/excavator-earthworks.jpg"
                alt="A tracked excavator cutting into a red-soil embankment during bulk earthworks, with the operator at the controls."
                aspect="aspect-[4/5]"
                className="sm:mt-12"
                sizes="(min-width: 1024px) 24vw, 46vw"
              />
              <RevealImage
                src="/images/murram-road.jpg"
                alt="A wide gravel road corridor running through cleared bushland under an open sky."
                aspect="aspect-[4/5]"
                sizes="(min-width: 1024px) 24vw, 46vw"
              />
              <RevealImage
                src="/images/container-handler.jpg"
                alt="A container handler lifting a container in a yard stacked with shipping containers."
                aspect="aspect-[4/5]"
                className="sm:mt-12"
                sizes="(min-width: 1024px) 24vw, 46vw"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Closing statement band. */}
      <section className="bg-white py-20 lg:py-28">
        <Container>
          <Reveal className="max-w-4xl">
            <TealRule width="5rem" />
            <p className="mt-8 text-balance font-display text-[1.875rem] uppercase leading-[1.12] text-navy sm:text-[2.5rem] lg:text-[3rem]">
              We deliver civil works solutions across a wide range of sectors,
              helping build stronger communities and{" "}
              <span className="text-teal">sustainable infrastructure.</span>
            </p>
          </Reveal>
        </Container>
      </section>

      <CTAPanel
        title="Working in one of these sectors?"
        body="Tell us what the works involve and where. We will confirm what JRS can take on and how it would be delivered."
        secondary={{ href: "/projects", label: "See our work" }}
        image={{ src: "/images/grader-close.jpg", alt: "" }}
      />
    </>
  );
}
