"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronDown, Menu, X, ArrowLeft, Sprout } from "lucide-react";
import type { WooCategory } from "@/types/wp";
import { logoUrl } from "@/lib/media";
import { PRODUCT_LINES, type SiteContact } from "@/lib/productLines";

const NAV: { href: string; label: string }[] = [
  { href: "/", label: "الرئيسية" },
  { href: "/about", label: "من نحن" },
  { href: "/products", label: "منتجاتنا" },
  { href: "/breeding", label: "التهجين والتطوير الوراثي" },
  { href: "/nurseries", label: "المشاتل" },
  { href: "/services", label: "الحلول والخدمات الزراعية" },
  { href: "/research", label: "البحث والتطوير" },
  { href: "/news", label: "الأخبار والفعاليات" },
  { href: "/contact", label: "تواصل معنا" },
];

function Logo({ compact }: { compact: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="أليكس عصفور — الصفحة الرئيسية">
      <span
        className="relative block overflow-hidden rounded-full ring-1 ring-line bg-white transition-all"
        style={{ width: compact ? 34 : 40, height: compact ? 34 : 40 }}
      >
        <Image src={logoUrl()} alt="شعار أليكس عصفور" fill sizes="40px" className="object-cover" />
      </span>
      <span className="leading-tight">
        <span className={`block font-bold text-pine transition-all ${compact ? "text-[15px]" : "text-lg"}`}>
          أليكس عصفور
        </span>
        <span className="block text-[10px] text-ink/50">ALEX ASFOR · Agricultural Solutions</span>
      </span>
    </Link>
  );
}

