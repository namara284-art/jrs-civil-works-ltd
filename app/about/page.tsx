import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { RevealImage } from "@/components/ui/RevealImage";
import { TealRule } from "@/components/ui/TealRule";
import { PageHeader } from "@/components/sections/PageHeader";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { CTAPanel } from "@/components/sections/CTAPanel";
import {
  closingStatement,
  companyIntro,
  coreAreas,
  corporateObjectives,
  mission,
  vision,
  whyJrs,
} from "@/content/company";
import { qualityCommitments } from "@/content/process";
import { siteConfig } from "@/site.config";

export const metadata = pageMetadata({
  title: "About Us",
  description:
    "JRS Civil Works Ltd is a Ugandan civil engineering and construction company delivering reliable infrastructure for public and private-sector clients.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        index="01"
        title="About JRS"
        titleSecondary="Civil Works Ltd"
        intro="Established to deliver reliable infrastructure solutions for public and private-sector clients across Uganda."
        image={{
          src: "/images/excavator-aerial.jpg",
          alt: "Aerial view of an excavator cutting a long drainage trench alongside a graded corridor.",
        }}
      />

      {/* Company introduction ------------------------------------------- */}
      <section className="bg-white py-20 lg:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="eyebrow">The company</p>
                <h2 className="mt-4 max-w-2xl text-balance font-display text-[2.125rem] leading-[0.96] sm:text-5xl lg:text-[3.25rem]">
                  Practical delivery,
                  <br />
                  <span className="text-charcoal">sound workmanship</span>
                </h2>
                <TealRule className="mt-6" />
                <div className="prose-jrs mt-7 max-w-2xl text-pretty">
                  {companyIntro.map((paragraph) => (
                    <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                  ))}
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <RevealImage
                src="/images/jrs-signage.jpg"
                alt="JRS Civil Works Ltd site signage and information boards set up at a project entrance."
                aspect="aspect-[3/2]"
                sizes="(min-width: 1024px) 40vw, 92vw"
              />
              <RevealImage
                src="/images/grader-roller.jpg"
                alt="A motor grader shaping a road formation on an open site, with a compaction roller working behind it."
                aspect="aspect-[3/2]"
                className="mt-6"
                sizes="(min-width: 1024px) 40vw, 92vw"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Vision & mission ------------------------------------------------ */}
      <section className="relative isolate overflow-hidden bg-navy py-20 lg:py-28">
        <div
          aria-hidden="true"
          className="bg-stack-inverse bg-stack-drift pointer-events-none absolute inset-0"
        />
        <div aria-hidden="true" className="absolute left-0 top-0 h-28 w-[3px] bg-teal" />

        <Container className="relative">
          <RevealGroup className="grid gap-px bg-white/12 md:grid-cols-2">
            <RevealItem className="bg-navy p-8 lg:p-12">
              <p className="section-index text-sm text-teal-300">01</p>
              <h2 className="mt-4 font-display text-3xl text-white lg:text-4xl">
                Vision
              </h2>
              <span aria-hidden="true" className="mt-5 block h-[3px] w-14 bg-teal" />
              <p className="mt-6 max-w-md text-pretty leading-relaxed text-white/78">
                {vision}
              </p>
            </RevealItem>

            <RevealItem className="bg-navy p-8 lg:p-12">
              <p className="section-index text-sm text-teal-300">02</p>
              <h2 className="mt-4 font-display text-3xl text-white lg:text-4xl">
                Mission
              </h2>
              <span aria-hidden="true" className="mt-5 block h-[3px] w-14 bg-teal" />
              <p className="mt-6 max-w-md text-pretty leading-relaxed text-white/78">
                {mission}
              </p>
            </RevealItem>
          </RevealGroup>
        </Container>
      </section>

      {/* Core areas ------------------------------------------------------ */}
      <section className="relative overflow-hidden bg-white py-20 lg:py-28">
        <Container>
          <SectionHeading
            index="03"
            eyebrow="Core areas"
            title="Three lines"
            titleSecondary="of delivery"
          />

          <RevealGroup
            as="ul"
            className="mt-14 grid gap-px border border-line bg-line md:grid-cols-3"
            staggerChildren={0.08}
          >
            {coreAreas.map((area, i) => (
              <RevealItem
                as="li"
                key={area.title}
                className="group bg-white p-8 transition-colors duration-300 hover:bg-mist lg:p-10"
              >
                <span className="section-index text-4xl text-teal/25">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-[1.5rem] leading-[1.05] lg:text-[1.75rem]">
                  {area.title}
                </h3>
                <span
                  aria-hidden="true"
                  className="mt-5 block h-[2px] w-10 bg-teal transition-[width] duration-500 ease-out group-hover:w-20"
                />
                <p className="mt-5 text-sm leading-relaxed text-charcoal-600">
                  {area.description}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* Why JRS --------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-mist py-20 lg:py-28">
        <div
          aria-hidden="true"
          className="bg-stack pointer-events-none absolute inset-y-0 right-0 w-32 lg:w-64"
        />
        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                index="04"
                eyebrow="Why JRS"
                title="Why JRS"
                titleSecondary="Civil Works Ltd"
              />
              <div className="mt-10">
                <RevealImage
                  src="/images/crusher-machine.jpg"
                  alt="A large crushing machine working over a bed of quarried stone."
                  aspect="aspect-[4/3]"
                  sizes="(min-width: 1024px) 38vw, 92vw"
                />
              </div>
            </div>

            <RevealGroup as="ul" className="lg:col-span-7" staggerChildren={0.08}>
              {whyJrs.map((reason, i) => (
                <RevealItem
                  as="li"
                  key={reason.title}
                  className="group flex gap-6 border-b border-line py-7 first:pt-0 last:border-b-0"
                >
                  <span className="section-index shrink-0 text-2xl text-teal/40 transition-colors duration-300 group-hover:text-teal">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-[1.375rem] leading-[1.1] lg:text-[1.625rem]">
                      {reason.title}
                    </h3>
                    <p className="mt-2.5 leading-relaxed text-charcoal-600">
                      {reason.description}
                    </p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </Container>
      </section>

      {/* Quality, safety and corporate objectives ------------------------ */}
      <section className="bg-white py-20 lg:py-28">
        <Container>
          <SectionHeading
            index="05"
            eyebrow="Quality & safety"
            title="Built to a"
            titleSecondary="standard"
          />

          <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
            <RevealGroup className="lg:col-span-7" staggerChildren={0.08}>
              {qualityCommitments.map((item) => (
                <RevealItem
                  key={item.title}
                  className="border-l-[3px] border-teal pl-7 [&+&]:mt-10"
                >
                  <h3 className="font-display text-[1.5rem] leading-[1.05] lg:text-[1.75rem]">
                    {item.title}
                  </h3>
                  <p className="mt-4 max-w-xl leading-relaxed text-charcoal-600">
                    {item.body}
                  </p>
                </RevealItem>
              ))}

              <RevealItem className="mt-12">
                <h3 className="font-display text-[1.5rem] leading-[1.05] lg:text-[1.75rem]">
                  Corporate objectives
                </h3>
                <ol className="mt-6 space-y-5">
                  {corporateObjectives.map((objective, i) => (
                    <li key={objective.slice(0, 24)} className="flex gap-5">
                      <span className="section-index shrink-0 pt-1 text-sm text-teal">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="max-w-xl text-sm leading-relaxed text-charcoal-600">
                        {objective}
                      </p>
                    </li>
                  ))}
                </ol>
              </RevealItem>
            </RevealGroup>

            <div className="lg:col-span-5">
              <RevealImage
                src="/images/rock-breaker.jpg"
                alt="A hydraulic rock breaker mounted on an excavator arm breaking oversize rock, throwing up dust."
                aspect="aspect-[4/5]"
                sizes="(min-width: 1024px) 38vw, 92vw"
              />

              <Reveal className="mt-8 border border-line bg-mist p-7">
                <h3 className="font-display text-lg">Corporate information</h3>
                <dl className="mt-5 space-y-3 text-sm">
                  <div className="flex justify-between gap-6 border-b border-line pb-3">
                    <dt className="text-charcoal-600">Company name</dt>
                    <dd className="text-right font-semibold text-navy">
                      {siteConfig.name}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-6 border-b border-line pb-3">
                    <dt className="text-charcoal-600">Legal status</dt>
                    <dd className="text-right font-semibold text-navy">
                      {siteConfig.corporate.legalStatus}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-6">
                    <dt className="text-charcoal-600">Country of operation</dt>
                    <dd className="text-right font-semibold text-navy">
                      {siteConfig.corporate.country}
                    </dd>
                  </div>
                </dl>
              </Reveal>
            </div>
          </div>

          <Reveal className="mt-16 border-t border-line pt-12">
            <p className="max-w-3xl text-balance font-display text-[1.75rem] uppercase leading-[1.15] text-navy sm:text-[2.25rem]">
              “{closingStatement}”
            </p>
          </Reveal>
        </Container>
      </section>

      <CTAPanel
        title="Work with JRS Civil Works Ltd"
        body="From roads and earthworks to materials supply and plant-supported operations, we are set up to take on the practical side of infrastructure delivery."
        secondary={{ href: "/services", label: "Explore Our Services" }}
      />
    </>
  );
}
