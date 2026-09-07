import React, { useState } from 'react';
import { useHealthcare } from '../../context/HealthcareContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';
import {
  Calendar, Clock, User, Hospital, Ticket, ArrowRight,
  Volume2, CheckCircle2, AlertCircle, Plus, ChevronRight
} from 'lucide-react';

interface AppointmentsQueuePageProps {
  onNavigate: (route: string) => void;
}

export const AppointmentsQueuePage: React.FC<AppointmentsQueuePageProps> = ({ onNavigate }) => {
  const {
    appointments, facilities, doctors, patients,
    bookAppointment, callNextToken
  } = useHealthcare();

  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedFacilityId, setSelectedFacilityId] = useState('fac-1');
  const [selectedDoctorId, setSelectedDoctorId] = useState('doc-1');
  const [selectedPatientId, setSelectedPatientId] = useState('pt-101');
  const [appointmentDate, setAppointmentDate] = useState('2026-09-07');
  const [timeSlot, setTimeSlot] = useState('11:30 AM');
  const [reason, setReason] = useState('General Consultation & Vitals Review');

  const activeAppointment = appointments[0] || null;

  const handleCreateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    bookAppointment(selectedPatientId, selectedFacilityId, selectedDoctorId, appointmentDate, timeSlot, reason);
    setShowBookingModal(false);
  };

  return (
    <div className="space-y-6 animate-letter">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Appointments & Token Queue</h1>
          <p className="text-xs text-slate-600 mt-0.5">Real-time OPD token status & facility queue management.</p>
        </div>

        <button
          onClick={() => setShowBookingModal(true)}
          className="px-4 py-2.5 rounded-2xl bg-health-700 hover:bg-health-800 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Book New Token</span>
        </button>
      </div>

      {/* Active Token Hero Card */}
      {activeAppointment && (
        <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-800 via-health-700 to-teal-900 text-white shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/20 pb-4">
            <div className="flex items-center gap-2">
              <Ticket className="w-6 h-6 text-amber-300 animate-pulse" />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-200">Active OPD Token</span>
                <h3 className="text-lg font-black text-white">{activeAppointment.facilityName}</h3>
              </div>
            </div>

            <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold text-white border border-white/30">
              {activeAppointment.status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
              <span className="text-[10px] font-bold text-emerald-200 uppercase">Your Token Number</span>
              <h2 className="text-4xl font-black text-amber-300 mt-1">#{activeAppointment.tokenNumber}</h2>
              <span className="text-[11px] text-emerald-100">{activeAppointment.patientName}</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
              <span className="text-[10px] font-bold text-emerald-200 uppercase">Now Serving</span>
              <h2 className="text-4xl font-black text-white mt-1">#18</h2>
              <span className="text-[11px] text-emerald-100">Consultation Room 3</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
              <span className="text-[10px] font-bold text-emerald-200 uppercase">Patients Ahead</span>
              <h2 className="text-4xl font-black text-white mt-1">6</h2>
              <span className="text-[11px] text-emerald-100">Estimated wait: 20 mins</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex flex-col justify-between text-xs">
              <div>
                <p className="font-bold text-white">{activeAppointment.doctorName}</p>
                <p className="text-[11px] text-emerald-200">{activeAppointment.date} at {activeAppointment.timeSlot}</p>
              </div>
              <button
                onClick={() => callNextToken(activeAppointment.facilityId)}
                className="w-full mt-2 py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Call Next Token (Staff)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Appointments List Table */}
      <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900">Today's Appointment Log</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
                <th className="py-3 px-2">Token #</th>
                <th className="py-3 px-2">Patient</th>
                <th className="py-3 px-2">Facility & Doctor</th>
                <th className="py-3 px-2">Slot</th>
                <th className="py-3 px-2">Urgency</th>
                <th className="py-3 px-2">Status</th>
                <th className="py-3 px-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {appointments.map(apt => (
                <tr key={apt.id} className="hover:bg-slate-50">
                  <td className="py-3.5 px-2 font-black text-slate-900 text-sm">#{apt.tokenNumber}</td>
                  <td className="py-3.5 px-2">
                    <span className="font-bold text-slate-900 block">{apt.patientName}</span>
                    <span className="text-[11px] text-slate-600">{apt.patientAge}/{apt.patientGender}</span>
                  </td>
                  <td className="py-3.5 px-2">
                    <span className="font-semibold text-slate-900 block">{apt.facilityName}</span>
                    <span className="text-[11px] text-slate-600">{apt.doctorName}</span>
                  </td>
                  <td className="py-3.5 px-2 text-slate-700">{apt.timeSlot}</td>
                  <td className="py-3.5 px-2">
                    <StatusBadge status={apt.urgency} size="sm" />
                  </td>
                  <td className="py-3.5 px-2">
                    <StatusBadge status={apt.status} size="sm" />
                  </td>
                  <td className="py-3.5 px-2 text-right">
                    <button
                      onClick={() => onNavigate(`/doctor/patient/${apt.patientId}`)}
                      className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold"
                    >
                      View Workspace →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Book Appointment Modal */}
      <Modal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        title="Book New OPD Appointment"
        subtitle="Generate digital token for PHC / CHC OPD queue"
        maxWidth="md"
      >
        <form onSubmit={handleCreateBooking} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Select Patient</label>
            <select
              value={selectedPatientId}
              onChange={e => setSelectedPatientId(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-bold bg-slate-50 focus:outline-none"
            >
              {patients.map(p => (
                <option key={p.id} value={p.id}>{p.name} ({p.abhaId})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Select Target Facility</label>
            <select
              value={selectedFacilityId}
              onChange={e => setSelectedFacilityId(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-bold bg-slate-50 focus:outline-none"
            >
              {facilities.map(f => (
                <option key={f.id} value={f.id}>{f.name} ({f.distanceKm} km away)</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Select Doctor</label>
            <select
              value={selectedDoctorId}
              onChange={e => setSelectedDoctorId(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-bold bg-slate-50 focus:outline-none"
            >
              {doctors.map(d => (
                <option key={d.id} value={d.id}>{d.name} — {d.specialty}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Date</label>
              <input
                type="date"
                value={appointmentDate}
                onChange={e => setAppointmentDate(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-bold bg-slate-50"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Time Slot</label>
              <select
                value={timeSlot}
                onChange={e => setTimeSlot(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-bold bg-slate-50"
              >
                <option value="09:00 AM">09:00 AM</option>
                <option value="10:30 AM">10:30 AM</option>
                <option value="11:30 AM">11:30 AM</option>
                <option value="02:00 PM">02:00 PM</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Reason for Visit</label>
            <input
              type="text"
              value={reason}
              onChange={e => setReason(e.target.value)}
              placeholder="e.g. Chest pain follow-up, BP check..."
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setShowBookingModal(false)}
              className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-health-700 hover:bg-health-800 text-white font-bold text-xs shadow-md"
            >
              Confirm Token Booking
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
