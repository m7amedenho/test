import type { Metadata } from "next";
import Image from "next/image";
import { Target, Globe2, Sprout, Users } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MeshBackground } from "@/components/botanical/MeshBackground";
import { getWpPage, stripHtml } from "@/lib/wordpress";
import { firstParagraph } from "@/lib/content";
import { PICKS } from "@/lib/media";
import { notFoundText } from "@/lib/guards";

export const metadata: Metadata = {
  title: "من نحن",
  description:
    "شركة أليكس عصفور للمستلزمات الزراعية وعموم الاستيراد والتصدير — رائدة في تجارة البذور والشتلات والمستلزمات الزراعية في مصر والشرق الأوسط.",
  alternates: { canonical: "/about" },
};

const VALUES = [
  { icon: Target, t: "أهدافنا", d: "تقديم خدمات زراعية متكاملة وتوفير جميع المنتجات والمستلزمات للمشاتل — من أجل غذاء صحي وأمن 100%." },
  { icon: Globe2, t: "شراكات عالمية", d: "روابط وشراكات دولية مع أكبر الشركات العالمية متعددة الجنسيات التي تقدم خدمات زراعية عالمية المستوى." },
  { icon: Sprout, t: "من التربة", d: "استيراد أنواع مختلفة من بذور الخضروات والفواكه عالية الجودة، وتربيتها وتجربتها في محطتنا قبل وصولها إليك." },
  { icon: Users, t: "فريقنا", d: "فريق عمل ضخم ذو خبرة عالية منتشر في جميع المحافظات لمعاينة المشاريع ميدانيًا وتقديم الدعم الفني على مدار العام." },
];

export default async function AboutPage() {
  const page = await getWpPage("about");
  if (!page) return notFoundText();

  const text = stripHtml(page.content?.rendered ?? "");
  const goalIdx = text.indexOf("أهدافنا");
  const body = goalIdx > 0 ? text.slice(0, goalIdx) : text;
  const goals = goalIdx > 0 ? text.slice(goalIdx + "أهدافنا".length).split(/[،.]/).map((g) => g.trim()).filter((g) => g.length > 3) : [];
  const lead = firstParagraph(page.content?.rendered, 220);

  return (
    <>
      <PageHero
        eyebrow="من نحن"
        title="خبرة تنمو... ورؤية تمتد إلى المستقبل"
        sub="شركة أليكس عصفور للمستلزمات الزراعية وعموم الاستيراد والتصدير"
      />

      <section className="relative overflow-hidden bg-warm py-24">
        <MeshBackground variant="science" className="opacity-50" />
        <div className="container-site grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <p className="text-[17px] font-semibold leading-loose text-deep md:text-lg">{lead}</p>
            <div className="mt-7 space-y-4 text-[14.5px] leading-loose text-ink/70">
              {body
                .split(/[.]/)
                .filter((s) => s.trim().length > 25)
                .slice(1, 5)
                .map((s, i) => (
                  <p key={i}>{s.trim()}.</p>
                ))}
            </div>
          </Reveal>
          <Reveal delay={0.12} className="relative">
            <div className="overflow-hidden rounded-[2.2rem] soft-shadow">
              <Image src={PICKS.heroField.src} alt={PICKS.heroField.alt} width={1280} height={960} sizes="(max-width:1024px) 92vw, 560px" className="h-[430px] w-full object-cover" />
            </div>
            <div className="absolute -bottom-7 -left-5 w-48 overflow-hidden rounded-[1.3rem] ring-6 ring-warm">
              <Image src={PICKS.seedlings.src} alt={PICKS.seedlings.alt} width={640} height={427} sizes="200px" className="h-36 w-full object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-mist py-24">
        <div className="container-site">
          <Reveal>
            <SectionHeading eyebrow="قيمنا وطموحنا" title="ما الذي نبنيه اليوم" align="center" />
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <Reveal key={v.t} delay={i * 0.06}>
                <article className="h-full rounded-[1.6rem] border border-line/70 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-xl">
                  <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-sage text-pine">
                    <v.icon size={19} strokeWidth={1.8} />
                  </span>
                  <h3 className="text-[15px] font-extrabold text-deep">{v.t}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-ink/60">{v.d}</p>
                </article>
              </Reveal>
            ))}
          </div>
          {goals.length > 0 && (
            <Reveal delay={0.15}>
              <div className="mt-12 rounded-[2rem] bg-deep px-8 py-10 text-center text-white">
                <h3 className="mb-5 text-lg font-extrabold text-lime">«من أجل مستقبل أفضل»</h3>
                <ul className="mx-auto flex max-w-3xl flex-wrap justify-center gap-3">
                  {goals.map((g, i) => (
                    <li key={i} className="rounded-full border border-white/15 bg-white/5 px-5 py-2 text-[13px] text-white/80">
                      {g}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}
