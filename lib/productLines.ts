// ثوابت لخطوط الإنتاج — ملف محايد يمكن استيراده من مكونات العميل
export interface ProductLine {
  slug: string;
  title: string;
  wpSlug: string;
  href: string;
  icon: "sprout" | "leaf" | "package" | "flask" | "shield" | "waves";
}

export interface SiteContact {
  phone: string;
  phoneDisplay: string;
  email: string | null;
  socials: { facebook: string; instagram: string; youtube: string };
}

export const PRODUCT_LINES: ProductLine[] = [
  { slug: "seeds", title: "البذور", wpSlug: "البذور", href: "/seeds", icon: "sprout" },
  { slug: "seedlings", title: "الشتلات", wpSlug: "ألشتلات", href: "/seedlings", icon: "leaf" },
  { slug: "peat-moss", title: "البيتموس", wpSlug: "البيتموس", href: "/peat-moss", icon: "package" },
  { slug: "fertilizers", title: "الأسمدة", wpSlug: "اسمدة", href: "/fertilizers", icon: "flask" },
  { slug: "pesticides", title: "المبيدات", wpSlug: "مبيدات", href: "/pesticides", icon: "shield" },
  { slug: "nutrients", title: "المغذيات", wpSlug: "مغذيات", href: "/nutrients", icon: "waves" },
];
