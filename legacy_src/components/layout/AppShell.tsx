import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { TopNavbar } from './TopNavbar';
import { SyncCenterModal } from '../demo/SyncCenterModal';

interface AppShellProps {
  children: React.ReactNode;
  currentRoute: string;
  onNavigate: (route: string) => void;
  pageTitle?: string;
}

export const AppShell: React.FC<AppShellProps> = ({
  children,
  currentRoute,
  onNavigate,
  pageTitle = 'Dashboard'
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [showSyncCenter, setShowSyncCenter] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar
          currentRoute={currentRoute}
          onNavigate={onNavigate}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      {/* Mobile Drawer */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-slate-900/40 backdrop-blur-sm">
          <div className="w-64 h-full bg-white animate-letter">
            <Sidebar
              currentRoute={currentRoute}
              onNavigate={(r) => {
                onNavigate(r);
                setMobileDrawerOpen(false);
              }}
              collapsed={false}
              onToggleCollapse={() => setMobileDrawerOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Main Viewport Container */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
        sidebarCollapsed ? 'md:ml-20' : 'md:ml-64'
      }`}>
        <TopNavbar
          onToggleSidebar={() => setMobileDrawerOpen(!mobileDrawerOpen)}
          pageTitle={pageTitle}
          onOpenSyncCenter={() => setShowSyncCenter(true)}
          onNavigate={onNavigate}
        />

        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {children}
        </main>
      </div>

      {/* Sync Center Dialog */}
      <SyncCenterModal isOpen={showSyncCenter} onClose={() => setShowSyncCenter(false)} />
    </div>
  );
};
