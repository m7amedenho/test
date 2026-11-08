import { Suspense } from "react";
import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { GridSkeleton } from "@/components/ui/GridSkeleton";
import { NewsList } from "./list";

export const metadata: Metadata = {
  title: "الأخبار والفعاليات",
  description: "أخبار أليكس للمستلزمات الزراعية الزراعية وفعاليات المعارض والمشاركة الميدانية — تُنشر مباشرة من ووردبريس.",
  alternates: { canonical: "/news" },
};

export default function NewsPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  return (
    <>
      <PageHero
        eyebrow="الأخبار والفعاليات"
        title="أخبارنا الزراعية باشد الميدان"
        sub="معارض، فعاليات، وأخبار الشركة — تُنشر ويمسح الحالة تلقائيًا من ووردبريس."
      />
      <Suspense fallback={<GridSkeleton label="جارٍ تحميل الأخبار…" />}>
        <NewsList searchParams={searchParams} />
      </Suspense>
    </>
  );
}
