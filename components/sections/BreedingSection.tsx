import Link from "next/link";
import { ArrowLeft, FlaskConical, Dna } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MeshBackground } from "@/components/botanical/MeshBackground";

const STEPS = [
  { title: "البحث العلمي", icon: FlaskConical },
  { title: "الاختيار الوراثي", icon: Dna },
  { title: "التهجين", icon: Dna },
  { title: "التجارب الحقلية", icon: FlaskConical },
  { title: "التقييم", icon: FlaskConical },
  { title: "التطوير", icon: Dna },
];

const TOPICS = [
  { t: "برامج التربية والتهجين النباتي", d: "إدارة برامج متابعة تربيّة للنباتات داخل بيئة عمل علمية منظمة، بمشاركة مختصي زراعة ووراثة." },
  { t: "تطوير أصناف مُحسّنة", d: "العمل على تطوير أصناف ذات صفات أداء أعلى، بالاعتماد على نتائج التجارب فقط قبل أي إعلان." },
  { t: "اختيار الصفات الزراعية المرغوبة", d: "تحديد الصفات المرغوبة (المقاومة، الإنتاجية، التكيف المناخي) وترتيب أولوياتها في البرامج." },
  { t: "أبحاث التهجين", d: "دراسة متقاطعات النباتات وإنتاج الفرد الهجين تحت ظروف مسيطر عليها بدقة." },
  { t: "تجارب حقلية وتقييم تجريبي", d: "تقييم الأداء الحقلي للأجيال الجديدة في مناطق جغرافية مختلفة ومقارنته بمعايير السوق." },
  { t: "تقييم الجودة والأداء", d: "قياس نسب النقاء والإنبات وسلوك النبات تحت الظروف الطبيعية قبل تعميم أي صنف." },
];

/** زخرفة DNA نباتية SVG على الخلفية */
function DnaVines({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 600" fill="none" className={className} aria-hidden>
      <path d="M120 0 C 220 120, 40 220, 150 340 S 90 500, 190 600" stroke="#65A875" strokeWidth="1.4" strokeDasharray="5 7" opacity="0.5" />
      <path d="M260 0 C 340 140, 180 240, 280 360 S 210 520, 300 600" stroke="#174B38" strokeWidth="1.4" strokeDasharray="5 7" opacity="0.35" />
      {[60, 140, 220, 300, 380, 460, 540].map((y, i) => (
        <g key={y} opacity={0.55}>
          <line x1="120" y1={y} x2="260" y2={y + (i % 2 ? 20 : -20)} stroke="#C1E27A" strokeWidth="6" strokeLinecap="round" opacity={0.35} />
          <circle cx="120" cy={y} r="5" fill="#65A875" opacity="0.6" />
          <circle cx="260" cy={y + (i % 2 ? 20 : -20)} r="5" fill="#174B38" opacity="0.5" />
        </g>
      ))}
    </svg>
  );
}

export function BreedingSection() {
  return (
    <section className="relative overflow-hidden bg-warm py-24" id="breeding">
      <MeshBackground variant="science" className="opacity-80" />
      <DnaVines className="pointer-events-none absolute -left-10 top-10 h-full opacity-[0.08]" />

      <div className="container-site relative z-10">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeading
              eyebrow="قسم علمي مستقل"
              title="التهجين والتطوير الوراثي للنباتات"
              sub="قسم جديدة في أليكس للمستلزمات الزراعية يترجم علم الوراثة النباتية إلى أصناف تفهم حقول مصر — عبر برنامج منضبط من البحث إلى التقييم، وبتعاون مع مختصين في التربية والتهجين."
              align="center"
            />
          </div>
        </Reveal>

        {/* مسار العمل العلمي */}
        <Reveal delay={0.1}>
          <div className="relative mx-auto max-w-4xl">
            <div className="absolute inset-x-8 top-8 h-px bg-line" aria-hidden />
            <ol className="grid grid-cols-3 gap-y-8 md:grid-cols-6">
              {STEPS.map((s, i) => (
                <li key={s.title} className="relative flex flex-col items-center text-center">
                  <span className="relative z-10 mb-3 flex h-16 w-16 items-center justify-center rounded-2xl border border-fresh/30 bg-white text-pine shadow-[0_14px_30px_-14px_rgba(16,59,45,0.35)] transition-transform hover:-translate-y-1 hover:rotate-3">
                    <s.icon size={22} strokeWidth={1.8} />
                    <span className="absolute -top-2 -left-2 flex h-6 w-6 items-center justify-center rounded-full bg-deep text-[10px] font-bold text-lime">
                      {i + 1}
                    </span>
                  </span>
                  <span className="text-[12.5px] font-bold text-deep">{s.title}</span>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        {/* بطاقات المواضيع */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TOPICS.map((topic, i) => (
            <Reveal key={topic.t} delay={i * 0.05}>
              <article className="group h-full rounded-2xl border border-line/70 bg-white/70 p-6 backdrop-blur transition-all hover:-translate-y-1 hover:border-fresh/50 hover:shadow-[0_24px_50px_-25px_rgba(16,59,45,0.35)]">
                <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-sage text-pine transition-transform group-hover:rotate-6">
                  <Dna size={18} strokeWidth={1.8} />
                </span>
                <h3 className="text-[15px] font-extrabold text-deep">{topic.t}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-ink/60">{topic.d}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-col items-center gap-3">
            <Link
              href="/breeding"
              className="group inline-flex items-center gap-2.5 rounded-full bg-deep px-8 py-4 text-[15px] font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-pine"
            >
              اكتشف قسم التهجين والتطوير الوراثي
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            </Link>
            <p className="text-[11.5px] text-ink/40">
              محتويات هذا القسم قابلة للتحديث والترقية من نظام إدارة المحتوى
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
