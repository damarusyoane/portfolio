"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const GA = process.env.NEXT_PUBLIC_GA_ID; // GA4, e.g. G-XXXXXXX
const GADS = process.env.NEXT_PUBLIC_GADS_ID; // Google Ads, e.g. AW-XXXXXXXXX
const GADS_LABEL = process.env.NEXT_PUBLIC_GADS_LABEL; // conversion label
const FB = process.env.NEXT_PUBLIC_FB_PIXEL_ID; // Meta Pixel id

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Loads GA4 + Google Ads + Meta Pixel ONLY after cookie consent is granted
 * (RGPD-compliant), and fires a "lead" conversion on any click to
 * Cal.com / WhatsApp / email. IDs come from env vars — nothing hardcoded.
 */
export function Tracking() {
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    const read = () =>
      setGranted(localStorage.getItem("cookie-consent") === "granted");
    read();
    window.addEventListener("consent-updated", read);
    return () => window.removeEventListener("consent-updated", read);
  }, []);

  useEffect(() => {
    if (!granted) return;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      const isLead =
        href.includes("cal.com") ||
        href.includes("wa.me") ||
        href.startsWith("mailto:");
      if (!isLead) return;
      const method = href.includes("cal.com")
        ? "book_audit"
        : href.includes("wa.me")
          ? "whatsapp"
          : "email";
      if (typeof window.gtag === "function") {
        window.gtag("event", "generate_lead", { method });
        if (GADS && GADS_LABEL) {
          window.gtag("event", "conversion", {
            send_to: `${GADS}/${GADS_LABEL}`,
          });
        }
      }
      if (typeof window.fbq === "function") {
        window.fbq("track", "Lead", { method });
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [granted]);

  if (!granted || (!GA && !GADS && !FB)) return null;

  return (
    <>
      {(GA || GADS) && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA || GADS}`}
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());${GA ? `gtag('config','${GA}');` : ""}${GADS ? `gtag('config','${GADS}');` : ""}`}
          </Script>
        </>
      )}
      {FB && (
        <Script id="fb-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${FB}');fbq('track','PageView');`}
        </Script>
      )}
    </>
  );
}
