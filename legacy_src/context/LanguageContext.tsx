import React, { createContext, useContext, useState } from 'react';

export type Language = 'en' | 'hi' | 'mr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    appName: 'SwasthyaSetu',
    tagline: 'From First Contact to Follow-up.',
    subheading: 'Connecting patients, frontline health workers, doctors and public healthcare facilities.',
    dashboard: 'Dashboard',
    patients: 'Patients',
    appointments: 'Appointments',
    queue: 'Live Queue',
    aiTriage: 'AI-Assisted Triage',
    diagnostics: 'Diagnostics',
    medicines: 'Medicine Availability',
    referrals: 'Closed-Loop Referrals',
    followups: 'Follow-ups & High Risk',
    healthRecords: 'Longitudinal Health Records',
    facilities: 'Smart Facilities',
    settings: 'Settings & Security',
    notifications: 'Notifications',
    online: 'Online',
    offline: 'Offline Mode',
    syncing: 'Syncing Offline Queue...',
    syncedSuccess: 'Sync Complete',
    bookAppointment: 'Book Appointment',
    startTriage: 'Start AI Triage',
    createReferral: 'Create Referral',
    viewRecords: 'View Health Record',
    launchDemo: 'Launch Guided SIH Demo',
  },
  hi: {
    appName: 'स्वास्थ्यसेतु',
    tagline: 'प्रथम संपर्क से लेकर फॉलो-अप तक।',
    subheading: 'मरीजों, अग्रिम पंक्ति के स्वास्थ्य कार्यकर्ताओं, डॉक्टरों और सरकारी स्वास्थ्य केंद्रों को जोड़ना।',
    dashboard: 'डैशबोर्ड',
    patients: 'मरीज (Patients)',
    appointments: 'अपॉइंटमेंट',
    queue: 'लाइव कतार (Queue)',
    aiTriage: 'एआई सहायतित ट्रियाज',
    diagnostics: 'जांच (Diagnostics)',
    medicines: 'दवाओं की उपलब्धता',
    referrals: 'रेफरल ट्रैकिंग (Referrals)',
    followups: 'फॉलो-अप और उच्च जोखिम',
    healthRecords: 'स्वास्थ्य रिकॉर्ड',
    facilities: 'स्मार्ट स्वास्थ्य केंद्र',
    settings: 'सेटिंग्स और सुरक्षा',
    notifications: 'सूचनाएं',
    online: 'ऑनलाइन',
    offline: 'ऑफलाइन मोड',
    syncing: 'ऑफलाइन डेटा सिंक हो रहा है...',
    syncedSuccess: 'सफलतापूर्वक सिंक हो गया',
    bookAppointment: 'अपॉइंटमेंट बुक करें',
    startTriage: 'ट्रियाज शुरू करें',
    createReferral: 'रेफरल बनाएं',
    viewRecords: 'रिकॉर्ड देखें',
    launchDemo: 'गाइडेड डेमो शुरू करें',
  },
  mr: {
    appName: 'स्वास्थ्यसेतू',
    tagline: 'पहिल्या संपर्कापासून पाठपुराव्यापर्यंत.',
    subheading: 'रुग्ण, आरोग्य सेविका, डॉक्टर आणि सरकारी आरोग्य केंद्र जोडणारा मंच.',
    dashboard: 'डॅशबोर्ड',
    patients: 'रुग्ण',
    appointments: 'वेळ बुक करा',
    queue: 'थेट रांग',
    aiTriage: 'एआय ट्रियाज',
    diagnostics: 'वैद्यकीय तपासणी',
    medicines: 'औषध उपलब्धता',
    referrals: 'रेफरल सेवा',
    followups: 'पाठपुरावा (Follow-up)',
    healthRecords: 'आरोग्य नोंद',
    facilities: 'आरोग्य केंद्र',
    settings: 'सेटिंग्ज',
    notifications: 'सूचना',
    online: 'ऑनलाइन',
    offline: 'ऑफलाइन',
    syncing: 'सिंक होत आहे...',
    syncedSuccess: 'सिंक पूर्ण झाले',
    bookAppointment: 'वेळ निश्चित करा',
    startTriage: 'ट्रियाज सुरू करा',
    createReferral: 'रेफरल तयार करा',
    viewRecords: 'नोंद पहा',
    launchDemo: 'डेमो सुरू करा',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
