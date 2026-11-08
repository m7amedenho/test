// أوراق وأغصان SVG فنية — زخارف نباتية شفافة بأسلوب تحريري راقٍ
export function LeafGlyph({
  className = "",
  fromColor = "#65A875",
  toColor = "#C1E27A",
  style,
}: {
  className?: string;
  fromColor?: string;
  toColor?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} aria-hidden fill="none">
      <defs>
        <linearGradient id={`lg-${fromColor.slice(1)}-${toColor.slice(1)}`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor={fromColor} />
          <stop offset="100%" stopColor={toColor} />
        </linearGradient>
      </defs>
      <path
        d="M50 4 C24 22, 8 52, 14 84 C42 90, 72 74, 90 44 C74 30, 66 14, 50 4 Z"
        fill={`url(#lg-${fromColor.slice(1)}-${toColor.slice(1)})`}
        opacity="0.92"
      />
      <path
        d="M50 8 C40 36, 36 60, 30 86"
        stroke="rgba(16,59,45,0.35)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M46 30 L60 34 M42 46 L58 52 M38 62 L54 70" stroke="rgba(16,59,45,0.22)" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

/** عنقود أوراق عائمة — يوضع خلف الأقسام */
export function FloatingLeaves({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <LeafGlyph className="absolute -right-8 top-24 h-28 w-28 rotate-45 opacity-35 animate-float-slow" />
      <LeafGlyph className="absolute left-10 top-1/3 h-16 w-16 -rotate-12 opacity-25 animate-float-slower" fromColor="#174B38" toColor="#65A875" />
      <LeafGlyph className="absolute bottom-16 right-1/4 h-20 w-20 rotate-90 opacity-20 animate-float-slower" fromColor="#C1E27A" toColor="#65A875" />
    </div>
  );
}

/** زخرفة شريط منخفض — أوراق خطية */
export function LeafLine({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 40" fill="none" className={className} aria-hidden>
      <path d="M4 34 C40 32, 70 30, 96 24" stroke="#65A875" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M96 24 C104 14, 116 12, 122 20 C114 26, 104 27, 96 24 Z" fill="#C1E27A" opacity="0.9" />
      <path d="M60 30 C64 22, 72 19, 78 24 C74 28, 67 30, 60 30 Z" fill="#65A875" opacity="0.55" />
      <circle cx="140" cy="16" r="2.4" fill="#174B38" opacity="0.5" />
      <circle cx="152" cy="12" r="1.6" fill="#65A875" />
    </svg>
  );
}
