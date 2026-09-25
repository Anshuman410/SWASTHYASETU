"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ShieldCheck,
  Calendar,
  Clock,
  ArrowRight,
  MapPin,
  Heart,
  Activity,
  FileText,
  User,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Droplet,
  Thermometer,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const facilities = [
  {
    id: 1,
    title: "District Hospital",
    subtitle: "2.4 km away",
    category: "Tertiary Care",
    beds: "18 beds available",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=600",
  },
  {
    id: 2,
    title: "PHC Rampur",
    subtitle: "4.1 km away",
    category: "Primary Health Center",
    beds: "Walk-in open",
    image:
      "https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=600",
  },
  {
    id: 3,
    title: "Dr. Sharma Clinic",
    subtitle: "Specialist",
    category: "Cardiology & General",
    beds: "Tokens available",
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=600",
  },
  {
    id: 4,
    title: "City Lab",
    subtitle: "Diagnostics",
    category: "Automated Pathology",
    beds: "Same day report",
    image:
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=600",
  },
];

const journeySteps = [
  { step: 1, name: "Registration", status: "completed", date: "Verified ABHA" },
  { step: 2, name: "ASHA Triage", status: "completed", date: "Risk: Normal (Green)" },
  { step: 3, name: "Appointment", status: "active", date: "Today, Token #24" },
  { step: 4, name: "Consultation", status: "upcoming", date: "Dr. Ramesh Sharma" },
  { step: 5, name: "Diagnostics", status: "upcoming", date: "City Lab Orders" },
  { step: 6, name: "Follow-up", status: "upcoming", date: "After 7 Days" },
];

