import type { Metadata } from "next";
import Link from "next/link";
import { Phone, MapPin, MessageCircle, Clock } from "lucide-react";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "@/components/ui/SocialIcons";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { MeshBackground } from "@/components/botanical/MeshBackground";
import { SeedSphere } from "@/components/botanical/SeedSphere";
import { getSiteContact, getSiteContact as _g } from "@/lib/site";

export const metadata: Metadata = {
  title: "تواصل معنا",
  description:
    "تواصل مع فريق أليكس عصفور — مكالمات مباشرة وتغطية ميدانية عبر محافظات مصر، نرد على استفساراتك طوال العام.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const contact = await getSiteContact();
  void _g;

  return (
    <>
      <PageHero
        eyebrow="تواصل معنا"
        title="يسعدنا تلقي استفساراتك"
        sub="فريق العمل والمهندسين الزراعيين جاهزون للرد على مكالماتكم وعلى الزيارات الميدانية طوال العام."
      />

      <section className="relative overflow-hidden bg-warm py-20">
        <MeshBackground variant="science" className="opacity-60" />
        <div className="container-site relative z-10 grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <div id="experts" className="grid gap-4 sm:grid-cols-2">
              <a
                href={`tel:${contact.phone}`}
                className="group rounded-[1.8rem] border border-line/70 bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl"
              >
                <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-pine text-lime">
                  <Phone size={20} />
                </span>
                <h2 className="text-[15px] font-extrabold text-deep">اتصل بنا مباشرة</h2>
                <p dir="ltr" className="mt-1 text-[16px] font-bold text-pine" >
                  {contact.phoneDisplay}
                </p>
                <p className="mt-2 text-[12px] text-ink/50">متاح طوال اليوم للرد على المكالمات</p>
              </a>

              <a
                href={`https://wa.me/${contact.phone.replace("+", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-[1.8rem] border border-line/70 bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl"
              >
                <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-fresh/20 text-pine">
                  <MessageCircle size={20} />
                </span>
                <h2 className="text-[15px] font-extrabold text-deep">واتساب الأعمال</h2>
                <p className="mt-1 text-[14px] font-bold text-pine">مراسلة فورية</p>
                <p className="mt-2 text-[12px] text-ink/50">بالصور وملفات الطلب — نرد بسرعة</p>
              </a>

              <Link
                href="/branches"
                className="group rounded-[1.8rem] border border-line/70 bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl"
              >
                <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sage text-pine">
                  <MapPin size={20} />
                </span>
                <h2 className="text-[15px] font-extrabold text-deep">الفروع ورقّمها</h2>
                <p className="mt-1 text-[14px] font-bold text-pine">خريطة المناطق الميدانية</p>
                <p className="mt-2 text-[12px] text-ink/50">فروع ومديرو مبيعات في محافظات مصر</p>
              </Link>

              <div className="rounded-[1.8rem] border border-line/70 bg-mist/70 p-7">
                <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-pine ring-1 ring-line">
                  <Clock size={20} />
                </span>
                <h2 className="text-[15px] font-extrabold text-deep">زيارات حقلية</h2>
                <p className="mt-1 text-[13px] leading-relaxed text-ink/60">
                  طلب زيارة ميدانية من مهندس زراعي للمعاينة والتوجيه داخل حقلك.
                </p>
                <Link href="/services" className="mt-3 inline-block text-[12.5px] font-bold text-pine hover:underline">
                  خدمات الزيارات ←
                </Link>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <span className="text-[12.5px] font-bold text-ink/50">تابعنا:</span>
              <a href={contact.socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="فيسبوك" className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-pine transition hover:border-fresh hover:bg-sage">
                <FacebookIcon size={17} />
              </a>
              <a href={contact.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="إنستجرام" className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-pine transition hover:border-fresh hover:bg-sage">
                <InstagramIcon size={17} />
              </a>
              <a href={contact.socials.youtube} target="_blank" rel="noopener noreferrer" aria-label="يوتيوب" className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-pine transition hover:border-fresh hover:bg-sage">
                <YoutubeIcon size={17} />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="relative hidden lg:block">
            <SeedSphere className="mx-auto w-80" />
            <div className="mx-auto -mt-10 max-w-xs rounded-[1.6rem] card-glass p-6 text-center">
              <p className="text-[13.5px] font-extrabold text-deep">شعارنا</p>
              <p className="mt-1 text-lg font-black text-pine">«من أجل مستقبل أفضل»</p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
