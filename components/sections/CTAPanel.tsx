import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { TealRule } from "@/components/ui/TealRule";
import { ButtonLink } from "@/components/ui/Button";

type CTAPanelProps = {
  eyebrow?: string;
  title: string;
  body: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
  /** Optional background photograph, held well back behind a navy wash. */
  image?: { src: string; alt: string };
};

/** The dark navy call-to-action band that closes most pages. */
export function CTAPanel({
  eyebrow = "Start a conversation",
  title,
  body,
  primary = { href: "/contact#enquiry", label: "Request a Consultation" },
  secondary,
  image,
}: CTAPanelProps) {
  return (
    <section className="relative isolate overflow-hidden bg-navy">
      {image ? (
        <>
          <Image
            src={image.src}
            alt=""
            aria-hidden="true"
            fill
            sizes="100vw"
            className="object-cover"
          />
          {/* Held right back — the photograph is texture, not subject matter. */}
          <div aria-hidden="true" className="absolute inset-0 bg-navy/94" />
        </>
      ) : null}

      <div
        aria-hidden="true"
        className="bg-stack-inverse bg-stack-drift pointer-events-none absolute inset-0"
      />

      {/* Structural edge rules. */}
      <div aria-hidden="true" className="absolute left-0 top-0 h-24 w-[3px] bg-teal" />
      <div aria-hidden="true" className="absolute bottom-0 right-0 h-24 w-[3px] bg-teal" />

      <Container className="relative py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-16">
          <Reveal className="lg:col-span-7">
            <p className="text-[0.6875rem] font-bold uppercase tracking-[0.24em] text-teal-300">
              {eyebrow}
            </p>
            <h2 className="mt-5 text-balance font-display text-[2.25rem] leading-[0.96] text-white sm:text-5xl lg:text-[3.5rem]">
              {title}
            </h2>
            <TealRule className="mt-7" width="5rem" tone="light" />
          </Reveal>

          <Reveal className="lg:col-span-5" delay={0.08}>
            <p className="max-w-md text-pretty leading-relaxed text-white/75">{body}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink href={primary.href} variant="onDark">
                {primary.label}
              </ButtonLink>
              {secondary ? (
                <ButtonLink
                  href={secondary.href}
                  variant="secondary"
                  className="border-white/35 text-white hover:border-teal-300 hover:text-teal-300"
                >
                  {secondary.label}
                </ButtonLink>
              ) : null}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
