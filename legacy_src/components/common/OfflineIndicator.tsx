import React from 'react';
import { useOffline } from '../../context/OfflineContext';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';

interface OfflineIndicatorProps {
  onOpenSyncCenter?: () => void;
}

export const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({ onOpenSyncCenter }) => {
  const { isOffline, toggleOfflineMode, pendingSyncQueue, isSyncing } = useOffline();

  return (
    <div className="flex items-center gap-2">
      {/* Interactive Toggle for Hackathon / Demo */}
      <button
        onClick={toggleOfflineMode}
        title="Toggle Simulated Connectivity (Demo Mode)"
        className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
          isOffline
            ? 'bg-amber-50 text-amber-800 border-amber-300 shadow-sm'
            : 'bg-emerald-50 text-emerald-800 border-emerald-300'
        }`}
      >
        {isOffline ? (
          <>
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
            <WifiOff className="w-3.5 h-3.5 text-amber-700" />
            <span>Offline Mode</span>
          </>
        ) : (
          <>
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <Wifi className="w-3.5 h-3.5 text-emerald-600" />
            <span>Online</span>
          </>
        )}
      </button>

      {/* Pending Sync Pill */}
      {pendingSyncQueue.length > 0 && (
        <button
          onClick={onOpenSyncCenter}
          className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-100 text-sky-800 border border-sky-300 hover:bg-sky-200 transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-sky-600' : ''}`} />
          <span>Pending Sync: {pendingSyncQueue.length}</span>
        </button>
      )}
    </div>
  );
};
