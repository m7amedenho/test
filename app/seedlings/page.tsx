import type { Metadata } from "next";
import { LinePageView } from "@/components/pages/LinePageView";
import { PRODUCT_LINES } from "@/lib/site";

const line = PRODUCT_LINES.find((l) => l.slug === "seedlings")!;

export const metadata: Metadata = {
  title: line.title,
  description: "شتلات هجينة عالية الجودة من مشاتل عصفور — من مورد قوي التقنية وصولًا إلى حقل خضراء.",
  alternates: { canonical: "/seedlings" },
};

export default function SeedlingsPage() {
  return <LinePageView line={line} />;
}
