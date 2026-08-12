import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/site.config";

type LogoProps = {
  /** `white` renders the mono knockout for navy panels. */
  tone?: "colour" | "white";
  /** Rendered width in CSS pixels; height follows the source proportions. */
  width?: number;
  className?: string;
  /** Wrap in a link to the home page. */
  href?: string | null;
  priority?: boolean;
};

/**
 * The full JRS lockup. The source artwork is 997 × 430, so the intrinsic size
 * is passed through unchanged and only the rendered width varies — the mark
 * never stretches and stays crisp on high-density screens.
 */
const INTRINSIC = { width: 997, height: 430 };

export function Logo({
  tone = "colour",
  width = 168,
  className = "",
  href = "/",
  priority = false,
}: LogoProps) {
  const src = tone === "white" ? "/brand/jrs-logo-white.png" : "/brand/jrs-logo.png";
  const height = Math.round((width * INTRINSIC.height) / INTRINSIC.width);

  const img = (
    <Image
      src={src}
      alt={`${siteConfig.name} logo`}
      width={INTRINSIC.width}
      height={INTRINSIC.height}
      priority={priority}
      sizes={`${width * 2}px`}
      style={{ width, height }}
      className="h-auto w-auto"
    />
  );

  if (!href) {
    return <span className={`inline-flex ${className}`}>{img}</span>;
  }

  return (
    <Link
      href={href}
      className={`inline-flex ${className}`}
      aria-label={`${siteConfig.name} — home`}
    >
      {img}
    </Link>
  );
}

/** The stacked symbol on its own, for compact and decorative placements. */
export function LogoMark({
  tone = "colour",
  size = 40,
  className = "",
}: {
  tone?: "colour" | "white";
  size?: number;
  className?: string;
}) {
  const src = tone === "white" ? "/brand/jrs-mark-white.png" : "/brand/jrs-mark.png";
  return (
    <Image
      src={src}
      alt=""
      aria-hidden="true"
      width={336}
      height={430}
      sizes={`${size * 2}px`}
      style={{ height: size, width: "auto" }}
      className={className}
    />
  );
}
