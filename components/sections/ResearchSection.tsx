import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Microscope, Sprout, ClipboardCheck, MapPinned } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LeafLine } from "@/components/botanical/Leaves";
import { LANDING_IMAGES } from "@/lib/media";
import { getWpPage } from "@/lib/wordpress";
import { firstParagraph } from "@/lib/content";

const ACTIVITIES = [
  { icon: Microscope, t: "محطة التجارب الخاصة", d: "إجراء تجارب مستمرة على البذور للتأكد من نسبة النقاء والإنبات ورصد أي عيوب تظهر أثناء فترة النمو." },
  { icon: MapPinned, t: "مناطق جغرافية متعددة", d: "دراسة الأصناف في مناطق ساحلية وصحراوية مع مراقبة أثر الظروف الجوية المختلفة." },
  { icon: Sprout, t: "تتبع سلوك النبات", d: "متابعة كل نبات على حدة لبناء برامج زراعية دقيقة وصايب توجه العملاء بشكل سليم." },
  { icon: ClipboardCheck, t: "تقييم شامل للأصناف", d: "فحص رتب الصنف قبل عرضه: من إسبات الحقل حتى موسم الحصاد." },
];

/** القسم 08 — البحث والتطوير */
export async function ResearchSection() {
  const about = await getWpPage("about");
  const aboutText = firstParagraph(about?.content?.rendered, 260);

  return (
    <section className="relative overflow-hidden bg-warm py-24">
      <div className="container-site grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <Reveal className="relative order-2 lg:order-1">
          <div className="relative">
            <div className="overflow-hidden rounded-[2.2rem] soft-shadow">
              <Image
                src={LANDING_IMAGES.rye.src}
                alt={LANDING_IMAGES.rye.alt}
                width={876}
                height={1168}
                sizes="(max-width: 1024px) 90vw, 520px"
                className="h-[480px] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 w-52 overflow-hidden rounded-[1.3rem] ring-6 ring-warm">
              <Image
                src={LANDING_IMAGES.corn.src}
                alt={LANDING_IMAGES.corn.alt}
                width={640}
                height={480}
                sizes="220px"
                className="h-36 w-full object-cover"
              />
            </div>
            <span className="absolute -top-5 right-8 rounded-full card-glass px-5 py-2.5 text-[12px] font-bold text-deep">
              مشاهد زراعية توضيحية
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="order-1 lg:order-2">
          <SectionHeading
            eyebrow="البحث والتطوير"
            title="علم يسبق الخدمة... تجارب تسبق الوعد"
            sub={aboutText}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {ACTIVITIES.map((a, i) => (
              <div key={a.t} className="rounded-2xl border border-line/70 bg-white/60 p-5 backdrop-blur transition-all hover:-translate-y-1 hover:shadow-lg">
                <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-sage text-pine">
                  <a.icon size={18} strokeWidth={1.8} style={{ visibility: i === 99 ? "hidden" : "visible" }} />
                </span>
                <h3 className="text-[14.5px] font-extrabold text-deep">{a.t}</h3>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink/60">{a.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-9 flex items-center gap-5">
            <Link
              href="/research"
              className="group inline-flex items-center gap-2 rounded-full bg-deep px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5"
            >
              محطة التجارب والبحث
              <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" />
            </Link>
            <LeafLine className="hidden w-24 lg:block" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
