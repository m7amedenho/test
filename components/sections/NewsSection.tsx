import Link from "next/link";
import Image from "next/image";
import { Newspaper, ArrowLeft, CalendarDays } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getWpPosts } from "@/lib/wordpress";
import { stripHtml } from "@/lib/wordpress";

/** القسم 11 — الأخبار والفعاليات من WordPress (حالة لمحتوى فارغ بدقة) */
export async function NewsSection() {
  const { items } = await getWpPosts(1, 5);
  const [featured, ...rest] = items;

  return (
    <section className="relative bg-warm py-24">
      <div className="container-site">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="الأخبار والفعاليات"
              title="أخبارنا الزراعية... من قلب الأحداث"
            />
            <Link href="/news" className="mb-10 inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-[13px] font-bold text-pine transition hover:border-fresh hover:bg-sage">
              كل الأخبار
              <ArrowLeft size={14} />
            </Link>
          </div>
        </Reveal>

        {items.length === 0 ? (
          <Reveal>
            <div className="flex flex-col items-center gap-4 rounded-[2rem] border border-dashed border-fresh/40 bg-sage/40 px-8 py-16 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-pine shadow-sm">
                <Newspaper size={22} />
              </span>
              <h3 className="text-lg font-extrabold text-deep">لا توجد أخبار منشورة بعد</h3>
              <p className="max-w-md text-[13.5px] leading-relaxed text-ink/55">
                ستُعرض المقالات والتغطيات هنا تلقائيًا فور نشرها من لوحة التحكم في ووردبريس — بلا أي محتوى وهمي.
              </p>
            </div>
          </Reveal>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
            {/* القصة المميزة */}
            <Reveal>
              <Link href={`/news/${decodeURIComponent(featured.slug)}`} className="group block overflow-hidden rounded-[2rem] border border-line bg-white transition hover:shadow-xl">
                <div className="relative aspect-[16/9] overflow-hidden bg-mist">
                  {featured.featured_media ? (
                    <Image src="" alt="" fill sizes="(max-width:1024px) 92vw, 600px" className="group-hover:scale-105 transition duration-700 object-cover" />
                  ) : null}
                  <span className="absolute right-5 top-5 rounded-full bg-lime px-3 py-1 text-[11px] font-black text-deep">مميز</span>
                </div>
                <div className="p-7">
                  <p className="flex items-center gap-2 text-[12px] text-ink/45">
                    <CalendarDays size={13} />
                    {new Date(featured.date).toLocaleDateString("ar-EG")}
                  </p>
                  <h3 className="mt-3 text-xl font-extrabold text-deep group-hover:text-pine">
                    {stripHtml(featured.title?.rendered)}
                  </h3>
                  <p className="mt-3 line-clamp-2 text-[13.5px] leading-relaxed text-ink/60">
                    {stripHtml(featured.excerpt?.rendered)}
                  </p>
                </div>
              </Link>
            </Reveal>
            <div className="flex flex-col gap-4">
              {rest.slice(0, 3).map((p, i) => (
                <Reveal key={p.id} delay={i * 0.07}>
                  <Link href={`/news/${decodeURIComponent(p.slug)}`} className="group flex gap-4 rounded-2xl border border-line bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-lg">
                    <div className="h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-mist" />
                    <div>
                      <h3 className="text-[14px] font-bold text-deep group-hover:text-pine">{stripHtml(p.title?.rendered)}</h3>
                      <p className="mt-1 text-[11.5px] text-ink/45">{new Date(p.date).toLocaleDateString("ar-EG")}</p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
