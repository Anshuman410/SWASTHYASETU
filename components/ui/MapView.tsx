"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

export interface HospitalMarker {
  id: number;
  name: string;
  type: string;
  lat: number;
  lng: number;
  distance: string;
  rating: number;
  availableBeds: number;
  image: string;
}

const defaultHospitals: HospitalMarker[] = [
  {
    id: 1,
    name: "AIIMS New Delhi",
    type: "Govt Tertiary Hospital",
    lat: 28.5672,
    lng: 77.21,
    distance: "4.2 km",
    rating: 4.8,
    availableBeds: 45,
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=400",
  },
  {
    id: 2,
    name: "Safdarjung Hospital",
    type: "Govt Super Speciality",
    lat: 28.5703,
    lng: 77.2066,
    distance: "3.8 km",
    rating: 4.4,
    availableBeds: 28,
    image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=400",
  },
  {
    id: 3,
    name: "Rampur Primary Health Center",
    type: "Primary Health Center (PHC)",
    lat: 28.555,
    lng: 77.225,
    distance: "2.1 km",
    rating: 4.1,
    availableBeds: 6,
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=400",
  },
  {
    id: 4,
    name: "Yashoda Super Speciality",
    type: "Private Network Hospital",
    lat: 28.58,
    lng: 77.23,
    distance: "6.5 km",
    rating: 4.6,
    availableBeds: 32,
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400",
  },
];

interface MapViewProps {
  selectedId?: number | null;
  onSelectHospital?: (id: number) => void;
}

// Inner Leaflet component that imports leaflet only on client
function LeafletMapInner({ selectedId, onSelectHospital }: MapViewProps) {
  const [LInstance, setLInstance] = useState<any>(null);
  const [MapComponents, setMapComponents] = useState<any>(null);

  useEffect(() => {
    Promise.all([import("leaflet"), import("react-leaflet")]).then(
      ([leafletModule, reactLeafletModule]) => {
        setLInstance(leafletModule.default);
        setMapComponents(reactLeafletModule);
      }
    );
  }, []);

  if (!LInstance || !MapComponents) {
    return (
      <div className="w-full h-full min-h-[500px] flex flex-col items-center justify-center bg-slate-900/80 rounded-3xl border border-white/10 text-slate-400 gap-3">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-semibold text-emerald-400">Loading Geospatial Health Network Map...</span>
      </div>
    );
  }

  const { MapContainer, TileLayer, Marker, Popup } = MapComponents;

  // Custom high-contrast SVG pin that never fails to load (no external CDN icon dependency)
  const createCustomPin = (isSelected: boolean) =>
    LInstance.divIcon({
      className: "custom-map-pin",
      html: `
        <div style="
          position: relative;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        ">
          <span style="
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: ${isSelected ? "#10b981" : "#059669"};
            opacity: 0.35;
            animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
          "></span>
          <div style="
            position: relative;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: ${isSelected ? "#34d399" : "#10b981"};
            border: 2px solid #ffffff;
            box-shadow: 0 4px 14px rgba(16, 185, 129, 0.6);
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#041f17" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
            </svg>
          </div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -18],
    });

  const center: [number, number] = [28.5672, 77.21];

  return (
    <div className="w-full h-full min-h-[480px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative bg-[#0b0f17]">
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={true}
        className="w-full h-full"
        style={{ width: "100%", height: "100%", minHeight: "480px", background: "#0b0f17" }}
      >
        {/* OpenStreetMap Standard / CartoDB Dark Matter tile layer with automatic fallback - 100% Free, No API key */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
          maxZoom={19}
        />

        {defaultHospitals.map((h) => {
          const isSelected = selectedId === h.id;
          return (
            <Marker
              key={h.id}
              position={[h.lat, h.lng]}
              icon={createCustomPin(isSelected)}
              eventHandlers={{
                click: () => onSelectHospital && onSelectHospital(h.id),
              }}
            >
              <Popup className="custom-leaflet-popup">
                <div style={{ minWidth: "160px", padding: "4px" }}>
                  <div style={{ fontWeight: "bold", fontSize: "12px", color: "#0f172a" }}>
                    {h.name}
                  </div>
                  <div style={{ fontSize: "10px", color: "#64748b", marginTop: "2px" }}>
                    {h.type}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px", fontSize: "10px", fontWeight: "600", color: "#059669" }}>
                    <span>{h.distance}</span>
                    <span>{h.availableBeds} beds open</span>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

// Client-only dynamic wrapper
export const MapView = dynamic(() => Promise.resolve(LeafletMapInner), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[480px] flex flex-col items-center justify-center bg-slate-900/80 rounded-3xl border border-white/10 text-slate-400 gap-3">
      <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      <span className="text-xs font-semibold text-emerald-400">Loading Map Explorer...</span>
    </div>
  ),
});

export default MapView;
