import { Suspense } from "react";
import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { RevealImage } from "@/components/ui/RevealImage";
import { TealRule } from "@/components/ui/TealRule";
import { PageHeader } from "@/components/sections/PageHeader";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { channelHref, formattedAddress, siteConfig } from "@/site.config";
import { services } from "@/content/services";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Send a project enquiry to JRS Civil Works Ltd — scope, location and programme — and a member of the team will respond directly.",
  path: "/contact",
});

/** Renders a contact line only when a real value is configured. */
function ContactLine({
  label,
  value,
  href,
}: {
  label: string;
  value: string | null;
  href?: string | null;
}) {
  if (!value) return null;
  return (
    <div className="border-b border-line py-4 last:border-b-0">
      <dt className="text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-teal">
        {label}
      </dt>
      <dd className="mt-2 text-navy">
        {href ? (
          <a href={href} className="transition-colors hover:text-teal">
            {value}
          </a>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}

export default function ContactPage() {
  const email = channelHref(siteConfig.contact.email, "email");
  const phone = channelHref(siteConfig.contact.phone, "phone");
  const altPhone = channelHref(siteConfig.contact.altPhone, "phone");
  const address = formattedAddress();
  const hasAnyDetail = Boolean(email || phone || address);

  return (
    <>
      <PageHeader
        index="07"
        title="Contact"
        titleSecondary="JRS Civil Works"
        intro="Tell us about the works, where they are and when they need to start. A member of the team will review the details and respond directly."
        image={{
          src: "/images/jrs-signage.jpg",
          alt: "JRS Civil Works Ltd site signage and information boards set up at a project entrance.",
        }}
      />

      <section className="bg-white py-16 lg:py-24">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            {/* Enquiry form ------------------------------------------- */}
            <div id="enquiry" className="scroll-mt-32 lg:col-span-7">
              <Reveal>
                <p className="eyebrow">Project enquiry</p>
                <h2 className="mt-4 text-balance font-display text-[2rem] leading-[0.98] sm:text-[2.75rem]">
                  Send us the
                  <br />
                  <span className="text-charcoal">details</span>
                </h2>
                <TealRule className="mt-6" />
              </Reveal>

              <div className="mt-10">
                <Suspense
                  fallback={
                    <p className="text-sm text-charcoal-600">Loading form…</p>
                  }
                >
                  <EnquiryForm />
                </Suspense>
              </div>
            </div>

            {/* Contact details ---------------------------------------- */}
            <aside className="lg:col-span-5">
              <Reveal preset="right">
                <div className="border border-line bg-mist p-7 lg:p-9">
                  <h2 className="font-display text-[1.5rem] leading-[1.05] lg:text-[1.75rem]">
                    Contact details
                  </h2>
                  <TealRule className="mt-5" />

                  <dl className="mt-6">
                    <ContactLine
                      label="Email"
                      value={siteConfig.contact.email.value}
                      href={email}
                    />
                    <ContactLine
                      label="Telephone"
                      value={siteConfig.contact.phone.value}
                      href={phone}
                    />
                    <ContactLine
                      label="Alternative number"
                      value={siteConfig.contact.altPhone.value}
                      href={altPhone}
                    />
                    <ContactLine label="Registered office" value={address} />
                    <ContactLine
                      label="Country of operation"
                      value={siteConfig.contact.address.country}
                    />
                    <ContactLine
                      label="Legal status"
                      value={siteConfig.corporate.legalStatus}
                    />
                    <ContactLine
                      label="Registration number"
                      value={siteConfig.corporate.registrationNumber}
                    />
                  </dl>

                  {!hasAnyDetail ? (
                    <p className="mt-6 border-l-[3px] border-teal bg-white px-5 py-4 text-sm leading-relaxed text-charcoal-600">
                      {siteConfig.contact.pendingNote}
                    </p>
                  ) : null}
                </div>

                <div className="mt-8 border border-line p-7 lg:p-9">
                  <h2 className="font-display text-[1.25rem] leading-[1.05]">
                    What we can quote for
                  </h2>
                  <span aria-hidden="true" className="mt-4 block h-[2px] w-9 bg-teal" />
                  <ul className="mt-5 space-y-2.5">
                    {services.map((service) => (
                      <li key={service.slug} className="flex items-start gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-[0.55rem] block h-[2px] w-4 shrink-0 bg-teal"
                        />
                        <span className="text-sm leading-relaxed text-charcoal">
                          {service.title}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <RevealImage
                    src="/images/jrs-fleet.jpg"
                    alt="A tipper truck, excavator, water bowser, compressor and pick-up in JRS Civil Works Ltd livery assembled outside a depot."
                    aspect="aspect-[3/2]"
                    sizes="(min-width: 1024px) 38vw, 92vw"
                  />
                </div>
              </Reveal>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
