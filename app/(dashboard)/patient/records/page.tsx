"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Upload,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Calendar,
  User,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  X,
  FileCheck,
  Activity,
  FileCode,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HealthRecord {
  id: string;
  title: string;
  category: "Lab Report" | "Prescription" | "Radiology" | "Vaccination" | "Discharge Summary";
  doctor: string;
  facility: string;
  date: string;
  size: string;
  verified: boolean;
  notes?: string;
}

const initialRecords: HealthRecord[] = [
  {
    id: "REC-2026-001",
    title: "Comprehensive Metabolic & Lipid Panel",
    category: "Lab Report",
    doctor: "Dr. Ramesh Sharma",
    facility: "District Hospital Central Lab",
    date: "12 Sep 2026",
    size: "1.4 MB",
    verified: true,
    notes: "Fasting Blood Sugar: 95 mg/dL, HbA1c: 5.6%, Total Cholesterol: 185 mg/dL. All parameters normal.",
  },
  {
    id: "REC-2026-002",
    title: "Digital E-Prescription (Cardiology OPD)",
    category: "Prescription",
    doctor: "Dr. Ramesh Sharma",
    facility: "District Hospital OPD #4",
    date: "15 Aug 2026",
    size: "620 KB",
    verified: true,
    notes: "Rx: Tab Telmisartan 40mg (OD Morning), Tab Metformin 500mg (BD Post Meals). Valid for 30 days.",
  },
  {
    id: "REC-2026-003",
    title: "Chest X-Ray (PA View) Digital Radiograph",
    category: "Radiology",
    doctor: "Dr. Alok Verma",
    facility: "City Diagnostic Imaging Hub",
    date: "04 May 2026",
    size: "4.8 MB",
    verified: true,
    notes: "Lungs clear, normal cardiothoracic ratio, no infiltrates or pleural effusion observed.",
  },
  {
    id: "REC-2026-004",
    title: "ABDM Universal Immunization Certificate",
    category: "Vaccination",
    doctor: "Sunita Devi (ASHA)",
    facility: "Sitapur Village Sub-Center",
    date: "18 Jan 2026",
    size: "450 KB",
    verified: true,
    notes: "Tetanus Toxoid & Seasonal Influenza Booster administered. Batch #TT-98442.",
  },
];

