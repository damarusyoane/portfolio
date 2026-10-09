import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} — AI Automation Agency`,
    short_name: siteConfig.name,
    description:
      "AI assistants and business automations for small and mid-sized companies.",
    start_url: "/",
    display: "standalone",
    background_color: "#f6f4ef",
    theme_color: "#161512",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
