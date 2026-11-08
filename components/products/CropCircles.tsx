import Image from "next/image";
import Link from "next/link";
import type { WooCategory } from "@/types/wp";
import { getCropCategories } from "@/lib/crops";

export function CropCircles({ categories, excludeId, layout = "strip" }: { categories: WooCategory[]; excludeId?: number; layout?: "strip" | "grid" }) {
  const crops = getCropCategories(categories).filter((crop) => crop.id !== excludeId);

  if (!crops.length) return null;

  return (
    <div className={layout === "grid" ? "grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6" : "flex gap-5 overflow-x-auto pb-5 sm:gap-8"} aria-label="المحاصيل المتاحة">
      {crops.map((crop) => (
        <Link key={crop.id} href={`/categories/${encodeURIComponent(decodeURIComponent(crop.slug))}`} className={`group flex flex-col items-center gap-3 text-center ${layout === "grid" ? "mx-auto w-full max-w-40" : "w-32 shrink-0 sm:w-40"}`}>
          <span className="relative aspect-square w-full overflow-hidden rounded-full border-4 border-white bg-sage shadow-md ring-1 ring-line transition duration-300 group-hover:-translate-y-1 group-hover:ring-fresh">
            {crop.image?.src ? <Image src={crop.image.src} alt={crop.image.alt || crop.name} fill sizes="(max-width: 640px) 128px, 160px" className="object-cover transition-transform duration-500 group-hover:scale-110" /> : <span className="flex h-full items-center justify-center px-3 text-lg font-bold text-pine">{crop.name}</span>}
          </span>
          <span className="text-sm font-bold text-deep group-hover:text-pine">{crop.name}</span>
          <span className="-mt-2 text-xs text-ink/55">{crop.count} صنف</span>
        </Link>
      ))}
    </div>
  );
}
