import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { TopBar } from "@/components/navigation/TopBar";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/footer/Footer";
import { getWooCategories } from "@/lib/woocommerce";
import { getSiteContact } from "@/lib/site";

const plex = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-plex-arabic",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "أليكس للمستلزمات الزراعية | حلول زراعية، بذور، شتلات، تهجين وتطوير وراثي",
    template: "%s | أليكس للمستلزمات الزراعية",
  },
  description:
    "شركة أليكس للمستلزمات الزراعية وعموم الاستيراد والتصدير — بذور وهجن نباتية، مشاتل عصفور، بيتموس، أسمدة ومغذيات ومبيدات، بحث علمي وتهجين وتطوير وراثي، ودعم فني في جميع محافظات مصر.",
  keywords: ["بذور", "شتلات", "مشاتل عصفور", "أليكس للمستلزمات الزراعية", "بيتموس", "تهجين", "بذور خضروات"],
  alternates: { canonical: "/", languages: { "ar-EG": "/" } },
  openGraph: {
    type: "website",
    locale: "ar_EG",
    siteName: "أليكس للمستلزمات الزراعية",
    title: "أليكس للمستلزمات الزراعية | من البذرة إلى الحصاد",
    description:
      "نصنع مستقبل الزراعة من البذرة إلى الحصاد — بذور، شتلات، مستلزمات زراعية، وتهجين وتطوير وراثي من نخبة الخبراء.",
    images: ["/Alex.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#174B38",
};

// أيقونة الموقع من شعار الشركة الفعلي
export const icons = {
  icon: [{ url: "/Alex.png", type: "image/png" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [categories, contact] = await Promise.all([getWooCategories(), getSiteContact()]);

  return (
    <html lang="ar" dir="rtl" className={plex.variable}>
      <body className="antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:m-3 focus:rounded-lg focus:bg-pine focus:px-4 focus:py-2 focus:text-white">
          تخطَّ إلى المحتوى
        </a>
        <header className="sticky top-0 z-50">
          <TopBar contact={contact} />
          <Navbar categories={categories} contact={contact} />
        </header>
        <main id="main">{children}</main>
        <Footer categories={categories} contact={contact} />
      </body>
    </html>
  );
}
