import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${siteConfig.name} — AI & Automation Engineer`;

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Hero" });
  const role = t("role");

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
            "radial-gradient(1000px 500px at 80% -10%, rgba(139,92,246,0.35), transparent), radial-gradient(900px 500px at 0% 110%, rgba(34,211,238,0.3), transparent), #0a0b12",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 76,
              height: 76,
              borderRadius: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #22d3ee, #8b5cf6)",
              color: "#0a0b12",
              fontSize: 34,
              fontWeight: 800,
            }}
          >
            {siteConfig.initials}
          </div>
          <div style={{ color: "#99a1b3", fontSize: 28 }}>
            {siteConfig.name}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            backgroundImage: "linear-gradient(100deg, #22d3ee, #8b5cf6)",
            backgroundClip: "text",
            color: "transparent",
            fontSize: 96,
            fontWeight: 800,
            letterSpacing: -2,
            lineHeight: 1.05,
          }}
        >
          {role}
        </div>

        <div
          style={{
            marginTop: 28,
            color: "#c3c8d6",
            fontSize: 32,
            maxWidth: 900,
          }}
        >
          {siteConfig.locationLabel[locale === "fr" ? "fr" : "en"]}
        </div>
      </div>
    ),
    size,
  );
}
