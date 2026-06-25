import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { projects } from "@/lib/projects";
import { getPostSlugs } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.baseUrl;
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    entries.push({
      url: `${base}/${locale}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    });
    entries.push({
      url: `${base}/${locale}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    });
    for (const p of projects) {
      entries.push({
        url: `${base}/${locale}/projects/${p.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
    for (const slug of getPostSlugs(locale)) {
      entries.push({
        url: `${base}/${locale}/blog/${slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return entries;
}
