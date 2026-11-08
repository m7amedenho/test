// صور الشركة الحقيقية — كل الروابط من مكتبة الوسائط الفعلية لـ alexasfor.com
const MEDIA_BASE = "https://alexasfor.com/wp-content/uploads";

export interface PickedImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

/** صور تحريرية عامة للصفحة الرئيسية؛ صور المحاصيل والمنتجات تأتي من WooCommerce. */
export const LANDING_IMAGES: Record<"field" | "greenhouse" | "seedlings" | "grain" | "corn" | "rye", PickedImage> = {
  field: { src: "/landing/field-rows.jpg", alt: "صفوف محاصيل خضراء في حقل زراعي", width: 1920, height: 1440 },
  greenhouse: { src: "/landing/greenhouse.jpg", alt: "شتلات تنمو داخل صوبة زراعية", width: 1484, height: 2227 },
  seedlings: { src: "/landing/seedlings.jpg", alt: "صفوف شتلات مزروعة في التربة", width: 1920, height: 1440 },
  grain: { src: "/landing/green-grain.jpg", alt: "حقل حبوب أخضر", width: 1280, height: 852 },
  corn: { src: "/landing/corn-field.jpg", alt: "حقل ذرة أخضر", width: 1920, height: 1280 },
  rye: { src: "/landing/rye-field.jpg", alt: "سنابل حبوب خضراء في الحقل", width: 1920, height: 1280 },
};

/** صورة الشعار الحالية — أصل ثابت من الـ /public للاستخدام بجانب بيانات التواصل عند الحاجة */
export function wpLogoUrl(): string {
  return `${MEDIA_BASE}/2023/04/لوجو-scaled.jpg`;
}

/** صور معمارية الـ Hero والصفحات — كلها من وسائط الشركة الحقيقية */
export const PICKS: Record<
  "heroField" | "trialField" | "seedlings" | "nursery" | "research" | "researchLab" | "peat" | "cover",
  PickedImage
> = {
  heroField: { src: `${MEDIA_BASE}/2026/01/IMG20240707092211-scaled.jpg`, alt: "حقل تجارب حقيقي من تصوير فريق أليكس للمستلزمات الزراعية", width: 1280, height: 960 },
  trialField: { src: `${MEDIA_BASE}/2026/01/IMG20230724123716-scaled.jpg`, alt: "تجربة حقلية على أحد الأصناف الهجينة", width: 876, height: 1168 },
  seedlings: { src: `${MEDIA_BASE}/2023/04/IMG_1836-1024x683.jpg`, alt: "شتلات هجينة داخل مشاتل عصفور", width: 1024, height: 683 },
  nursery: { src: `${MEDIA_BASE}/2023/04/IMG_1862-1024x683.jpg`, alt: "بيوت محمية وتجارب في مشاتل عصفور", width: 1024, height: 683 },
  research: { src: `${MEDIA_BASE}/2026/01/IMG20230730165417-scaled.jpg`, alt: "متابعة الحقل ومنظومة التجارب", width: 1280, height: 960 },
  researchLab: { src: `${MEDIA_BASE}/2023/04/IMG_1834-1024x683.jpg`, alt: "جهاز التشغيل والفحص في المشاتل", width: 1024, height: 683 },
  peat: { src: `${MEDIA_BASE}/2023/04/AP0yFxgYUylXRJE1eXvMfr3JY9MfDbJqFtAW2Emv.jpg`, alt: "بيتموس هندي عالي الجودة — أحدي منتجات الشركة", width: 1280, height: 960 },
  cover: { src: `${MEDIA_BASE}/2023/03/cover-1.png`, alt: "غلاف من متجر أليكس للمستلزمات الزراعية", width: 1280, height: 640 },
};
