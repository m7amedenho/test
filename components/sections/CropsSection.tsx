import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CropCircles } from "@/components/products/CropCircles";
import { getWooCategories } from "@/lib/woocommerce";

export async function CropsSection() {
  const categories = await getWooCategories();
  return (
    <section className="bg-warm py-14 sm:py-20" id="crops">
      <div className="container-site">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="mb-3 text-sm font-bold text-pine">تصفح حسب المحصول</p>
            <h2 className="heading-display text-3xl text-deep md:text-5xl">المحاصيل وأصناف البذور</h2>
          </div>
          <Link href="/seeds" className="inline-flex items-center gap-2 text-sm font-bold text-pine hover:underline">جميع المحاصيل <ArrowLeft size={16} /></Link>
        </div>
        <CropCircles categories={categories} />
      </div>
    </section>
  );
}
