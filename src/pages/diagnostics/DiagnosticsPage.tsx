import React, { useState } from 'react';
import { useHealthcare } from '../../context/HealthcareContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import {
  FlaskConical, CheckCircle2, Clock, Calendar, FileText,
  Search, Plus, Building2 as Hospital
} from 'lucide-react';

interface DiagnosticsPageProps {
  onNavigate: (route: string) => void;
}

export const DiagnosticsPage: React.FC<DiagnosticsPageProps> = ({ onNavigate }) => {
  const { diagnosticTests, diagnosticOrders, orderDiagnostic } = useHealthcare();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTests = diagnosticTests.filter(t =>
    t.testName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.facilityName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-letter">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-sky-700 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-200">
            District Diagnostic Network
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-2">Diagnostics & Lab Orders</h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Real-time diagnostic availability, test bookings, and digital lab reports across PHC & CHC labs.
          </p>
        </div>
      </div>

      {/* Active Orders Section */}
      <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <FileText className="w-4 h-4 text-health-700" />
          Active Diagnostic Orders Log
        </h3>

        <div className="space-y-2">
          {diagnosticOrders.map(ord => (
            <div key={ord.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-sky-100 text-sky-800 font-bold">
                  <FlaskConical className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{ord.testName}</h4>
                  <p className="text-slate-600 text-[11px]">Patient: <span className="font-semibold text-slate-800">{ord.patientName}</span> • Ordered by: {ord.orderedByDoctor}</p>
                  <p className="text-slate-500 text-[10px]">{ord.facilityName} • {ord.orderedDate}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <StatusBadge status={ord.status} size="sm" />
                <button
                  onClick={() => alert(`Opening digital lab report for ${ord.testName}`)}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl"
                >
                  View Report
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Test Search & Available Catalog */}
      <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Available District Diagnostic Tests Catalog</h3>
          <div className="relative w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search tests (ECG, CBC, X-Ray)..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTests.map(test => (
            <div key={test.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase text-slate-500">{test.category}</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">{test.priceEstimate}</span>
                </div>
                <h4 className="text-base font-bold text-slate-900 mt-1">{test.testName}</h4>
                <p className="text-xs text-slate-600 mt-0.5 flex items-center gap-1">
                  <Hospital className="w-3.5 h-3.5 text-sky-700" />
                  <span>{test.facilityName}</span>
                </p>
                <p className="text-[11px] text-slate-500 mt-1">Next Slot: <span className="font-semibold text-slate-800">{test.nextAvailableSlot}</span></p>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => {
                    orderDiagnostic('pt-101', test.testName, test.facilityName, 'Dr. Ramesh Sharma');
                    alert(`Order created for ${test.testName} at ${test.facilityName}`);
                  }}
                  className="px-4 py-2 bg-health-700 hover:bg-health-800 text-white font-bold text-xs rounded-xl shadow-sm"
                >
                  Book Test Slot
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
