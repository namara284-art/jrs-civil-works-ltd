import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { PageHeader } from "@/components/sections/PageHeader";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { CTAPanel } from "@/components/sections/CTAPanel";
import { processIntro, processStages, qualityCommitments } from "@/content/process";

export const metadata = pageMetadata({
  title: "How We Deliver",
  description:
    "A practical three-stage delivery model connecting planning and preparation, execution and supervision, and quality, safety and handover.",
  path: "/how-we-deliver",
});

export default function HowWeDeliverPage() {
  return (
    <>
      <PageHeader
        index="03"
        title="Civil works"
        titleSecondary="delivery"
        intro={processIntro}
        image={{
          src: "/images/concrete-pump-site.jpg",
          alt: "A concrete pump boom placing concrete over a reinforced foundation raft while site crew guide the pour.",
        }}
      />

      <section className="bg-white pt-20 lg:pt-28">
        <Container>
          <SectionHeading
            eyebrow="Three stages"
            title="From drawings"
            titleSecondary="to handover"
            intro="Each stage has a defined set of activities, so responsibility for the work is clear from mobilisation through to completion."
          />
        </Container>
      </section>

      <ProcessSteps stages={processStages} withImages />

      {/* Quality and safety, which run through every stage. */}
      <section className="relative isolate overflow-hidden bg-navy py-20 lg:py-28">
        <div
          aria-hidden="true"
          className="bg-stack-inverse bg-stack-drift pointer-events-none absolute inset-0"
        />
        <div aria-hidden="true" className="absolute right-0 top-0 h-28 w-[3px] bg-teal" />

        <Container className="relative">
          <SectionHeading
            index="04"
            eyebrow="Running through every stage"
            title="Quality"
            titleSecondary="and safety"
            tone="light"
          />

          <RevealGroup
            as="ul"
            className="mt-14 grid gap-px bg-white/12 md:grid-cols-2"
            staggerChildren={0.08}
          >
            {qualityCommitments.map((item) => (
              <RevealItem as="li" key={item.title} className="bg-navy p-8 lg:p-12">
                <h3 className="font-display text-[1.5rem] leading-[1.05] text-white lg:text-[1.875rem]">
                  {item.title}
                </h3>
                <span aria-hidden="true" className="mt-5 block h-[2px] w-12 bg-teal" />
                <p className="mt-6 max-w-md text-pretty leading-relaxed text-white/75">
                  {item.body}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <CTAPanel
        eyebrow="Ready when you are"
        title="Bring us in early"
        body="The earlier we see drawings, quantities and site conditions, the more useful our input on programme, access and materials will be."
        secondary={{ href: "/services", label: "Explore Our Services" }}
      />
    </>
  );
}
