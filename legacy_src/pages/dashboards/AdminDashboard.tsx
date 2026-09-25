import React, { useState } from 'react';
import { useHealthcare } from '../../context/HealthcareContext';
import { useAuth } from '../../context/AuthContext';
import { StatCard } from '../../components/common/StatCard';
import { LeafletMap } from '../../components/common/LeafletMap';
import { Modal } from '../../components/common/Modal';
import { Doctor, Facility, FacilityType } from '../../types';
import {
  Users, Building2 as Hospital, ArrowRightLeft, CalendarCheck, Clock,
  AlertTriangle, ShieldCheck, TrendingUp, Activity, Pill, Plus, Trash2,
  Stethoscope, UserCheck, Phone, Mail, MapPin, Award
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
  const { 
    facilities, patients, referrals, doctors,
    addDoctor, removeDoctor,
    addFacility, removeFacility,
    addWorkerOrStaff, removeWorkerOrStaff
  } = useHealthcare();

  const { users } = useAuth();

  // Tab navigation for Management Center
  const [activeTab, setActiveTab] = useState<'doctors' | 'hospitals' | 'workers' | 'staff'>('doctors');

  // Modals state
  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [showHospitalModal, setShowHospitalModal] = useState(false);
  const [showWorkerModal, setShowWorkerModal] = useState(false);
  const [showStaffModal, setShowStaffModal] = useState(false);

  // Doctor Form State
  const [docName, setDocName] = useState('');
  const [docEmail, setDocEmail] = useState('');
  const [docPassword, setDocPassword] = useState('doctor@123');
  const [docPhone, setDocPhone] = useState('');
  const [docSpecialty, setDocSpecialty] = useState('General Medicine');
  const [docFacilityId, setDocFacilityId] = useState(facilities[0]?.id || '');
  const [docExperience, setDocExperience] = useState(5);

  // Hospital Form State
  const [facName, setFacName] = useState('');
  const [facType, setFacType] = useState<FacilityType>('Primary Health Centre (PHC)');
  const [facVillage, setFacVillage] = useState('');
  const [facPhone, setFacPhone] = useState('');
  const [facLat, setFacLat] = useState(26.85);
  const [facLng, setFacLng] = useState(80.95);
  const [facServices, setFacServices] = useState('OPD, Emergency, Maternal Care, Pharmacy');

  // ASHA Worker Form State
  const [workerName, setWorkerName] = useState('');
  const [workerEmail, setWorkerEmail] = useState('');
  const [workerPassword, setWorkerPassword] = useState('asha@123');
  const [workerPhone, setWorkerPhone] = useState('');
  const [workerVillage, setWorkerVillage] = useState('');

  // Facility Staff Form State
  const [staffName, setStaffName] = useState('');
  const [staffEmail, setStaffEmail] = useState('');
  const [staffPassword, setStaffPassword] = useState('facility@123');
  const [staffPhone, setStaffPhone] = useState('');
  const [staffFacilityId, setStaffFacilityId] = useState(facilities[0]?.id || '');

  // Derived lists from users database
  const ashaWorkers = users.filter(u => u.role === 'health-worker');
  const facilityStaffList = users.filter(u => u.role === 'facility');

  const handleAddDoctor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docName.trim() || !docEmail.trim()) return;

    const targetFac = facilities.find(f => f.id === docFacilityId) || facilities[0];

    addDoctor({
      name: docName.trim(),
      email: docEmail.trim(),
      phone: docPhone.trim() || '+91 99887 00000',
      specialty: docSpecialty,
      facilityId: targetFac.id,
      facilityName: targetFac.name,
      availableToday: true,
      activeQueueCount: 0,
      experienceYears: Number(docExperience) || 3
    }, docPassword);

    // Reset and close
    setDocName('');
    setDocEmail('');
    setDocPhone('');
    setShowDoctorModal(false);
  };

  const handleAddHospital = (e: React.FormEvent) => {
    e.preventDefault();
    if (!facName.trim()) return;

    addFacility({
      name: facName.trim(),
      type: facType,
      villageBlock: facVillage.trim() || 'Sitapur District',
      distanceKm: 5.0,
      lat: Number(facLat) || 26.85,
      lng: Number(facLng) || 80.95,
      availableDoctorsCount: 1,
      currentQueueLength: 0,
      estimatedWaitTimeMinutes: 10,
      medicineAvailabilityPercent: 95,
      diagnosticAvailabilityPercent: 88,
      services: facServices.split(',').map(s => s.trim()).filter(Boolean),
      phone: facPhone.trim() || '+91 522 2200000'
    });

    setFacName('');
    setFacVillage('');
    setFacPhone('');
    setShowHospitalModal(false);
  };

  const handleAddWorker = (e: React.FormEvent) => {
    e.preventDefault();
    if (!workerName.trim() || !workerEmail.trim()) return;

    addWorkerOrStaff({
      name: workerName.trim(),
      email: workerEmail.trim(),
      phone: workerPhone.trim() || '+91 98000 00000',
      password: workerPassword,
      role: 'health-worker',
      assignedVillage: workerVillage.trim() || 'Rampur'
    });

    setWorkerName('');
    setWorkerEmail('');
    setWorkerPhone('');
    setWorkerVillage('');
    setShowWorkerModal(false);
  };

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!staffName.trim() || !staffEmail.trim()) return;

    addWorkerOrStaff({
      name: staffName.trim(),
      email: staffEmail.trim(),
      phone: staffPhone.trim() || '+91 98111 00000',
      password: staffPassword,
      role: 'facility',
      facilityId: staffFacilityId
    });

    setStaffName('');
    setStaffEmail('');
    setStaffPhone('');
    setShowStaffModal(false);
  };

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
            Aggregated public health metrics, clinical workforce management, facility capacity, and closed-loop audit logging.
          </p>
        </div>

        <button
          onClick={() => onNavigate('/admin/audit-logs')}
          className="px-4 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 shadow-md cursor-pointer transition-colors"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>View Security Audit Logs</span>
        </button>
      </div>

      {/* Operational Alert Cards */}
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
          <p className="text-sky-700 text-[11px]">Optimal load across connected facilities</p>
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
        <StatCard title="Active Facilities" value={facilities.length} subtitle="Hospitals & Centres" icon={Hospital} colorTheme="blue" />
        <StatCard title="Active Doctors" value={doctors.length} subtitle="Across All Facilities" icon={Stethoscope} colorTheme="purple" />
        <StatCard title="Health Workers" value={ashaWorkers.length} subtitle="Frontline ASHA Network" icon={UserCheck} colorTheme="amber" />
      </div>

      {/* ========================================================================= */}
      {/* ADMINISTRATIVE MANAGEMENT SECTION (DOCTORS, HOSPITALS, ASHA, STAFF) */}
      {/* ========================================================================= */}
      <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-health-700" />
              Administrative Governance & Workforce Management
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Add and manage credentialed healthcare personnel, hospitals, and field workers
            </p>
          </div>

          {/* Action button corresponding to active tab */}
          <div>
            {activeTab === 'doctors' && (
              <button
                onClick={() => setShowDoctorModal(true)}
                className="px-4 py-2 bg-health-700 hover:bg-health-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Doctor</span>
              </button>
            )}
            {activeTab === 'hospitals' && (
              <button
                onClick={() => setShowHospitalModal(true)}
                className="px-4 py-2 bg-sky-700 hover:bg-sky-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Hospital / Centre</span>
              </button>
            )}
            {activeTab === 'workers' && (
              <button
                onClick={() => setShowWorkerModal(true)}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add ASHA Worker</span>
              </button>
            )}
            {activeTab === 'staff' && (
              <button
                onClick={() => setShowStaffModal(true)}
                className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Facility Staff</span>
              </button>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('doctors')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'doctors' ? 'bg-health-700 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Stethoscope className="w-4 h-4" />
            <span>Doctors ({doctors.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('hospitals')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'hospitals' ? 'bg-sky-700 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Hospital className="w-4 h-4" />
            <span>Hospitals & Facilities ({facilities.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('workers')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'workers' ? 'bg-emerald-700 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>ASHA Health Workers ({ashaWorkers.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('staff')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'staff' ? 'bg-purple-700 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Facility Desk Staff ({facilityStaffList.length})</span>
          </button>
        </div>

        {/* TAB 1: DOCTORS TABLE */}
        {activeTab === 'doctors' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider bg-slate-50/50">
                  <th className="py-3 px-3">Doctor Name</th>
                  <th className="py-3 px-3">Specialization</th>
                  <th className="py-3 px-3">Hospital Assigned</th>
                  <th className="py-3 px-3">Email & Contact</th>
                  <th className="py-3 px-3">Experience</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {doctors.map(doc => (
                  <tr key={doc.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-health-100 text-health-800 font-black flex items-center justify-center text-xs">
                          {doc.name.substring(0, 2)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{doc.name}</p>
                          <span className="text-[10px] text-slate-400">ID: {doc.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2.5 py-1 rounded-full bg-purple-50 text-purple-800 font-semibold border border-purple-200 text-[11px]">
                        {doc.specialty}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-medium text-slate-700">
                      {doc.facilityName}
                    </td>
                    <td className="py-3 px-3 text-slate-600">
                      <p className="font-medium text-slate-800">{doc.email || 'doctor@swasthyasetu.ac.in'}</p>
                      <p className="text-[11px] text-slate-500">{doc.phone}</p>
                    </td>
                    <td className="py-3 px-3 font-semibold text-slate-700">
                      {doc.experienceYears} Years
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => removeDoctor(doc.id)}
                        className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 hover:text-rose-700 transition-colors cursor-pointer"
                        title="Remove Doctor"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 2: HOSPITALS & FACILITIES TABLE */}
        {activeTab === 'hospitals' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider bg-slate-50/50">
                  <th className="py-3 px-3">Facility Name</th>
                  <th className="py-3 px-3">Facility Type</th>
                  <th className="py-3 px-3">Location Block</th>
                  <th className="py-3 px-3">Available Doctors</th>
                  <th className="py-3 px-3">Services Available</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {facilities.map(fac => (
                  <tr key={fac.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <Hospital className="w-4 h-4 text-sky-700 shrink-0" />
                        <div>
                          <p className="font-bold text-slate-900">{fac.name}</p>
                          <span className="text-[10px] text-slate-400">Phone: {fac.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-lg bg-sky-50 text-sky-800 font-semibold text-[11px] border border-sky-200">
                        {fac.type}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-700 font-medium">
                      {fac.villageBlock}
                    </td>
                    <td className="py-3 px-3 font-semibold text-slate-800">
                      {fac.availableDoctorsCount} on duty
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {fac.services?.slice(0, 3).map((s, idx) => (
                          <span key={idx} className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px]">
                            {s}
                          </span>
                        ))}
                        {(fac.services?.length || 0) > 3 && (
                          <span className="text-[10px] text-slate-500">+{fac.services.length - 3} more</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => removeFacility(fac.id)}
                        className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 hover:text-rose-700 transition-colors cursor-pointer"
                        title="Remove Facility"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 3: ASHA WORKERS TABLE */}
        {activeTab === 'workers' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider bg-slate-50/50">
                  <th className="py-3 px-3">Worker Name</th>
                  <th className="py-3 px-3">Assigned Village</th>
                  <th className="py-3 px-3">Email ID</th>
                  <th className="py-3 px-3">Phone</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {ashaWorkers.map(w => (
                  <tr key={w.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <UserCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                        <div>
                          <p className="font-bold text-slate-900">{w.name}</p>
                          <span className="text-[10px] text-slate-400">ID: {w.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 font-semibold text-emerald-800">
                      {w.assignedVillage || 'Sitapur Sector'}
                    </td>
                    <td className="py-3 px-3 font-medium text-slate-700">
                      {w.email}
                    </td>
                    <td className="py-3 px-3 text-slate-600">
                      {w.phone}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => removeWorkerOrStaff(w.id)}
                        className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 hover:text-rose-700 transition-colors cursor-pointer"
                        title="Remove Worker"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 4: FACILITY STAFF TABLE */}
        {activeTab === 'staff' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider bg-slate-50/50">
                  <th className="py-3 px-3">Staff Name</th>
                  <th className="py-3 px-3">Assigned Facility</th>
                  <th className="py-3 px-3">Email ID</th>
                  <th className="py-3 px-3">Contact</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {facilityStaffList.map(s => {
                  const fac = facilities.find(f => f.id === s.facilityId);
                  return (
                    <tr key={s.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-purple-600 shrink-0" />
                          <div>
                            <p className="font-bold text-slate-900">{s.name}</p>
                            <span className="text-[10px] text-slate-400">ID: {s.id}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3 font-semibold text-purple-800">
                        {fac ? fac.name : 'General Facility Desk'}
                      </td>
                      <td className="py-3 px-3 font-medium text-slate-700">
                        {s.email}
                      </td>
                      <td className="py-3 px-3 text-slate-600">
                        {s.phone}
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => removeWorkerOrStaff(s.id)}
                          className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 hover:text-rose-700 transition-colors cursor-pointer"
                          title="Remove Staff"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Patient Volume & Referral Inflow Chart */}
        <div className="lg:col-span-7 p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-health-700" />
              District Patient OPD Volume & Referral Inflow
            </h3>
            <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">Sitapur Operations</span>
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

      {/* ========================================================================= */}
      {/* MODALS */}
      {/* ========================================================================= */}

      {/* Modal 1: Add Doctor */}
      <Modal
        isOpen={showDoctorModal}
        onClose={() => setShowDoctorModal(false)}
        title="Register New Doctor"
        subtitle="Provision clinical credential and assign to facility"
        maxWidth="md"
      >
        <form onSubmit={handleAddDoctor} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Doctor Full Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Dr. Anita Verma"
              value={docName}
              onChange={e => setDocName(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-health-500/20 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Email ID (Login)</label>
              <input
                type="email"
                required
                placeholder="anita@swasthyasetu.ac.in"
                value={docEmail}
                onChange={e => setDocEmail(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-health-500/20 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Password</label>
              <input
                type="text"
                required
                value={docPassword}
                onChange={e => setDocPassword(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-health-500/20 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Phone Number</label>
              <input
                type="text"
                placeholder="+91 98000 12345"
                value={docPhone}
                onChange={e => setDocPhone(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-health-500/20 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Specialization</label>
              <select
                value={docSpecialty}
                onChange={e => setDocSpecialty(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl font-semibold bg-white focus:ring-2 focus:ring-health-500/20 focus:outline-none"
              >
                <option value="General Medicine">General Medicine</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Gynecology & Obstetrics">Gynecology & Obstetrics</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Community Medicine">Community Medicine</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Assigned Facility</label>
              <select
                value={docFacilityId}
                onChange={e => setDocFacilityId(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl font-semibold bg-white focus:ring-2 focus:ring-health-500/20 focus:outline-none"
              >
                {facilities.map(f => (
                  <option key={f.id} value={f.id}>{f.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Experience (Years)</label>
              <input
                type="number"
                min="0"
                value={docExperience}
                onChange={e => setDocExperience(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-health-500/20 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setShowDoctorModal(false)}
              className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-health-700 hover:bg-health-800 text-white rounded-xl text-xs font-bold shadow-sm transition-colors cursor-pointer"
            >
              Confirm Registration
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal 2: Add Hospital */}
      <Modal
        isOpen={showHospitalModal}
        onClose={() => setShowHospitalModal(false)}
        title="Add Hospital / Health Centre"
        subtitle="Expand Sitapur district healthcare network"
        maxWidth="md"
      >
        <form onSubmit={handleAddHospital} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Facility Name</label>
            <input
              type="text"
              required
              placeholder="e.g. CHC Laharpur or PHC Biswan"
              value={facName}
              onChange={e => setFacName(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-sky-500/20 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Facility Type</label>
              <select
                value={facType}
                onChange={e => setFacType(e.target.value as FacilityType)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl font-semibold bg-white focus:ring-2 focus:ring-sky-500/20 focus:outline-none"
              >
                <option value="Primary Health Centre (PHC)">Primary Health Centre (PHC)</option>
                <option value="Community Health Centre (CHC)">Community Health Centre (CHC)</option>
                <option value="District Hospital">District Hospital</option>
                <option value="Rural Health Centre">Rural Health Centre</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Village / Sector Block</label>
              <input
                type="text"
                required
                placeholder="e.g. Laharpur Block"
                value={facVillage}
                onChange={e => setFacVillage(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-sky-500/20 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Phone</label>
              <input
                type="text"
                placeholder="+91 522 000000"
                value={facPhone}
                onChange={e => setFacPhone(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-sky-500/20 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Latitude</label>
              <input
                type="number"
                step="0.0001"
                value={facLat}
                onChange={e => setFacLat(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-sky-500/20 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Longitude</label>
              <input
                type="number"
                step="0.0001"
                value={facLng}
                onChange={e => setFacLng(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-sky-500/20 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Services Offered (comma separated)</label>
            <input
              type="text"
              value={facServices}
              onChange={e => setFacServices(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-sky-500/20 focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setShowHospitalModal(false)}
              className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-sky-700 hover:bg-sky-800 text-white rounded-xl text-xs font-bold shadow-sm transition-colors cursor-pointer"
            >
              Register Facility
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal 3: Add ASHA Worker */}
      <Modal
        isOpen={showWorkerModal}
        onClose={() => setShowWorkerModal(false)}
        title="Register ASHA / Frontline Worker"
        subtitle="Assign field sector and create system account"
        maxWidth="md"
      >
        <form onSubmit={handleAddWorker} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Full Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Maya Devi (ASHA)"
              value={workerName}
              onChange={e => setWorkerName(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Email ID (Login)</label>
              <input
                type="email"
                required
                placeholder="maya.asha@swasthyasetu.ac.in"
                value={workerEmail}
                onChange={e => setWorkerEmail(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Password</label>
              <input
                type="text"
                required
                value={workerPassword}
                onChange={e => setWorkerPassword(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Phone Number</label>
              <input
                type="text"
                placeholder="+91 98123 00000"
                value={workerPhone}
                onChange={e => setWorkerPhone(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Assigned Village</label>
              <input
                type="text"
                placeholder="e.g. Rampur"
                value={workerVillage}
                onChange={e => setWorkerVillage(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setShowWorkerModal(false)}
              className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-sm transition-colors cursor-pointer"
            >
              Create ASHA Account
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal 4: Add Facility Staff */}
      <Modal
        isOpen={showStaffModal}
        onClose={() => setShowStaffModal(false)}
        title="Register Facility Desk Staff"
        subtitle="Queue desk & pharmacy administration credential"
        maxWidth="md"
      >
        <form onSubmit={handleAddStaff} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Staff Member Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Rajesh Singh (Pharmacist)"
              value={staffName}
              onChange={e => setStaffName(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-purple-500/20 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Email ID (Login)</label>
              <input
                type="email"
                required
                placeholder="rajesh.desk@swasthyasetu.ac.in"
                value={staffEmail}
                onChange={e => setStaffEmail(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-purple-500/20 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Password</label>
              <input
                type="text"
                required
                value={staffPassword}
                onChange={e => setStaffPassword(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-purple-500/20 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Phone Number</label>
              <input
                type="text"
                placeholder="+91 91122 00000"
                value={staffPhone}
                onChange={e => setStaffPhone(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-purple-500/20 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Assigned Facility</label>
              <select
                value={staffFacilityId}
                onChange={e => setStaffFacilityId(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl font-semibold bg-white focus:ring-2 focus:ring-purple-500/20 focus:outline-none"
              >
                {facilities.map(f => (
                  <option key={f.id} value={f.id}>{f.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setShowStaffModal(false)}
              className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-bold shadow-sm transition-colors cursor-pointer"
            >
              Create Staff Account
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
