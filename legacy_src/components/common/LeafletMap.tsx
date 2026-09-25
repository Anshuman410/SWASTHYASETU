import React, { useEffect, useRef } from 'react';
import { Facility } from '../../types';
import { MapPin, Building2 as Hospital, Navigation } from 'lucide-react';

interface LeafletMapProps {
  facilities: Facility[];
  selectedFacilityId?: string;
  onSelectFacility?: (id: string) => void;
  height?: string;
}

export const LeafletMap: React.FC<LeafletMapProps> = ({
  facilities,
  selectedFacilityId,
  onSelectFacility,
  height = '400px'
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Dynamically initialize Leaflet map if L is available globally
    if (typeof window !== 'undefined' && (window as any).L && mapContainerRef.current) {
      const L = (window as any).L;
      
      // Clear existing map instance if any
      const container = mapContainerRef.current;
      container.innerHTML = '';
      const mapDiv = document.createElement('div');
      mapDiv.style.width = '100%';
      mapDiv.style.height = '100%';
      container.appendChild(mapDiv);

      // Center around Sitapur / Rampur coordinates
      const map = L.map(mapDiv).setView([26.8500, 80.9500], 11);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      facilities.forEach(fac => {
        const isSelected = fac.id === selectedFacilityId;
        const color = fac.currentQueueLength <= 5 ? '#059669' : fac.currentQueueLength <= 12 ? '#d97706' : '#dc2626';

        const customIcon = L.divIcon({
          className: 'custom-leaflet-marker',
          html: `<div style="background-color: ${color}; width: 28px; height: 28px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 8px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 11px;">
            ${fac.name.substring(0, 1)}
          </div>`,
          iconSize: [28, 28],
          iconAnchor: [14, 14]
        });

        const marker = L.marker([fac.lat, fac.lng], { icon: customIcon }).addTo(map);

        const popupContent = `
          <div style="font-family: Inter, sans-serif; padding: 4px;">
            <strong style="color: #0f172a; font-size: 14px;">${fac.name}</strong><br/>
            <span style="font-size: 11px; color: #64748b;">${fac.type} • ${fac.distanceKm} km away</span><br/>
            <div style="margin-top: 6px; font-size: 12px;">
              <strong>Queue:</strong> ${fac.currentQueueLength} waiting (${fac.estimatedWaitTimeMinutes} mins)<br/>
              <strong>Doctors:</strong> ${fac.availableDoctorsCount} available
            </div>
          </div>
        `;

        marker.bindPopup(popupContent);

        if (isSelected) {
          marker.openPopup();
        }

        marker.on('click', () => {
          if (onSelectFacility) onSelectFacility(fac.id);
        });
      });

      return () => {
        map.remove();
      };
    }
  }, [facilities, selectedFacilityId, onSelectFacility]);

  return (
    <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100" style={{ height }}>
      <div ref={mapContainerRef} className="w-full h-full">
        {/* Fallback visual map grid if Leaflet script tile loads slow */}
        <div className="w-full h-full p-6 flex flex-col justify-between bg-gradient-to-br from-emerald-50 via-slate-50 to-sky-50">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold px-3 py-1 bg-white/90 rounded-full border border-slate-200 shadow-sm text-slate-700 flex items-center gap-1.5">
              <Navigation className="w-3.5 h-3.5 text-health-700 animate-pulse" />
              District Health Facility Map (Sitapur Zone)
            </span>
            <div className="flex items-center gap-3 text-[11px] font-medium text-slate-600 bg-white/90 px-3 py-1 rounded-full border border-slate-200">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span> Low Wait</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Moderate</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-rose-600"></span> High Capacity</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-auto">
            {facilities.slice(0, 3).map(fac => (
              <div
                key={fac.id}
                onClick={() => onSelectFacility && onSelectFacility(fac.id)}
                className={`p-3.5 bg-white/90 backdrop-blur-sm rounded-xl border transition-all cursor-pointer ${
                  fac.id === selectedFacilityId ? 'border-health-600 ring-2 ring-health-500/20 shadow-md' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-lg ${fac.currentQueueLength <= 5 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'}`}>
                    <Hospital className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{fac.name}</h4>
                    <p className="text-[11px] text-slate-600">{fac.distanceKm} km • {fac.estimatedWaitTimeMinutes}m wait</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-slate-600 text-center">Interactive OpenStreetMap Node Enabled • Real-time Capacity Sync</p>
        </div>
      </div>
    </div>
  );
};
