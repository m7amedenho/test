import Link from "next/link";
import { ArrowLeft, MessageCircleHeart } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { MeshBackground } from "@/components/botanical/MeshBackground";
import { SeedSphere } from "@/components/botanical/SeedSphere";

/** القسم 12 — دعوة ختامية أنيقة */
export function ContactCTA() {
  return (
    <section className="relative overflow-hidden bg-warm py-28">
      <MeshBackground variant="hero" className="opacity-90" />
      <div className="container-site relative z-10 grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <Reveal>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-deep px-4 py-1.5 text-[12px] font-bold text-lime">
            <MessageCircleHeart size={14} />
            نحن هنا لنجاح حقلك
          </p>
          <h2 className="heading-display text-3xl leading-snug text-deep md:text-5xl">
            دعنا نكون جزءًا من
            <span className="bg-gradient-to-l from-pine via-fresh to-lime bg-clip-text text-transparent"> نجاحك الزراعي</span>
          </h2>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink/65">
            فريقٌ من المهندسين الزراعيين والمختصين جاهز للرد على استفساراتكم وعلى زيارات ميدانية عبر محافظات مصر
            طوال العام.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2.5 rounded-full bg-pine px-8 py-4 text-[15px] font-bold text-white shadow-[0_18px_35px_-14px_rgba(16,59,45,0.55)] transition hover:-translate-y-0.5 hover:bg-deep"
            >
              تواصل معنا
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            </Link>
            <Link
              href="/contact#experts"
              className="inline-flex items-center gap-2.5 rounded-full border border-pine/25 bg-white/80 px-8 py-4 text-[15px] font-bold text-pine backdrop-blur transition hover:-translate-y-0.5 hover:border-fresh"
            >
              تحدث مع خبرائنا
            </Link>
          </div>
        </Reveal>
        <Reveal delay={0.15} className="hidden lg:block">
          <SeedSphere className="mx-auto w-72 opacity-90" />
        </Reveal>
      </div>
    </section>
  );
}
