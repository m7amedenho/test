"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, PhoneCall, ChevronDown } from "lucide-react";
import { MeshBackground } from "@/components/botanical/MeshBackground";
import { SeedSphere } from "@/components/botanical/SeedSphere";
import { LeafGlyph } from "@/components/botanical/Leaves";
import { PICKS } from "@/lib/media";
import type { SiteContact } from "@/lib/site";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 0.8, 0.24, 1] as const } },
};

export function Hero({ contact }: { contact: SiteContact }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);
  const sphereY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -70]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-warm">
      <MeshBackground variant="hero" />
      <LeafGlyph className="absolute right-[6%] top-28 h-24 w-24 rotate-[130deg] opacity-30 animate-float-slower" fromColor="#174B38" toColor="#C1E27A" />
      <LeafGlyph className="absolute left-[38%] top-16 h-12 w-12 -rotate-12 opacity-25 animate-float-slow" />

      <div className="container-site relative z-10 grid min-h-[calc(100svh-116px)] items-center gap-10 pb-16 pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6 lg:pb-20 lg:pt-14">
        {/* النص */}
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-xl">
          <motion.p
            variants={item}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-fresh/30 bg-white/70 px-4 py-1.5 text-[13px] font-semibold text-pine shadow-sm backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fresh opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-fresh" />
            </span>
            أليكس عصفور — للمستلزمات الزراعية وعموم الاستيراد والتصدير
          </motion.p>

          <motion.h1 variants={item} className="heading-display text-[2.15rem] leading-[1.3] text-deep sm:text-5xl sm:leading-[1.28] lg:text-[3.4rem]">
            نصنع مستقبل الزراعة
            <br />
            <span className="relative inline-block">
              <span className="bg-gradient-to-l from-pine via-fresh to-lime bg-clip-text text-transparent">
                من البذرة إلى الحصاد
              </span>
              <motion.span
                className="absolute -bottom-1 right-0 h-[10px] w-full rounded-full bg-lime/50 -z-10"
                initial={{ scaleX: 0, originX: 1 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.15, duration: 0.8, ease: [0.22, 0.8, 0.24, 1] }}
              />
            </span>
          </motion.h1>

          <motion.p variants={item} className="mt-6 text-[15.5px] leading-relaxed text-ink/65 sm:text-lg">
            في أليكس عصفور، نجمع بين الخبرة الزراعية والبحث العلمي والابتكار في تطوير البذور والشتلات والحلول
            الزراعية المتكاملة — ودعم فني يعانق حقول مصر من الإسكندرية إلى أسوان.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/about"
              className="group inline-flex items-center gap-2.5 rounded-full bg-pine px-7 py-4 text-[15px] font-bold text-white shadow-[0_18px_35px_-14px_rgba(16,59,45,0.55)] transition-all hover:-translate-y-0.5 hover:bg-deep"
            >
              اكتشف عالم أليكس عصفور
              <ArrowLeft size={17} className="transition-transform group-hover:-translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2.5 rounded-full border border-pine/25 bg-white/80 px-7 py-4 text-[15px] font-bold text-pine backdrop-blur transition-all hover:-translate-y-0.5 hover:border-fresh hover:shadow-[0_16px_30px_-18px_rgba(16,59,45,0.4)]"
            >
              <PhoneCall size={16} />
              تواصل مع خبرائنا
            </Link>
          </motion.div>

          {/* شرائح مقتنعة — حقائق وصفية حقيقية */}
          <motion.div variants={item} className="mt-12 flex flex-wrap gap-3">
            {["بذور خضروات هجينة", "مشاتل عصفور", "دعم فني في محافظات مصر", "محطات تجارب خاصة"].map((chip) => (
              <span key={chip} className="rounded-2xl border border-line bg-white/60 px-4 py-2 text-[12.5px] font-medium text-ink/70 backdrop-blur">
                {chip}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* التكوين البصري */}
        <div className="relative mx-auto w-full max-w-[560px] pb-8 lg:pb-0">
          <motion.div style={{ y: sphereY }} className="relative z-10 -mr-6 lg:-mr-16">
            <SeedSphere className="w-[86%] max-w-[420px] translate-x-24 lg:-translate-x-0 lg:translate-x-10" />
          </motion.div>

          <motion.figure
            style={{ y: photoY }}
            className="relative z-20 -mt-28 w-[68%] lg:-mt-40 lg:w-[62%]"
            initial={reduce ? undefined : { opacity: 0, y: 60 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 1.1, ease: [0.22, 0.8, 0.24, 1] }}
          >
            <div className="overflow-hidden rounded-[2rem] soft-shadow ring-8 ring-white/70">
              <Image
                src={PICKS.heroField.src}
                alt={PICKS.heroField.alt}
                width={PICKS.heroField.width}
                height={PICKS.heroField.height}
                priority
                sizes="(max-width: 1024px) 65vw, 380px"
                className="h-auto w-full object-cover"
              />
            </div>
            <figcaption className="absolute -bottom-5 right-6 rounded-2xl bg-pine/95 px-4 py-2 text-[11.5px] font-semibold text-lime shadow-lg">
              حقل تجارب الشركة — تصوير حقيقي من الميدان
            </figcaption>
          </motion.figure>

          <motion.figure
            className="absolute bottom-6 left-0 z-30 w-[38%] overflow-hidden rounded-[1.4rem] card-glass p-2"
            initial={reduce ? undefined : { opacity: 0, scale: 0.85 }}
            animate={reduce ? undefined : { opacity: 1, scale: 1 }}
            transition={{ delay: 1.25, duration: 0.9, ease: [0.22, 0.8, 0.24, 1] }}
          >
            <div className="overflow-hidden rounded-[1rem]">
              <Image
                src={PICKS.seedlings.src}
                alt={PICKS.seedlings.alt}
                width={640}
                height={427}
                sizes="220px"
                className="h-auto w-full object-cover"
              />
            </div>
            <p className="px-1.5 pb-1 pt-1.5 text-center text-[11px] font-bold text-deep">شتلات قوية من مشاتل عصفور</p>
          </motion.figure>
        </div>
      </div>

      {/* مؤشر السكرول */}
      <motion.a
        href="#intro"
        className="absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-1 text-ink/40 transition hover:text-pine lg:flex"
        animate={reduce ? undefined : { y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        aria-label="مرر للأسفل"
      >
        <span className="text-[10.5px] font-semibold">مرر لتكتشف قصتنا</span>
        <ChevronDown size={16} />
      </motion.a>
    </section>
  );
}
