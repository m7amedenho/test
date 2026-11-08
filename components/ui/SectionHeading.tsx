import { LeafLine } from "@/components/botanical/Leaves";

export function SectionHeading({
  eyebrow,
  title,
  sub,
  align = "start",
  light = false,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  align?: "start" | "center";
  light?: boolean;
}) {
  const centered = align === "center";
  return (
    <div className={`mb-10 md:mb-14 ${centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}`}>
      <div className={`mb-4 flex items-center gap-3 ${centered ? "justify-center" : ""}`}>
        <span className="h-2 w-2 rounded-full bg-fresh" aria-hidden />
        <span className={`text-[13px] font-bold tracking-wide ${light ? "text-lime" : "text-pine"}`}>{eyebrow}</span>
        <LeafLine className={`w-20 ${light ? "opacity-70" : "opacity-80"}`} />
      </div>
      <h2
        className={`heading-display text-3xl md:text-5xl ${light ? "text-white" : "text-deep"}`}
      >
        {title}
      </h2>
      {sub ? (
        <p className={`mt-4 text-base md:text-lg leading-relaxed ${light ? "text-white/75" : "text-ink/65"}`}>
          {sub}
        </p>
      ) : null}
    </div>
  );
}
