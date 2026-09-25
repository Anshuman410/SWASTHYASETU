import React from 'react';
import { useHealthcare } from '../../context/HealthcareContext';
import { useAuth } from '../../context/AuthContext';
import { StatCard } from '../../components/common/StatCard';
import { RiskBadge } from '../../components/common/RiskBadge';
import { StatusBadge } from '../../components/common/StatusBadge';
import {
  Stethoscope, Calendar, ArrowRightLeft, CalendarCheck, Users,
  Activity, Video, Sparkles, ArrowRight, ShieldAlert
} from 'lucide-react';

interface DoctorDashboardProps {
  onNavigate: (route: string) => void;
}

export const DoctorDashboard: React.FC<DoctorDashboardProps> = ({ onNavigate }) => {
  const { appointments, patients, referrals, followUps } = useHealthcare();
  const { currentUser } = useAuth();

  return (
    <div className="space-y-6 animate-letter">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-purple-800 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
            Senior Physician OPD & Specialist Console
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-2">Hi, {currentUser?.name ?? 'Doctor'}</h1>
          <p className="text-xs text-slate-600 mt-0.5">
            General Medicine & Cardiology • PHC Rampur & District Hospital Sitapur Node
          </p>
        </div>

        <button
          onClick={() => onNavigate('/teleconsultation/apt-201')}
          className="px-4 py-2.5 rounded-2xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs flex items-center gap-2 shadow-md"
        >
          <Video className="w-4 h-4" />
          <span>Launch Teleconsultation Room</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard
          title="Today's OPD Appointments"
          value={appointments.length}
          subtitle="Token Queue Active"
          icon={Calendar}
          colorTheme="blue"
          onClick={() => onNavigate('/appointments')}
        />
        <StatCard
          title="High-Risk Priority Queue"
          value={patients.filter(p => p.riskLevel === 'HIGH').length}
          subtitle="Acute Vitals Triage"
          icon={ShieldAlert}
          colorTheme="red"
          onClick={() => onNavigate('/doctor/patient/pt-101')}
        />
        <StatCard
          title="Pending Inflow Referrals"
          value={referrals.length}
          subtitle="District Hospital Track"
          icon={ArrowRightLeft}
          colorTheme="purple"
          onClick={() => onNavigate('/referrals')}
        />
        <StatCard
          title="Follow-ups Due Today"
          value={followUps.length}
          subtitle="ASHA Field Track"
          icon={CalendarCheck}
          colorTheme="amber"
          onClick={() => onNavigate('/follow-ups')}
        />
      </div>

      {/* Priority Patient Queue Table (Level 1 Hierarchy) */}
      <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Activity className="w-5 h-5 text-purple-700" />
            Priority Clinical Patient Queue
          </h3>
          <span className="text-xs text-slate-500 font-medium">Sorted by AI Triage Urgency</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
                <th className="py-3 px-2">Patient</th>
                <th className="py-3 px-2">Age/Gender</th>
                <th className="py-3 px-2">Risk Status</th>
                <th className="py-3 px-2">Presenting Reason</th>
                <th className="py-3 px-2">Latest Vitals</th>
                <th className="py-3 px-2">Token #</th>
                <th className="py-3 px-2 text-right">Clinical Workspace</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {patients.map(p => (
                <tr
                  key={p.id}
                  onClick={() => onNavigate(`/doctor/patient/${p.id}`)}
                  className={`hover:bg-purple-50/50 cursor-pointer ${p.riskLevel === 'HIGH' ? 'bg-rose-50/30' : ''}`}
                >
                  <td className="py-3.5 px-2 font-bold text-slate-900">
                    <span className="block">{p.name}</span>
                    <span className="text-[10px] font-mono text-slate-500">{p.abhaId}</span>
                  </td>
                  <td className="py-3.5 px-2 text-slate-700">{p.age} yrs / {p.gender}</td>
                  <td className="py-3.5 px-2"><RiskBadge level={p.riskLevel} /></td>
                  <td className="py-3.5 px-2 text-slate-800 max-w-xs truncate">
                    {p.riskLevel === 'HIGH' ? 'Acute Chest Discomfort & High BP (148/94)' : 'Routine OPD Checkup'}
                  </td>
                  <td className="py-3.5 px-2 text-slate-700">
                    {p.vitals[0] ? `BP ${p.vitals[0].bpSystolic}/${p.vitals[0].bpDiastolic} • SpO2 ${p.vitals[0].spO2}%` : 'N/A'}
                  </td>
                  <td className="py-3.5 px-2 font-black text-slate-900">#24</td>
                  <td className="py-3.5 px-2 text-right">
                    <button className="px-3.5 py-1.5 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs rounded-xl shadow-sm">
                      Open Workspace →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
