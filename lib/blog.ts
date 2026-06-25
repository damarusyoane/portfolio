import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Locale } from "@/i18n/routing";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  readingMinutes: number;
};

export type Post = {
  meta: PostMeta;
  content: string;
};

function dirFor(locale: Locale) {
  return path.join(BLOG_DIR, locale);
}

export function getPostSlugs(locale: Locale): string[] {
  const dir = dirFor(locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getPost(locale: Locale, slug: string): Post | null {
  const full = path.join(dirFor(locale), `${slug}.mdx`);
  if (!fs.existsSync(full)) return null;
  const raw = fs.readFileSync(full, "utf8");
  const { data, content } = matter(raw);
  const words = content.trim().split(/\s+/).length;
  const readingMinutes = Math.max(1, Math.round(words / 200));
  return {
    meta: {
      slug,
      title: String(data.title ?? slug),
      date: String(data.date ?? ""),
      excerpt: String(data.excerpt ?? ""),
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      readingMinutes,
    },
    content,
  };
}

export function getAllPosts(locale: Locale): PostMeta[] {
  return getPostSlugs(locale)
    .map((slug) => getPost(locale, slug))
    .filter((p): p is Post => p !== null)
    .map((p) => p.meta)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function formatDate(date: string, locale: Locale) {
  if (!date) return "";
  try {
    return new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date));
  } catch {
    return date;
  }
}
