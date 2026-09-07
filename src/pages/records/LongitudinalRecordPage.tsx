import React from 'react';
import { useHealthcare } from '../../context/HealthcareContext';
import { RiskBadge } from '../../components/common/RiskBadge';
import { StatusBadge } from '../../components/common/StatusBadge';
import {
  FileHeart, Activity, Pill, FlaskConical, ArrowRightLeft, ShieldCheck,
  CalendarCheck, Clock, User
} from 'lucide-react';

export const LongitudinalRecordPage: React.FC<{ onNavigate: (route: string) => void }> = ({ onNavigate }) => {
  const { patients, referrals, followUps, diagnosticOrders } = useHealthcare();
  const patient = patients[0]; // Primary Patient Rahul Kumar

  return (
    <div className="space-y-6 animate-letter">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Longitudinal Electronic Health Record (EHR)
            </span>
            <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              Protected Health Information (PHI)
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-2">{patient.name}'s Health Record</h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Continuous medical history from village registration to specialist consultations & lab reports.
          </p>
        </div>

        <RiskBadge level={patient.riskLevel} className="text-sm px-4 py-1.5" />
      </div>

      {/* Profile & Vitals Summary Header */}
      <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h3 className="text-xs font-bold uppercase text-slate-500">Personal Information</h3>
          <p className="text-base font-bold text-slate-900 mt-1">{patient.name} ({patient.age} yrs / {patient.gender})</p>
          <p className="text-xs text-slate-600 mt-0.5">ABHA ID: <span className="font-mono font-bold text-slate-800">{patient.abhaId}</span></p>
          <p className="text-xs text-slate-600">Village: {patient.village} ({patient.block}, Sitapur)</p>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase text-slate-500">Current Medications</h3>
          <div className="space-y-1 mt-1">
            {patient.currentMedicines.map((med, i) => (
              <span key={i} className="inline-block px-2.5 py-1 bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-bold rounded-lg mr-1 mb-1">
                💊 {med}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase text-slate-500">Documented Allergies</h3>
          <div className="space-y-1 mt-1">
            {patient.allergies.map((alg) => (
              <span key={alg.id} className="inline-block px-2.5 py-1 bg-rose-50 text-rose-900 border border-rose-200 text-xs font-bold rounded-lg mr-1 mb-1">
                ⚠️ {alg.allergen} ({alg.severity})
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Stream */}
      <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <FileHeart className="w-5 h-5 text-health-700" />
          Chronological Healthcare Timeline
        </h3>

        <div className="relative pl-6 border-l-2 border-slate-200 space-y-6">
          {/* Event 1: Latest Consultation */}
          <div className="relative">
            <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-health-700 border-2 border-white"></div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900">07 Sep 2026 • General Medicine OPD Consultation</span>
                <span className="text-slate-500">PHC Rampur • Dr. Ramesh Sharma</span>
              </div>
              <p className="text-xs text-slate-700">
                <span className="font-bold">Assessment:</span> Patient evaluated for acute chest discomfort & Stage 1 hypertension. Vitals: BP 148/94, Pulse 88, SpO2 96%.
              </p>
              <p className="text-xs text-emerald-800 font-semibold">
                <span className="font-bold">Prescription:</span> Amlodipine 5mg OD + Atorvastatin 10mg OD.
              </p>
            </div>
          </div>

          {/* Event 2: Referral Dispatched */}
          <div className="relative">
            <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-purple-600 border-2 border-white"></div>
            <div className="p-4 bg-purple-50/50 rounded-2xl border border-purple-200 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-purple-950">07 Sep 2026 • Closed-Loop Cardiology Referral Dispatched</span>
                <StatusBadge status="Accepted" size="sm" />
              </div>
              <p className="text-xs text-purple-900">
                Destination: District Hospital Sitapur for specialist 12-lead ECG & Cardiac Troponin-I test.
              </p>
            </div>
          </div>

          {/* Event 3: AI Triage Run */}
          <div className="relative">
            <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-amber-500 border-2 border-white"></div>
            <div className="p-4 bg-amber-50/50 rounded-2xl border border-amber-200 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-amber-950">07 Sep 2026 • AI-Assisted Triage Performed</span>
                <RiskBadge level="HIGH" />
              </div>
              <p className="text-xs text-amber-900">
                ASHA Sunita recorded symptoms: Chest discomfort, shortness of breath, sweating. Urgency category: HIGH.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
