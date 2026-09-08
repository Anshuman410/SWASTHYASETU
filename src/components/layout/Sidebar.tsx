import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { Logo } from '../common/Logo';
import {
  Home, Users, Calendar, Stethoscope, Building2 as Hospital, FlaskConical,
  Pill, ArrowRightLeft, CalendarCheck, FileHeart, ListOrdered,
  Video, ShieldCheck, Settings, ChevronLeft, UserPlus, BarChart3
} from 'lucide-react';
import { UserRole } from '../../types';

interface SidebarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

interface MenuItem {
  label: string;
  route: string;
  icon: any;
  badge?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentRoute,
  onNavigate,
  collapsed,
  onToggleCollapse
}) => {
  const { currentRole } = useAuth();
  const { t } = useLanguage();

  // Role-based Navigation Item Mappings
  const getNavItems = (): MenuItem[] => {
    const dashboardRoute = `/${currentRole}/dashboard`;

    const commonItems: MenuItem[] = [
      { label: 'Home Dashboard', route: dashboardRoute, icon: Home }
    ];

    if (currentRole === 'patient') {
      return [
        ...commonItems,
        { label: 'My Health Records', route: '/patient/records', icon: FileHeart },
        { label: 'Book Appointment', route: '/patient/appointments', icon: Calendar },
        { label: 'AI Triage Check', route: '/triage', icon: Stethoscope },
        { label: 'Smart Facilities', route: '/facilities', icon: Hospital },
        { label: 'My Referrals', route: '/referrals', icon: ArrowRightLeft },
        { label: 'Settings', route: '/settings', icon: Settings }
      ];
    }

    if (currentRole === 'health-worker') {
      return [
        ...commonItems,
        { label: 'Field Patients', route: '/health-worker/patients', icon: Users },
        { label: 'Register Patient', route: '/health-worker/register', icon: UserPlus },
        { label: 'AI-Assisted Triage', route: '/triage', icon: Stethoscope, badge: 'HOT' },
        { label: 'Smart Facilities', route: '/facilities', icon: Hospital },
        { label: 'Appointments & Queue', route: '/appointments', icon: Calendar },
        { label: 'Closed-Loop Referrals', route: '/referrals', icon: ArrowRightLeft },
        { label: 'Follow-ups & Care Tracks', route: '/follow-ups', icon: CalendarCheck, badge: 'DUE' },
        { label: 'Medicine Inventory', route: '/medicines', icon: Pill },
        { label: 'Diagnostics', route: '/diagnostics', icon: FlaskConical },
        { label: 'Settings', route: '/settings', icon: Settings }
      ];
    }

    if (currentRole === 'doctor') {
      return [
        ...commonItems,
        { label: 'Priority Patient Queue', route: '/doctor/dashboard', icon: ListOrdered },
        { label: 'Patient Workspaces', route: '/doctor/patient/pt-101', icon: Users },
        { label: 'Teleconsultation', route: '/teleconsultation/apt-201', icon: Video, badge: 'LIVE' },
        { label: 'AI Triage Reviews', route: '/triage', icon: Stethoscope },
        { label: 'Diagnostic Orders', route: '/diagnostics', icon: FlaskConical },
        { label: 'Generate Referrals', route: '/referrals', icon: ArrowRightLeft },
        { label: 'Follow-up Scheduler', route: '/follow-ups', icon: CalendarCheck },
        { label: 'Settings', route: '/settings', icon: Settings }
      ];
    }

    if (currentRole === 'facility') {
      return [
        ...commonItems,
        { label: 'Token Queue Manager', route: '/facility/queue', icon: ListOrdered, badge: 'LIVE' },
        { label: 'Facility Appointments', route: '/appointments', icon: Calendar },
        { label: 'Medicine Stock Room', route: '/medicines', icon: Pill },
        { label: 'Diagnostic Center', route: '/diagnostics', icon: FlaskConical },
        { label: 'Referrals In/Out', route: '/referrals', icon: ArrowRightLeft },
        { label: 'Settings', route: '/settings', icon: Settings }
      ];
    }

    // Admin
    return [
      ...commonItems,
      { label: 'District Operations', route: '/admin/dashboard', icon: BarChart3 },
      { label: 'Facility Network', route: '/facilities', icon: Hospital },
      { label: 'Patient Master Index', route: '/patient/records', icon: Users },
      { label: 'Referrals Monitor', route: '/referrals', icon: ArrowRightLeft },
      { label: 'High-Risk Care Tracker', route: '/follow-ups', icon: CalendarCheck },
      { label: 'Medicine Stockouts', route: '/medicines', icon: Pill },
      { label: 'Security & Audit Logs', route: '/admin/audit-logs', icon: ShieldCheck },
      { label: 'Settings', route: '/settings', icon: Settings }
    ];
  };

  const navItems = getNavItems();

  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 z-40 bg-white border-r border-slate-200 transition-all duration-300 flex flex-col justify-between shadow-sm ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Top Brand Header */}
      <div>
        <div className={`h-16 flex items-center border-b border-slate-100 ${
          collapsed ? 'justify-center px-2' : 'justify-between px-4'
        }`}>
          <div
            onClick={() => onNavigate('/')}
            className="flex items-center cursor-pointer overflow-hidden select-none"
          >
            {collapsed ? (
              <Logo size="sm" showText={false} />
            ) : (
              <Logo size="sm" showText={true} />
            )}
          </div>

          <button
            onClick={onToggleCollapse}
            className={`hidden md:flex p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer ${
              collapsed ? 'mt-2 absolute -right-3 top-4 bg-white border border-slate-200 shadow-sm rounded-full' : ''
            }`}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <ChevronLeft className={`w-4 h-4 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Menu Links */}
        <nav className={`py-3 space-y-1 overflow-y-auto max-h-[calc(100vh-140px)] ${
          collapsed ? 'px-2' : 'px-3'
        }`}>
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            const isActive = currentRoute === item.route || (item.route !== '/' && currentRoute.startsWith(item.route));

            return (
              <button
                key={idx}
                onClick={() => onNavigate(item.route)}
                className={`w-full flex items-center rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  collapsed 
                    ? 'justify-center p-3' 
                    : 'gap-3 px-3 py-2.5'
                } ${
                  isActive
                    ? 'bg-health-700 text-white shadow-md shadow-health-700/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
                title={collapsed ? item.label : undefined}
              >
                <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                {!collapsed && (
                  <span className="flex-1 text-left truncate">{item.label}</span>
                )}
                {!collapsed && item.badge && (
                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-black ${
                    isActive ? 'bg-white/20 text-white' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};
