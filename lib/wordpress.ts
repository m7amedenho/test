// طبقة بيانات WordPress REST API — سيرفر فقط
import { cacheLife, cacheTag } from "next/cache";
import type {
  WpPage,
  WpPost,
  WpMedia,
  WpTerm,
} from "../types/wp";

const SITE_URL = process.env.WORDPRESS_URL ?? "https://alexasfor.com";
const API = `${SITE_URL}/wp-json/wp/v2`;

/** جلب آمن مع مهلة زمنية وقيمة بديلة عند الفشل */
async function safeGet<T>(
  path: string,
  fallback: T,
  headers?: Record<string, string>
): Promise<{ data: T; total: number; pages: number } | null> {
  try {
    const res = await fetch(`${API}${path}`, {
      headers: {
        Accept: "application/json",
        "User-Agent": "AlexAsfor-Next/1.0",
        ...headers,
      },
      signal: AbortSignal.timeout(20_000),
    });
    if (!res.ok) return null;
    const total = Number(res.headers.get("x-wp-total") ?? 0);
    const pages = Number(res.headers.get("x-wp-totalpages") ?? 1);
    const data = (await res.json()) as T;
    return { data, total, pages };
  } catch {
    return null;
  }
}

/** جلب كل الصفحات عبر pagination */
async function fetchAll<T>(
  basePath: string,
  perPage = 100,
  maxPages = 10,
  headers?: Record<string, string>
): Promise<T[]> {
  const first = await safeGet<T[]>(
    `${basePath}?per_page=${perPage}&page=1${headers ? "&context=edit" : ""}`,
    [],
    headers
  );
  if (!first) return [];
  const all = [...first.data];
  const totalPages = Math.min(first.pages, maxPages);
  for (let p = 2; p <= totalPages; p++) {
    const next = await safeGet<T[]>(
      `${basePath}?per_page=${perPage}&page=${p}${headers ? "&context=edit" : ""}`,
      [],
      headers
    );
    if (!next || next.data.length === 0) break;
    all.push(...next.data);
  }
  return all;
}

/** الصفحات المنشورة (مع محتوى كامل عبر context=edit حين يكون متاحًا) */
export async function getWpPages(): Promise<WpPage[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("wp-pages");
  return fetchAll<WpPage>("/pages", 50, 4);
}

export async function getWpPage(slug: string): Promise<WpPage | null> {
  // الصفحات قليلة؛ نستخدم ذاكرة صفحات ثم نبحث فيها
  const pages = await getWpPages();
  const lower = slug.toLowerCase();
  return (
    pages.find((p) => p.slug.toLowerCase() === lower) ??
    pages.find((p) => decodeURIComponent(p.slug).toLowerCase() === lower) ??
    null
  );
}

/** المقالات — تدعم pagination حقيقية عبر الطلب بالارقام */
export async function getWpPosts(page = 1, perPage = 9) {
  "use cache";
  cacheLife("hours");
  cacheTag("wp-posts");
  const res = await safeGet<WpPost[]>(
    `/posts?per_page=${perPage}&page=${page}&_embed=wp:featuredmedia`,
    []
  );
  if (!res) return { items: [] as WpPost[], total: 0, totalPages: 0 };
  return { items: res.data, total: res.total, totalPages: res.pages };
}

export async function getWpPost(slug: string): Promise<WpPost | null> {
  "use cache";
  cacheLife("hours");
  cacheTag("wp-posts");
  const res = await safeGet<WpPost[]>(
    `/posts?slug=${encodeURIComponent(slug)}&_embed=wp:featuredmedia`,
    []
  );
  return res?.data?.[0] ?? null;
}

export async function getWpCategories(): Promise<WpTerm[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("wp-categories");
  const res = await safeGet<WpTerm[]>("/categories?per_page=100", []);
  return res?.data ?? [];
}

export async function getWpMedia(id: number): Promise<WpMedia | null> {
  "use cache";
  cacheLife("hours");
  cacheTag("wp-media");
  const res = await safeGet<WpMedia>(`/media/${id}`, null as unknown as WpMedia);
  return res?.data ?? null;
}

/** أداة تنظيف HTML إلى نص عربي نظيف */
export function stripHtml(html: string | undefined | null): string {
  if (!html) return "";
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;|&#8236;|&#8206;|&#8207;|&lrm;|&rlm;/g, " ")
    .replace(/&#82[0-9]+;/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
