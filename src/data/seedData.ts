import {
  Patient, Facility, Doctor, Appointment, Referral,
  FollowUp, DiagnosticTest, DiagnosticOrder, MedicineItem,
  Notification, AuditLog, User
} from '../types';

export const initialUsers: User[] = [
  {
    id: 'usr-patient-1',
    name: 'Rahul Kumar',
    email: 'patient-rahul@gmail.com',
    password: 'rahul 123',
    phone: '+91 98765 43210',
    role: 'patient',
    assignedVillage: 'Rampur'
  },
  {
    id: 'usr-hw-1',
    name: 'Sunita Devi (ASHA)',
    email: 'asha@swasthyasetu.ac.in',
    password: 'asha@123',
    phone: '+91 98123 45678',
    role: 'health-worker',
    facilityId: 'fac-1',
    assignedVillage: 'Rampur'
  },
  {
    id: 'usr-doc-1',
    name: 'Dr. Ramesh Sharma',
    email: 'doctor@swasthyasetu.ac.in',
    password: 'doctor@123',
    phone: '+91 99887 76655',
    role: 'doctor',
    facilityId: 'fac-1'
  },
  {
    id: 'usr-fac-1',
    name: 'PHC Rampur Desk',
    email: 'facility@swasthyasetu.ac.in',
    password: 'facility@123',
    phone: '+91 91122 33445',
    role: 'facility',
    facilityId: 'fac-1'
  },
  {
    id: 'usr-admin-1',
    name: 'Admin',
    email: 'admin@swasthyasetu.ac.in',
    password: 'admin@123',
    phone: '+91 94433 22110',
    role: 'admin'
  }
];

export const initialFacilities: Facility[] = [
  {
    id: 'fac-1',
    name: 'PHC Rampur',
    type: 'Primary Health Centre (PHC)',
    villageBlock: 'Rampur Block',
    distanceKm: 4.8,
    lat: 26.8467,
    lng: 80.9462,
    availableDoctorsCount: 2,
    currentQueueLength: 4,
    estimatedWaitTimeMinutes: 15,
    medicineAvailabilityPercent: 88,
    diagnosticAvailabilityPercent: 80,
    services: ['General Medicine', 'Basic Diagnostics (CBC, Blood Sugar)', '24x7 Pharmacy', 'Maternal Care'],
    phone: '+91 522 234567',
    isBestMatch: true
  },
  {
    id: 'fac-2',
    name: 'CHC Nandgaon',
    type: 'Community Health Centre (CHC)',
    villageBlock: 'Nandgaon Block',
    distanceKm: 11.2,
    lat: 26.8612,
    lng: 80.9811,
    availableDoctorsCount: 4,
    currentQueueLength: 9,
    estimatedWaitTimeMinutes: 30,
    medicineAvailabilityPercent: 92,
    diagnosticAvailabilityPercent: 90,
    services: ['General Surgery', 'Obstetrics & Gynaecology', 'Pediatrics', 'X-Ray & ECG', 'Pharmacy'],
    phone: '+91 522 345678'
  },
  {
    id: 'fac-3',
    name: 'District Hospital Sitapur',
    type: 'District Hospital',
    villageBlock: 'Sitapur Central',
    distanceKm: 24.5,
    lat: 26.8992,
    lng: 81.0123,
    availableDoctorsCount: 14,
    currentQueueLength: 22,
    estimatedWaitTimeMinutes: 55,
    medicineAvailabilityPercent: 96,
    diagnosticAvailabilityPercent: 98,
    services: ['Cardiology', 'ICU & Trauma', 'Advanced Diagnostics (CT Scan, Ultrasound)', 'Specialist Surgery', 'Central Pharmacy'],
    phone: '+91 522 456789'
  },
  {
    id: 'fac-4',
    name: 'Rural Health Centre Devpur',
    type: 'Rural Health Centre',
    villageBlock: 'Devpur Block',
    distanceKm: 7.4,
    lat: 26.8234,
    lng: 80.9123,
    availableDoctorsCount: 1,
    currentQueueLength: 6,
    estimatedWaitTimeMinutes: 20,
    medicineAvailabilityPercent: 74,
    diagnosticAvailabilityPercent: 60,
    services: ['Basic OPD', 'Immunization', 'First Aid'],
    phone: '+91 522 567890'
  },
  {
    id: 'fac-5',
    name: 'Community Health Centre Shivpur',
    type: 'Community Health Centre (CHC)',
    villageBlock: 'Shivpur Block',
    distanceKm: 18.0,
    lat: 26.9123,
    lng: 80.8901,
    availableDoctorsCount: 3,
    currentQueueLength: 12,
    estimatedWaitTimeMinutes: 40,
    medicineAvailabilityPercent: 82,
    diagnosticAvailabilityPercent: 85,
    services: ['OPD', 'Maternal Delivery Care', 'Pathology Lab'],
    phone: '+91 522 678901'
  },
  {
    id: 'fac-6',
    name: 'Sub-Centre Kalyanpur',
    type: 'Primary Health Centre (PHC)',
    villageBlock: 'Kalyanpur Block',
    distanceKm: 13.6,
    lat: 26.8345,
    lng: 80.9990,
    availableDoctorsCount: 1,
    currentQueueLength: 3,
    estimatedWaitTimeMinutes: 10,
    medicineAvailabilityPercent: 70,
    diagnosticAvailabilityPercent: 50,
    services: ['ASHA Counseling', 'Antenatal Checkups', 'Basic Medicines'],
    phone: '+91 522 789012'
  }
];

