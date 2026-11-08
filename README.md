# موقع أليكس للمستلزمات الزراعية — Headless WordPress + Next.js 16

موقع شركة عربي (RTL) مبني على **Next.js 16.4.5** (Turbopack) مع App Router و**Cache Components**. جميع البيانات الحية تُجلب وقت البناء من **WordPress REST API + WooCommerce REST API** الخاصين بـ https://alexasfor.com/ — البناء ينتج نسخة ثابتة، والأجزاء الديناميكية تُحدَّث وقت الطلب (revalidate ساعة).

> **للـ AI القادم:** اقرأ هذه الوثيقة كاملة قبل أي تعديل. المشروع فيه قواعد صارمة لطبقة البيانات، وفخاخ ترميز عربي، وفخاخ Cache Components. نسخة Next.js هنا أحدث من معرفتك الاستدلالية — راجع `node_modules/next/dist/docs/` عند أي شك (المفهرس في `AGENTS.md`).

---

## 1. التشغيل

```powershell
npm install          # تثبيت الحزم
npm run dev          # تطوير — http://localhost:3000
npm run build        # بناء إنتاجي (يجب إيقاف أي dev server قبل البناء — انظر الفخاخ)
npm run start        # تشغيل الإنتاج (مثال: npx next start -p 3111)
```

### متغيرات البيئة (`.env.local` — لا يُرفع إلى git أبدًا)

| المتغير | الاستخدام |
| --- | --- |
| `WORDPRESS_URL` | `https://alexasfor.com` |
| `WC_CONSUMER_KEY` | مفتاح WooCommerce REST — صلاحية **قراءة فقط** (WooCommerce > Settings > Advanced > REST API) |
| `WC_CONSUMER_SECRET` | سرّ المفتاح |
| `NEXT_PUBLIC_SITE_URL` | رابط النشر (لـ canonical و JSON-LD وميتاداتا) |

- المفاتيح **server-side فقط**: كل استدعاءات WooCommerce من Server Components أو `lib/*` — لا استدعاء من أي مكوّن فيه `"use client"`.
- تأكد دائمًا قبل أي commit أن `git status` لا يظهر `.env.local`.

---

## 2. طبقة البيانات — القواعد الصارمة

**المبدأ:** كل منتج/فرع/مقال/تاريخ في الموقع يأتي من مصدر حقيقي (WP أو WooCommerce). يُمنع اختراع بيانات. الاستثناءان المعتمدان من صاحب الموقع:

1. **أرقام شريط الإحصائيات** في `components/sections/StatsBar.tsx` — ثابتة: الأصناف 45 · المحافظات 21 · فريق العمل 180+ · المشاريع 40+ · سنوات الخبرة 32.
2. **الاسم التجاري:** «أليكس للمستلزمات الزراعية» (الاسم القديم «أليكس عصفور» أُزيل من الموقع بالكامل).

### ملفات طبقة البيانات

| الملف | الأدوار |
| --- | --- |
| `lib/wordpress.ts` | الصفحات والمقالات والوسوم والوسائط + `stripHtml` |
| `lib/woocommerce.ts` | `getWooCategories / getWooCategory / getWooProducts / getWooProductsPage / getWooProduct / getWooBrands / getWooStats` — كل استجابة تُنظَّف عبر `partialProduct / partialCategory` |
| `lib/branches.ts` | محلّل نصي (line-based) لصفحة «الفروع» في WP → 13 فرعًا حقيقيًا |
| `lib/site.ts` | بيانات التواصل `getSiteContact` (هاتف/سوشال من WP) |
| `lib/productLines.ts` | خطوط الأصناف الثابتة `PRODUCT_LINES` |
| `lib/media.ts` | خريطة صور مختارة `PICKS` من وسائط WP الحقيقية + `wpLogoUrl` (لوجو WP القديم — مهجور، لا تستخدمه؛ اللوجو الحي هو `public/Alex.png`) |
| `lib/content.ts` | `decodeEntities` + `extractSections` لأدوات تنظيف النص |

### فخاخ طبقة البيانات

1. **روابط الموقع: ترميز واحد.** أي URL داخلي لعنوان عربي يُبنى بـ `encodeURIComponent` **مرة واحدة إلا لا غير**. **URL مُرمَّز مرتين (`%25d8…`) يعطي 404 داخليًا ولو كان المنتج موجودًا.** عند كتابة سكربتات تحقق لا تستخدم `encodeURIComponent(encodeURIComponent(s))`.
   - البارامتر الديناميكي وقت التشغيل يصل مرمّزًا مرة؛ وطبقة `lib/woocommerce.ts` تضيف ترميزًا داخليًا، والـ API يقبله. لا تعدّل هذه الطبقة إلا بحذر وباختبار الاثنين معًا.
