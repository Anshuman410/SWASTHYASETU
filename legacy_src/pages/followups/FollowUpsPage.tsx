import React, { useState } from 'react';
import { useHealthcare } from '../../context/HealthcareContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { RiskBadge } from '../../components/common/RiskBadge';
import {
  CalendarCheck, AlertTriangle, HeartPulse, Baby, Activity,
  Phone, UserCheck, ShieldAlert, CheckCircle2, Clock
} from 'lucide-react';

interface FollowUpsPageProps {
  onNavigate: (route: string) => void;
}

export const FollowUpsPage: React.FC<FollowUpsPageProps> = ({ onNavigate }) => {
  const { followUps } = useHealthcare();
  const [selectedPathway, setSelectedPathway] = useState<string>('ALL');

  const filteredFollowUps = followUps.filter(f => {
    if (selectedPathway !== 'ALL' && !f.pathway.includes(selectedPathway)) return false;
    return true;
  });

  return (
    <div className="space-y-6 animate-letter">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
            Targeted Field Intervention Pathways
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-2">Follow-up & High-Risk Care Pathways</h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Maternal ANC tracking, Child growth/vaccination, and Chronic Non-Communicable Disease (NCD) continuity.
          </p>
        </div>
      </div>

      {/* Pathway Quick Filter Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { key: 'ALL', label: 'All Pathways', icon: CalendarCheck, color: 'bg-slate-900 text-white' },
          { key: 'Maternal', label: 'Maternal ANC Pathway', icon: HeartPulse, color: 'bg-rose-50 text-rose-800 border-rose-200' },
          { key: 'Child', label: 'Child Immunization', icon: Baby, color: 'bg-sky-50 text-sky-800 border-sky-200' },
          { key: 'Chronic', label: 'Chronic BP / Diabetes', icon: Activity, color: 'bg-amber-50 text-amber-900 border-amber-200' }
        ].map(p => {
          const Icon = p.icon;
          const isSelected = selectedPathway === p.key;

          return (
            <button
              key={p.key}
              onClick={() => setSelectedPathway(p.key)}
              className={`p-4 rounded-2xl border transition-all text-left flex items-center gap-3 ${
                isSelected ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className={`p-2 rounded-xl ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold leading-tight">{p.label}</span>
            </button>
          );
        })}
      </div>

      {/* Specific Care Pathway Workflows Info Box */}
      <div className="p-5 rounded-3xl bg-slate-900 text-white space-y-3">
        <h4 className="text-xs font-black uppercase tracking-wider text-emerald-400">Structured Public Health Protocol Pathways:</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-white/10 rounded-2xl border border-white/10">
            <span className="font-bold text-rose-300 block mb-1">🤰 MATERNAL ANC PATHWAY:</span>
            <p className="text-[11px] text-slate-300">Pregnancy Reg → ANC 1 to 4 → High Risk Screening → Facility Delivery → Postnatal Follow-up</p>
          </div>
          <div className="p-3 bg-white/10 rounded-2xl border border-white/10">
            <span className="font-bold text-sky-300 block mb-1">👶 CHILD CARE PATHWAY:</span>
            <p className="text-[11px] text-slate-300">Birth Weight → Immunization Schedule → Growth Monitoring → Malnutrition Screening → Follow-up</p>
          </div>
          <div className="p-3 bg-white/10 rounded-2xl border border-white/10">
            <span className="font-bold text-amber-300 block mb-1">🩺 CHRONIC NCD PATHWAY:</span>
            <p className="text-[11px] text-slate-300">BP & Blood Glucose → Medication Compliance → Quarterly Lab Checks → Overdue Escalation</p>
          </div>
        </div>
      </div>

      {/* Follow-up Cards Feed */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredFollowUps.map(flw => {
          const isOverdue = flw.status === 'Overdue';

          return (
            <div
              key={flw.id}
              className={`p-5 rounded-3xl bg-white border transition-all shadow-card hover:shadow-card-hover ${
                isOverdue ? 'border-rose-300 ring-2 ring-rose-500/10' : 'border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-slate-100 text-slate-700">
                  {flw.pathway}
                </span>
                <div className="flex items-center gap-2">
                  <RiskBadge level={flw.riskLevel} />
                  <StatusBadge status={flw.status} size="sm" />
                </div>
              </div>

              <h3 className="text-base font-bold text-slate-900">{flw.patientName} ({flw.patientAge} yrs)</h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Village: <span className="font-semibold text-slate-800">{flw.village}</span> • Contact: <span className="font-mono text-slate-800">{flw.patientPhone}</span>
              </p>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 my-3 text-xs space-y-1">
                <p className="font-semibold text-slate-800">Care Action: {flw.notes}</p>
                <p className="text-slate-600 text-[11px]">Due Date: <span className={`font-bold ${isOverdue ? 'text-rose-700' : 'text-slate-800'}`}>{flw.dueDate}</span></p>
                <p className="text-slate-600 text-[11px]">Assigned ASHA Worker: <span className="font-bold text-slate-800">{flw.assignedWorkerName}</span></p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => alert(`Calling patient ${flw.patientName} at ${flw.patientPhone}`)}
                  className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold text-xs rounded-xl flex items-center gap-1"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Contact Patient</span>
                </button>

                <button
                  onClick={() => onNavigate(`/doctor/patient/${flw.patientId}`)}
                  className="px-3 py-1.5 bg-health-700 hover:bg-health-800 text-white font-bold text-xs rounded-xl"
                >
                  View Health Record →
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
