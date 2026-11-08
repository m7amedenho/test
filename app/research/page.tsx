import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Microscope, MapPinned, Sprout, ClipboardCheck } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { MeshBackground } from "@/components/botanical/MeshBackground";
import { FloatingLeaves } from "@/components/botanical/Leaves";
import { PICKS } from "@/lib/media";
import { getWpPage } from "@/lib/wordpress";
import { firstParagraph } from "@/lib/content";

export const metadata: Metadata = {
  title: "البحث والتطوير — محطة التجارب",
  description:
    "محطة التجارب الخاصة بالشركة وبرامج البحث والتطوير: دراسة الأصناف في مناطق جغرافية مختلفة، تتبع سلوك النبات، وتقييم معايير النقاء والإنبات.",
  alternates: { canonical: "/research" },
};

const FOCUS = [
  { icon: Microscope, t: "محطة التجارب", d: "تجارب منتظمة على البذور للتأكد من نسبة النقاء والإنبات واكتشاف أي عيوب تظهر أثناء النمو." },
  { icon: MapPinned, t: "مناطق جغرافية مختلفة", d: "زراعة ودراسة الأصناف في مناطق ساحلية وصحراوية مع مراعاة الظروف الجوية لكل منطقة." },
  { icon: Sprout, t: "سلوك النبات", d: "تتبع سلوك كل صنف على حدة لتوفير برامج زراعية مخصصة لكل منطقة جغرافية." },
  { icon: ClipboardCheck, t: "شتلات وتقييم", d: "وجود فريق محترف للمتابعة الحقلية من بداية الزراعة حتى موسم الحصاد." },
];

export default async function ResearchPage() {
  const about = await getWpPage("about");
  const lead = firstParagraph(about?.content?.rendered, 420);

  return (
    <>
      <PageHero
        eyebrow="البحث والتطوير"
        title="محطة تجارب خاصة... علم يسبق الخدمة"
        sub="فريق متخصص يجري التجارب على جميع المنتجات داخل محطة التجارب الخاصة بالشركة، وفريق من المهندسين الزراعيين للمتابعة الحقلية حتى الحصاد."
      />

      <section className="relative overflow-hidden bg-warm py-20">
        <MeshBackground variant="science" className="opacity-60" />
        <FloatingLeaves className="opacity-70" />
        <div className="container-site relative z-10 grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <p className="text-[16px] font-semibold leading-loose text-deep">{lead}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {FOCUS.map((f, i) => (
                <div key={f.t} className="rounded-2xl border border-line/70 bg-white/70 p-5 transition hover:-translate-y-1 hover:shadow-lg">
                  <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-sage text-pine">
                    <f.icon size={18} strokeWidth={1.8} />
                  </span>
                  <h2 className="text-[14.5px] font-extrabold text-deep">{f.t}</h2>
                  <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink/60">{f.d}</p>
                </div>
              ))}
            </div>
            <Link href="/contact" className="group mt-9 inline-flex items-center gap-2 rounded-full bg-deep px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-pine">
              اطلب زيارة لمحطة التجارب
              <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" />
            </Link>
          </Reveal>

          <Reveal delay={0.12} className="relative">
            <div className="overflow-hidden rounded-[2.2rem] soft-shadow">
              <Image src={PICKS.researchLab.src} alt={PICKS.researchLab.alt} width={1024} height={683} sizes="(max-width:1024px) 92vw, 560px" className="h-[430px] w-full object-cover" />
            </div>
            <div className="absolute -bottom-8 -right-5 w-48 overflow-hidden rounded-[1.3rem] ring-6 ring-warm">
              <Image src={PICKS.trialField.src} alt={PICKS.trialField.alt} width={640} height={852} sizes="200px" className="h-40 w-full object-cover" />
            </div>
            <span className="absolute -top-5 left-8 rounded-full card-glass px-5 py-2.5 text-[11.5px] font-bold text-deep">
              صور حقيقية من الحقل والمحطة
            </span>
          </Reveal>
        </div>
      </section>
    </>
  );
}
