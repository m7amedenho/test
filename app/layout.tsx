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
    default: "أليكس عصفور | حلول زراعية، بذور، شتلات، تهجين وتطوير وراثي",
    template: "%s | أليكس عصفور",
  },
  description:
    "شركة أليكس عصفور للمستلزمات الزراعية وعموم الاستيراد والتصدير — بذور وهجن نباتية، مشاتل عصفور، بيتموس، أسمدة ومغذيات ومبيدات، بحث علمي وتهجين وتطوير وراثي، ودعم فني في جميع محافظات مصر.",
  keywords: ["بذور", "شتلات", "مقاتل عصفور", "مشاتل عصفور", "أليكس عصفور", "بيتموس", "تهجين", "بذور خضروات"],
  alternates: { canonical: "/", languages: { "ar-EG": "/" } },
  openGraph: {
    type: "website",
    locale: "ar_EG",
    siteName: "أليكس عصفور",
    title: "أليكس عصفور | من البذرة إلى الحصاد",
    description:
      "نصنع مستقبل الزراعة من البذرة إلى الحصاد — بذور، شتلات، مستلزمات زراعية، وتهجين وتطوير وراثي من نخبة الخبراء.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#174B38",
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
