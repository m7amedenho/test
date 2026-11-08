import Link from "next/link";
import { Search } from "lucide-react";
import { ProductCard } from "@/components/products/ProductCard";
import { getWooCategories, getWooProductsPage } from "@/lib/woocommerce";

const PER_PAGE = 12;

export async function Catalog({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string; cat?: string }>;
}) {
  const sp = await searchParams;
  const page = Math.max(1, Number(sp.page ?? "1") || 1);
  const q = sp.q?.slice(0, 80) ?? "";
  const cat = sp.cat ?? "";

  const [categories, products] = await Promise.all([
    getWooCategories(),
    getWooProductsPage({ page, perPage: PER_PAGE, search: q || undefined, category: cat || undefined }),
  ]);

  const parentCat = categories.find((c) => c.parent === 0 && c.count > 10) ?? categories[0];
  const cropCats = categories.filter((c) => c.parent === parentCat?.id && c.count > 0);

  const href = (patch: Record<string, string | undefined>) => {
    const params = new URLSearchParams();
    const merged = {
      page: patch.page ?? (patch.q !== undefined || patch.cat !== undefined ? undefined : String(page)),
      q: patch.q ?? (q || undefined),
      cat: patch.cat ?? (cat || undefined),
    };
    Object.entries(merged).forEach(([k, v]) => v && params.set(k, v));
    const qs = params.toString();
    return `/products${qs ? `?${qs}` : ""}`;
  };

  const totalPages = Math.min(products.totalPages, 50);

  return (
    <section className="bg-warm py-16 md:py-20">
      <div className="container-site">
        {/* البحث */}
        <form action="/products" method="get" className="mx-auto mb-8 flex max-w-xl gap-2">
          {cat && <input type="hidden" name="cat" value={cat} />}
          <div className="relative flex-1">
            <Search size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-ink/35" />
            <input
              name="q"
              defaultValue={q}
              placeholder="ابحث عن صنف… مثل: أفنان، طماطم، فلفل"
              className="w-full rounded-full border border-line bg-white py-3.5 pl-4 pr-11 text-[14px] outline-none transition focus:border-fresh focus:ring-4 focus:ring-fresh/15"
            />
          </div>
          <button type="submit" className="rounded-full bg-pine px-6 text-[13.5px] font-bold text-white transition hover:bg-deep">
            بحث
          </button>
        </form>

        {/* فلتر التصنيفات */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          <Link
            href={href({ cat: undefined, page: undefined })}
            className={`rounded-full border px-4 py-2 text-[12.5px] font-semibold transition ${
              !cat ? "border-pine bg-pine text-white" : "border-line bg-white text-ink/65 hover:border-fresh hover:text-pine"
            }`}
          >
            كل المحاصيل
          </Link>
          {cropCats.map((c) => (
            <Link
              key={c.id}
              href={href({ cat: decodeURIComponent(c.slug), page: undefined })}
              className={`rounded-full border px-4 py-2 text-[12.5px] font-semibold transition ${
                cat === decodeURIComponent(c.slug)
                  ? "border-pine bg-pine text-white"
                  : "border-line bg-white text-ink/65 hover:border-fresh hover:text-pine"
              }`}
            >
              {c.name}
              <span className="mx-1.5 text-[10px] opacity-55">{c.count}</span>
            </Link>
          ))}
        </div>

        {/* الشبكة */}
        {products.items.length === 0 ? (
          <div className="mx-auto max-w-md rounded-[1.6rem] border border-dashed border-fresh/40 bg-sage/40 px-8 py-14 text-center">
            <h3 className="text-lg font-extrabold text-deep">لا توجد نتائج مطابقة</h3>
            <p className="mt-2 text-[13px] text-ink/55">جرّب كلمة بحث أخرى، أو استعرض كل المحاصيل.</p>
            <Link href="/products" className="mt-5 inline-block rounded-full bg-pine px-6 py-3 text-[13px] font-bold text-white">
              إعادة التصفية
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.items.map((p, i) => (
              <ProductCard key={p.id} product={p} priority={i < 4} />
            ))}
          </div>
        )}

        {/* منتهي الترقيم */}
        {totalPages > 1 && (
          <nav className="mt-12 flex flex-wrap items-center justify-center gap-2" aria-label="ترقيم الصفحات">
            {page > 1 && (
              <Link href={String(page - 1) ? href({ page: String(page - 1) }) : href({ page: undefined })} className="rounded-xl border border-line bg-white px-4 py-2 text-[13px] font-bold text-pine transition hover:border-fresh">
                السابق
              </Link>
            )}
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((n) => n === 1 || n === totalPages || Math.abs(n - page) <= 1)
              .map((n, i, arr) => (
                <span key={n} className="flex items-center gap-2">
                  {i > 0 && arr[i - 1] !== n - 1 && <span className="text-ink/30">…</span>}
                  <Link
                    href={n === 1 ? href({ page: undefined }) : href({ page: String(n) })}
                    className={`rounded-xl border px-4 py-2 text-[13px] font-bold transition ${
                      n === page ? "border-pine bg-pine text-white" : "border-line bg-white text-pine hover:border-fresh"
                    }`}
                  >
                    {n}
                  </Link>
                </span>
              ))}
            {page < totalPages && (
              <Link href={href({ page: String(page + 1) })} className="rounded-xl border border-line bg-white px-4 py-2 text-[13px] font-bold text-pine transition hover:border-fresh">
                التالي
              </Link>
            )}
          </nav>
        )}
        <p className="mt-6 text-center text-[12px] text-ink/40">
          {products.total} صنف متاح — محدّث تلقائيًا من WooCommerce
        </p>
      </div>
    </section>
  );
}
