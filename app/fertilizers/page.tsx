import type { Metadata } from "next";
import { LinePageView } from "@/components/pages/LinePageView";
import { PRODUCT_LINES } from "@/lib/site";

const line = PRODUCT_LINES.find((l) => l.slug === "fertilizers")!;

export const metadata: Metadata = {
  title: line.title,
  description: "أسمدة زراعية موثوقة بمجموعات عناصر غذائية متنوعة لمحاصيل الخضروات والفواكه — أليكس عصفور.",
  alternates: { canonical: "/fertilizers" },
};

export default function FertilizersPage() {
  return <LinePageView line={line} />;
}
