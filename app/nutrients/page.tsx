import type { Metadata } from "next";
import { LinePageView } from "@/components/pages/LinePageView";
import { PRODUCT_LINES } from "@/lib/site";

const line = PRODUCT_LINES.find((l) => l.slug === "nutrients")!;

export const metadata: Metadata = {
  title: line.title,
  description: "مغذيات نباتية قوية سريعة المفعول تنشط المجموع الجذري والخضري وتوفر العناصر الصغرى والكبرى — أليكس للمستلزمات الزراعية.",
  alternates: { canonical: "/nutrients" },
};

export default function NutrientsPage() {
  return <LinePageView line={line} />;
}
