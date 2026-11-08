import Link from "next/link";
import { MeshBackground } from "@/components/botanical/MeshBackground";
import { LeafGlyph } from "@/components/botanical/Leaves";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-warm">
      <MeshBackground variant="soft" />
      <LeafGlyph className="absolute left-10 top-16 h-24 w-24 rotate-[210deg] opacity-20 animate-float-slow" />
      <div className="container-site relative z-10 flex min-h-[66vh] flex-col items-center justify-center gap-6 text-center">
        <p className="text-[110px] font-bold leading-none text-pine/15">404</p>
        <h1 className="heading-display text-3xl text-deep">الصفحة التي تبحث عنها غير موجودة</h1>
        <p className="max-w-md text-[14.5px] leading-relaxed text-ink/60">
          ربما نُقلت الصفحة أو تغيّر عنوانها — عد إلى الرئيسية أو استعرض منتجاتنا وأصنافنا الزراعية.
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <Link href="/" className="rounded-full bg-pine px-7 py-3.5 text-sm font-bold text-white transition hover:bg-deep">
            العودة للرئيسية
          </Link>
          <Link href="/products" className="rounded-full border border-pine/25 bg-white px-7 py-3.5 text-sm font-bold text-pine transition hover:border-fresh">
            استعرض المنتجات
          </Link>
        </div>
      </div>
    </section>
  );
}
