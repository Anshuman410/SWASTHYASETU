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
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=400",
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
    image:
      "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=400",
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
    image:
      "https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=400",
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
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400",
  },
];

interface MapViewProps {
  selectedId?: number | null;
  onSelectHospital?: (id: number) => void;
}

// Inner Leaflet component that imports leaflet only on client
function LeafletMapInner({ selectedId, onSelectHospital }: MapViewProps) {
  const [L, setL] = useState<any>(null);
  const [MapComponents, setMapComponents] = useState<any>(null);

  useEffect(() => {
    // Dynamic import of Leaflet & React-Leaflet
    Promise.all([import("leaflet"), import("react-leaflet")]).then(
      ([leafletModule, reactLeafletModule]) => {
        setL(leafletModule.default);
        setMapComponents(reactLeafletModule);
      }
    );
  }, []);

  if (!L || !MapComponents) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900/60 rounded-3xl border border-white/10 text-slate-400 gap-3">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-medium">Loading OpenStreetMap Engine...</span>
      </div>
    );
  }

  const { MapContainer, TileLayer, Marker, Popup } = MapComponents;

  // Custom Leaflet marker icons styled with emerald pin
  const customIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const center: [number, number] = [28.5672, 77.21];

  return (
    <div className="w-full h-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative">
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={false}
        className="w-full h-full"
        style={{ background: "#0b0f17", minHeight: "450px" }}
      >
        {/* CartoDB Dark Matter tiles matching the soft dark mode theme */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {defaultHospitals.map((h) => (
          <Marker
            key={h.id}
            position={[h.lat, h.lng]}
            icon={customIcon}
            eventHandlers={{
              click: () => onSelectHospital && onSelectHospital(h.id),
            }}
          >
            <Popup className="custom-dark-popup">
              <div className="p-1 text-slate-900">
                <h4 className="font-bold text-xs">{h.name}</h4>
                <p className="text-[10px] text-slate-600">{h.type}</p>
                <div className="flex items-center justify-between mt-1 text-[10px] font-semibold text-emerald-700">
                  <span>{h.distance}</span>
                  <span>{h.availableBeds} beds open</span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

// Client-only dynamic wrapper
export const MapView = dynamic(() => Promise.resolve(LeafletMapInner), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[450px] flex flex-col items-center justify-center bg-slate-900/60 rounded-3xl border border-white/10 text-slate-400 gap-3">
      <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      <span className="text-xs font-medium">Initializing Soft Dark Map...</span>
    </div>
  ),
});

export default MapView;
