import type { Metadata } from "next";
import { siteConfig } from "@/site.config";

type PageSeo = {
  title: string;
  description: string;
  /** Path with leading slash, e.g. "/services". */
  path: string;
  /** Optional page-specific social image; defaults to the site OG image. */
  image?: string;
};

/**
 * Builds per-page metadata with canonical URLs plus Open Graph and Twitter
 * cards. LinkedIn, WhatsApp and Facebook all read Open Graph; X reads the
 * Twitter card, so both are emitted.
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
}: PageSeo): Metadata {
  const url = `${siteConfig.url}${path === "/" ? "" : path}`;

  /**
   * Declaring an `openGraph` object on a page replaces the file-based image
   * that `app/opengraph-image.tsx` would otherwise supply, so the share card is
   * re-attached here explicitly. Without this, every page except the home page
   * would share with no image on LinkedIn, WhatsApp, Facebook and X.
   */
  const shareImage = image ?? `${siteConfig.url}/opengraph-image`;
  const images = [
    { url: shareImage, width: 1200, height: 630, alt: `${siteConfig.name} — ${siteConfig.tagline}` },
  ];

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title: `${title} | ${siteConfig.name}`,
      description,
      url,
      locale: "en_GB",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [shareImage],
    },
  };
}

/**
 * Organization structured data. Only facts confirmed in the company profile
 * are emitted — unset contact details are omitted rather than invented.
 */
export function organizationJsonLd() {
  const { contact, corporate } = siteConfig;
  const address: Record<string, string> = { "@type": "PostalAddress" };
  if (contact.address.line1) address.streetAddress = contact.address.line1;
  if (contact.address.city) address.addressLocality = contact.address.city;
  address.addressCountry = contact.address.country;

  const sameAs = Object.values(siteConfig.social).filter(
    (v): v is string => typeof v === "string" && v.length > 0,
  );

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    legalName: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/brand/jrs-logo.png`,
    slogan: siteConfig.tagline,
    description: siteConfig.description,
    address,
    areaServed: corporate.country,
    ...(contact.email.value ? { email: contact.email.value } : {}),
    ...(contact.phone.value ? { telephone: contact.phone.value } : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };
}
