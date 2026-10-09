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
        background: "#f3f3f0",
        fontFamily: "serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <svg width={56} height={56} viewBox="0 0 40 40" fill="none">
          <circle cx={20} cy={20} r={13.5} stroke="#121417" strokeWidth={3.2} />
          <path
            d="M8.31 13.75 A 13.5 13.5 0 0 1 31.69 13.75"
            stroke="#e4572e"
            strokeWidth={4.6}
            strokeLinecap="round"
          />
          <circle cx={31.69} cy={13.75} r={3.4} fill="#e4572e" />
        </svg>
        <div style={{ color: "#121417", fontSize: 32, fontWeight: 700 }}>
          {siteConfig.name}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            color: "#5b6168",
            fontSize: 26,
            fontFamily: "sans-serif",
            fontWeight: 600,
            marginBottom: 20,
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            color: "#121417",
            fontSize: 64,
            lineHeight: 1.08,
            letterSpacing: -1.5,
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
          borderTop: "2px solid #121417",
          paddingTop: 24,
          color: "#2c3036",
          fontSize: 24,
          fontFamily: "sans-serif",
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
