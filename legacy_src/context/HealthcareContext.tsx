import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Patient, Facility, Doctor, Appointment, Referral, ReferralStatus,
  FollowUp, DiagnosticTest, DiagnosticOrder, MedicineItem, Notification,
  AuditLog, AITriageRecord, Vitals, RiskLevel
} from '../types';
import {
  initialPatients, initialFacilities, initialDoctors, initialAppointments,
  initialReferrals, initialFollowUps, initialDiagnosticTests,
  initialDiagnosticOrders, initialMedicineInventory, initialNotifications, initialAuditLogs
} from '../data/seedData';

interface HealthcareContextType {
  patients: Patient[];
  facilities: Facility[];
  doctors: Doctor[];
  appointments: Appointment[];
  referrals: Referral[];
  followUps: FollowUp[];
  diagnosticTests: DiagnosticTest[];
  diagnosticOrders: DiagnosticOrder[];
  medicines: MedicineItem[];
  notifications: Notification[];
  auditLogs: AuditLog[];
  latestTriageResult: AITriageRecord | null;
  selectedPatientId: string;
  setSelectedPatientId: (id: string) => void;
  // Actions
  registerPatient: (patientData: Partial<Patient>) => Patient;
  addDoctor: (doctorData: Omit<Doctor, 'id'>, password?: string) => Doctor;
  removeDoctor: (id: string) => void;
  addFacility: (facilityData: Omit<Facility, 'id'>) => Facility;
  removeFacility: (id: string) => void;
  addWorkerOrStaff: (userData: { name: string; email: string; phone: string; password?: string; role: 'health-worker' | 'facility'; assignedVillage?: string; facilityId?: string }) => void;
  removeWorkerOrStaff: (id: string) => void;
  runAITriage: (patientId: string, symptoms: string[], vitals: Vitals, history: string[]) => AITriageRecord;
  createReferral: (patientId: string, destFacilityId: string, reason: string, urgency: RiskLevel) => Referral;
  updateReferralStatus: (referralId: string, newStatus: ReferralStatus, updatedBy: string, notes?: string) => void;
  bookAppointment: (patientId: string, facilityId: string, doctorId: string, date: string, timeSlot: string, reason: string) => Appointment;
  callNextToken: (facilityId: string) => void;
  scheduleFollowUp: (patientId: string, pathway: any, dueDate: string, notes: string, assignedWorker: string) => FollowUp;
  orderDiagnostic: (patientId: string, testName: string, facilityName: string, doctorName: string) => DiagnosticOrder;
  reserveMedicine: (medicineId: string, qty: number) => void;
  markNotificationRead: (id: string) => void;
  addAuditLog: (userName: string, userRole: any, action: string, recordDescription: string) => void;
}

const HealthcareContext = createContext<HealthcareContextType | undefined>(undefined);

