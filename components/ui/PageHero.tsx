// Hero فرعي موحد لكل الصفحات الداخلية
import Link from "next/link";
import { MeshBackground } from "@/components/botanical/MeshBackground";

export function PageHero({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-warm">
      <MeshBackground variant="soft" />
      <div className="container-site relative z-10 flex flex-col gap-3 pb-14 pt-16 md:pb-16 md:pt-20">
        <nav aria-label="مسار التنقل" className="text-[12px] text-ink/45">
          <Link href="/" className="transition hover:text-pine">الرئيسية</Link>
          <span className="mx-2">/</span>
          <span className="font-semibold text-pine">{eyebrow}</span>
        </nav>
        <h1 className="heading-display max-w-3xl text-3xl leading-snug text-deep md:text-5xl">{title}</h1>
        {sub ? <p className="max-w-2xl text-[15px] leading-relaxed text-ink/60 md:text-base">{sub}</p> : null}
      </div>
    </section>
  );
}
