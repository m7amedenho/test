import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { GridSkeleton } from "@/components/ui/GridSkeleton";
import { getWooCategory, getWooCategories } from "@/lib/woocommerce";
import { CategoryGrid } from "./grid";

export async function generateStaticParams() {
  const categories = await getWooCategories();
  return categories.length
    ? categories.map((c) => ({ slug: decodeURIComponent(c.slug) }))
    : [{ slug: "__none__" }];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = await getWooCategory(slug);
  if (!category) return { title: "تصنيف غير موجود" };
  return {
    title: `${category.name} — أصناف البذور`,
    description: category.description || `استعرض أصناف ${category.name} المتاحة من أليكس للمستلزمات الزراعية.`,
    alternates: { canonical: `/categories/${slug}` },
    openGraph: category.image?.src ? { images: [{ url: category.image.src }] } : undefined,
  };
}

export default function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  return (
    <Suspense fallback={<GridSkeleton label="جارٍ تحميل التصنيف…" />}>
      <CategoryDetail params={params} searchParams={searchParams} />
    </Suspense>
  );
}

async function CategoryDetail({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const category = await getWooCategory(slug);
  if (!category) notFound();

  return (
    <>
      <PageHero
        eyebrow={category.name}
        title={`أصناف ${category.name}`}
        sub={
          category.description ||
          `استعرض جميع الأصناف المتاحة تحت تصنيف «${category.name}» — بيانات حية من متجر الشركة.`
        }
      />
      {category.image && (
        <section className="bg-warm pt-10">
          <div className="container-site">
            <div className="relative h-60 overflow-hidden rounded-[2rem] border border-line soft-shadow md:h-72">
              <Image
                src={category.image.src}
                alt={category.image.alt || category.name}
                fill
                sizes="(max-width:1024px) 92vw, 1220px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep/60 via-transparent to-transparent" />
              <p className="absolute bottom-5 right-7 text-[13px] font-bold text-white">
                {category.count} صنف متاح — تصوير حقيقي من متجرنا
              </p>
            </div>
          </div>
        </section>
      )}
      <Suspense fallback={<GridSkeleton label={`جارٍ تحميل أصناف ${category.name}…`} />}>
        <CategoryGrid slug={slug} searchParamsPromise={searchParams} categoryName={category.name} />
      </Suspense>
    </>
  );
}
