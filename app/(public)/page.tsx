"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BendTheLightText } from "@/components/landing/BendTheLightText";
import { LiquidMetalButton } from "@/components/landing/LiquidMetalButton";
import {
  HeartPulse,
  UserCheck,
  Stethoscope,
  Building2,
  ShieldCheck,
  Zap,
  ArrowRight,
  Sparkles,
  WifiOff,
  Activity,
} from "lucide-react";

export default function LandingPage() {
  const portals = [
    {
      title: "Patient Super-App",
      role: "PATIENT",
      desc: "Instant ABHA profile, live queue token tracker, and AI voice health assistant.",
      href: "/patient/dashboard",
      icon: HeartPulse,
      color: "from-emerald-500/20 to-teal-500/5",
      border: "hover:border-emerald-500/40",
      accent: "text-emerald-400",
    },
    {
      title: "ASHA Health Worker",
      role: "ASHA",
      desc: "Mobile-first offline PWA with smart risk-score triage (Red/Yellow/Green).",
      href: "/asha/dashboard",
      icon: UserCheck,
      color: "from-teal-500/20 to-cyan-500/5",
      border: "hover:border-teal-500/40",
      accent: "text-teal-400",
    },
    {
      title: "Doctor Workspace",
      role: "DOCTOR",
      desc: "Split-screen clinical workspace with 3-bullet AI summary and 1-click E-Rx.",
      href: "/doctor/dashboard",
      icon: Stethoscope,
      color: "from-blue-500/20 to-indigo-500/5",
      border: "hover:border-blue-500/40",
      accent: "text-blue-400",
    },
    {
      title: "Facility Admin",
      role: "ADMIN",
      desc: "Real-time staff data tables, incoming referrals, and medicine inventory.",
      href: "/admin/dashboard",
      icon: Building2,
      color: "from-purple-500/20 to-pink-500/5",
      border: "hover:border-purple-500/40",
      accent: "text-purple-400",
    },
  ];

  return (
    <div className="relative overflow-hidden pt-12 pb-24 lg:pt-16 lg:pb-32">
      {/* Background Soft Aurora and Subtle Grid */}
      <div className="absolute inset-0 bg-radial-gradient opacity-35 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-emerald-600/15 via-teal-500/10 to-transparent rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Announcement Pill */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-emerald-500/25 text-xs text-slate-200 shadow-lg shadow-emerald-950/40">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-semibold text-emerald-400">National Healthcare Stack 2.0</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300">ABHA & Ayushman Bharat Unified</span>
          </div>
        </motion.div>

        {/* Hero Section Header with WebGL "Bend the Light" 3D Text */}
        <div className="text-center relative">
          <BendTheLightText
            text="SwasthyaSetu"
            subtitle="The Intelligent Universal Healthcare Coordination Platform"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-6 max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-slate-400 font-normal leading-relaxed"
          >
            Connecting rural villages and urban super-specialty hospitals into a single real-time ecosystem.
            Powered by <span className="text-emerald-400 font-medium">Gemini AI clinical triage</span>,{" "}
            <span className="text-teal-400 font-medium">offline-first ASHA workflows</span>, and{" "}
            <span className="text-slate-200 font-medium">zero-paperwork ABHA digital records</span>.
          </motion.p>

          {/* CTA Buttons with LiquidMetalButton */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            {/* The LiquidMetalButton requested in Phase 1 */}
            <LiquidMetalButton href="/patient/dashboard">
              Get Started / Book Token
            </LiquidMetalButton>

            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl glass-card text-slate-200 hover:text-white hover:border-emerald-500/30 transition-all duration-300 text-base font-medium shadow-lg"
            >
              <span>Sign In with ABHA</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>
          </motion.div>

          {/* Feature Highlight Pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Ayushman Bharat Verified</span>
            </div>
            <span className="hidden sm:inline text-slate-700">•</span>
            <div className="flex items-center gap-2">
              <WifiOff className="w-4 h-4 text-teal-400" />
              <span>ASHA Offline PWA Sync</span>
            </div>
            <span className="hidden sm:inline text-slate-700">•</span>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span>Gemini 1.5 Clinical RAG</span>
            </div>
          </motion.div>
        </div>

        {/* Role Quick-Access Portals */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-20 lg:mt-24"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Select Your Healthcare Portal
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Role-based access designed for high-efficiency clinical collaboration.
              </p>
            </div>
            <Link
              href="/login"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
            >
              <span>Explore Role Permissions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {portals.map((p) => {
              const Icon = p.icon;
              return (
                <Link
                  key={p.role}
                  href={p.href}
                  className={`group relative p-6 rounded-2xl glass-card border border-white/10 ${p.border} transition-all duration-300 flex flex-col justify-between`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-b ${p.color} opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300 pointer-events-none`} />

                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                      <Icon className={`w-6 h-6 ${p.accent}`} />
                    </div>

                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-white group-hover:text-emerald-300 transition-colors">
                        {p.title}
                      </h3>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-400">
                        {p.role}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>

                  <div className="relative z-10 mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-medium text-slate-300 group-hover:text-white">
                    <span>Enter Workspace</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