export default function PatientDashboard() {
  const [selectedFacility, setSelectedFacility] = useState<number | null>(null);

  return (
    <div className="space-y-8">
      {/* Top Welcome & Digital Health ABHA Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Left: ABHA Card */}
        <div className="lg:col-span-2 relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-emerald-950/40 border border-white/10 shadow-2xl backdrop-blur-xl">
          {/* Subtle Background Chip Design */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Ayushman Bharat Digital Mission (ABDM)</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                Hi, Rahul Kumar
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm font-mono text-slate-300">
                  ABHA: 9821-4432-1001
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  <CheckCircle2 className="w-3 h-3" />
                  Verified
                </span>
              </div>
            </div>

            {/* ABHA QR / Chip placeholder */}
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 p-2 flex flex-col items-center justify-center">
                <div className="w-full h-full grid grid-cols-3 gap-0.5 opacity-70">
                  <div className="bg-emerald-400 rounded-sm" />
                  <div className="bg-white rounded-sm" />
                  <div className="bg-emerald-400 rounded-sm" />
                  <div className="bg-white rounded-sm" />
                  <div className="bg-emerald-400 rounded-sm" />
                  <div className="bg-white rounded-sm" />
                  <div className="bg-emerald-400 rounded-sm" />
                  <div className="bg-white rounded-sm" />
                  <div className="bg-emerald-400 rounded-sm" />
                </div>
              </div>
            </div>
          </div>

          {/* Patient Quick Vitals bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10">
            <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Blood Pressure</span>
              <span className="text-base font-bold text-white">120/80</span>
              <span className="text-[10px] text-emerald-400 block mt-0.5">Optimal</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Blood Group</span>
              <span className="text-base font-bold text-emerald-400">O+ Positive</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Verified</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Oxygen SpO2</span>
              <span className="text-base font-bold text-white">98%</span>
              <span className="text-[10px] text-emerald-400 block mt-0.5">Normal</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Ayushman PM-JAY</span>
              <span className="text-base font-bold text-teal-400">₹5,00,000</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Active Cover</span>
            </div>
          </div>
        </div>

        {/* Right: Live Queue / Token Tracker Card */}
        <div className="relative overflow-hidden rounded-3xl p-6 sm:p-7 glass-panel border border-emerald-500/30 flex flex-col justify-between shadow-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Live OPD Queue Tracker
              </span>
              <span className="text-xs text-slate-400">Room 104</span>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center mb-4">
              <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">
                Your Scheduled Queue
              </span>
              <div className="text-4xl font-black text-white tracking-tight mt-1 text-glow-emerald">
                Token #24
              </div>
              <p className="text-xs text-emerald-300 font-medium mt-1">
                Estimated Call: 11:30 AM (In ~15 mins)
              </p>
            </div>

            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Doctor:</span>
                <span className="font-semibold text-white">Dr. Ramesh Sharma</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Department:</span>
                <span>General Medicine</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Tokens Ahead:</span>
                <span className="text-emerald-400 font-bold">2 Patients Ahead</span>
              </div>
            </div>
          </div>

          <Button
            variant="emerald"
            className="w-full mt-5 rounded-xl text-xs font-semibold shadow-md"
            onClick={() => alert("Digital Token refreshed. Live SMS notification will sound at Token #23.")}
          >
            Refresh Queue Status
          </Button>
        </div>
      </motion.div>

      {/* Healthcare Journey Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="p-6 sm:p-7 rounded-3xl glass-panel border border-white/10"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-white">Healthcare Journey Timeline</h2>
            <p className="text-xs text-slate-400">
              Continuous care coordination from community ASHA triage to specialist follow-up.
            </p>
          </div>
          <span className="hidden sm:inline text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Step 3 of 6 Active
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {journeySteps.map((step) => {
            const isCompleted = step.status === "completed";
            const isActive = step.status === "active";

            return (
              <div
                key={step.step}
                className={`relative p-3.5 rounded-2xl border transition-all ${
                  isActive
                    ? "bg-emerald-500/15 border-emerald-500/40 shadow-lg shadow-emerald-950/40"
                    : isCompleted
                    ? "bg-white/[0.02] border-emerald-500/20"
                    : "bg-white/[0.01] border-white/5 opacity-60"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center ${
                      isActive
                        ? "bg-emerald-500 text-slate-950 shadow-md"
                        : isCompleted
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-white/5 text-slate-500"
                    }`}
                  >
                    {isCompleted ? "✓" : step.step}
                  </span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  )}
                </div>

                <div className="font-semibold text-xs text-white truncate">
                  {step.name}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                  {step.date}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Smart Facility Cards (Image Hover Cards Reference) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white">Nearby Facilities</h2>
            <p className="text-xs text-slate-400">
              Verified network clinics, primary health centers, and district hospitals.
            </p>
          </div>
          <Link
            href="/explore"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
          >
            <span>View on Live Map</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {facilities.map((facility) => {
            const isHovered = selectedFacility === facility.id;

            return (
              <motion.div
                key={facility.id}
                onMouseEnter={() => setSelectedFacility(facility.id)}
                onMouseLeave={() => setSelectedFacility(null)}
                className="group relative h-72 rounded-3xl overflow-hidden border border-white/10 glass-card cursor-pointer shadow-xl"
              >
                {/* Image Background with zoom effect */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${facility.image})` }}
                />

                {/* Gradient Overlay for soft dark text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent group-hover:via-slate-950/40 transition-colors duration-300" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-emerald-300 border border-white/10">
                    {facility.category}
                  </span>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-slate-300 border border-white/10 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-emerald-400" />
                    {facility.subtitle}
                  </span>
                </div>

                {/* Bottom Content Card */}
                <div className="absolute bottom-0 left-0 right-0 p-5 z-10 flex flex-col justify-end">
                  <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                    <Activity className="w-3 h-3" />
                    {facility.beds}
                  </span>
                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors mt-0.5">
                    {facility.title}
                  </h3>

                  <div className="mt-3 flex items-center justify-between text-xs text-slate-300 font-medium pt-3 border-t border-white/10">
                    <span className="group-hover:text-white">Book Digital Token</span>
                    <ArrowRight className="w-4 h-4 text-emerald-400 transform group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
