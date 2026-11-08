// خلفية Mesh عضوية — طبقات تدرج ضبابية متحركة بلطف (CSS فقط)
export function MeshBackground({
  className = "",
  variant = "hero",
}: {
  className?: string;
  variant?: "hero" | "soft" | "science";
}) {
  const layers = {
    hero: [
      "radial-gradient(40% 45% at 78% 22%, rgba(193,226,122,0.55) 0%, rgba(193,226,122,0) 70%)",
      "radial-gradient(50% 55% at 20% 30%, rgba(101,168,117,0.30) 0%, rgba(101,168,117,0) 72%)",
      "radial-gradient(45% 50% at 85% 75%, rgba(23,75,56,0.16) 0%, rgba(23,75,56,0) 70%)",
      "radial-gradient(60% 60% at 50% 100%, rgba(234,241,233,0.9) 0%, rgba(234,241,233,0) 70%)",
    ],
    soft: [
      "radial-gradient(45% 40% at 85% 15%, rgba(193,226,122,0.35) 0%, rgba(193,226,122,0) 70%)",
      "radial-gradient(55% 50% at 10% 70%, rgba(101,168,117,0.18) 0%, rgba(101,168,117,0) 72%)",
    ],
    science: [
      "radial-gradient(48% 55% at 82% 20%, rgba(193,226,122,0.5) 0%, rgba(193,226,122,0) 70%)",
      "radial-gradient(55% 55% at 12% 85%, rgba(16,59,45,0.12) 0%, rgba(16,59,45,0) 70%)",
      "radial-gradient(40% 45% at 55% 45%, rgba(101,168,117,0.22) 0%, rgba(101,168,117,0) 70%)",
    ],
  }[variant];

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <div className="absolute inset-0" style={{ backgroundImage: layers.join(",") }} />
      {/* أشكال عضوية سائلة ضبابية */}
      <div
        className="absolute -top-24 right-[8%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_35%_35%,rgba(193,226,122,0.5),rgba(193,226,122,0)_65%)] blur-3xl animate-float-slow"
      />
      <div className="absolute bottom-[10%] left-[4%] h-[360px] w-[360px] rounded-[42%_58%_55%_45%/48%_42%_58%_52%] bg-[radial-gradient(circle_at_60%_40%,rgba(101,168,117,0.28),rgba(101,168,117,0)_60%)] blur-3xl animate-float-slower" />
      <div className="absolute left-[36%] top-[42%] h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.65),rgba(255,255,255,0)_70%)] blur-2xl" />
    </div>
  );
}

/** موجة تنتقل ناعمة بين الأقسام */
export function SectionWave({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 1440 90"
      fill="none"
      aria-hidden
      className={`block h-[70px] w-full ${flip ? "rotate-180" : ""}`}
      preserveAspectRatio="none"
    >
      <path
        d="M0 45 C 240 90, 480 0, 720 40 C 960 80, 1200 10, 1440 45 L 1440 90 L 0 90 Z"
        fill="currentColor"
      />
    </svg>
  );
}
