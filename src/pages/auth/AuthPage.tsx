import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import {
  HeartPulse, Eye, EyeOff, Lock, Phone, Mail, User, ShieldCheck,
  CheckCircle, ArrowRight, Sparkles, AlertCircle
} from 'lucide-react';

interface AuthPageProps {
  onLoginSuccess: (role: UserRole) => void;
  onNavigateHome: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onLoginSuccess, onNavigateHome }) => {
  const { loginAsDemoUser, loginWithCredentials } = useAuth();

  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Form Fields
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('health-worker');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successToast, setSuccessToast] = useState('');

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!emailOrPhone) {
      setErrorMsg('Please enter your mobile number or email address');
      return;
    }
    if (!password) {
      setErrorMsg('Please enter your password');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      loginWithCredentials(emailOrPhone, password, selectedRole);
      setSuccessToast(`Welcome back! Logged in as ${selectedRole.toUpperCase()}`);
      setTimeout(() => onLoginSuccess(selectedRole), 600);
    }, 800);
  };

  const handleQuickDemoRole = (role: UserRole) => {
    setIsLoading(true);
    setTimeout(() => {
      loginAsDemoUser(role);
      setIsLoading(false);
      onLoginSuccess(role);
    }, 400);
  };

  const roleDescriptions: Record<UserRole, { title: string; subtitle: string; icon: string }> = {
    patient: { title: 'Patient', subtitle: 'View records, book tokens & track referrals', icon: '👤' },
    'health-worker': { title: 'Frontline ASHA Worker', subtitle: 'Field triage, registration & follow-ups', icon: '🩺' },
    doctor: { title: 'Doctor / Specialist', subtitle: 'Priority queue, AI summaries & diagnostics', icon: '👨‍⚕️' },
    facility: { title: 'Facility Desk / Pharmacy', subtitle: 'Queue manager & medicine inventory', icon: '🏥' },
    admin: { title: 'District Health Admin', subtitle: 'District analytics & audit log oversight', icon: '📊' }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-12">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[620px]">
        {/* LEFT SIDE: Healthcare Illustration & Network Motif */}
        <div className="lg:col-span-5 bg-gradient-to-br from-emerald-800 via-health-700 to-teal-900 text-white p-8 md:p-10 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-emerald-400/20 blur-3xl pointer-events-none"></div>

          {/* Top Logo */}
          <div onClick={onNavigateHome} className="cursor-pointer flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md text-white flex items-center justify-center font-black shadow-inner">
              <HeartPulse className="w-6 h-6 animate-pulse text-white" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold tracking-tight leading-none text-white">SWASTHYASETU</h2>
              <p className="text-[10px] text-emerald-200 font-medium">Public Health Continuity Platform</p>
            </div>
          </div>

          {/* Visual Healthcare Network Graphic */}
          <div className="my-8 space-y-6 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-xs font-semibold text-emerald-100">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Integrated Rural Health Journey</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              “Connecting Patients, Health Workers, and Doctors into One Bridge.”
            </h3>

            {/* Feature Points */}
            <div className="space-y-3 pt-2 text-xs font-medium text-emerald-100">
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>AI-assisted decision support for field workers</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>Smart facility matching & closed-loop referrals</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>Offline-first operation for zero-connectivity zones</span>
              </div>
            </div>
          </div>

          {/* Footer tagline */}
          <div className="pt-6 border-t border-white/15 text-[11px] text-emerald-200">
            Smart India Hackathon (SIH) Prototype • Secured Governance
          </div>
        </div>

        {/* RIGHT SIDE: Auth Card & Role Switcher */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
          <div>
            {/* Header Tabs */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsRegister(false)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    !isRegister ? 'bg-health-700 text-white shadow-md' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setIsRegister(true)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    isRegister ? 'bg-health-700 text-white shadow-md' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Register New Account
                </button>
              </div>

              <button onClick={onNavigateHome} className="text-xs font-semibold text-slate-400 hover:text-slate-600">
                ← Public Home
              </button>
            </div>

            {/* Notifications / Alerts */}
            {errorMsg && (
              <div className="p-3 mb-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2 animate-letter">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successToast && (
              <div className="p-3 mb-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-letter">
                <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>{successToast}</span>
              </div>
            )}

            {/* Auth Form */}
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {isRegister && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      placeholder="e.g. Rahul Kumar or Dr. Ramesh Sharma"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-health-500/20 focus:border-health-600 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Mobile Number or Email</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={emailOrPhone}
                    onChange={e => setEmailOrPhone(e.target.value)}
                    placeholder="+91 98765 43210 or user@swasthya.gov.in"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-health-500/20 focus:border-health-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Password</label>
                  {!isRegister && (
                    <a href="#forgot" onClick={e => e.preventDefault()} className="text-[11px] font-semibold text-health-700 hover:underline">
                      Forgot Password?
                    </a>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-health-500/20 focus:border-health-600 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Role Selection Dropdown */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Select User Role</label>
                <select
                  value={selectedRole}
                  onChange={e => setSelectedRole(e.target.value as UserRole)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:ring-2 focus:ring-health-500/20 focus:border-health-600 focus:outline-none"
                >
                  <option value="health-worker">Frontline Health Worker (ASHA / ANM)</option>
                  <option value="patient">Patient (Rahul Kumar)</option>
                  <option value="doctor">Doctor / Specialist</option>
                  <option value="facility">Facility Desk / Pharmacy Staff</option>
                  <option value="admin">District Health Administrator</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-health-700 hover:bg-health-800 text-white rounded-xl text-xs font-bold shadow-md transition-colors flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <span>{isRegister ? 'Create Account & Access Dashboard' : 'Sign In to Ecosystem'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* DEMO QUICK LOGIN SECTION FOR SIH JUDGES */}
          <div className="pt-6 mt-6 border-t border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-700 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Quick Demo Role Switcher (SIH Evaluation):
              </span>
              <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">DEMO ONLY</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {(['health-worker', 'patient', 'doctor', 'facility', 'admin'] as UserRole[]).map((role) => (
                <button
                  key={role}
                  onClick={() => handleQuickDemoRole(role)}
                  className="p-2 rounded-xl bg-slate-50 hover:bg-health-50 border border-slate-200 hover:border-health-300 text-left transition-all group"
                >
                  <span className="text-base block mb-0.5">{roleDescriptions[role].icon}</span>
                  <p className="text-[11px] font-bold text-slate-900 group-hover:text-health-800 truncate">{roleDescriptions[role].title}</p>
                  <span className="text-[9px] text-slate-600 block line-clamp-1">Demo Access →</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
