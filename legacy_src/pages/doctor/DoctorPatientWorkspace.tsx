import React, { useState } from 'react';
import { useHealthcare } from '../../context/HealthcareContext';
import { RiskBadge } from '../../components/common/RiskBadge';
import { StatusBadge } from '../../components/common/StatusBadge';
import {
  User, Activity, Sparkles, HeartPulse, ShieldCheck, Pill,
  FlaskConical, ArrowRightLeft, CalendarCheck, FileText, CheckCircle2,
  Video, Plus, Save
} from 'lucide-react';

interface DoctorPatientWorkspaceProps {
  onNavigate: (route: string) => void;
  patientId?: string;
}

export const DoctorPatientWorkspace: React.FC<DoctorPatientWorkspaceProps> = ({ onNavigate, patientId = 'pt-101' }) => {
  const {
    patients, orderDiagnostic, createReferral, scheduleFollowUp, reserveMedicine, addAuditLog
  } = useHealthcare();

  const patient = patients.find(p => p.id === patientId) || patients[0];
  const latestVitals = patient.vitals[0] || { bpSystolic: 148, bpDiastolic: 94, pulse: 88, temperature: 98.6, spO2: 96, respiratoryRate: 20 };

  // Form states for Consultation
  const [doctorNotes, setDoctorNotes] = useState('Patient evaluated for acute chest tightness. Vitals indicate Stage 1 hypertension (148/94). ECG ordered to rule out acute ischemia.');
  const [newPrescription, setNewPrescription] = useState(['Amlodipine 5mg - 1 tab daily (Morning)', 'Atorvastatin 10mg - 1 tab daily (Night)']);
  const [medInput, setMedInput] = useState('');
  const [showSavedToast, setShowSavedToast] = useState(false);

  const handleAddMedication = () => {
    if (medInput.trim()) {
      setNewPrescription(prev => [...prev, medInput.trim()]);
      setMedInput('');
    }
  };

  const handleSaveConsultation = () => {
    setShowSavedToast(true);
    addAuditLog('Dr. Ramesh Sharma', 'doctor', 'Completed Clinical Consultation', `Patient ${patient.name} (${patient.abhaId})`);
    setTimeout(() => setShowSavedToast(false), 3000);
  };

  return (
    <div className="space-y-6 animate-letter">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-health-700 text-white flex items-center justify-center text-xl font-bold shadow-md">
            {patient.name.substring(0, 1)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-slate-900">{patient.name}</h1>
              <RiskBadge level={patient.riskLevel} />
            </div>
            <p className="text-xs text-slate-600 font-medium mt-0.5">
              {patient.age} yrs • {patient.gender} • ABHA: <span className="font-mono font-bold text-slate-800">{patient.abhaId}</span> • Village: {patient.village}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('/teleconsultation/apt-201')}
            className="px-4 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-md"
          >
            <Video className="w-4 h-4" />
            <span>Launch Teleconsultation</span>
          </button>
        </div>
      </div>

      {showSavedToast && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center gap-2 animate-letter">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Consultation notes & prescriptions saved successfully! Health record updated.</span>
        </div>
      )}

      {/* Main Workspace Layout: 8 Cols (Left/Center Records) + 4 Cols (AI Summary & Consultation Tools) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT / CENTER: Longitudinal Records */}
        <div className="lg:col-span-7 space-y-6">
          {/* Vitals Summary Card */}
          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <Activity className="w-4 h-4 text-health-700" />
              Latest Recorded Vitals
            </h3>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                <span className="text-[10px] text-slate-500 font-bold block">BP Systolic</span>
                <span className="text-base font-black text-rose-700">{latestVitals.bpSystolic}</span>
                <span className="text-[9px] text-slate-400">mmHg</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                <span className="text-[10px] text-slate-500 font-bold block">BP Diastolic</span>
                <span className="text-base font-black text-rose-700">{latestVitals.bpDiastolic}</span>
                <span className="text-[9px] text-slate-400">mmHg</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                <span className="text-[10px] text-slate-500 font-bold block">Pulse</span>
                <span className="text-base font-black text-slate-900">{latestVitals.pulse}</span>
                <span className="text-[9px] text-slate-400">bpm</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                <span className="text-[10px] text-slate-500 font-bold block">SpO2</span>
                <span className="text-base font-black text-emerald-700">{latestVitals.spO2}%</span>
                <span className="text-[9px] text-slate-400">Oxygen</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                <span className="text-[10px] text-slate-500 font-bold block">Temp</span>
                <span className="text-base font-black text-slate-900">{latestVitals.temperature}&deg;F</span>
                <span className="text-[9px] text-slate-400">Normal</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                <span className="text-[10px] text-slate-500 font-bold block">Resp. Rate</span>
                <span className="text-base font-black text-slate-900">{latestVitals.respiratoryRate}</span>
                <span className="text-[9px] text-slate-400">bpm</span>
              </div>
            </div>
          </div>

          {/* Medical History & Allergies */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <h4 className="text-xs font-bold uppercase text-slate-700">Medical History:</h4>
              <div className="space-y-1.5">
                {patient.medicalHistory.map(mh => (
                  <div key={mh.id} className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                    <span className="font-bold text-slate-900 block">{mh.condition}</span>
                    <span className="text-[10px] text-slate-500">Diagnosed: {mh.diagnosedDate}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <h4 className="text-xs font-bold uppercase text-slate-700">Known Allergies:</h4>
              {patient.allergies.length === 0 ? (
                <p className="text-xs text-slate-500 italic">No documented drug allergies</p>
              ) : (
                patient.allergies.map(alg => (
                  <div key={alg.id} className="p-2.5 bg-rose-50 rounded-xl border border-rose-200 text-xs text-rose-900 font-semibold">
                    ⚠️ {alg.allergen} ({alg.severity} Severity)
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Active Consultation Form */}
          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-health-700" />
              Doctor Clinical Notes & Diagnosis
            </h3>

            <textarea
              rows={3}
              value={doctorNotes}
              onChange={e => setDoctorNotes(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-health-600"
            />

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Digital Prescription Builder:</label>
              <div className="space-y-2 mb-3">
                {newPrescription.map((item, i) => (
                  <div key={i} className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-900 flex items-center justify-between">
                    <span>💊 {item}</span>
                    <button onClick={() => setNewPrescription(prev => prev.filter((_, idx) => idx !== i))} className="text-rose-600 font-bold hover:underline">Remove</button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={medInput}
                  onChange={e => setMedInput(e.target.value)}
                  placeholder="e.g. Paracetamol 500mg - 1 tab thrice daily after meals..."
                  className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium"
                />
                <button
                  onClick={handleAddMedication}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold"
                >
                  Add Medicine
                </button>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={handleSaveConsultation}
                className="px-6 py-2.5 bg-health-700 hover:bg-health-800 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Complete Consultation</span>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: AI Summary Card & Fast Quick Actions */}
        <div className="lg:col-span-5 space-y-6">
          {/* Prominent AI Summary Card */}
          <div className="p-6 bg-gradient-to-br from-emerald-50 via-teal-50 to-sky-50 rounded-3xl border border-emerald-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              <h3 className="text-sm font-bold text-emerald-950">AI Longitudinal Summary</h3>
            </div>

            <div className="p-3 bg-white/90 backdrop-blur-sm rounded-2xl border border-emerald-200 text-xs leading-relaxed text-slate-800">
              “Patient presented with acute chest discomfort, shortness of breath, and sweating. Recent vitals indicate elevated Stage 1 Blood Pressure (148/94). Prior history of essential hypertension. Suggested next step: urgent cardiology assessment & ECG.”
            </div>

            <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900 font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
              <span>AI-generated summary — verify against source medical records.</span>
            </div>
          </div>

          {/* Quick Doctor Order Actions */}
          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <h4 className="text-xs font-bold uppercase text-slate-700">Quick Clinical Orders:</h4>

            <button
              onClick={() => {
                orderDiagnostic(patient.id, '12-Lead ECG & Cardiac Troponin-I', 'District Hospital Sitapur', 'Dr. Ramesh Sharma');
                onNavigate('/diagnostics');
              }}
              className="w-full p-3 rounded-2xl bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-900 text-xs font-bold text-left flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-2">
                <FlaskConical className="w-4 h-4 text-sky-700" />
                <span>Order Diagnostic Lab Test</span>
              </div>
              <span>→</span>
            </button>

            <button
              onClick={() => {
                createReferral(patient.id, 'fac-3', 'Specialist Cardiology Evaluation', 'HIGH');
                onNavigate('/referrals');
              }}
              className="w-full p-3 rounded-2xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-900 text-xs font-bold text-left flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-2">
                <ArrowRightLeft className="w-4 h-4 text-purple-700" />
                <span>Generate Closed-Loop Referral</span>
              </div>
              <span>→</span>
            </button>

            <button
              onClick={() => {
                scheduleFollowUp(patient.id, 'Chronic Care', '2026-09-14', 'Post-medication BP check', 'Sunita Devi (ASHA)');
                onNavigate('/follow-ups');
              }}
              className="w-full p-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 text-xs font-bold text-left flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-2">
                <CalendarCheck className="w-4 h-4 text-emerald-700" />
                <span>Schedule ASHA Follow-up Visit</span>
              </div>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
