import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { HealthcareProvider, useHealthcare } from './context/HealthcareContext';
import { LanguageProvider } from './context/LanguageContext';
import { OfflineProvider } from './context/OfflineContext';
import { AppShell } from './components/layout/AppShell';
import { IntroSplash } from './pages/splash/IntroSplash';
import { PublicLanding } from './pages/landing/PublicLanding';
import { AuthPage } from './pages/auth/AuthPage';
import { PatientDashboard } from './pages/dashboards/PatientDashboard';
import { HealthWorkerDashboard } from './pages/dashboards/HealthWorkerDashboard';
import { DoctorDashboard } from './pages/dashboards/DoctorDashboard';
import { FacilityDashboard } from './pages/dashboards/FacilityDashboard';
import { AdminDashboard } from './pages/dashboards/AdminDashboard';
import { AITriageWizard } from './pages/triage/AITriageWizard';
import { SmartFacilitiesPage } from './pages/facilities/SmartFacilitiesPage';
import { AppointmentsQueuePage } from './pages/appointments/AppointmentsQueuePage';
import { BookAppointmentPage } from './pages/appointments/BookAppointmentPage';
import { DoctorPatientWorkspace } from './pages/doctor/DoctorPatientWorkspace';
import { TeleconsultationPage } from './pages/doctor/TeleconsultationPage';
import { ClosedLoopReferralPage } from './pages/referrals/ClosedLoopReferralPage';
import { FollowUpsPage } from './pages/followups/FollowUpsPage';
import { DiagnosticsPage } from './pages/diagnostics/DiagnosticsPage';
import { MedicineInventoryPage } from './pages/medicines/MedicineInventoryPage';
import { LongitudinalRecordPage } from './pages/records/LongitudinalRecordPage';
import { NotificationCenterPage } from './pages/notifications/NotificationCenterPage';
import { SettingsPage } from './pages/settings/SettingsPage';
import { AuditLogsPage } from './pages/records/AuditLogsPage';
import { DemoWalkthroughModal } from './components/demo/DemoWalkthroughModal';
import { UserRole } from './types';

