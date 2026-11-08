import Link from "next/link";
import { ProductCard } from "@/components/products/ProductCard";
import { getWooProductsPage } from "@/lib/woocommerce";

const PER_PAGE = 12;

export async function CategoryGrid({
  slug,
  searchParamsPromise,
  categoryName,
}: {
  slug: string;
  searchParamsPromise: Promise<{ page?: string } | undefined>;
  categoryName: string;
}) {
  const sp = (await searchParamsPromise) ?? {};
  const page = Math.max(1, Number(sp.page ?? "1") || 1);
  const products = await getWooProductsPage({ page, perPage: PER_PAGE, category: slug });
  const totalPages = Math.min(products.totalPages, 50);

  return (
    <section className="bg-warm py-16">
      <div className="container-site">
        {products.items.length === 0 ? (
          <div className="mx-auto max-w-md rounded-[1.6rem] border border-dashed border-fresh/40 bg-sage/40 px-8 py-14 text-center">
            <h3 className="text-lg font-extrabold text-deep">لا توجد أصناف منشورة تحت هذا التصنيف حاليًا</h3>
            <p className="mt-2 text-[13px] text-ink/55">
              تُدار محتويات «{categoryName}» من لوحة التحكم — سيمتلئ هذا القسم فور إضافة الأصناف.
            </p>
            <Link href="/products" className="mt-5 inline-block rounded-full bg-pine px-6 py-3 text-[13px] font-bold text-white">
              استعرض كل المنتجات
            </Link>
          </div>
        ) : (
          <>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.items.map((p, i) => (
                <ProductCard key={p.id} product={p} priority={i < 4} />
              ))}
            </div>

            {totalPages > 1 && (
              <nav className="mt-12 flex items-center justify-center gap-3" aria-label="ترقيم الصفحات">
                {page > 1 && (
                  <Link
                    href={`/categories/${slug}${page - 1 > 1 ? `?page=${page - 1}` : ""}`}
                    className="rounded-xl border border-line bg-white px-4 py-2 text-[13px] font-bold text-pine transition hover:border-fresh"
                  >
                    السابق
                  </Link>
                )}
                <span className="rounded-xl bg-pine px-4 py-2 text-[13px] font-bold text-white">
                  {page} / {totalPages}
                </span>
                {page < totalPages && (
                  <Link
                    href={`/categories/${slug}?page=${page + 1}`}
                    className="rounded-xl border border-line bg-white px-4 py-2 text-[13px] font-bold text-pine transition hover:border-fresh"
                  >
                    التالي
                  </Link>
                )}
              </nav>
            )}
          </>
        )}
      </div>
    </section>
  );
}
