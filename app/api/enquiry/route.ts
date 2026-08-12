import { NextResponse } from "next/server";
import { enquirySchema, type EnquiryFieldErrors } from "@/lib/enquiry-schema";
import { siteConfig } from "@/site.config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Project enquiry endpoint.
 *
 * Order of business: rate limit → schema validation → spam checks → delivery.
 * Delivery is pluggable so the site can go live before a mail provider is
 * chosen; see README → "Form setup".
 */

/* -------------------------------------------------------------------------- */
/* Rate limiting                                                              */
/* -------------------------------------------------------------------------- */

type Bucket = { count: number; resetAt: number };

/**
 * In-memory limiter. Enough for a single long-lived Node instance; on a
 * serverless platform each instance keeps its own counter, which still blunts
 * bursts. Swap in a shared store (Upstash, Redis) if abuse becomes an issue.
 */
const buckets = new Map<string, Bucket>();

function rateLimited(ip: string): boolean {
  const { max, windowMs } = siteConfig.forms.rateLimit;
  const now = Date.now();
  const bucket = buckets.get(ip);

  if (!bucket || now > bucket.resetAt) {
    buckets.set(ip, { count: 1, resetAt: now + windowMs });
    // Opportunistic cleanup so the map cannot grow without bound.
    if (buckets.size > 5000) {
      for (const [key, value] of buckets) {
        if (now > value.resetAt) buckets.delete(key);
      }
    }
    return false;
  }

  bucket.count += 1;
  return bucket.count > max;
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

/* -------------------------------------------------------------------------- */
/* Delivery                                                                    */
/* -------------------------------------------------------------------------- */

type Enquiry = ReturnType<typeof enquirySchema.parse>;

function asPlainText(enquiry: Enquiry): string {
  return [
    `New project enquiry — ${siteConfig.name}`,
    "",
    `Name:            ${enquiry.name}`,
    `Organisation:    ${enquiry.organisation || "—"}`,
    `Email:           ${enquiry.email}`,
    `Phone:           ${enquiry.phone}`,
    `Service:         ${enquiry.service}`,
    `Location:        ${enquiry.location}`,
    "",
    "Project details:",
    enquiry.details,
    "",
    `Received: ${new Date().toISOString()}`,
  ].join("\n");
}

async function deliver(enquiry: Enquiry): Promise<void> {
  const webhook = process.env.ENQUIRY_WEBHOOK_URL;
  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO_EMAIL;

  if (webhook) {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        ...enquiry,
        source: siteConfig.url,
        receivedAt: new Date().toISOString(),
      }),
    });
    if (!res.ok) {
      throw new Error(`Enquiry webhook responded ${res.status}`);
    }
    return;
  }

  if (resendKey && to) {
    const from = process.env.ENQUIRY_FROM_EMAIL ?? "enquiries@jrscivilworksltd.com";
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `${siteConfig.name} <${from}>`,
        to: [to],
        reply_to: enquiry.email,
        subject: `Project enquiry — ${enquiry.service} — ${enquiry.name}`,
        text: asPlainText(enquiry),
      }),
    });
    if (!res.ok) {
      throw new Error(`Resend responded ${res.status}`);
    }
    return;
  }

  // No provider configured yet: log so nothing is silently lost in development.
  console.info("[enquiry] no delivery provider configured\n" + asPlainText(enquiry));
}

/* -------------------------------------------------------------------------- */
/* Handler                                                                     */
/* -------------------------------------------------------------------------- */

export async function POST(request: Request) {
  const ip = clientIp(request);

  if (rateLimited(ip)) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Too many enquiries have been sent from this connection. Please try again shortly.",
      },
      { status: 429 },
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "The enquiry could not be read. Please try again." },
      { status: 400 },
    );
  }

  const parsed = enquirySchema.safeParse(json);
  if (!parsed.success) {
    const fieldErrors: EnquiryFieldErrors = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof EnquiryFieldErrors;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return NextResponse.json(
      {
        ok: false,
        message: "Please check the highlighted fields and try again.",
        fieldErrors,
      },
      { status: 422 },
    );
  }

  const enquiry = parsed.data;

  // Honeypot: only an automated client fills a field no human can see.
  if (enquiry.company_website) {
    // Report success so bots gain no signal from the response.
    return NextResponse.json({ ok: true });
  }

  // Timing trap: a form completed faster than a person plausibly could.
  const minMs = siteConfig.forms.minSubmitSeconds * 1000;
  if (typeof enquiry.elapsedMs === "number" && enquiry.elapsedMs < minMs) {
    return NextResponse.json({ ok: true });
  }

  try {
    await deliver(enquiry);
  } catch (error) {
    console.error("[enquiry] delivery failed", error);
    return NextResponse.json(
      {
        ok: false,
        message:
          "Your enquiry could not be delivered just now. Please try again shortly.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
