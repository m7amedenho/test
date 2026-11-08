import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MeshBackground } from "@/components/botanical/MeshBackground";
import { FloatingLeaves } from "@/components/botanical/Leaves";
import { getWpPage } from "@/lib/wordpress";
import { extractSections } from "@/lib/content";
import { PICKS } from "@/lib/media";

export const metadata: Metadata = {
  title: "مشاتل عصفور",
  description:
    "مشاتل عصفور — فرع من أليكس للمستلزمات الزراعية، تنتشر مشاتل الشركة في جميع محافظات مصر لإنتاج شتلات هجينة عالية الجودة بالاعتماد شبه الكامل على مواردها الخاصة.",
  alternates: { canonical: "/nurseries" },
};

const QUALITY_POINTS = [
  "استخدام أفضل أنواع البيتموس وزراعة تقنيات إنتاج حديثة",
  "برامج وقاية فطرية وحشرية منضبطة أثناء الإنتاج",
  "اعتماد شبه كامل على موارد الشركة من بذور وأسمدة وبيتموس ومبيدات",
  "فريق تقني متخصص داخل المشاتل يتابع الدورة كاملة",
];

export default async function NurseriesPage() {
  const page = await getWpPage(decodeURIComponent("ألشتلات"));
  const sections = extractSections(page?.content?.rendered);

  return (
    <>
      <PageHero
        eyebrow="مشاتل عصفور"
        title="شتلة هجينة قوية... تبدأ من هنا"
        sub="سلسلة مشاتل الشركة منتشرة في معظم محافظات مصر — من أكبر وأقدم المشاتل الزراعية من حيث الإنتاجية والاعتماد على موارد الشركة."
      />

      <section className="relative overflow-hidden bg-warm py-20">
        <MeshBackground variant="soft" className="opacity-70" />
        <FloatingLeaves />
        <div className="container-site relative z-10 grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <SectionHeading eyebrow="من كلام الشركة نفسه" title="أكثر من شتلات... منظومة إنتاج كاملة" />
            <p className="text-[14.5px] leading-loose text-ink/70">{sections[0]?.body ?? ""}</p>
            <ul className="mt-7 space-y-3">
              {QUALITY_POINTS.map((q, i) => (
                <li key={i} className="flex items-start gap-3 text-[13.5px] text-ink/75">
                  <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-fresh" />
                  {q}
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/contact" className="group inline-flex items-center gap-2 rounded-full bg-pine px-6 py-3.5 text-[13.5px] font-bold text-white transition hover:bg-deep">
                اطلب شتلات — مشاتل عصفور
                <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
              </Link>
              <Link href="/branches" className="inline-flex items-center gap-2 rounded-full border border-pine/25 bg-white px-6 py-3.5 text-[13.5px] font-bold text-pine transition hover:border-fresh">
                <MapPin size={14} />
                مواقع مشاتلنا وفروعنا
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="relative">
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-1 overflow-hidden rounded-[1.6rem] soft-shadow">
                <Image src={PICKS.seedlings.src} alt={PICKS.seedlings.alt} width={640} height={427} sizes="320px" className="h-48 w-full object-cover" />
              </div>
              <div className="col-span-1 mt-10 overflow-hidden rounded-[1.6rem] soft-shadow">
                <Image src={PICKS.researchLab.src} alt={PICKS.researchLab.alt} width={640} height={427} sizes="320px" className="h-48 w-full object-cover" />
              </div>
              <div className="col-span-2 overflow-hidden rounded-[1.6rem] soft-shadow">
                <Image src={PICKS.peat.src} alt={PICKS.peat.alt} width={960} height={540} sizes="620px" className="h-56 w-full object-cover" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-mist py-20">
        <div className="container-site grid gap-5 md:grid-cols-2">
          {sections.slice(1).map((s, i) => (
            <Reveal key={s.heading} delay={i * 0.06}>
              <article className="h-full rounded-[1.6rem] border border-line/70 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg">
                <h3 className="text-[15px] font-extrabold text-deep">{s.heading}</h3>
                <p className="mt-2 text-[13.5px] leading-loose text-ink/60">{s.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="container-site mt-8 text-center text-[11.5px] text-ink/40">
          المحتويات أعلاه مقتبسة من صفحة «الشتلات» الرسمية في الموقع — تُحدث تلقائيًا من ووردبريس.
        </p>
      </section>
    </>
  );
}