export function Navbar({ categories }: { categories: WooCategory[]; contact: SiteContact }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerProducts, setDrawerProducts] = useState(false);
  const megaTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMegaOpen(false);
    setDrawerOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const openMega = () => {
    if (megaTimer.current) clearTimeout(megaTimer.current);
    setMegaOpen(true);
  };
  const closeMegaSoon = () => {
    megaTimer.current = setTimeout(() => setMegaOpen(false), 120);
  };

  const active = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const shopParent = categories.find((c) => c.parent === 0 && c.count > 10) ?? categories[0];
  const cropCats = categories.filter((c) => c.parent === shopParent?.id && c.count > 0);

  return (
    <div className="relative" onMouseLeave={() => setMegaOpen(false)}>
      <nav
        className={`bg-warm/85 backdrop-blur-xl transition-all duration-300 ${
          scrolled ? "border-b border-line shadow-[0_8px_30px_-18px_rgba(16,59,45,0.25)]" : ""
        }`}
      >
        <div
          className={`container-site flex items-center justify-between gap-4 transition-all ${
            scrolled ? "h-14" : "h-20"
          }`}
        >
          <Logo compact={scrolled} />

          {/* روابط سطح المكتب */}
          <ul className="hidden items-center gap-1 xl:flex text-[13.5px] font-medium">
            {NAV.map((item) => {
              const isProducts = item.href === "/products";
              return (
                <li key={item.href} onMouseEnter={isProducts ? openMega : undefined}>
                  <Link
                    href={item.href}
                    className={`relative flex items-center gap-1 rounded-full px-3 py-2 transition-colors ${
                      active(item.href) ? "text-deep" : "text-ink/70 hover:text-pine"
                    }`}
                  >
                    {item.label}
                    {isProducts && <ChevronDown size={13} className={`transition-transform ${megaOpen ? "rotate-180" : ""}`} />}
                    <span
                      className={`absolute inset-x-3 -bottom-0.5 h-[3px] rounded-full bg-gradient-to-l from-lime to-fresh transition-transform ${
                        active(item.href) ? "scale-x-100" : "scale-x-0"
                      }`}
                      aria-hidden
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className="group hidden items-center gap-2 rounded-full bg-pine px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_25px_-10px_rgba(16,59,45,0.5)] transition-all hover:bg-deep hover:shadow-[0_14px_30px_-10px_rgba(16,59,45,0.55)] sm:flex"
            >
              تواصل مع فريقنا
              <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" />
            </Link>
            <button
              onClick={() => setDrawerOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-white text-pine xl:hidden"
              aria-label="افتح القائمة"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* الميغا مينيو */}
      <div
        onMouseEnter={openMega}
        onMouseLeave={() => {
          if (megaTimer.current) clearTimeout(megaTimer.current);
          setMegaOpen(false);
        }}
        className={`absolute inset-x-0 top-full z-40 transition-all duration-300 ${
          megaOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
        }`}
      >
        <div className="container-site">
          <div className="card-glass mt-2 overflow-hidden rounded-3xl p-6 shadow-[0_40px_80px_-30px_rgba(16,59,45,0.35)]">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-sm font-bold text-deep">
                <Sprout size={16} className="text-fresh" />
                أصناف البذور — جميع محاصيلنا
              </h3>
              <Link href="/products" className="text-xs font-semibold text-pine hover:underline">
                استعرض كل المنتجات ←
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {cropCats.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/categories/${decodeURIComponent(cat.slug)}`}
                  className="group flex flex-col gap-2 rounded-2xl border border-line/70 bg-white/70 p-2.5 transition-all hover:-translate-y-1 hover:border-fresh/50 hover:shadow-lg"
                >
                  <span className="relative block aspect-[4/3] overflow-hidden rounded-xl bg-mist">
                    {cat.image?.src ? (
                      <Image
                        src={cat.image.src}
                        alt={cat.image.alt || cat.name}
                        fill
                        sizes="(max-width: 768px) 45vw, 160px"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : null}
                  </span>
                  <span className="text-[12.5px] font-semibold text-ink/85 group-hover:text-pine">{cat.name}</span>
                  <span className="text-[10.5px] text-ink/40">{cat.count} صنف</span>
                </Link>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-2 gap-2 border-t border-line/70 pt-4 sm:grid-cols-3 lg:grid-cols-6">
              {PRODUCT_LINES.map((line) => (
                <Link
                  key={line.slug}
                  href={line.href}
                  className="rounded-xl px-3 py-2 text-[13px] font-medium text-ink/70 transition-colors hover:bg-sage hover:text-deep"
                >
                  {line.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* درج الموبايل */}
      <div
        className={`fixed inset-0 z-[60] xl:hidden ${drawerOpen ? "" : "pointer-events-none"}`}
        aria-hidden={!drawerOpen}
      >
        <div
          className={`absolute inset-0 bg-deep/40 backdrop-blur-sm transition-opacity ${drawerOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setDrawerOpen(false)}
        />
        <aside
          className={`absolute inset-y-0 right-0 flex w-[86%] max-w-sm flex-col bg-warm shadow-2xl transition-transform duration-300 ${
            drawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <Logo compact />
            <button
              onClick={() => setDrawerOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-ink/70"
              aria-label="أغلق القائمة"
            >
              <X size={18} />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto px-3 py-4">
            <ul className="space-y-1">
              {NAV.slice(0, 3).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block rounded-xl px-4 py-3 text-[15px] font-semibold ${active(item.href) ? "bg-sage text-deep" : "text-ink/80 hover:bg-mist"}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={() => setDrawerProducts((v) => !v)}
                  className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-[15px] font-semibold text-ink/80 hover:bg-mist"
                >
                  منتجاتنا — الأصناف
                  <ChevronDown size={16} className={`transition-transform ${drawerProducts ? "rotate-180" : ""}`} />
                </button>
                {drawerProducts && (
                  <div className="mt-1 grid grid-cols-2 gap-1.5 rounded-2xl bg-mist/60 p-2">
                    {cropCats.slice(0, 12).map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/categories/${decodeURIComponent(cat.slug)}`}
                        className="rounded-lg bg-white px-3 py-2 text-[12.5px] font-medium text-ink/75 hover:text-pine"
                      >
                        {cat.name}
                      </Link>
                    ))}
                    <Link href="/products" className="col-span-2 rounded-lg bg-pine px-3 py-2 text-center text-[12.5px] font-semibold text-white">
                      كل الأصناف والمنتجات
                    </Link>
                  </div>
                )}
              </li>
              {NAV.slice(3).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block rounded-xl px-4 py-3 text-[15px] font-semibold ${active(item.href) ? "bg-sage text-deep" : "text-ink/80 hover:bg-mist"}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="border-t border-line p-4">
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 rounded-2xl bg-pine py-3.5 text-sm font-bold text-white"
            >
              تواصل مع فريقنا
              <ArrowLeft size={16} />
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