const MainRouter: React.FC = () => {
  const { currentUser, currentRole } = useAuth();

  // Session-safe Intro Splash state
  const [showSplash, setShowSplash] = useState<boolean>(() => {
    return !sessionStorage.getItem('swasthya_splash_seen');
  });

  const [currentRoute, setCurrentRoute] = useState<string>(() => window.location.pathname || '/');
  const [showDemoWalkthrough, setShowDemoWalkthrough] = useState<boolean>(false);

  const navigate = (route: string) => {
    setCurrentRoute(route);
    window.history.pushState({}, '', route);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleSplashComplete = () => {
    sessionStorage.setItem('swasthya_splash_seen', 'true');
    setShowSplash(false);
    navigate(currentUser ? `/${currentRole}/dashboard` : '/');
  };

  const handleLaunchDemo = () => {
    setShowDemoWalkthrough(true);
    navigate('/health-worker/dashboard');
  };

  if (showSplash) {
    return <IntroSplash onComplete={handleSplashComplete} />;
  }

  // Public Landing Page (when unauthenticated or on `/`)
  if (currentRoute === '/' && !currentUser) {
    return <PublicLanding onNavigate={navigate} onLaunchDemo={handleLaunchDemo} />;
  }

  // Auth Page (`/login` or `/register`)
  if (currentRoute === '/login' || currentRoute === '/register') {
    return (
      <AuthPage
        onLoginSuccess={(role: UserRole) => navigate(`/${role}/dashboard`)}
        onNavigateHome={() => navigate('/')}
      />
    );
  }

  // Render Page Content Inside Shared AppShell
  const renderContent = () => {
    switch (currentRoute) {
      // Role Dashboards
      case '/patient/dashboard':
        return <PatientDashboard onNavigate={navigate} />;
      case '/health-worker/dashboard':
      case '/health-worker/patients':
      case '/health-worker/register':
        return <HealthWorkerDashboard onNavigate={navigate} />;
      case '/doctor/dashboard':
        return <DoctorDashboard onNavigate={navigate} />;
      case '/facility/dashboard':
      case '/facility/queue':
        return <FacilityDashboard onNavigate={navigate} />;
      case '/admin/dashboard':
        return <AdminDashboard onNavigate={navigate} />;

      // Core Healthcare Feature Modules
      case '/triage':
        return <AITriageWizard onNavigate={navigate} />;
      case '/facilities':
        return <SmartFacilitiesPage onNavigate={navigate} />;
      case '/appointments':
        return <AppointmentsQueuePage onNavigate={navigate} />;
      case '/patient/appointments':
        return <BookAppointmentPage onNavigate={navigate} />;
      case '/doctor/patient/pt-101':
      case '/doctor/patient/pt-102':
      case '/doctor/patient/pt-103':
      case '/doctor/patient/pt-104':
      case '/doctor/patient/pt-105':
        return <DoctorPatientWorkspace onNavigate={navigate} patientId={currentRoute.split('/')[3]} />;
      case '/teleconsultation/apt-201':
        return <TeleconsultationPage onNavigate={navigate} />;
      case '/referrals':
        return <ClosedLoopReferralPage onNavigate={navigate} />;
      case '/follow-ups':
        return <FollowUpsPage onNavigate={navigate} />;
      case '/diagnostics':
        return <DiagnosticsPage onNavigate={navigate} />;
      case '/medicines':
        return <MedicineInventoryPage onNavigate={navigate} />;
      case '/patient/records':
        return <LongitudinalRecordPage onNavigate={navigate} />;
      case '/notifications':
        return <NotificationCenterPage onNavigate={navigate} />;
      case '/settings':
        return <SettingsPage onNavigate={navigate} />;
      case '/admin/audit-logs':
        return <AuditLogsPage onNavigate={navigate} />;

      default:
        // Default Role Redirection
        if (currentUser) {
          if (currentRole === 'patient') return <PatientDashboard onNavigate={navigate} />;
          if (currentRole === 'health-worker') return <HealthWorkerDashboard onNavigate={navigate} />;
          if (currentRole === 'doctor') return <DoctorDashboard onNavigate={navigate} />;
          if (currentRole === 'facility') return <FacilityDashboard onNavigate={navigate} />;
          return <AdminDashboard onNavigate={navigate} />;
        }
        return <PublicLanding onNavigate={navigate} onLaunchDemo={handleLaunchDemo} />;
    }
  };

  const pageTitleMap: Record<string, string> = {
    '/patient/dashboard': 'Patient Dashboard',
    '/health-worker/dashboard': 'Frontline Health Worker Dashboard',
    '/doctor/dashboard': 'Doctor OPD Dashboard',
    '/facility/dashboard': 'Facility Desk Operations',
    '/admin/dashboard': 'District Health Operations Center',
    '/triage': 'AI-Assisted Patient Triage',
    '/facilities': 'Smart Facility Matcher',
    '/appointments': 'Appointments & Token Queue',
    '/patient/appointments': 'Book Doctor OPD Appointment',
    '/referrals': 'Closed-Loop Referral Engine',
    '/follow-ups': 'Follow-Up & High Risk Pathways',
    '/diagnostics': 'Diagnostic Center',
    '/medicines': 'Pharmacy Medicine Availability',
    '/patient/records': 'Longitudinal Electronic Health Record',
    '/notifications': 'Notification Center',
    '/settings': 'System Settings & Security'
  };

  return (
    <>
      <AppShell
        currentRoute={currentRoute}
        onNavigate={navigate}
        pageTitle={pageTitleMap[currentRoute] || 'Dashboard'}
      >
        {renderContent()}
      </AppShell>

      {/* SIH Interactive Story Demo Walkthrough Overlay */}
      <DemoWalkthroughModal
        isOpen={showDemoWalkthrough}
        onClose={() => setShowDemoWalkthrough(false)}
        onNavigate={navigate}
      />
    </>
  );
};

export function App() {
  return (
    <AuthProvider>
      <HealthcareProvider>
        <LanguageProvider>
          <OfflineProvider>
            <MainRouter />
          </OfflineProvider>
        </LanguageProvider>
      </HealthcareProvider>
    </AuthProvider>
  );
}

export default App;
