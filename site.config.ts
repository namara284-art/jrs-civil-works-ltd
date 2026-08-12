/**
 * ---------------------------------------------------------------------------
 * JRS Civil Works Ltd — single source of truth for site-wide settings.
 * ---------------------------------------------------------------------------
 * Everything a non-developer is likely to need to change lives in this file:
 * contact details, social links, the canonical domain and the enquiry-form
 * recipient. Edit the values below and redeploy — no other file needs to
 * change.
 *
 * PLACEHOLDERS
 * Fields whose value is `null` are not yet confirmed by the company. The site
 * hides them gracefully rather than showing invented details. Replace a `null`
 * with a real string to make it appear everywhere it is used.
 */

export type ContactChannel = {
  /** Display value, e.g. "+256 700 000 000". `null` = not yet confirmed. */
  value: string | null;
  /** Optional href override. Derived automatically when omitted. */
  href?: string;
};

export const siteConfig = {
  /** Legal / display name. */
  name: "JRS Civil Works Ltd",
  shortName: "JRS",
  tagline: "Building Infrastructure. Delivering with Precision.",
  description:
    "JRS Civil Works Ltd delivers practical, safe and durable civil engineering and construction solutions for public and private-sector clients across Uganda.",

  /** Canonical production domain. Used for metadata, sitemap and robots.txt. */
  url: "https://jrscivilworksltd.com",

  /** Corporate information, as stated in the company profile. */
  corporate: {
    legalStatus: "Private Company Limited by Shares",
    /** Not yet confirmed — profile shows "[To be inserted]". */
    registrationNumber: null as string | null,
    country: "Uganda",
  },

  /**
   * Contact channels. The company profile carries placeholders for these, so
   * they ship as `null`. Fill them in before launch.
   */
  contact: {
    email: { value: null } as ContactChannel,
    phone: { value: null } as ContactChannel,
    /** Optional second line, e.g. a WhatsApp or office number. */
    altPhone: { value: null } as ContactChannel,
    address: {
      /** Street / plot line. */
      line1: null as string | null,
      /** Town or city. */
      city: null as string | null,
      country: "Uganda",
    },
    /** Free-text note shown on the contact page while details are pending. */
    pendingNote:
      "Full office and telephone details are being finalised. Send an enquiry through the form and a member of the team will respond directly.",
  },

  /**
   * Social profiles. Set a URL to make the icon appear in the footer; leave
   * `null` to hide it.
   */
  social: {
    linkedin: null as string | null,
    facebook: null as string | null,
    x: null as string | null,
    whatsapp: null as string | null,
  },

  /**
   * Enquiry form delivery.
   *
   * The API route at `app/api/enquiry/route.ts` validates and rate-limits every
   * submission, then forwards it using whichever of these is configured. See
   * README → "Form setup".
   *
   * `ENQUIRY_WEBHOOK_URL`  — any HTTPS endpoint (Formspree, Zapier, Make,
   *                          n8n, a Google Apps Script, your own CRM).
   * `ENQUIRY_TO_EMAIL`     — recipient used by the Resend integration.
   * `RESEND_API_KEY`       — enables transactional email delivery via Resend.
   *
   * With none of these set the route still validates and responds successfully
   * in development, and logs the payload to the server console.
   */
  forms: {
    /** Minimum seconds a genuine visitor takes to fill the form (spam trap). */
    minSubmitSeconds: 3,
    /** Max submissions per IP per rolling window. */
    rateLimit: { max: 5, windowMs: 10 * 60 * 1000 },
  },

  /** Services offered, used by the enquiry form's "Service required" field. */
  serviceOptions: [
    "Road Works & Transport Infrastructure",
    "Earthworks & Site Development",
    "Building & Structural Works",
    "Drainage & Water Infrastructure",
    "Construction Materials",
    "Plant, Equipment & Fabrication",
    "General enquiry",
  ],
} as const;

export type SiteConfig = typeof siteConfig;

/** Normalised `mailto:` / `tel:` href for a channel, or `null` if unset. */
export function channelHref(
  channel: ContactChannel,
  kind: "email" | "phone",
): string | null {
  if (!channel.value) return null;
  if (channel.href) return channel.href;
  return kind === "email"
    ? `mailto:${channel.value}`
    : `tel:${channel.value.replace(/[^\d+]/g, "")}`;
}

/** Human-readable address, or `null` when nothing is confirmed. */
export function formattedAddress(): string | null {
  const { line1, city, country } = siteConfig.contact.address;
  const parts = [line1, city, country].filter(Boolean);
  return parts.length > 1 ? parts.join(", ") : null;
}
