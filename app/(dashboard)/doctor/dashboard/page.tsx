"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FileText,
  Activity,
  Pill,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Stethoscope,
  Plus,
  Trash2,
  Download,
  Calendar,
  Clock,
  Printer,
  ShieldCheck,
  Send,
} from "lucide-react";

interface Medicine {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
}

export default function DoctorDashboard() {
  const [diagnosis, setDiagnosis] = useState("Hypertensive Urgency with Mild Glycemic Elevation");
  const [medicines, setMedicines] = useState<Medicine[]>([
    {
      id: "med-1",
      name: "Amlodipine 5mg",
      dosage: "1 tablet",
      frequency: "Once daily (Morning)",
      duration: "14 days",
    },
    {
      id: "med-2",
      name: "Metformin 500mg",
      dosage: "1 tablet",
      frequency: "Twice daily (Post meal)",
      duration: "30 days",
    },
    {
      id: "med-3",
      name: "Paracetamol 650mg",
      dosage: "1 tablet",
      frequency: "SOS (In case of headache)",
      duration: "3 days",
    },
  ]);

  const [selectedLabs, setSelectedLabs] = useState<string[]>([
    "Serum Creatinine & Urea",
    "12-Lead ECG",
  ]);

  const [newMedName, setNewMedName] = useState("");
  const [isSigned, setIsSigned] = useState(false);

  const availableLabs = [
    "Serum Creatinine & Urea",
    "12-Lead ECG",
    "Fasting Blood Sugar (FBS)",
    "Lipid Profile",
    "Urine Albumin Micro",
  ];

  const handleAddMedicine = () => {
    if (!newMedName.trim()) return;
    setMedicines((prev) => [
      ...prev,
      {
        id: `med-${Date.now()}`,
        name: newMedName,
        dosage: "1 tablet",
        frequency: "Once daily",
        duration: "7 days",
      },
    ]);
    setNewMedName("");
  };

  const handleRemoveMedicine = (id: string) => {
    setMedicines((prev) => prev.filter((m) => m.id !== id));
  };

  const toggleLab = (lab: string) => {
    setSelectedLabs((prev) =>
      prev.includes(lab) ? prev.filter((l) => l !== lab) : [...prev, lab]
    );
  };

  const handleSignRx = () => {
    setIsSigned(true);
    alert(
      "Digital Prescription signed and securely synced to Patient ABHA Locker (ABHA: 1234-5678-9012) and pharmacy node."
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold mb-1">
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Tele-Consultation & OPD Workspace</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Clinical Consultation Room 104
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-slate-300">
            Current Queue: <span className="font-bold text-emerald-400">Token #24</span> (Active)
          </div>
        </div>
      </div>

      {/* Split Screen Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ================= LEFT PANEL: PATIENT CONTEXT & AI SUMMARY ================= */}
        <div className="lg:col-span-5 space-y-5">
          {/* Active Patient Card */}
          <div className="p-6 rounded-3xl glass-card border border-white/10 shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-white">Rajesh Kumar</h2>
                  <span className="px-2 py-0.5 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    High BP Alert
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Age: 42 • Male • ABHA: <span className="font-mono text-slate-200">1234-5678-9012</span>
                </p>
              </div>

              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
                #24
              </div>
            </div>

            {/* Live Vitals from ASHA */}
            <div className="grid grid-cols-3 gap-2.5 mt-5 pt-4 border-t border-white/10">
              <div className="p-3 rounded-2xl bg-red-500/10 border border-red-500/20 text-center">
                <span className="text-[10px] text-red-300 uppercase tracking-wider block font-semibold">
                  BP (via ASHA)
                </span>
                <span className="text-base font-extrabold text-red-400">160/95</span>
                <span className="text-[9px] text-red-300 block">Stage 2</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 text-center">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
                  SpO2 Level
                </span>
                <span className="text-base font-extrabold text-emerald-400">97%</span>
                <span className="text-[9px] text-slate-400 block">Normal</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 text-center">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
                  Body Temp
                </span>
                <span className="text-base font-extrabold text-white">98.6°F</span>
                <span className="text-[9px] text-slate-400 block">Afebrile</span>
              </div>
            </div>
          </div>

          {/* AI Smart Clinical Summary (Powered by Gemini) */}
          <div className="p-6 rounded-3xl glass-panel border border-emerald-500/30 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>AI Clinical Summary</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-normal">
                      Gemini 1.5
                    </span>
                  </h3>
                  <p className="text-[10px] text-slate-400">
                    Synthesized from 14 past hospital & ASHA records
                  </p>
                </div>
              </div>
            </div>

            {/* 3-Bullet Smart Briefing requested in Prompt */}
            <div className="space-y-2.5 text-xs text-slate-200">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-md bg-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <p className="leading-relaxed">
                  Patient has a <strong className="text-white">3-year history of Type 2 Diabetes</strong> on Metformin 500mg with moderate glycemic control.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-md bg-amber-500/20 text-amber-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <p className="leading-relaxed">
                  <strong className="text-amber-300">Chief complaint:</strong> Severe headache and dizziness since morning. Reports skipping medication for 3 days.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-md bg-red-500/20 text-red-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <p className="leading-relaxed">
                  <strong className="text-red-300">Latest Vitals (via ASHA):</strong> BP 160/95 mmHg, SpO2 97%, Temp 98.6°F. Immediate antihypertensive adjustment recommended.
                </p>
              </div>
            </div>
          </div>

          {/* Previous Reports Timeline */}
          <div className="p-6 rounded-3xl glass-card border border-white/10 shadow-xl space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center justify-between">
              <span>Past Records & Diagnostics</span>
              <span className="text-[10px] text-slate-400">ABDM Synced</span>
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Lab Test: HbA1c (6.8%)</p>
                    <p className="text-[10px] text-slate-400">12 Oct 2026 • City Diagnostics</p>
                  </div>
                </div>
                <button
                  onClick={() => alert("Opening PDF Report: HbA1c_Oct2026.pdf")}
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] text-emerald-400 hover:text-emerald-300 font-medium"
                >
                  View PDF
                </button>
              </div>

              <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">General Consultation</p>
                    <p className="text-[10px] text-slate-400">15 Sep 2026 • PHC Rampur</p>
                  </div>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">Routine Rx</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT PANEL: E-PRESCRIPTION WORKSPACE ================= */}
        <div className="lg:col-span-7 space-y-5">
          <div className="p-6 sm:p-7 rounded-3xl glass-panel border border-white/10 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Pill className="w-5 h-5 text-emerald-400" />
                <h2 className="text-lg font-bold text-white">Create Digital E-Prescription</h2>
              </div>
              <span className="text-xs text-slate-400">National Rx Format</span>
            </div>

            {/* Diagnosis Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Primary Clinical Diagnosis
              </label>
              <Input
                type="text"
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                placeholder="Enter diagnosis..."
                className="bg-white/[0.03] border-white/10 text-white font-medium"
              />
            </div>

            {/* Medicine Entry Section */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-slate-300">
                  Rx (Medicines Prescribed)
                </label>
                <span className="text-[11px] text-slate-400">{medicines.length} Prescribed</span>
              </div>

              {/* Medicine Table / List */}
              <div className="space-y-2 mb-3">
                {medicines.map((med, index) => (
                  <div
                    key={med.id}
                    className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-md bg-emerald-500/10 text-emerald-400 font-bold flex items-center justify-center text-[10px]">
                        {index + 1}
                      </span>
                      <div>
                        <div className="font-bold text-white">{med.name}</div>
                        <div className="text-[11px] text-slate-400">
                          {med.dosage} • {med.frequency} • {med.duration}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleRemoveMedicine(med.id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add Medicine Mini Bar */}
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  value={newMedName}
                  onChange={(e) => setNewMedName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddMedicine()}
                  placeholder="Type medicine name (e.g. Telmisartan 40mg)..."
                  className="h-10 text-xs bg-white/[0.04] border-white/10"
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleAddMedicine}
                  className="rounded-xl h-10 text-xs shrink-0 gap-1.5 hover:border-emerald-500/40"
                >
                  <Plus className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Add Medicine</span>
                </Button>
              </div>
            </div>

            {/* Recommend Lab Tests */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Order Diagnostic Lab Tests
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {availableLabs.map((lab) => {
                  const isChecked = selectedLabs.includes(lab);
                  return (
                    <button
                      key={lab}
                      type="button"
                      onClick={() => toggleLab(lab)}
                      className={`p-2.5 rounded-xl border text-xs text-left transition-all ${
                        isChecked
                          ? "bg-teal-500/15 border-teal-500/40 text-teal-300 font-medium"
                          : "bg-white/[0.02] border-white/5 text-slate-400 hover:bg-white/[0.05]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="truncate">{lab}</span>
                        {isChecked && <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0 ml-1" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Actions Bar */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <Button
                variant="outline"
                onClick={() => alert("Draft saved locally.")}
                className="w-full sm:w-auto rounded-xl text-xs"
              >
                Save Draft
              </Button>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Button
                  variant="emerald"
                  onClick={handleSignRx}
                  className="w-full sm:w-auto rounded-xl text-xs font-semibold gap-2 shadow-lg shadow-emerald-600/30"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{isSigned ? "Prescription Signed ✓" : "Sign & Generate Rx"}</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
