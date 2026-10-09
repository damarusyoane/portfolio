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
        background: "#f6f4ef",
        fontFamily: "serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <svg width={60} height={60} viewBox="0 0 40 40" fill="none">
          <circle cx={20} cy={20} r={13.5} stroke="#161512" strokeWidth={3.2} />
          <path
            d="M8.31 13.75 A 13.5 13.5 0 0 1 31.69 13.75"
            stroke="#e4572e"
            strokeWidth={4.6}
            strokeLinecap="round"
          />
          <circle cx={31.69} cy={13.75} r={3.4} fill="#e4572e" />
        </svg>
        <div style={{ color: "#161512", fontSize: 34, fontWeight: 700 }}>
          {siteConfig.name}
        </div>
        <div
          style={{
            marginLeft: 12,
            color: "#5c584f",
            fontSize: 24,
            fontFamily: "sans-serif",
          }}
        >
          {t("eyebrow")}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            color: "#161512",
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
            color: "#e4572e",
            fontSize: 72,
            lineHeight: 1.1,
            fontStyle: "italic",
            letterSpacing: -2,
          }}
        >
          {t("headlineAccent")}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "2px solid #161512",
          paddingTop: 24,
          color: "#34322d",
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
