import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { TealRule } from "@/components/ui/TealRule";
import { primaryNav } from "@/components/layout/nav";
import Link from "next/link";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-white pt-24">
      <div aria-hidden="true" className="bg-stack pointer-events-none absolute inset-0" />
      <Container className="relative py-24 lg:py-36">
        <p className="section-index text-sm text-teal">404</p>
        <h1 className="mt-4 max-w-2xl text-balance font-display text-[2.5rem] leading-[0.94] sm:text-6xl lg:text-7xl">
          Page not
          <br />
          <span className="text-charcoal">found</span>
        </h1>
        <TealRule className="mt-7" width="5rem" />
        <p className="mt-7 max-w-xl leading-relaxed text-charcoal-600">
          The page you were looking for is not here. It may have moved, or the
          address may be slightly off.
        </p>

        <div className="mt-9 flex flex-wrap gap-4">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href="/contact#enquiry" variant="secondary">
            Contact JRS
          </ButtonLink>
        </div>

        <nav aria-label="Site pages" className="mt-14 border-t border-line pt-8">
          <h2 className="eyebrow">All pages</h2>
          <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-display text-xl uppercase text-navy transition-colors hover:text-teal"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </section>
  );
}
