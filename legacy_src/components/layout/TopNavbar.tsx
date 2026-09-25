import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useHealthcare } from '../../context/HealthcareContext';
import { useLanguage } from '../../context/LanguageContext';
import { OfflineIndicator } from '../common/OfflineIndicator';
import {
  Menu, Bell, Search, Globe, LogOut, UserCircle, Shield,
  CheckCircle, Sparkles, X, Activity, User, Building2 as Hospital, FileText
} from 'lucide-react';
import { UserRole } from '../../types';

interface TopNavbarProps {
  onToggleSidebar: () => void;
  pageTitle: string;
  onOpenSyncCenter?: () => void;
  onNavigate?: (route: string) => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  onToggleSidebar,
  pageTitle,
  onOpenSyncCenter,
  onNavigate
}) => {
  const { currentUser, currentRole, logout } = useAuth();
  const { notifications, markNotificationRead, patients, facilities } = useHealthcare();
  const { language, setLanguage, t } = useLanguage();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const unreadCount = notifications.filter(n => !n.read).length;

  const roleLabels: Record<UserRole, string> = {
    patient: 'Patient',
    'health-worker': 'ASHA / Health Worker',
    doctor: 'Doctor / Specialist',
    facility: 'Facility Staff',
    admin: 'District Health Admin'
  };

  const roleBadgeColors: Record<UserRole, string> = {
    patient: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    'health-worker': 'bg-sky-100 text-sky-800 border-sky-300',
    doctor: 'bg-purple-100 text-purple-800 border-purple-300',
    facility: 'bg-amber-100 text-amber-800 border-amber-300',
    admin: 'bg-rose-100 text-rose-800 border-rose-300'
  };

  const filteredSearchPatients = searchQuery.length >= 2
    ? patients.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.abhaId.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const filteredSearchFacilities = searchQuery.length >= 2
    ? facilities.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 md:px-6 flex items-center justify-between shadow-sm">
      {/* Left: Sidebar Toggle & Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          aria-label="Toggle Sidebar Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:block">
          <h1 className="text-base font-bold text-slate-900 leading-tight">{pageTitle}</h1>
          <p className="text-[11px] text-slate-600 font-medium">SwasthyaSetu Ecosystem • Sitapur District Zone</p>
        </div>
      </div>

      {/* Center/Right Actions */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Global Search Button */}
        <button
          onClick={() => setShowSearchModal(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 text-xs font-medium transition-colors"
        >
          <Search className="w-4 h-4 text-slate-400" />
          <span className="hidden md:inline">Search patients, facilities, medicines...</span>
          <span className="md:hidden">Search</span>
        </button>

        {/* Offline Indicator Toggle */}
        <OfflineIndicator onOpenSyncCenter={onOpenSyncCenter} />

        {/* Language Selector */}
        <div className="relative group">
          <button className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors flex items-center gap-1 text-xs font-semibold">
            <Globe className="w-4 h-4 text-health-700" />
            <span className="uppercase">{language}</span>
          </button>
          <div className="absolute right-0 top-full mt-1 w-36 bg-white rounded-xl shadow-lg border border-slate-200 py-1 hidden group-hover:block z-50">
            <button onClick={() => setLanguage('en')} className="w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-slate-50 flex items-center justify-between">
              <span>English</span> {language === 'en' && <CheckCircle className="w-3.5 h-3.5 text-health-600" />}
            </button>
            <button onClick={() => setLanguage('hi')} className="w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-slate-50 flex items-center justify-between">
              <span>हिंदी (Hindi)</span> {language === 'hi' && <CheckCircle className="w-3.5 h-3.5 text-health-600" />}
            </button>
            <button onClick={() => setLanguage('mr')} className="w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-slate-50 flex items-center justify-between">
              <span>मराठी (Regional)</span> {language === 'mr' && <CheckCircle className="w-3.5 h-3.5 text-health-600" />}
            </button>
          </div>
        </div>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <Bell className="w-5 h-5 text-slate-700" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-rose-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 z-50 animate-letter">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Notifications ({unreadCount} new)</h4>
                <button onClick={() => setShowNotifications(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto my-2">
                {notifications.length === 0 ? (
                  <p className="text-xs text-slate-600 text-center py-6">No new notifications</p>
                ) : (
                  notifications.map(notif => (
                    <div
                      key={notif.id}
                      onClick={() => {
                        markNotificationRead(notif.id);
                        if (notif.linkRoute && onNavigate) onNavigate(notif.linkRoute);
                        setShowNotifications(false);
                      }}
                      className={`py-3 px-2 rounded-xl transition-colors cursor-pointer hover:bg-slate-50 ${!notif.read ? 'bg-health-50/40 font-medium' : ''}`}
                    >
                      <div className="flex items-start justify-between">
                        <span className={`text-xs font-bold ${notif.type === 'Emergency' ? 'text-rose-700' : 'text-slate-900'}`}>{notif.title}</span>
                        <span className="text-[10px] text-slate-600">{notif.timestamp}</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-2">{notif.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Role Badge & Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-health-700 text-white font-bold flex items-center justify-center text-xs shadow-sm">
              {currentUser?.name.substring(0, 1) || 'U'}
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-xs font-bold text-slate-900 leading-tight">{currentUser?.name}</p>
              <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] border ${currentRole ? roleBadgeColors[currentRole] : 'bg-slate-100 text-slate-700 border-slate-300'}`}>
                {currentRole ? roleLabels[currentRole] : 'User'}
              </span>
            </div>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 z-50 animate-letter">
              <div className="p-2 bg-slate-50 rounded-xl mb-2">
                <p className="text-xs font-bold text-slate-900">{currentUser?.name}</p>
                <p className="text-[11px] text-slate-600">{currentUser?.email}</p>
                <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-semibold border ${currentRole ? roleBadgeColors[currentRole] : 'bg-slate-100 text-slate-700 border-slate-300'}`}>
                  {currentRole ? roleLabels[currentRole] : 'User'}
                </span>
              </div>

              {/* User Account Info */}
              <div className="py-2 border-b border-slate-100 mb-2">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2">Account Status</p>
                <div className="px-2 py-1 flex items-center justify-between text-xs text-slate-600">
                  <span>Role Permission</span>
                  <span className="font-semibold text-emerald-700">Verified Active</span>
                </div>
              </div>

              <button
                onClick={() => {
                  logout();
                  setShowProfileMenu(false);
                  onNavigate?.('/login');
                }}
                className="w-full text-left px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl flex items-center gap-2 cursor-pointer transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Global Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-start justify-center pt-20 p-4">
          <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-letter">
            <div className="p-4 border-b border-slate-100 flex items-center gap-3">
              <Search className="w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by Patient Name, ABHA ID, Facility, Medicine..."
                className="w-full text-sm font-medium focus:outline-none"
                autoFocus
              />
              <button onClick={() => setShowSearchModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 max-h-96 overflow-y-auto">
              {searchQuery.length < 2 ? (
                <p className="text-xs text-slate-600 text-center py-8">Type at least 2 characters to search across patients, doctors, facilities & inventory.</p>
              ) : (
                <div className="space-y-4">
                  {filteredSearchPatients.length > 0 && (
                    <div>
                      <p className="text-[11px] font-bold text-slate-600 uppercase mb-2">Patients Found:</p>
                      <div className="space-y-1">
                        {filteredSearchPatients.map(p => (
                          <div
                            key={p.id}
                            onClick={() => {
                              if (onNavigate) onNavigate('/patient/records');
                              setShowSearchModal(false);
                            }}
                            className="p-2.5 rounded-xl hover:bg-health-50 flex items-center justify-between cursor-pointer"
                          >
                            <div className="flex items-center gap-2.5">
                              <User className="w-4 h-4 text-health-700" />
                              <div>
                                <h4 className="text-xs font-bold text-slate-900">{p.name} ({p.age}/{p.gender.substring(0, 1)})</h4>
                                <p className="text-[11px] text-slate-600">{p.abhaId} • {p.village}</p>
                              </div>
                            </div>
                            <span className="text-[10px] font-semibold px-2 py-0.5 bg-slate-100 rounded-full">{p.riskLevel} Risk</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {filteredSearchFacilities.length > 0 && (
                    <div>
                      <p className="text-[11px] font-bold text-slate-600 uppercase mb-2">Facilities Found:</p>
                      <div className="space-y-1">
                        {filteredSearchFacilities.map(f => (
                          <div
                            key={f.id}
                            onClick={() => {
                              if (onNavigate) onNavigate('/facilities');
                              setShowSearchModal(false);
                            }}
                            className="p-2.5 rounded-xl hover:bg-sky-50 flex items-center justify-between cursor-pointer"
                          >
                            <div className="flex items-center gap-2.5">
                              <Hospital className="w-4 h-4 text-sky-700" />
                              <div>
                                <h4 className="text-xs font-bold text-slate-900">{f.name}</h4>
                                <p className="text-[11px] text-slate-600">{f.type} • {f.distanceKm} km</p>
                              </div>
                            </div>
                            <span className="text-[10px] font-medium text-sky-700">{f.currentQueueLength} in Queue</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {filteredSearchPatients.length === 0 && filteredSearchFacilities.length === 0 && (
                    <p className="text-xs text-slate-600 text-center py-6">No matching records found for "{searchQuery}"</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
