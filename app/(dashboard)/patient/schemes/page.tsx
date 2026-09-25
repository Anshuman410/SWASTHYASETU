"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldPlus,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Building2,
  FileCheck,
  CreditCard,
  HeartHandshake,
  ArrowRight,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Scheme {
  id: string;
  name: string;
  hindiName: string;
  coverAmount: string;
  category: "Central Govt" | "Maternal & Child" | "Elderly & Vulnerable" | "State Specific";
  desc: string;
  benefits: string[];
  eligibilityCriteria: string;
  status: "Eligible" | "Check Required" | "Active on ABHA";
}

const governmentSchemes: Scheme[] = [
  {
    id: "PMJAY",
    name: "Ayushman Bharat PM-JAY",
    hindiName: "प्रधानमंत्री जन आरोग्य योजना",
    coverAmount: "₹5,00,000 / year",
    category: "Central Govt",
    desc: "World's largest government-funded healthcare assurance scheme providing secondary and tertiary care hospitalization across 27,000+ empaneled hospitals.",
    benefits: [
      "Cashless treatment at public & private empaneled hospitals",
      "No cap on family size, age, or gender",
      "Pre-existing diseases covered from day one",
      "Pre and post-hospitalization expenses included (15 days)",
    ],
    eligibilityCriteria: "SECC 2011 database deprivations, NFSA Ration card holders (BPL/Antyodaya).",
    status: "Active on ABHA",
  },
  {
    id: "CGHS",
    name: "Central Government Health Scheme (CGHS)",
    hindiName: "केंद्रीय सरकार स्वास्थ्य योजना",
    coverAmount: "Comprehensive OPD + IPD",
    category: "Central Govt",
    desc: "Comprehensive healthcare facilities for Central Government employees, pensioners, and their dependents residing in CGHS covered cities.",
    benefits: [
      "OPD consultation across all wellness centers",
      "Specialist consultation in government & empaneled hospitals",
      "Cashless hospitalization for pensioners",
      "Subsidized medical devices and prosthetics",
    ],
    eligibilityCriteria: "Central Government servants, pensioners, Members of Parliament, Supreme Court Judges.",
    status: "Check Required",
  },
  {
    id: "JSSK",
    name: "Janani Shishu Suraksha Karyakram (JSSK)",
    hindiName: "जननी शिशु सुरक्षा कार्यक्रम",
    coverAmount: "100% Free & Cashless",
    category: "Maternal & Child",
    desc: "Guarantees zero expense delivery and healthcare for pregnant women delivering in public health institutions, including sick infants up to 1 year.",
    benefits: [
      "Completely free delivery and Cesarean section",
      "Free drugs, consumables, and blood transfusions",
      "Free diet during hospital stay (up to 3 days for normal, 7 days for C-section)",
      "Free transport from home to facility and back",
    ],
    eligibilityCriteria: "All pregnant women and sick neonates delivering in any public health facility.",
    status: "Eligible",
  },
  {
    id: "PMNDP",
    name: "Pradhan Mantri National Dialysis Program",
    hindiName: "राष्ट्रीय डायलिसिस कार्यक्रम",
    coverAmount: "Free for BPL Families",
    category: "Elderly & Vulnerable",
    desc: "Provides free life-saving Hemodialysis and Peritoneal Dialysis services to Below Poverty Line (BPL) renal failure patients at district hospitals.",
    benefits: [
      "Free regular dialysis cycles at all district centers",
      "Subsidized rates for APL patients",
      "Automated appointment scheduling via ABHA",
      "Integrated blood test and EPO hormone monitoring",
    ],
    eligibilityCriteria: "Patients certified with End Stage Renal Disease with BPL or Antyodaya card.",
    status: "Eligible",
  },
];

