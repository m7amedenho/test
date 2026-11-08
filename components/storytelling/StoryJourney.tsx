"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { PickedImage } from "@/lib/media";

gsap.registerPlugin(ScrollTrigger);

export interface StoryChapter {
  numeral: string;
  title: string;
  text: string;
  image: PickedImage;
}

/**
 * قصة الشركة — عنصر sandbox: صورة ثابتة تتغير مع السكرول + فصول تُتحفظ
 * بالتقدم الحقيقي، وشريط تقدم مستمر يحترم prefers-reduced-motion.
 */
export function StoryJourney({ chapters }: { chapters: StoryChapter[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      const n = chapters.length;
      ScrollTrigger.create({
        trigger: wrapRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const idx = Math.min(n - 1, Math.floor(self.progress * n));
          setActive(idx);
          if (barRef.current) {
            gsap.set(barRef.current, { scaleX: self.progress, transformOrigin: "right center" });
          }
        },
      });
    }, wrapRef);
    return () => ctx.revert();
  }, [chapters.length]);

  return (
    <div ref={wrapRef} className="relative" id="story">
      <div className="container-site grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        {/* الجانب البصري — ثابت */}
        <div className="lg:sticky lg:top-32 lg:h-[78vh] lg:self-start">
          <div className="relative h-[46vh] overflow-hidden rounded-[2.5rem] bg-mist soft-shadow lg:h-full">
            {chapters.map((ch, i) => (
              <Image
                key={i}
                src={ch.image.src}
                alt={ch.image.alt}
                fill
                sizes="(max-width: 1024px) 90vw, 46vw"
                className={`object-cover transition-all duration-[900ms] ease-out ${
                  i === active ? "opacity-100 scale-100" : "opacity-0 scale-105"
                }`}
              />
            ))}
            {/* طبقة تدرج للنص فوق الصورة */}
            <div className="absolute inset-0 bg-gradient-to-t from-deep/55 via-transparent to-transparent" />
            <div className="absolute bottom-6 right-7 left-7 flex items-end justify-between text-white">
              <div>
                <p className="text-[11px] font-bold tracking-widest text-lime">فصل {chapters[active]?.numeral}</p>
                <p className="mt-1 max-w-[75%] text-lg font-bold leading-snug">{chapters[active]?.title}</p>
              </div>
              <p dir="ltr" className="text-3xl font-bold opacity-60">
                {String(active + 1).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")}
              </p>
            </div>
            {/* شريط التقدم المستمر */}
            <div className="absolute bottom-0 inset-x-0 h-1.5 bg-white/20">
              <div ref={barRef} className="h-full w-full scale-x-0 bg-gradient-to-l from-lime to-fresh" />
            </div>
          </div>
        </div>

        {/* فصول القصة */}
        <div className="flex flex-col">
          {chapters.map((ch, i) => (
            <section
              key={i}
              id={`chapter-${i + 1}`}
              className={`flex min-h-[52vh] flex-col justify-center border-r-2 pr-6 transition-all duration-700 lg:min-h-[85vh] ${
                i === active ? "border-fresh opacity-100" : "border-line opacity-40"
              }`}
            >
              <p className="flex items-center gap-3 text-[13px] font-bold text-pine">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-fresh/40 bg-white text-[12px] shadow-sm">
                  {ch.numeral}
                </span>
                <span className="h-px w-14 bg-gradient-to-l from-fresh/60 to-transparent" aria-hidden />
                {`الفصل ${ch.numeral}`}
              </p>
              <h3 className="mt-4 text-2xl font-bold leading-snug text-deep md:text-4xl">{ch.title}</h3>
              <p className="mt-4 max-w-lg text-[15px] leading-loose text-ink/65 md:text-base">{ch.text}</p>
              {/* صورة مصغرة للموبايل يظهر التفاصيل النصية */}
              <div className="mt-5 h-1 w-16 rounded-full bg-gradient-to-l from-lime to-fresh" aria-hidden />
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
