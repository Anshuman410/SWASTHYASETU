"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  ChevronDown,
  UserCheck,
  Stethoscope,
  HeartPulse,
  Building2,
  Sparkles,
  MapPin,
  ShieldCheck,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";

export function TopNav() {
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const portals = [
    {
      title: "Patient Super-App",
      description: "Digital ABHA health card, real-time token tracking, and AI triage.",
      href: "/patient/dashboard",
      icon: HeartPulse,
      badge: "ABHA Ready",
    },
    {
      title: "ASHA Worker PWA",
      description: "Offline-first village triage, risk scoring, and vitals recording.",
      href: "/asha/dashboard",
      icon: UserCheck,
      badge: "Offline 1st",
    },
    {
      title: "Doctor Workspace",
      description: "Split-screen clinical timeline, 3-bullet AI summary, and E-Prescription.",
      href: "/doctor/dashboard",
      icon: Stethoscope,
      badge: "AI Powered",
    },
    {
      title: "Facility Admin",
      description: "Bed management, staff data tables, incoming/outgoing referrals.",
      href: "/admin/dashboard",
      icon: Building2,
      badge: "Hospital Ops",
    },
  ];

  const features = [
    {
      title: "AI Voice Assistant",
      description: "Bhashini & Gemini powered multilingual symptom checker.",
      href: "/patient/dashboard",
      icon: Sparkles,
    },
    {
      title: "Hospital Explorer",
      description: "Interactive OpenStreetMap with live bed & specialist availability.",
      href: "/explore",
      icon: MapPin,
    },
    {
      title: "Govt Schemes & Ayushman",
      description: "Instant eligibility check and zero-paperwork hospital admissions.",
      href: "/patient/dashboard",
      icon: ShieldCheck,
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full glass-nav backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/25 group-hover:scale-105 transition-transform duration-300">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                Swasthya<span className="text-emerald-400">Setu</span>
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">
              Healthcare Network
            </span>
          </div>
        </Link>

        {/* Desktop Navigation with Stripe/Vercel Hover Pills */}
        <nav
          className="hidden md:flex items-center gap-1 bg-white/[0.03] p-1.5 rounded-full border border-white/10"
          onMouseLeave={() => setHoveredNav(null)}
        >
          {/* Portals Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setHoveredNav("portals")}
          >
            <button className="relative px-4 py-2 text-sm font-medium text-slate-200 hover:text-white transition-colors flex items-center gap-1.5 rounded-full">
              <span>Portals</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                  hoveredNav === "portals" ? "rotate-180 text-emerald-400" : ""
                }`}
              />
              {hoveredNav === "portals" && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-white/10 rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </button>

            {/* Dropdown Content */}
            <AnimatePresence>
              {hoveredNav === "portals" && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.18 }}
                  className="absolute top-full left-0 mt-3 w-80 p-2 rounded-2xl glass-panel shadow-2xl z-50"
                >
                  <div className="text-[11px] font-semibold text-emerald-400 px-3 py-1.5 uppercase tracking-wider">
                    Ecosystem Portals
                  </div>
                  <div className="space-y-1">
                    {portals.map((p) => {
                      const Icon = p.icon;
                      return (
                        <Link
                          key={p.title}
                          href={p.href}
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors group"
                        >
                          <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 group-hover:bg-emerald-500/20 group-hover:scale-105 transition-all">
                            <Icon className="w-4 h-4 text-emerald-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-white group-hover:text-emerald-300">
                                {p.title}
                              </span>
                              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                                {p.badge}
                              </span>
                            </div>
                            <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                              {p.description}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Features Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setHoveredNav("features")}
          >
            <button className="relative px-4 py-2 text-sm font-medium text-slate-200 hover:text-white transition-colors flex items-center gap-1.5 rounded-full">
              <span>Features</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                  hoveredNav === "features" ? "rotate-180 text-emerald-400" : ""
                }`}
              />
              {hoveredNav === "features" && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-white/10 rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </button>

            <AnimatePresence>
              {hoveredNav === "features" && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.18 }}
                  className="absolute top-full left-0 mt-3 w-80 p-2 rounded-2xl glass-panel shadow-2xl z-50"
                >
                  <div className="text-[11px] font-semibold text-teal-400 px-3 py-1.5 uppercase tracking-wider">
                    Core Innovations
                  </div>
                  <div className="space-y-1">
                    {features.map((f) => {
                      const Icon = f.icon;
                      return (
                        <Link
                          key={f.title}
                          href={f.href}
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors group"
                        >
                          <div className="w-9 h-9 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center shrink-0 group-hover:bg-teal-500/20 transition-all">
                            <Icon className="w-4 h-4 text-teal-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-sm font-medium text-white group-hover:text-teal-300">
                              {f.title}
                            </span>
                            <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                              {f.description}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Direct Nav Links */}
          <Link
            href="/explore"
            onMouseEnter={() => setHoveredNav("explore")}
            className="relative px-4 py-2 text-sm font-medium text-slate-200 hover:text-white transition-colors rounded-full"
          >
            <span>Find Hospitals</span>
            {hoveredNav === "explore" && (
              <motion.div
                layoutId="nav-pill"
                className="absolute inset-0 bg-white/10 rounded-full -z-10"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
          </Link>

          <Link
            href="#impact"
            onMouseEnter={() => setHoveredNav("impact")}
            className="relative px-4 py-2 text-sm font-medium text-slate-200 hover:text-white transition-colors rounded-full"
          >
            <span>Network Impact</span>
            {hoveredNav === "impact" && (
              <motion.div
                layoutId="nav-pill"
                className="absolute inset-0 bg-white/10 rounded-full -z-10"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
          </Link>
        </nav>

        {/* Right Action CTAs */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-medium text-slate-300 hover:text-white px-4 py-2 rounded-xl transition-colors hover:bg-white/5"
          >
            Sign In
          </Link>
          <Link
            href="/patient/dashboard"
            className="relative inline-flex items-center justify-center px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm font-medium shadow-md shadow-emerald-600/30 hover:shadow-emerald-500/40 hover:from-emerald-500 hover:to-teal-500 transition-all active:scale-95"
          >
            <span>Open Portal</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl bg-white/5 text-slate-300 hover:text-white border border-white/10"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-white/10 bg-slate-950/95 backdrop-blur-2xl px-4 py-5 space-y-4"
          >
            <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold px-2">
              Portals
            </div>
            <div className="grid grid-cols-2 gap-2">
              {portals.map((p) => (
                <Link
                  key={p.title}
                  href={p.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 rounded-xl bg-white/5 border border-white/5 text-sm font-medium text-slate-200 hover:text-emerald-400"
                >
                  {p.title}
                </Link>
              ))}
            </div>

            <div className="border-t border-white/10 pt-4 flex flex-col gap-2">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-xl bg-white/5 text-white font-medium text-sm"
              >
                Sign In
              </Link>
              <Link
                href="/patient/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-xl bg-emerald-600 text-white font-medium text-sm shadow-lg shadow-emerald-600/30"
              >
                Open Patient Portal
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