export default function GovernmentSchemesPage() {
  // Eligibility Checker State
  const [income, setIncome] = useState("180000");
  const [rationType, setRationType] = useState("BPL");
  const [familyMembers, setFamilyMembers] = useState("4");
  const [area, setArea] = useState("Rural");
  const [evaluated, setEvaluated] = useState(false);
  const [eligibleCount, setEligibleCount] = useState(3);

  const handleEvaluate = (e: React.FormEvent) => {
    e.preventDefault();
    setEvaluated(true);
    const inc = parseInt(income, 10) || 200000;
    if (rationType === "BPL" || rationType === "Antyodaya" || inc <= 250000) {
      setEligibleCount(3);
    } else {
      setEligibleCount(2);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Top Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
          <ShieldPlus className="w-3.5 h-3.5" />
          <span>Ministry of Health & Family Welfare (MoHFW)</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
          Government Health Schemes & PM-JAY
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Explore government healthcare protections, check eligibility, and claim cashless treatments.
        </p>
      </motion.div>

      {/* Interactive Eligibility Checker Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="p-6 sm:p-8 rounded-3xl glass-card border border-emerald-500/30 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-900 relative overflow-hidden shadow-2xl"
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Instant AI Scheme Navigator
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Check Your Family&apos;s Scheme Eligibility
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Enter basic socioeconomic details to calculate your coverage under Ayushman Bharat, state healthcare funds, and maternal schemes.
            </p>
          </div>

          {evaluated && (
            <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center gap-3 shrink-0">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <span className="font-bold text-sm block">You are eligible for {eligibleCount} Schemes!</span>
                <span className="text-[11px] text-emerald-400/80">Estimated ₹5,00,000 cashless cover active.</span>
              </div>
            </div>
          )}
        </div>

        {/* Checker Form */}
        <form onSubmit={handleEvaluate} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
          <div>
            <label className="text-xs text-slate-300 font-semibold block mb-1">
              Annual Income (₹)
            </label>
            <Input
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              className="h-10 text-xs bg-white/5 border-white/10 text-white rounded-xl"
            />
          </div>

          <div>
            <label className="text-xs text-slate-300 font-semibold block mb-1">
              Ration Card Type
            </label>
            <select
              value={rationType}
              onChange={(e) => setRationType(e.target.value)}
              className="w-full h-10 px-3 bg-[#1e293b] border border-white/10 text-white text-xs rounded-xl focus:outline-none focus:border-emerald-500"
            >
              <option value="BPL">BPL (Below Poverty Line)</option>
              <option value="Antyodaya">AAY (Antyodaya Anna Yojana)</option>
              <option value="APL">APL (Above Poverty Line)</option>
              <option value="None">No Ration Card</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-slate-300 font-semibold block mb-1">
              Family Members
            </label>
            <Input
              type="number"
              value={familyMembers}
              onChange={(e) => setFamilyMembers(e.target.value)}
              className="h-10 text-xs bg-white/5 border-white/10 text-white rounded-xl"
            />
          </div>

          <div>
            <label className="text-xs text-slate-300 font-semibold block mb-1">
              Residential Area
            </label>
            <select
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="w-full h-10 px-3 bg-[#1e293b] border border-white/10 text-white text-xs rounded-xl focus:outline-none focus:border-emerald-500"
            >
              <option value="Rural">Rural (Village / Node)</option>
              <option value="Urban">Urban / Semi-Urban</option>
            </select>
          </div>

          <div className="flex items-end">
            <Button
              type="submit"
              className="w-full h-10 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/20 gap-1.5"
            >
              <span>Check Eligibility</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </form>
      </motion.div>

      {/* Schemes Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {governmentSchemes.map((scheme) => (
          <motion.div
            key={scheme.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-3xl glass-card border border-white/10 hover:border-emerald-500/30 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-emerald-400">
                    {scheme.category}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1.5">{scheme.name}</h3>
                  <div className="text-xs text-slate-400 font-medium">{scheme.hindiName}</div>
                </div>

                <div className="text-right">
                  <span className="text-sm font-extrabold text-emerald-400 block">{scheme.coverAmount}</span>
                  <span
                    className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 border ${
                      scheme.status === "Active on ABHA"
                        ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                        : scheme.status === "Eligible"
                        ? "bg-teal-500/20 text-teal-300 border-teal-500/40"
                        : "bg-amber-500/20 text-amber-300 border-amber-500/40"
                    }`}
                  >
                    {scheme.status}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {scheme.desc}
              </p>

              <div className="space-y-2 mb-4">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Key Beneficiary Privileges
                </span>
                {scheme.benefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 text-[11px] text-slate-400">
                <span className="font-semibold text-slate-300">Eligibility: </span>
                {scheme.eligibilityCriteria}
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => alert(`Details opened for ${scheme.name}. Verified under National Health Authority (NHA).`)}
                className="rounded-xl text-xs border-white/10 hover:bg-white/10"
              >
                Guidelines PDF
              </Button>
              <Button
                size="sm"
                onClick={() => alert(`Directing to Ayushman Bharat Card Generation portal for ${scheme.name}. Your ABHA ID 9821-4432-1001 will be linked automatically.`)}
                className="rounded-xl text-xs bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold gap-1"
              >
                <span>Apply / Link ABHA</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
