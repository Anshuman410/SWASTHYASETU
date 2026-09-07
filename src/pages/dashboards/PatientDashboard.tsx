import React from 'react';
import { useHealthcare } from '../../context/HealthcareContext';
import { useAuth } from '../../context/AuthContext';
import { StatCard } from '../../components/common/StatCard';
import { StatusBadge } from '../../components/common/StatusBadge';
import {
  Calendar, Ticket, Building2 as Hospital, Pill, ArrowRightLeft, CalendarCheck,
  FileHeart, Stethoscope, ArrowRight, CheckCircle2, Clock, Activity,
  Sparkles
} from 'lucide-react';

interface PatientDashboardProps {
  onNavigate: (route: string) => void;
}

export const PatientDashboard: React.FC<PatientDashboardProps> = ({ onNavigate }) => {
  const { patients, appointments, referrals, followUps } = useHealthcare();
  const { currentUser } = useAuth();
  const patient = patients[0]; // Primary Patient Rahul Kumar
  const nextAppointment = appointments[0] || null;

  const journeySteps = [
    { name: 'Registration', status: 'completed' },
    { name: 'AI Triage', status: 'completed' },
    { name: 'Smart Facility', status: 'completed' },
    { name: 'Appointment', status: 'current' },
    { name: 'Consultation', status: 'pending' },
    { name: 'Diagnostics', status: 'pending' },
    { name: 'Medicine', status: 'pending' },
    { name: 'Referral', status: 'pending' },
    { name: 'Follow-up', status: 'pending' }
  ];

  return (
    <div className="space-y-6 animate-letter">
      {/* Patient Welcome Hero */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-800 via-health-700 to-teal-900 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold px-3 py-1 bg-white/20 backdrop-blur-md rounded-full border border-white/30 text-emerald-100">
            Hi, {currentUser?.name ?? 'Patient'}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-2">“You are taking the next step toward better care.”</h1>
          <p className="text-xs text-emerald-100 mt-1">
            ABHA ID: <span className="font-mono font-bold">{patient.abhaId}</span> • Rampur Village Node • ASHA: Sunita Devi
          </p>
        </div>

        {/* Next Appointment Card */}
        {nextAppointment && (
          <div className="p-4 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 min-w-[260px] space-y-2 text-xs">
            <div className="flex items-center justify-between text-emerald-200 font-bold uppercase text-[10px]">
              <span>Next Upcoming Token</span>
              <Ticket className="w-4 h-4 text-amber-300" />
            </div>
            <p className="text-xl font-black text-amber-300">Token #{nextAppointment.tokenNumber}</p>
            <p className="font-bold text-white">{nextAppointment.doctorName}</p>
            <p className="text-emerald-100 text-[11px]">{nextAppointment.facilityName} • {nextAppointment.timeSlot}</p>
            <div className="pt-1 text-[11px] text-emerald-200 font-medium">Est. Wait: 20 mins ({nextAppointment.patientsAhead} ahead)</div>
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard
          title="Upcoming Appointment"
          value={appointments.length}
          subtitle="Token #24 Confirmed"
          icon={Calendar}
          colorTheme="green"
          onClick={() => onNavigate('/patient/appointments')}
        />
        <StatCard
          title="Pending Referrals"
          value={referrals.length}
          subtitle="District Hospital Sitapur"
          icon={ArrowRightLeft}
          colorTheme="purple"
          onClick={() => onNavigate('/patient/referrals')}
        />
        <StatCard
          title="Follow-ups Due"
          value={followUps.filter(f => f.status === 'Overdue' || f.status === 'Scheduled').length}
          subtitle="Chronic Care Pathway"
          icon={CalendarCheck}
          colorTheme="amber"
          onClick={() => onNavigate('/patient/follow-ups')}
        />
        <StatCard
          title="Active Prescriptions"
          value={2}
          subtitle="Amlodipine & Atorvastatin"
          icon={Pill}
          colorTheme="blue"
          onClick={() => onNavigate('/patient/records')}
        />
      </div>

      {/* "My Healthcare Journey" Timeline Card */}
      <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Activity className="w-5 h-5 text-health-700" />
            My Healthcare Journey Timeline
          </h3>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Step 4 of 9 Active
          </span>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-9 gap-2 pt-2">
          {journeySteps.map((step, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-2xl border text-center transition-all ${
                step.status === 'completed'
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold'
                  : step.status === 'current'
                  ? 'bg-sky-100 border-sky-400 text-sky-900 font-extrabold shadow-md scale-105'
                  : 'bg-slate-50 border-slate-200 text-slate-600'
              }`}
            >
              <div className={`w-5 h-5 rounded-full mx-auto mb-1 flex items-center justify-center text-[10px] ${
                step.status === 'completed' ? 'bg-emerald-600 text-white' : step.status === 'current' ? 'bg-sky-600 text-white' : 'bg-slate-200 text-slate-600'
              }`}>
                {step.status === 'completed' ? '✓' : idx + 1}
              </div>
              <span className="text-[10px] block leading-tight">{step.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Action Grid */}
      <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900">Quick Patient Services</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {[
            { label: 'Book Appointment', route: '/patient/appointments', icon: Calendar, color: 'bg-emerald-50 text-emerald-800' },
            { label: 'Find Smart Facility', route: '/facilities', icon: Hospital, color: 'bg-sky-50 text-sky-800' },
            { label: 'My Health Record', route: '/patient/records', icon: FileHeart, color: 'bg-purple-50 text-purple-800' },
            { label: 'Medicine Stock', route: '/medicines', icon: Pill, color: 'bg-amber-50 text-amber-800' },
            { label: 'Track Referrals', route: '/referrals', icon: ArrowRightLeft, color: 'bg-rose-50 text-rose-800' },
            { label: 'Follow-ups', route: '/follow-ups', icon: CalendarCheck, color: 'bg-teal-50 text-teal-800' }
          ].map((act, i) => {
            const Icon = act.icon;
            return (
              <button
                key={i}
                onClick={() => onNavigate(act.route)}
                className={`p-4 rounded-2xl border border-slate-200 hover:border-slate-300 text-center flex flex-col items-center justify-center space-y-2 transition-all hover:-translate-y-0.5 shadow-card hover:shadow-card-hover ${act.color}`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs font-bold leading-tight">{act.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
