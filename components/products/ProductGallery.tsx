"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import { Counter, Zoom, Captions } from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/styles.css";
import type { WooImage } from "@/types/wp";

/** معرض صور المنتج مع Lightbox — الصور من وسائط WooCommerce حقيقية */
export function ProductGallery({ images, name }: { images: WooImage[]; name: string }) {
  const [idx, setIdx] = useState(0);
  const [open, setOpen] = useState(false);
  const main = images[idx];

  const slides = images.map((im) => ({
    src: im.src,
    alt: im.alt || `${name} — صورة`,
    description: name,
  }));

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.8rem] border border-line bg-mist">
        {main ? (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="group block h-full w-full cursor-zoom-in"
            aria-label="تكبير الصورة"
          >
            <Image
              src={main.src}
              alt={main.alt || name}
              fill
              priority
              sizes="(max-width: 1024px) 92vw, 560px"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <span className="absolute bottom-3 left-3 rounded-full bg-deep/70 px-3 py-1.5 text-[11px] font-bold text-white opacity-0 transition-opacity group-hover:opacity-100">
              تكبير الصورة ⤢
            </span>
          </button>
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

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={idx}
        slides={slides}
        animation={{ swipe: 320 }}
        controller={{ closeOnBackdropClick: true }}
        plugins={[Zoom, Counter, Captions]}
        zoom={{ maxZoomPixelRatio: 3, scrollToZoom: true }}
        counter={{ container: { style: { top: 32, bottom: "unset" } } }}
        render={{
          iconPrev: () => (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
          ),
          iconNext: () => (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6l6 6-6 6" /></svg>
          ),
        }}
        styles={{
          container: { backgroundColor: "rgba(10,26,20,0.94)" },
        }}
        on={{ view: ({ index }) => setIdx(index) }}
      />
    </div>
  );
}
