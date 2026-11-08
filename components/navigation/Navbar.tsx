"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, ChevronDown, Menu, Sprout, X } from "lucide-react";
import type { WooCategory } from "@/types/wp";
import { PRODUCT_LINES, type SiteContact } from "@/lib/productLines";
import { getCropCategories } from "@/lib/crops";

const MAIN_LINKS = [
  { href: "/", label: "الرئيسية" },
  { href: "/about", label: "من نحن" },
  { href: "/nurseries", label: "المشاتل" },
  { href: "/services", label: "الخدمات الزراعية" },
];

const MORE_LINKS = [
  { href: "/breeding", label: "التهجين والتطوير الوراثي" },
  { href: "/research", label: "البحث والتطوير" },
  { href: "/branches", label: "الفروع والمواقع" },
  { href: "/news", label: "الأخبار والفعاليات" },
];

const BRAND = "أليكس للمستلزمات الزراعية";

function Logo({ compact }: { compact: boolean }) {
  return (
    <Link href="/" aria-label={`${BRAND} — الصفحة الرئيسية`} className="flex shrink-0 items-center">
      <span className={`relative block transition-[width,height] duration-300 ease-out ${compact ? "h-12 w-12" : "h-[76px] w-[76px] sm:h-[88px] sm:w-[88px]"}`}>
        <Image src="/Alex.png" alt={BRAND} fill sizes="(max-width: 640px) 76px, 88px" className="object-contain" priority />
      </span>
    </Link>
  );
}

