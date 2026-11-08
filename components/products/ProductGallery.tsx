"use client";

import { useState } from "react";
import Image from "next/image";
import type { WooImage } from "@/types/wp";

/** معرض صور المنتج — من وسائط WooCommerce الحقيقية */
export function ProductGallery({ images, name }: { images: WooImage[]; name: string }) {
  const [idx, setIdx] = useState(0);
  const main = images[idx];
  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.8rem] border border-line bg-mist">
        {main ? (
          <Image
            src={main.src}
            alt={main.alt || name}
            fill
            priority
            sizes="(max-width: 1024px) 92vw, 560px"
            className="object-cover transition-opacity duration-500"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-ink/20">
            لا توجد صورة للمنتج
          </div>
        )}
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2.5">
          {images.slice(0, 10).map((im, i) => (
            <button
              key={im.id}
              onClick={() => setIdx(i)}
              aria-label={`صورة ${i + 1}`}
              className={`relative aspect-square overflow-hidden rounded-xl border transition ${
                i === idx ? "border-pine ring-2 ring-fresh/40" : "border-line hover:border-fresh"
              }`}
            >
              <Image src={im.thumbnail || im.src} alt={im.alt || `${name} ${i + 1}`} fill sizes="100px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
