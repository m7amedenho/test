"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Map as MLMap, Marker, Popup, NavigationControl, LngLatBounds } from "maplibre-gl";
import type { Map as MLMapType, Marker as MLMarkerType } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Phone, Navigation2, MapPin } from "lucide-react";
import type { CompanyBranch } from "@/lib/branches";

const STYLE = "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";

function pickInitial(branches: CompanyBranch[]) {
  // مركز الخريطة: أقربِ من الإسكندرية (المقر الرئيس) ثم fitBounds على كل الفروع
  return branches[0]?.coords ?? { lat: 30.9, lng: 29.7 };
}

function popupHtml(branch: CompanyBranch) {
  const phones = branch.phones.map((p) => `<a dir="ltr" href="tel:${p.startsWith("0") ? "+20" + p.slice(1) : p}" style="display:inline-flex;align-items:center;gap:6px;padding:6px 10px;margin:4px 4px 0 0;border-radius:999px;background:#174B38;color:#C1E27A;font-weight:700;text-decoration:none;font-size:12px">${p}</a>`).join("");
  const directions = branch.coords
    ? `<a href="https://www.google.com/maps/search/?api=1&query=${branch.coords.lat},${branch.coords.lng}" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:6px;padding:6px 12px;margin-inline-start:4px;border-radius:999px;border:1px solid #174B38;color:#174B38;font-weight:700;text-decoration:none;font-size:12px">الاتجاهات</a>`
    : "";
  return `
    <div style="font-family:var(--font-plex-arabic),sans-serif;direction:rtl;padding:16px;min-width:230px">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
        <span style="width:26px;height:26px;border-radius:9px;background:#EAF1E9;display:inline-flex;align-items:center;justify-content:center">
          <svg width="14" height="14" viewBox="0 0 100 100" fill="none"><path d="M50 8 C26 26, 12 54, 18 86 C44 92, 72 76, 88 46 C72 32, 64 16, 50 8 Z" fill="#174B38"/></svg>
        </span>
        <span style="font-size:11px;font-weight:700;color:#65A875">${branch.type === "sales-manager" ? "مبيعات وتغطية" : "فرع"}</span>
        ${branch.approx ? `<span style="font-size:10px;color:#6b7c72"> · موقع تقريبي</span>` : ""}
      </div>
      <p style="margin:0;font-size:14px;font-weight:800;color:#103B2D;line-height:1.5">${branch.label}</p>
      ${branch.person ? `<p style="margin:2px 0 0;font-size:12px;color:#4a5a52">${branch.person}</p>` : ""}
      <div style="display:flex;flex-wrap:wrap;margin-top:10px">${phones}${directions}</div>
    </div>`;
}

