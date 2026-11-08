/** مناطق التغطية كما حددها فريق أليكس. لا تعني وجود فرع في هذه المواقع. */
export interface SalesRepresentative {
  id: string;
  name: string;
  title: string;
  places: string[];
  governorates: string[];
}

export const AREA_DIRECTORS = ["م/ عماد خميس", "م/ أحمد زهرة"];

export const SALES_REPRESENTATIVES: SalesRepresentative[] = [
  {
    id: "karim-helaly", name: "كريم الهلالي", title: "م/",
    places: ["الأقصر", "إسنا", "أسوان"],
    governorates: ["Luxor Governate", "Aswan Governorate"],
  },
  {
    id: "gamal-helaly", name: "جمال الهلالي", title: "م/",
    places: ["جرجا", "أم دومة", "قنا", "العسيرات", "طهطا", "طما", "المراشدة"],
    governorates: ["Sohag Governorate", "Qena Governorate"],
  },
  {
    id: "ahmed-sameh", name: "أحمد سامح", title: "د/",
    places: ["دير مواس", "ملوي", "منفلوط", "بني عدي", "التتالية", "أسيوط الزراعي", "أبو تيج", "القوصية", "ديروط"],
    governorates: ["Minya Governate", "Asyut Governorate"],
  },
  {
    id: "hany", name: "هاني", title: "م/",
    places: ["أبو قرقاص", "المنيا", "سمالوط", "مطاي", "بني مزار", "مغاغة", "العدوة", "سمسطا", "الفشن"],
    governorates: ["Minya Governate", "Beni Suef Governorate"],
  },
  {
    id: "ahmed-abdelzaher", name: "أحمد عبد الظاهر", title: "م/",
    places: ["العياط", "بني سويف", "الواسطى", "إهناسيا", "الفيوم"],
    governorates: ["Giza Governorate", "Beni Suef Governorate", "Faiyum Governorate"],
  },
  {
    id: "rashad-saeed", name: "رشاد سعيد", title: "م/",
    places: ["بلطيم", "رشيد", "النهضة", "العشرة آلاف", "مدخل الـ71", "أبيس", "كفر الدوار", "المنصورة", "البنجر", "العامرية"],
    governorates: ["Kafr el-Sheikh Governorate", "Beheira Governorate", "Dakahlia Governorate", "Alexandria Governorate"],
  },
  {
    id: "ahmed-salouma", name: "أحمد سلومة", title: "م/",
    places: ["الخطاطبة", "مركز بدر", "الصحراوي", "النوبارية", "أبو العطا", "أبو غالب", "البستان", "أبو المطامير", "حوش عيسى", "الرست", "الوادي", "الإقليمي"],
    governorates: ["Monufia Governorate", "Beheira Governorate", "Giza Governorate"],
  },
  {
    id: "mohamed-abdellatif", name: "محمد عبد اللطيف", title: "م/",
    places: ["دمياط", "المنايف", "الإسماعيلية", "الصالحية", "بورسعيد", "السويس", "أبو شلبي", "الدواويس"],
    governorates: ["Damietta Governorate", "Ismailia Governorate", "Al Sharqia Governorate", "Port Said Governorate", "Suez Governorate"],
  },
  {
    id: "mohamed-melige", name: "محمد المليجي", title: "م/",
    places: ["بلطيم", "المنصورة", "الساحل", "دمياط", "الدلنجات", "كفر الشيخ", "المحلة", "المنوفية"],
    governorates: ["Kafr el-Sheikh Governorate", "Dakahlia Governorate", "Damietta Governorate", "Beheira Governorate", "Gharbiyya Governorate", "Monufia Governorate"],
  },
];
