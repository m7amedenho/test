import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { GridSkeleton } from "@/components/ui/GridSkeleton";
import { Catalog } from "./catalog";

export const metadata: Metadata = {
  title: "المنتجات والأصناف",
  description: "استعرض جميع أصناف البذور والشتلات والمستلزمات الزراعية من أليكس عصفور — بيانات حية من نظام ووردبريس.",
  alternates: { canonical: "/products" },
};

type SearchParams = { page?: string; q?: string; cat?: string };

export default function ProductsPage({ searchParams }: { searchParams: Promise<{ page?: string; q?: string; cat?: string }> }) {
  return (
    <>
      <PageHero
        eyebrow="منتجاتنا"
        title="كل الأصناف في مكان واحد"
        sub="بيانات محدّثة مباشرة من متجر الشركة — استعرض الأصناف بحسب المحصول أو ابحث بالاسم."
      />
      <Suspense fallback={<GridSkeleton label="جارٍ تحميل الأصناف…" />}>
        <Catalog searchParams={searchParams} />
      </Suspense>
    </>
  );
}
