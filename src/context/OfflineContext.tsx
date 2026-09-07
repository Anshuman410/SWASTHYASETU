import React, { createContext, useContext, useState } from 'react';

interface OfflineTransaction {
  id: string;
  type: string;
  payload: any;
  timestamp: string;
}

interface OfflineContextType {
  isOffline: boolean;
  setIsOffline: (status: boolean) => void;
  toggleOfflineMode: () => void;
  pendingSyncQueue: OfflineTransaction[];
  addOfflineTransaction: (type: string, payload: any) => void;
  isSyncing: boolean;
  triggerSync: () => Promise<void>;
  lastSyncedTimestamp: string | null;
}

const OfflineContext = createContext<OfflineContextType | undefined>(undefined);

export const OfflineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [pendingSyncQueue, setPendingSyncQueue] = useState<OfflineTransaction[]>([]);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSyncedTimestamp, setLastSyncedTimestamp] = useState<string | null>(null);

  const toggleOfflineMode = () => {
    setIsOffline(prev => !prev);
  };

  const addOfflineTransaction = (type: string, payload: any) => {
    const item: OfflineTransaction = {
      id: `off-${Date.now()}`,
      type,
      payload,
      timestamp: new Date().toLocaleTimeString()
    };
    setPendingSyncQueue(prev => [...prev, item]);
  };

  const triggerSync = async () => {
    if (pendingSyncQueue.length === 0) return;
    setIsSyncing(true);
    // Simulate multi-stage network sync animation
    await new Promise(resolve => setTimeout(resolve, 2200));
    setPendingSyncQueue([]);
    setIsSyncing(false);
    setIsOffline(false);
    setLastSyncedTimestamp(new Date().toLocaleTimeString());
  };

  return (
    <OfflineContext.Provider value={{
      isOffline,
      setIsOffline,
      toggleOfflineMode,
      pendingSyncQueue,
      addOfflineTransaction,
      isSyncing,
      triggerSync,
      lastSyncedTimestamp
    }}>
      {children}
    </OfflineContext.Provider>
  );
};

export const useOffline = () => {
  const context = useContext(OfflineContext);
  if (!context) throw new Error('useOffline must be used within OfflineProvider');
  return context;
};
