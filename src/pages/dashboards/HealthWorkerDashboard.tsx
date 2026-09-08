import React, { useState } from 'react';
import { useHealthcare } from '../../context/HealthcareContext';
import { useAuth } from '../../context/AuthContext';
import { StatCard } from '../../components/common/StatCard';
import { StatusBadge } from '../../components/common/StatusBadge';
import { RiskBadge } from '../../components/common/RiskBadge';
import { Modal } from '../../components/common/Modal';
import {
  Users, Stethoscope, ArrowRightLeft, CalendarCheck, UserPlus,
  AlertTriangle, CheckCircle2, Clock, Activity, Plus, Search
} from 'lucide-react';

interface HealthWorkerDashboardProps {
  onNavigate: (route: string) => void;
}

export const HealthWorkerDashboard: React.FC<HealthWorkerDashboardProps> = ({ onNavigate }) => {
  const { patients, referrals, followUps, registerPatient } = useHealthcare();
  const { currentUser } = useAuth();

  const [showRegModal, setShowRegModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('rahul@123');
  const [age, setAge] = useState(28);
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [phone, setPhone] = useState('+91 ');
  const [village, setVillage] = useState('Rampur');
  const [bloodGroup, setBloodGroup] = useState('B+');
  const [emergencyContact, setEmergencyContact] = useState('+91 ');

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerPatient({ 
      name, 
      email: email.trim() || undefined, 
      password: password.trim() || 'rahul@123',
      age, 
      gender, 
      phone, 
      village,
      bloodGroup,
      emergencyContact,
      assignedHealthWorker: currentUser?.name || 'Sunita Devi (ASHA)'
    });
    setShowRegModal(false);
    setName('');
    setEmail('');
    setPhone('+91 ');
  };

  return (
    <div className="space-y-6 animate-letter">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-sky-800 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-200">
            ASHA / ANM Field Operations Console
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-2">Hi, {currentUser?.name ?? 'Health Worker'}</h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Assigned Village Sector: Rampur Block • Sitapur District Zone
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowRegModal(true)}
            className="px-4 py-2.5 rounded-2xl bg-health-700 hover:bg-health-800 text-white font-bold text-xs flex items-center gap-2 shadow-md"
          >
            <UserPlus className="w-4 h-4" />
            <span>Register New Patient</span>
          </button>
          <button
            onClick={() => onNavigate('/triage')}
            className="px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs flex items-center gap-2 shadow-md"
          >
            <Stethoscope className="w-4 h-4" />
            <span>Start AI Triage</span>
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard
          title="Registered Patients"
          value={patients.length}
          subtitle="Rampur Sector"
          icon={Users}
          colorTheme="green"
          onClick={() => onNavigate('/health-worker/patients')}
        />
        <StatCard
          title="High-Risk Cases"
          value={patients.filter(p => p.riskLevel === 'HIGH').length}
          subtitle="Requires Immediate Action"
          icon={AlertTriangle}
          colorTheme="red"
          onClick={() => onNavigate('/triage')}
        />
        <StatCard
          title="Follow-ups Due Today"
          value={followUps.filter(f => f.status === 'Scheduled' || f.status === 'Overdue').length}
          subtitle="Maternal & Chronic"
          icon={CalendarCheck}
          colorTheme="amber"
          onClick={() => onNavigate('/follow-ups')}
        />
        <StatCard
          title="Active Referrals"
          value={referrals.length}
          subtitle="District Hospital Track"
          icon={ArrowRightLeft}
          colorTheme="purple"
          onClick={() => onNavigate('/referrals')}
        />
      </div>

      {/* Field Work Priority Task List */}
      <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900">Today's Field Action Checklist</h3>

        <div className="space-y-2">
          <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 bg-rose-600 text-white font-black text-[10px] rounded-lg">HIGH PRIORITY</span>
              <div>
                <span className="font-bold text-rose-950 text-sm block">Rahul Kumar</span>
                <span className="text-rose-800 text-[11px]">Follow-up overdue by 2 days • Chronic BP check required</span>
              </div>
            </div>
            <button
              onClick={() => onNavigate('/follow-ups')}
              className="px-3 py-1.5 bg-rose-700 text-white rounded-xl font-bold hover:bg-rose-800"
            >
              Contact Patient →
            </button>
          </div>

          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 bg-amber-600 text-white font-black text-[10px] rounded-lg">MEDIUM</span>
              <div>
                <span className="font-bold text-amber-950 text-sm block">Sita Devi</span>
                <span className="text-amber-800 text-[11px]">2nd Trimester ANC Checkup due tomorrow</span>
              </div>
            </div>
            <button
              onClick={() => onNavigate('/follow-ups')}
              className="px-3 py-1.5 bg-amber-800 text-white rounded-xl font-bold hover:bg-amber-900"
            >
              Schedule Visit →
            </button>
          </div>

          <div className="p-4 bg-sky-50 rounded-2xl border border-sky-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 bg-sky-600 text-white font-black text-[10px] rounded-lg">LOW</span>
              <div>
                <span className="font-bold text-sky-950 text-sm block">Amit Verma</span>
                <span className="text-sky-800 text-[11px]">Booster vaccination dose scheduled for next week</span>
              </div>
            </div>
            <button
              onClick={() => onNavigate('/follow-ups')}
              className="px-3 py-1.5 bg-sky-700 text-white rounded-xl font-bold hover:bg-sky-800"
            >
              View Record →
            </button>
          </div>
        </div>
      </div>

      {/* Patient Master Table */}
      <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900">Rampur Village Patient Register</h3>
          <button
            onClick={() => setShowRegModal(true)}
            className="text-xs font-bold text-health-700 hover:underline"
          >
            + Register New
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
                <th className="py-3 px-2">Patient Name</th>
                <th className="py-3 px-2">ABHA ID</th>
                <th className="py-3 px-2">Age/Gender</th>
                <th className="py-3 px-2">Risk Level</th>
                <th className="py-3 px-2">Pathway</th>
                <th className="py-3 px-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {patients.map(p => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="py-3 px-2 font-bold text-slate-900">{p.name}</td>
                  <td className="py-3 px-2 font-mono text-slate-700">{p.abhaId}</td>
                  <td className="py-3 px-2 text-slate-700">{p.age} yrs / {p.gender}</td>
                  <td className="py-3 px-2"><RiskBadge level={p.riskLevel} /></td>
                  <td className="py-3 px-2 text-slate-700">{p.carePathway || 'General'}</td>
                  <td className="py-3 px-2 text-right space-x-1">
                    <button
                      onClick={() => onNavigate('/triage')}
                      className="px-2.5 py-1 bg-amber-100 text-amber-900 font-bold rounded-lg text-[11px]"
                    >
                      AI Triage
                    </button>
                    <button
                      onClick={() => onNavigate('/doctor/patient/' + p.id)}
                      className="px-2.5 py-1 bg-slate-100 text-slate-800 font-bold rounded-lg text-[11px]"
                    >
                      Record
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Patient Registration Modal */}
      <Modal
        isOpen={showRegModal}
        onClose={() => setShowRegModal(false)}
        title="Register New Patient"
        subtitle="Create digital health profile and login credentials for patient"
        maxWidth="lg"
      >
        <form onSubmit={handleRegisterSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Full Patient Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Laxmi Devi"
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-health-500/20 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Patient Email (For Login)</label>
              <input
                type="email"
                placeholder="e.g. laxmi@gmail.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-health-500/20 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Patient Password</label>
              <input
                type="text"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-health-500/20 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Age</label>
              <input
                type="number"
                min="1"
                max="120"
                value={age}
                onChange={e => setAge(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-health-500/20 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Gender</label>
              <select
                value={gender}
                onChange={e => setGender(e.target.value as any)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl font-semibold bg-white focus:ring-2 focus:ring-health-500/20 focus:outline-none"
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Blood Group</label>
              <select
                value={bloodGroup}
                onChange={e => setBloodGroup(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl font-semibold bg-white focus:ring-2 focus:ring-health-500/20 focus:outline-none"
              >
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Mobile Contact</label>
              <input
                type="text"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-health-500/20 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Emergency Contact</label>
              <input
                type="text"
                placeholder="Relative / Guardian phone"
                value={emergencyContact}
                onChange={e => setEmergencyContact(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-health-500/20 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Village / Sector</label>
            <input
              type="text"
              value={village}
              onChange={e => setVillage(e.target.value)}
              placeholder="e.g. Rampur"
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-health-500/20 focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setShowRegModal(false)}
              className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-health-700 hover:bg-health-800 text-white font-bold text-xs shadow-md cursor-pointer transition-colors"
            >
              Register Patient & Create Account
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
