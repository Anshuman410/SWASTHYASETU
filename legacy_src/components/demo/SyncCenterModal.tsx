import React from 'react';
import { Modal } from '../common/Modal';
import { useOffline } from '../../context/OfflineContext';
import { RefreshCw, CheckCircle2, Cloud, Database, Wifi, ShieldCheck } from 'lucide-react';

interface SyncCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SyncCenterModal: React.FC<SyncCenterModalProps> = ({ isOpen, onClose }) => {
  const { isOffline, pendingSyncQueue, isSyncing, triggerSync, lastSyncedTimestamp } = useOffline();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="SwasthyaSetu Offline Sync Center"
      subtitle="Local offline storage & continuous public-health synchronization engine"
      maxWidth="md"
    >
      <div className="space-y-6">
        {/* Sync Status Banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-xl ${isSyncing ? 'bg-amber-100 text-amber-800 animate-spin' : 'bg-emerald-100 text-emerald-800'}`}>
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">
                {isSyncing ? 'Synchronizing Field Records...' : pendingSyncQueue.length > 0 ? `${pendingSyncQueue.length} Field Records Waiting to Sync` : 'All Field Records Synchronized'}
              </h4>
              <p className="text-[11px] text-slate-600 mt-0.5">
                {lastSyncedTimestamp ? `Last connected sync: ${lastSyncedTimestamp}` : 'Encrypted Local SQLite / IndexedDB Storage Active'}
              </p>
            </div>
          </div>
          {pendingSyncQueue.length > 0 && !isSyncing && (
            <button
              onClick={triggerSync}
              className="px-4 py-2 bg-health-700 hover:bg-health-800 text-white rounded-xl text-xs font-bold shadow-md transition-colors"
            >
              Sync Now
            </button>
          )}
        </div>

        {/* Queued Records Table */}
        <div>
          <h5 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Pending Offline Queue:</h5>
          {pendingSyncQueue.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
              <p className="text-xs font-bold text-slate-800">Queue is Clear</p>
              <p className="text-[11px] text-slate-600 mt-1">All offline registrations, AI triages, and referrals are fully synced with central servers.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {pendingSyncQueue.map((tx) => (
                <div key={tx.id} className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <Database className="w-4 h-4 text-sky-600" />
                    <div>
                      <span className="font-bold text-slate-900">{tx.type}</span>
                      <p className="text-[10px] text-slate-600">{tx.timestamp}</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-800 font-semibold text-[10px] rounded-full">Queued</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-3 bg-slate-100 rounded-xl text-[11px] text-slate-600 space-y-1">
          <p className="font-semibold flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-health-700" /> Offline Reliability Guarantee:</p>
          <p>Frontline health workers can register patients, complete AI triages, create referrals, and schedule follow-ups even in zero-connectivity rural zones.</p>
        </div>
      </div>
    </Modal>
  );
};
