import type { Metadata } from "next";
import { LinePageView } from "@/components/pages/LinePageView";
import { PRODUCT_LINES } from "@/lib/site";

const line = PRODUCT_LINES.find((l) => l.slug === "peat-moss")!;

export const metadata: Metadata = {
  title: line.title,
  description: "بيتموس هندي عالي الجودة، غير مُخصّب، غني بالعناصر الطبيعية وpH معتدل لضمان الإنبات السليم — أليكس عصفور.",
  alternates: { canonical: "/peat-moss" },
};

export default function PeatMossPage() {
  return <LinePageView line={line} />;
}
