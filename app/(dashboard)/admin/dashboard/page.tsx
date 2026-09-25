"use client";

import React, { useState } from "react";
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
  Download,
  Pill,
  Clock,
  CheckCircle2,
  FileSpreadsheet,
  RefreshCw,
  PhoneCall,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const stats = [
    {
      title: "Daily District OPD Footfall",
      value: "1,420",
      subtext: "+148 consultations today",
      icon: Users,
      trend: "+11.4%",
      color: "from-blue-500/20 to-teal-500/10",
      accent: "text-blue-400",
    },
    {
      title: "Pending Village Referrals",
      value: "18",
      subtext: "From Sitapur & Rampur nodes",
      icon: GitPullRequest,
      trend: "4 Critical (Red)",
      color: "from-amber-500/20 to-orange-500/10",
      accent: "text-amber-400",
    },
    {
      title: "Medicine Stock Alerts",
      value: "2",
      subtext: "Amoxicillin, Metformin",
      icon: AlertTriangle,
      trend: "Supply Requested",
      color: "from-red-500/20 to-rose-500/10",
      accent: "text-red-400",
    },
    {
      title: "District ICU & Bed Capacity",
      value: "84%",
      subtext: "14 General, 4 ICU beds open",
      icon: Bed,
      trend: "Optimal",
      color: "from-emerald-500/20 to-teal-500/10",
      accent: "text-emerald-400",
    },
  ];

  const stockAlerts = [
    { name: "Amoxicillin 250mg Oral Suspension", facility: "PHC Sitapur", current: "0 Bottles", min: "50 Bottles", urgency: "Critical Stock-out" },
    { name: "Metformin 500mg (Diabetes)", facility: "PHC Sitapur", current: "12 Strips", min: "100 Strips", urgency: "Low Reserve" },
    { name: "Disposable Syringes 5ml", facility: "CHC Rampur", current: "24 Units", min: "200 Units", urgency: "Urgent Replenishment" },
  ];

  const closedLoopReferrals = [
    { id: "REF-901", patient: "Rameshwar Singh", from: "Sitapur Node (Sunita Devi)", to: "Cardiology Emergency (Dr. Sharma)", triage: "RED", status: "Ambulance Enroute", time: "25m ago" },
    { id: "REF-902", patient: "Kamla Devi", from: "Sitapur Node 2 (Geeta Yadav)", to: "General OPD (Dr. Verma)", triage: "YELLOW", status: "Checked In Room 104", time: "1h ago" },
    { id: "REF-903", patient: "Chhotu Ram", from: "Rampur Sub-Center", to: "Pediatrics (Dr. Priya Iyer)", triage: "YELLOW", status: "Under Observation", time: "2h ago" },
    { id: "REF-904", patient: "Meenadevi", from: "Sitapur Node", to: "Maternal Health Unit", triage: "GREEN", status: "Completed & Discharged", time: "4h ago" },
  ];

  const handleExportCSV = (reportType: string) => {
    let csvContent = "data:text/csv;charset=utf-8,";
    if (reportType === "referrals") {
      csvContent += "Referral ID,Patient Name,Source Node,Destination,Triage Level,Status,Time\n";
      closedLoopReferrals.forEach((r) => {
        csvContent += `${r.id},"${r.patient}","${r.from}","${r.to}",${r.triage},"${r.status}","${r.time}"\n`;
      });
    } else {
      csvContent += "Drug Name,Facility,Current Stock,Threshold,Status\n";
      stockAlerts.forEach((s) => {
        csvContent += `"${s.name}","${s.facility}","${s.current}","${s.min}","${s.urgency}"\n`;
      });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `SwasthyaSetu_${reportType}_report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setExportNotice(`Exported ${reportType.toUpperCase()} CSV report successfully.`);
    setTimeout(() => setExportNotice(null), 3500);
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
            <Building className="w-3.5 h-3.5" />
            <span>District Hospital & Health Node Command Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Hospital Administration & Operations
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Supervise clinical staff, review incoming community referrals, and audit pharmacy logistics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            size="sm"
            onClick={() => handleExportCSV("referrals")}
            className="rounded-2xl h-10 px-4 text-xs font-bold gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
            <span>Export Referral Audit (CSV)</span>
          </Button>

          <div className="px-3.5 py-2 rounded-2xl bg-white/[0.04] border border-white/10 text-xs text-slate-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Node Status: Live Sync</span>
          </div>
        </div>
      </motion.div>

      {/* Export Notice */}
      {exportNotice && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-medium flex items-center gap-2.5 shadow-xl"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{exportNotice}</span>
        </motion.div>
      )}

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
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-30 pointer-events-none`} />
              <div className="relative z-10 flex items-start justify-between mb-4">
                <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Icon className={`w-5 h-5 ${stat.accent}`} />
                </div>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
                  {stat.trend}
                </span>
              </div>

              <div className="relative z-10">
                <span className="text-xs font-medium text-slate-400">{stat.title}</span>
                <div className="text-3xl font-extrabold text-white mt-1 tracking-tight">{stat.value}</div>
                <p className="text-[11px] text-slate-400 mt-1">{stat.subtext}</p>
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Closed-Loop Referral Tracking Table */}
      <div className="p-6 rounded-3xl glass-card border border-white/10 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <GitPullRequest className="w-4 h-4 text-emerald-400" />
              <h2 className="text-base font-bold text-white">Closed-Loop Community Referral Audit</h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Live tracking of village patients referred by ASHA workers to District Specialized Care
            </p>
          </div>

          <Button
            size="sm"
            variant="outline"
            onClick={() => handleExportCSV("referrals")}
            className="rounded-xl text-xs border-white/10 hover:bg-white/10 text-slate-300 gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Download CSV</span>
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Referral ID</th>
                <th className="py-3 px-4">Patient Name</th>
                <th className="py-3 px-4">Origin Node (ASHA)</th>
                <th className="py-3 px-4">Destination Unit</th>
                <th className="py-3 px-4">Triage</th>
                <th className="py-3 px-4">Current Status</th>
                <th className="py-3 px-4 text-right">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {closedLoopReferrals.map((ref) => (
                <tr key={ref.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4 font-mono text-emerald-400 font-medium">{ref.id}</td>
                  <td className="py-3 px-4 font-bold text-white">{ref.patient}</td>
                  <td className="py-3 px-4 text-slate-300">{ref.from}</td>
                  <td className="py-3 px-4 text-slate-300">{ref.to}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-full font-bold text-[10px] border ${
                        ref.triage === "RED"
                          ? "bg-red-500/20 text-red-400 border-red-500/40"
                          : ref.triage === "YELLOW"
                          ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/40"
                          : "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                      }`}
                    >
                      {ref.triage}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1.5 text-slate-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {ref.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right text-slate-400">{ref.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Live Medicine Stock-out Monitor */}
      <div className="p-6 rounded-3xl glass-card border border-white/10 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Pill className="w-4 h-4 text-red-400" />
              <h2 className="text-base font-bold text-white">Live Medicine Stock-out & Replenishment Monitor</h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Automated supply chain alerts triggering emergency district warehouse dispatches
            </p>
          </div>

          <Button
            size="sm"
            variant="outline"
            onClick={() => handleExportCSV("inventory")}
            className="rounded-xl text-xs border-white/10 hover:bg-white/10 text-slate-300 gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Export Stock CSV</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stockAlerts.map((stockItem, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="font-bold text-white text-xs">{stockItem.name}</span>
                  <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-[10px] font-bold border border-red-500/30">
                    {stockItem.urgency}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 mb-2">Facility: {stockItem.facility}</div>
                <div className="p-2.5 rounded-xl bg-black/30 text-[11px] flex justify-between">
                  <span className="text-slate-400">Current: <b className="text-white">{stockItem.current}</b></span>
                  <span className="text-slate-400">Min Buffer: <b className="text-slate-300">{stockItem.min}</b></span>
                </div>
              </div>

              <Button
                size="sm"
                onClick={() => window.alert(`Replenishment purchase order approved for ${stockItem.name}. Dispatched to ${stockItem.facility}.`)}
                className="mt-3 h-8 text-[11px] bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 font-semibold"
              >
                Approve Supply Dispatch
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Staff & Doctor Duty Roster Management */}
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
              Supervise clinical staff, deploy new ASHA node representatives, and audit active rosters.
            </p>
          </div>
        </div>

        {/* The Table Component with integrated "Create ASHA Worker" Modal */}
        <TableBlock />
      </motion.div>
    </div>
  );
}
