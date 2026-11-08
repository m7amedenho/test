import type { MetadataRoute } from "next";
import { getWpPosts } from "@/lib/wordpress";
import { getWooProducts, getWooCategories } from "@/lib/woocommerce";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, products, categories] = await Promise.all([
    getWpPosts(1, 100).catch(() => ({ items: [] })),
    getWooProducts().catch(() => []),
    getWooCategories().catch(() => []),
  ]);

  const staticRoutes = [
    "",
    "about",
    "products",
    "breeding",
    "nurseries",
    "services",
    "research",
    "news",
    "branches",
    "contact",
    "seeds",
    "seedlings",
    "peat-moss",
    "fertilizers",
    "pesticides",
    "nutrients",
  ].map((route) => ({
    url: `${SITE_URL}/${route}`.replace(/\/$/, ""),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const postEntries = ("items" in posts ? posts.items : []).map((p) => ({
    url: `${SITE_URL}/news/${decodeURIComponent(p.slug)}`,
    lastModified: new Date(p.modified ?? p.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const productEntries = products.map((p) => ({
    url: `${SITE_URL}/products/${decodeURIComponent(p.slug)}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const categoryEntries = categories.map((c) => ({
    url: `${SITE_URL}/categories/${decodeURIComponent(c.slug)}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...postEntries, ...productEntries, ...categoryEntries];
}
