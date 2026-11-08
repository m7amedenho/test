import type { WooCategory } from "@/types/wp";

export function getCropCategories(categories: WooCategory[]) {
  const order = [
    /طماطم.*ارض/, /طماطم.*سلك/, /خيار.*ارض/, /خيار.*سلك/,
    /كوس/, /كنتالوب/, /باذنجان/, /شط/, /فلفل/,
  ];
  const normalize = (name: string) => name.normalize("NFKD").replace(/[\u064B-\u065F\u0670]/g, "").replace(/[أإآ]/g, "ا").replace(/ى/g, "ي").replace(/ة/g, "ه");
  const rank = (name: string) => {
    const index = order.findIndex((pattern) => pattern.test(normalize(name)));
    return index < 0 ? order.length : index;
  };
  return categories
    .filter((category) => category.parent === 0 && category.count > 0 && !/تسوق|المتجر|uncategorized/i.test(category.name))
    .sort((a, b) => rank(a.name) - rank(b.name) || a.name.localeCompare(b.name, "ar"));
}
