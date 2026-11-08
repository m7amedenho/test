import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, MessageCircleQuestion } from "lucide-react";
import type { WooProduct } from "@/types/wp";
import { plainWpText } from "@/lib/content";

/** كرت منتج — من بيانات WooCommerce الحقيقية (بدون أسعار وهمية) */
export function ProductCard({ product, priority = false }: { product: WooProduct; priority?: boolean }) {
  const img = product.images?.[0];
  const description = plainWpText(product.short_description || product.description || "");
  const excerpt = description.length > 125 ? `${description.slice(0, 125).trimEnd()}…` : description;
  return (
    <Link
      href={`/products/${decodeURIComponent(product.slug)}`}
      className="group flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-line/70 bg-white transition-all hover:-translate-y-1.5 hover:shadow-[0_28px_55px_-25px_rgba(16,59,45,0.3)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-mist">
        {img ? (
          <Image
            src={img.thumbnail && img.thumbnail.startsWith("http") ? img.src : img.src}
            alt={img.alt || product.name}
            fill
            priority={priority}
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 300px"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-ink/20">
            <MessageCircleQuestion size={36} />
          </div>
        )}
        {product.categories?.[0] && (
          <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10.5px] font-bold text-pine backdrop-blur">
            {product.categories[0].name}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[14.5px] font-bold leading-snug text-deep transition-colors group-hover:text-pine">
          {product.name}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-[12px] leading-relaxed text-ink/50">
          {excerpt || "تعرّف على تفاصيل الصنف ومواصفاته"}
        </p>
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-[12.5px] font-bold text-ink/60">
            {product.price ? (
              <span className="text-pine">{product.price} ج.م</span>
            ) : (
              <span className="rounded-full bg-sage px-3 py-1 text-[11px] font-bold text-pine">سعر عند الطلب</span>
            )}
          </span>
          <span className="inline-flex items-center gap-1.5 text-[12px] font-bold text-pine">
            التفاصيل
            <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}
