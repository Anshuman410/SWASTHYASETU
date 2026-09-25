import React, { useState } from 'react';
import { useHealthcare } from '../../context/HealthcareContext';
import { LeafletMap } from '../../components/common/LeafletMap';
import {
  Building2 as Hospital, MapPin, Clock, Stethoscope, Pill, FlaskConical,
  CheckCircle, Star, Filter, ArrowRight, Phone, ShieldCheck
} from 'lucide-react';

interface SmartFacilitiesPageProps {
  onNavigate: (route: string) => void;
}

export const SmartFacilitiesPage: React.FC<SmartFacilitiesPageProps> = ({ onNavigate }) => {
  const { facilities, bookAppointment, setSelectedPatientId } = useHealthcare();

  const [selectedFacilityId, setSelectedFacilityId] = useState<string>('fac-1');
  const [filterType, setFilterType] = useState<string>('ALL');
  const [maxDistance, setMaxDistance] = useState<number>(30);
  const [requirePharmacy, setRequirePharmacy] = useState(false);

  const filteredFacilities = facilities.filter(fac => {
    if (filterType !== 'ALL' && !fac.type.includes(filterType)) return false;
    if (fac.distanceKm > maxDistance) return false;
    if (requirePharmacy && fac.medicineAvailabilityPercent < 75) return false;
    return true;
  });

  return (
    <div className="space-y-6 animate-letter">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-health-700 bg-health-50 px-2.5 py-1 rounded-full border border-emerald-200">
            Multi-Variable Allocation Engine
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-2">Smart Facility Recommendation</h1>
          <p className="text-xs text-slate-600 mt-1">
            Matching patient urgency with distance, doctor presence, diagnostics, pharmacy stock, and live queue load.
          </p>
        </div>
      </div>

      {/* Interactive OpenStreetMap Leaflet View */}
      <LeafletMap
        facilities={filteredFacilities}
        selectedFacilityId={selectedFacilityId}
        onSelectFacility={setSelectedFacilityId}
        height="360px"
      />

      {/* Filter Bar */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs font-semibold">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-health-700" />
          <span>Filter Facilities:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none"
          >
            <option value="ALL">All Facility Tiers</option>
            <option value="PHC">Primary Health Centre (PHC)</option>
            <option value="CHC">Community Health Centre (CHC)</option>
            <option value="District">District Hospital</option>
          </select>

          <select
            value={maxDistance}
            onChange={e => setMaxDistance(Number(e.target.value))}
            className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none"
          >
            <option value={10}>Within 10 km</option>
            <option value={20}>Within 20 km</option>
            <option value={30}>Within 30 km</option>
          </select>

          <label className="flex items-center gap-1.5 cursor-pointer px-3 py-1.5 bg-slate-50 rounded-xl border border-slate-200">
            <input
              type="checkbox"
              checked={requirePharmacy}
              onChange={e => setRequirePharmacy(e.target.checked)}
              className="accent-health-700"
            />
            <span>&gt; 75% Medicine Stock</span>
          </label>
        </div>
      </div>

      {/* Facility Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredFacilities.map(fac => {
          const isBestMatch = fac.isBestMatch;
          const isSelected = fac.id === selectedFacilityId;

          return (
            <div
              key={fac.id}
              onClick={() => setSelectedFacilityId(fac.id)}
              className={`p-6 rounded-3xl bg-white border transition-all duration-200 flex flex-col justify-between shadow-card hover:shadow-card-hover ${
                isBestMatch
                  ? 'border-health-500 ring-2 ring-health-500/20'
                  : isSelected
                  ? 'border-sky-500 ring-2 ring-sky-500/20'
                  : 'border-slate-200'
              }`}
            >
              <div>
                {/* Badge Row */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-500">{fac.type}</span>
                  {isBestMatch && (
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-extrabold rounded-full flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-emerald-600 fill-current" />
                      Best Match
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-slate-900">{fac.name}</h3>
                <p className="text-xs text-slate-600 mt-0.5 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-health-700" />
                  <span>{fac.villageBlock} • {fac.distanceKm} km away</span>
                </p>

                {isBestMatch && (
                  <p className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 mt-3">
                    “Recommended based on acute triage urgency, specialist presence, 15m wait time, and available pharmacy stock.”
                  </p>
                )}

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-4">
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-center">
                    <Stethoscope className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                    <span className="text-xs font-bold block text-slate-900">{fac.availableDoctorsCount} Docs</span>
                    <span className="text-[10px] text-slate-500">Available</span>
                  </div>

                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-center">
                    <Clock className="w-4 h-4 text-sky-600 mx-auto mb-1" />
                    <span className="text-xs font-bold block text-slate-900">{fac.estimatedWaitTimeMinutes}m</span>
                    <span className="text-[10px] text-slate-500">Est. Wait</span>
                  </div>

                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-center">
                    <Pill className="w-4 h-4 text-amber-600 mx-auto mb-1" />
                    <span className="text-xs font-bold block text-slate-900">{fac.medicineAvailabilityPercent}%</span>
                    <span className="text-[10px] text-slate-500">Pharmacy</span>
                  </div>

                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-center">
                    <FlaskConical className="w-4 h-4 text-purple-600 mx-auto mb-1" />
                    <span className="text-xs font-bold block text-slate-900">{fac.diagnosticAvailabilityPercent}%</span>
                    <span className="text-[10px] text-slate-500">Diagnostics</span>
                  </div>
                </div>

                {/* Services List */}
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-600 uppercase">Available Services:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {fac.services.map((srv, i) => (
                      <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-medium rounded-md">
                        ✓ {srv}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-600">{fac.currentQueueLength} active in queue</span>
                <button
                  onClick={() => {
                    bookAppointment('pt-101', fac.id, 'doc-1', '2026-09-07', '11:30 AM', 'Triage Recommendation Consultation');
                    onNavigate('/appointments');
                  }}
                  className="px-4 py-2 rounded-xl bg-health-700 hover:bg-health-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
                >
                  <span>Book Token Here</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
