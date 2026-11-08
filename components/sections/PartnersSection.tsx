import Image from "next/image";
import { Handshake } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

/**
 * شركاء النجاح — لوجوهات مستمدة من قاروس «شركاء النجاح» في الموقع الرسمي
 * والمحمّلة كملفات ثابتة في public/partners/ (من وسائط الشركة الفعلية).
 */
const PARTNERS: { src: string; label: string }[] = [
  { src: "/partners/partner-1.png", label: "شريك النجاح 1" },
  { src: "/partners/partner-2.png", label: "شريك النجاح 2" },
  { src: "/partners/partner-3.png", label: "شريك النجاح 3" },
  { src: "/partners/partner-4.png", label: "شريك النجاح 4" },
  { src: "/partners/partner-5.png", label: "شريك النجاح 5" },
  { src: "/partners/partner-6.png", label: "شريك النجاح 6" },
  { src: "/partners/partner-7.png", label: "شريك النجاح 7" },
  { src: "/partners/partner-8.png", label: "شريك النجاح 8" },
  { src: "/partners/partner-9.png", label: "شريك النجاح 9" },
  { src: "/partners/partner-10.png", label: "شريك النجاح 10" },
];

export function PartnersSection() {
  return (
    <section className="relative overflow-hidden bg-mist py-20">
      <div className="container-site">
        <Reveal>
          <div className="flex flex-col items-center gap-6 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-pine shadow-lg ring-1 ring-line">
              <Handshake size={20} />
            </span>
            <h2 className="heading-display text-2xl text-deep md:text-3xl">شركاء النجاح — شركات وعلامات نثق بها</h2>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {PARTNERS.map((p) => (
                <div
                  key={p.src}
                  className="group flex h-24 items-center justify-center rounded-2xl bg-white p-4 ring-1 ring-line transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <Image
                    src={p.src}
                    alt={p.label}
                    width={160}
                    height={80}
                    className="max-h-14 w-auto max-w-full object-contain opacity-85 grayscale transition duration-500 group-hover:grayscale-0"
                  />
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
