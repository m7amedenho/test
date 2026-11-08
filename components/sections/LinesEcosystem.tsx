import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getWpPage, stripHtml } from "@/lib/wordpress";
import { PRODUCT_LINES } from "@/lib/site";
import { LANDING_IMAGES } from "@/lib/media";

// كل خط إنتاج يقترن بصورة حقيقية من وسائط الشركة أو تكوين نباتي مستقل
const LINE_VISUAL: Record<string, { img?: string; alt?: string }> = {
  seeds: { img: LANDING_IMAGES.field.src, alt: LANDING_IMAGES.field.alt },
  seedlings: { img: LANDING_IMAGES.greenhouse.src, alt: LANDING_IMAGES.greenhouse.alt },
  "peat-moss": { img: LANDING_IMAGES.rye.src, alt: LANDING_IMAGES.rye.alt },
};

/** القسم 04 — منظومة المنتجات بتكوين غير متماثل */
export async function LinesEcosystem() {
  const lines = await Promise.all(
    PRODUCT_LINES.map(async (line) => {
      const page = await getWpPage(decodeURIComponent(line.wpSlug));
      return { ...line, intro: stripHtml(page?.content?.rendered ?? "").slice(0, 150) };
    })
  );

  return (
    <section className="relative overflow-hidden bg-mist py-20 sm:py-24" id="products-ecosystem">
      <div className="container-site">
        <Reveal>
          <SectionHeading
            eyebrow="منظومة المنتجات"
            title="منظومة متكاملة تغذي حقلًا... من الجذر إلى الثمرة"
            sub="ستة خطوط إنتاج متكاملة تخدم الشركات والمشاتل والمزارعين — تُدار محتوياتها وتويرتها مباشرة من لوحة التحكم."
          />
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {lines.map((line, i) => {
            const visual = LINE_VISUAL[line.slug];
            const featured = i === 0;
            return (
              <Reveal key={line.slug} delay={i * 0.06} className={featured ? "md:col-span-2 lg:row-span-2" : ""}>
                <Link
                  href={line.href}
                  className="group relative flex h-full min-h-[230px] flex-col justify-end overflow-hidden rounded-[1.8rem] border border-line/70 bg-warm transition-all hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-25px_rgba(16,59,45,0.3)]"
                >
                  {visual?.img ? (
                    <>
                      <Image
                        src={visual.img}
                        alt={visual.alt ?? line.title}
                        fill
                        sizes={featured ? "(max-width: 1024px) 92vw, 600px" : "(max-width: 768px) 92vw, 320px"}
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.07]"
                      />
                      <div className="absolute inset-0 bg-deep/55" />
                    </>
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-sage/50" />
                    </>
                  )}

                  <div className={`relative p-6 ${visual?.img ? "text-white" : "text-deep"}`}>
                    <span className={`mb-2 inline-block rounded-full px-3 py-1 text-[11px] font-bold ${visual?.img ? "bg-white/15 text-lime backdrop-blur" : "bg-deep/10 text-pine"}`}>
                      خط {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className={`text-xl font-extrabold ${visual?.img ? "" : ""}`}>{line.title}</h3>
                    {line.intro ? (
                      <p className={`mt-2 text-[13px] leading-relaxed ${visual?.img ? "text-white/75" : "text-ink/55"} line-clamp-2`}>
                        {line.intro}
                      </p>
                    ) : null}
                    <span className={`mt-4 inline-flex items-center gap-2 text-[13px] font-bold ${visual?.img ? "text-lime" : "text-pine"}`}>
                      استعرض الخط
                      <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
