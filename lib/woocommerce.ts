// طبقة بيانات WooCommerce REST API — سيرفر فقط، مصادقة عبر متغيرات البيئة
import { cacheLife, cacheTag } from "next/cache";
import type { WooProduct, WooCategory, WooBrand } from "../types/wp";

const SITE_URL = (process.env.WORDPRESS_URL ?? "https://alexasfor.com").replace(/\/$/, "");
const API = `${SITE_URL}/wp-json/wc/v3`;

function authHeaders(): Record<string, string> {
  const key = process.env.WC_CONSUMER_KEY;
  const secret = process.env.WC_CONSUMER_SECRET;
  // المصادقة تبقى على السيرفر فقط ولا تُرسل للمتصفح مطلقًا
  const token = Buffer.from(`${key ?? ""}:${secret ?? ""}`).toString("base64");
  return key && secret ? { Authorization: `Basic ${token}` } : {};
}

async function wcGet<T>(path: string, fallback: T): Promise<{ data: T; total: number; pages: number } | null> {
  try {
    const res = await fetch(`${API}${path}`, {
      headers: { ...authHeaders(), Accept: "application/json" },
      signal: AbortSignal.timeout(20_000),
    });
    if (!res.ok) return null;
    return {
      data: (await res.json()) as T,
      total: Number(res.headers.get("x-wp-total") ?? 0),
      pages: Number(res.headers.get("x-wp-totalpages") ?? 1),
    };
  } catch {
    return null;
  }
}

/** تصنيفات المنتجات — تُستخدم في القائمة والحصانات والميغا مينيو */
export async function getWooCategories(): Promise<WooCategory[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("woo-categories");

  const all: WooCategory[] = [];
  for (let p = 1; p <= 5; p++) {
    const res = await wcGet<WooCategory[]>(`/products/categories?per_page=100&page=${p}`, []);
    if (!res || res.data.length === 0) break;
    all.push(...res.data.map(partialCategory));
    if (res.data.length < 100) break;
  }
  return all;
}

export async function getWooCategory(slug: string): Promise<WooCategory | null> {
  "use cache";
  cacheLife("hours");
  cacheTag("woo-categories");
  // Next قد يمرر الرسل percent-encoded أو مفكوكًا؛ ترميز واحد صحيح لكلا الحالتين
  const res = await wcGet<WooCategory[]>(`/products/categories?slug=${encodeURIComponent(slug)}`, []);
  const c = res?.data?.[0];
  return c ? partialCategory(c) : null;
}

/** جميع المنتجات (كل الصفحات) — للبناء الثابت */
export async function getWooProducts(): Promise<WooProduct[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("woo-products");

  const all: WooProduct[] = [];
  for (let p = 1; p <= 10; p++) {
    const res = await wcGet<WooProduct[]>(`/products?per_page=100&page=${p}&status=publish`, []);
    if (!res || res.data.length === 0) break;
    all.push(...res.data);
    if (res.data.length < 100) break;
  }
  return all;
}

/** صفحة منتجات مُخزّنة — تدعم pagination والبحث والتصنيف عبر Route Handler داخلي */
export async function getWooProductsPage(opts: {
  page?: number;
  perPage?: number;
  category?: string;
  search?: string;
}) {
  "use cache";
  cacheLife("hours");
  cacheTag("woo-products");

  const page = Math.max(1, opts.page ?? 1);
  const perPage = Math.min(24, Math.max(1, opts.perPage ?? 12));
  const params = new URLSearchParams({
    per_page: String(perPage),
    page: String(page),
    status: "publish",
  });
  if (opts.search) params.set("search", opts.search);

  if (opts.category) {
    // معامل category على على endpoint المنتجات يقبل المعرّف الرقمي فقط —
    // نحوّل الرسل (encoded أو decoded) إلى معرّف عبر endpoint التصنيفات الموثوق
    let catId = Number(opts.category) || 0;
    if (!catId) {
      const catRes = await wcGet<WooCategory[]>(
        `/products/categories?slug=${encodeURIComponent(opts.category)}`,
        []
      );
      catId = catRes?.data?.[0]?.id ?? 0;
    }
    if (!catId) return { items: [] as WooProduct[], total: 0, totalPages: 0, page };
    params.set("category", String(catId));
  }

  const res = await wcGet<WooProduct[]>(`/products?${params.toString()}`, []);
  if (!res) return { items: [] as WooProduct[], total: 0, totalPages: 0, page };
  return {
    items: res.data.map(partialProduct),
    total: res.total,
    totalPages: res.pages,
    page,
  };
}

/** إزالة الحقول غير الضرورية لتقليل حجم الـ payload المخزّن */
function partialProduct(p: WooProduct): WooProduct {
  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    type: p.type,
    status: p.status,
    regular_price: p.regular_price,
    sale_price: p.sale_price,
    price: p.price,
    stock_status: p.stock_status,
    short_description: p.short_description,
    description: p.description,
    categories: p.categories?.map((t) => ({ id: t.id, name: t.name, slug: t.slug })) ?? [],
    images: p.images?.map((i) => ({ id: i.id, src: i.src, alt: i.alt, name: i.name, thumbnail: i.thumbnail })) ?? [],
    attributes: p.attributes,
  };
}

/** تقليم التصنيفات — REST يُعاد معه yoast_head سوبر موقر تفوق حجم البيانات المفيدة */
function partialCategory(c: WooCategory): WooCategory {
  return {
    id: c.id,
    name: c.name,
    slug: c.slug,
    parent: c.parent,
    count: c.count,
    description: c.description,
    image: c.image
      ? { id: c.image.id, src: c.image.src, alt: c.image.alt, name: c.image.name, thumbnail: c.image.thumbnail }
      : (c.image ?? null),
  };
}

export async function getWooProduct(slug: string): Promise<WooProduct | null> {
  "use cache";
  cacheLife("hours");
  cacheTag("woo-products");

  const enc = encodeURIComponent(slug);
  const res = await wcGet<WooProduct[]>(`/products?slug=${enc}&status=publish`, []);
  const p = res?.data?.[0];
  return p ? partialProduct(p) : null;
}

/** العلامات التجارية المسجلة (قد تكون فارغة — نتعامل معها كقائمة اختيارية) */
export async function getWooBrands(): Promise<WooBrand[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("woo-brands");
  const res = await wcGet<WooBrand[]>("/products/brands?per_page=100", []);
  return res?.data ?? [];
}

/** إحصائيات عامة للصفحة الرئيسية — من بيانات حقيقية فقط */
export async function getWooStats() {
  "use cache";
  cacheLife("hours");
  cacheTag("woo-products");
  const res = await wcGet<Record<string, unknown>>("/products?per_page=1", {});
  return { totalProducts: res?.total ?? 0 };
}
