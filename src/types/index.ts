export type UserRole = 'patient' | 'health-worker' | 'doctor' | 'facility' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  password?: string;
  role: UserRole;
  facilityId?: string;
  avatar?: string;
  assignedVillage?: string;
}

export type RiskLevel = 'HIGH' | 'MEDIUM' | 'LOW';

export interface Vitals {
  bpSystolic: number;
  bpDiastolic: number;
  pulse: number;
  temperature: number; // in Fahrenheit
  spO2: number; // percentage
  respiratoryRate: number;
  recordedAt: string;
}

export interface MedicalHistoryItem {
  id: string;
  condition: string;
  diagnosedDate: string;
  status: 'Active' | 'Resolved';
  notes?: string;
}

export interface Allergy {
  id: string;
  allergen: string;
  severity: 'Mild' | 'Moderate' | 'Severe';
}

export interface Patient {
  id: string;
  abhaId: string;
  name: string;
  email?: string;
  password?: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  phone: string;
  bloodGroup?: string;
  emergencyContact?: string;
  village: string;
  block: string;
  district: string;
  assignedHealthWorker: string; // ASHA worker name
  riskLevel: RiskLevel;
  carePathway?: 'Maternal ANC' | 'Child Care' | 'Chronic Care' | 'General Care';
  vitals: Vitals[];
  medicalHistory: MedicalHistoryItem[];
  allergies: Allergy[];
  currentMedicines: string[];
  registeredDate: string;
}

export interface AITriageRecord {
  id: string;
  patientId: string;
  symptoms: string[];
  vitals: Vitals;
  relevantHistory: string[];
  riskLevel: RiskLevel;
  urgencyExplanation: string;
  recommendedPathway: string;
  recommendedFacilityType: string;
  confidenceScore: number; // e.g. 0.92
  createdTimestamp: string;
  disclaimer: string;
}

export type FacilityType = 'Primary Health Centre (PHC)' | 'Community Health Centre (CHC)' | 'District Hospital' | 'Rural Health Centre';

export interface Facility {
  id: string;
  name: string;
  type: FacilityType;
  villageBlock: string;
  distanceKm: number;
  lat: number;
  lng: number;
  availableDoctorsCount: number;
  currentQueueLength: number;
  estimatedWaitTimeMinutes: number;
  medicineAvailabilityPercent: number;
  diagnosticAvailabilityPercent: number;
  services: string[];
  phone: string;
  isBestMatch?: boolean;
}

export interface Doctor {
  id: string;
  name: string;
  email?: string;
  specialty: string;
  facilityId: string;
  facilityName: string;
  availableToday: boolean;
  activeQueueCount: number;
  phone: string;
  experienceYears: number;
}

export type AppointmentStatus = 'Confirmed' | 'In Consultation' | 'Completed' | 'Cancelled' | 'No-Show';

export interface Appointment {
  id: string;
  tokenNumber: number;
  patientId: string;
  patientName: string;
  patientAge: number;
  patientGender: string;
  doctorId: string;
  doctorName: string;
  facilityId: string;
  facilityName: string;
  date: string;
  timeSlot: string;
  status: AppointmentStatus;
  urgency: RiskLevel;
  reason: string;
  patientsAhead?: number;
  estimatedWaitMinutes?: number;
}

export type ReferralStatus = 'Created' | 'Accepted' | 'Scheduled' | 'Patient Reached' | 'Consulted' | 'Completed' | 'Overdue';

export interface ReferralTimelineStep {
  status: ReferralStatus;
  timestamp: string;
  updatedBy: string;
  notes?: string;
}

export interface Referral {
  id: string;
  patientId: string;
  patientName: string;
  patientAge: number;
  sourceFacilityName: string;
  destinationFacilityId: string;
  destinationFacilityName: string;
  reason: string;
  urgency: RiskLevel;
  createdDate: string;
  status: ReferralStatus;
  assignedDoctorName?: string;
  timeline: ReferralTimelineStep[];
}

export type FollowUpPathway = 'Maternal Care' | 'Child Care' | 'Chronic Care' | 'General Follow-up';
export type FollowUpStatus = 'Due Today' | 'Overdue' | 'Scheduled' | 'Completed';

export interface FollowUp {
  id: string;
  patientId: string;
  patientName: string;
  patientAge: number;
  patientPhone: string;
  village: string;
  pathway: FollowUpPathway;
  dueDate: string;
  status: FollowUpStatus;
  assignedWorkerName: string;
  riskLevel: RiskLevel;
  notes: string;
  lastVisitDate?: string;
}

export type DiagnosticStatus = 'Available' | 'Low Slots' | 'Booked' | 'Completed' | 'Report Ready';

export interface DiagnosticTest {
  id: string;
  testName: string;
  category: string;
  facilityId: string;
  facilityName: string;
  available: boolean;
  nextAvailableSlot: string;
  priceEstimate: string; // e.g. "Free (Govt)"
}

export interface DiagnosticOrder {
  id: string;
  patientId: string;
  patientName: string;
  testName: string;
  facilityName: string;
  orderedByDoctor: string;
  orderedDate: string;
  status: DiagnosticStatus;
  resultSummary?: string;
}

export type StockStatus = 'Available' | 'Low Stock' | 'Out of Stock';

export interface MedicineItem {
  id: string;
  name: string;
  category: string;
  facilityId: string;
  facilityName: string;
  quantity: number;
  minThreshold: number;
  status: StockStatus;
  lastUpdated: string;
  unit: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'Emergency' | 'Appointment' | 'Referral' | 'FollowUp' | 'Medicine';
  read: boolean;
  timestamp: string;
  linkRoute?: string;
}

export interface AuditLog {
  id: string;
  userName: string;
  userRole: UserRole;
  action: string;
  recordDescription: string;
  timestamp: string;
  resultStatus: 'Success' | 'Denied' | 'Flagged';
}

export interface OfflineAction {
  id: string;
  type: 'REGISTER_PATIENT' | 'RECORD_TRIAGE' | 'CREATE_REFERRAL' | 'SCHEDULE_FOLLOWUP' | 'UPDATE_VITALS';
  payload: any;
  timestamp: string;
  synced: boolean;
}
