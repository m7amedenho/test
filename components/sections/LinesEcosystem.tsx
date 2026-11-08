import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getWpPage, stripHtml } from "@/lib/wordpress";
import { PRODUCT_LINES } from "@/lib/site";
import { PICKS } from "@/lib/media";

// كل خط إنتاج يقترن بصورة حقيقية من وسائط الشركة أو تكوين نباتي مستقل
const LINE_VISUAL: Record<string, { img?: string; alt?: string }> = {
  seeds: { img: PICKS.heroField.src, alt: PICKS.heroField.alt },
  seedlings: { img: PICKS.seedlings.src, alt: PICKS.seedlings.alt },
  "peat-moss": { img: PICKS.peat.src, alt: PICKS.peat.alt },
};

const ABSTRACT_TONES = [
  "from-fresh/25 via-lime/35 to-transparent",
  "from-deep/20 via-fresh/25 to-transparent",
  "from-lime/30 via-fresh/20 to-transparent",
];

/** القسم 04 — منظومة المنتجات بتكوين غير متماثل */
export async function LinesEcosystem() {
  const lines = await Promise.all(
    PRODUCT_LINES.map(async (line) => {
      const page = await getWpPage(decodeURIComponent(line.wpSlug));
      return { ...line, intro: stripHtml(page?.content?.rendered ?? "").slice(0, 150) };
    })
  );

  return (
    <section className="relative overflow-hidden bg-mist py-24" id="products-ecosystem">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-warm to-transparent" aria-hidden />
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
            const tone = ABSTRACT_TONES[i % ABSTRACT_TONES.length];
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
                      <div className="absolute inset-0 bg-gradient-to-t from-deep/80 via-deep/25 to-transparent" />
                    </>
                  ) : (
                    <>
                      <div className={`absolute inset-0 bg-gradient-to-bl ${tone}`} />
                      <svg viewBox="0 0 200 200" className="absolute -left-8 -top-8 h-44 w-44 opacity-40 animate-spin-slower" aria-hidden>
                        <circle cx="100" cy="100" r="70" fill="none" stroke="#65A875" strokeWidth="0.8" strokeDasharray="3 6" />
                        <circle cx="100" cy="100" r="46" fill="none" stroke="#174B38" strokeWidth="0.8" strokeDasharray="1 4" />
                        <ellipse cx="100" cy="100" rx="88" ry="40" fill="none" stroke="#C1E27A" strokeWidth="0.9" />
                      </svg>
                      <span className="absolute right-6 top-6 h-16 w-16 rounded-full bg-[radial-gradient(circle_at_35%_30%,white,rgba(193,226,122,0.5)_60%,rgba(101,168,117,0.25))] blur-[2px] animate-float-slow" aria-hidden />
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
