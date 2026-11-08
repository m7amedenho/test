import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FloatingLeaves } from "@/components/botanical/Leaves";
import { PICKS } from "@/lib/media";
import { stripHtml, getWpPage } from "@/lib/wordpress";
import type { SiteContact } from "@/lib/site";

/** القسم 02 — تعريف بالشركة بتقسيم تحريري مع صور حقيقية ومؤشر قصة عمودي */
export async function IntroSection() {
  const about = await getWpPage("about");
  const text = stripHtml(about?.content?.rendered ?? "");
  const intro = text.slice(0, 420) || "";
  const sentences = intro.split(/[.،]\s*/).filter(Boolean);

  return (
    <section id="intro" className="relative overflow-hidden bg-warm py-24">
      <FloatingLeaves />
      <div className="container-site grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <SectionHeading
            eyebrow="من نحن"
            title="خبرة تنمو... ورؤية تمتد إلى المستقبل"
          />
          <p className="text-[15.5px] leading-loose text-ink/70">{intro.slice(0, 320)}.</p>
          <ul className="mt-8 space-y-3.5">
            {sentences.slice(1, 4).map((s, i) => (
              <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-ink/75">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-fresh" aria-hidden />
                {s.trim()}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex items-center gap-5">
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 rounded-full bg-deep px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              تعرّف علينا أكثر
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            </Link>
            {/* مؤشر قصة عمودي متحرك */}
            <div className="flex flex-col items-center gap-1" aria-hidden>
              {[0, 1, 2].map((i) => (
                <span key={i} className="h-1 w-6 rounded-full bg-line transition-all" style={{ opacity: 1 - i * 0.35 }} />
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="relative">
          <div className="relative">
            <div className="overflow-hidden rounded-[2.2rem] soft-shadow">
              <Image
                src={PICKS.nursery.src}
                alt={PICKS.nursery.alt}
                width={1024}
                height={683}
                sizes="(max-width: 1024px) 92vw, 560px"
                className="h-auto w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -left-4 hidden w-44 overflow-hidden rounded-[1.3rem] ring-6 ring-warm sm:block">
              <Image
                src={PICKS.peat.src}
                alt={PICKS.peat.alt}
                width={512}
                height={384}
                sizes="180px"
                className="h-32 w-full object-cover"
              />
            </div>
            <div className="absolute -top-6 -right-3 rounded-2xl card-glass px-5 py-3 text-center">
              <p className="text-[11px] font-bold text-pine">شعارنا</p>
              <p className="text-sm font-extrabold text-deep">«من أجل مستقبل أفضل»</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
