import Link from "next/link";
import { Phone, MapPin, Globe } from "lucide-react";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "@/components/ui/SocialIcons";
import type { SiteContact } from "@/lib/productLines";

export function TopBar({ contact }: { contact: SiteContact }) {
  return (
    <div className="bg-warm/90 backdrop-blur border-b border-line text-[13px] text-ink/70">
      <div className="container-site flex h-9 items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <a
            href={`tel:${contact.phone}`}
            className="flex items-center gap-1.5 transition-colors hover:text-pine"
            aria-label="اتصل بنا هاتفيًا"
          >
            <Phone size={13} strokeWidth={2.2} />
            <span dir="ltr" className="font-medium tracking-wide">
              {contact.phoneDisplay}
            </span>
          </a>
          <span className="hidden h-3.5 w-px bg-line sm:block" aria-hidden />
          <Link
            href="/branches"
            className="hidden items-center gap-1.5 transition-colors hover:text-pine sm:flex"
          >
            <MapPin size={13} strokeWidth={2.2} />
            الفروع والمواقع
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <a href={contact.socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="فيسبوك" className="opacity-70 transition hover:opacity-100 hover:text-pine">
            <FacebookIcon size={14} />
          </a>
          <a href={contact.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="إنستجرام" className="opacity-70 transition hover:opacity-100 hover:text-pine">
            <InstagramIcon size={14} />
          </a>
          <a href={contact.socials.youtube} target="_blank" rel="noopener noreferrer" aria-label="يوتيوب" className="opacity-70 transition hover:opacity-100 hover:text-pine">
            <YoutubeIcon size={14} />
          </a>
          <span className="h-3.5 w-px bg-line" aria-hidden />
          <button
            type="button"
            title="النسخة الإنجليزية — قريبًا"
            className="flex cursor-default items-center gap-1.5 rounded-full border border-line px-2.5 py-0.5 text-[12px] text-ink/50"
          >
            <Globe size={12} />
            العربية
          </button>
        </div>
      </div>
    </div>
  );
}
