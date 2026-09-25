"use client";

import React from "react";
import { motion } from "framer-motion";
import TableBlock from "@/components/ui/team-members-data-table";
import {
  Users,
  GitPullRequest,
  AlertTriangle,
  Bed,
  TrendingUp,
  Activity,
  ArrowUpRight,
  ShieldCheck,
  Building,
} from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Active Staff",
      value: "124",
      subtext: "+8 onboarded this month",
      icon: Users,
      trend: "+6.8%",
      color: "from-blue-500/20 to-teal-500/10",
      accent: "text-blue-400",
    },
    {
      title: "Pending Village Referrals",
      value: "18",
      subtext: "From Sitapur & Rampur nodes",
      icon: GitPullRequest,
      trend: "4 Urgent (Red)",
      color: "from-amber-500/20 to-orange-500/10",
      accent: "text-amber-400",
    },
    {
      title: "Medicine Stock Alerts",
      value: "3",
      subtext: "Metformin 500mg, Amoxicillin",
      icon: AlertTriangle,
      trend: "Action Required",
      color: "from-red-500/20 to-rose-500/10",
      accent: "text-red-400",
    },
    {
      title: "Bed & ICU Occupancy",
      value: "84%",
      subtext: "12 General, 3 ICU available",
      icon: Bed,
      trend: "Optimal",
      color: "from-emerald-500/20 to-teal-500/10",
      accent: "text-emerald-400",
    },
  ];

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
            <Building className="w-3.5 h-3.5" />
            <span>District Hospital & Health Node Command Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Facility Administration
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Supervise clinical staff, review incoming community referrals, and audit pharmacy logistics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-2xl bg-white/[0.04] border border-white/10 text-xs text-slate-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Node Status: Live Sync</span>
          </div>
        </div>
      </motion.div>

      {/* Admin Stats Metric Cards */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="relative p-6 rounded-3xl glass-card border border-white/10 overflow-hidden shadow-xl"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-30 pointer-events-none`}
              />
              <div className="relative z-10 flex items-start justify-between mb-4">
                <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Icon className={`w-5 h-5 ${stat.accent}`} />
                </div>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
                  {stat.trend}
                </span>
              </div>

              <div className="relative z-10">
                <span className="text-xs font-medium text-slate-400">
                  {stat.title}
                </span>
                <div className="text-3xl font-extrabold text-white mt-1 tracking-tight">
                  {stat.value}
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  {stat.subtext}
                </p>
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Shadcn UI Data Table Section */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">Staff & Health Worker Directory</h2>
            <p className="text-xs text-slate-400">
              Manage on-duty doctors, community ASHA node leads, and emergency triage coordinators.
            </p>
          </div>
        </div>

        {/* The Table Component */}
        <TableBlock />
      </motion.div>
    </div>
  );
}
