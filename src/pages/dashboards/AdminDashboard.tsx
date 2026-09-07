import React from 'react';
import { useHealthcare } from '../../context/HealthcareContext';
import { StatCard } from '../../components/common/StatCard';
import { LeafletMap } from '../../components/common/LeafletMap';
import {
  BarChart3, Users, Hospital, ArrowRightLeft, CalendarCheck, Clock,
  AlertTriangle, ShieldCheck, TrendingUp, Activity, Pill
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, CartesianGrid } from 'recharts';

interface AdminDashboardProps {
  onNavigate: (route: string) => void;
}

const mockPatientVolumeData = [
  { day: 'Mon', volume: 120, referrals: 14 },
  { day: 'Tue', volume: 145, referrals: 18 },
  { day: 'Wed', volume: 160, referrals: 22 },
  { day: 'Thu', volume: 135, referrals: 16 },
  { day: 'Fri', volume: 175, referrals: 25 },
  { day: 'Sat', volume: 190, referrals: 30 },
  { day: 'Sun', volume: 110, referrals: 10 }
];

const mockStockoutTrendData = [
  { week: 'W1', stockouts: 12 },
  { week: 'W2', stockouts: 9 },
  { week: 'W3', stockouts: 6 },
  { week: 'W4', stockouts: 2 }
];

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const { facilities, patients, referrals, followUps, auditLogs } = useHealthcare();

  return (
    <div className="space-y-6 animate-letter">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-rose-800 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
            District Health Authority Operations Center
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-2">Sitapur District Operations Dashboard</h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Aggregated public health metrics, facility capacity, and closed-loop audit logging.
          </p>
        </div>

        <button
          onClick={() => onNavigate('/admin/audit-logs')}
          className="px-4 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 shadow-md"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>View Security Audit Logs</span>
        </button>
      </div>

      {/* Operational Alert Cards (Section 22) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-xs space-y-1">
          <div className="flex items-center gap-1.5 text-rose-800 font-extrabold">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            <span>Referral Escalation Alert</span>
          </div>
          <p className="text-rose-950 font-bold text-sm">2 Referrals Overdue</p>
          <p className="text-rose-700 text-[11px]">Exceeded 48h resolution SLA at District Hospital</p>
        </div>

        <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-xs space-y-1">
          <div className="flex items-center gap-1.5 text-amber-800 font-extrabold">
            <Pill className="w-4 h-4 text-amber-600" />
            <span>Pharmacy Stock Alert</span>
          </div>
          <p className="text-amber-950 font-bold text-sm">1 Low Drug Threshold</p>
          <p className="text-amber-700 text-[11px]">Amoxicillin stock low at PHC Rampur</p>
        </div>

        <div className="p-4 bg-sky-50 border border-sky-200 rounded-2xl text-xs space-y-1">
          <div className="flex items-center gap-1.5 text-sky-800 font-extrabold">
            <Clock className="w-4 h-4 text-sky-600" />
            <span>OPD Wait Time Monitor</span>
          </div>
          <p className="text-sky-950 font-bold text-sm">18.5 Min Avg Wait</p>
          <p className="text-sky-700 text-[11px]">Optimal load across 6 connected facilities</p>
        </div>

        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs space-y-1">
          <div className="flex items-center gap-1.5 text-emerald-800 font-extrabold">
            <CalendarCheck className="w-4 h-4 text-emerald-600" />
            <span>High-Risk Follow-ups</span>
          </div>
          <p className="text-emerald-950 font-bold text-sm">3 Care Visits Scheduled</p>
          <p className="text-emerald-700 text-[11px]">ASHA field workers assigned in sector</p>
        </div>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard title="Registered Patients" value={patients.length} subtitle="Sitapur Zone" icon={Users} colorTheme="green" />
        <StatCard title="Active Facilities" value={facilities.length} subtitle="PHCs & CHCs" icon={Hospital} colorTheme="blue" />
        <StatCard title="Closed-Loop Referrals" value={referrals.length} subtitle="88% Resolved" icon={ArrowRightLeft} colorTheme="purple" />
        <StatCard title="Follow-up Rate" value="94%" subtitle="Maternal & NCD" icon={Activity} colorTheme="amber" />
      </div>

      {/* Recharts Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Patient Volume & Referral Inflow Chart */}
        <div className="lg:col-span-7 p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-health-700" />
              District Patient OPD Volume & Referral Inflow
            </h3>
            <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">Simulated Demo Metrics</span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockPatientVolumeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="day" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip />
                <Bar dataKey="volume" fill="#059669" radius={[6, 6, 0, 0]} name="OPD Patient Volume" />
                <Bar dataKey="referrals" fill="#7c3aed" radius={[6, 6, 0, 0]} name="Closed-Loop Referrals" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Medicine Stockout Trend Chart */}
        <div className="lg:col-span-5 p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Pill className="w-4 h-4 text-amber-700" />
              Medicine Stockout Reductions
            </h3>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">-83% Stockouts</span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockStockoutTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="week" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip />
                <Line type="monotone" dataKey="stockouts" stroke="#d97706" strokeWidth={3} dot={{ r: 5 }} name="Stockout Incidents" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* District Facility Map Overview */}
      <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900">District Facility Capacity Map</h3>
        <LeafletMap facilities={facilities} height="320px" />
      </div>
    </div>
  );
};
