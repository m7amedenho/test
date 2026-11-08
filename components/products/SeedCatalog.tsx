import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CropCircles } from "@/components/products/CropCircles";
import { ProductCard } from "@/components/products/ProductCard";
import { getWooCategories, getWooProducts } from "@/lib/woocommerce";
import { getCropCategories } from "@/lib/crops";

export async function SeedCatalog() {
  const [categories, products] = await Promise.all([getWooCategories(), getWooProducts()]);
  const crops = getCropCategories(categories);

  return (
    <section className="bg-mist py-20" id="seed-catalog">
      <div className="container-site">
        <p className="mb-3 text-sm font-bold text-pine">تصفح حسب المحصول</p>
        <h2 className="heading-display mb-9 text-3xl text-deep md:text-5xl">المحاصيل وأصناف البذور</h2>
        <CropCircles categories={categories} />
        <div className="mt-14 space-y-16">
          {crops.map((crop) => {
            const items = products.filter((product) => product.categories?.some((category) => category.id === crop.id)).slice(0, 8);
            if (!items.length) return null;
            return (
              <div key={crop.id} id={`crop-${crop.id}`}>
                <div className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-line pb-4">
                  <div>
                    <p className="mb-1 text-sm font-semibold text-pine">{crop.count} صنف متاح</p>
                    <h3 className="heading-display text-2xl text-deep md:text-3xl">{crop.name}</h3>
                  </div>
                  <Link href={`/categories/${encodeURIComponent(decodeURIComponent(crop.slug))}`} className="inline-flex items-center gap-2 text-sm font-bold text-pine hover:underline">كل أصناف {crop.name} <ArrowLeft size={16} /></Link>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {items.map((product) => <ProductCard key={product.id} product={product} />)}
                </div>
              </div>
            );
          })}
        </div>
        {!crops.length && <p className="rounded-2xl bg-white p-8 text-center text-ink/60">الأصناف ستظهر هنا عند توفر بيانات المحاصيل.</p>}
      </div>
    </section>
  );
}
