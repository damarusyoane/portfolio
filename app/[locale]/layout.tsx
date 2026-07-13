import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { Tracking } from "@/components/Tracking";
import { CookieConsent } from "@/components/CookieConsent";
import { siteConfig } from "@/lib/site";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Hero" });
  const role = t("eyebrow");
  const description = t("tagline");

  return {
    metadataBase: new URL(siteConfig.baseUrl),
    title: {
      default: `${siteConfig.name} — ${role}`,
      template: `%s · ${siteConfig.name}`,
    },
    description,
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.founder }],
    creator: siteConfig.name,
    keywords: [
      "automation services",
      "business automation",
      "AI automation",
      "n8n consultant",
      "workflow automation",
      "AI agency",
      siteConfig.name,
    ],
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        fr: "/fr",
        "x-default": "/en",
      },
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title: `${siteConfig.name} — ${role}`,
      description,
      url: `/${locale}`,
      locale: locale === "fr" ? "fr_FR" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `${siteConfig.name} — ${role}`,
      description,
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteConfig.baseUrl}/#organization`,
    name: siteConfig.name,
    alternateName: "Ottomate Agency",
    legalName: "Ottomate",
    url: siteConfig.baseUrl,
    logo: `${siteConfig.baseUrl}/icon.svg`,
    image: `${siteConfig.baseUrl}/icon.svg`,
    description:
      "Ottomate is an AI & automation agency that helps businesses automate repetitive work — customer replies, lead capture, invoicing, reporting and more — using n8n and large language models.",
    email: siteConfig.email,
    telephone: siteConfig.phone,
    sameAs: [siteConfig.links.linkedin],
    areaServed: "Worldwide",
    serviceType: [
      "AI automation",
      "Business process automation",
      "n8n workflow development",
      "Chatbot & AI assistant development",
    ],
    founder: { "@type": "Person", name: siteConfig.founder },
    knowsAbout: [
      "Business automation",
      "AI automation",
      "n8n",
      "LLM integration",
      "Workflow automation",
      "Lead generation",
      "Customer support automation",
    ],
    slogan: "AI & automation that saves businesses time and money.",
  };

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${display.variable} ${mono.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full antialiased" suppressHydrationWarning>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsAppFab />
          <Tracking />
          <CookieConsent />
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
