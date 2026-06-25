import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Keep production builds resilient even if an external font/asset fetch
  // hiccups behind a TLS-inspecting proxy.
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

export default withNextIntl(nextConfig);