export default function HealthLockerPage() {
  const [records, setRecords] = useState<HealthRecord[]>(initialRecords);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [viewRecord, setViewRecord] = useState<HealthRecord | null>(null);

  // New Record Form State
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<HealthRecord["category"]>("Lab Report");
  const [newDoctor, setNewDoctor] = useState("");
  const [newFacility, setNewFacility] = useState("");
  const [newNotes, setNewNotes] = useState("");
  const [newFileName, setNewFileName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successToast, setSuccessToast] = useState("");

  const categories = ["All", "Lab Report", "Prescription", "Radiology", "Vaccination", "Discharge Summary"];

  const filteredRecords = records.filter((rec) => {
    const matchesSearch =
      rec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.facility.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || rec.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newRec: HealthRecord = {
        id: `REC-2026-${Math.floor(100 + Math.random() * 900)}`,
        title: newTitle.trim(),
        category: newCategory,
        doctor: newDoctor.trim() || "Dr. Ramesh Sharma",
        facility: newFacility.trim() || "Ayushman Network Center",
        date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
        size: newFileName ? "1.8 MB" : "850 KB",
        verified: true,
        notes: newNotes.trim() || "Digitally verified through ABDM Health Locker API.",
      };

      setRecords([newRec, ...records]);
      setIsSubmitting(false);
      setIsUploadOpen(false);
      setNewTitle("");
      setNewDoctor("");
      setNewFacility("");
      setNewNotes("");
      setNewFileName("");

      setSuccessToast("Document uploaded successfully to your ABDM Health Locker!");
      setTimeout(() => setSuccessToast(""), 4000);
    }, 700);
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>ABDM Encrypted Health Repository</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Digital Health Locker
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Access, organize, and securely share your lab reports, prescriptions, and radiology scans.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => setIsUploadOpen(true)}
            className="rounded-2xl h-11 px-5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs gap-2 shadow-lg shadow-emerald-500/25"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Upload New Record</span>
          </Button>
        </div>
      </motion.div>

      {/* Success Notification */}
      {successToast && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-medium flex items-center justify-between shadow-xl"
        >
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{successToast}</span>
          </div>
          <button onClick={() => setSuccessToast("")} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}

      {/* Search and Category Filter Toolbar */}
      <div className="p-4 rounded-3xl glass-card border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search records by title, doctor, or diagnostic center..."
            className="w-full pl-10 pr-4 py-2.5 bg-white/[0.04] border border-white/10 rounded-2xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-white/[0.03] rounded-2xl border border-white/5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Records Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {filteredRecords.map((rec) => (
          <motion.div
            key={rec.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 rounded-3xl glass-card border border-white/10 hover:border-emerald-500/30 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-emerald-400">
                      {rec.category}
                    </span>
                    <h3 className="font-bold text-sm text-white group-hover:text-emerald-300 transition-colors mt-1">
                      {rec.title}
                    </h3>
                  </div>
                </div>

                <span className="text-[11px] text-slate-500 font-mono">
                  {rec.size}
                </span>
              </div>

              <p className="text-xs text-slate-300 bg-white/[0.02] p-3 rounded-2xl border border-white/5 leading-relaxed line-clamp-2">
                {rec.notes}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <div className="text-slate-300 font-medium flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>{rec.doctor}</span>
                </div>
                <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                  <Calendar className="w-3 h-3 text-slate-500" />
                  <span>{rec.date} • {rec.facility}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setViewRecord(rec)}
                  className="rounded-xl h-9 text-xs border-white/10 hover:bg-white/10 text-slate-300 hover:text-white"
                >
                  <Eye className="w-3.5 h-3.5 mr-1" />
                  <span>View</span>
                </Button>
                <Button
                  size="sm"
                  onClick={() => alert(`Downloading verified copy of "${rec.title}" with ABDM digital seal.`)}
                  className="rounded-xl h-9 text-xs bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30"
                >
                  <Download className="w-3.5 h-3.5 mr-1" />
                  <span>PDF</span>
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredRecords.length === 0 && (
        <div className="text-center py-12 rounded-3xl glass-card border border-white/10 text-slate-400">
          <FileText className="w-10 h-10 mx-auto mb-3 opacity-40 text-emerald-400" />
          <h3 className="text-sm font-bold text-white">No records found</h3>
          <p className="text-xs text-slate-500 mt-1">Try searching for a different keyword or upload a new record.</p>
        </div>
      )}

      {/* Upload Record Modal */}
      <AnimatePresence>
        {isUploadOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-3xl glass-panel border border-emerald-500/30 bg-[#0f172a] p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Upload className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-white">Upload to Health Locker</h3>
                    <p className="text-[11px] text-slate-400">Link your diagnostic reports to your ABHA account</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsUploadOpen(false)}
                  className="p-1 rounded-xl text-slate-400 hover:text-white hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleUploadSubmit} className="space-y-3.5">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Document Title *
                  </label>
                  <Input
                    type="text"
                    required
                    placeholder="e.g. Thyroid Profile & Serum Creatinine"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="h-10 text-xs bg-white/5 border-white/10 text-white rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Record Category *
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full h-10 px-3 bg-[#1e293b] border border-white/10 text-white text-xs rounded-xl focus:outline-none focus:border-emerald-500"
                    >
                      <option value="Lab Report">Lab Report</option>
                      <option value="Prescription">Prescription</option>
                      <option value="Radiology">Radiology / X-Ray</option>
                      <option value="Vaccination">Vaccination</option>
                      <option value="Discharge Summary">Discharge Summary</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Consulting Doctor
                    </label>
                    <Input
                      type="text"
                      placeholder="Dr. Ramesh Sharma"
                      value={newDoctor}
                      onChange={(e) => setNewDoctor(e.target.value)}
                      className="h-10 text-xs bg-white/5 border-white/10 text-white rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Hospital or Lab Facility
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g. District Hospital Rampur"
                    value={newFacility}
                    onChange={(e) => setNewFacility(e.target.value)}
                    className="h-10 text-xs bg-white/5 border-white/10 text-white rounded-xl"
                  />
                </div>

                {/* File Dropzone Simulation */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Select File (PDF, JPEG, DICOM) *
                  </label>
                  <div className="border-2 border-dashed border-white/10 hover:border-emerald-500/50 rounded-2xl p-5 text-center cursor-pointer transition-colors bg-white/[0.02]">
                    <Upload className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                    <span className="text-xs text-slate-300 block font-medium">
                      {newFileName || "Click to browse or drop document here"}
                    </span>
                    <span className="text-[10px] text-slate-500 mt-1 block">
                      Max file size: 15MB • Automatic OCR and Gemini AI Summary
                    </span>
                    <input
                      type="file"
                      accept=".pdf,.png,.jpg,.jpeg"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          setNewFileName(e.target.files[0].name);
                        }
                      }}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="inline-block mt-3 px-3 py-1 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-white cursor-pointer font-medium"
                    >
                      Choose Local File
                    </label>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Clinical Notes or Summary
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Enter any doctor recommendations or remarks..."
                    value={newNotes}
                    onChange={(e) => setNewNotes(e.target.value)}
                    className="w-full p-2.5 bg-white/5 border border-white/10 text-white rounded-xl text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setIsUploadOpen(false)}
                    className="h-10 text-xs text-slate-400 hover:text-white"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-10 px-5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/20"
                  >
                    {isSubmitting ? "Encrypting & Storing..." : "Save to Health Locker"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* View Record Details Modal */}
      <AnimatePresence>
        {viewRecord && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-3xl glass-panel border border-white/15 bg-[#0f172a] p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-bold text-base text-white">{viewRecord.title}</h3>
                </div>
                <button
                  onClick={() => setViewRecord(null)}
                  className="p-1 rounded-xl text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                  <div>
                    <span className="text-slate-500 text-[10px] uppercase font-bold block">Document ID</span>
                    <span className="text-slate-200 font-mono">{viewRecord.id}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] uppercase font-bold block">Issued On</span>
                    <span className="text-slate-200">{viewRecord.date}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] uppercase font-bold block">Physician</span>
                    <span className="text-slate-200">{viewRecord.doctor}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] uppercase font-bold block">Facility</span>
                    <span className="text-slate-200">{viewRecord.facility}</span>
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 font-semibold block mb-1">Clinical Findings & Remarks</span>
                  <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-slate-200 leading-relaxed">
                    {viewRecord.notes}
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3 rounded-2xl bg-white/[0.02] border border-white/5 text-[11px] text-emerald-400">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>ABDM Cryptographically Signed by Certifying Authority.</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewRecord(null)}
                  className="rounded-xl text-xs border-white/10"
                >
                  Close
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    alert(`Downloading verified copy of "${viewRecord.title}" with ABDM digital seal.`);
                    setViewRecord(null);
                  }}
                  className="rounded-xl text-xs bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold"
                >
                  <Download className="w-3.5 h-3.5 mr-1" />
                  <span>Download Verified PDF</span>
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
