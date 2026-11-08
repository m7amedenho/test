import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SeedCatalog } from "@/components/products/SeedCatalog";
import { PICKS } from "@/lib/media";

export const metadata: Metadata = {
  title: "البذور وأصناف المحاصيل",
  description: "تصفح أصناف البذور حسب المحصول واكتشف المنتجات المتاحة من أليكس للمستلزمات الزراعية.",
  alternates: { canonical: "/seeds" },
};

export default function SeedsPage() {
  return (
    <>
      <section className="bg-warm py-12 sm:py-16">
        <div className="container-site grid items-center gap-10 lg:grid-cols-2">
          <div>
            <nav className="mb-6 text-sm text-ink/55"><Link href="/" className="hover:text-pine">الرئيسية</Link><span className="mx-2">/</span>البذور</nav>
            <p className="mb-3 text-sm font-bold text-pine">أصناف المحاصيل</p>
            <h1 className="heading-display text-4xl leading-tight text-deep md:text-5xl">بذور مختارة لكل موسم</h1>
            <p className="mt-5 max-w-xl text-base leading-loose text-ink/70">استعرض المحاصيل والأصناف المتاحة في متجرنا. اضغط على أي محصول لتصفح جميع منتجاته، أو افتح الصنف لعرض صوره ومواصفاته.</p>
            <a href="#seed-catalog" className="mt-8 inline-block rounded-lg bg-pine px-6 py-3 text-sm font-bold text-white hover:bg-deep">تصفح المحاصيل</a>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl"><Image src={PICKS.heroField.src} alt={PICKS.heroField.alt} fill priority sizes="(max-width: 1024px) 92vw, 560px" className="object-cover" /></div>
        </div>
      </section>
      <SeedCatalog />
    </>
  );
}
