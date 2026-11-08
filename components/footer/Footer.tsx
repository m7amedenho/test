import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin } from "lucide-react";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "@/components/ui/SocialIcons";
import { MeshBackground, SectionWave } from "@/components/botanical/MeshBackground";
import { LeafGlyph } from "@/components/botanical/Leaves";
import { PRODUCT_LINES, type SiteContact } from "@/lib/site";
import type { WooCategory } from "@/types/wp";

const BRAND = "أليكس للمستلزمات الزراعية";
const LOGO = "/Alex.png";

const QUICK_LINKS = [
  { href: "/", label: "الرئيسية" },
  { href: "/about", label: "من نحن" },
  { href: "/breeding", label: "التهجين والتطوير الوراثي" },
  { href: "/nurseries", label: "مشاتل عصفور" },
  { href: "/services", label: "الخدمات الزراعية" },
  { href: "/research", label: "البحث والتطوير" },
  { href: "/branches", label: "الفروع والمواقع" },
  { href: "/news", label: "الأخبار والفعاليات" },
  { href: "/contact", label: "تواصل معنا" },
];

export function Footer({ categories, contact }: { categories: WooCategory[]; contact: SiteContact }) {
  const lines = PRODUCT_LINES;
  return (
    <footer className="relative overflow-hidden bg-deep text-white">
      <MeshBackground variant="soft" className="opacity-60" />
      <div className="absolute inset-x-0 -top-px rotate-180 text-warm">
        <SectionWave />
      </div>
      <LeafGlyph className="absolute -bottom-10 -left-10 h-48 w-48 rotate-[30deg] opacity-10" fromColor="#C1E27A" toColor="#65A875" />

      <div className="container-site relative z-10 pt-20 pb-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* الهوية */}
          <div>
            <Link href="/" aria-label={`${BRAND} — الصفحة الرئيسية`} className="inline-block">
              <span className="relative block h-24 w-48">
                <Image
                  src={LOGO}
                  alt={BRAND}
                  fill
                  sizes="192px"
                  className="object-contain object-right"
                />
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/65">
              شركة رائدة في تجارة البذور والشتلات والمستلزمات الزراعية عالية الجودة، تخدم الأسواق والعملاء في مصر
              والشرق الأوسط — من البذرة إلى الحصاد.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a href={contact.socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="فيسبوك" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 transition hover:border-lime hover:text-lime">
                <FacebookIcon size={16} />
              </a>
              <a href={contact.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="إنستجرام" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 transition hover:border-lime hover:text-lime">
                <InstagramIcon size={16} />
              </a>
              <a href={contact.socials.youtube} target="_blank" rel="noopener noreferrer" aria-label="يوتيوب" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 transition hover:border-lime hover:text-lime">
                <YoutubeIcon size={16} />
              </a>
            </div>
          </div>

          {/* روابط سريعة */}
          <nav aria-label="روابط سريعة">
            <h3 className="mb-4 text-sm font-bold text-lime">روابط سريعة</h3>
            <ul className="space-y-2.5 text-sm text-white/65">
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors hover:text-lime">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* خطوط الإنتاج */}
          <nav aria-label="منتجاتنا">
            <h3 className="mb-4 text-sm font-bold text-lime">منتجاتنا</h3>
            <ul className="space-y-2.5 text-sm text-white/65">
              {lines.map((l) => (
                <li key={l.slug}>
                  <Link href={l.href} className="transition-colors hover:text-lime">
                    {l.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/products" className="font-semibold text-white/85 transition hover:text-lime">
                  كل المنتجات والأصناف
                </Link>
              </li>
            </ul>
          </nav>

          {/* تواصل */}
          <div>
            <h3 className="mb-4 text-sm font-bold text-lime">تواصل</h3>
            <a href={`tel:${contact.phone}`} className="flex items-center gap-2 text-sm text-white/80 transition hover:text-lime">
              <Phone size={15} /> <span dir="ltr">{contact.phoneDisplay}</span>
            </a>
            <Link href="/branches" className="mt-3 flex items-center gap-2 text-sm text-white/80 transition hover:text-lime">
              <MapPin size={15} /> فروعنا ومواقع التغطية في محافظات مصر
            </Link>
            <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4 text-[12.5px] leading-relaxed text-white/55">
              الشعار: <span className="text-lime">«من أجل مستقبل أفضل»</span> — الموقع الرسمي، تتحدث بياناته
              تلقائيًا من نظام إدارة المحتوى.
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-[12.5px] text-white/40 sm:flex-row">
          <p>© 2026 {BRAND} وعموم الاستيراد والتصدير. جميع الحقوق محفوظة.</p>
          <p>العربية · نسخة إنجليزية قريبًا</p>
        </div>
      </div>
    </footer>
  );
}
