"use client";

import { useEffect, useRef, useState } from "react";

/** أرقام الأعمال مقدّمة من صاحب الموقع — لا تُعاد حسابها من مصادر أخرى */
const STATS: { label: string; value: number; suffix?: string }[] = [
  { label: "الأصناف", value: 45, suffix: "+" },
  { label: "المحافظات", value: 21 },
  { label: "فريق العمل", value: 180, suffix: "+" },
  { label: "المشاريع", value: 40, suffix: "+" },
  { label: "سنوات الخبرة", value: 32 },
];

/** عدّاد أرقام يتصاعد عند ظهوره في الشاشة — يحترم prefers-reduced-motion */
function Counter({ value, suffix }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShown(value);
      return;
    }
    let raf = 0;
    let started = false;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || started) return;
        started = true;
        io.disconnect();
        const t0 = performance.now();
        const dur = 1600;
        const ease = (t: number) => 1 - Math.pow(1 - t, 3);
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / dur);
          setShown(Math.round(ease(p) * value));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    if (ref.current) io.observe(ref.current);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums" dir="ltr">
      {shown.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}

/** شريط الأعمال — أرقام حية بتعداد متصاعد */
export function StatsBar() {
  return (
    <section aria-label="أرقام أعمالنا" className="relative overflow-hidden bg-deep py-14 text-white">
      <div
        aria-hidden
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(40% 60% at 12% 20%, rgba(193,226,122,0.18) 0%, rgba(193,226,122,0) 70%), radial-gradient(45% 55% at 88% 75%, rgba(101,168,117,0.16) 0%, rgba(101,168,117,0) 72%)",
        }}
      />
      <div className="container-site relative z-10">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <dd className="heading-display text-4xl text-lime md:text-5xl">
                <Counter value={s.value} suffix={s.suffix} />
              </dd>
              <dt className="mt-2 text-[13px] font-semibold text-white/70">{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