2. **`products?category=` يقبل ID رقمي فقط وليس slug.** `getWooProductsPage` تحوّل الـ slug إلى ID قبل الإرسال. لا ترسل slug نصيًا إلى `category`.
3. **`URLSearchParams` لا تفك أو تعيد ترميز القيم الخام** — أضف القيم كما هي واتركها للترميز الداخلي.
4. **حقل `yoast_head` كتلة ضخمة زائدة:** `partialProduct / partialCategory` تقصّه من الاستجابة (توفير كبير في الحجم). لا تسترجع الحقل الخام.
5. **PowerShell يعرض العربية مشوّهة (mojibake) في الكونسول** — هذا عرض إظهار فقط ولا يعني خللًا حقيقيًا. افحص المحتوى العربي عبر سكربت Node (القسم 9) لا عبر إخراج PowerShell.

---

## 3. Cache Components — أنماط إلزامية

المشروع يعمل بوضع Cache Components (Partial Prerender) — راجع `next.config.ts`.

1. **لا تضع `notFound()` في مستوى الصفحة الرئيسي (root) خارج حدود Suspense.** إذا فشل الاستدعاء أثناء صياغة الـ shell الثابت، يثبت الخطأ `NEXT_HTTP_ERROR_FALLBACK;404` داخل HTML المحفوظ فتصير الصفحة 404 في النسخة المبنية.

   النمط المطبَّق في `app/products/[slug]/page.tsx` و `app/categories/[slug]/page.tsx` — انسخه كما هو عند إنشاء صفحة ديناميكية جديدة:

   ```tsx
   export default function Page({ params }: { params: Promise<{ slug: string }> }) {
     return (
       <Suspense fallback={<GridSkeleton label="…"/>}>
         <Detail params={params} />  {/* مكوّن async — هنا notFound() آمن */}
       </Suspense>
     );
   }
   ```

2. **`generateStaticParams` تُعيد قائمة دائمًا** — عند فشل الجلب أعد `[{ slug: "__none__" }]` وقائمة فارغة لا.
3. **داخل `generateStaticParams` مرّر الـ slug بعد فك ترميزه:** `decodeURIComponent(p.slug)`.
4. **لا تستخدم `new Date()` داخل أجزاء الـ shell الثابت** في الصفحات المُصيّرة مسبقًا.

---

## 4. الهوية والتصميم

### الهوية الحالية

- **اللوجو:** `public/Alex.png` — يُستخدم في:
  - شريط التنقل `components/navigation/Navbar.tsx` (لوجو فقط بلا نص)
  - التذييل `components/footer/Footer.tsx` (لوجو فقط + فقرة تعريف)
  - أيقونة الموقع `app/layout.tsx` → `icons.icon`
  - صورة OpenGraph في `app/layout.tsx`
  - JSON-LD للصفحة الرئيسية `app/page.tsx` → `logo: ${SITE_URL}/Alex.png`
- **الاسم:** «أليكس للمستلزمات الزراعية» — ثابت `BRAND` في `Navbar.tsx` و`Footer.tsx`، والميتاداتا في `app/layout.tsx` كلها محدَّثة. الاسم بالإنجليزية: `Alex For Agricultural Supplies`.

### التوكنز في `app/globals.css`

يوجد نظامان معًا:

1. **هوية الموقع (لا تكسرها):** `bg-warm` `text-pine` `bg-sage` `bg-deep` `text-lime` `text-fresh` `bg-mist` `border-line` `text-ink` + أدوات `container-site` `heading-display` `card-glass` `soft-shadow` `hair-line` `text-glow-lime` + حركات `float-slow / float-slower / pulse-soft`.
2. **طبقة shadcn مدموجة كمتغيرات إضافية:** قيم `:root` و`.dark` بصيغة oklch وخرائط `@theme inline` إضافية (bg-primary / text-muted / border-input / chart-* / sidebar-* / radius-*). ملاحظات الدمج:
   - `--font-sans` لم يتغير — يبقى IBM Plex **Sans Arabic** لأن الموقع عربي، والخط في لوحة shadcn بلا عربية.
   - كتلة `@layer base` الخاصة بشادكن (bg-background / text-foreground) **لم تُضاف** لأنها تلغي خلفية الهوية الحالية؛ أضِف توكنز فقط عند إدخال مكوّنات shadcn.
   - قيم shadcn للظلال و `--spacing` لم تُدمج — قيمها قريبة من قيم Tailwind الافتراضية والدمج يعمل تعارضات بلا حاجة.

### الصفحة الرئيسية (ترتيب الأقسام)

