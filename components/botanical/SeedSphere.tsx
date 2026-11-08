// منحوتة نباتية مجسمة (CSS/SVG) — عنصر Hero البصري المركزي
export function SeedSphere({ className = "" }: { className?: string }) {
  return (
    <div className={`relative aspect-square ${className}`} aria-hidden>
      {/* الهالة الأساس */}
      <div className="absolute inset-[6%] rounded-full bg-[radial-gradient(circle_at_32%_28%,rgba(255,255,255,0.95),rgba(234,241,233,0.6)_38%,rgba(101,168,117,0.35)_66%,rgba(23,75,56,0.22)_100%)] shadow-[inset_0_-30px_60px_-30px_rgba(16,59,45,0.35),0_50px_100px_-40px_rgba(16,59,45,0.4)]" />
      {/* حلقة مدارية عائمة */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 animate-spin-slower">
        <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(23,75,56,0.28)" strokeWidth="0.5" strokeDasharray="1.5 3" />
        <circle cx="96" cy="50" r="2.2" fill="#C1E27A" />
        <circle cx="50" cy="4" r="1.6" fill="#65A875" />
      </svg>
      <svg viewBox="0 0 100 100" className="absolute inset-[9%] animate-spin-slower" style={{ animationDirection: "reverse", animationDuration: "52s" }}>
        <ellipse cx="50" cy="50" rx="48" ry="34" fill="none" stroke="rgba(101,168,117,0.4)" strokeWidth="0.4" strokeDasharray="2 4" />
        <circle cx="98" cy="50" r="1.8" fill="#174B38" opacity="0.7" />
      </svg>
      {/* بذور مجسمة */}
      <svg viewBox="0 0 200 200" className="absolute inset-0">
        <defs>
          <linearGradient id="seedg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fff" />
            <stop offset="45%" stopColor="#F4EFD9" />
            <stop offset="100%" stopColor="#B9CE8F" />
          </linearGradient>
        </defs>
        <g className="animate-float-slow">
          {[118, 88, 132].map((cx, i) => (
            <ellipse key={i} cx={cx} cy={[76, 118, 128][i]} rx="7" ry="11" fill="url(#seedg)" transform={`rotate(${[24, -18, 40][i]} ${cx} ${[76, 118, 128][i]})`} opacity="0.95" />
          ))}
        </g>
      </svg>
      {/* ورقة متصالة */}
      <svg viewBox="0 0 120 120" className="absolute -bottom-2 -left-2 h-[46%] w-[46%] animate-float-slower">
        <path
          d="M56 106 C34 88, 20 64, 30 34 C52 30, 76 42, 88 62 C74 80, 66 96, 56 106 Z"
          fill="url(#fs-lg)"
          opacity="0.96"
        />
        <defs>
          <linearGradient id="fs-lg" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#174B38" />
            <stop offset="60%" stopColor="#65A875" />
            <stop offset="100%" stopColor="#C1E27A" />
          </linearGradient>
        </defs>
        <path d="M52 102 C44 76, 40 56, 38 40" stroke="rgba(255,255,255,0.55)" strokeWidth="2" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  );
}
