import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { PageHeader } from "@/components/sections/PageHeader";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ServiceCardMedia } from "@/components/sections/ServiceCard";
import { ServiceFeature } from "@/components/sections/ServiceFeature";
import { CTAPanel } from "@/components/sections/CTAPanel";
import { services } from "@/content/services";

export const metadata = pageMetadata({
  title: "Services",
  description:
    "Road works, earthworks, building and structural works, drainage and water infrastructure, construction materials, and plant, equipment and fabrication services across Uganda.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        index="02"
        title="Service"
        titleSecondary="portfolio"
        intro="We deliver end-to-end civil works solutions with precision, quality and reliability."
        image={{
          src: "/images/grader-roller.jpg",
          alt: "A motor grader shaping a road formation on an open site, with a compaction roller working behind it.",
        }}
      />

      {/* Compact overview grid, linking down to each feature. */}
      <section className="bg-white py-16 lg:py-24">
        <Container>
          <SectionHeading
            eyebrow="Six service areas"
            title="What we"
            titleSecondary="deliver"
          />

          <RevealGroup
            as="ul"
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            staggerChildren={0.07}
          >
            {services.map((service) => (
              <RevealItem as="li" key={service.slug} className="h-full">
                <ServiceCardMedia service={service} />
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* Full-width alternating features. */}
      {services.map((service, i) => (
        <ServiceFeature key={service.slug} service={service} position={i} />
      ))}

      <CTAPanel
        title="Need a scope priced?"
        body="Send the drawings, quantities or a description of the works. We will review what is required and come back with a practical approach."
        secondary={{ href: "/plant-and-equipment", label: "Plant & Equipment" }}
        image={{ src: "/images/excavator-aerial.jpg", alt: "" }}
      />
    </>
  );
}