| القسم | الملف | مصدر المحتوى |
| --- | --- | --- |
| 01 — الافتتاح | `components/hero/Hero.tsx` | بيانات التواصل |
| 02 — من نحن | `components/sections/IntroSection.tsx` | نص صفحة `about` في WP |
| — شريط الأرقام | `components/sections/StatsBar.tsx` | عدّادات متحركة: InteractionObserver `IntersectionObserver` + `requestAnimationFrame`، يحترم `prefers-reduced-motion`؛ أرقام ثابتة من صاحب الموقع |
| 03 — قصة الشركة بشبكة Bento | `components/storytelling/StoryBento.tsx` | فصول ثابتة نصوصها من محتوى الشركة + صور `PICKS` حقيقية |
| 04 وما بعده | `components/sections/HomeSections.tsx` | خطوط الأصناف، التهجين، المشاتل، الحلول، البحث، الخريطة، الشركاء، الأخبار، الدعوة للتواصل |

- **شريط الأرقام** موضوعة بعد الـ IntroSection مباشرة.
- **Bento Grid** استبدلت قصة التمرير القديمة بـ GSAP (`StoryJourney.tsx` — محذوفة).

### شركاء النجاح

`components/sections/PartnersSection.tsx` — 10 لوجوهات ثابتة في `public/partners/partner-{1..10}.png`، حُمّلت من كاروسيل «شركاء النجاح» في الموقع الرسمي بالحجم الأصلي: `https://alexasfor.com/wp-content/uploads/2023/03/شركاء-النجاح-{N}.png`. القسم لا يعتمد على WooCommerce Brands (دالة `getWooBrands` ما زال محفوظة في `lib/woocommerce.ts` لأي استخدام لاحق).

> **تنبيه:** `partner-9.png` ضخم (~2.2MB). إن كانت مشكلة: صغّره بـ `sharp` إلى عرض 400px أو اعتمد على تحسين `next/image`.

---

## 5. عرض المنتجات

### معرض الصور (Lightbox)

`components/products/ProductGallery.tsx` — مكوّن client يستخدم:

```ts
import Lightbox from "yet-another-react-lightbox";
import { Zoom, Counter, Captions } from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/styles.css";
```

- الإصدار `yet-another-react-lightbox@3.33.0`. **لا تثبّت `yet-another-react-lightbox-zoom`** — إضافة قديمة غير موجودة؛ الإضافات كلها داخل نفس الحزمة.
- `render.iconPrev / render.iconNext` دوال راجعة لعنصر (`() => <svg …/>`)، ليست عناصر مباشرة.
- كلاسات اللايتبوكس `yarl__` تُحقن عبر CSS المجمّع للعميل؛ قد لا تظهر في HTML الثابت، وهذا طبيعي.

### وصف المنتج — هيكلة نظيفة

`components/products/ProductBody.tsx` يعرض الوصف بدل وسم `<div dangerouslySetInnerHTML>` الخام:

1. **الوصف HTML منسق** (يحتوي `<h3>/<h4>/<ul>`): يُعرض مع تنسيق Tailwind عبر منتقيات `[&_]` — بلا تغيير للنص.
2. **الوصف الأسلوب الشرطي** (مثل `– النبات:- نمو خضري ممتاز … – الثمار:- …` ويأتي بصيغة كيانات `&#8211;`): يمر عبر `parseDashSections` الذي:
   - يفكّ الكيانات بـ `decodeEntities` (من `lib/content.ts`)،
   - يزيل الوسوم والتعليقات مثل `<!--more-->`،
   - يقسم على الشرطات الطويلة `–` و `—` (الشرطات القصيرة الداخلية تبقى في النص)،
   - يحوّل النتيجة إلى **بطاقات `<dl>` منظمة** بعناوين (النبات / الثمار / المقاومات / مواعيد الزراعة …) + فقرة `intro` تعريفية.
3. `parseDashSections` تُستعمل أيضًا لاستخراج الـ `intro` للـ **meta description** و JSON-LD (`description`) في `app/products/[slug]/page.tsx` — حتى لا يظهر `&#8211;` في SEO.
4. `sanitizeWpHtml` يزيل `<script>/<style>` وخواص `on…` الخبيثة وسمات `data-path-to-node` الخاصة بمحرر WP.

---

## 6. البنية والمجلدات

