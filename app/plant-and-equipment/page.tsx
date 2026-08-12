import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { PageHeader } from "@/components/sections/PageHeader";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { EquipmentCard } from "@/components/sections/EquipmentCard";
import { CTAPanel } from "@/components/sections/CTAPanel";
import { equipmentByGroup, equipmentGroups } from "@/content/equipment";

export const metadata = pageMetadata({
  title: "Plant & Equipment",
  description:
    "Concrete mixers and pumps, dump and tipper trucks, water bowsers, compressors, stone crushers, crusher plant, hydraulic rock breakers, forklifts and mobile and tower cranes.",
  path: "/plant-and-equipment",
});

const GROUPS = ["fleet", "specialised"] as const;

export default function PlantAndEquipmentPage() {
  return (
    <>
      <PageHeader
        index="05"
        title="Plant &"
        titleSecondary="equipment"
        intro="JRS Civil Works Ltd deploys reliable construction equipment to support efficient delivery across infrastructure, concrete works and site operations."
        image={{
          src: "/images/jrs-fleet.jpg",
          alt: "A tipper truck, excavator, water bowser, compressor and pick-up in JRS Civil Works Ltd livery assembled outside a depot.",
        }}
      />

      {GROUPS.map((group, groupIndex) => {
        const meta = equipmentGroups[group];
        const items = equipmentByGroup(group);
        const mist = groupIndex % 2 === 1;

        return (
          <section
            key={group}
            id={group}
            className={`relative overflow-hidden py-20 lg:py-28 ${mist ? "bg-mist" : "bg-white"}`}
          >
            {mist ? (
              <div
                aria-hidden="true"
                className="bg-stack pointer-events-none absolute inset-y-0 right-0 w-32 lg:w-56"
              />
            ) : null}

            <Container className="relative">
              <SectionHeading
                index={meta.index}
                eyebrow={groupIndex === 0 ? "Core fleet" : "Specialised plant"}
                title={meta.titleLead}
                titleSecondary={meta.titleTail}
                intro={meta.intro}
              />

              <RevealGroup
                as="ul"
                className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
                staggerChildren={0.07}
              >
                {items.map((item, i) => (
                  <RevealItem as="li" key={item.slug} className="h-full">
                    <EquipmentCard
                      item={item}
                      index={groupIndex === 0 ? i : i + 6}
                      priority={groupIndex === 0 && i < 3}
                    />
                  </RevealItem>
                ))}
              </RevealGroup>
            </Container>
          </section>
        );
      })}

      <CTAPanel
        eyebrow="Plant enquiries"
        title="Need plant on your site?"
        body="Tell us the works, the ground conditions and the programme. We will confirm what equipment suits the job and how it would be supported."
        primary={{ href: "/contact#enquiry", label: "Make a Plant Enquiry" }}
        secondary={{ href: "/services", label: "Explore Our Services" }}
        image={{ src: "/images/crusher-plant-wide.jpg", alt: "" }}
      />
    </>
  );
}
