"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpLeft, ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    image: "/hero/nursery.jpg",
    alt: "صوب وشتلات داخل مشاتل عصفور",
    label: "من البذرة إلى الحصاد",
    title: "نزرع الثقة، وننمو معك.",
    description: "بذور وشتلات وحلول زراعية تجمع بين الخبرة الميدانية والبحث العلمي، لتبدأ كل خطوة على أرض ثابتة.",
    href: "/products",
    action: "استكشف منتجاتنا",
    caption: "مشاتل عصفور · من أرضنا",
  },
  {
    image: "/hero/seedlings.jpg",
    alt: "شتلات هجينة من إنتاج مشاتل عصفور",
    label: "مشاتل عصفور",
    title: "بداية قوية لكل موسم.",
    description: "شتلات هجينة تُنتجها مشاتل الشركة، مع رعاية فنية وخبرة تدعم المزارع منذ البداية.",
    href: "/nurseries",
    action: "تعرّف على مشاتلنا",
    caption: "شتلات من مشاتل عصفور",
  },
];

export function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), 6500);
    return () => window.clearInterval(timer);
  }, [paused]);

  const move = (direction: number) => setActive((current) => (current + direction + slides.length) % slides.length);
  const slide = slides[active];

  return (
    <section
      aria-label="أليكس للمستلزمات الزراعية"
      aria-roledescription="carousel"
      className="px-4 pt-4 sm:px-7 sm:pt-6 lg:px-10 xl:px-12"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") move(1);
        if (event.key === "ArrowRight") move(-1);
      }}
    >
      <div className="relative isolate mx-auto min-h-[650px] max-w-[1600px] overflow-hidden rounded-[24px] bg-[#102b22] shadow-[0_28px_70px_-38px_rgba(16,43,34,0.65)] sm:rounded-[32px] lg:min-h-[690px]">
        {slides.map((item, index) => (
          <div key={item.image} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out motion-reduce:transition-none ${index === active ? "opacity-100" : "opacity-0"}`} aria-hidden={index !== active}>
            <Image src={item.image} alt={item.alt} fill priority={index === 0} sizes="(max-width: 1600px) 100vw, 1600px" className="object-cover object-center" />
          </div>
        ))}
        <div className="absolute inset-0 bg-[linear-gradient(270deg,rgba(9,35,27,.94)_0%,rgba(9,35,27,.84)_31%,rgba(9,35,27,.37)_66%,rgba(9,35,27,.16)_100%)] lg:bg-[linear-gradient(270deg,rgba(9,35,27,.94)_0%,rgba(9,35,27,.74)_35%,rgba(9,35,27,.16)_76%)]" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/20 to-transparent" />

        <div className="relative z-10 flex min-h-[650px] flex-col justify-between px-7 pb-8 pt-8 text-white sm:px-10 sm:pb-10 sm:pt-10 lg:min-h-[690px] lg:px-16 lg:pb-12 lg:pt-12 xl:px-20">
          <div className="flex items-start justify-between gap-4">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/25 bg-white/10 px-4 py-2.5 text-xs font-semibold tracking-wide backdrop-blur-md sm:text-sm">
              <span className="h-2 w-2 rounded-full bg-[#bdd88b] shadow-[0_0_12px_#bdd88b]" />
              أليكس للمستلزمات الزراعية
            </div>
            <span className="hidden text-xs font-semibold tracking-[.2em] text-white/70 sm:block" dir="ltr">ALEX ASFOUR · EGYPT</span>
          </div>

          <div className="max-w-[750px] py-12 lg:py-16">
            <div key={active} className="motion-safe:animate-[hero-enter_.7s_ease-out_both]">
              <p className="mb-5 flex items-center gap-3 text-sm font-bold text-[#d4e5b9] sm:text-base"><span className="h-px w-9 bg-[#d4e5b9]" />{slide.label}</p>
              <h1 className="heading-display max-w-[720px] text-[clamp(2.7rem,5.2vw,5.8rem)] leading-[1.13] tracking-tight text-white">{slide.title}</h1>
              <p className="mt-6 max-w-[570px] text-base leading-[1.9] text-white/85 sm:text-lg lg:text-xl">{slide.description}</p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link href={slide.href} className="inline-flex min-h-12 items-center gap-3 rounded-xl bg-[#d9e7bd] px-6 py-3 text-sm font-bold text-[#173b2e] transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:text-base">{slide.action}<ArrowUpLeft size={17} aria-hidden="true" /></Link>
                <Link href="/seeds" className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-white/45 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:text-base">تصفّح أصناف البذور<ArrowLeft size={16} aria-hidden="true" /></Link>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-6 border-t border-white/25 pt-6">
            <div className="flex items-center gap-4 sm:gap-6">
              <span className="text-sm font-bold tabular-nums" dir="ltr">0{active + 1} <span className="font-normal text-white/50">/ 0{slides.length}</span></span>
              <div className="flex items-center gap-2" aria-label="شرائح العرض">
                {slides.map((item, index) => <button key={item.image} type="button" aria-current={index === active ? "true" : undefined} aria-label={`اعرض الشريحة ${index + 1}: ${item.label}`} onClick={() => setActive(index)} className={`h-1.5 rounded-full transition-all focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${index === active ? "w-10 bg-[#d9e7bd]" : "w-5 bg-white/45 hover:bg-white"}`} />)}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden max-w-48 truncate text-xs font-medium text-white/70 lg:block">{slide.caption}</span>
              <button type="button" onClick={() => move(-1)} aria-label="الشريحة السابقة" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/35 text-white transition hover:bg-white hover:text-[#173b2e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"><ChevronRight size={20} /></button>
              <button type="button" onClick={() => move(1)} aria-label="الشريحة التالية" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/35 text-white transition hover:bg-white hover:text-[#173b2e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"><ChevronLeft size={20} /></button>
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`@keyframes hero-enter { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </section>
  );
}
