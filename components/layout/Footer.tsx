import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { primaryNav } from "./nav";
import { services } from "@/content/services";
import { channelHref, formattedAddress, siteConfig } from "@/site.config";

const SOCIAL_LABELS: Record<string, string> = {
  linkedin: "LinkedIn",
  facebook: "Facebook",
  x: "X",
  whatsapp: "WhatsApp",
};

function SocialIcon({ network }: { network: string }) {
  const common = { "aria-hidden": true, viewBox: "0 0 24 24", className: "h-4 w-4" } as const;
  switch (network) {
    case "linkedin":
      return (
        <svg {...common} fill="currentColor">
          <path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0ZM.3 8.4h4.4V24H.3V8.4Zm7.6 0h4.2v2.13h.06c.59-1.05 2.03-2.16 4.18-2.16 4.47 0 5.3 2.86 5.3 6.58V24h-4.4v-7.9c0-1.88-.04-4.3-2.7-4.3-2.7 0-3.12 2.05-3.12 4.17V24H7.9V8.4Z" />
        </svg>
      );
    case "facebook":
      return (
        <svg {...common} fill="currentColor">
          <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.96h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07Z" />
        </svg>
      );
    case "x":
      return (
        <svg {...common} fill="currentColor">
          <path d="M18.24 2.25h3.31l-7.23 8.26L22.75 21.75h-6.6l-5.17-6.76-5.92 6.76H1.75l7.73-8.83L1.25 2.25h6.77l4.67 6.18 5.55-6.18Zm-1.16 17.52h1.83L7.01 4.13H5.05l12.03 15.64Z" />
        </svg>
      );
    default:
      return (
        <svg {...common} fill="currentColor">
          <path d="M12.04 2A9.9 9.9 0 0 0 2.1 11.9c0 1.75.46 3.46 1.34 4.97L2 22l5.28-1.38a9.87 9.87 0 0 0 4.76 1.21h.01a9.9 9.9 0 0 0 9.94-9.9A9.9 9.9 0 0 0 12.04 2Zm5.8 14.09c-.25.69-1.44 1.32-1.98 1.37-.53.06-1.02.26-3.44-.72-2.9-1.17-4.74-4.1-4.88-4.29-.14-.19-1.16-1.55-1.16-2.96 0-1.4.73-2.09.99-2.38.26-.29.57-.36.76-.36h.55c.18 0 .42-.07.65.5.25.6.84 2.07.91 2.22.08.15.13.32.02.51-.1.19-.16.32-.31.49-.16.18-.33.4-.47.53-.16.15-.32.32-.14.63.19.3.83 1.37 1.78 2.22 1.22 1.09 2.25 1.42 2.56 1.58.31.15.5.13.68-.08.19-.21.79-.92.99-1.24.2-.31.4-.26.68-.15.27.1 1.73.81 2.03.96.3.15.5.22.57.35.07.13.07.74-.18 1.42Z" />
        </svg>
      );
  }
}

export function Footer() {
  const email = channelHref(siteConfig.contact.email, "email");
  const phone = channelHref(siteConfig.contact.phone, "phone");
  const address = formattedAddress();
  const socials = Object.entries(siteConfig.social).filter(
    ([, url]) => typeof url === "string" && url.length > 0,
  ) as [string, string][];

  return (
    <footer className="relative overflow-hidden bg-navy text-white/70">
      <div
        aria-hidden="true"
        className="bg-stack-inverse pointer-events-none absolute inset-0 opacity-60"
      />

      <Container className="relative">
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-10 lg:py-20">
          <div className="lg:col-span-4">
            <Logo tone="white" width={186} />
            <p className="mt-6 max-w-xs font-display text-xl uppercase leading-[1.1] tracking-tight text-white">
              {siteConfig.tagline}
            </p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed">
              A Ugandan civil engineering and construction company delivering
              infrastructure for public and private-sector clients.
            </p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-2">
            <h2 className="text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-teal-300">
              Explore
            </h2>
            <ul className="mt-5 space-y-2.5 text-sm">
              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-teal-300">
              Services
            </h2>
            <ul className="mt-5 space-y-2.5 text-sm">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services#${service.slug}`}
                    className="transition-colors hover:text-white"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-teal-300">
              Contact
            </h2>
            <address className="mt-5 space-y-3 text-sm not-italic">
              {address ? <p className="text-white/80">{address}</p> : null}
              {!address ? (
                <p className="text-white/80">{siteConfig.corporate.country}</p>
              ) : null}
              {email ? (
                <p>
                  <a href={email} className="transition-colors hover:text-white">
                    {siteConfig.contact.email.value}
                  </a>
                </p>
              ) : null}
              {phone ? (
                <p>
                  <a href={phone} className="transition-colors hover:text-white">
                    {siteConfig.contact.phone.value}
                  </a>
                </p>
              ) : null}
              {!email && !phone ? (
                <p className="max-w-xs leading-relaxed text-white/60">
                  Contact details are being finalised. Please send an enquiry
                  through the{" "}
                  <Link href="/contact#enquiry" className="text-teal-300 underline underline-offset-4 hover:text-white">
                    project enquiry form
                  </Link>
                  .
                </p>
              ) : null}
            </address>

            {socials.length ? (
              <ul className="mt-6 flex gap-3">
                {socials.map(([network, url]) => (
                  <li key={network}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${siteConfig.name} on ${SOCIAL_LABELS[network] ?? network}`}
                      className="flex h-10 w-10 items-center justify-center border border-white/20 text-white/75 transition-colors hover:border-teal-300 hover:text-white"
                    >
                      <SocialIcon network={network} />
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/12 py-7 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-white/50">
            {siteConfig.corporate.legalStatus}
            {siteConfig.corporate.registrationNumber
              ? ` · Reg. No. ${siteConfig.corporate.registrationNumber}`
              : ""}
          </p>
        </div>
      </Container>
    </footer>
  );
}