export function Navbar({ categories }: { categories: WooCategory[]; contact: SiteContact }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<"products" | "more" | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerProducts, setDrawerProducts] = useState(false);
  const cropCats = getCropCategories(categories);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  const active = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);
  const closeMenus = () => { setOpenMenu(null); setDrawerOpen(false); };
  const linkClass = (href: string) => `rounded-lg px-3 py-2 text-[13px] font-semibold transition-colors ${active(href) ? "bg-sage text-deep" : "text-ink/75 hover:bg-mist hover:text-pine"}`;

  return (
    <div className="relative" onMouseLeave={() => setOpenMenu(null)} onKeyDown={(event) => { if (event.key === "Escape") { setOpenMenu(null); setDrawerOpen(false); } }} onClick={(event) => { if ((event.target as HTMLElement).closest("a")) closeMenus(); }}>
      <nav className={`border-b bg-white/95 backdrop-blur-lg transition-shadow ${scrolled ? "border-line shadow-sm" : "border-transparent"}`} aria-label="القائمة الرئيسية">
        <div className={`container-site flex items-center justify-between gap-4 transition-[height] duration-300 ${scrolled ? "h-16" : "h-[104px]"}`}>
          <Logo compact={scrolled} />

          <div className="hidden items-center gap-1 lg:flex">
            {MAIN_LINKS.slice(0, 2).map((item) => <Link key={item.href} href={item.href} className={linkClass(item.href)}>{item.label}</Link>)}
            <button type="button" onMouseEnter={() => setOpenMenu("products")} onClick={() => setOpenMenu(openMenu === "products" ? null : "products")} aria-expanded={openMenu === "products"} aria-controls="products-menu" className={`flex items-center gap-1 ${linkClass("/products")}`}>
              منتجاتنا <ChevronDown size={14} className={openMenu === "products" ? "rotate-180" : ""} />
            </button>
            {MAIN_LINKS.slice(2).map((item) => <Link key={item.href} href={item.href} onMouseEnter={() => setOpenMenu(null)} className={linkClass(item.href)}>{item.label}</Link>)}
            <button type="button" onMouseEnter={() => setOpenMenu("more")} onClick={() => setOpenMenu(openMenu === "more" ? null : "more")} aria-expanded={openMenu === "more"} aria-controls="more-menu" className="flex items-center gap-1 rounded-lg px-3 py-2 text-[13px] font-semibold text-ink/75 transition-colors hover:bg-mist hover:text-pine">
              المزيد <ChevronDown size={14} className={openMenu === "more" ? "rotate-180" : ""} />
            </button>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <Link href="/contact" className="hidden items-center gap-2 rounded-lg bg-pine px-4 py-2.5 text-[13px] font-bold text-white transition hover:bg-deep sm:flex">تواصل معنا <ArrowLeft size={15} /></Link>
            <button type="button" onClick={() => setDrawerOpen(true)} className="flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-white text-pine lg:hidden" aria-label="افتح القائمة" aria-expanded={drawerOpen}><Menu size={21} /></button>
          </div>
        </div>
      </nav>

      {openMenu === "products" && (
        <div id="products-menu" className="pointer-events-none absolute inset-x-0 top-full z-40 hidden lg:block">
          <div className="container-site">
            <div className="pointer-events-auto grid max-h-[calc(100dvh-8rem)] grid-cols-[220px_minmax(0,1fr)] overflow-hidden rounded-b-2xl border border-line bg-white shadow-xl">
              <div className="overflow-y-auto border-l border-line bg-mist p-5">
                <p className="mb-3 text-xs font-bold text-ink/50">خطوط المنتجات</p>
                <div className="space-y-1">{PRODUCT_LINES.map((line) => <Link key={line.slug} href={line.href} className="block rounded-lg px-3 py-2 text-sm font-semibold text-deep hover:bg-sage">{line.title}</Link>)}</div>
                <Link href="/products" className="mt-4 flex items-center justify-between rounded-lg bg-pine px-3 py-2 text-xs font-bold text-white">كل المنتجات <ArrowLeft size={14} /></Link>
              </div>
              <div className="flex min-h-0 flex-col p-5">
                <div className="mb-3 flex shrink-0 items-center justify-between gap-4">
                  <p className="flex items-center gap-2 text-sm font-bold text-deep"><Sprout size={16} /> محاصيل البذور</p>
                  <Link href="/seeds" className="text-xs font-bold text-pine hover:underline">صفحة البذور ←</Link>
                </div>
                <div className="min-h-0 overflow-y-auto overscroll-contain" aria-label="محاصيل البذور">
                  <div className="grid grid-cols-2 gap-2 xl:grid-cols-3">
                    {cropCats.map((cat) => <Link key={cat.id} href={`/categories/${decodeURIComponent(cat.slug)}`} className="flex items-center gap-2 rounded-lg border border-line p-2 text-xs font-semibold text-deep hover:border-fresh hover:bg-mist">
                      <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md bg-mist">{cat.image?.src && <Image src={cat.image.src} alt="" fill sizes="40px" className="object-cover" />}</span>
                      <span className="min-w-0 truncate">{cat.name}</span>
                    </Link>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {openMenu === "more" && (
        <div id="more-menu" className="pointer-events-none absolute inset-x-0 top-full z-40 hidden lg:block">
          <div className="container-site flex justify-end"><div className="pointer-events-auto grid w-[420px] grid-cols-2 gap-1 rounded-b-xl border border-line bg-white p-3 shadow-xl">{MORE_LINKS.map((item) => <Link key={item.href} href={item.href} className="rounded-lg px-3 py-3 text-sm font-semibold text-deep hover:bg-mist">{item.label}</Link>)}</div></div>
        </div>
      )}

      <div className={`fixed inset-0 z-[60] lg:hidden ${drawerOpen ? "" : "pointer-events-none"}`} aria-hidden={!drawerOpen}>
        <div className={`absolute inset-0 bg-deep/40 transition-opacity ${drawerOpen ? "opacity-100" : "opacity-0"}`} onClick={() => setDrawerOpen(false)} />
        <aside className={`absolute inset-y-0 right-0 flex w-[86%] max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex items-center justify-between border-b border-line px-5 py-3"><Logo compact /><button type="button" onClick={() => setDrawerOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-lg border border-line text-deep" aria-label="أغلق القائمة"><X size={20} /></button></div>
          <div className="flex-1 overflow-y-auto overscroll-contain p-4">
            <div className="space-y-1">
              {MAIN_LINKS.slice(0, 2).map((item) => <Link key={item.href} href={item.href} className={`block ${linkClass(item.href)}`}>{item.label}</Link>)}
              <button type="button" onClick={() => setDrawerProducts(!drawerProducts)} aria-expanded={drawerProducts} className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-[13px] font-semibold text-deep hover:bg-mist">منتجاتنا <ChevronDown size={16} className={drawerProducts ? "rotate-180" : ""} /></button>
              {drawerProducts && <div className="rounded-xl bg-mist p-3">
                <Link href="/products" className="mb-3 block rounded-lg bg-pine px-3 py-2 text-center text-xs font-bold text-white">كل المنتجات</Link>
                <p className="mb-2 text-xs font-bold text-pine">خطوط المنتجات</p>
                <div className="mb-4 grid grid-cols-2 gap-1">{PRODUCT_LINES.map((line) => <Link key={line.slug} href={line.href} className="rounded-md bg-white px-2 py-2 text-xs font-semibold text-deep">{line.title}</Link>)}</div>
                <p className="mb-2 text-xs font-bold text-pine">محاصيل البذور</p>
                <div className="grid max-h-44 grid-cols-2 gap-1 overflow-y-auto overscroll-contain">{cropCats.map((cat) => <Link key={cat.id} href={`/categories/${decodeURIComponent(cat.slug)}`} className="rounded-md bg-white px-2 py-2 text-xs text-deep">{cat.name}</Link>)}</div>
              </div>}
              {MAIN_LINKS.slice(2).map((item) => <Link key={item.href} href={item.href} className={`block ${linkClass(item.href)}`}>{item.label}</Link>)}
              {MORE_LINKS.map((item) => <Link key={item.href} href={item.href} className={`block ${linkClass(item.href)}`}>{item.label}</Link>)}
            </div>
          </div>
          <div className="border-t border-line p-4"><Link href="/contact" className="block rounded-lg bg-pine px-4 py-3 text-center text-sm font-bold text-white">تواصل معنا</Link></div>
        </aside>
      </div>
    </div>
  );
}
