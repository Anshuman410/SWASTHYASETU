import React, { useState } from 'react';
import { useHealthcare } from '../../context/HealthcareContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import {
  Pill, Search, AlertTriangle, CheckCircle2, Building2 as Hospital, Package,
  RefreshCw, ShieldCheck
} from 'lucide-react';

interface MedicineInventoryPageProps {
  onNavigate: (route: string) => void;
}

export const MedicineInventoryPage: React.FC<MedicineInventoryPageProps> = ({ onNavigate }) => {
  const { medicines, reserveMedicine, facilities } = useHealthcare();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFacilityFilter, setSelectedFacilityFilter] = useState('ALL');

  const filteredMedicines = medicines.filter(m => {
    if (selectedFacilityFilter !== 'ALL' && m.facilityId !== selectedFacilityFilter) return false;
    if (searchQuery && !m.name.toLowerCase().includes(searchQuery.toLowerCase()) && !m.category.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6 animate-letter">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
            Real-Time Pharmacy Inventory Tracking
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-2">Essential Medicine Availability</h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Live stock counts across connected PHC & CHC pharmacies to prevent unnecessary patient travel.
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs font-semibold">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search medicine by name (Paracetamol, Amlodipine, ORS)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-health-600"
          />
        </div>

        <select
          value={selectedFacilityFilter}
          onChange={e => setSelectedFacilityFilter(e.target.value)}
          className="px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold bg-slate-50 focus:outline-none"
        >
          <option value="ALL">All Connected Pharmacies</option>
          {facilities.map(f => (
            <option key={f.id} value={f.id}>{f.name}</option>
          ))}
        </select>
      </div>

      {/* Medicine Cards Inventory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredMedicines.map(med => (
          <div key={med.id} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{med.category}</span>
                <StatusBadge status={med.status} size="sm" />
              </div>

              <h3 className="text-lg font-black text-slate-900">{med.name}</h3>
              <p className="text-xs text-slate-600 mt-0.5 flex items-center gap-1">
                <Hospital className="w-3.5 h-3.5 text-health-700" />
                <span>{med.facilityName}</span>
              </p>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 my-3 space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Available Stock:</span>
                  <span className="font-black text-slate-900 text-sm">{med.quantity} {med.unit}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>Safety Threshold:</span>
                  <span>{med.minThreshold} {med.unit}</span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-600 pt-1 border-t border-slate-200/60">
                  <span>Last Inventory Audit:</span>
                  <span>{med.lastUpdated}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <span className="text-[11px] font-semibold text-slate-500">Govt Free Supply Scheme</span>
              <button
                disabled={med.quantity === 0}
                onClick={() => {
                  reserveMedicine(med.id, 1);
                  alert(`Reserved 1 unit of ${med.name} at ${med.facilityName}`);
                }}
                className="px-3.5 py-2 bg-health-700 hover:bg-health-800 disabled:opacity-40 text-white text-xs font-bold rounded-xl shadow-sm transition-colors"
              >
                {med.quantity === 0 ? 'Out of Stock' : 'Reserve at Pharmacy'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
