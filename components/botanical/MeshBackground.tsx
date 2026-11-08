export function MeshBackground({ className = "", variant = "soft" }: { className?: string; variant?: "hero" | "soft" | "science" }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <div className={`absolute inset-0 ${variant === "science" ? "opacity-[0.16]" : "opacity-[0.10]"}`} style={{ backgroundImage: "radial-gradient(circle, #719a7d 0.7px, transparent 0.7px)", backgroundSize: "30px 30px" }} />
      <div className="absolute left-0 top-0 h-44 w-44 rounded-full bg-sage/35 blur-3xl" />
    </div>
  );
}

export function SectionWave({ flip = false }: { flip?: boolean }) {
  return <div className={`h-px w-full bg-line ${flip ? "rotate-180" : ""}`} aria-hidden />;
}
