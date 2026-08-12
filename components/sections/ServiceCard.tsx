import Link from "next/link";
import Image from "next/image";
import type { Service } from "@/content/services";

/**
 * Compact service card: index numeral, title, one-line summary and a thin teal
 * rule that extends on hover. Square corners, hairline border, no shadow.
 */
export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services#${service.slug}`}
      className="group relative flex h-full flex-col border border-line bg-white p-7 transition-colors duration-300 hover:border-teal/45 focus-visible:border-teal lg:p-8"
    >
      <span className="section-index text-sm text-teal transition-colors duration-300 group-hover:text-navy">
        {service.index}
      </span>

      <h3 className="mt-5 font-display text-[1.5rem] leading-[1.05] transition-colors duration-300 group-hover:text-teal lg:text-[1.65rem]">
        {service.title}
      </h3>

      <span
        aria-hidden="true"
        className="mt-5 block h-[2px] w-10 bg-teal transition-[width] duration-500 ease-out group-hover:w-20"
      />

      <p className="mt-5 flex-1 text-sm leading-relaxed text-charcoal-600">
        {service.summary}
      </p>

      <span className="mt-7 inline-flex items-center gap-2 text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-navy transition-colors duration-300 group-hover:text-teal">
        View service
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M1 8h13M9 3l5 5-5 5" strokeLinecap="square" />
        </svg>
      </span>
    </Link>
  );
}

/**
 * Image-led variant used on the services page grid, where a photograph carries
 * more weight than the numeral.
 */
export function ServiceCardMedia({ service }: { service: Service }) {
  return (
    <Link
      href={`#${service.slug}`}
      className="group relative flex h-full flex-col border border-line bg-white transition-colors duration-300 hover:border-teal/45"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-mist">
        <Image
          src={service.image.src}
          alt={service.image.alt}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
        />
        <span className="absolute left-0 top-0 bg-navy px-3 py-2 font-display text-sm text-white">
          {service.index}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 lg:p-7">
        <h3 className="font-display text-[1.375rem] leading-[1.05] transition-colors duration-300 group-hover:text-teal">
          {service.title}
        </h3>
        <span
          aria-hidden="true"
          className="mt-4 block h-[2px] w-10 bg-teal transition-[width] duration-500 ease-out group-hover:w-20"
        />
        <p className="mt-4 text-sm leading-relaxed text-charcoal-600">
          {service.summary}
        </p>
      </div>
    </Link>
  );
}
