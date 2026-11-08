import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Leaf, FlaskConical, Sprout, Route, Compass, Radar } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getWpPage } from "@/lib/wordpress";
import { extractSections } from "@/lib/content";

export const metadata: Metadata = {
  title: "الحلول والخدمات الزراعية",
  description:
    "الخدمات الزراعية من أليكس للمستلزمات الزراعية — دراسات وأبحاث وتجارب، برامج زراعية للمحاصيل، زيارات حقلية، توجيه أصناف متخصصة، ومتابعة من الزراعة حتى الحصاد.",
  alternates: { canonical: "/services" },
};

const SERVICE_ICONS = [FlaskConical, Route, Sprout, Compass, Leaf, Radar];

export default async function ServicesPage() {
  const page = await getWpPage(decodeURIComponent("خدماتنا"));
  const sections = extractSections(page?.content?.rendered);

  return (
    <>
      <PageHero
        eyebrow="الحلول والخدمات الزراعية"
        title="فريقنا في الحقل... من أول مسمرة إلى آخر ثمرة"
        sub="خدمات حقيقية تقدمها الشركة في جميع محافظات مصر — من الدراسات والتجارب إلى المتابعة الميدانية والدعم الفني."
      />

      <section className="bg-warm py-20">
        <div className="container-site">
          <Reveal>
            <SectionHeading
              eyebrow="محتوى رسمي من الموقع"
              title="خدمات مصممة لمختلف مراحل الحقل"
              sub="تُستخلص المحتويات أدناه حرفيًا من صفحة «خدماتنا» في ووردبريس وتتحديث تلقائيًا."
            />
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {sections.map((s, i) => {
              const Icon = SERVICE_ICONS[i % SERVICE_ICONS.length];
              return (
                <Reveal key={s.heading} delay={i * 0.06}>
                  <article className="group flex h-full flex-col rounded-[1.8rem] border border-line/70 bg-white p-7 transition-all hover:-translate-y-1.5 hover:shadow-[0_28px_55px_-28px_rgba(16,59,45,0.35)]">
                    <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sage text-pine transition-transform group-hover:-rotate-6">
                      <Icon size={21} strokeWidth={1.7} />
                    </span>
                    <h2 className="text-[16px] font-extrabold text-deep">{s.heading}</h2>
                    <p className="mt-3 flex-1 text-[13.5px] leading-loose text-ink/60">{s.body}</p>
                    <span className="mt-5 h-1 w-14 rounded-full bg-gradient-to-l from-lime to-fresh" aria-hidden />
                  </article>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.15}>
            <div className="mt-16 flex flex-col items-center gap-3">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2.5 rounded-full bg-deep px-8 py-4 text-[15px] font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-pine"
              >
                اطلب زيارة حقلية
                <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
              </Link>
              <p className="text-[12px] text-ink/45">الحقل دائمًا زيارات حقيقية — لا تبني على وعد</p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
