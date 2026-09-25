import React from 'react';
import { useHealthcare } from '../../context/HealthcareContext';
import { ShieldCheck, User, Clock, CheckCircle2 } from 'lucide-react';

export const AuditLogsPage: React.FC<{ onNavigate: (route: string) => void }> = ({ onNavigate }) => {
  const { auditLogs } = useHealthcare();

  return (
    <div className="space-y-6 animate-letter">
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            Immutable Governance Audit Stream
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-2">Security Audit & Access Logs</h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Real-time compliance ledger recording patient record accesses, triage runs, and referral creations.
          </p>
        </div>
      </div>

      <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
                <th className="py-3 px-2">User / Provider</th>
                <th className="py-3 px-2">Role</th>
                <th className="py-3 px-2">Action Executed</th>
                <th className="py-3 px-2">Record Target</th>
                <th className="py-3 px-2">Timestamp</th>
                <th className="py-3 px-2 text-right">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {auditLogs.map(log => (
                <tr key={log.id} className="hover:bg-slate-50">
                  <td className="py-3 px-2 font-bold text-slate-900 flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-health-700" />
                    <span>{log.userName}</span>
                  </td>
                  <td className="py-3 px-2">
                    <span className="px-2 py-0.5 rounded bg-slate-100 font-semibold text-[10px] uppercase">{log.userRole}</span>
                  </td>
                  <td className="py-3 px-2 font-semibold text-slate-900">{log.action}</td>
                  <td className="py-3 px-2 text-slate-700">{log.recordDescription}</td>
                  <td className="py-3 px-2 font-mono text-slate-500">{log.timestamp}</td>
                  <td className="py-3 px-2 text-right">
                    <span className="inline-flex items-center gap-1 text-emerald-700 font-bold text-xs">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {log.resultStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
