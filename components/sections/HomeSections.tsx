import { Hero } from "@/components/hero/Hero";
import { IntroSection } from "@/components/sections/IntroSection";
import { StoryBento, type StoryChapter } from "@/components/storytelling/StoryBento";
import { StatsBar } from "@/components/sections/StatsBar";
import { LinesEcosystem } from "@/components/sections/LinesEcosystem";
import { BreedingSection } from "@/components/sections/BreedingSection";
import { NurseriesSection } from "@/components/sections/NurseriesSection";
import { SolutionsSection } from "@/components/sections/SolutionsSection";
import { ResearchSection } from "@/components/sections/ResearchSection";
import { MapSection } from "@/components/sections/MapSection";
import { PartnersSection } from "@/components/sections/PartnersSection";
import { NewsSection } from "@/components/sections/NewsSection";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { SectionWave } from "@/components/botanical/MeshBackground";
import { PICKS } from "@/lib/media";

// فصول قصة الشركة — نصوصها من محتوى الشركة الحقيقي (بدون اختراع ميزانيات أو تواريخ)
const CHAPTERS: StoryChapter[] = [
  {
    numeral: "01",
    title: "الجذور الزراعية",
    text: "شركة رائدة في تجارة البذور والشتلات والمستلزمات الزراعية عالية الجودة، تلبّي احتياجات الأسواق والعملاء في مصر والشرق الأوسط.",
    image: PICKS.heroField,
  },
  {
    numeral: "02",
    title: "البذور والحلول الزراعية",
    text: "نوفر أجود أصناف الخضراوات والفواكه على مدار العام، بدعم فني متواصل للمزارعين والشركات والمشاتل في جميع المحافظات.",
    image: PICKS.peat,
  },
  {
    numeral: "03",
    title: "تطوير المشاتل — مشاتل عصفور",
    text: "سلسلة مشاتل الشركة منتشرة في معظم محافظات مصر، منتجة شتلات هجينة عالية الجودة بالاعتماد شبه الكامل على مواردها الخاصة.",
    image: PICKS.seedlings,
  },
  {
    numeral: "04",
    title: "البحث والتجارب العلمية",
    text: "فريق متخصص يجري التجارب على جميع المنتجات داخل محطة التجارب الخاصة بالشركة، لدراسة النقاء والإنبات وسلوك النبات في مناطق مختلفة.",
    image: PICKS.researchLab,
  },
  {
    numeral: "05",
    title: "التهجين والتطوير الوراثي",
    text: "قسم علمي جديد يجمع خطوط التحسين الوراثي والتهجين وتجارب الحقل تحت إدارة منظمة — من خاصية علمية إلى أداء يثبه التربة.",
    image: PICKS.trialField,
  },
  {
    numeral: "06",
    title: "مستقبل الزراعة",
    text: "شعارنا «من أجل مستقبل أفضل» — نمضي نحو زراعة أكثر ذكاءً واعتمادًا على العلم لنصنع مستقبل الزراعة مع عملائنا وشركائنا.",
    image: PICKS.nursery,
  },
];

export function HomeSections() {
  return (
    <>
      <IntroSection />
      <StatsBar />
      {/* القسم 03 — قصة الشركة بشبكة Bento */}
      <section className="relative bg-sage py-24">
        <div className="mx-auto mb-14 max-w-2xl px-5 text-center">
          <p className="mb-4 flex items-center justify-center gap-3">
            <span className="h-2 w-2 rounded-full bg-fresh" />
            <span className="text-[13px] font-bold tracking-wide text-pine">قصتنا — أرضنا وأصنافنا وفريقنا</span>
            <span className="h-2 w-2 rounded-full bg-fresh" />
          </p>
          <h2 className="heading-display text-3xl text-deep md:text-5xl">السطر الكامل من البذرة إلى الحصاد</h2>
        </div>
        <StoryBento chapters={CHAPTERS} />
      </section>
      <LinesEcosystem />
      <BreedingSection />
      <NurseriesSection />
      <SolutionsSection />
      <div className="bg-warm">
        <SectionWave />
      </div>
      <ResearchSection />
      <MapSection />
      <PartnersSection />
      <NewsSection />
      <ContactCTA />
    </>
  );
}
