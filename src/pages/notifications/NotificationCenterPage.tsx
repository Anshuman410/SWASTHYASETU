import React from 'react';
import { useHealthcare } from '../../context/HealthcareContext';
import { Bell, CheckCircle2, AlertTriangle, ArrowRightLeft, CalendarCheck, Pill } from 'lucide-react';

export const NotificationCenterPage: React.FC<{ onNavigate: (route: string) => void }> = ({ onNavigate }) => {
  const { notifications, markNotificationRead } = useHealthcare();

  return (
    <div className="space-y-6 animate-letter">
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Notification Center</h1>
          <p className="text-xs text-slate-600 mt-0.5">Real-time emergency triage alerts, referral status updates, and follow-up notices.</p>
        </div>
      </div>

      <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-3">
        {notifications.map(notif => (
          <div
            key={notif.id}
            onClick={() => {
              markNotificationRead(notif.id);
              if (notif.linkRoute) onNavigate(notif.linkRoute);
            }}
            className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between ${
              !notif.read ? 'bg-health-50/50 border-health-300 font-medium' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`p-2.5 rounded-xl ${notif.type === 'Emergency' ? 'bg-rose-100 text-rose-800' : 'bg-sky-100 text-sky-800'}`}>
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">{notif.title}</h4>
                <p className="text-xs text-slate-700 mt-0.5">{notif.message}</p>
                <span className="text-[10px] text-slate-500 mt-1 block">{notif.timestamp}</span>
              </div>
            </div>

            {!notif.read && <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping"></span>}
          </div>
        ))}
      </div>
    </div>
  );
};
