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
        background: "#0c3a2b",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div
          style={{
            display: "flex",
            color: "#ffffff",
            fontSize: 44,
            fontWeight: 800,
            letterSpacing: -2,
          }}
        >
          ottomate<span style={{ color: "#ffd23f" }}>.</span>
        </div>
        <div style={{ color: "#b9d1c5", fontSize: 24 }}>{t("eyebrow")}</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            color: "#ffffff",
            fontSize: 84,
            fontWeight: 800,
            lineHeight: 1.02,
            letterSpacing: -3,
            maxWidth: 1040,
          }}
        >
          {t("headlineTop")}&nbsp;
          <span style={{ color: "#ffd23f" }}>{t("headlineAccent")}</span>
        </div>
        <div
          style={{
            color: "#ffffff",
            fontSize: 84,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: -3,
          }}
        >
          {t("headlineEnd")}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: "#e1ede7",
          fontSize: 26,
        }}
      >
        <div
          style={{
            display: "flex",
            background: "#ffd23f",
            color: "#0c1f18",
            padding: "14px 26px",
            borderRadius: 14,
            fontWeight: 700,
          }}
        >
          {t("ctaPrimary")} →
        </div>
        <div>ottomateagency.com</div>
      </div>
    </div>,
    size,
  );
}