export const initialDoctors: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. Ramesh Sharma',
    specialty: 'General Medicine & Cardiology',
    facilityId: 'fac-1',
    facilityName: 'PHC Rampur',
    availableToday: true,
    activeQueueCount: 4,
    phone: '+91 99887 76655',
    experienceYears: 14
  },
  {
    id: 'doc-2',
    name: 'Dr. Ananya Gupta',
    specialty: 'Obstetrics & Gynaecology',
    facilityId: 'fac-2',
    facilityName: 'CHC Nandgaon',
    availableToday: true,
    activeQueueCount: 6,
    phone: '+91 99776 65544',
    experienceYears: 10
  },
  {
    id: 'doc-3',
    name: 'Dr. Rajesh Verma',
    specialty: 'Senior Cardiologist',
    facilityId: 'fac-3',
    facilityName: 'District Hospital Sitapur',
    availableToday: true,
    activeQueueCount: 12,
    phone: '+91 99665 54433',
    experienceYears: 20
  },
  {
    id: 'doc-4',
    name: 'Dr. Priya Singh',
    specialty: 'Pediatrics & Child Health',
    facilityId: 'fac-2',
    facilityName: 'CHC Nandgaon',
    availableToday: true,
    activeQueueCount: 3,
    phone: '+91 99554 43322',
    experienceYears: 8
  },
  {
    id: 'doc-5',
    name: 'Dr. Suresh Yadav',
    specialty: 'Orthopedics & Trauma',
    facilityId: 'fac-3',
    facilityName: 'District Hospital Sitapur',
    availableToday: true,
    activeQueueCount: 8,
    phone: '+91 99443 32211',
    experienceYears: 16
  }
];

