"use client";

import { useEffect, useRef, useState } from "react";
import { Map as MLMap, Marker, NavigationControl, LngLatBounds, setWorkerUrl } from "maplibre-gl";
import type { Map as MLMapType, Marker as MLMarkerType } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { MapPin, Navigation2, Phone, UserRound, Crown, ChevronDown } from "lucide-react";
import type { CompanyBranch } from "@/lib/branches";
import { AREA_DIRECTORS, SALES_REPRESENTATIVES } from "@/lib/coverage";

const STYLE = "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";
const GEOJSON = "/data/egypt-governorates.geojson";

const GOVERNORATE_LABELS: Record<string, string> = {
  "Asyut Governorate": "أسيوط", "Minya Governate": "المنيا",
  "Sohag Governorate": "سوهاج", "Qena Governorate": "قنا",
  "Kafr el-Sheikh Governorate": "كفر الشيخ", "Dakahlia Governorate": "الدقهلية",
  "Damietta Governorate": "دمياط", "Ismailia Governorate": "الإسماعيلية",
  "Giza Governorate": "الجيزة", "Faiyum Governorate": "الفيوم",
  "Beni Suef Governorate": "بني سويف", "Luxor Governate": "الأقصر",
  "Aswan Governorate": "أسوان", "Beheira Governorate": "البحيرة",
  "Alexandria Governorate": "الإسكندرية", "Monufia Governorate": "المنوفية",
  "Al Sharqia Governorate": "الشرقية", "Port Said Governorate": "بورسعيد",
  "Suez Governorate": "السويس", "Gharbiyya Governorate": "الغربية",
};

type Boundary = {
  features: { properties: { shapeName: string }; geometry: { coordinates: unknown } }[];
};

function addCoordinates(bounds: LngLatBounds, coordinates: unknown) {
  if (!Array.isArray(coordinates)) return;
  if (typeof coordinates[0] === "number" && typeof coordinates[1] === "number") {
    bounds.extend([coordinates[0], coordinates[1]]);
    return;
  }
  coordinates.forEach((part) => addCoordinates(bounds, part));
}

function phoneHref(phone: string) {
  return `tel:${phone.startsWith("0") ? `+20${phone.slice(1)}` : phone}`;
}

function normalizeName(name: string) {
  return name.replace(/^[مد]\/\s*/, "").normalize("NFKD")
    .replace(/[\u064B-\u065F\u0670]/g, "").replace(/[أإآ]/g, "ا")
    .replace(/ى/g, "ي").replace(/ة/g, "ه").replace(/\s+/g, "").trim();
}

