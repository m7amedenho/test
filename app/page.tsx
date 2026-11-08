import { Hero } from "@/components/hero/Hero";
import { HomeSections } from "@/components/sections/HomeSections";
import { getSiteContact } from "@/lib/site";
import { logoUrl } from "@/lib/media";

export default async function Home() {
  const contact = await getSiteContact();

  // بيانات هيكلية ثابتة على حقائق موثقة فقط — لا ادعاءات مُختلَقة
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "شركة أليكس عصفور للمستلزمات الزراعية",
    alternateName: "Alex Asfor Agricultural Solutions",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
    logo: logoUrl(),
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
      <Hero contact={contact} />
      <HomeSections />
    </>
  );
}
