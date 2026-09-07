import React, { useState } from 'react';
import { useHealthcare } from '../../context/HealthcareContext';
import { Vitals, RiskLevel, AITriageRecord } from '../../types';
import { RiskBadge } from '../../components/common/RiskBadge';
import { VoiceInputModal } from '../../components/common/VoiceInputModal';
import {
  Stethoscope, Mic, Sparkles, AlertTriangle, ShieldCheck, ArrowRight,
  CheckCircle2, RefreshCw, User, Activity, Heart, Hospital, ArrowRightLeft,
  Calendar, FileText, Search
} from 'lucide-react';

interface AITriageWizardProps {
  onNavigate: (route: string) => void;
}

const availableSymptoms = [
  'Chest discomfort', 'Breathing difficulty', 'Fever', 'Cough', 'Weakness',
  'Headache', 'Dizziness', 'Vomiting', 'Abdominal pain', 'Swelling in feet',
  'Excessive thirst', 'Blurry vision', 'Nausea', 'Joint pain'
];

export const AITriageWizard: React.FC<AITriageWizardProps> = ({ onNavigate }) => {
  const { patients, runAITriage, createReferral, setSelectedPatientId } = useHealthcare();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedPatientIdLocal, setSelectedPatientIdLocal] = useState<string>('pt-101'); // Default to Rahul Kumar
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>(['Chest discomfort', 'Weakness', 'Sweating']);
  const [freeTextSymptom, setFreeTextSymptom] = useState('');
  
  // Vitals State
  const [bpSystolic, setBpSystolic] = useState<number>(148);
  const [bpDiastolic, setBpDiastolic] = useState<number>(94);
  const [pulse, setPulse] = useState<number>(88);
  const [temperature, setTemperature] = useState<number>(98.6);
  const [spO2, setSpO2] = useState<number>(96);
  const [respiratoryRate, setRespiratoryRate] = useState<number>(20);

  // History State
  const [selectedHistory, setSelectedHistory] = useState<string[]>(['Hypertension', 'Elevated Cholesterol']);
  const [showVoiceModal, setShowVoiceModal] = useState(false);

  // Processing & Results State
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingMessage, setProcessingMessage] = useState('');
  const [triageResult, setTriageResult] = useState<AITriageRecord | null>(null);

  const selectedPatient = patients.find(p => p.id === selectedPatientIdLocal) || patients[0];

  const handleToggleSymptom = (symptom: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptom) ? prev.filter(s => s !== symptom) : [...prev, symptom]
    );
  };

  const handleAddFreeTextSymptom = () => {
    if (freeTextSymptom.trim() && !selectedSymptoms.includes(freeTextSymptom.trim())) {
      setSelectedSymptoms(prev => [...prev, freeTextSymptom.trim()]);
      setFreeTextSymptom('');
    }
  };

  const handleRunTriage = () => {
    setIsProcessing(true);
    setProcessingMessage('Analyzing patient symptoms & clinical presentation...');

    setTimeout(() => {
      setProcessingMessage('Evaluating cardiovascular & respiratory vitals threshold...');
      setTimeout(() => {
        setProcessingMessage('Cross-referencing medical history & estimating urgency category...');
        setTimeout(() => {
          setIsProcessing(false);
          const vitalsObj: Vitals = {
            bpSystolic, bpDiastolic, pulse, temperature, spO2, respiratoryRate,
            recordedAt: new Date().toLocaleString()
          };
          const result = runAITriage(selectedPatientIdLocal, selectedSymptoms, vitalsObj, selectedHistory);
          setTriageResult(result);
          setSelectedPatientId(selectedPatientIdLocal);
          setCurrentStep(5); // Results Step
        }, 800);
      }, 700);
    }, 700);
  };

  return (
    <div className="space-y-6 animate-letter">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>AI Clinical Decision Support Engine</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900">AI-Assisted Patient Triage</h1>
          <p className="text-xs font-medium text-slate-600 mt-1">
            Decision support for trained health workers and clinicians — not an autonomous medical diagnosis.
          </p>
        </div>

        <button
          onClick={() => setShowVoiceModal(true)}
          className="px-4 py-2.5 rounded-2xl bg-health-700 hover:bg-health-800 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all transform hover:scale-105"
        >
          <Mic className="w-4 h-4" />
          <span>AWAZ Voice Symptom Input</span>
        </button>
      </div>

      {/* Wizard Progress Steps Indicator */}
      <div className="grid grid-cols-4 gap-2 bg-slate-100 p-2 rounded-2xl border border-slate-200">
        {[
          { num: 1, label: '1. Patient Info' },
          { num: 2, label: '2. Symptoms & Voice' },
          { num: 3, label: '3. Clinical Vitals' },
          { num: 4, label: '4. History & Review' }
        ].map(step => (
          <div
            key={step.num}
            onClick={() => currentStep < 5 && setCurrentStep(step.num)}
            className={`py-2 px-3 rounded-xl text-xs font-bold text-center transition-all cursor-pointer ${
              currentStep === step.num
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                : currentStep > step.num
                ? 'text-emerald-700 font-semibold'
                : 'text-slate-600'
            }`}
          >
            {step.label}
          </div>
        ))}
      </div>

      {/* STEP 1: PATIENT SELECTION */}
      {currentStep === 1 && (
        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-6 animate-letter">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <User className="w-5 h-5 text-health-700" />
            Step 1: Select or Confirm Patient Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Choose Patient from Master Index:</label>
              <select
                value={selectedPatientIdLocal}
                onChange={e => setSelectedPatientIdLocal(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-slate-50 focus:outline-none focus:border-health-600"
              >
                {patients.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.age} yrs / {p.gender}) — {p.abhaId} [{p.riskLevel} Risk]
                  </option>
                ))}
              </select>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1.5">
              <p className="font-bold text-slate-900 text-sm">{selectedPatient.name}</p>
              <p className="text-slate-600">ABHA ID: <span className="font-mono text-slate-800 font-bold">{selectedPatient.abhaId}</span></p>
              <p className="text-slate-600">Village: {selectedPatient.village} ({selectedPatient.block})</p>
              <p className="text-slate-600">Assigned ASHA: {selectedPatient.assignedHealthWorker}</p>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-6 py-2.5 rounded-xl bg-health-700 hover:bg-health-800 text-white font-bold text-xs flex items-center gap-2 shadow-md"
            >
              <span>Next: Enter Symptoms</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: SYMPTOMS SELECTION & VOICE */}
      {currentStep === 2 && (
        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-6 animate-letter">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-health-700" />
              Step 2: Capture Presenting Symptoms
            </h3>

            <button
              onClick={() => setShowVoiceModal(true)}
              className="px-3 py-1.5 rounded-xl bg-health-50 text-health-800 border border-health-200 text-xs font-bold flex items-center gap-1.5 hover:bg-health-100"
            >
              <Mic className="w-3.5 h-3.5 text-health-700" />
              <span>Tap for Voice Input</span>
            </button>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Select Symptoms from Clinical Chips:</label>
            <div className="flex flex-wrap gap-2">
              {availableSymptoms.map((symptom, idx) => {
                const isSelected = selectedSymptoms.includes(symptom);
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleToggleSymptom(symptom)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                      isSelected
                        ? 'bg-health-700 text-white border-health-800 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {isSelected ? '✓ ' : '+ '}{symptom}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Or Type Custom Symptom:</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={freeTextSymptom}
                onChange={e => setFreeTextSymptom(e.target.value)}
                placeholder="e.g. Chest tightness radiating to left arm..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-health-600"
              />
              <button
                type="button"
                onClick={handleAddFreeTextSymptom}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-white text-xs font-bold hover:bg-slate-900"
              >
                Add Symptom
              </button>
            </div>
          </div>

          <div className="flex justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setCurrentStep(1)}
              className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600"
            >
              Back
            </button>
            <button
              onClick={() => setCurrentStep(3)}
              className="px-6 py-2.5 rounded-xl bg-health-700 hover:bg-health-800 text-white font-bold text-xs flex items-center gap-2 shadow-md"
            >
              <span>Next: Record Clinical Vitals</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: VITALS INPUT */}
      {currentStep === 3 && (
        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-6 animate-letter">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Activity className="w-5 h-5 text-health-700" />
            Step 3: Record Patient Vitals
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Blood Pressure (Systolic)</label>
              <input
                type="number"
                value={bpSystolic}
                onChange={e => setBpSystolic(Number(e.target.value))}
                className="w-full text-lg font-black text-slate-900 bg-white p-2 rounded-xl border border-slate-200"
              />
              <span className="text-[10px] text-slate-600 font-medium">Normal: 110-120 mmHg</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Blood Pressure (Diastolic)</label>
              <input
                type="number"
                value={bpDiastolic}
                onChange={e => setBpDiastolic(Number(e.target.value))}
                className="w-full text-lg font-black text-slate-900 bg-white p-2 rounded-xl border border-slate-200"
              />
              <span className="text-[10px] text-slate-600 font-medium">Normal: 70-80 mmHg</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Pulse Rate</label>
              <input
                type="number"
                value={pulse}
                onChange={e => setPulse(Number(e.target.value))}
                className="w-full text-lg font-black text-slate-900 bg-white p-2 rounded-xl border border-slate-200"
              />
              <span className="text-[10px] text-slate-600 font-medium">Normal: 60-100 bpm</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Oxygen SpO2 (%)</label>
              <input
                type="number"
                value={spO2}
                onChange={e => setSpO2(Number(e.target.value))}
                className="w-full text-lg font-black text-slate-900 bg-white p-2 rounded-xl border border-slate-200"
              />
              <span className="text-[10px] text-slate-600 font-medium">Target: &ge; 96%</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Body Temperature (&deg;F)</label>
              <input
                type="number"
                step="0.1"
                value={temperature}
                onChange={e => setTemperature(Number(e.target.value))}
                className="w-full text-lg font-black text-slate-900 bg-white p-2 rounded-xl border border-slate-200"
              />
              <span className="text-[10px] text-slate-600 font-medium">Normal: 98.6 &deg;F</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Respiratory Rate</label>
              <input
                type="number"
                value={respiratoryRate}
                onChange={e => setRespiratoryRate(Number(e.target.value))}
                className="w-full text-lg font-black text-slate-900 bg-white p-2 rounded-xl border border-slate-200"
              />
              <span className="text-[10px] text-slate-600 font-medium">Normal: 12-20 bpm</span>
            </div>
          </div>

          <div className="flex justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600"
            >
              Back
            </button>
            <button
              onClick={() => setCurrentStep(4)}
              className="px-6 py-2.5 rounded-xl bg-health-700 hover:bg-health-800 text-white font-bold text-xs flex items-center gap-2 shadow-md"
            >
              <span>Next: Relevant History</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: RELEVANT HISTORY & RUN TRIAGE */}
      {currentStep === 4 && (
        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-6 animate-letter">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-health-700" />
            Step 4: Confirm Medical History & Run AI Triage
          </h3>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase">Existing Chronic Conditions / Risk Factors:</label>
            <div className="flex flex-wrap gap-2">
              {['Hypertension', 'Diabetes Mellitus', 'Pregnancy', 'Asthma / COPD', 'Heart Disease History', 'No Prior History'].map((h, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedHistory(prev => prev.includes(h) ? prev.filter(x => x !== h) : [...prev, h])}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border ${
                    selectedHistory.includes(h) ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-700 border-slate-200'
                  }`}
                >
                  {selectedHistory.includes(h) ? '✓ ' : '+ '}{h}
                </button>
              ))}
            </div>
          </div>

          {/* AI Run CTA */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-700 to-teal-800 text-white space-y-4">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-amber-300 animate-pulse" />
              <div>
                <h4 className="text-sm font-bold">Ready to Run AI-Assisted Clinical Triage</h4>
                <p className="text-xs text-emerald-100">Evaluates symptom urgency & matches optimal public health pathway.</p>
              </div>
            </div>

            <button
              onClick={handleRunTriage}
              disabled={isProcessing}
              className="w-full py-3 bg-amber-400 hover:bg-amber-500 text-slate-950 rounded-xl text-sm font-black shadow-lg transition-all flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                  <span>{processingMessage}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 fill-current" />
                  <span>Run AI-Assisted Triage Analysis</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: AI TRIAGE RESULTS CARD */}
      {currentStep === 5 && triageResult && (
        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xl space-y-6 animate-letter">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">Generated Triage Ticket #{triageResult.id}</span>
              <h2 className="text-xl font-black text-slate-900">AI-Assisted Urgency Recommendation</h2>
            </div>
            <RiskBadge level={triageResult.riskLevel} className="text-sm px-4 py-1.5" />
          </div>

          {/* AI Safety Disclaimer Box */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold flex items-start gap-2.5">
            <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">AI Clinical Decision Support Disclaimer:</p>
              <p className="text-amber-800 font-medium mt-0.5">{triageResult.disclaimer}</p>
            </div>
          </div>

          {/* Core Findings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <h4 className="text-xs font-bold uppercase text-slate-600">Urgency Assessment:</h4>
              <p className="text-sm font-bold text-slate-900 leading-snug">{triageResult.urgencyExplanation}</p>
              <div className="pt-2 text-xs text-slate-600">
                <span>Confidence Metric: </span>
                <span className="font-bold text-emerald-700">{Math.round(triageResult.confidenceScore * 100)}% Match</span>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <h4 className="text-xs font-bold uppercase text-slate-600">Recommended Care Pathway:</h4>
              <p className="text-sm font-bold text-slate-900">{triageResult.recommendedPathway}</p>
              <p className="text-xs text-slate-600">Suggested Target Tier: <span className="font-semibold">{triageResult.recommendedFacilityType}</span></p>
            </div>
          </div>

          {/* Action Navigation Buttons */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => setCurrentStep(1)}
              className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600"
            >
              New Triage Check
            </button>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => onNavigate('/facilities')}
                className="px-4 py-2.5 rounded-xl bg-health-700 hover:bg-health-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
              >
                <Hospital className="w-4 h-4" />
                <span>Find Smart Facility Match</span>
              </button>
              <button
                onClick={() => {
                  createReferral(selectedPatient.id, 'fac-3', triageResult.urgencyExplanation, triageResult.riskLevel);
                  onNavigate('/referrals');
                }}
                className="px-4 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
              >
                <ArrowRightLeft className="w-4 h-4" />
                <span>Dispatch Closed-Loop Referral</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Voice Assistant Modal */}
      <VoiceInputModal
        isOpen={showVoiceModal}
        onClose={() => setShowVoiceModal(false)}
        onSymptomsExtracted={extracted => {
          setSelectedSymptoms(prev => Array.from(new Set([...prev, ...extracted])));
          setCurrentStep(2);
        }}
      />
    </div>
  );
};
