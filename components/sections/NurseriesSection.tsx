import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getWpPage, stripHtml } from "@/lib/wordpress";
import { firstParagraph } from "@/lib/content";
import { PICKS } from "@/lib/media";

/** القسم 06 — مشاتل عصفور بعرض رئيسًا من صور الشركة الحقيقية */
export async function NurseriesSection() {
  const page = await getWpPage(decodeURIComponent("ألشتلات"));
  const intro = firstParagraph(page?.content?.rendered, 320);

  return (
    <section className="relative overflow-hidden py-24">
      {/* تكوين الصورة العريضة مع أقواس عضوية */}
      <div className="absolute inset-0" aria-hidden>
        <Image src={PICKS.nursery.src} alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-l from-warm via-warm/70 to-warm/30" />
      </div>

      <div className="container-site relative z-10 grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <SectionHeading
            eyebrow="مشاتل عصفور"
            title="شتلة هجينة قوية... تبدأ هنا"
            sub={
              intro ||
              "سلسلة مشاتل الشركة منتشرة في معظم محافظات مصر، وتوفر شتلات هجينة عالية الجودة بالاعتماد شبه الكامل على موارد الشركة من بذور وأسمدة وبيتموس ومبيدات."
            }
          />
          <div className="mt-8 flex flex-wrap gap-3">
            {["تقنيات إنتاج حديثة", "انتقاء أجود البيتموس", "برامج وقاية متكاملة"].map((chip) => (
              <span key={chip} className="rounded-2xl bg-white/85 px-4 py-2 text-[12.5px] font-semibold text-pine shadow-sm ring-1 ring-line backdrop-blur">
                {chip}
              </span>
            ))}
          </div>
          <div className="mt-10">
            <Link
              href="/nurseries"
              className="group inline-flex items-center gap-2.5 rounded-full bg-pine px-7 py-4 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-deep"
            >
              تعرّف على مشاتل عصفور
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.12} className="relative">
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-1 overflow-hidden rounded-[1.6rem] ring-4 ring-white/70">
              <Image
                src={PICKS.seedlings.src}
                alt={PICKS.seedlings.alt}
                width={640}
                height={427}
                sizes="320px"
                className="h-44 w-full object-cover md:h-52"
              />
            </div>
            <div className="col-span-1 mt-8 overflow-hidden rounded-[1.6rem] ring-4 ring-white/70">
              <Image
                src={PICKS.researchLab.src}
                alt={PICKS.researchLab.alt}
                width={640}
                height={427}
                sizes="320px"
                className="h-44 w-full object-cover md:h-52"
              />
            </div>
            <div className="col-span-2 overflow-hidden rounded-[1.6rem] ring-4 ring-white/70 soft-shadow">
              <Image
                src={PICKS.peat.src}
                alt={PICKS.peat.alt}
                width={960}
                height={540}
                sizes="(max-width: 1024px) 92vw, 540px"
                className="h-52 w-full object-cover md:h-64"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