export const HealthcareProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [patients, setPatients] = useState<Patient[]>(() => {
    const saved = localStorage.getItem('swasthya_patients');
    return saved ? JSON.parse(saved) : initialPatients;
  });

  const [facilities, setFacilities] = useState<Facility[]>(() => {
    const saved = localStorage.getItem('swasthya_facilities');
    return saved ? JSON.parse(saved) : initialFacilities;
  });

  const [doctors, setDoctors] = useState<Doctor[]>(() => {
    const saved = localStorage.getItem('swasthya_doctors');
    return saved ? JSON.parse(saved) : initialDoctors;
  });
  
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('swasthya_appointments');
    return saved ? JSON.parse(saved) : initialAppointments;
  });

  const [referrals, setReferrals] = useState<Referral[]>(() => {
    const saved = localStorage.getItem('swasthya_referrals');
    return saved ? JSON.parse(saved) : initialReferrals;
  });

  const [followUps, setFollowUps] = useState<FollowUp[]>(() => {
    const saved = localStorage.getItem('swasthya_followups');
    return saved ? JSON.parse(saved) : initialFollowUps;
  });

  const [diagnosticTests] = useState<DiagnosticTest[]>(initialDiagnosticTests);

  const [diagnosticOrders, setDiagnosticOrders] = useState<DiagnosticOrder[]>(() => {
    const saved = localStorage.getItem('swasthya_diagnostic_orders');
    return saved ? JSON.parse(saved) : initialDiagnosticOrders;
  });

  const [medicines, setMedicines] = useState<MedicineItem[]>(() => {
    const saved = localStorage.getItem('swasthya_medicines');
    return saved ? JSON.parse(saved) : initialMedicineInventory;
  });

  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const saved = localStorage.getItem('swasthya_notifications');
    return saved ? JSON.parse(saved) : initialNotifications;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem('swasthya_audit_logs');
    return saved ? JSON.parse(saved) : initialAuditLogs;
  });

  const [latestTriageResult, setLatestTriageResult] = useState<AITriageRecord | null>(null);
  const [selectedPatientId, setSelectedPatientId] = useState<string>('pt-101'); // Default to Rahul Kumar

  // Synchronize state changes to localStorage
  useEffect(() => { localStorage.setItem('swasthya_patients', JSON.stringify(patients)); }, [patients]);
  useEffect(() => { localStorage.setItem('swasthya_facilities', JSON.stringify(facilities)); }, [facilities]);
  useEffect(() => { localStorage.setItem('swasthya_doctors', JSON.stringify(doctors)); }, [doctors]);
  useEffect(() => { localStorage.setItem('swasthya_appointments', JSON.stringify(appointments)); }, [appointments]);
  useEffect(() => { localStorage.setItem('swasthya_referrals', JSON.stringify(referrals)); }, [referrals]);
  useEffect(() => { localStorage.setItem('swasthya_followups', JSON.stringify(followUps)); }, [followUps]);
  useEffect(() => { localStorage.setItem('swasthya_diagnostic_orders', JSON.stringify(diagnosticOrders)); }, [diagnosticOrders]);
  useEffect(() => { localStorage.setItem('swasthya_medicines', JSON.stringify(medicines)); }, [medicines]);
  useEffect(() => { localStorage.setItem('swasthya_notifications', JSON.stringify(notifications)); }, [notifications]);
  useEffect(() => { localStorage.setItem('swasthya_audit_logs', JSON.stringify(auditLogs)); }, [auditLogs]);

  const addAuditLog = (userName: string, userRole: any, action: string, recordDescription: string) => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      userName,
      userRole,
      action,
      recordDescription,
      timestamp: new Date().toLocaleString(),
      resultStatus: 'Success'
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const addDoctor = (doctorData: Omit<Doctor, 'id'>, password?: string): Doctor => {
    const newDoctor: Doctor = {
      id: `doc-${Date.now().toString().slice(-4)}`,
      ...doctorData
    };
    setDoctors(prev => [...prev, newDoctor]);
    addAuditLog('Admin', 'admin', 'Registered New Doctor', `${newDoctor.name} (${newDoctor.specialty}) at ${newDoctor.facilityName}`);

    // Also register user account in user database
    try {
      const savedUsers = localStorage.getItem('swasthya_users_db');
      const userList = savedUsers ? JSON.parse(savedUsers) : [];
      const newUser = {
        id: `usr-${newDoctor.id}`,
        name: newDoctor.name,
        email: newDoctor.email || `${newDoctor.name.toLowerCase().replace(/[^a-z0-9]/g, '')}@swasthyasetu.ac.in`,
        phone: newDoctor.phone,
        password: password || 'doctor@123',
        role: 'doctor',
        facilityId: newDoctor.facilityId
      };
      userList.push(newUser);
      localStorage.setItem('swasthya_users_db', JSON.stringify(userList));
    } catch (e) {
      console.error(e);
    }

    return newDoctor;
  };

  const removeDoctor = (id: string) => {
    const doc = doctors.find(d => d.id === id);
    setDoctors(prev => prev.filter(d => d.id !== id));
    addAuditLog('Admin', 'admin', 'Removed Doctor', doc ? doc.name : id);

    // Also remove from user database
    try {
      const savedUsers = localStorage.getItem('swasthya_users_db');
      if (savedUsers) {
        const userList = JSON.parse(savedUsers);
        const filtered = userList.filter((u: any) => u.id !== `usr-${id}` && u.email !== doc?.email);
        localStorage.setItem('swasthya_users_db', JSON.stringify(filtered));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const addFacility = (facilityData: Omit<Facility, 'id'>): Facility => {
    const newFacility: Facility = {
      id: `fac-${Date.now().toString().slice(-4)}`,
      ...facilityData
    };
    setFacilities(prev => [...prev, newFacility]);
    addAuditLog('Admin', 'admin', 'Registered New Facility', `${newFacility.name} (${newFacility.type}) in ${newFacility.villageBlock}`);
    return newFacility;
  };

  const removeFacility = (id: string) => {
    const fac = facilities.find(f => f.id === id);
    setFacilities(prev => prev.filter(f => f.id !== id));
    addAuditLog('Admin', 'admin', 'Removed Facility', fac ? fac.name : id);
  };

  const addWorkerOrStaff = (userData: { name: string; email: string; phone: string; password?: string; role: 'health-worker' | 'facility'; assignedVillage?: string; facilityId?: string }) => {
    try {
      const savedUsers = localStorage.getItem('swasthya_users_db');
      const userList = savedUsers ? JSON.parse(savedUsers) : [];
      const newUser = {
        id: `usr-${Date.now().toString().slice(-4)}`,
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        password: userData.password || (userData.role === 'health-worker' ? 'asha@123' : 'facility@123'),
        role: userData.role,
        assignedVillage: userData.assignedVillage,
        facilityId: userData.facilityId
      };
      userList.push(newUser);
      localStorage.setItem('swasthya_users_db', JSON.stringify(userList));
      addAuditLog('Admin', 'admin', `Registered New ${userData.role === 'health-worker' ? 'ASHA Worker' : 'Facility Staff'}`, `${userData.name} (${userData.email})`);
    } catch (e) {
      console.error(e);
    }
  };

  const removeWorkerOrStaff = (id: string) => {
    try {
      const savedUsers = localStorage.getItem('swasthya_users_db');
      if (savedUsers) {
        const userList = JSON.parse(savedUsers);
        const target = userList.find((u: any) => u.id === id || u.email === id);
        const filtered = userList.filter((u: any) => u.id !== id && u.email !== id);
        localStorage.setItem('swasthya_users_db', JSON.stringify(filtered));
        addAuditLog('Admin', 'admin', 'Removed Staff/Worker', target ? target.name : id);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const registerPatient = (patientData: Partial<Patient>): Patient => {
    const newPatient: Patient = {
      id: `pt-${Date.now().toString().slice(-4)}`,
      abhaId: `ABHA-9821-4432-${Math.floor(1000 + Math.random() * 9000)}`,
      name: patientData.name || 'New Patient',
      email: patientData.email,
      password: patientData.password || 'rahul@123',
      age: patientData.age || 30,
      gender: patientData.gender || 'Male',
      phone: patientData.phone || '+91 90000 00000',
      bloodGroup: patientData.bloodGroup || 'B+',
      emergencyContact: patientData.emergencyContact || '',
      village: patientData.village || 'Rampur',
      block: patientData.block || 'Rampur Block',
      district: patientData.district || 'Sitapur',
      assignedHealthWorker: patientData.assignedHealthWorker || 'Sunita Devi (ASHA)',
      riskLevel: 'LOW',
      registeredDate: new Date().toISOString().split('T')[0],
      currentMedicines: [],
      allergies: [],
      medicalHistory: [],
      vitals: patientData.vitals || [{
        bpSystolic: 120, bpDiastolic: 80, pulse: 75, temperature: 98.6, spO2: 98, respiratoryRate: 18,
        recordedAt: new Date().toLocaleString()
      }]
    };
    setPatients(prev => [newPatient, ...prev]);
    addAuditLog('Frontline Worker', 'health-worker', 'Registered New Patient', `Patient ${newPatient.name} (${newPatient.abhaId})`);

    // Create user login account for patient so they can sign in!
    if (newPatient.email) {
      try {
        const savedUsers = localStorage.getItem('swasthya_users_db');
        const userList = savedUsers ? JSON.parse(savedUsers) : [];
        const existingIdx = userList.findIndex((u: any) => u.email.toLowerCase() === newPatient.email!.toLowerCase());
        const patientUser = {
          id: `usr-${newPatient.id}`,
          name: newPatient.name,
          email: newPatient.email,
          phone: newPatient.phone,
          password: newPatient.password || 'rahul@123',
          role: 'patient',
          assignedVillage: newPatient.village
        };
        if (existingIdx >= 0) {
          userList[existingIdx] = patientUser;
        } else {
          userList.push(patientUser);
        }
        localStorage.setItem('swasthya_users_db', JSON.stringify(userList));
      } catch (e) {
        console.error(e);
      }
    }

    return newPatient;
  };

  const runAITriage = (patientId: string, symptoms: string[], vitals: Vitals, history: string[]): AITriageRecord => {
    // Intelligent rule-based risk evaluation algorithm
    let calculatedRisk: RiskLevel = 'LOW';
    let urgencyExplanation = 'Symptoms present mild urgency. Routine OPD consultation is recommended.';
    let recommendedPathway = 'Primary Health Centre (PHC) OPD Evaluation';
    let recommendedFacilityType = 'Primary Health Centre (PHC)';

    const chestOrBreathing = symptoms.some(s => s.toLowerCase().includes('chest') || s.toLowerCase().includes('breath'));
    const severeVitals = vitals.bpSystolic >= 140 || vitals.bpDiastolic >= 90 || vitals.spO2 < 95 || vitals.temperature > 102;

    if (chestOrBreathing || severeVitals || vitals.spO2 < 94) {
      calculatedRisk = 'HIGH';
      urgencyExplanation = 'AI-assisted triage indicates high urgency due to acute symptoms and elevated cardiovascular/respiratory vitals.';
      recommendedPathway = 'Urgent Clinical Evaluation & Cardiology Referral';
      recommendedFacilityType = 'District Hospital or CHC Trauma Unit';
    } else if (symptoms.length > 2 || vitals.bpSystolic > 130 || vitals.temperature > 100) {
      calculatedRisk = 'MEDIUM';
      urgencyExplanation = 'Moderate symptom burden requiring priority physician review within 24 hours.';
      recommendedPathway = 'CHC / PHC Doctor Consultation';
    }

    const triageRecord: AITriageRecord = {
      id: `trg-${Date.now()}`,
      patientId,
      symptoms,
      vitals,
      relevantHistory: history,
      riskLevel: calculatedRisk,
      urgencyExplanation,
      recommendedPathway,
      recommendedFacilityType,
      confidenceScore: 0.94,
      createdTimestamp: new Date().toLocaleString(),
      disclaimer: 'AI-assisted triage decision support — verify against source medical records. Not a autonomous diagnosis.'
    };

    setLatestTriageResult(triageRecord);

    // Update patient risk status in state
    setPatients(prev => prev.map(p => p.id === patientId ? {
      ...p,
      riskLevel: calculatedRisk,
      vitals: [vitals, ...p.vitals]
    } : p));

    // Dispatch Notification if High Risk
    if (calculatedRisk === 'HIGH') {
      const patient = patients.find(p => p.id === patientId);
      const newNotif: Notification = {
        id: `notif-${Date.now()}`,
        title: 'HIGH-RISK AI TRIAGE ALERT',
        message: `High risk detected for ${patient?.name || 'Patient'} (${symptoms.join(', ')}). Immediate evaluation advised.`,
        type: 'Emergency',
        read: false,
        timestamp: 'Just now',
        linkRoute: '/triage'
      };
      setNotifications(prev => [newNotif, ...prev]);
    }

    addAuditLog('Sunita Devi (ASHA)', 'health-worker', 'Ran AI-Assisted Triage', `Patient ID #${patientId} - Assigned ${calculatedRisk} Risk`);
    return triageRecord;
  };

  const createReferral = (patientId: string, destFacilityId: string, reason: string, urgency: RiskLevel): Referral => {
    const patient = patients.find(p => p.id === patientId) || patients[0];
    const destFacility = facilities.find(f => f.id === destFacilityId) || facilities[2];

    const newReferral: Referral = {
      id: `ref-${Math.floor(100 + Math.random() * 900)}`,
      patientId,
      patientName: patient.name,
      patientAge: patient.age,
      sourceFacilityName: 'PHC Rampur',
      destinationFacilityId: destFacility.id,
      destinationFacilityName: destFacility.name,
      reason,
      urgency,
      createdDate: new Date().toISOString().split('T')[0],
      status: 'Created',
      timeline: [
        { status: 'Created', timestamp: new Date().toLocaleString(), updatedBy: 'Sunita Devi (ASHA Rampur)', notes: 'Referral dispatched via closed-loop network' }
      ]
    };

    setReferrals(prev => [newReferral, ...prev]);

    // Dispatch Notification to Doctor & Destination Facility
    const notif: Notification = {
      id: `notif-${Date.now()}`,
      title: 'New Referral Dispatched',
      message: `Referral created for ${patient.name} to ${destFacility.name} (${urgency} Urgency).`,
      type: 'Referral',
      read: false,
      timestamp: 'Just now',
      linkRoute: '/referrals'
    };
    setNotifications(prev => [notif, ...prev]);

    addAuditLog('Sunita Devi (ASHA)', 'health-worker', 'Created Closed-Loop Referral', `Patient ${patient.name} to ${destFacility.name}`);
    return newReferral;
  };

  const updateReferralStatus = (referralId: string, newStatus: ReferralStatus, updatedBy: string, notes?: string) => {
    setReferrals(prev => prev.map(ref => {
      if (ref.id === referralId) {
        const newStep = { status: newStatus, timestamp: new Date().toLocaleString(), updatedBy, notes };
        return {
          ...ref,
          status: newStatus,
          timeline: [...ref.timeline, newStep]
        };
      }
      return ref;
    }));
    addAuditLog(updatedBy, 'doctor', 'Updated Referral Lifecycle Status', `Referral #${referralId} -> ${newStatus}`);
  };

  const bookAppointment = (patientId: string, facilityId: string, doctorId: string, date: string, timeSlot: string, reason: string): Appointment => {
    const patient = patients.find(p => p.id === patientId) || patients[0];
    const facility = facilities.find(f => f.id === facilityId) || facilities[0];
    const doctor = doctors.find(d => d.id === doctorId) || doctors[0];

    const newToken = Math.floor(25 + Math.random() * 15);
    const newAppointment: Appointment = {
      id: `apt-${Date.now().toString().slice(-4)}`,
      tokenNumber: newToken,
      patientId: patient.id,
      patientName: patient.name,
      patientAge: patient.age,
      patientGender: patient.gender,
      doctorId: doctor.id,
      doctorName: doctor.name,
      facilityId: facility.id,
      facilityName: facility.name,
      date,
      timeSlot,
      status: 'Confirmed',
      urgency: patient.riskLevel,
      reason,
      patientsAhead: 4,
      estimatedWaitMinutes: 20
    };

    setAppointments(prev => [newAppointment, ...prev]);
    addAuditLog(patient.name, 'patient', 'Booked Appointment', `${facility.name} with ${doctor.name} (Token #${newToken})`);
    return newAppointment;
  };

  const callNextToken = (facilityId: string) => {
    setAppointments(prev => {
      const active = prev.filter(a => a.facilityId === facilityId && a.status === 'Confirmed');
      if (active.length > 0) {
        const nextApt = active[0];
        return prev.map(a => a.id === nextApt.id ? { ...a, status: 'In Consultation' } : a);
      }
      return prev;
    });
    addAuditLog('PHC Desk', 'facility', 'Called Next Token', `Facility #${facilityId} Token Advanced`);
  };

  const scheduleFollowUp = (patientId: string, pathway: any, dueDate: string, notes: string, assignedWorker: string): FollowUp => {
    const patient = patients.find(p => p.id === patientId) || patients[0];
    const newFollowUp: FollowUp = {
      id: `flw-${Date.now().toString().slice(-4)}`,
      patientId,
      patientName: patient.name,
      patientAge: patient.age,
      patientPhone: patient.phone,
      village: patient.village,
      pathway,
      dueDate,
      status: 'Scheduled',
      assignedWorkerName: assignedWorker,
      riskLevel: patient.riskLevel,
      notes
    };
    setFollowUps(prev => [newFollowUp, ...prev]);
    addAuditLog(assignedWorker, 'health-worker', 'Scheduled Follow-Up Visit', `Patient ${patient.name} due on ${dueDate}`);
    return newFollowUp;
  };

  const orderDiagnostic = (patientId: string, testName: string, facilityName: string, doctorName: string): DiagnosticOrder => {
    const patient = patients.find(p => p.id === patientId) || patients[0];
    const newOrder: DiagnosticOrder = {
      id: `ord-${Date.now().toString().slice(-4)}`,
      patientId,
      patientName: patient.name,
      testName,
      facilityName,
      orderedByDoctor: doctorName,
      orderedDate: new Date().toLocaleString(),
      status: 'Booked',
      resultSummary: 'Pending Lab Processing'
    };
    setDiagnosticOrders(prev => [newOrder, ...prev]);
    addAuditLog(doctorName, 'doctor', 'Ordered Diagnostic Test', `${testName} for ${patient.name}`);
    return newOrder;
  };

  const reserveMedicine = (medicineId: string, qty: number) => {
    setMedicines(prev => prev.map(m => {
      if (m.id === medicineId) {
        const newQty = Math.max(0, m.quantity - qty);
        return {
          ...m,
          quantity: newQty,
          status: newQty === 0 ? 'Out of Stock' : newQty <= m.minThreshold ? 'Low Stock' : 'Available'
        };
      }
      return m;
    }));
    addAuditLog('System', 'patient', 'Reserved Medicine Stock', `Item #${medicineId} Qty: -${qty}`);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <HealthcareContext.Provider value={{
      patients,
      facilities,
      doctors,
      appointments,
      referrals,
      followUps,
      diagnosticTests,
      diagnosticOrders,
      medicines,
      notifications,
      auditLogs,
      latestTriageResult,
      selectedPatientId,
      setSelectedPatientId,
      registerPatient,
      addDoctor,
      removeDoctor,
      addFacility,
      removeFacility,
      addWorkerOrStaff,
      removeWorkerOrStaff,
      runAITriage,
      createReferral,
      updateReferralStatus,
      bookAppointment,
      callNextToken,
      scheduleFollowUp,
      orderDiagnostic,
      reserveMedicine,
      markNotificationRead,
      addAuditLog
    }}>
      {children}
    </HealthcareContext.Provider>
  );
};

export const useHealthcare = () => {
  const context = useContext(HealthcareContext);
  if (!context) throw new Error('useHealthcare must be used within HealthcareProvider');
  return context;
};
