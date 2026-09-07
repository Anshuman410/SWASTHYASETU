import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useOffline } from '../../context/OfflineContext';
import {
  Settings, ShieldCheck, Lock, Globe, Bell, Eye, Database,
  Wifi, RefreshCw, Key, User
} from 'lucide-react';

interface SettingsPageProps {
  onNavigate: (route: string) => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ onNavigate }) => {
  const { currentUser, currentRole } = useAuth();
  const { language, setLanguage } = useLanguage();
  const { isOffline, toggleOfflineMode, pendingSyncQueue, triggerSync } = useOffline();

  return (
    <div className="space-y-6 animate-letter">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Settings & Security Governance</h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Role-Based Access Control (RBAC), data minimization, local language preferences, and offline sync.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Language & Accessibility */}
        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Globe className="w-4 h-4 text-health-700" />
            Multilingual Language Preference
          </h3>

          <div className="space-y-2">
            {[
              { code: 'en', name: 'English (Default Interface)' },
              { code: 'hi', name: 'हिंदी (Hindi — Simple Rural Terminology)' },
              { code: 'mr', name: 'मराठी / Regional Placeholder' }
            ].map(lang => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code as any)}
                className={`w-full p-3 rounded-2xl border text-xs font-bold text-left flex items-center justify-between transition-all ${
                  language === lang.code ? 'bg-health-50 border-health-500 text-health-950 ring-2 ring-health-500/20' : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <span>{lang.name}</span>
                {language === lang.code && <span className="text-health-700 font-extrabold">Active ✓</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Offline Engine Simulator */}
        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Wifi className="w-4 h-4 text-amber-700" />
            Offline-First Simulation Engine
          </h3>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-900 block">Simulated Network Status</span>
                <span className="text-[11px] text-slate-600">{isOffline ? 'Offline Mode (Local Storage)' : 'Online (Server Connected)'}</span>
              </div>
              <button
                onClick={toggleOfflineMode}
                className={`px-4 py-2 rounded-xl text-xs font-bold shadow-sm transition-all ${
                  isOffline ? 'bg-amber-500 text-slate-950 font-black' : 'bg-emerald-700 text-white'
                }`}
              >
                {isOffline ? 'Switch to Online' : 'Simulate Offline'}
              </button>
            </div>

            {pendingSyncQueue.length > 0 && (
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">{pendingSyncQueue.length} records pending sync</span>
                <button
                  onClick={triggerSync}
                  className="px-3 py-1.5 bg-sky-700 text-white text-xs font-bold rounded-xl"
                >
                  Trigger Sync
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Security & Privacy Standards */}
        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4 md:col-span-2">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            Protected Health Information (PHI) Security Architecture
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="font-bold text-slate-900 block mb-1">🔐 Role-Based Access Control</span>
              <p className="text-slate-600">Patients view only their own history. Doctors see clinical records. Health workers manage field triage.</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="font-bold text-slate-900 block mb-1">🛡️ Immutable Audit Logging</span>
              <p className="text-slate-600">Every record inspection, diagnostic order, and referral is timestamped in the security audit stream.</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="font-bold text-slate-900 block mb-1">📋 Consent Management</span>
              <p className="text-slate-600">Explicit patient consent state required for inter-facility record sharing during referrals.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
