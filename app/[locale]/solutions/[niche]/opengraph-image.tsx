import { ImageResponse } from "next/og";
import { getNiche } from "@/lib/niches";
import { siteConfig } from "@/lib/site";
import type { Locale } from "@/i18n/routing";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const accentHex: Record<string, string> = {
  cyan: "#22d3ee",
  violet: "#8b5cf6",
  indigo: "#6366f1",
};

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
  const accent = n ? accentHex[n.accent] || "#22d3ee" : "#22d3ee";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "radial-gradient(1000px 500px at 85% -10%, rgba(139,92,246,0.35), transparent), radial-gradient(900px 500px at 0% 110%, rgba(34,211,238,0.3), transparent), #0a0b12",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #22d3ee, #8b5cf6)",
            }}
          >
            <svg width={44} height={44} viewBox="0 0 40 40" fill="none">
              <circle cx={20} cy={20} r={13.5} stroke="#0a0b12" strokeWidth={3} opacity={0.35} />
              <path d="M8.31 13.75 A 13.5 13.5 0 0 1 31.69 13.75" stroke="#0a0b12" strokeWidth={4.6} strokeLinecap="round" />
              <circle cx={31.69} cy={13.75} r={3.1} fill="#0a0b12" />
            </svg>
          </div>
          <div style={{ color: accent, fontSize: 24, fontWeight: 600 }}>
            {eyebrow}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            backgroundImage: "linear-gradient(100deg, #22d3ee, #8b5cf6)",
            backgroundClip: "text",
            color: "transparent",
            fontSize: 66,
            fontWeight: 800,
            letterSpacing: -2,
            lineHeight: 1.05,
            maxWidth: 1040,
          }}
        >
          {title}
        </div>

        <div style={{ marginTop: 26, color: "#99a1b3", fontSize: 28 }}>
          {siteConfig.name} — Automation Studio
        </div>
      </div>
    ),
    size,
  );
}
