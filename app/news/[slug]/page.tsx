import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, ArrowRight } from "lucide-react";
import { MeshBackground } from "@/components/botanical/MeshBackground";
import { getWpPost, getWpPosts, stripHtml } from "@/lib/wordpress";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export async function generateStaticParams() {
  const { items } = await getWpPosts(1, 100);
  // بدون مقالات منشورة نمرر مسارًا فارغًا (سيعطي 404) حتى يظل البناء ثابتًا
  return items.length ? items.map((p) => ({ slug: decodeURIComponent(p.slug) })) : [{ slug: "__none__" }];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getWpPost(slug);
  if (!post) return { title: "خبر غير موجود" };
  return {
    title: stripHtml(post.title?.rendered),
    description: stripHtml(post.excerpt?.rendered).slice(0, 160),
    alternates: { canonical: `/news/${slug}` },
    openGraph: {
      title: stripHtml(post.title?.rendered),
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getWpPost(slug);
  if (!post) notFound();

  const hero = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const ago = new Date(post.date).toLocaleDateString("ar-EG", { day: "numeric", month: "long", year: "numeric" });
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: stripHtml(post.title?.rendered),
    datePublished: post.date,
    dateModified: post.modified ?? post.date,
    author: { "@type": "Organization", name: "أليكس للمستلزمات الزراعية" },
    ...(hero ? { image: [hero] } : {}),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article className="relative overflow-hidden bg-warm pb-20 pt-12">
        <MeshBackground variant="soft" className="opacity-70" />
        <div className="container-site relative z-10 max-w-3xl">
          <nav aria-label="مسار التنقل" className="mb-6 text-[12px] text-ink/45">
            <Link href="/" className="hover:text-pine">الرئيسية</Link>
            <span className="mx-2">/</span>
            <Link href="/news" className="hover:text-pine">الأخبار</Link>
          </nav>

          <p className="flex items-center gap-2 text-[12.5px] font-semibold text-ink/50">
            <CalendarDays size={13} />
            {ago}
          </p>
          <h1 className="heading-display mt-3 text-3xl leading-snug text-deep md:text-4xl">
            {stripHtml(post.title?.rendered)}
          </h1>

          {hero && (
            <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-[2rem] border border-line soft-shadow">
              <Image src={hero} alt={stripHtml(post.title?.rendered)} fill sizes="(max-width:768px) 92vw, 768px" className="object-cover" priority />
            </div>
          )}

          <div
            className="mt-10 text-[15px] leading-loose text-ink/75 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-extrabold [&_h2]:text-deep [&_h3]:mt-6 [&_h3]:font-bold [&_h3]:text-deep [&_img]:my-6 [&_img]:rounded-2xl [&_a]:text-pine [&_a]:underline"
            dangerouslySetInnerHTML={{ __html: post.content?.rendered ?? "" }}
          />

          <div className="mt-12 border-t border-line pt-6">
            <Link href="/news" className="inline-flex items-center gap-2 text-[13px] font-bold text-pine hover:underline">
              <ArrowRight size={14} />
              جميع الأخبار
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