export const initialPatients: Patient[] = [
  {
    id: 'pt-101',
    abhaId: 'ABHA-9821-4432-1001',
    name: 'Rahul Kumar',
    age: 52,
    gender: 'Male',
    phone: '+91 98765 43210',
    village: 'Rampur',
    block: 'Rampur Block',
    district: 'Sitapur',
    assignedHealthWorker: 'Sunita Devi (ASHA)',
    riskLevel: 'HIGH',
    carePathway: 'Chronic Care',
    registeredDate: '2026-08-10',
    currentMedicines: ['Amlodipine 5mg', 'Atorvastatin 10mg'],
    allergies: [{ id: 'alg-1', allergen: 'Penicillin', severity: 'Moderate' }],
    medicalHistory: [
      { id: 'mh-1', condition: 'Hypertension', diagnosedDate: '2023-04-15', status: 'Active', notes: 'Stage 1 essential hypertension' },
      { id: 'mh-2', condition: 'Mild Hyperlipidemia', diagnosedDate: '2024-01-20', status: 'Active' }
    ],
    vitals: [
      { bpSystolic: 148, bpDiastolic: 94, pulse: 88, temperature: 98.6, spO2: 96, respiratoryRate: 20, recordedAt: '2026-09-07 10:15 AM' },
      { bpSystolic: 138, bpDiastolic: 88, pulse: 82, temperature: 98.4, spO2: 98, respiratoryRate: 18, recordedAt: '2026-08-20 09:30 AM' }
    ]
  },
  {
    id: 'pt-102',
    abhaId: 'ABHA-9821-4432-1002',
    name: 'Sita Devi',
    age: 26,
    gender: 'Female',
    phone: '+91 98111 22233',
    village: 'Nandgaon',
    block: 'Nandgaon Block',
    district: 'Sitapur',
    assignedHealthWorker: 'Sunita Devi (ASHA)',
    riskLevel: 'MEDIUM',
    carePathway: 'Maternal ANC',
    registeredDate: '2026-05-12',
    currentMedicines: ['Iron Folic Acid Supplement', 'Calcium 500mg'],
    allergies: [],
    medicalHistory: [
      { id: 'mh-3', condition: '2nd Trimester Pregnancy (24 Weeks)', diagnosedDate: '2026-03-20', status: 'Active' }
    ],
    vitals: [
      { bpSystolic: 122, bpDiastolic: 78, pulse: 78, temperature: 98.6, spO2: 99, respiratoryRate: 16, recordedAt: '2026-09-06 11:00 AM' }
    ]
  },
  {
    id: 'pt-103',
    abhaId: 'ABHA-9821-4432-1003',
    name: 'Amit Verma',
    age: 4,
    gender: 'Male',
    phone: '+91 98222 33344',
    village: 'Rampur',
    block: 'Rampur Block',
    district: 'Sitapur',
    assignedHealthWorker: 'Anita Singh (ANM)',
    riskLevel: 'LOW',
    carePathway: 'Child Care',
    registeredDate: '2026-02-14',
    currentMedicines: ['Multivitamin Drops'],
    allergies: [],
    medicalHistory: [
      { id: 'mh-4', condition: 'Routine Vaccination Track', diagnosedDate: '2022-09-10', status: 'Active' }
    ],
    vitals: [
      { bpSystolic: 100, bpDiastolic: 65, pulse: 102, temperature: 98.8, spO2: 99, respiratoryRate: 24, recordedAt: '2026-09-01 10:00 AM' }
    ]
  },
  {
    id: 'pt-104',
    abhaId: 'ABHA-9821-4432-1004',
    name: 'Pooja Sharma',
    age: 34,
    gender: 'Female',
    phone: '+91 98333 44455',
    village: 'Devpur',
    block: 'Devpur Block',
    district: 'Sitapur',
    assignedHealthWorker: 'Sunita Devi (ASHA)',
    riskLevel: 'MEDIUM',
    carePathway: 'Chronic Care',
    registeredDate: '2026-07-01',
    currentMedicines: ['Metformin 500mg'],
    allergies: [],
    medicalHistory: [
      { id: 'mh-5', condition: 'Type 2 Diabetes Mellitus', diagnosedDate: '2025-11-10', status: 'Active' }
    ],
    vitals: [
      { bpSystolic: 130, bpDiastolic: 84, pulse: 80, temperature: 98.6, spO2: 98, respiratoryRate: 18, recordedAt: '2026-09-05 04:30 PM' }
    ]
  },
  {
    id: 'pt-105',
    abhaId: 'ABHA-9821-4432-1005',
    name: 'Ramesh Yadav',
    age: 64,
    gender: 'Male',
    phone: '+91 98444 55566',
    village: 'Shivpur',
    block: 'Shivpur Block',
    district: 'Sitapur',
    assignedHealthWorker: 'Meena Kumari (ASHA)',
    riskLevel: 'HIGH',
    carePathway: 'Chronic Care',
    registeredDate: '2026-01-20',
    currentMedicines: ['Insulin Human 30/70', 'Telmisartan 40mg'],
    allergies: [{ id: 'alg-2', allergen: 'Sulfa Drugs', severity: 'Severe' }],
    medicalHistory: [
      { id: 'mh-6', condition: 'Diabetic Nephropathy Stage 2', diagnosedDate: '2025-06-15', status: 'Active' }
    ],
    vitals: [
      { bpSystolic: 154, bpDiastolic: 96, pulse: 92, temperature: 99.1, spO2: 95, respiratoryRate: 22, recordedAt: '2026-09-04 02:15 PM' }
    ]
  }
];

