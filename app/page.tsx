import { Hero } from "@/components/hero/Hero";
import { HomeSections } from "@/components/sections/HomeSections";
import { CropsSection } from "@/components/sections/CropsSection";
import { getSiteContact } from "@/lib/site";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default async function Home() {
  const contact = await getSiteContact();

  // بيانات هيكلية ثابتة على حقائق موثقة فقط — لا ادعاءات مُختلَقة
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "أليكس للمستلزمات الزراعية",
    alternateName: "Alex For Agricultural Supplies",
    url: SITE_URL,
    logo: `${SITE_URL}/Alex.png`,
    telephone: contact.phone,
    sameAs: [
      contact.socials.facebook,
      contact.socials.instagram,
      contact.socials.youtube,
    ].filter(Boolean),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <CropsSection />
      <HomeSections />
    </>
  );
}
