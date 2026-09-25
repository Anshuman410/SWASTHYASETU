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
  Pill,
  Calendar,
  CreditCard,
  RefreshCw,
  Search,
  Send,
  Building2,
  Clock,
  ChevronRight,
  Thermometer,
} from "lucide-react";

interface TriageRecord {
  id: string;
  name: string;
  age: number;
  risk: "RED" | "YELLOW" | "GREEN";
  reason: string;
  facility: string;
  time: string;
  vitals: { bp: string; sugar: string; temp: string; spo2: string };
}

interface MedicineItem {
  id: string;
  name: string;
  category: string;
  stock: number;
  unit: string;
  status: "In Stock" | "Low Stock" | "Stock Out";
  facility: string;
}

export default function AshaDashboard() {
  const [isOnline, setIsOnline] = useState(true);
  const [pendingSync, setPendingSync] = useState(2);
  const [activeTab, setActiveTab] = useState<"triage" | "inventory" | "queue">("triage");
  const [syncSuccessMessage, setSyncSuccessMessage] = useState("");

  // Modals
  const [showTriageModal, setShowTriageModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showBookTokenModal, setShowBookTokenModal] = useState(false);

  // Triage Form State
  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [bpSystolic, setBpSystolic] = useState("120");
  const [bpDiastolic, setBpDiastolic] = useState("80");
  const [bodyTemp, setBodyTemp] = useState("98.6");
  const [spO2, setSpO2] = useState("98");
  const [bloodSugar, setBloodSugar] = useState("95");
  const [hasChestPain, setHasChestPain] = useState(false);
  const [hasBreathlessness, setHasBreathlessness] = useState(false);

  // Registration Form State
  const [regName, setRegName] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regAge, setRegAge] = useState("35");
  const [regGender, setRegGender] = useState("Female");
  const [regAbha, setRegAbha] = useState("");
  const [regVillage, setRegVillage] = useState("Sitapur Node 4");
  const [regSuccess, setRegSuccess] = useState("");

  // Token Booking State
  const [tokenPatient, setTokenPatient] = useState("");
  const [tokenHospital, setTokenHospital] = useState("District Hospital");
  const [tokenDoctor, setTokenDoctor] = useState("Dr. Ramesh Sharma (Cardiology)");
  const [tokenSuccess, setTokenSuccess] = useState("");

  // Triage History
  const [triageHistory, setTriageHistory] = useState<TriageRecord[]>([
    {
      id: "trg-1",
      name: "Rameshwar Singh",
      age: 58,
      risk: "RED",
      reason: "BP 165/100 • Chest Discomfort • Temp 99.1°F",
      facility: "District Hospital (Ambulance Dispatched)",
      time: "25 mins ago",
      vitals: { bp: "165/100", sugar: "140", temp: "99.1°F", spo2: "92%" },
    },
    {
      id: "trg-2",
      name: "Meenadevi",
      age: 29,
      risk: "GREEN",
      reason: "BP 115/75 • Routine Prenatal • Temp 98.4°F",
      facility: "PHC Sitapur",
      time: "1 hour ago",
      vitals: { bp: "115/75", sugar: "92", temp: "98.4°F", spo2: "99%" },
    },
    {
      id: "trg-3",
      name: "Harish Chandra",
      age: 46,
      risk: "YELLOW",
      reason: "Blood Sugar 180 mg/dL • Temp 100.4°F",
      facility: "PHC Sitapur",
      time: "2 hours ago",
      vitals: { bp: "135/88", sugar: "180", temp: "100.4°F", spo2: "97%" },
    },
  ]);

  // Medicine Inventory State
  const [medicines, setMedicines] = useState<MedicineItem[]>([
    { id: "med-1", name: "Paracetamol 500mg", category: "Analgesic & Antipyretic", stock: 120, unit: "Strips", status: "In Stock", facility: "PHC Sitapur" },
    { id: "med-2", name: "ORS Hydration Packets", category: "Electrolyte", stock: 350, unit: "Sachets", status: "In Stock", facility: "Sitapur Sub-Center" },
    { id: "med-3", name: "Metformin 500mg", category: "Diabetes", stock: 12, unit: "Strips", status: "Low Stock", facility: "PHC Sitapur" },
    { id: "med-4", name: "Iron & Folic Acid (IFA)", category: "Maternal Health", stock: 480, unit: "Tablets", status: "In Stock", facility: "Sitapur Sub-Center" },
    { id: "med-5", name: "Amoxicillin 250mg", category: "Antibiotic", stock: 0, unit: "Bottles", status: "Stock Out", facility: "PHC Sitapur" },
    { id: "med-6", name: "Albendazole 400mg", category: "Deworming", stock: 85, unit: "Tablets", status: "In Stock", facility: "Sitapur Sub-Center" },
  ]);

  // Village Appointment Queue
  const [villageQueue, setVillageQueue] = useState([
    { id: "Q-101", token: "#14", patient: "Kamla Devi", age: 52, purpose: "Hypertension Review", doctor: "Dr. Ramesh Sharma", status: "Confirmed", time: "10:30 AM" },
    { id: "Q-102", token: "#15", patient: "Chhotu Ram", age: 8, purpose: "Fever & Pediatric OPD", doctor: "Dr. Priya Iyer", status: "In Waiting Room", time: "11:00 AM" },
    { id: "Q-103", token: "#16", patient: "Pooja Kumari", age: 24, purpose: "ANC 2nd Trimester Check", doctor: "Dr. Alok Verma", status: "Confirmed", time: "11:30 AM" },
  ]);

  // Online / Offline Detection
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
    const temp = parseFloat(bodyTemp) || 98.6;

    if (sys >= 160 || dia >= 100 || oxy < 94 || temp >= 102.5 || hasChestPain || hasBreathlessness) {
      return {
        level: "RED",
        color: "text-red-400 bg-red-500/20 border-red-500/40",
        message: "High Risk Alert — Immediate District Hospital Emergency Referral Required",
      };
    }

    if (sys >= 140 || dia >= 90 || oxy < 96 || sugar >= 160 || temp >= 100.4) {
      return {
        level: "YELLOW",
        color: "text-yellow-400 bg-yellow-500/20 border-yellow-500/40",
        message: "Moderate Risk — Follow-up required at local PHC within 24-48 hours",
      };
    }

    return {
      level: "GREEN",
      color: "text-emerald-400 bg-emerald-500/20 border-emerald-500/40",
      message: "Normal Vitals — Routine ASHA community tracking and lifestyle advice",
    };
  };

  const currentRisk = calculateRisk();

  const handleSaveTriage = () => {
    if (!patientName.trim()) return;

    const newRecord: TriageRecord = {
      id: `trg-${Date.now()}`,
      name: patientName.trim(),
      age: parseInt(patientAge, 10) || 40,
      risk: currentRisk.level as any,
      reason: `BP ${bpSystolic}/${bpDiastolic} • Sugar ${bloodSugar} mg/dL • Temp ${bodyTemp}°F`,
      facility: currentRisk.level === "RED" ? "District Hospital Emergency (SOS)" : "PHC Sitapur",
      time: "Just now",
      vitals: { bp: `${bpSystolic}/${bpDiastolic}`, sugar: bloodSugar, temp: `${bodyTemp}°F`, spo2: `${spO2}%` },
    };

    setTriageHistory([newRecord, ...triageHistory]);
    setShowTriageModal(false);
    setPendingSync((prev) => prev + 1);

    // Reset Form
    setPatientName("");
    setPatientAge("");
    setBpSystolic("120");
    setBpDiastolic("80");
    setBodyTemp("98.6");
    setSpO2("98");
    setBloodSugar("95");
    setHasChestPain(false);
    setHasBreathlessness(false);
  };

  const handleSyncNow = () => {
    setPendingSync(0);
    setSyncSuccessMessage("All village patient records & vitals synced with ABDM Cloud!");
    setTimeout(() => setSyncSuccessMessage(""), 4000);
  };

  const handleAutoGenerateAbha = () => {
    const r1 = Math.floor(1000 + Math.random() * 9000);
    const r2 = Math.floor(1000 + Math.random() * 9000);
    setRegAbha(`9821-${r1}-${r2}`);
  };

  const handleRegisterPatient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim()) return;

    setRegSuccess(`Patient ${regName} registered with ABHA: ${regAbha || "9821-4432-8812"}!`);
    setPendingSync((prev) => prev + 1);

    setTimeout(() => {
      setShowRegisterModal(false);
      setRegSuccess("");
      setRegName("");
      setRegPhone("");
      setRegAbha("");
    }, 1500);
  };

  const handleBookToken = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tokenPatient.trim()) return;

    const nextTokenNum = `#${villageQueue.length + 14}`;
    const newQueueItem = {
      id: `Q-${Date.now()}`,
      token: nextTokenNum,
      patient: tokenPatient.trim(),
      age: 45,
      purpose: "General OPD Review",
      doctor: tokenDoctor,
      status: "Confirmed",
      time: "12:00 PM",
    };

    setVillageQueue([newQueueItem, ...villageQueue]);
    setTokenSuccess(`Token ${nextTokenNum} issued for ${tokenPatient}!`);
    setTimeout(() => {
      setShowBookTokenModal(false);
      setTokenSuccess("");
      setTokenPatient("");
    }, 1500);
  };

  const handleRequestStock = (medName: string) => {
    alert(`Emergency restock order dispatched to District Medical Store for "${medName}".`);
    setMedicines((prev) =>
      prev.map((m) => (m.name === medName ? { ...m, status: "In Stock", stock: m.stock + 50 } : m))
    );
  };

  return (
    <div className="space-y-8">
      {/* Top Header & Offline Bar */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
            <Smartphone className="w-3.5 h-3.5" />
            <span>Community Health Node • Sitapur Village Sub-Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            ASHA Worker Command Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Conduct community triage, register village ABHA profiles, and manage local medicine stocks.
          </p>
        </div>

        {/* Live Network & Sync Card */}
        <div className="flex items-center gap-3">
          <div
            className={`px-3.5 py-2 rounded-2xl border text-xs font-semibold flex items-center gap-2 ${
              isOnline
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                : "bg-red-500/10 border-red-500/30 text-red-300"
            }`}
          >
            {isOnline ? (
              <>
                <Wifi className="w-4 h-4 text-emerald-400" />
                <span>Live Cloud Sync</span>
              </>
            ) : (
              <>
                <WifiOff className="w-4 h-4 text-red-400" />
                <span>Offline PWA Active</span>
              </>
            )}
          </div>

          <Button
            size="sm"
            onClick={handleSyncNow}
            disabled={pendingSync === 0}
            className={`rounded-2xl h-10 px-4 text-xs font-semibold gap-1.5 shadow-md ${
              pendingSync > 0
                ? "bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold"
                : "bg-white/5 border border-white/10 text-slate-400"
            }`}
          >
            <CloudUpload className="w-3.5 h-3.5" />
            <span>{pendingSync > 0 ? `Sync (${pendingSync} Pending)` : "Synced"}</span>
          </Button>
        </div>
      </motion.div>

      {/* Sync Success Banner */}
      {syncSuccessMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-medium flex items-center gap-2.5 shadow-xl"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{syncSuccessMessage}</span>
        </motion.div>
      )}

      {/* Action Quick Launch Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          onClick={() => setShowRegisterModal(true)}
          className="p-5 rounded-3xl glass-card border border-white/10 hover:border-emerald-500/40 text-left transition-all group flex items-center gap-4 bg-gradient-to-r from-emerald-950/20 to-transparent"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
            <UserPlus className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white group-hover:text-emerald-300 transition-colors">
              Register Village Patient
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">Generate ABHA ID & Link Family</p>
          </div>
        </button>

        <button
          onClick={() => setShowTriageModal(true)}
          className="p-5 rounded-3xl glass-card border border-white/10 hover:border-red-500/40 text-left transition-all group flex items-center gap-4 bg-gradient-to-r from-red-950/20 to-transparent"
        >
          <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 group-hover:scale-105 transition-transform">
            <HeartPulse className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white group-hover:text-red-300 transition-colors">
              Record Vitals & Triage
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">BP, Sugar, SpO2 & Red Flags</p>
          </div>
        </button>

        <button
          onClick={() => setShowBookTokenModal(true)}
          className="p-5 rounded-3xl glass-card border border-white/10 hover:border-teal-500/40 text-left transition-all group flex items-center gap-4 bg-gradient-to-r from-teal-950/20 to-transparent"
        >
          <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 group-hover:scale-105 transition-transform">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white group-hover:text-teal-300 transition-colors">
              Book Doctor Token
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">Schedule Hospital / PHC OPD</p>
          </div>
        </button>
      </div>

      {/* Tabs Selector */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white/[0.03] border border-white/5 w-fit">
        <button
          onClick={() => setActiveTab("triage")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "triage"
              ? "bg-emerald-500 text-slate-950 shadow-md"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <HeartPulse className="w-3.5 h-3.5" />
          <span>Triage & SOS Referrals</span>
        </button>

        <button
          onClick={() => setActiveTab("inventory")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "inventory"
              ? "bg-emerald-500 text-slate-950 shadow-md"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Pill className="w-3.5 h-3.5" />
          <span>PHC Medicine Stock</span>
        </button>

        <button
          onClick={() => setActiveTab("queue")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "queue"
              ? "bg-emerald-500 text-slate-950 shadow-md"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Village Appointment Queue ({villageQueue.length})</span>
        </button>
      </div>

      {/* TAB 1: TRIAGE & REFERRAL QUEUE */}
      {activeTab === "triage" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white">Community Risk & Triage Stream</h2>
            <span className="text-xs text-slate-400">Sitapur Health Node • Updated live</span>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {triageHistory.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-3xl glass-card border border-white/10 hover:border-white/20 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`px-3 py-1 rounded-xl font-black text-xs border ${
                      item.risk === "RED"
                        ? "bg-red-500/20 text-red-400 border-red-500/40"
                        : item.risk === "YELLOW"
                        ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/40"
                        : "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                    }`}
                  >
                    {item.risk} RISK
                  </span>

                  <div>
                    <div className="font-bold text-white text-sm">
                      {item.name} ({item.age} years)
                    </div>
                    <div className="text-slate-300 text-xs mt-0.5">{item.reason}</div>
                    <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-400 font-mono">
                      <span>BP: {item.vitals.bp}</span>
                      <span>•</span>
                      <span>Sugar: {item.vitals.sugar} mg/dL</span>
                      <span>•</span>
                      <span>Temp: {item.vitals.temp}</span>
                      <span>•</span>
                      <span>SpO2: {item.vitals.spo2}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-left md:text-right">
                    <span className="text-emerald-400 font-semibold block text-xs">
                      {item.facility}
                    </span>
                    <span className="text-[10px] text-slate-500">{item.time}</span>
                  </div>

                  {item.risk === "RED" && (
                    <Button
                      size="sm"
                      onClick={() => alert(`Emergency 108 Ambulance SOS dispatched for ${item.name} at Sitapur Node 4.`)}
                      className="rounded-xl h-9 text-xs bg-red-500 hover:bg-red-400 text-white font-bold gap-1 shadow-lg shadow-red-500/30"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>SOS Dispatch</span>
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: MEDICINE INVENTORY CHECKER */}
      {activeTab === "inventory" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white">Live PHC & Sub-Center Medicine Stock</h2>
              <p className="text-xs text-slate-400">Real-time availability of essential drugs at primary nodes</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {medicines.map((med) => (
              <div
                key={med.id}
                className="p-5 rounded-3xl glass-card border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                        {med.category}
                      </span>
                      <h3 className="font-bold text-sm text-white mt-0.5">{med.name}</h3>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                        med.status === "In Stock"
                          ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                          : med.status === "Low Stock"
                          ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                          : "bg-red-500/20 text-red-300 border-red-500/30"
                      }`}
                    >
                      {med.status}
                    </span>
                  </div>

                  <div className="my-3 p-3 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                    <span className="text-xs text-slate-400">Available Stock:</span>
                    <span className="text-base font-black text-white font-mono">
                      {med.stock} {med.unit}
                    </span>
                  </div>

                  <span className="text-[11px] text-slate-400 block">
                    Location: {med.facility}
                  </span>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleRequestStock(med.name)}
                    className="w-full h-9 rounded-xl text-xs border-white/10 hover:bg-white/10 text-slate-300 hover:text-white"
                  >
                    Request Stock Refill
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: VILLAGE APPOINTMENT QUEUE */}
      {activeTab === "queue" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white">Village OPD & Telemedicine Queue</h2>
              <p className="text-xs text-slate-400">Confirmed patient tokens for today&apos;s hospital shifts</p>
            </div>
            <Button
              size="sm"
              onClick={() => setShowBookTokenModal(true)}
              className="rounded-xl text-xs bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold"
            >
              Issue New Token
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {villageQueue.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-3xl glass-card border border-white/10 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center font-mono font-black text-emerald-400 text-sm">
                    {item.token}
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">
                      {item.patient} ({item.age}y)
                    </div>
                    <div className="text-slate-400 text-xs mt-0.5">
                      {item.purpose} • {item.doctor}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-xs text-slate-300 font-medium block flex items-center gap-1 justify-end">
                      <Clock className="w-3.5 h-3.5 text-emerald-400" />
                      {item.time}
                    </span>
                    <span className="text-[10px] text-emerald-400 font-semibold">{item.status}</span>
                  </div>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => alert(`Token pass printed/sent to ${item.patient} via SMS.`)}
                    className="rounded-xl h-9 text-xs border-white/10"
                  >
                    Send Pass
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL 1: VITALS TRIAGE */}
      <AnimatePresence>
        {showTriageModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-3xl glass-panel border border-emerald-500/30 bg-[#0f172a] p-6 space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-bold text-base text-white">Record Vitals & Clinical Triage</h3>
                </div>
                <button onClick={() => setShowTriageModal(false)} className="p-1 text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="text-xs text-slate-300 font-medium block mb-1">Patient Name *</label>
                  <Input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="e.g. Rameshwar Singh"
                    className="h-10 text-xs bg-white/5 border-white/10 text-white rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-300 font-medium block mb-1">Age</label>
                  <Input
                    type="number"
                    value={patientAge}
                    onChange={(e) => setPatientAge(e.target.value)}
                    placeholder="45"
                    className="h-10 text-xs bg-white/5 border-white/10 text-white rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs text-slate-300 font-medium block mb-1">BP (Sys/Dia)</label>
                  <div className="flex items-center gap-1">
                    <Input
                      type="number"
                      value={bpSystolic}
                      onChange={(e) => setBpSystolic(e.target.value)}
                      className="h-10 text-xs bg-white/5 border-white/10 text-white rounded-xl"
                    />
                    <span className="text-slate-500">/</span>
                    <Input
                      type="number"
                      value={bpDiastolic}
                      onChange={(e) => setBpDiastolic(e.target.value)}
                      className="h-10 text-xs bg-white/5 border-white/10 text-white rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-medium block mb-1">Body Temp (°F)</label>
                  <Input
                    type="text"
                    value={bodyTemp}
                    onChange={(e) => setBodyTemp(e.target.value)}
                    className="h-10 text-xs bg-white/5 border-white/10 text-white rounded-xl"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-medium block mb-1">SpO2 (%)</label>
                  <Input
                    type="number"
                    value={spO2}
                    onChange={(e) => setSpO2(e.target.value)}
                    className="h-10 text-xs bg-white/5 border-white/10 text-white rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">Blood Sugar (mg/dL)</label>
                <Input
                  type="number"
                  value={bloodSugar}
                  onChange={(e) => setBloodSugar(e.target.value)}
                  className="h-10 text-xs bg-white/5 border-white/10 text-white rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-slate-300 font-semibold block">Critical Red-Flag Symptoms</label>
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
                    <span>Shortness of Breath</span>
                  </label>
                </div>
              </div>

              <div className={`p-4 rounded-2xl border ${currentRisk.color}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-extrabold text-sm tracking-wider">
                    CALCULATED RISK: {currentRisk.level}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider">
                    Automated Risk Flag
                  </span>
                </div>
                <p className="text-xs">{currentRisk.message}</p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <Button variant="outline" size="sm" onClick={() => setShowTriageModal(false)} className="rounded-xl text-xs border-white/10">
                  Cancel
                </Button>
                <Button size="sm" onClick={handleSaveTriage} className="rounded-xl text-xs bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold">
                  Save Record & Triage
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 2: PATIENT REGISTRATION WITH ABHA WORKFLOW */}
      <AnimatePresence>
        {showRegisterModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-3xl glass-panel border border-emerald-500/30 bg-[#0f172a] p-6 space-y-4 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-bold text-base text-white">Register Village Patient</h3>
                </div>
                <button onClick={() => setShowRegisterModal(false)} className="p-1 text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {regSuccess && (
                <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{regSuccess}</span>
                </div>
              )}

              <form onSubmit={handleRegisterPatient} className="space-y-3.5">
                <div>
                  <label className="text-xs text-slate-300 font-semibold block mb-1">Full Legal Name *</label>
                  <Input
                    type="text"
                    required
                    placeholder="e.g. Kamla Devi"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="h-10 text-xs bg-white/5 border-white/10 text-white rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-slate-300 font-semibold block mb-1">Age</label>
                    <Input
                      type="number"
                      value={regAge}
                      onChange={(e) => setRegAge(e.target.value)}
                      className="h-10 text-xs bg-white/5 border-white/10 text-white rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-300 font-semibold block mb-1">Gender</label>
                    <select
                      value={regGender}
                      onChange={(e) => setRegGender(e.target.value)}
                      className="w-full h-10 px-3 bg-[#1e293b] border border-white/10 text-white text-xs rounded-xl focus:outline-none focus:border-emerald-500"
                    >
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-semibold block mb-1">Mobile Number</label>
                  <Input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    className="h-10 text-xs bg-white/5 border-white/10 text-white rounded-xl"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs text-slate-300 font-semibold">ABHA Health ID</label>
                    <button
                      type="button"
                      onClick={handleAutoGenerateAbha}
                      className="text-[11px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-medium"
                    >
                      <RefreshCw className="w-3 h-3" />
                      Auto-Generate ABHA
                    </button>
                  </div>
                  <Input
                    type="text"
                    placeholder="9821-XXXX-XXXX (or click Auto-Generate)"
                    value={regAbha}
                    onChange={(e) => setRegAbha(e.target.value)}
                    className="h-10 text-xs bg-white/5 border-white/10 text-white rounded-xl"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-semibold block mb-1">Assigned Village Node</label>
                  <Input
                    type="text"
                    value={regVillage}
                    onChange={(e) => setRegVillage(e.target.value)}
                    className="h-10 text-xs bg-white/5 border-white/10 text-white rounded-xl"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <Button variant="ghost" size="sm" onClick={() => setShowRegisterModal(false)} className="rounded-xl text-xs">
                    Cancel
                  </Button>
                  <Button type="submit" size="sm" className="rounded-xl text-xs bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold">
                    Register ABHA Citizen
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 3: BOOK DOCTOR TOKEN */}
      <AnimatePresence>
        {showBookTokenModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-3xl glass-panel border border-emerald-500/30 bg-[#0f172a] p-6 space-y-4 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-bold text-base text-white">Book OPD Appointment Token</h3>
                </div>
                <button onClick={() => setShowBookTokenModal(false)} className="p-1 text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {tokenSuccess && (
                <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{tokenSuccess}</span>
                </div>
              )}

              <form onSubmit={handleBookToken} className="space-y-3.5">
                <div>
                  <label className="text-xs text-slate-300 font-semibold block mb-1">Patient Name *</label>
                  <Input
                    type="text"
                    required
                    placeholder="e.g. Rameshwar Singh"
                    value={tokenPatient}
                    onChange={(e) => setTokenPatient(e.target.value)}
                    className="h-10 text-xs bg-white/5 border-white/10 text-white rounded-xl"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-semibold block mb-1">Target Facility</label>
                  <select
                    value={tokenHospital}
                    onChange={(e) => setTokenHospital(e.target.value)}
                    className="w-full h-10 px-3 bg-[#1e293b] border border-white/10 text-white text-xs rounded-xl focus:outline-none focus:border-emerald-500"
                  >
                    <option value="District Hospital">District Hospital</option>
                    <option value="PHC Sitapur">PHC Sitapur</option>
                    <option value="CHC Rampur">CHC Rampur</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-semibold block mb-1">Doctor & Specialty</label>
                  <select
                    value={tokenDoctor}
                    onChange={(e) => setTokenDoctor(e.target.value)}
                    className="w-full h-10 px-3 bg-[#1e293b] border border-white/10 text-white text-xs rounded-xl focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Dr. Ramesh Sharma (Cardiology)">Dr. Ramesh Sharma (Cardiology)</option>
                    <option value="Dr. Priya Iyer (Pediatrics)">Dr. Priya Iyer (Pediatrics)</option>
                    <option value="Dr. Alok Verma (General OPD)">Dr. Alok Verma (General OPD)</option>
                  </select>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <Button variant="ghost" size="sm" onClick={() => setShowBookTokenModal(false)} className="rounded-xl text-xs">
                    Cancel
                  </Button>
                  <Button type="submit" size="sm" className="rounded-xl text-xs bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold">
                    Issue Verified Token
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
