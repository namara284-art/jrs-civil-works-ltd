import Image from "next/image";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/site.config";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { RevealImage } from "@/components/ui/RevealImage";
import { Hero } from "@/components/sections/Hero";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { SectorGrid } from "@/components/sections/SectorGrid";
import { EquipmentCard } from "@/components/sections/EquipmentCard";
import { CTAPanel } from "@/components/sections/CTAPanel";
import { services } from "@/content/services";
import { processIntro, processStages } from "@/content/process";
import { sectorsIntro } from "@/content/sectors";
import { equipment } from "@/content/equipment";
import { companyIntro, coreAreas } from "@/content/company";

export const metadata = pageMetadata({
  title: "Civil Engineering & Construction in Uganda",
  description: siteConfig.description,
  path: "/",
});

const HIGHLIGHTED_EQUIPMENT = equipment.slice(0, 4);

export default function HomePage() {
  return (
    <>
      <Hero
        image={{
          src: "/images/hero-grader-bridge.jpg",
          alt: "A motor grader trimming a road formation beside a completed concrete bridge structure.",
        }}
        eyebrow="JRS Civil Works Ltd · Uganda"
        title="Building Infrastructure. Delivering with Precision."
        highlight="Precision."
        body={siteConfig.description}
        primaryCta={{ href: "/services", label: "Explore Our Services" }}
        secondaryCta={{ href: "/contact#enquiry", label: "Request a Consultation" }}
      />

      {/* ---------------------------------------------------------------- 01 */}
      <section className="relative overflow-hidden bg-white py-20 lg:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <SectionHeading
                index="01"
                eyebrow="About JRS"
                title="A Ugandan civil"
                titleSecondary="works company"
              />
              <Reveal delay={0.06}>
                <div className="prose-jrs mt-7 max-w-xl text-pretty">
                  {companyIntro.map((paragraph) => (
                    <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                  ))}
                </div>
                <ButtonLink href="/about" variant="secondary" className="mt-8">
                  More about JRS
                </ButtonLink>
              </Reveal>
            </div>

            <div className="lg:col-span-6">
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="bg-stack absolute -left-6 -top-6 -z-10 hidden h-44 w-44 lg:block"
                />
                <RevealImage
                  src="/images/excavator-earthworks.jpg"
                  alt="A tracked excavator cutting into a red-soil embankment during bulk earthworks, with the operator at the controls."
                  aspect="aspect-[4/3]"
                  sizes="(min-width: 1024px) 46vw, 92vw"
                />
              </div>

              <RevealGroup as="ul" className="mt-8 grid gap-px bg-line sm:grid-cols-3">
                {coreAreas.map((area) => (
                  <RevealItem
                    as="li"
                    key={area.title}
                    className="bg-white p-5 lg:p-6"
                  >
                    <h3 className="font-display text-base leading-[1.15] lg:text-lg">
                      {area.title}
                    </h3>
                    <span
                      aria-hidden="true"
                      className="mt-3 block h-[2px] w-7 bg-teal"
                    />
                    <p className="mt-3 text-xs leading-relaxed text-charcoal-600">
                      {area.description}
                    </p>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- 02 */}
      <section className="relative overflow-hidden bg-mist py-20 lg:py-28">
        <div
          aria-hidden="true"
          className="bg-stack pointer-events-none absolute inset-y-0 left-0 w-32 lg:w-56"
        />
        <Container className="relative">
          <SectionHeading
            index="02"
            eyebrow="What we do"
            title="Service"
            titleSecondary="portfolio"
            intro="We deliver end-to-end civil works solutions with precision, quality and reliability."
            aside={
              <ButtonLink href="/services" variant="secondary">
                All services
              </ButtonLink>
            }
          />

          <RevealGroup
            as="ul"
            className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            staggerChildren={0.07}
          >
            {services.map((service) => (
              <RevealItem as="li" key={service.slug} className="h-full">
                <ServiceCard service={service} />
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- 03 */}
      <section className="bg-white pt-20 lg:pt-28">
        <Container>
          <SectionHeading
            index="03"
            eyebrow="How we deliver"
            title="Planning, execution"
            titleSecondary="and handover"
            intro={processIntro}
            aside={
              <ButtonLink href="/how-we-deliver" variant="secondary">
                Our delivery model
              </ButtonLink>
            }
          />
        </Container>
      </section>
      <ProcessSteps stages={processStages} />

      {/* ---------------------------------------------------------------- 04 */}
      <section className="relative overflow-hidden bg-mist py-20 lg:py-28">
        <Container>
          <SectionHeading
            index="04"
            eyebrow="Sectors we serve"
            title="Where our"
            titleSecondary="work goes"
            intro={sectorsIntro}
          />
          <div className="mt-14">
            <SectorGrid />
          </div>
          <Reveal className="mt-10">
            <ButtonLink href="/sectors" variant="secondary">
              Explore sectors
            </ButtonLink>
          </Reveal>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- 05 */}
      <section className="relative isolate overflow-hidden bg-navy py-20 lg:py-28">
        <Image
          src="/images/jrs-fleet.jpg"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-navy/90" />
        <div
          aria-hidden="true"
          className="bg-stack-inverse bg-stack-drift pointer-events-none absolute inset-0"
        />

        <Container className="relative">
          <SectionHeading
            index="05"
            eyebrow="Plant & equipment"
            title="Equipment that"
            titleSecondary="keeps work moving"
            intro="JRS Civil Works Ltd deploys reliable construction equipment to support efficient delivery across infrastructure, concrete works and site operations."
            tone="light"
            aside={
              <ButtonLink href="/plant-and-equipment" variant="onDark">
                View the fleet
              </ButtonLink>
            }
          />

          <RevealGroup
            as="ul"
            className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            staggerChildren={0.07}
          >
            {HIGHLIGHTED_EQUIPMENT.map((item, i) => (
              <RevealItem as="li" key={item.slug} className="h-full">
                <EquipmentCard item={item} index={i} />
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- 06 */}
      <CTAPanel
        eyebrow="Request a consultation"
        title="Tell us about your project"
        body="Share the scope, location and programme. A member of the JRS team will review the requirements and respond with a practical way forward."
        primary={{ href: "/contact#enquiry", label: "Request a Consultation" }}
        secondary={{ href: "/projects", label: "See our work" }}
        image={{
          src: "/images/concrete-pump-dusk.jpg",
          alt: "",
        }}
      />
    </>
  );
}
