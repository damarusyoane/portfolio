import { ImageResponse } from "next/og";
import { getNiche } from "@/lib/niches";
import { siteConfig } from "@/lib/site";
import type { Locale } from "@/i18n/routing";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; niche: string }>;
}) {
  const { locale, niche } = await params;
  const n = getNiche(niche);
  const l = locale as Locale;
  const title = n ? n.hero.title[l] : siteConfig.name;
  const eyebrow = n ? n.hero.eyebrow[l] : "";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background: "#0c3a2b",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          color: "#ffffff",
          fontSize: 40,
          fontWeight: 800,
          letterSpacing: -2,
        }}
      >
        ottomate<span style={{ color: "#ffd23f" }}>.</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            color: "#ffd23f",
            fontSize: 26,
            fontWeight: 700,
            marginBottom: 20,
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            color: "#ffffff",
            fontSize: 66,
            fontWeight: 800,
            lineHeight: 1.06,
            letterSpacing: -2.5,
            maxWidth: 1040,
          }}
        >
          {title}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          color: "#b9d1c5",
          fontSize: 24,
        }}
      >
        <div>
          {l === "fr" ? "Agence d'automatisation IA" : "AI automation agency"}
        </div>
        <div>ottomateagency.com</div>
      </div>
    </div>,
    size,
  );
}
