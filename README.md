# SWASTHYASETU 🏥🌾
> **“From First Contact to Follow-up.”**
> *Integrated Rural Healthcare Access, Coordination & Continuity Platform*

---

## 🌟 Philosophy
> **“We do not replace the public healthcare system — we connect it.”**

SwasthyaSetu is an integrated rural public-health web platform designed for Smart India Hackathon (SIH). It connects patients, frontline health workers (ASHA/ANM), doctors/specialists, public health facilities (PHCs, CHCs, District Hospitals), and district health administrators into a unified, continuous care ecosystem.

---

## 🚀 Key Technological USP Features

1. **Letter-by-Letter Word Building Splash Experience (`/intro`)**: Letter-by-letter logo animation (`S` → `SW` → `SWA` ... `SWASTHYASETU`) with soft leaf vector motifs and auto-redirect.
2. **AI-Assisted Triage Wizard (`/triage`)**: 4-step clinical wizard with voice symptom input simulation in Hindi & English, calculating risk scores (HIGH / MEDIUM / LOW) and recommending optimal care pathways under strict AI safety disclaimers.
3. **Smart Facility Recommendation (`/facilities`)**: Recommends PHCs, CHCs, and District Hospitals using multi-variable matching (Distance + Urgency + Doctor Presence + Diagnostics + Pharmacy Stock + Wait Time) rendered on an interactive OpenStreetMap Leaflet view.
4. **Closed-Loop Referral Tracking (`/referrals`)**: Tracks every referral across 6 lifecycle stages (`Created` → `Accepted` → `Scheduled` → `Patient Reached` → `Consulted` → `Completed` / `Overdue`) to ensure zero lost care.
5. **Doctor Workspace & Teleconsultation (`/doctor/patient/:id`, `/teleconsultation/:id`)**: AI Longitudinal Summary card, vitals timeline, diagnostic ordering, instant referral generator, digital prescription builder, and in-call video consultation interface.
6. **Follow-up & Targeted Care Pathways (`/follow-ups`)**: Specialized pathways for Maternal ANC, Child Growth & Immunization, and Chronic NCDs (BP/Diabetes) with overdue alert dispatches to ASHA workers.
7. **Real-Time Medicine Inventory & Diagnostics (`/medicines`, `/diagnostics`)**: Live pharmacy stock tracking, low-stock warnings, and test booking across connected health centers.
8. **Offline-First Engine & Sync Center (`/settings`)**: Offline simulation toggle that queues transactions locally and runs an animated sync visualizer when connection is restored.
9. **Role-Based Dashboards**: Custom views for Patients, Frontline Health Workers, Doctors, Facility Staff, and District Health Authorities.
10. **SIH Guided Interactive Story Demo Mode**: Interactive guided story walkthrough following synthetic patient Rahul Kumar through all 22 touchpoints of the complete care journey.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Lucide React Icons.
- **Analytics & Maps**: Recharts, Leaflet / OpenStreetMap.
- **State Management**: Centralized React Context (`HealthcareContext`, `AuthContext`, `LanguageContext`, `OfflineContext`) with `localStorage` persistence.

---

## 🏃 Getting Started Locally

```bash
# Install dependencies
npm install

# Start Vite dev server
npm run dev

# Build for production
npm run build
```

---

## 🏛️ Database Schema Design

Structured relational model supporting:
`User`, `Patient`, `Vitals`, `MedicalHistory`, `Facility`, `Doctor`, `Appointment`, `Referral`, `FollowUp`, `DiagnosticTest`, `DiagnosticOrder`, `MedicineItem`, `Notification`, `AuditLog`.

---

## 🔐 Security & Governance

- Role-Based Access Control (RBAC)
- Protected Health Information (PHI) indicators
- Immutable audit logging stream (`/admin/audit-logs`)
