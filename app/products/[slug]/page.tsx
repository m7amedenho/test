import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, PhoneCall, Tag, Layers } from "lucide-react";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductBody, parseDashSections } from "@/components/products/ProductBody";
import { ProductCard } from "@/components/products/ProductCard";
import { CropCircles } from "@/components/products/CropCircles";
import { GridSkeleton } from "@/components/ui/GridSkeleton";
import { MeshBackground } from "@/components/botanical/MeshBackground";
import { getWooProduct, getWooProducts, getWooCategories } from "@/lib/woocommerce";
import { plainWpText } from "@/lib/content";
import { getSiteContact } from "@/lib/site";

/** معلمات البناء الثابتة — في فشل الجلب نُسقط مسارًا آمنًا بدل قائمة فارغة */
export async function generateStaticParams() {
  const products = await getWooProducts();
  return products.length
    ? products.map((p) => ({ slug: decodeURIComponent(p.slug) }))
    : [{ slug: "__none__" }];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getWooProduct(slug);
  if (!product) return { title: "صنف غير موجود" };
  const cleanIntro = parseDashSections(product.short_description ?? "").intro ||
    plainWpText(product.short_description ?? "");
  return {
    title: product.name,
    description: cleanIntro.replace(/\s+/g, " ").trim().slice(0, 160) || product.name,
    alternates: { canonical: `/products/${slug}` },
    openGraph: {
      title: product.name,
      images: product.images[0]?.src ? [{ url: product.images[0].src }] : undefined,
    },
  };
}

/** الغلاف: انتظار بيانات المنتج داخل Suspense حتى لا يعطّل فشل الرسل الغلاف الثابت */
export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<GridSkeleton label="جارٍ تحميل الصنف…" />}>
      <ProductDetail params={params} />
    </Suspense>
  );
}

async function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [product, contact, categories] = await Promise.all([getWooProduct(slug), getSiteContact(), getWooCategories()]);
  if (!product) notFound();

  const cat = product.categories?.[0];
  const related = await getWooProducts();
  const relatedItems = related
    .filter((p) => p.id !== product.id && p.categories?.some((c) => c.id === cat?.id))
    .slice(0, 4);

  const attributes = product.attributes ?? [];

  // الوصف المختصر إن كان بصيغة «– النبات:- ...» نستخرج منه فقرة تعريفية نظيفة
  const shortParsed = parseDashSections(product.short_description ?? "");
  const hasDashIntro = shortParsed.sections.length > 0;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    category: cat?.name,
    image: product.images.map((i) => i.src),
    description: shortParsed.intro || product.name,
    brand: { "@type": "Brand", name: "Alex For Agricultural Supplies" },
    ...(product.price ? { offers: { "@type": "Offer", price: product.price, priceCurrency: "EGP", availability: "https://schema.org/InStock" } } : {}),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative overflow-hidden bg-mist pt-10">
        <MeshBackground variant="soft" />
        <div className="container-site relative z-10">
          <nav aria-label="مسار التنقل" className="mb-6 text-[12px] text-ink/45">
            <Link href="/" className="hover:text-pine">الرئيسية</Link>
            <span className="mx-2">/</span>
            <Link href="/products" className="hover:text-pine">المنتجات</Link>
            {cat && (
              <>
                <span className="mx-2">/</span>
                <Link href={`/categories/${decodeURIComponent(cat.slug)}`} className="hover:text-pine">{cat.name}</Link>
              </>
            )}
          </nav>

          <div className="grid gap-10 pb-16 lg:grid-cols-2 lg:gap-14">
            <ProductGallery images={product.images} name={product.name} />

            <div className="rounded-2xl border border-line bg-white p-5 sm:p-8">
              {cat && (
                <Link href={`/categories/${decodeURIComponent(cat.slug)}`} className="mb-4 inline-flex items-center gap-2 rounded-full bg-sage px-4 py-1.5 text-[12px] font-bold text-pine">
                  <Tag size={12} />
                  {cat.name}
                </Link>
              )}
              <h1 className="heading-display text-3xl leading-snug text-deep md:text-4xl">{product.name}</h1>

              {shortParsed.intro && !hasDashIntro && (
                <p className="mt-4 text-[14.5px] leading-loose text-ink/65">
                  {shortParsed.intro}
                </p>
              )}

              <div className="mt-6 rounded-2xl border border-line bg-white p-5">
                {product.price ? (
                  <p className="text-2xl font-extrabold text-pine">
                    {product.price} <span className="text-sm font-semibold text-ink/50">جنيه مصري</span>
                  </p>
                ) : (
                  <p className="flex items-center gap-2 text-[14px] font-bold text-deep">
                    <Layers size={16} className="text-fresh" />
                    السعر على بناء الحجم والكمية — تواصل مع فريقنا لتسعير طلبك
                  </p>
                )}
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link href="/contact" className="group inline-flex items-center gap-2 rounded-full bg-pine px-6 py-3 text-[13.5px] font-bold text-white transition hover:bg-deep">
                    اطلب هذا الصنف
                    <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
                  </Link>
                  <a
                    href={`tel:${contact.phone}`}
                    className="inline-flex items-center gap-2 rounded-full border border-pine/25 bg-warm px-6 py-3 text-[13.5px] font-bold text-pine transition hover:border-fresh"
                  >
                    <PhoneCall size={14} />
                    <span dir="ltr">{contact.phoneDisplay}</span>
                  </a>
                </div>
              </div>

              {attributes.length > 0 && (
                <div className="mt-7">
                  <h2 className="mb-3 text-[15px] font-extrabold text-deep">مواصفات الصنف</h2>
                  <dl className="overflow-hidden rounded-2xl border border-line">
                    {attributes.map((a) => (
                      <div key={a.id} className="flex items-start justify-between gap-4 border-b border-line bg-white px-5 py-3.5 last:border-0 odd:bg-mist/40">
                        <dt className="text-[12.5px] font-bold text-ink/55">{a.name}</dt>
                        <dd className="text-[13px] font-semibold text-deep">{a.options?.join(" · ")}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
            </div>
          </div>

          {/* الوصف — منظف ومنظم دائماً */}
          {(product.description || hasDashIntro || shortParsed.intro) && (
            <div className="mx-auto max-w-4xl pb-16">
              <h2 className="heading-display mb-5 border-r-4 border-fresh pr-4 text-xl text-deep">عن الصنف</h2>
              <div className="rounded-2xl border border-line bg-white p-6 sm:p-8">
              {hasDashIntro ? (
                <ProductBody html={product.short_description ?? ""} />
              ) : (
                <ProductBody html={product.description ?? ""} />
              )}
              </div>
            </div>
          )}
        </div>
      </section>

      {relatedItems.length > 0 && (
        <section className="bg-mist py-20">
          <div className="container-site">
            <div className="mb-8 flex items-end justify-between">
              <h2 className="heading-display text-2xl text-deep md:text-3xl">أصناف ذات صلة</h2>
              <Link href="/products" className="inline-flex items-center gap-2 text-[13px] font-bold text-pine hover:underline">
                كل المنتجات
                <ArrowLeft size={14} />
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {relatedItems.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-line bg-white py-16 sm:py-20" aria-labelledby="product-crops-title">
        <div className="container-site">
          <p className="mb-2 text-sm font-bold text-pine">تصفح حسب المحصول</p>
          <h2 id="product-crops-title" className="heading-display mb-9 text-2xl text-deep sm:text-3xl">باقي المحاصيل وأصناف البذور</h2>
          <CropCircles categories={categories} excludeId={cat?.id} layout="grid" />
        </div>
      </section>

    </>
  );
}