export function AsforMap({ branches }: { branches: CompanyBranch[] }) {
  const mapEl = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MLMapType | null>(null);
  const [activeId, setActiveId] = useState<string | null>(branches.find((b) => b.coords)?.id ?? null);

  const mapped = useMemo(() => branches.filter((b) => b.coords), [branches]);

  useEffect(() => {
    if (!mapEl.current || mapRef.current || mapped.length === 0) return;
    const map = new MLMap({
      container: mapEl.current,
      style: STYLE,
      center: [pickInitial(mapped).lng, pickInitial(mapped).lat],
      zoom: 8,
      attributionControl: false,
    });
    mapRef.current = map;
    map.addControl(new NavigationControl({ showCompass: false }), "bottom-left");

    const markers: MLMarkerType[] = mapped.map((b) => {
      const el = document.createElement("button");
      el.type = "button";
      el.className = "asfor-marker";
      el.setAttribute("aria-label", b.label);
      el.innerHTML = `
        <svg width="34" height="42" viewBox="0 0 34 42">
          <defs><linearGradient id="pk${b.id}" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#174B38"/><stop offset="100%" stop-color="#1d5c45"/>
          </linearGradient></defs>
          <path d="M17 1 C8 1 1 8 1 17 c0 10 11 16 16 24 c5 -8 16 -14 16 -24 C33 8 26 1 17 1 Z" fill="url(#pk${b.id})" stroke="white" stroke-width="2"/>
          <circle cx="17" cy="16" r="7" fill="#C1E27A"/>
          <path d="M14 16 c1 -3 3 -4 5 -5 c0 3 -2 5 -5 5 Z" fill="#103B2D"/>
        </svg>`;
      el.style.cssText = "background:none;border:none;cursor:pointer;padding:0;position:relative;transition:transform .2s";
      el.addEventListener("click", () => {
        setActiveId(b.id);
        map.easeTo({ center: [b.coords!.lng, b.coords!.lat], zoom: 10.5, duration: 700 });
      });
      const marker = new Marker({ element: el, anchor: "bottom" })
        .setLngLat([b.coords!.lng, b.coords!.lat])
        .setPopup(
          new Popup({ offset: 42, closeButton: false, maxWidth: "300px" }).setHTML(popupHtml(b))
        )
        .addTo(map);
      return marker;
    });

    // ملاءمة كل الفروع داخل الخريطة
    const bounds = new LngLatBounds();
    mapped.forEach((b) => bounds.extend([b.coords!.lng, b.coords!.lat]));
    map.fitBounds(bounds, { padding: { top: 70, bottom: 70, left: 60, right: 60 }, duration: 0, maxZoom: 10.5 });

    return () => {
      markers.forEach((m) => m.remove());
      map.remove();
      mapRef.current = null;
    };
  }, [mapped]);

  const active = mapped.find((b) => b.id === activeId);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
      {/* الخريطة */}
      <div className="relative h-[460px] overflow-hidden rounded-[2rem] border border-line bg-mist soft-shadow lg:h-[560px]">
        <div ref={mapEl} className="h-full w-full" />
        {mapped.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-ink/50">
            ستُعرض الفروع هنا عند توفر إحداثياتها
          </div>
        )}
      </div>

      {/* القائمة المتزامنة */}
      <div className="flex max-h-[560px] flex-col gap-2.5 overflow-y-auto rounded-[2rem] border border-line bg-white p-4">
        {mapped.map((b) => (
          <button
            key={b.id}
            onClick={() => {
              setActiveId(b.id);
              mapRef.current?.easeTo({ center: [b.coords!.lng, b.coords!.lat], zoom: 10.5, duration: 800 });
            }}
            className={`group flex flex-col items-start rounded-2xl border p-4 text-right transition-all ${
              activeId === b.id
                ? "border-fresh bg-sage shadow-sm"
                : "border-line/70 bg-warm hover:border-fresh/50 hover:bg-mist"
            }`}
          >
            <span className="flex items-center gap-2">
              <MapPin size={14} className={activeId === b.id ? "text-pine" : "text-fresh"} />
              <span className="text-[13.5px] font-extrabold text-deep">{b.label}</span>
              {b.approx && <span className="rounded-full bg-mist px-2 py-0.5 text-[9.5px] text-ink/50">تقريبي</span>}
            </span>
            {b.person && <span className="mt-1 text-[11.5px] text-ink/55">{b.person}</span>}
            <span className="mt-2 flex flex-wrap gap-1.5">
              {b.phones.slice(0, 3).map((p) => (
                <a
                  key={p}
                  href={`tel:${p.startsWith("0") ? "+20" + p.slice(1) : p}`}
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 rounded-full bg-deep px-2.5 py-1 text-[11px] font-bold text-lime"
                >
                  <Phone size={10} />
                  <span dir="ltr">{p}</span>
                </a>
              ))}
              {b.coords && (
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${b.coords.lat},${b.coords.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 rounded-full border border-pine px-2.5 py-1 text-[11px] font-bold text-pine"
                >
                  <Navigation2 size={10} />
                  اتجاهات
                </a>
              )}
            </span>
          </button>
        ))}
        {mapped.length === 0 && (
          <p className="p-6 text-center text-sm text-ink/50">لا توجد مواقع معروضة حاليًا</p>
        )}
      </div>

      {/* ملاحظة الشفافية */}
      {active && (
        <p className="col-span-full min-h-5 text-[11.5px] text-ink/45 lg:col-span-2">
          * المواقع المعروضة إحداثياتها «مقاربة على مركز المدينة» المستندة إلى أسماء المناطق المنشورة في الموقع —
          الرجاء تأكيد العنوان التفصيلي هاتفيًا قبل الزيارة.
        </p>
      )}
    </div>
  );
}
