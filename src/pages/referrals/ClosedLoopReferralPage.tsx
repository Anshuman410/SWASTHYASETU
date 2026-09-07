import React, { useState } from 'react';
import { useHealthcare } from '../../context/HealthcareContext';
import { ReferralStatus, RiskLevel } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';
import {
  ArrowRightLeft, CheckCircle2, Clock, AlertTriangle, Building,
  Plus, User, ShieldCheck, ArrowRight, Check, MapPin
} from 'lucide-react';

interface ClosedLoopReferralPageProps {
  onNavigate: (route: string) => void;
}

const referralLifecycleStages: ReferralStatus[] = [
  'Created', 'Accepted', 'Scheduled', 'Patient Reached', 'Consulted', 'Completed'
];

export const ClosedLoopReferralPage: React.FC<ClosedLoopReferralPageProps> = ({ onNavigate }) => {
  const { referrals, updateReferralStatus, createReferral, patients, facilities } = useHealthcare();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState('pt-101');
  const [destFacilityId, setDestFacilityId] = useState('fac-3');
  const [reason, setReason] = useState('Specialist Cardiology evaluation for acute chest discomfort & Stage 1 Hypertension');
  const [urgency, setUrgency] = useState<RiskLevel>('HIGH');
  const [activeTab, setActiveTab] = useState<'ALL' | 'ACTIVE' | 'OVERDUE' | 'COMPLETED'>('ALL');

  const filteredReferrals = referrals.filter(r => {
    if (activeTab === 'ACTIVE') return r.status !== 'Completed' && r.status !== 'Overdue';
    if (activeTab === 'OVERDUE') return r.status === 'Overdue';
    if (activeTab === 'COMPLETED') return r.status === 'Completed';
    return true;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createReferral(selectedPatientId, destFacilityId, reason, urgency);
    setShowCreateModal(false);
  };

  return (
    <div className="space-y-6 animate-letter">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
            Guaranteed Public Care Continuity
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-2">Closed-Loop Referral Tracking</h1>
          <p className="text-xs text-slate-600 mt-0.5">
            A referral does not end at creation — tracked continuously from PHC origin to specialist resolution.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2.5 rounded-2xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Dispatch New Referral</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-slate-200 pb-2">
        {(['ALL', 'ACTIVE', 'OVERDUE', 'COMPLETED'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === tab ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {tab} Referrals
          </button>
        ))}
      </div>

      {/* Referral Cards Feed */}
      <div className="space-y-6">
        {filteredReferrals.map(ref => {
          const currentStageIndex = referralLifecycleStages.indexOf(ref.status as any);

          return (
            <div key={ref.id} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-card hover:shadow-card-hover transition-all space-y-6">
              {/* Top Card Info */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">Referral #{ref.id}</span>
                    <StatusBadge status={ref.urgency} size="sm" />
                    <StatusBadge status={ref.status} size="sm" />
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mt-1">
                    Patient: {ref.patientName} ({ref.patientAge} yrs)
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Origin: <span className="font-semibold text-slate-800">{ref.sourceFacilityName}</span> → Destination: <span className="font-bold text-purple-700">{ref.destinationFacilityName}</span>
                  </p>
                </div>

                {/* Status Advancement Actions */}
                <div className="flex flex-wrap items-center gap-2">
                  {ref.status === 'Created' && (
                    <button
                      onClick={() => updateReferralStatus(ref.id, 'Accepted', 'District Hospital Desk', 'Specialist slot assigned')}
                      className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-sm"
                    >
                      Accept Referral
                    </button>
                  )}
                  {ref.status === 'Accepted' && (
                    <button
                      onClick={() => updateReferralStatus(ref.id, 'Patient Reached', 'Facility Gate Desk', 'Patient checked in at hospital')}
                      className="px-3 py-1.5 bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs rounded-xl shadow-sm"
                    >
                      Mark Patient Reached
                    </button>
                  )}
                  {ref.status === 'Patient Reached' && (
                    <button
                      onClick={() => updateReferralStatus(ref.id, 'Completed', 'Dr. Rajesh Verma', 'Cardiology evaluation completed with prescription')}
                      className="px-3 py-1.5 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs rounded-xl shadow-sm"
                    >
                      Mark Completed
                    </button>
                  )}
                  <button
                    onClick={() => onNavigate(`/doctor/patient/${ref.patientId}`)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl"
                  >
                    View Record →
                  </button>
                </div>
              </div>

              {/* Referral Reason Box */}
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
                <span className="font-bold text-slate-700 uppercase text-[10px] block mb-0.5">Clinical Referral Reason:</span>
                <p className="text-slate-800 font-medium">{ref.reason}</p>
              </div>

              {/* Visual 6-Stage Closed-Loop Timeline Tracker */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-3">Closed-Loop Lifecycle Pipeline:</p>
                <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 relative">
                  {referralLifecycleStages.map((stage, idx) => {
                    const isCompleted = currentStageIndex >= idx;
                    const isCurrent = ref.status === stage;

                    return (
                      <div
                        key={idx}
                        className={`p-2.5 rounded-xl border text-center transition-all ${
                          isCurrent
                            ? 'bg-purple-100 border-purple-400 text-purple-900 font-extrabold shadow-sm'
                            : isCompleted
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold'
                            : 'bg-slate-50 border-slate-200 text-slate-600'
                        }`}
                      >
                        <div className="w-5 h-5 rounded-full mx-auto mb-1 flex items-center justify-center text-[10px] font-bold">
                          {isCompleted ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : idx + 1}
                        </div>
                        <span className="text-[10px] block leading-tight">{stage}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Audit Timeline Step Logs */}
              <div className="pt-2">
                <p className="text-[10px] font-bold uppercase text-slate-600 mb-1.5">Audit History:</p>
                <div className="space-y-1">
                  {ref.timeline.map((step, i) => (
                    <div key={i} className="text-[11px] text-slate-600 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
                      <span className="font-bold text-slate-800">{step.status}:</span>
                      <span>{step.timestamp} by {step.updatedBy}</span>
                      {step.notes && <span className="italic text-slate-600">({step.notes})</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dispatch Referral Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Dispatch Closed-Loop Referral"
        subtitle="Initiates tracking ticket to higher public health facility"
        maxWidth="md"
      >
        <form onSubmit={handleCreateSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Select Patient</label>
            <select
              value={selectedPatientId}
              onChange={e => setSelectedPatientId(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-bold bg-slate-50"
            >
              {patients.map(p => (
                <option key={p.id} value={p.id}>{p.name} ({p.abhaId})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Target Destination Facility</label>
            <select
              value={destFacilityId}
              onChange={e => setDestFacilityId(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-bold bg-slate-50"
            >
              {facilities.map(f => (
                <option key={f.id} value={f.id}>{f.name} ({f.type})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Urgency Level</label>
            <select
              value={urgency}
              onChange={e => setUrgency(e.target.value as RiskLevel)}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-bold bg-slate-50"
            >
              <option value="HIGH">HIGH (Urgent Specialist Evaluation)</option>
              <option value="MEDIUM">MEDIUM (Priority OPD Schedule)</option>
              <option value="LOW">LOW (Routine Consultation)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Clinical Referral Reason</label>
            <textarea
              rows={3}
              value={reason}
              onChange={e => setReason(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setShowCreateModal(false)}
              className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shadow-md"
            >
              Dispatch & Track Referral
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
