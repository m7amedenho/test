/** هيكل تحميل شبكة الكروت */
export function GridSkeleton({ label = "جارٍ التحميل…" }: { label?: string }) {
  return (
    <section className="bg-warm py-16 md:py-20" aria-busy="true">
      <div className="container-site">
        <p className="mb-8 text-center text-[13px] font-semibold text-pine">{label}</p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-[1.6rem] border border-line/70 bg-white">
              <div className="aspect-[4/3] animate-pulse bg-mist" />
              <div className="space-y-2 p-5">
                <div className="h-4 w-3/4 animate-pulse rounded bg-mist" />
                <div className="h-3 w-1/2 animate-pulse rounded bg-mist" />
                <div className="h-7 w-24 animate-pulse rounded-full bg-mist" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
