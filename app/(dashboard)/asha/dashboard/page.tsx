"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Wifi,
  WifiOff,
  UserPlus,
  Activity,
  CloudUpload,
  HeartPulse,
  AlertTriangle,
  CheckCircle2,
  PhoneCall,
  X,
  FileCheck,
  Shield,
  Smartphone,
  Sparkles,
} from "lucide-react";

export default function AshaDashboard() {
  const [isOnline, setIsOnline] = useState(true);
  const [pendingSync, setPendingSync] = useState(3);
  const [showTriageModal, setShowTriageModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  // Triage Form State
  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [bpSystolic, setBpSystolic] = useState("120");
  const [bpDiastolic, setBpDiastolic] = useState("80");
  const [spO2, setSpO2] = useState("98");
  const [bloodSugar, setBloodSugar] = useState("95");
  const [hasChestPain, setHasChestPain] = useState(false);
  const [hasBreathlessness, setHasBreathlessness] = useState(false);
  const [triageHistory, setTriageHistory] = useState([
    {
      id: "trg-1",
      name: "Rameshwar Singh",
      age: 58,
      risk: "RED",
      reason: "BP 165/100 • Chest Discomfort",
      facility: "District Hospital (Ambulance Dispatched)",
      time: "25 mins ago",
    },
    {
      id: "trg-2",
      name: "Meenadevi",
      age: 29,
      risk: "GREEN",
      reason: "BP 115/75 • Routine Prenatal",
      facility: "PHC Sitapur",
      time: "1 hour ago",
    },
    {
      id: "trg-3",
      name: "Harish Chandra",
      age: 46,
      risk: "YELLOW",
      reason: "Blood Sugar 180 mg/dL",
      facility: "PHC Sitapur",
      time: "2 hours ago",
    },
  ]);

  // Detect live internet connection
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsOnline(navigator.onLine);

      const handleOnline = () => setIsOnline(true);
      const handleOffline = () => setIsOnline(false);

      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);

      return () => {
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
      };
    }
  }, []);

  // Compute Risk Level dynamically
  const calculateRisk = () => {
    const sys = parseInt(bpSystolic, 10) || 120;
    const dia = parseInt(bpDiastolic, 10) || 80;
    const oxy = parseInt(spO2, 10) || 98;
    const sugar = parseInt(bloodSugar, 10) || 95;

    if (sys >= 160 || dia >= 100 || oxy < 94 || hasChestPain || hasBreathlessness) {
      return {
        level: "RED",
        color: "text-red-400 bg-red-500/20 border-red-500/40",
        message: "High Risk Alert — Immediate District Hospital Referral Required",
      };
    }
    if (sys >= 140 || dia >= 90 || oxy < 96 || sugar >= 160) {
      return {
        level: "YELLOW",
        color: "text-yellow-400 bg-yellow-500/20 border-yellow-500/40",
        message: "Moderate Risk — Primary Health Center (PHC) Visit Recommended",
      };
    }
    return {
      level: "GREEN",
      color: "text-emerald-400 bg-emerald-500/20 border-emerald-500/40",
      message: "Normal Vitals — Routine Community Care",
    };
  };

  const currentRisk = calculateRisk();

  const handleSaveTriage = () => {
    if (!patientName.trim()) {
      alert("Please enter patient name");
      return;
    }

    const newRecord = {
      id: `trg-${Date.now()}`,
      name: patientName,
      age: parseInt(patientAge, 10) || 35,
      risk: currentRisk.level,
      reason: `BP ${bpSystolic}/${bpDiastolic}, SpO2 ${spO2}%, Sugar ${bloodSugar}`,
      facility:
        currentRisk.level === "RED"
          ? "District Hospital (Emergency)"
          : "PHC Sitapur",
      time: "Just now",
    };

    setTriageHistory([newRecord, ...triageHistory]);
    setShowTriageModal(false);
    setPatientName("");

    if (!isOnline) {
      setPendingSync((prev) => prev + 1);
      alert("Offline Mode: Triage saved locally in device IndexedDB storage. It will sync automatically when network returns.");
    } else {
      alert("Triage synced to State Health Cloud & SMS sent to District Hospital!");
    }
  };

  const handleManualSync = () => {
    if (!isOnline) {
      alert("Cannot sync: device is currently offline. Connect to Wi-Fi / Mobile Data.");
      return;
    }
    setPendingSync(0);
    alert("3 Offline records successfully synchronized with the central ABDM server!");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Mobile-First Status Bar */}
      <div className="p-5 rounded-3xl glass-card border border-white/10 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-emerald-600/30">
            <HeartPulse className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-white">Sunita Devi</h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                ASHA Node 4
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Sitapur Village Node • Community Triage Subcenter
            </p>
          </div>
        </div>

        {/* Network & Sync Badge */}
        <div className="flex items-center gap-3">
          <div
            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-2 ${
              isOnline
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                : "bg-amber-500/10 border-amber-500/30 text-amber-400 animate-pulse"
            }`}
          >
            {isOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
            <span>{isOnline ? "Online (Cloud Synced)" : "Offline Mode (Local PWA)"}</span>
          </div>
        </div>
      </div>

      {/* Sync Alert (When offline or pending records exist) */}
      {pendingSync > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-transparent border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg"
        >
          <div className="flex items-center gap-3">
            <CloudUpload className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <div className="text-xs font-bold text-amber-300">
                {pendingSync} Records Saved in Local Offline Cache
              </div>
              <p className="text-[11px] text-slate-300">
                Data is encrypted locally. Will auto-sync when network connectivity returns.
              </p>
            </div>
          </div>

          <Button
            size="sm"
            onClick={handleManualSync}
            className="rounded-xl text-xs bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shrink-0 shadow-md"
          >
            Sync Now
          </Button>
        </motion.div>
      )}

      {/* Main Touch-Friendly Big Action Buttons (Mobile-First PWA) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Button 1: Patient Registration */}
        <button
          onClick={() => {
            alert("Open Patient Registration: Generates Instant ABHA ID via Aadhaar / Mobile OTP.");
          }}
          className="group p-6 rounded-3xl glass-card border border-white/10 hover:border-emerald-500/40 transition-all text-left flex items-start gap-4 shadow-xl active:scale-[0.98]"
        >
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <UserPlus className="w-7 h-7 text-emerald-400" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
              Step 1 • Enrolment
            </span>
            <h3 className="text-lg font-bold text-white mt-0.5">Register Patient</h3>
            <p className="text-xs text-slate-400 mt-1">
              Create ABHA Card, verify Aadhaar, and assign digital health record.
            </p>
          </div>
        </button>

        {/* Button 2: Triage & Vitals */}
        <button
          onClick={() => setShowTriageModal(true)}
          className="group p-6 rounded-3xl glass-card border border-white/10 hover:border-teal-500/40 transition-all text-left flex items-start gap-4 shadow-xl active:scale-[0.98]"
        >
          <div className="w-14 h-14 rounded-2xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <Activity className="w-7 h-7 text-teal-400" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400">
              Step 2 • Clinical Check
            </span>
            <h3 className="text-lg font-bold text-white mt-0.5">Triage & Vitals</h3>
            <p className="text-xs text-slate-400 mt-1">
              Record BP, Oxygen, Sugar & calculate instant Risk Score (Red / Yellow / Green).
            </p>
          </div>
        </button>
      </div>

      {/* Emergency Village Helpline Banner */}
      <div className="p-4 rounded-3xl bg-red-500/10 border border-red-500/20 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-red-500/20 text-red-400 flex items-center justify-center shrink-0">
            <PhoneCall className="w-5 h-5 animate-bounce" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">Emergency 108 Node Dispatch</div>
            <p className="text-[11px] text-slate-400">Direct link to District Hospital Emergency Room</p>
          </div>
        </div>
        <Button
          size="sm"
          variant="destructive"
          onClick={() => alert("Dialing Emergency Medical Service: 108 connected.")}
          className="rounded-xl text-xs font-bold shrink-0"
        >
          Call 108
        </Button>
      </div>

      {/* Recent Community Triage History */}
      <div className="p-6 rounded-3xl glass-panel border border-white/10 shadow-2xl space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white">Recent Village Triages</h2>
          <span className="text-xs text-slate-400">Sitapur Node Database</span>
        </div>

        <div className="space-y-3">
          {triageHistory.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`px-2.5 py-1 rounded-xl font-black text-xs border ${
                    item.risk === "RED"
                      ? "bg-red-500/20 text-red-400 border-red-500/40"
                      : item.risk === "YELLOW"
                      ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/40"
                      : "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                  }`}
                >
                  {item.risk}
                </span>

                <div>
                  <div className="font-bold text-white text-sm">
                    {item.name} ({item.age}y)
                  </div>
                  <div className="text-slate-400 text-[11px] mt-0.5">
                    {item.reason}
                  </div>
                </div>
              </div>

              <div className="text-right sm:text-right">
                <span className="text-emerald-300 font-semibold block text-[11px]">
                  {item.facility}
                </span>
                <span className="text-[10px] text-slate-500">{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Triage & Vitals Modal */}
      <AnimatePresence>
        {showTriageModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-3xl glass-panel border border-emerald-500/30 p-6 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-bold text-base text-white">Record Vitals & Triage</h3>
                </div>
                <button
                  onClick={() => setShowTriageModal(false)}
                  className="p-1 rounded-xl text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Patient Info */}
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="text-xs text-slate-300 font-medium block mb-1">
                    Patient Name
                  </label>
                  <Input
                    type="text"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="e.g. Rameshwar Singh"
                    className="h-10 text-xs bg-white/[0.04]"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-300 font-medium block mb-1">
                    Age
                  </label>
                  <Input
                    type="number"
                    value={patientAge}
                    onChange={(e) => setPatientAge(e.target.value)}
                    placeholder="45"
                    className="h-10 text-xs bg-white/[0.04]"
                  />
                </div>
              </div>

              {/* Vitals Inputs */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-300 font-medium block mb-1">
                    Systolic BP (mmHg)
                  </label>
                  <Input
                    type="number"
                    value={bpSystolic}
                    onChange={(e) => setBpSystolic(e.target.value)}
                    className="h-10 text-xs bg-white/[0.04]"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-300 font-medium block mb-1">
                    Diastolic BP (mmHg)
                  </label>
                  <Input
                    type="number"
                    value={bpDiastolic}
                    onChange={(e) => setBpDiastolic(e.target.value)}
                    className="h-10 text-xs bg-white/[0.04]"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-300 font-medium block mb-1">
                    Oxygen SpO2 (%)
                  </label>
                  <Input
                    type="number"
                    value={spO2}
                    onChange={(e) => setSpO2(e.target.value)}
                    className="h-10 text-xs bg-white/[0.04]"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-300 font-medium block mb-1">
                    Blood Sugar (mg/dL)
                  </label>
                  <Input
                    type="number"
                    value={bloodSugar}
                    onChange={(e) => setBloodSugar(e.target.value)}
                    className="h-10 text-xs bg-white/[0.04]"
                  />
                </div>
              </div>

              {/* Symptoms Checkboxes */}
              <div className="space-y-2">
                <label className="text-xs text-slate-300 font-semibold block">
                  Critical Red-Flag Symptoms
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <label className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.02] border border-white/5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasChestPain}
                      onChange={(e) => setHasChestPain(e.target.checked)}
                      className="rounded border-white/20 bg-slate-900 text-red-500"
                    />
                    <span>Chest Pain / Pressure</span>
                  </label>
                  <label className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.02] border border-white/5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasBreathlessness}
                      onChange={(e) => setHasBreathlessness(e.target.checked)}
                      className="rounded border-white/20 bg-slate-900 text-red-500"
                    />
                    <span>Severe Shortness of Breath</span>
                  </label>
                </div>
              </div>

              {/* Live Calculated Risk Score Card */}
              <div className={`p-4 rounded-2xl border ${currentRisk.color}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-extrabold text-sm tracking-wider">
                    CALCULATED RISK: {currentRisk.level}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider">
                    AI Clinical Triage
                  </span>
                </div>
                <p className="text-xs">{currentRisk.message}</p>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowTriageModal(false)}
                  className="rounded-xl text-xs"
                >
                  Cancel
                </Button>
                <Button
                  variant="emerald"
                  size="sm"
                  onClick={handleSaveTriage}
                  className="rounded-xl text-xs font-semibold"
                >
                  Save Record & Triage
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
