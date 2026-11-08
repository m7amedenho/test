import type { Metadata } from "next";
import { LinePageView } from "@/components/pages/LinePageView";
import { PRODUCT_LINES } from "@/lib/site";

const line = PRODUCT_LINES.find((l) => l.slug === "pesticides")!;

export const metadata: Metadata = {
  title: line.title,
  description: "مبيدات فطرية وحشرية — محتوى هذا الخط تُدار تفاصيله من لوحة التحكم حتى نشر بياناتها الرسمية.",
  alternates: { canonical: "/pesticides" },
};

export default function PesticidesPage() {
  return <LinePageView line={line} />;
}
