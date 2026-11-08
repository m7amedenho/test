import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { MapSection } from "@/components/sections/MapSection";
import { getBranches } from "@/lib/branches";

export const metadata: Metadata = {
  title: "الفروع والمواقع",
  description: "فروع أليكس للمستلزمات الزراعية ومواقع مشاتلها ومديري مبيعاتها في محافظات مصر — لأن موقعنا قريب منك دائمًا.",
  alternates: { canonical: "/branches" },
};

export default async function BranchesPage() {
  const branches = await getBranches();
  const main = branches.filter((b) => b.type === "branch");
  const managers = branches.filter((b) => b.type === "sales-manager");

  return (
    <>
      <PageHero
        eyebrow="الفروع والمواقع"
        title="ثنية قريبة... في كل محافظة"
        sub="فروع الشركة وحقول تغطية مديرو المبيعات لديها في جميع محافظات مصر — الاتصال مباشر لكل فرع أو مسؤول."
      />

      <section className="bg-warm py-20">
        <div className="container-site">
          <Reveal>
            <h2 className="mb-8 text-xl font-extrabold text-deep">الفروع والمواقع التشغيلية</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {main.map((b) => (
                <div key={b.id} className="rounded-[1.6rem] border border-line/70 bg-white p-6">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-[15px] font-extrabold text-deep">{b.label}</h3>
                    <span className="rounded-full bg-sage px-3 py-1 text-[10.5px] font-bold text-pine">فرع</span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {b.phones.map((p) => (
                      <a
                        key={p}
                        href={`tel:${p.startsWith("0") ? "+20" + p.slice(1) : p}`}
                        dir="ltr"
                        className="rounded-xl bg-mist px-3.5 py-2 text-[13px] font-bold text-deep transition hover:bg-pine hover:text-lime"
                      >
                        {p}
                      </a>
                    ))}
                  </div>
                  {b.coords && (
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${b.coords.lat},${b.coords.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-bold text-pine hover:underline"
                    >
                      الاتجاهات على الخريطة (تقريبي) ↗
                    </a>
                  )}
                </div>
              ))}
            </div>
          </Reveal>

          {managers.length > 0 && (
            <Reveal delay={0.1}>
              <h2 className="mb-8 mt-14 text-xl font-extrabold text-deep">مديرو المبيعات والتغطية الحقلية</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {managers.map((b) => (
                  <div key={b.id} className="rounded-[1.6rem] border border-line/70 bg-mist/60 p-5">
                    <p className="text-[13.5px] font-extrabold text-deep">{b.label}</p>
                    {b.person && <p className="mt-1 text-[12.5px] text-ink/60">{b.person}</p>}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {b.phones.map((p) => (
                        <a
                          key={p}
                          href={`tel:${p.startsWith("0") ? "+20" + p.slice(1) : p}`}
                          dir="ltr"
                          className="rounded-lg bg-white px-3 py-1.5 text-[12.5px] font-bold text-pine transition hover:bg-pine hover:text-lime"
                        >
                          {p}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          )}

          <p className="mt-8 rounded-2xl bg-sage/50 px-5 py-4 text-[12.5px] leading-relaxed text-ink/60">
            * الأسماء والأرقام مستخرجة مباشرة من صفحة «اتصل بنا» في الموقع الرسمي، وتُحدث تلقائيًا منها. الإحداثيات
            على الخريطة تقريبية (مرتكز على أسماء المناطق) وليست عناوين ميدانية مدققة.
          </p>
        </div>
      </section>

      <MapSection />
    </>
  );
}
