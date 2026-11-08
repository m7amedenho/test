import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, PhoneCall, Leaf, FlaskConical, ShieldCheck, Sprout, Package, Waves } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { MeshBackground } from "@/components/botanical/MeshBackground";
import { LeafGlyph, FloatingLeaves } from "@/components/botanical/Leaves";
import { getWpPage } from "@/lib/wordpress";
import { extractSections, firstParagraph } from "@/lib/content";
import { PRODUCT_LINES, type ProductLine, type SiteContact } from "@/lib/site";
import { getSiteContact } from "@/lib/site";
import { PICKS } from "@/lib/media";
import { ProductCard } from "@/components/products/ProductCard";
import { getWooProducts } from "@/lib/woocommerce";

const ICONS = {
  sprout: Sprout,
  leaf: Leaf,
  package: Package,
  flask: FlaskConical,
  shield: ShieldCheck,
  waves: Waves,
} as const;

/** الحصان البصري بالإضافة لكل خط إنتاج */
function LineVisual({ slug }: { slug: string }) {
  const map: Record<string, string | null> = {
    seedlings: PICKS.seedlings.src,
    "peat-moss": PICKS.peat.src,
    seeds: PICKS.heroField.src,
  };
  const img = map[slug] ?? null;
  if (img) {
    return (
      <div className="overflow-hidden rounded-[2.2rem] soft-shadow">
        <Image src={img} alt="" width={1024} height={683} sizes="(max-width:1024px) 92vw, 560px" className="h-[380px] w-full object-cover" />
      </div>
    );
  }
  // تكوين نباتي مجرد لخطوط بدون صور موثقة
  return (
    <div className="relative flex h-[380px] items-center justify-center rounded-[2.2rem] border border-line bg-gradient-to-bl from-sage via-warm to-mist soft-shadow">
      <LeafGlyph className="absolute -left-6 top-8 h-32 w-32 rotate-[200deg] opacity-30 animate-float-slow" />
      <LeafGlyph className="absolute -right-4 bottom-10 h-24 w-24 rotate-[320deg] opacity-20 animate-float-slower" fromColor="#174B38" />
      <svg viewBox="0 0 200 200" className="h-56 w-56 animate-spin-slower" aria-hidden>
        <circle cx="100" cy="100" r="80" fill="none" stroke="#65A875" strokeWidth="1" strokeDasharray="2 8" />
        <circle cx="100" cy="100" r="52" fill="none" stroke="#174B38" strokeWidth="1" strokeDasharray="1 5" />
        <ellipse cx="100" cy="100" rx="96" ry="44" fill="none" stroke="#C1E27A" strokeWidth="1.2" />
        <circle cx="100" cy="20" r="4" fill="#174B38" opacity="0.6" />
      </svg>
      <span className="absolute rounded-full bg-white/70 px-5 py-2 text-[12px] font-bold text-pine shadow-sm backdrop-blur">
        تصويرة أصلية تُدار من لوحة التحكم — لا صور وهمية
      </span>
    </div>
  );
}

export async function LinePageView({ line }: { line: ProductLine }) {
  const [page, contact] = await Promise.all([getWpPage(decodeURIComponent(line.wpSlug)), getSiteContact()]);
  const sections = extractSections(page?.content?.rendered);
  const intro = page?.content?.rendered ? firstParagraph(page.content.rendered, 300) : "";
  const Icon = ICONS[line.icon];

  // خط البذور مرتبط بمتجر الأصناف: نعرض منتجات حقيقية
  const isSeeds = line.slug === "seeds";
  const seedProducts = isSeeds ? (await getWooProducts()).slice(0, 8) : [];

  return (
    <>
      <PageHero
        eyebrow="خطوط الإنتاج"
        title={line.title}
        sub={intro || undefined}
      />

      <section className="relative overflow-hidden bg-warm py-20">
        <MeshBackground variant="soft" className="opacity-70" />
        <div className="container-site relative z-10 grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pine text-lime">
                <Icon size={20} />
              </span>
              <h2 className="heading-display text-2xl text-deep md:text-3xl">{line.title}</h2>
            </div>
            <p className="mt-5 text-[15px] leading-loose text-ink/70">
              {intro ||
                "محتوى هذا الخط يُدار ويتحدّث تلقائيًا من صفحات الموقع الرسمي للشركة — دون أي بيانات مُختلَقة."}
            </p>
            {sections.slice(0, 3).map((s, i) => (
              <div key={i} className="mt-6 rounded-2xl border border-line/70 bg-white/70 p-5">
                <h3 className="text-[14.5px] font-extrabold text-deep">{s.heading}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-ink/60">{s.body}</p>
              </div>
            ))}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="group inline-flex items-center gap-2 rounded-full bg-pine px-6 py-3.5 text-[13.5px] font-bold text-white transition hover:bg-deep">
                اطلب الآن
                <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
              </Link>
              <a href={`tel:${contact.phone}`} className="inline-flex items-center gap-2 rounded-full border border-pine/25 bg-white px-6 py-3.5 text-[13.5px] font-bold text-pine transition hover:border-fresh">
                <PhoneCall size={14} />
                اتصل بنا
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <LineVisual slug={line.slug} />
          </Reveal>
        </div>
      </section>

      {isSeeds && seedProducts.length > 0 && (
        <section className="bg-mist py-20">
          <div className="container-site">
            <div className="mb-8 flex items-end justify-between gap-4">
              <h2 className="heading-display text-2xl text-deep md:text-3xl">أصناف البذور في متجرنا</h2>
              <Link href="/products" className="inline-flex items-center gap-2 text-[13px] font-bold text-pine hover:underline">
                كل الأصناف
                <ArrowLeft size={14} />
              </Link>
            </div>
            <FloatingLeaves className="opacity-60" />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {seedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
