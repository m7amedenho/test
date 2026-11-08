import Link from "next/link";
import { ArrowLeft, Leaf } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getWpPage } from "@/lib/wordpress";
import { extractSections } from "@/lib/content";

/** القسم 07 — الحلول والخدمات الزراعية بمحتويات مأخوذة حرفيًا من WordPress */
export async function SolutionsSection() {
  const page = await getWpPage(decodeURIComponent("خدماتنا"));
  const sections = extractSections(page?.content?.rendered).slice(0, 6);

  return (
    <section className="relative overflow-hidden bg-deep py-24 text-white">
      {/* مساحات عضوية خضراء خفيفة */}
      <div className="pointer-events-none absolute inset-0 opacity-70" aria-hidden>
        <div className="absolute -right-24 top-10 h-96 w-96 rounded-[48%_52%_35%_65%/55%_40%_60%_45%] bg-pine/70 blur-3xl animate-float-slower" />
        <div className="absolute -left-20 bottom-0 h-80 w-80 rounded-[62%_38%_55%_45%/45%_60%_40%_55%] bg-[#1d5c45]/60 blur-3xl animate-float-slow" />
      </div>
      <svg viewBox="0 0 600 600" className="pointer-events-none absolute right-8 top-1/4 h-72 w-72 opacity-15 animate-spin-slower" aria-hidden>
        <circle cx="300" cy="300" r="240" fill="none" stroke="#C1E27A" strokeWidth="1" strokeDasharray="2 10" />
        <circle cx="300" cy="300" r="170" fill="none" stroke="#C1E27A" strokeWidth="1" strokeDasharray="2 6" />
      </svg>

      <div className="container-site relative z-10">
        <Reveal>
          <SectionHeading
            eyebrow="الحلول والخدمات الزراعية"
            title="فريقنا في الحقل... قبل لم تزرع وبعيد الحصاد"
            sub="خدمات حقيقية تقدمها الشركة في جميع محافظات مصر — من الدراسات والتجارب إلى المتابعة الميدانية."
            light
          />
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2">
          {sections.map((s, i) => (
            <Reveal key={s.heading} delay={i * 0.06}>
              <article className={i === 0 ? "md:col-span-2" : ""}>
                <div className={`h-full rounded-[1.6rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur transition-colors hover:border-lime/40 ${i === 0 ? "md:p-8" : ""}`}>
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-lime/20 text-lime">
                      <Leaf size={17} />
                    </span>
                    <h3 className={`font-extrabold ${i === 0 ? "text-lg md:text-xl" : "text-[15px]"}`}>{s.heading}</h3>
                  </div>
                  <p className={`mt-3 leading-relaxed text-white/65 ${i === 0 ? "text-[15px]" : "text-[13.5px]"}`}>
                    {s.body.slice(0, i === 0 ? 260 : 190)}
                    {s.body.length > (i === 0 ? 260 : 190) ? "…" : ""}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="mt-12 text-center">
            <Link
              href="/services"
              className="group inline-flex items-center gap-2.5 rounded-full border border-lime/40 bg-lime/10 px-8 py-4 text-sm font-bold text-lime transition hover:-translate-y-0.5 hover:bg-lime hover:text-deep"
            >
              كل الخدمات الزراعية
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
