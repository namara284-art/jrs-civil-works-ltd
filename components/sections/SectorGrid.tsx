import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { sectors, type SectorIcon } from "@/content/sectors";

/**
 * Sector icons drawn as plain geometry — straight lines, right angles and a
 * single stroke weight — so they read as engineering notation rather than
 * stock iconography.
 */
function Icon({ name }: { name: SectorIcon }) {
  const props = {
    viewBox: "0 0 40 40",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    "aria-hidden": true as const,
    className: "h-10 w-10",
  };

  switch (name) {
    case "road":
      return (
        <svg {...props}>
          <path d="M12 4 6 36M28 4l6 32" />
          <path d="M20 6v5M20 17v5M20 28v5" strokeDasharray="0" />
        </svg>
      );
    case "industrial":
      return (
        <svg {...props}>
          <path d="M4 36V16l10 6V16l10 6V10h12v26H4Z" strokeLinejoin="miter" />
          <path d="M30 22h4M30 28h4" />
        </svg>
      );
    case "water":
      return (
        <svg {...props}>
          <path d="M20 5 30 18a10 10 0 1 1-20 0L20 5Z" strokeLinejoin="miter" />
          <path d="M13 26h14" />
        </svg>
      );
    case "public":
      return (
        <svg {...props}>
          <path d="M4 15 20 5l16 10H4Z" strokeLinejoin="miter" />
          <path d="M9 15v15M17 15v15M23 15v15M31 15v15M4 34h32" />
        </svg>
      );
    case "residential":
      return (
        <svg {...props}>
          <path d="M5 18 20 6l15 12v18H5V18Z" strokeLinejoin="miter" />
          <path d="M16 36V24h8v12" strokeLinejoin="miter" />
        </svg>
      );
    case "quarry":
      return (
        <svg {...props}>
          <path d="M3 32h34" />
          <path d="M7 32 17 12l7 12 4-6 5 14" strokeLinejoin="miter" />
        </svg>
      );
  }
}

type SectorGridProps = {
  /** `panel` renders white cards on a light background. */
  variant?: "panel" | "bare";
};

export function SectorGrid({ variant = "panel" }: SectorGridProps) {
  return (
    <RevealGroup
      as="ul"
      className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3"
      staggerChildren={0.07}
    >
      {sectors.map((sector) => (
        <RevealItem
          as="li"
          key={sector.slug}
          className={`group relative flex flex-col p-7 transition-colors duration-300 lg:p-9 ${
            variant === "panel"
              ? "bg-white hover:bg-navy"
              : "bg-mist hover:bg-navy"
          }`}
        >
          <span className="text-teal transition-colors duration-300 group-hover:text-teal-300">
            <Icon name={sector.icon} />
          </span>

          <h3 className="mt-6 font-display text-[1.375rem] leading-[1.05] transition-colors duration-300 group-hover:text-white lg:text-[1.5rem]">
            {sector.title}
          </h3>

          <span
            aria-hidden="true"
            className="mt-4 block h-[2px] w-9 bg-teal transition-[width] duration-500 ease-out group-hover:w-16"
          />

          <p className="mt-4 text-sm leading-relaxed text-charcoal-600 transition-colors duration-300 group-hover:text-white/75">
            {sector.description}
          </p>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
