import React, { useState } from 'react';
import { useHealthcare } from '../../context/HealthcareContext';
import { useAuth } from '../../context/AuthContext';
import {
  Calendar, Clock, Building2 as Hospital, Stethoscope, Ticket, CheckCircle2,
  AlertCircle, MapPin, User, ArrowRight
} from 'lucide-react';

interface BookAppointmentPageProps {
  onNavigate: (route: string) => void;
}

export const BookAppointmentPage: React.FC<BookAppointmentPageProps> = ({ onNavigate }) => {
  const { facilities, doctors, patients, appointments, bookAppointment } = useHealthcare();
  const { currentUser } = useAuth();

  // Identify logged in patient or first patient
  const patient = patients.find(p => p.email === currentUser?.email || p.name === currentUser?.name) || patients[0];

  // Form State
  const [selectedFacilityId, setSelectedFacilityId] = useState(facilities[0]?.id || '');
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [appointmentDate, setAppointmentDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [timeSlot, setTimeSlot] = useState('10:00 AM - 10:30 AM');
  const [reason, setReason] = useState('Routine Check-up & Consultation');
  const [confirmedAppointment, setConfirmedAppointment] = useState<any>(null);

  // Available doctors for selected facility
  const facilityDoctors = doctors.filter(d => d.facilityId === selectedFacilityId);
  const activeFacility = facilities.find(f => f.id === selectedFacilityId) || facilities[0];

  // Existing patient appointments
  const myAppointments = appointments.filter(a => a.patientId === patient.id || a.patientName === patient.name);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const docId = selectedDoctorId || facilityDoctors[0]?.id || doctors[0]?.id;

    const apt = bookAppointment(
      patient.id,
      selectedFacilityId,
      docId,
      appointmentDate,
      timeSlot,
      reason
    );

    setConfirmedAppointment(apt);
  };

  return (
    <div className="space-y-6 animate-letter">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            Outpatient Department (OPD)
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-2">Book Doctor Appointment</h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Select nearest healthcare facility, choose a specialist, and generate an OPD token.
          </p>
        </div>

        <button
          onClick={() => onNavigate('/patient/dashboard')}
          className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          ← Return to Dashboard
        </button>
      </div>

      {/* Confirmation Banner */}
      {confirmedAppointment && (
        <div className="p-6 rounded-3xl bg-emerald-700 text-white shadow-xl space-y-4 animate-letter">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center font-black">
              <Ticket className="w-6 h-6 text-amber-300 animate-pulse" />
            </div>
            <div>
              <span className="text-xs uppercase font-bold text-emerald-200">Appointment Confirmed!</span>
              <h2 className="text-2xl font-black">OPD Token #{confirmedAppointment.tokenNumber}</h2>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
            <div className="p-3 bg-white/10 rounded-2xl">
              <span className="text-emerald-200 block text-[11px]">Facility</span>
              <span className="font-bold text-sm">{confirmedAppointment.facilityName}</span>
            </div>
            <div className="p-3 bg-white/10 rounded-2xl">
              <span className="text-emerald-200 block text-[11px]">Doctor</span>
              <span className="font-bold text-sm">{confirmedAppointment.doctorName}</span>
            </div>
            <div className="p-3 bg-white/10 rounded-2xl">
              <span className="text-emerald-200 block text-[11px]">Date & Time</span>
              <span className="font-bold text-sm">{confirmedAppointment.date} • {confirmedAppointment.timeSlot}</span>
            </div>
            <div className="p-3 bg-white/10 rounded-2xl">
              <span className="text-emerald-200 block text-[11px]">Queue Estimate</span>
              <span className="font-bold text-sm">~{confirmedAppointment.estimatedWaitMinutes} Min Wait</span>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Card */}
        <div className="lg:col-span-8 p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-health-700" />
            <span>Appointment Details</span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Patient Auto-Filled Summary */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-black flex items-center justify-center text-sm">
                  {patient.name.substring(0, 2)}
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">{patient.name}</p>
                  <p className="text-[11px] text-slate-500">ABHA: {patient.abhaId} • {patient.gender}, {patient.age}y</p>
                </div>
              </div>
              <span className="px-2 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                Logged-in Patient
              </span>
            </div>

            {/* Select Facility */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                1. Select Nearby Healthcare Facility
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {facilities.map(fac => (
                  <div
                    key={fac.id}
                    onClick={() => {
                      setSelectedFacilityId(fac.id);
                      const docs = doctors.filter(d => d.facilityId === fac.id);
                      if (docs.length > 0) setSelectedDoctorId(docs[0].id);
                    }}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      selectedFacilityId === fac.id
                        ? 'border-health-600 bg-health-50/60 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <Hospital className={`w-4 h-4 ${selectedFacilityId === fac.id ? 'text-health-700' : 'text-slate-400'}`} />
                      <span className="text-[10px] font-bold text-slate-500">{fac.distanceKm} km</span>
                    </div>
                    <p className="font-bold text-xs text-slate-900 truncate">{fac.name}</p>
                    <p className="text-[10px] text-slate-500">{fac.villageBlock}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Select Doctor */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                2. Select Consulting Physician
              </label>
              {facilityDoctors.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {facilityDoctors.map(doc => (
                    <div
                      key={doc.id}
                      onClick={() => setSelectedDoctorId(doc.id)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                        (selectedDoctorId === doc.id || (!selectedDoctorId && facilityDoctors[0]?.id === doc.id))
                          ? 'border-purple-600 bg-purple-50/60 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Stethoscope className="w-4 h-4 text-purple-700 shrink-0" />
                        <div>
                          <p className="font-bold text-xs text-slate-900">{doc.name}</p>
                          <p className="text-[11px] text-purple-800 font-medium">{doc.specialty}</p>
                          <span className="text-[10px] text-slate-500">{doc.experienceYears}y experience</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic p-3 bg-slate-50 rounded-xl">
                  General Duty Medical Officer will be assigned at facility triage.
                </p>
              )}
            </div>

            {/* Date and Time Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  3. Preferred Date
                </label>
                <input
                  type="date"
                  required
                  value={appointmentDate}
                  onChange={e => setAppointmentDate(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-health-500/20 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  4. Time Slot
                </label>
                <select
                  value={timeSlot}
                  onChange={e => setTimeSlot(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold bg-white focus:ring-2 focus:ring-health-500/20 focus:outline-none"
                >
                  <option value="09:00 AM - 09:30 AM">09:00 AM - 09:30 AM</option>
                  <option value="09:30 AM - 10:00 AM">09:30 AM - 10:00 AM</option>
                  <option value="10:00 AM - 10:30 AM">10:00 AM - 10:30 AM</option>
                  <option value="10:30 AM - 11:00 AM">10:30 AM - 11:00 AM</option>
                  <option value="11:00 AM - 11:30 AM">11:00 AM - 11:30 AM</option>
                  <option value="02:00 PM - 02:30 PM">02:00 PM - 02:30 PM</option>
                  <option value="03:00 PM - 03:30 PM">03:00 PM - 03:30 PM</option>
                </select>
              </div>
            </div>

            {/* Reason */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                5. Reason for Visit / Symptoms
              </label>
              <textarea
                rows={2}
                value={reason}
                onChange={e => setReason(e.target.value)}
                placeholder="Describe your health complaint or check-up need..."
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-health-500/20 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-health-700 hover:bg-health-800 active:bg-health-900 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Confirm & Generate OPD Token</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Existing Appointments Right Rail */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Ticket className="w-4 h-4 text-health-700" />
              <span>My Active OPD Tokens</span>
            </h3>

            {myAppointments.length > 0 ? (
              <div className="space-y-3">
                {myAppointments.map(a => (
                  <div key={a.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-slate-900">Token #{a.tokenNumber}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        {a.status}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-slate-800">{a.facilityName}</p>
                    <p className="text-[11px] text-slate-500">{a.doctorName} • {a.date}</p>
                    <div className="pt-1 border-t border-slate-200 text-[10px] text-slate-600 flex items-center justify-between">
                      <span>Estimated Wait:</span>
                      <span className="font-bold">{a.estimatedWaitMinutes} Minutes</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">No upcoming appointments booked yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
