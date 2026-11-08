export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-warm">
      <div className="flex flex-col items-center gap-4" aria-busy="true">
        <div className="relative h-16 w-16">
          <span className="absolute inset-0 rounded-full border-[3px] border-sage" />
          <span className="absolute inset-0 animate-spin rounded-full border-[3px] border-transparent border-t-fresh" />
          <span className="absolute inset-[30%] rounded-full bg-lime/70 animate-pulse-soft" />
        </div>
        <p className="text-[13px] font-semibold text-pine">تحميل المحتوى من أليكس للمستلزمات الزراعية…</p>
      </div>
    </div>
  );
}
