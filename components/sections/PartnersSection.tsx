import Image from "next/image";
import { Handshake } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { getWooBrands } from "@/lib/woocommerce";

/** القسم 10 — شراكات وعلامات حقيقية فقط (تُدار من WooCommerce Brands) */
export async function PartnersSection() {
  const brands = await getWooBrands();
  const withLogos = brands.filter((b) => b.image?.src);

  return (
    <section className="relative overflow-hidden bg-mist py-20">
      <div className="container-site">
        <Reveal>
          <div className="flex flex-col items-center gap-6 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-pine shadow-lg ring-1 ring-line">
              <Handshake size={20} />
            </span>
            <h2 className="heading-display text-2xl text-deep md:text-3xl">شراكات وعلامات عالمية نثق بها</h2>
            {withLogos.length > 0 ? (
              <div className="mt-4 grid grid-cols-2 gap-5 sm:grid-cols-4 lg:grid-cols-6">
                {withLogos.map((b) => (
                  <div key={b.id} className="flex h-20 items-center justify-center rounded-2xl bg-white p-4 ring-1 ring-line transition hover:shadow-xl">
                    <Image src={b.image!.src} alt={b.name} width={120} height={60} className="max-h-10 w-auto object-contain opacity-80 grayscale transition hover:grayscale-0" />
                  </div>
                ))}
              </div>
            ) : (
              <p className="max-w-xl text-[13.5px] leading-relaxed text-ink/50">
                تعمل أليكس عصفور بمروضات ومشاركات دولية مع شركات عالمية متعددة الجنسيات في مجال الخدمات الزراعية —
                ستُعرض شعارات العلامات هنا تلقائيًا فور إضافتها من لوحة التحكم.
              </p>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
