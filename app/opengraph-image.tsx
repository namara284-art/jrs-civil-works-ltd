import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/site.config";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social share card used by LinkedIn, WhatsApp, Facebook and X.
 *
 * Drawn rather than photographed so it stays legible at thumbnail size: navy
 * field, the stacked chevron motif, the real logo lockup and the tagline. The
 * logo is inlined as a data URI because the renderer cannot fetch from the
 * site's own origin while the response is still being generated.
 */
export default async function OpengraphImage() {
  const logo = await readFile(
    join(process.cwd(), "public", "brand", "jrs-logo-white.png"),
  );
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0A2540",
          padding: "64px 72px",
          position: "relative",
        }}
      >
        {/* Stacked chevron motif, held well back. */}
        <svg
          width="620"
          height="620"
          viewBox="0 0 132 132"
          style={{ position: "absolute", right: -110, top: -60, opacity: 0.14 }}
        >
          <g fill="none" stroke="#FFFFFF" strokeWidth={4}>
            <path d="M16 34 L66 12 L116 34" />
            <path d="M16 62 L66 40 L116 62" />
            <path d="M16 90 L66 68 L116 90" />
            <path d="M40 104 L66 116 L92 104" />
          </g>
        </svg>

        <img src={logoSrc} width={324} height={140} alt="" />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ width: 96, height: 6, backgroundColor: "#257C8F" }} />
          <div
            style={{
              fontSize: 62,
              fontWeight: 800,
              color: "#FFFFFF",
              lineHeight: 1.08,
              marginTop: 34,
              maxWidth: 900,
              letterSpacing: -1,
            }}
          >
            Building Infrastructure. Delivering with Precision.
          </div>
          <div
            style={{
              fontSize: 27,
              color: "rgba(255,255,255,0.72)",
              marginTop: 26,
              maxWidth: 880,
              lineHeight: 1.4,
            }}
          >
            Civil engineering and construction for public and private-sector
            clients across Uganda.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
