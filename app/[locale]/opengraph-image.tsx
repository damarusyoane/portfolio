import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${siteConfig.name} — AI Automation Agency`;

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Hero" });

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
        <svg width={60} height={60} viewBox="0 0 40 40" fill="none">
          <circle cx={20} cy={20} r={13.5} stroke="#121417" strokeWidth={3.2} />
          <path
            d="M8.31 13.75 A 13.5 13.5 0 0 1 31.69 13.75"
            stroke="#e4572e"
            strokeWidth={4.6}
            strokeLinecap="round"
          />
          <circle cx={31.69} cy={13.75} r={3.4} fill="#e4572e" />
        </svg>
        <div style={{ color: "#121417", fontSize: 34, fontWeight: 700 }}>
          {siteConfig.name}
        </div>
        <div
          style={{
            marginLeft: 12,
            color: "#5b6168",
            fontSize: 24,
            fontFamily: "sans-serif",
          }}
        >
          {locale === "fr"
            ? "Agence d’automatisation IA"
            : "AI automation agency"}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            color: "#121417",
            fontSize: 72,
            lineHeight: 1.05,
            letterSpacing: -2,
            maxWidth: 1000,
          }}
        >
          {t("headlineTop")}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            color: "#121417",
            fontSize: 72,
            lineHeight: 1.1,
            letterSpacing: -2,
          }}
        >
          {t("headlineAccent")}
          <div
            style={{
              display: "flex",
              fontSize: 26,
              letterSpacing: 0,
              padding: "4px 10px",
              borderRadius: 6,
              background: "#e4572e",
              color: "#121417",
              fontFamily: "monospace",
            }}
          >
            {t("chip")}
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "2px solid #121417",
          paddingTop: 24,
          color: "#2c3036",
          fontSize: 26,
          fontFamily: "sans-serif",
        }}
      >
        <div>{t("ctaPrimary")}</div>
        <div>ottomateagency.com</div>
      </div>
    </div>,
    size,
  );
}
