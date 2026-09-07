import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useHealthcare } from '../../context/HealthcareContext';
import { useOffline } from '../../context/OfflineContext';
import {
  Play, ChevronRight, Sparkles, CheckCircle2, Stethoscope, Hospital,
  ArrowRightLeft, User, HeartPulse, Video, Pill, FlaskConical, CalendarCheck,
  Wifi, RefreshCw, X
} from 'lucide-react';

interface DemoWalkthroughModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: string) => void;
}

const demoSteps = [
  { step: 1, title: 'Health Worker Field Login', desc: 'Log in as ASHA worker Sunita Devi managing Rampur Sector.', role: 'health-worker', route: '/health-worker/dashboard' },
  { step: 2, title: 'Select Synthetic Patient', desc: 'Select patient Rahul Kumar (52/M) presenting with acute chest discomfort.', role: 'health-worker', route: '/health-worker/patients' },
  { step: 3, title: 'Capture Symptoms & Vitals', desc: 'Input BP (148/94), Pulse 88, SpO2 96%, and voice symptoms.', role: 'health-worker', route: '/triage' },
  { step: 4, title: 'Execute AI Triage Analysis', desc: 'AI calculates HIGH urgency category with clinical guidance.', role: 'health-worker', route: '/triage' },
  { step: 5, title: 'Urgent Evaluation Recommended', desc: 'AI safety framework advises urgent cardiology referral.', role: 'health-worker', route: '/triage' },
  { step: 6, title: 'Smart Facility Match', desc: 'Recommends District Hospital Sitapur (Distance, Specialist, ECG).', role: 'health-worker', route: '/facilities' },
  { step: 7, title: 'Book OPD Token', desc: 'Generates Token #24 with estimated wait countdown.', role: 'health-worker', route: '/appointments' },
  { step: 8, title: 'Dispatch Closed-Loop Referral', desc: 'Ticket #REF-301 created and sent to District Hospital.', role: 'health-worker', route: '/referrals' },
  { step: 9, title: 'Doctor Login & Inflow Queue', desc: 'Switch role to Dr. Ramesh Sharma at District Hospital.', role: 'doctor', route: '/doctor/dashboard' },
  { step: 10, title: 'Open Clinical Workspace', desc: 'Doctor opens Rahul Kumar’s complete patient chart.', role: 'doctor', route: '/doctor/patient/pt-101' },
  { step: 11, title: 'Review AI Longitudinal Summary', desc: 'AI summarizes presenting symptoms, vitals trend & history.', role: 'doctor', route: '/doctor/patient/pt-101' },
  { step: 12, title: 'Order 12-Lead ECG Diagnostic', desc: 'Doctor orders diagnostic test & cardiac enzymes.', role: 'doctor', route: '/diagnostics' },
  { step: 13, title: 'Check Medicine Stock', desc: 'Verify Amlodipine & Atorvastatin stock at PHC pharmacy.', role: 'doctor', route: '/medicines' },
  { step: 14, title: 'Save Prescription', desc: 'Save digital consultation & digital prescription.', role: 'doctor', route: '/doctor/patient/pt-101' },
  { step: 15, title: 'Schedule Follow-up Visit', desc: 'Schedule ASHA field checkup for 2 days post-opd.', role: 'doctor', route: '/follow-ups' },
  { step: 16, title: 'Simulate Overdue Escalation', desc: 'System triggers overdue alert when visit deadline passes.', role: 'health-worker', route: '/follow-ups' },
  { step: 17, title: 'ASHA Alert Notification', desc: 'Sunita Devi receives emergency overdue alert on bell icon.', role: 'health-worker', route: '/notifications' },
  { step: 18, title: 'Updated Continuity Record', desc: 'Longitudinal Health Record updates with full encounter history.', role: 'patient', route: '/patient/records' },
  { step: 19, title: 'Toggle Offline Mode', desc: 'Simulate rural connectivity drop in remote village.', role: 'health-worker', route: '/settings' },
  { step: 20, title: 'Record Offline Action', desc: 'Register offline vitals stored in local IndexedDB queue.', role: 'health-worker', route: '/triage' },
  { step: 21, title: 'Restore Connectivity', desc: 'Toggle Online Mode back on in top navigation.', role: 'health-worker', route: '/settings' },
  { step: 22, title: 'Synchronize Field Database', desc: 'Sync animation confirms 100% record integration.', role: 'admin', route: '/admin/dashboard' }
];

export const DemoWalkthroughModal: React.FC<DemoWalkthroughModalProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const { switchRole } = useAuth();
  const { toggleOfflineMode, triggerSync } = useOffline();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  if (!isOpen) return null;

  const currentStep = demoSteps[currentStepIndex];

  const handleNextStep = () => {
    if (currentStepIndex < demoSteps.length - 1) {
      const next = demoSteps[currentStepIndex + 1];
      switchRole(next.role as any);
      onNavigate(next.route);
      setCurrentStepIndex(prev => prev + 1);
    } else {
      onClose();
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      const prev = demoSteps[currentStepIndex - 1];
      switchRole(prev.role as any);
      onNavigate(prev.route);
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-2xl px-4 pointer-events-auto">
      <div className="bg-slate-900 text-white rounded-3xl p-5 shadow-2xl border border-emerald-500/50 backdrop-blur-md animate-letter space-y-4">
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-400 animate-ping"></span>
            <span className="text-xs font-black uppercase tracking-wider text-amber-300">
              SIH GUIDED DEMO JOURNEY ({currentStepIndex + 1} OF 22)
            </span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Content */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-2xl bg-health-700 text-white font-black text-lg flex items-center justify-center shrink-0 shadow-md">
            {currentStep.step}
          </div>
          <div className="flex-1">
            <h4 className="text-base font-bold text-white leading-tight">{currentStep.title}</h4>
            <p className="text-xs text-slate-300 mt-1">{currentStep.desc}</p>
            <div className="mt-2 flex items-center gap-2 text-[10px] text-emerald-300 font-semibold">
              <span>Active Role: <strong className="text-white uppercase">{currentStep.role}</strong></span>
              <span>• Route: <strong className="text-white">{currentStep.route}</strong></span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          <button
            onClick={handlePrevStep}
            disabled={currentStepIndex === 0}
            className="px-3 py-1.5 rounded-xl border border-slate-700 text-xs font-semibold text-slate-300 hover:bg-slate-800 disabled:opacity-30"
          >
            ← Previous Step
          </button>

          <div className="flex items-center gap-1.5">
            {demoSteps.slice(0, 10).map((_, i) => (
              <div key={i} className={`w-2 h-2 rounded-full ${i === currentStepIndex ? 'bg-amber-400 scale-125' : i < currentStepIndex ? 'bg-emerald-500' : 'bg-slate-700'}`}></div>
            ))}
          </div>

          <button
            onClick={handleNextStep}
            className="px-5 py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-lg flex items-center gap-1.5 transition-all transform hover:scale-105"
          >
            <span>{currentStepIndex === demoSteps.length - 1 ? 'Finish Demo' : 'Next Step →'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