export const initialAppointments: Appointment[] = [
  {
    id: 'apt-201',
    tokenNumber: 24,
    patientId: 'pt-101',
    patientName: 'Rahul Kumar',
    patientAge: 52,
    patientGender: 'Male',
    doctorId: 'doc-1',
    doctorName: 'Dr. Ramesh Sharma',
    facilityId: 'fac-1',
    facilityName: 'PHC Rampur',
    date: '2026-09-07',
    timeSlot: '11:30 AM',
    status: 'Confirmed',
    urgency: 'HIGH',
    reason: 'Acute chest discomfort & elevated blood pressure assessment',
    patientsAhead: 4,
    estimatedWaitMinutes: 20
  },
  {
    id: 'apt-202',
    tokenNumber: 18,
    patientId: 'pt-102',
    patientName: 'Sita Devi',
    patientAge: 26,
    patientGender: 'Female',
    doctorId: 'doc-2',
    doctorName: 'Dr. Ananya Gupta',
    facilityId: 'fac-2',
    facilityName: 'CHC Nandgaon',
    date: '2026-09-07',
    timeSlot: '12:00 PM',
    status: 'Confirmed',
    urgency: 'MEDIUM',
    reason: 'Routine 2nd Trimester ANC Evaluation',
    patientsAhead: 2,
    estimatedWaitMinutes: 10
  }
];

export const initialReferrals: Referral[] = [
  {
    id: 'ref-301',
    patientId: 'pt-101',
    patientName: 'Rahul Kumar',
    patientAge: 52,
    sourceFacilityName: 'PHC Rampur',
    destinationFacilityId: 'fac-3',
    destinationFacilityName: 'District Hospital Sitapur',
    reason: 'Specialist Cardiology Evaluation & 12-lead ECG/TMT for suspected coronary artery syndrome',
    urgency: 'HIGH',
    createdDate: '2026-09-07',
    status: 'Accepted',
    assignedDoctorName: 'Dr. Rajesh Verma (Cardiologist)',
    timeline: [
      { status: 'Created', timestamp: '2026-09-07 10:30 AM', updatedBy: 'Sunita Devi (ASHA Rampur)', notes: 'AI Triage high risk alert generated' },
      { status: 'Accepted', timestamp: '2026-09-07 10:45 AM', updatedBy: 'District Hospital Desk', notes: 'Cardiology OPD slot assigned for today' }
    ]
  },
  {
    id: 'ref-302',
    patientId: 'pt-105',
    patientName: 'Ramesh Yadav',
    patientAge: 64,
    sourceFacilityName: 'CHC Shivpur',
    destinationFacilityId: 'fac-3',
    destinationFacilityName: 'District Hospital Sitapur',
    reason: 'Nephrology consultation for rising Serum Creatinine',
    urgency: 'HIGH',
    createdDate: '2026-09-05',
    status: 'Overdue',
    timeline: [
      { status: 'Created', timestamp: '2026-09-05 02:00 PM', updatedBy: 'Meena Kumari (ASHA)', notes: 'Referral generated' },
      { status: 'Overdue', timestamp: '2026-09-07 09:00 AM', updatedBy: 'System Auto Escalation', notes: 'Patient failed to report within 48h deadline' }
    ]
  }
];