```
alexasfor/
├── app/
│   ├── layout.tsx                # الميتاداتا + الأيقونات (/Alex.png)
│   ├── globals.css               # توكنز الهوية + طبقة shadcn (القسم 4)
│   ├── page.tsx                  # الرئيسية + JSON-LD Organization
│   ├── products/[slug]/          # نمط Suspense wrapper الموثق
│   ├── categories/[slug]/        # نفس النمط
│   ├── branches/ news/ about/ contact/ …
│   └── loading.tsx               # skeleton عربي
├── components/
│   ├── products/     ProductGallery · ProductBody · ProductCard
│   ├── sections/     StatsBar · HomeSections · IntroSection · PartnersSection …
│   ├── storytelling/ StoryBento
│   ├── navigation/   Navbar (لوجو فقط)
│   └── footer/       Footer (لوجو فقط)
├── lib/              woocommerce · wordpress · branches · site · media · content · productLines
├── public/
│   ├── Alex.png                  # لوجو الشركة الرسمي
│   └── partners/partner-1..10.png
└── scripts/          ملفات تحقق مؤقتة تبُدأ بـ tmp- — احذفها قبل commit
```

---

## 7. الفخاخ المعروفة — إصلاح سريع

| # | المشكلة | السبب والحل |
| --- | --- | --- |
| 1 | صفحة 404 تثبت داخل HTML بعد فشل جلب بيانات أثناء الـ shell | نمط Suspense wrapper (القسم 3). العرَض: وجود `NEXT_HTTP_ERROR_FALLBACK;404` داخل HTML المُنتَج |
| 2 | رابط عربي يعطي 404 ولو أن المنتج موجود | ترميز مزدوج؛ استخدم ترميزًا واحدًا فقط (القسم 2، فخ 1) |
| 3 | `products?category=slug` لا يعمل | التحويل إلى ID قبل الطلب — موجود في `getWooProductsPage` |
| 4 | خادم dev خامل يشوّه مخرجات `next build` | أوقف كل عمليات node قبل البناء ثم احذف `.next` وأعد البناء |
| 5 | `npx next` ينزّل نسخة من registry بدل النسخة المحلية | تأكد أن مجلد التنفيذ صحيح (`Get-Location`)؛ استخدم `node_modules\.bin\next.cmd` أو أوامر `npm run` |
| 6 | المتصفح الجانبي (review pane) يرمّز العربي مرتين عند فتح تاب عربي، ويجمّد تمريرات dev الطويلة | مرّر الرابط العربي خامًا وليس مُرمّزًا؛ اختبر بصريًا على خادم الإنتاج (`next start`) لا على dev |
| 7 | شبكة الووردبريس ترجع استجابة بطيئة أحيانًا (>2 ثانية للمنتج) | طبيعي — لا تحوّل الجلب إلى fetch خارج `lib/` ولا تضف timeouts صغيرة |

---

## 8. أوامر التحقق (Verification)

```powershell
npm run lint
npx tsc --noEmit
```

فحص HTML المُنتج عبر Node (الطريقة الموثوقة للعربية):

```js
// scripts/tmp-check.mjs — ترميز واحد، لا مرتين
const enc = (s) => encodeURIComponent(s);
const base = "http://127.0.0.1:3111";
const p = await (await fetch(base + "/products/" + enc("صنف-أناناس-هجين-ثمار-محسن-f1"))).text();
console.log("عن الصنف:", p.includes("عن الصنف"));
console.log("404 داخلية (bad):", p.includes("NEXT_HTTP_ERROR_FALLBACK"));
```

**لا تترك ملفات تبدأ بـ `tmp-` داخل `scripts/` عند الـ commit.**

### معايير التوثوق

- صفحة «أناناس» slug حفظها `صنف-أناناس-هجين-ثمار-محسن-f1`: فيها «عن الصنف» + بطاقات النبات/الثمار/مواعيد الزراعة، وبدون 404 داخلية.
- التصنيف slug: `الطماطم-الأرضى`: 7 روابط منتجات.
- الرئيسية: شعار `/Alex.png` + شريط الأرقام (45/21/180/40/32) + شبكة Bento + 10 لوجوهات `partners/partner-*.png` + لا وجود لـ «أليكس عصفور» أو «ALEX ASFOR».

---

## 9. ملخص سجل التغييرات

- النسخة الأولى (`14af2ee`): الموقع الأساسي — تصميم RTL، بيانات WooCommerce حية، خريطة MapLibre للفروع، محتوى حركي GSAP، JSON-LD.
- آخر جولة: إعادة الهوية إلى «أليكس للمستلزمات الزراعية» في ~22 ملفًا، لوجو فقط في Navbar/Footer، شريط عدّادات الأرقام، شبكة Bento بدل قصة GSAP، لوجوهات شركاء النجاح (10 شركات)، Lightbox في معرض المنتجات، هيكلة أوصاف المنتجات ببطاقات، إعادة هيكلة صفحات المنتج والتصنيف بنمط Suspense، إضافة طبقة توكنز shadcn، وتوثيق هذا الـ README.
