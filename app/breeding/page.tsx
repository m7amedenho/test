import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, FlaskConical, Dna, TestTube2, Factory, Sigma, Handshake, LineChart } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { MeshBackground } from "@/components/botanical/MeshBackground";
import { LeafGlyph } from "@/components/botanical/Leaves";
import { PICKS } from "@/lib/media";
import { getSiteContact } from "@/lib/site";

export const metadata: Metadata = {
  title: "التهجين والتطوير الوراثي للنباتات",
  description:
    "قسم التهجين والتطوير الوراثي في أليكس عصفور — برامج تربية نباتية، تطوير أصناف، اختيار صفات مرغوبة، تجارب حقلية، وتقييم أداء بعدم التذرع لنتائج غير موثقة.",
  alternates: { canonical: "/breeding" },
};

const STEPS = [
  "البحث العلمي",
  "الاختيار الوراثي",
  "التهجين",
  "التجارب الحقلية",
  "التقييم",
  "التطوير",
];

export default async function BreedingPage() {
  const contact = await getSiteContact();
  const topics = [
    { icon: FlaskConical, t: "برامج التربية والتهجين النباتي", d: "إدارة برامج تربية نباتية منهجية داخل بيئة عمل علمية منظمة، بتنسيق مع مختصي زراعة ووراثة." },
    { icon: Dna, t: "تطوير أصناف محسّنة", d: "العمل على تطوير أصناف ذات صفات أداء أعلى — لا يُعلن عن صنف جديد إلا بثبُت التجارب." },
    { icon: Sigma, t: "اختيار الصفات الزراعية المرغوبة", d: "ترتيب الصفات المرغوبة (مقاومة الأمراض، الإنتاجية، التكيف المناخي) وفق أولويات السوق واحتياج العملاء." },
    { icon: TestTube2, t: "أبحاث التهجين", d: "دراسة متقاطعات النباتات وإنتاج الفرد الهجين تحت شروط مضبوطة لدورة النمو الكاملة." },
    { icon: Factory, t: "التجارب الحقلية والتقييم التجريبي", d: "زراعة وتقييم الأجيال الجديدة في مناطق مختلفة مع مقارنة الأداء بالمعايير السوقية." },
    { icon: LineChart, t: "تقييم الجودة والأداء", d: "قياس نسب النقاء والإنبات وسلوك النبات تحت الظروف الطبيعية قبل تعميم أي صنف." },
    { icon: Handshake, t: "التعاون مع مختصين", d: "استكمال الملف العلمي بالتعاون مع تربيين ومهندسين زراعيين مختصين في التهجين والتحسين." },
  ];

  return (
    <>
      <PageHero
        eyebrow="قسم علمي مستقل"
        title="التهجين والتطوير الوراثي للنباتات"
        sub="من الوراثة النظرية إلى أداء التربة — برنامج منضبط من البحث إلى التقييم، لا نعلن صنفًا إلا بنتيجة مثبتة في الحقل."
      />

      <section className="relative overflow-hidden bg-warm py-20">
        <MeshBackground variant="science" className="opacity-70" />
        <LeafGlyph className="absolute -left-8 top-24 h-36 w-36 rotate-[210deg] opacity-20 animate-float-slower" />
        <div className="container-site relative z-10">
          {/* مسار العمل العلمي */}
          <Reveal>
            <div className="relative mx-auto max-w-4xl mb-16">
              <div className="absolute inset-x-10 top-8 h-px bg-gradient-to-l from-fresh/30 via-fresh to-lime/60" aria-hidden />
              <ol className="grid grid-cols-3 gap-y-8 md:grid-cols-6">
                {STEPS.map((s, i) => (
                  <li key={s} className="relative flex flex-col items-center text-center">
                    <span className="relative z-10 mb-3 flex h-16 w-16 items-center justify-center rounded-2xl border border-fresh/30 bg-white text-[15px] font-black text-pine shadow-[0_14px_30px_-14px_rgba(16,59,45,0.35)] transition-transform hover:-translate-y-1 hover:rotate-3">
                      {i + 1}
                    </span>
                    <span className="text-[12.5px] font-bold text-deep">{s}</span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>

          <div className="grid items-start gap-12">
            <div className="grid gap-4 sm:grid-cols-2">
              {topics.map((topic, i) => (
                <Reveal key={topic.t} delay={i * 0.05}>
                  <article className="group h-full rounded-2xl border border-line/70 bg-white/75 p-6 backdrop-blur transition-all hover:-translate-y-1 hover:border-fresh/50 hover:shadow-lg">
                    <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-sage text-pine transition-transform group-hover:rotate-6">
                      <topic.icon size={18} strokeWidth={1.8} />
                    </span>
                    <h3 className="text-[15px] font-extrabold text-deep">{topic.t}</h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-ink/60">{topic.d}</p>
                  </article>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.1} className="lg:sticky lg:top-32">
              <div className="overflow-hidden rounded-[2.2rem] soft-shadow">
                <Image src={PICKS.trialField.src} alt={PICKS.trialField.alt} width={876} height={1168} sizes="(max-width:1024px) 92vw, 480px" className="h-[520px] w-full object-cover" />
              </div>
              <div className="relative z-10 mt-[-60px] mx-6 rounded-[1.6rem] card-glass p-5">
                <p className="text-[12.5px] leading-relaxed text-ink/65">
                  ملاحظة شفافية: لا نعلن عن أصناف مسجلة أو نتائج علمية منتهية إلا بعد توثيقها — تُدار محتويات هذا
                  القسم والمعلن عنها رسميًا من لوحة التحكم.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="mt-16 flex flex-col items-center gap-3">
            <Link href="/contact" className="group inline-flex items-center gap-2.5 rounded-full bg-deep px-8 py-4 text-[15px] font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-pine">
              تحدث مع قسم التهجين
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            </Link>
            <a href={`tel:${contact.phone}`} className="text-[13px] font-bold text-pine hover:underline" dir="ltr">
              {contact.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
