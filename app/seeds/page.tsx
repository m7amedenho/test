import type { Metadata } from "next";
import { LinePageView } from "@/components/pages/LinePageView";
import { PRODUCT_LINES } from "@/lib/site";

const line = PRODUCT_LINES.find((l) => l.slug === "seeds")!;

export const metadata: Metadata = {
  title: line.title,
  description: "بذور الخضروات الهجينة — أصناف متعددة ومدعومة بخدمات حقلية، من أليكس عصفور.",
  alternates: { canonical: "/seeds" },
};

export default function SeedsPage() {
  return <LinePageView line={line} />;
}
