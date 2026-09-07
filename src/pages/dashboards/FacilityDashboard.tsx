import React from 'react';
import { useHealthcare } from '../../context/HealthcareContext';
import { StatCard } from '../../components/common/StatCard';
import { StatusBadge } from '../../components/common/StatusBadge';
import {
  Hospital, Users, Clock, Pill, FlaskConical, ArrowRightLeft,
  Volume2, CheckCircle2, AlertTriangle, Stethoscope
} from 'lucide-react';

interface FacilityDashboardProps {
  onNavigate: (route: string) => void;
}

export const FacilityDashboard: React.FC<FacilityDashboardProps> = ({ onNavigate }) => {
  const { facilities, appointments, callNextToken, medicines } = useHealthcare();
  const facility = facilities[0]; // PHC Rampur

  return (
    <div className="space-y-6 animate-letter">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
            Public Health Centre Desk Operations
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-2">{facility.name} Desk</h1>
          <p className="text-xs text-slate-600 mt-0.5">
            {facility.type} • {facility.villageBlock} • Live Queue & Inventory Operations
          </p>
        </div>

        <button
          onClick={() => callNextToken(facility.id)}
          className="px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs flex items-center gap-2 shadow-md"
        >
          <Volume2 className="w-4 h-4" />
          <span>Call Next OPD Token</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard
          title="Current Active Queue"
          value={`${facility.currentQueueLength} Patients`}
          subtitle={`Est Wait: ${facility.estimatedWaitTimeMinutes} mins`}
          icon={Users}
          colorTheme="amber"
          onClick={() => onNavigate('/facility/queue')}
        />
        <StatCard
          title="Available Doctors"
          value={`${facility.availableDoctorsCount} On Duty`}
          subtitle="General & Cardiology"
          icon={Stethoscope}
          colorTheme="green"
          onClick={() => onNavigate('/appointments')}
        />
        <StatCard
          title="Pharmacy Stock Level"
          value={`${facility.medicineAvailabilityPercent}%`}
          subtitle="Essential Drugs In-Stock"
          icon={Pill}
          colorTheme="blue"
          onClick={() => onNavigate('/medicines')}
        />
        <StatCard
          title="Diagnostic Capacity"
          value={`${facility.diagnosticAvailabilityPercent}%`}
          subtitle="Pathology & ECG Open"
          icon={FlaskConical}
          colorTheme="purple"
          onClick={() => onNavigate('/diagnostics')}
        />
      </div>

      {/* Operational Department Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* General Medicine OPD */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">OPD Consultation</span>
            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">Doctor Available</span>
          </div>
          <h3 className="text-base font-bold text-slate-900">General Medicine Room 1</h3>
          <p className="text-xs text-slate-600">Active Queue: <span className="font-bold text-slate-900">4 Waiting</span></p>
          <p className="text-[11px] text-slate-500">Currently Serving Token #18</p>
          <button
            onClick={() => callNextToken(facility.id)}
            className="w-full py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800"
          >
            Advance Queue Token
          </button>
        </div>

        {/* Pathology Lab */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Pathology Lab</span>
            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">Open</span>
          </div>
          <h3 className="text-base font-bold text-slate-900">Basic Diagnostics Unit</h3>
          <p className="text-xs text-slate-600">Available Slots Today: <span className="font-bold text-slate-900">8 Slots</span></p>
          <p className="text-[11px] text-slate-500">CBC, Blood Sugar & Urine Analysis</p>
          <button
            onClick={() => onNavigate('/diagnostics')}
            className="w-full py-2 bg-slate-100 text-slate-800 rounded-xl text-xs font-bold hover:bg-slate-200"
          >
            Manage Diagnostics →
          </button>
        </div>

        {/* Pharmacy Counter */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Pharmacy Counter</span>
            <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">88% Stocked</span>
          </div>
          <h3 className="text-base font-bold text-slate-900">Central Drug Dispensary</h3>
          <p className="text-xs text-slate-600">1 Item Low Stock: <span className="font-bold text-rose-700">Amoxicillin</span></p>
          <p className="text-[11px] text-slate-500">450 Paracetamol & 180 Amlodipine Ready</p>
          <button
            onClick={() => onNavigate('/medicines')}
            className="w-full py-2 bg-slate-100 text-slate-800 rounded-xl text-xs font-bold hover:bg-slate-200"
          >
            Open Drug Stock Room →
          </button>
        </div>
      </div>
    </div>
  );
};
