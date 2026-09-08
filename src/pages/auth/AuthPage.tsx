import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { Logo } from '../../components/common/Logo';
import {
  Eye, EyeOff, Lock, Mail, CheckCircle, ArrowRight, AlertCircle, ShieldCheck
} from 'lucide-react';

interface AuthPageProps {
  onLoginSuccess: (role: UserRole) => void;
  onNavigateHome: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onLoginSuccess, onNavigateHome }) => {
  const { loginWithCredentials } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successToast, setSuccessToast] = useState('');

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!emailOrPhone.trim()) {
      setErrorMsg('Please enter your registered email address or mobile number');
      return;
    }
    if (!password.trim()) {
      setErrorMsg('Please enter your password');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const loggedUser = loginWithCredentials(emailOrPhone.trim(), password.trim());
      setIsLoading(false);

      if (loggedUser) {
        setSuccessToast(`Welcome, ${loggedUser.name}! Opening your dashboard...`);
        setTimeout(() => onLoginSuccess(loggedUser.role), 600);
      } else {
        setErrorMsg('Invalid email or password. Please verify your credentials.');
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-12">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
        {/* LEFT SIDE: Healthcare Mission Branding */}
        <div className="lg:col-span-5 bg-gradient-to-br from-emerald-900 via-health-800 to-teal-950 text-white p-8 md:p-10 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-emerald-400/20 blur-3xl pointer-events-none"></div>

          {/* Top Logo */}
          <div onClick={onNavigateHome} className="cursor-pointer z-10">
            <Logo size="md" textColorMode="light" />
          </div>

          {/* Visual Healthcare Mission */}
          <div className="my-8 space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-xs font-semibold text-emerald-100">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>Unified Public Health Ecosystem</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              “Connecting Patients, Frontline Workers, and Doctors into One Bridge.”
            </h3>

            <div className="space-y-3 pt-2 text-xs font-medium text-emerald-100">
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>ASHA field triage & longitudinal EHR records</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>Smart nearby facility routing & token queue</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>Closed-loop referral management & follow-ups</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/15 text-[11px] text-emerald-200 z-10 flex items-center justify-between">
            <span>Official Portal • Secured Access</span>
            <button onClick={onNavigateHome} className="hover:underline text-white font-semibold">
              ← Back to Portal
            </button>
          </div>
        </div>

        {/* RIGHT SIDE: Real Authentication Form */}
        <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
              <div>
                <h2 className="text-2xl font-black text-slate-900">Sign In</h2>
                <p className="text-xs text-slate-500 mt-1">Enter your account ID & password to proceed</p>
              </div>
              <button 
                onClick={onNavigateHome} 
                className="text-xs font-semibold text-slate-400 hover:text-slate-700 transition-colors"
              >
                ← Home
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 mb-5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successToast && (
              <div className="p-3 mb-5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>{successToast}</span>
              </div>
            )}

            <form onSubmit={handleAuthSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  User ID / Email / Phone
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={emailOrPhone}
                    onChange={e => setEmailOrPhone(e.target.value)}
                    placeholder="e.g. admin@swasthyasetu.ac.in or patient-rahul@gmail.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-health-500/20 focus:border-health-600 focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Password
                  </label>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-health-500/20 focus:border-health-600 focus:outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-health-700 hover:bg-health-800 active:bg-health-900 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                {isLoading ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <span>Sign In to SwasthyaSetu</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
