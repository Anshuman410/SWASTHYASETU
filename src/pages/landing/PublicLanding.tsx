import React from 'react';
import {
  HeartPulse, Stethoscope, Building2 as Hospital, UserCheck, ArrowRight, ShieldCheck,
  WifiOff, Languages, ArrowRightLeft, CalendarCheck, FileHeart, Sparkles,
  Play, Clock, MapPin, CheckCircle, Activity, ChevronRight
} from 'lucide-react';

interface PublicLandingProps {
  onNavigate: (route: string) => void;
  onLaunchDemo: () => void;
}

export const PublicLanding: React.FC<PublicLandingProps> = ({ onNavigate, onLaunchDemo }) => {
  const journeySteps = [
    { title: '1. Registration', desc: 'ASHA registers patient with ABHA ID & vitals', icon: UserCheck },
    { title: '2. AI-Assisted Triage', desc: 'Risk urgency score (High/Med/Low) & clinical advice', icon: Stethoscope },
    { title: '3. Smart Facility', desc: 'Match by distance, queue load & medicine stock', icon: Hospital },
    { title: '4. Appointment', desc: 'Digital token & estimated wait countdown', icon: Clock },
    { title: '5. Consultation', desc: 'Doctor workspace & AI longitudinal summary', icon: HeartPulse },
    { title: '6. Diagnostics', desc: 'Ordered & tracked across lab network', icon: Activity },
    { title: '7. Medicine', desc: 'Real-time PHC pharmacy stock check & reservation', icon: CheckCircle },
    { title: '8. Referral', desc: 'Closed-loop tracking from PHC to District Hospital', icon: ArrowRightLeft },
    { title: '9. Follow-up', desc: 'Overdue alerts dispatched to frontline workers', icon: CalendarCheck },
    { title: '10. Continuity', desc: 'Lifetime longitudinal digital health record', icon: FileHeart }
  ];

  const usps = [
    {
      title: 'AI Care Navigator',
      desc: 'Risk-based triage & decision support for trained health workers — never autonomous medical diagnosis.',
      icon: Sparkles,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    {
      title: 'Smart Facility Matching',
      desc: 'Recommends facilities considering distance, specialist presence, diagnostic capacity & pharmacy inventory.',
      icon: MapPin,
      color: 'bg-sky-50 text-sky-700 border-sky-200'
    },
    {
      title: 'Closed-Loop Referral',
      desc: 'Tracks every referral lifecycle step (Created → Accepted → Consulted → Completed) to eliminate lost care.',
      icon: ArrowRightLeft,
      color: 'bg-purple-50 text-purple-700 border-purple-200'
    },
    {
      title: 'Offline-First Operation',
      desc: 'Works in zero-connectivity rural villages. Syncs queued registrations & triages automatically when restored.',
      icon: WifiOff,
      color: 'bg-amber-50 text-amber-800 border-amber-200'
    },
    {
      title: 'Local Language & Voice',
      desc: 'Voice symptom input with speech-to-text extraction in Hindi & regional languages for low literacy.',
      icon: Languages,
      color: 'bg-rose-50 text-rose-700 border-rose-200'
    },
    {
      title: 'End-to-End Continuity',
      desc: 'From first contact with ASHA in a village to specialist consultation and post-discharge follow-up.',
      icon: ShieldCheck,
      color: 'bg-teal-50 text-teal-700 border-teal-200'
    }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans">
      {/* Top Marketing Header */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-health-700 text-white flex items-center justify-center font-black shadow-md">
            <HeartPulse className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-lg font-black text-slate-900 leading-none block">
              SWASTHYA<span className="text-health-700">SETU</span>
            </span>
            <span className="text-[10px] font-semibold text-slate-600">Public Healthcare Coordination Platform</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onLaunchDemo}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 shadow-md transition-all transform hover:scale-105"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            Launch SIH Guided Demo
          </button>
          <button
            onClick={() => onNavigate('/login')}
            className="px-4 py-2 rounded-xl bg-health-700 hover:bg-health-800 text-white font-bold text-xs shadow-md transition-colors"
          >
            Sign In / Register
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 py-16 md:py-24 max-w-6xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shadow-sm">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>Integrated Rural Healthcare Access, Coordination & Continuity Platform</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
          SWASTHYASETU<br />
          <span className="text-health-700">“From First Contact to Follow-up.”</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed">
          An AI-assisted, offline-first platform connecting rural patients, frontline health workers (ASHA/ANM), doctors, and public healthcare facilities into one seamless care journey.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={onLaunchDemo}
            className="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-sm flex items-center gap-2 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5"
          >
            <Play className="w-4 h-4 fill-current" />
            Launch Interactive Story Demo (Rahul Kumar Flow)
          </button>
          <button
            onClick={() => onNavigate('/login')}
            className="px-6 py-3.5 rounded-2xl bg-health-700 hover:bg-health-800 text-white font-bold text-sm flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
          >
            <span>Enter Role Dashboards</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Visual Healthcare Network Banner */}
        <div className="pt-12">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-6">Connected Public Healthcare Ecosystem:</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            {['Patient', 'Health Worker (ASHA)', 'Smart Facility', 'Doctor / Specialist', 'Diagnostics', 'Pharmacy Stock'].map((node, i) => (
              <div key={i} className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
                <span className="w-2.5 h-2.5 rounded-full bg-health-600 mb-2"></span>
                <span className="text-xs font-bold text-slate-900">{node}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10-Step Interactive Healthcare Journey */}
      <section className="bg-slate-50 border-y border-slate-200 py-16 px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">The 10-Touchpoint Care Journey</h2>
            <p className="text-xs sm:text-sm text-slate-600">“We do not replace the public healthcare system — we connect it.”</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {journeySteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="p-4 bg-white rounded-2xl border border-slate-200 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between">
                  <div>
                    <div className="w-9 h-9 rounded-xl bg-health-50 text-health-700 flex items-center justify-center mb-3 font-bold">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-xs font-bold text-slate-900">{step.title}</h3>
                    <p className="text-[11px] text-slate-600 mt-1 leading-snug">{step.desc}</p>
                  </div>
                  <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-semibold text-emerald-700">
                    <span>Step {idx + 1} of 10</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Innovation / USP Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">What Makes SwasthyaSetu Different?</h2>
          <p className="text-xs sm:text-sm text-slate-600">Key technological differentiators engineered for rural public health constraints.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {usps.map((usp, idx) => {
            const Icon = usp.icon;
            return (
              <div key={idx} className={`p-6 rounded-2xl border ${usp.color} shadow-sm hover:shadow-md transition-all space-y-3`}>
                <div className="p-3 w-fit rounded-xl bg-white shadow-sm">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">{usp.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{usp.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12 px-6 mt-auto border-t border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <span className="text-lg font-black text-white tracking-tight">SWASTHYA<span className="text-health-400">SETU</span></span>
            <p className="text-xs text-slate-400 mt-1">Connecting care. Strengthening communities.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-xs font-semibold text-slate-400">
            <button onClick={() => onNavigate('/')} className="hover:text-white">Home</button>
            <button onClick={onLaunchDemo} className="hover:text-amber-400">Launch Demo</button>
            <button onClick={() => onNavigate('/login')} className="hover:text-white">Role Login</button>
          </div>

          <p className="text-[11px] text-slate-500">
            Smart India Hackathon (SIH) Prototype • Demonstration System Only
          </p>
        </div>
      </footer>
    </div>
  );
};