export function AsforMap({ branches }: { branches: CompanyBranch[] }) {
  const offices = branches.filter((branch) => branch.type === "branch" && branch.coords);
  const representatives = SALES_REPRESENTATIVES;
  const mapEl = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MLMapType | null>(null);
  const boundariesRef = useRef<Boundary | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeIdRef = useRef<string | null>(null);

  useEffect(() => { activeIdRef.current = activeId; }, [activeId]);

  useEffect(() => {
    if (!mapEl.current || mapRef.current) return;
    setWorkerUrl("/maplibre-gl-worker.mjs");
    const map = new MLMap({
      container: mapEl.current,
      style: STYLE,
      center: [30.7, 26.8],
      zoom: 5.1,
      attributionControl: false,
    });
    mapRef.current = map;
    map.addControl(new NavigationControl({ showCompass: false }), "bottom-left");

    map.on("load", () => {
      map.addSource("governorates", { type: "geojson", data: GEOJSON });
      map.addLayer({
        id: "coverage-fill", type: "fill", source: "governorates",
        paint: { "fill-color": "#377d55", "fill-opacity": 0.35 },
        filter: ["==", ["get", "shapeName"], ""],
      });
      map.addLayer({
        id: "coverage-outline", type: "line", source: "governorates",
        paint: { "line-color": "#174b38", "line-width": 2.5, "line-opacity": 0.85 },
        filter: ["==", ["get", "shapeName"], ""],
      });
    });

    const markers: MLMarkerType[] = offices.map((office) => {
      const el = document.createElement("button");
      el.type = "button";
      el.className = "asfor-marker";
      el.setAttribute("aria-label", `فرع ${office.label}`);
      el.style.cssText = "width:38px;height:38px;border-radius:50%;border:3px solid white;background:#174b38;color:white;box-shadow:0 4px 16px #173b2e66;display:grid;place-items:center;cursor:pointer";
      el.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2"/></svg>';
      el.addEventListener("click", () => setActiveId(office.id));
      return new Marker({ element: el }).setLngLat([office.coords!.lng, office.coords!.lat]).addTo(map);
    });

    fetch(GEOJSON).then((response) => response.json()).then((data: Boundary) => { boundariesRef.current = data; }).catch(() => {});
    return () => {
      markers.forEach((marker) => marker.remove());
      map.remove();
      mapRef.current = null;
    };
    // بيانات الفروع تأتي من الخادم وتبقى ثابتة طوال عمر الصفحة.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    const selected = branches.find((branch) => branch.id === activeId) ?? representatives.find((rep) => rep.id === activeId);
    if (!map || !selected) return;

    const focusSelection = () => {
      if ("type" in selected && selected.type === "branch" && selected.coords) {
        map.setFilter("coverage-fill", ["==", ["get", "shapeName"], ""]);
        map.setFilter("coverage-outline", ["==", ["get", "shapeName"], ""]);
        map.easeTo({ center: [selected.coords.lng, selected.coords.lat], zoom: 10, duration: 800 });
        return;
      }

      if (!selected.governorates.length) return;
      map.setFilter("coverage-fill", ["in", ["get", "shapeName"], ["literal", selected.governorates]]);
      map.setFilter("coverage-outline", ["in", ["get", "shapeName"], ["literal", selected.governorates]]);
      const fitCoverage = (data: Boundary) => {
        const bounds = new LngLatBounds();
        data.features
          .filter((feature) => selected.governorates.includes(feature.properties.shapeName))
          .forEach((feature) => addCoordinates(bounds, feature.geometry.coordinates));
        if (!bounds.isEmpty() && mapRef.current === map && activeIdRef.current === selected.id) map.fitBounds(bounds, { padding: 65, duration: 800, maxZoom: 8 });
      };
      if (boundariesRef.current) fitCoverage(boundariesRef.current);
      else fetch(GEOJSON).then((response) => response.json()).then((data: Boundary) => {
        boundariesRef.current = data;
        fitCoverage(data);
      }).catch(() => {});
    };

    if (map.getLayer("coverage-fill")) focusSelection();
    else map.once("load", focusSelection);
    return () => { map.off("load", focusSelection); };
  }, [activeId, branches, representatives]);

  return (
    <div className="space-y-10">
      <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1.45fr)_minmax(340px,1fr)]">
        <div className="space-y-4">
          <div className="relative h-[430px] overflow-hidden rounded-[1.75rem] border border-line bg-mist shadow-sm sm:h-[570px]">
            <div ref={mapEl} className="h-full w-full" aria-label="خريطة فروع أليكس ومناطق تغطية المناديب" />
            {activeId && <div className="pointer-events-none absolute bottom-5 right-5 max-w-[70%] rounded-xl bg-white/95 px-4 py-2 text-xs font-bold text-deep shadow-lg backdrop-blur-sm">{branches.find((branch) => branch.id === activeId)?.label ?? representatives.find((rep) => rep.id === activeId)?.name}</div>}
          </div>
          <div className="rounded-2xl border border-line bg-white p-4 sm:p-5">
            <p className="mb-3 flex items-center gap-2 text-sm font-extrabold text-deep"><MapPin size={16} className="text-pine" />فرعانا في الإسكندرية</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {offices.map((office) => (
                <div key={office.id} className={`rounded-xl border p-3 ${activeId === office.id ? "border-pine bg-sage" : "border-line bg-mist/40"}`}>
                  <button type="button" onClick={() => setActiveId(office.id)} className="w-full text-right text-xs font-bold leading-relaxed text-deep hover:text-pine">{office.label}</button>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {office.phones.map((phone) => <a key={phone} href={phoneHref(phone)} dir="ltr" className="inline-flex items-center gap-1 text-[11px] font-bold text-pine"><Phone size={11} />{phone}</a>)}
                    {office.coords && <a href={`https://www.google.com/maps/search/?api=1&query=${office.coords.lat},${office.coords.lng}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[11px] font-bold text-pine"><Navigation2 size={11} />الاتجاهات</a>}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[11px] text-ink/50">إحداثيات الفرعين تقريبية؛ يُرجى تأكيد العنوان قبل الزيارة.</p>
          </div>
        </div>

        <aside className="rounded-[1.75rem] border border-line bg-white p-4 sm:p-5 lg:max-h-[760px] lg:overflow-y-auto" aria-label="اختيار مندوب المبيعات">
          <div className="mb-5 border-b border-line pb-4">
            <p className="mb-1 text-xs font-bold text-pine">فريق المبيعات</p>
            <h3 className="text-xl font-extrabold text-deep">اختر المندوب</h3>
            <p className="mt-2 text-xs leading-relaxed text-ink/55">اضغط على الاسم لتحديد المحافظات التي يغطيها على الخريطة.</p>
          </div>
          <div className="space-y-2.5">
            {representatives.map((rep) => {
              const published = branches.find((branch) => branch.type === "sales-manager" && branch.person && normalizeName(branch.person) === normalizeName(rep.name));
              return (
                <div key={rep.id} className={`rounded-xl border p-3 transition ${activeId === rep.id ? "border-pine bg-sage" : "border-line bg-mist/30 hover:border-fresh"}`}>
                  <button type="button" onClick={() => setActiveId(rep.id)} aria-pressed={activeId === rep.id} className="flex w-full items-center gap-3 text-right">
                    <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${activeId === rep.id ? "bg-pine text-white" : "bg-sage text-pine"}`}><UserRound size={20} /></span>
                    <span className="min-w-0 flex-1"><span className="block text-sm font-extrabold text-deep">{rep.title} {rep.name}</span><span className="mt-0.5 block text-[11px] text-ink/55">{rep.governorates.map((gov) => GOVERNORATE_LABELS[gov] || gov).join(" · ")}</span></span>
                    <MapPin size={15} className="shrink-0 text-pine" />
                  </button>
                  {activeId === rep.id && <div className="mt-3 border-t border-pine/15 pt-3"><p className="text-xs leading-6 text-ink/65">{rep.places.join(" · ")}</p>{published && <div className="mt-2 flex flex-wrap gap-2">{published.phones.map((phone) => <a key={phone} href={phoneHref(phone)} dir="ltr" className="inline-flex items-center gap-1 text-xs font-bold text-pine hover:underline"><Phone size={12} />{phone}</a>)}</div>}</div>}
                </div>
              );
            })}
          </div>
        </aside>
      </div>

      <section className="rounded-[2rem] border border-line bg-[#f6f8f4] px-4 py-10 sm:px-8 lg:px-12" aria-labelledby="sales-tree-title">
        <div className="mb-9 text-center">
          <p className="mb-2 text-sm font-bold text-pine">الهيكل الإشرافي</p>
          <h3 id="sales-tree-title" className="heading-display text-2xl text-deep sm:text-3xl">فريق المبيعات على أرض الواقع</h3>
          <p className="mt-3 text-xs text-ink/55">افتح اسم المدير لعرض فريقه ومناطق عمله.</p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2">
          {AREA_DIRECTORS.map((director) => (
            <details key={director} className="group rounded-2xl border border-pine/20 bg-white shadow-sm open:border-pine/40">
              <summary className="flex cursor-pointer list-none items-center gap-4 p-5 [&::-webkit-details-marker]:hidden">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-deep text-white ring-4 ring-sage"><UserRound size={25} /></span>
                <span className="flex-1"><span className="mb-1 flex items-center gap-1 text-xs font-bold text-pine"><Crown size={13} />مدير مناطق</span><span className="block text-base font-extrabold text-deep">{director}</span></span>
                <ChevronDown size={18} className="text-pine transition-transform group-open:rotate-180" />
              </summary>
              <div className="border-t border-line px-5 pb-5 pt-4 text-xs leading-relaxed text-ink/60">
                توزيع المناديب التابعين لهذا المدير سيُضاف بعد تأكيد الأسماء.
              </div>
            </details>
          ))}
        </div>

        <div className="mx-auto h-8 w-px bg-pine/30" aria-hidden="true" />
        <div className="mx-auto max-w-4xl rounded-2xl border border-fresh/35 bg-white p-5">
          <div className="flex items-center gap-4">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-sage text-pine ring-4 ring-white"><UserRound size={25} /></span>
            <div><p className="text-xs font-bold text-pine">مندوب مستقل · بدون مدير مناطق</p><h4 className="mt-1 text-base font-extrabold text-deep">م/ كريم الهلالي</h4></div>
          </div>
          <p className="mt-4 border-t border-line pt-4 text-xs leading-6 text-ink/65">الأقصر · إسنا · أسوان</p>
        </div>

        <details className="group mx-auto mt-5 max-w-4xl rounded-2xl border border-line bg-white">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-5 text-sm font-bold text-deep [&::-webkit-details-marker]:hidden"><span>باقي المناديب · بانتظار توزيعهم بين المديرين</span><ChevronDown size={18} className="text-pine transition-transform group-open:rotate-180" /></summary>
          <div className="grid gap-2 border-t border-line p-5 sm:grid-cols-2">
            {representatives.filter((rep) => rep.id !== "karim-helaly").map((rep) => <button key={rep.id} type="button" onClick={() => { setActiveId(rep.id); mapEl.current?.scrollIntoView({ behavior: "smooth", block: "center" }); }} className="rounded-xl bg-mist px-4 py-3 text-right text-xs font-bold text-deep hover:bg-sage">{rep.title} {rep.name}<span className="mt-1 block font-normal text-ink/55">{rep.governorates.map((gov) => GOVERNORATE_LABELS[gov] || gov).join(" · ")}</span></button>)}
          </div>
        </details>

        <p className="mt-7 text-xs leading-relaxed text-ink/50">الأماكن والمحافظات وفق جدول التغطية، ولا تمثل مواقع المناديب الفعلية. حدود المحافظات: <a href="https://www.geoboundaries.org/api.html" target="_blank" rel="noopener noreferrer" className="underline hover:text-pine">geoBoundaries</a> (CC BY 4.0).</p>
      </section>
    </div>
  );
}
