import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import type { PickedImage } from "@/lib/media";

export interface StoryChapter {
  numeral: string;
  title: string;
  text: string;
  image: PickedImage;
}

/** بلاطة صورة — تدرج ونص فوق صورة حقيقية */
function ImageTile({
  ch,
  sizes,
}: {
  ch: StoryChapter;
  sizes: string;
}) {
  return (
    <figure className="group relative h-full min-h-[210px] w-full overflow-hidden rounded-[1.8rem] ring-1 ring-line">
      <Image
        src={ch.image.src}
        alt={ch.image.alt}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-deep/75 via-deep/10 to-transparent" />
      <figcaption className="absolute inset-x-4 bottom-4 sm:inset-x-5 sm:bottom-5">
        <p className="text-[11px] font-bold tracking-widest text-lime">{`الفصل ${ch.numeral}`}</p>
        <h3 className="mt-1 text-lg font-bold leading-snug text-white sm:text-xl">{ch.title}</h3>
        <p className="mt-1.5 line-clamp-2 text-[12.5px] leading-relaxed text-white/75 hidden sm:block">{ch.text}</p>
      </figcaption>
    </figure>
  );
}

/** بلاطة نصية — بطاقة بيضاء على الخلفية الدافئة */
function TextTile({ ch }: { ch: StoryChapter }) {
  return (
    <article className="flex h-full w-full flex-col justify-between rounded-[1.8rem] border border-line bg-white p-6 soft-shadow">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-fresh/40 bg-sage text-[12px] font-bold text-pine">
          {ch.numeral}
        </span>
        <span className="h-px flex-1 bg-gradient-to-l from-fresh/60 to-transparent" aria-hidden />
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-bold leading-snug text-deep sm:text-xl">{ch.title}</h3>
        <p className="mt-2.5 text-[13px] leading-relaxed text-ink/60 line-clamp-4">{ch.text}</p>
      </div>
    </article>
  );
}

/**
 * القسم 03 — قصة الشركة بشبكة Bento: 6 فصول بأحجام متفاوتة
 * على شبكة أعمدة: بلاطة كبيرة من الصور، بطاقات نصية، وصور عريضة.
 */
export function StoryBento({ chapters }: { chapters: StoryChapter[] }) {
  if (!chapters?.length) return null;
  const [a, b, c, d, e, f] = chapters;

  return (
    <div
      id="story"
      className="container-site grid grid-cols-2 grid-flow-dense gap-4 sm:gap-5 lg:grid-cols-4 lg:auto-rows-[215px]"
    >
      <Reveal className="col-span-2 lg:col-span-2 lg:row-span-2">
        <ImageTile ch={a} sizes="(max-width:1024px) 92vw, 600px" />
      </Reveal>
      <Reveal delay={0.07} className="col-span-2 lg:col-span-2">
        <TextTile ch={b} />
      </Reveal>
      <Reveal delay={0.14} className="col-span-2 sm:col-span-1 lg:col-span-1">
        <ImageTile ch={c} sizes="(max-width:1024px) 46vw, 300px" />
      </Reveal>
      <Reveal delay={0.2} className="col-span-2 sm:col-span-1 lg:col-span-1">
        <TextTile ch={d} />
      </Reveal>
      <Reveal delay={0.07} className="col-span-2 lg:col-span-2">
        <ImageTile ch={e} sizes="(max-width:1024px) 92vw, 600px" />
      </Reveal>
      <Reveal delay={0.14} className="col-span-2 lg:col-span-2">
        <ImageTile ch={f} sizes="(max-width:1024px) 92vw, 600px" />
      </Reveal>
    </div>
  );
}
