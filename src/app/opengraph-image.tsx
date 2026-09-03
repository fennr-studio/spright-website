import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

/**
 * Social card, generated at build time from the same tokens as the site.
 * Using the file convention means every route inherits it automatically, so no
 * page can ship without a card.
 */
export const alt = `${site.name} — specialised technology hiring`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#101215",
          color: "#FAF9F6",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", gap: 6 }}>
            <div style={{ width: 6, height: 34, background: "#5C7BF0", transform: "skewX(-22deg)" }} />
            <div style={{ width: 6, height: 34, background: "#5C7BF0", opacity: 0.55, transform: "skewX(-22deg)" }} />
            <div style={{ width: 6, height: 34, background: "#5C7BF0", opacity: 0.25, transform: "skewX(-22deg)" }} />
          </div>
          <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em" }}>
            Spright Software Systems
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 76,
            fontWeight: 600,
            lineHeight: 1.05,
            letterSpacing: "-0.04em",
            maxWidth: 900,
          }}
        >
          Specialised talent. Stronger technology. Better business.
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24,
            color: "#B4B9C0",
            borderTop: "1px solid rgba(255,255,255,0.15)",
            paddingTop: 28,
          }}
        >
          <span>IT staffing &amp; technology hiring</span>
          <span>Pune &nbsp;·&nbsp; Tampa</span>
        </div>
      </div>
    ),
    size,
  );
}
