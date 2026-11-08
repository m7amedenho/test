// أدوات استخلاص المحتوى من HTML المنسق لووردبريس
export interface ContentSection {
  heading: string;
  body: string;
}

/** استخراج Couples أقسام (عنوان + نص) من HTML ووردبريس */
export function extractSections(html: string | undefined): ContentSection[] {
  if (!html) return [];
  const cleaned = html
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "");

  const out: ContentSection[] = [];
  const regex = /<(h2|h3|h4)[^>]*>([\s\S]*?)<\/\1>([\s\S]*?)(?=<h[234]|<\/body|$)/gi;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(cleaned))) {
    const heading = m[2].replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
    const body = m[3]
      .replace(/<[^>]*>/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    if (heading && heading.length < 80 && body && !/Lorem ipsum/i.test(body)) {
      out.push({ heading, body });
    }
  }
  return out;
}

/** فقرة استراتيجية من HTML */
export function firstParagraph(html: string | undefined, maxLen = 400): string {
  const paragraphs = (html ?? "")
    .replace(/<[^>]*>/g, "\n")
    .split("\n")
    .map((s) => s.replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim())
    .filter((s) => s.length > 40 && !/Lorem ipsum/i.test(s));
  const text = paragraphs.join(" ");
  return text.length > maxLen ? text.slice(0, maxLen).trim() + "…" : text;
}
