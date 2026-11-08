import Link from "next/link";
import Image from "next/image";
import { Newspaper, CalendarDays, ArrowLeft } from "lucide-react";
import { getWpPosts } from "@/lib/wordpress";
import { stripHtml } from "@/lib/wordpress";

const PER_PAGE = 9;

export async function NewsList({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const sp = await searchParams;
  const page = Math.max(1, Number(sp.page ?? "1") || 1);
  const { items, total, totalPages } = await getWpPosts(page, PER_PAGE);

  if (total === 0) {
    return (
      <section className="bg-warm py-20">
        <div className="container-site">
          <div className="mx-auto flex max-w-md flex-col items-center gap-4 rounded-[2rem] border border-dashed border-fresh/40 bg-sage/40 px-8 py-16 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-pine shadow-sm">
              <Newspaper size={22} />
            </span>
            <h2 className="text-lg font-extrabold text-deep">لا توجد أخبار منشورة بعد</h2>
            <p className="text-[13.5px] leading-relaxed text-ink/55">
              ستظهر الأخبار والفعاليات هنا تلقائيًا فور نشرها في الموقع الرسمي — بلا أي محتوى وهمي.
            </p>
            <Link href="/products" className="mt-2 rounded-full bg-pine px-6 py-3 text-[13px] font-bold text-white">
              استعرض منتجاتنا بدلًا من ذلك
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const media = items.map((p) => p._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? null);

  return (
    <section className="bg-warm py-16">
      <div className="container-site">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((p, i) => (
            <Link key={p.id} href={`/news/${decodeURIComponent(p.slug)}`} className="group flex flex-col overflow-hidden rounded-[1.6rem] border border-line bg-white transition hover:-translate-y-1 hover:shadow-xl">
              <div className="relative aspect-[16/10] bg-mist">
                {media[i] && (
                  <Image src={media[i]!} alt={stripHtml(p.title?.rendered)} fill sizes="(max-width:768px) 92vw, 380px" className="object-cover transition duration-700 group-hover:scale-105" />
                )}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="flex items-center gap-1.5 text-[11.5px] text-ink/45">
                  <CalendarDays size={12} />
                  {new Date(p.date).toLocaleDateString("ar-EG")}
                </p>
                <h2 className="mt-2 text-[15px] font-bold leading-snug text-deep group-hover:text-pine">
                  {stripHtml(p.title?.rendered)}
                </h2>
                <p className="mt-2 line-clamp-2 flex-1 text-[12.5px] leading-relaxed text-ink/55">
                  {stripHtml(p.excerpt?.rendered)}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-bold text-pine">
                  اقرأ المزيد
                  <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {totalPages > 1 && (
          <nav className="mt-12 flex items-center justify-center gap-3" aria-label="ترقيم الصفحات">
            {page > 1 && (
              <Link href={`/news${page - 1 > 1 ? `?page=${page - 1}` : ""}`} className="rounded-xl border border-line bg-white px-4 py-2 text-[13px] font-bold text-pine transition hover:border-fresh">
                السابق
              </Link>
            )}
            <span className="rounded-xl bg-pine px-4 py-2 text-[13px] font-bold text-white">
              {page} / {totalPages}
            </span>
            {page < totalPages && (
              <Link href={`/news?page=${page + 1}`} className="rounded-xl border border-line bg-white px-4 py-2 text-[13px] font-bold text-pine transition hover:border-fresh">
                التالي
              </Link>
            )}
          </nav>
        )}
      </div>
    </section>
  );
}
