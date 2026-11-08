import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { MapSection } from "@/components/sections/MapSection";

export const metadata: Metadata = {
  title: "الفروع ومناطق التغطية",
  description: "فرعا أليكس للمستلزمات الزراعية في الإسكندرية، ومندوبي المبيعات ومناطق تغطيتهم في محافظات مصر.",
  alternates: { canonical: "/branches" },
};

export default function BranchesPage() {
  return (
    <>
      <PageHero
        eyebrow="الفروع ومناطق التغطية"
        title="نصل إليك أينما كنت"
        sub="تعرّف على فرعَي الشركة في الإسكندرية، واختر مندوبًا لعرض المحافظات التي يغطيها والتواصل معه مباشرة."
      />
      <MapSection />
    </>
  );
}