export const initialFollowUps: FollowUp[] = [
  {
    id: 'flw-401',
    patientId: 'pt-101',
    patientName: 'Rahul Kumar',
    patientAge: 52,
    patientPhone: '+91 98765 43210',
    village: 'Rampur',
    pathway: 'Chronic Care',
    dueDate: '2026-09-09',
    status: 'Scheduled',
    assignedWorkerName: 'Sunita Devi (ASHA)',
    riskLevel: 'HIGH',
    notes: 'Check post-consultation BP, medication compliance, and chest symptom status.'
  },
  {
    id: 'flw-402',
    patientId: 'pt-102',
    patientName: 'Sita Devi',
    patientAge: 26,
    patientPhone: '+91 98111 22233',
    village: 'Nandgaon',
    pathway: 'Maternal Care',
    dueDate: '2026-09-06',
    status: 'Overdue',
    assignedWorkerName: 'Sunita Devi (ASHA)',
    riskLevel: 'MEDIUM',
    notes: 'Overdue 2nd ANC Checkup & Iron supplement distribution.'
  },
  {
    id: 'flw-403',
    patientId: 'pt-103',
    patientName: 'Amit Verma',
    patientAge: 4,
    patientPhone: '+91 98222 33344',
    village: 'Rampur',
    pathway: 'Child Care',
    dueDate: '2026-09-12',
    status: 'Scheduled',
    assignedWorkerName: 'Anita Singh (ANM)',
    riskLevel: 'LOW',
    notes: 'Booster Dose Vaccination & Growth Measurement.'
  }
];

export const initialDiagnosticTests: DiagnosticTest[] = [
  { id: 'diag-1', testName: 'Complete Blood Count (CBC)', category: 'Pathology', facilityId: 'fac-1', facilityName: 'PHC Rampur', available: true, nextAvailableSlot: 'Today, 02:00 PM', priceEstimate: 'Free (Govt Scheme)' },
  { id: 'diag-2', testName: 'Random Blood Glucose', category: 'Pathology', facilityId: 'fac-1', facilityName: 'PHC Rampur', available: true, nextAvailableSlot: 'Immediate', priceEstimate: 'Free (Govt Scheme)' },
  { id: 'diag-3', testName: '12-Lead ECG', category: 'Cardiology', facilityId: 'fac-2', facilityName: 'CHC Nandgaon', available: true, nextAvailableSlot: 'Today, 01:30 PM', priceEstimate: 'Free (Govt Scheme)' },
  { id: 'diag-4', testName: 'Chest X-Ray (PA View)', category: 'Radiology', facilityId: 'fac-2', facilityName: 'CHC Nandgaon', available: true, nextAvailableSlot: 'Today, 03:00 PM', priceEstimate: 'Free (Govt Scheme)' },
  { id: 'diag-5', testName: 'Cardiac Troponin-I Test', category: 'Emergency Pathology', facilityId: 'fac-3', facilityName: 'District Hospital Sitapur', available: true, nextAvailableSlot: 'Immediate', priceEstimate: 'Free (Govt Scheme)' }
];

export const initialDiagnosticOrders: DiagnosticOrder[] = [
  {
    id: 'ord-101',
    patientId: 'pt-101',
    patientName: 'Rahul Kumar',
    testName: '12-Lead ECG & Troponin-I',
    facilityName: 'District Hospital Sitapur',
    orderedByDoctor: 'Dr. Ramesh Sharma',
    orderedDate: '2026-09-07 10:30 AM',
    status: 'Booked',
    resultSummary: 'Pending Lab Processing'
  }
];

