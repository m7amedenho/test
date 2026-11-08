// الفروع ومديرو المبيعات — تُستخرج من صفحة "اتصل بنا" في WordPress وتُحرر إلى بنية منظمة
import { cacheLife, cacheTag } from "next/cache";
import { getWpPage } from "./wordpress";

export interface CompanyBranch {
  id: string;
  label: string; // اسم المنطقة / الفرع كما ورد في WordPress
  phones: string[];
  type: "branch" | "sales-manager";
  person?: string; // اسم المسؤول إن وُجد
  coords: { lat: number; lng: number } | null;
  approx: boolean; // الإحداثيات تقريبية (مركز مدينة) وليست إحداثيات مدققة ميدانيًا
}

/** مطابقة المنطقة بمركز مدينة حقيقي — تُعلَّم كـ"تقريبية" لأنها ليست إحداثيات مدققة */
const CITY_COORDS: { keys: string[]; lat: number; lng: number }[] = [
  { keys: ["برج العرب"], lat: 30.9182, lng: 29.6164 },
  { keys: ["العامرية", "الاميريه", "الاميرية"], lat: 31.0168, lng: 29.5937 },
  { keys: ["البنجر"], lat: 30.5165, lng: 30.231 },
  { keys: ["كفرالدوار", "الدلنجات", "البستان"], lat: 31.1317, lng: 29.84 },
  { keys: ["العياط"], lat: 29.715, lng: 30.878 },
  { keys: ["الفيوم", "سنورس"], lat: 29.308, lng: 30.8415 },
  { keys: ["بنى سويف", "بني سويف"], lat: 29.0661, lng: 31.0994 },
  { keys: ["اسيوط", "أسيوط"], lat: 27.181, lng: 31.1837 },
  { keys: ["جنوب المنيا", "المنيا", "المنيه"], lat: 28.1099, lng: 30.7503 },
  { keys: ["جرجا"], lat: 26.3394, lng: 32.6514 },
  { keys: ["قنا"], lat: 26.162, lng: 32.716 },
  { keys: ["بلطيم", "بلطي"], lat: 31.5569, lng: 30.9453 },
  { keys: ["المنصورة", "المنصوره"], lat: 31.0365, lng: 31.3781 },
  { keys: ["دمياط"], lat: 31.4165, lng: 31.8133 },
  { keys: ["الإسماعيلية", "الاسماعيلية"], lat: 30.5852, lng: 32.2654 },
  { keys: ["الأقصر", "الاقصر"], lat: 25.6872, lng: 32.6396 },
  { keys: ["أسوان", "اسوان"], lat: 24.0889, lng: 32.8998 },
  { keys: ["النوبارية", "النوباريه"], lat: 30.8863, lng: 29.5788 },
  { keys: ["البحيرة", "البحيره"], lat: 31.0341, lng: 30.4732 },
];

function coordsFor(label: string): { lat: number; lng: number } | null {
  for (const c of CITY_COORDS) {
    if (c.keys.some((k) => label.includes(k))) return { lat: c.lat, lng: c.lng };
  }
  return null;
}

function extractPerson(label: string): { person?: string; rest: string } {
  const m = label.match(/(م|د)\/\s*([^0-9]+?)\s*$/);
  if (!m) return { rest: label };
  return { person: `${m[1]}/${m[2].trim()}`, rest: label.slice(0, m.index).trim() };
}

/** هل السطر رقم هاتف فقط (أرقام وفواصل، 8 خانات على الأقل) */
function isPhoneLine(line: string): boolean {
  const digits = line.replace(/[^0-9]/g, "");
  return digits.length >= 8 && /^[0-9\s+\-()]+$/.test(line);
}

/** تحليل نص الاتصال إلى سجل منظم (label + أرقام) ثم إسقاطه على إحداثيات المدينة */
export async function getBranches(): Promise<CompanyBranch[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("wp-pages");

  const page = await getWpPage("contact");
  const html = page?.content?.rendered ?? "";
  // نحافظ على فواصل الأسطر الحقيقية من WP بدل اسقاطها في نص واحد
  const lines = html
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]*>/g, "\n")
    .replace(/&nbsp;/g, " ")
    .replace(/&#8236;|&#8206;|&#8207;|&lrm;|&rlm;/g, "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  // نبدأ من أول سطر يذكر الاسكندرية حتى لا يتسرب نموذج الاتصال إلى البيانات
  const anchor = lines.findIndex((l) => /اسكندرية|إسكندرية/.test(l));
  if (anchor === -1) return [];

  const out: CompanyBranch[] = [];
  let headerLines: string[] = [];
  let phones: string[] = [];

  const pushCurrent = () => {
    if (headerLines.length === 0 || phones.length === 0) return;
    const header = headerLines.join(" ").trim();
    const isManager = /م\/|د\//.test(header);
    const { person, rest } = extractPerson(header.split(/مدير مبيعات/).pop()!.trim());
    const label = rest || header
      .replace(/مدير مبيعات/g, " ")
      .replace(/م\/|د\//g, " ")
      .replace(/\s+/g, " ")
      .trim();
    const coords = coordsFor(label);
    const personFinal = isManager ? person : undefined;

    if (!coords) {
      // عنصر بلا إحداثيات معروفة — نعرضه فقط إن هو تابع لإدخال سابق (مدير مبيعات لنفس المنطقة)
      const prev = out[out.length - 1];
      if (prev) {
        prev.person ??= personFinal;
        prev.type = personFinal ? "sales-manager" : prev.type;
        prev.phones = [...new Set([...prev.phones, ...phones])];
      }
      headerLines = [];
      phones = [];
      return;
    }

    // لو نفس المنطقة/الشخص سبق إدراجها ندمج الأرقام فقط
    const existing = out.find((b) => b.label === label);
    if (existing) {
      existing.phones = [...new Set([...existing.phones, ...phones])];
      existing.person ??= personFinal;
    } else {
      out.push({
        id: `br-${out.length}`,
        label,
        phones: [...new Set(phones)],
        type: personFinal ? "sales-manager" : /مدير مبيعات/.test(header) ? "sales-manager" : "branch",
        person: personFinal,
        coords,
        approx: true,
      });
    }
    headerLines = [];
    phones = [];
  };

  for (const line of lines.slice(anchor)) {
    if (line === "تابعنا" || /^Instagram$|^Facebook$|^Youtube$|^Follow(ing)?$/i.test(line)) break;
    if (isPhoneLine(line)) {
      const digits = line.replace(/[^0-9]/g, "");
      phones.push(digits);
      continue;
    }
    if (phones.length > 0) {
      // بدأ عنوان جديد بعد الأرقام — نغلق الإدخال الحالي ونفتح التالي
      pushCurrent();
      headerLines = [line];
    } else {
      headerLines.push(line);
    }
  }
  pushCurrent();

  return out;
}
