// معلومات الموقع العامة — تُستخرج ديناميكيًا من WordPress مع قيم واقعية معروفة كبديل
import { cacheLife, cacheTag } from "next/cache";
import { getWpPage, stripHtml } from "./wordpress";
import { type SiteContact } from "./productLines";

export type { SiteContact, ProductLine } from "./productLines";
export { PRODUCT_LINES } from "./productLines";

// بيانات مستخرجة من الموقع الحقيقي (كبديل عند تعذر القراءة أثناء البناء)
const FALLBACK: SiteContact = {
  phone: "+201001536561",
  phoneDisplay: "01001536561",
  email: null,
  socials: {
    facebook: "https://www.facebook.com/AlexForAgricultureTools/",
    instagram: "https://www.instagram.com/alexseeds_asfor/",
    youtube: "https://www.youtube.com/channel/UClKWGZj3aiGwoa6rEFEqw0A",
  },
};

export async function getSiteContact(): Promise<SiteContact> {
  "use cache";
  cacheLife("hours");
  cacheTag("wp-pages");
  try {
    const page = await getWpPage("contact");
    const text = stripHtml(page?.content?.rendered ?? "");
    // نستهدف صيغة المحمول المصري كاملة (11 خانة تبدأ 01...) حتى لا يلتهم الرمز جزءًا من الرقم
    const firstPhone = /\b01[0125]\d{8}\b/.exec(text)?.[0];
    if (firstPhone) {
      return { ...FALLBACK, phone: `+20${firstPhone.slice(1)}`, phoneDisplay: firstPhone };
    }
    return FALLBACK;
  } catch {
    return FALLBACK;
  }
}
