import { decodeEntities } from "@/lib/content";

/** إزالة العناصر الخطرة والسمات التكنوقية من HTML ووردبريس قبل الإدخال المباشر */
function sanitizeWpHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/\son\w+\s*=\s*"[^"]*"/gi, "")
    .replace(/\son\w+\s*=\s*'[^']*'/gi, "")
    .replace(/\sdata-(?:path-to-node|index-in-node|node-path)="[^"]*"/g, "")
    .replace(/<!--[\s\S]*?-->/g, "");
}

export interface DescriptionSection {
  label: string;
  body: string;
}

export interface ParsedDescription {
  intro: string;
  sections: DescriptionSection[];
}

/**
 * وصف مكتوب كنص واحد بعلامات «– النبات:- ...» يُقسَّم إلى بطاقات منظمة
 * بحيث لا يظهر في الموقع نص مفكك طويل بلا بنية.
 */
export function parseDashSections(html: string): ParsedDescription {
  // نطهي النص من الوسوم والكيانات وغير الطبيعي من الفواصل النصية
  const text = decodeEntities(html)
    .replace(/<[^>]*>/g, " ")
    .replace(/<!--more-->/g, " ")
    .replace(/&amp;nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  // التقسيم على الشرطات الطويلة (– / —) فقط؛ الشرطة القصيرة تبقى داخل النص
  const parts = text.split(/\s*[–—]\s+/).map((p) => p.trim()).filter(Boolean);

  const marker = /^([^:\s](?:[^:–—]*[^:\s–—])?)\s*:\s*-\s*([\s\S]*)$/;
  const out: { intro: string; sections: DescriptionSection[] } = { intro: "", sections: [] };
  let current: DescriptionSection | null = null;

  for (const part of parts) {
    const m = part.match(marker);
    if (m) {
      // بداية قسم جديد بعلامة «التوقيت:-»
      current = { label: m[1].trim(), body: m[2].trim() };
      out.sections.push(current);
    } else if (current) {
      // نص مكمّل للقسم الحالي (مثل بقية مواعيد الزراعة)
      current.body = `${current.body} – ${part}`.trim();
    } else {
      out.intro = `${out.intro} – ${part}`.replace(/^\s*–\s*/, "").trim();
    }
  }

  // إزالة شرطة الاستكمال من بداية القسم الأول إن وُجدت
  for (const s of out.sections) s.body = s.body.replace(/^[–—]\s*/, "");
  out.sections = out.sections.filter((s) => s.label || s.body);
  return out;
}

/** عرض وصف المنتج بناحيتين: HTML منسق يحفظ بنية ووردبريس، أو نص مفكك يُنظم إلى بطاقات */
export function ProductBody({ html }: { html: string }) {
  const hasStructure = /<(h[2-4]|ul|ol)\b/i.test(html);

  if (hasStructure) {
    return (
      <div
        className="text-[14.5px] leading-loose text-ink/70 [&_a]:text-pine [&_img]:my-4 [&_img]:rounded-2xl [&_strong]:text-deep [&_h3]:heading-display [&_h3]:mb-3 [&_h3]:mt-7 [&_h3]:text-lg [&_h3]:text-deep [&_h4]:mt-6 [&_h4]:text-[15px] [&_h4]:font-extrabold [&_h4]:text-deep [&_p]:mb-4 [&_ul]:my-4 [&_ul]:list-none [&_ul]:space-y-3 [&_ul>li]:rounded-xl [&_ul>li]:bg-mist/50 [&_ul>li]:p-3.5 [&_ul>li>strong]:text-pine [&_ul>li>strong]:after:content-[' —_']"
        dangerouslySetInnerHTML={{ __html: sanitizeWpHtml(html) }}
      />
    );
  }

  const { intro, sections } = parseDashSections(html);
  return (
    <div>
      {intro && <p className="text-[14.5px] leading-loose text-ink/70">{intro}</p>}
      {sections.length > 0 && (
        <dl className="mt-7 grid gap-4 sm:grid-cols-2">
          {sections.map((s) => (
            <div key={s.label} className="rounded-2xl border border-line bg-white p-5">
              <dt className="flex items-center gap-2 text-[13.5px] font-extrabold text-deep">
                <span className="h-2 w-2 rounded-full bg-fresh" aria-hidden />
                {s.label}
              </dt>
              <dd className="mt-2 text-[13px] leading-relaxed text-ink/65">{s.body}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}