export const initialMedicineInventory: MedicineItem[] = [
  { id: 'med-1', name: 'Paracetamol 500mg', category: 'Analgesics', facilityId: 'fac-1', facilityName: 'PHC Rampur', quantity: 450, minThreshold: 100, status: 'Available', lastUpdated: '2026-09-07 08:00 AM', unit: 'Tablets' },
  { id: 'med-2', name: 'Amlodipine 5mg', category: 'Cardiovascular', facilityId: 'fac-1', facilityName: 'PHC Rampur', quantity: 180, minThreshold: 50, status: 'Available', lastUpdated: '2026-09-07 08:00 AM', unit: 'Tablets' },
  { id: 'med-3', name: 'Amoxicillin 500mg Capsule', category: 'Antibiotics', facilityId: 'fac-1', facilityName: 'PHC Rampur', quantity: 14, minThreshold: 40, status: 'Low Stock', lastUpdated: '2026-09-07 08:00 AM', unit: 'Capsules' },
  { id: 'med-4', name: 'Oral Rehydration Salts (ORS)', category: 'Essential Supplies', facilityId: 'fac-1', facilityName: 'PHC Rampur', quantity: 320, minThreshold: 80, status: 'Available', lastUpdated: '2026-09-07 08:00 AM', unit: 'Sachets' },
  { id: 'med-5', name: 'Injectable Atropine 0.6mg', category: 'Emergency Care', facilityId: 'fac-1', facilityName: 'PHC Rampur', quantity: 0, minThreshold: 10, status: 'Out of Stock', lastUpdated: '2026-09-07 08:00 AM', unit: 'Vials' },
  { id: 'med-6', name: 'Atorvastatin 10mg', category: 'Cardiovascular', facilityId: 'fac-2', facilityName: 'CHC Nandgaon', quantity: 240, minThreshold: 50, status: 'Available', lastUpdated: '2026-09-07 08:00 AM', unit: 'Tablets' }
];

export const initialNotifications: Notification[] = [
  {
    id: 'notif-1',
    title: 'High-Risk AI Triage Alert',
    message: 'Patient Rahul Kumar (52/M) presented with acute chest discomfort. Urgency category: HIGH.',
    type: 'Emergency',
    read: false,
    timestamp: '10 mins ago',
    linkRoute: '/triage'
  },
  {
    id: 'notif-2',
    title: 'Referral Accepted',
    message: 'Referral #REF-301 for Rahul Kumar was accepted by District Hospital Sitapur.',
    type: 'Referral',
    read: false,
    timestamp: '25 mins ago',
    linkRoute: '/referrals'
  },
  {
    id: 'notif-3',
    title: 'Follow-Up Overdue Notice',
    message: 'Maternal ANC follow-up for Sita Devi is overdue by 1 day.',
    type: 'FollowUp',
    read: false,
    timestamp: '1 hour ago',
    linkRoute: '/follow-ups'
  },
  {
    id: 'notif-4',
    title: 'Medicine Low Stock Warning',
    message: 'Amoxicillin 500mg supply at PHC Rampur has dropped below minimum safety threshold (14 left).',
    type: 'Medicine',
    read: true,
    timestamp: '3 hours ago',
    linkRoute: '/medicines'
  }
];

export const initialAuditLogs: AuditLog[] = [
  { id: 'log-1', userName: 'Sunita Devi (ASHA)', userRole: 'health-worker', action: 'Ran AI-Assisted Triage', recordDescription: 'Patient Rahul Kumar (#pt-101) - Score: HIGH RISK', timestamp: '2026-09-07 10:28 AM', resultStatus: 'Success' },
  { id: 'log-2', userName: 'Sunita Devi (ASHA)', userRole: 'health-worker', action: 'Created Closed-Loop Referral', recordDescription: 'Referral #ref-301 to District Hospital Sitapur', timestamp: '2026-09-07 10:30 AM', resultStatus: 'Success' },
  { id: 'log-3', userName: 'Dr. Ramesh Sharma', userRole: 'doctor', action: 'Viewed Longitudinal Health Record', recordDescription: 'Patient Rahul Kumar (#pt-101)', timestamp: '2026-09-07 10:40 AM', resultStatus: 'Success' },
  { id: 'log-4', userName: 'Dr. Ramesh Sharma', userRole: 'doctor', action: 'Ordered Diagnostic Test', recordDescription: '12-Lead ECG & Cardiac Troponin-I', timestamp: '2026-09-07 10:42 AM', resultStatus: 'Success' }
];
