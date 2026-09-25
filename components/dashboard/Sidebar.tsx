"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { motion } from "framer-motion";
import {
  Home,
  FileText,
  Map,
  ShieldPlus,
  Settings,
  LogOut,
  Activity,
  UserCheck,
  Stethoscope,
  Building2,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

const patientNavItems = [
  { name: "Home Dashboard", href: "/patient/dashboard", icon: Home },
  { name: "My Health Locker", href: "/patient/records", icon: FileText },
  { name: "Find Hospitals", href: "/explore", icon: Map },
  { name: "Govt Schemes", href: "/patient/schemes", icon: ShieldPlus },
  { name: "Settings", href: "/patient/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Determine current active section
  const isDoctor = pathname.startsWith("/doctor");
  const isAsha = pathname.startsWith("/asha");
  const isAdmin = pathname.startsWith("/admin");

  const userName = session?.user?.name || (isDoctor ? "Dr. Ramesh Sharma" : isAsha ? "Sunita Devi" : isAdmin ? "Vikram Malhotra" : "Rahul Kumar");
  const userRole = (session?.user as any)?.role || (isDoctor ? "DOCTOR" : isAsha ? "ASHA" : isAdmin ? "ADMIN" : "PATIENT");

  const portalSwitchers = [
    { label: "Patient", href: "/patient/dashboard", icon: Home, active: !isDoctor && !isAsha && !isAdmin },
    { label: "Doctor", href: "/doctor/dashboard", icon: Stethoscope, active: isDoctor },
    { label: "ASHA", href: "/asha/dashboard", icon: UserCheck, active: isAsha },
    { label: "Admin", href: "/admin/dashboard", icon: Building2, active: isAdmin },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full justify-between p-4 sm:p-5">
      {/* Top Header: Brand Logo */}
      <div>
        <Link href="/" className="flex items-center gap-3 px-2 py-3 mb-6 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-600/30 group-hover:scale-105 transition-transform duration-300">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg text-white group-hover:text-emerald-400 transition-colors">
                Swasthya<span className="text-emerald-400">Setu</span>
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
              Unified Portal
            </span>
          </div>
        </Link>

        {/* Portal Quick Switch Bar */}
        <div className="mb-6 p-1.5 rounded-2xl bg-white/[0.03] border border-white/5">
          <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold px-2 py-1 mb-1">
            Active Workspace
          </div>
          <div className="grid grid-cols-2 gap-1">
            {portalSwitchers.map((p) => {
              const Icon = p.icon;
              return (
                <Link
                  key={p.label}
                  href={p.href}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    p.active
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{p.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1.5" onMouseLeave={() => setHoveredNav(null)}>
          <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold px-3 py-1">
            Navigation
          </div>
          {patientNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            const isHovered = hoveredNav === item.name;

            return (
              <Link
                key={item.name}
                href={item.href}
                onMouseEnter={() => setHoveredNav(item.name)}
                className={`relative flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? "text-emerald-400 font-semibold"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {/* Active Indicator Pill */}
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 rounded-xl bg-emerald-500/15 border border-emerald-500/30 shadow-sm shadow-emerald-950/40 -z-10"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}

                {/* Transparent Hover Pill Effect */}
                {!isActive && isHovered && (
                  <motion.div
                    layoutId="sidebar-hover"
                    className="absolute inset-0 rounded-xl bg-white/[0.06] -z-10"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}

                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? "text-emerald-400" : "text-slate-400 group-hover:text-white"
                  }`}
                />
                <span className="flex-1">{item.name}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Profile & Logout at Bottom */}
      <div className="pt-4 border-t border-white/5 space-y-3">
        <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
            {userName.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-white truncate">{userName}</p>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                {userRole}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            document.cookie = "demo_role=; path=/; max-age=0";
            signOut({ callbackUrl: "/login" });
          }}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Fixed Left) */}
      <aside className="hidden lg:flex flex-col w-64 h-screen sticky top-0 border-r border-white/10 glass-panel backdrop-blur-2xl z-40">
        {sidebarContent}
      </aside>

      {/* Mobile Top Navbar Bar with Drawer Toggle */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-white/10 glass-nav sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
            <Activity className="w-4 h-4" />
          </div>
          <span className="font-bold text-white text-base">SwasthyaSetu</span>
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-xl bg-white/5 text-slate-300 hover:text-white border border-white/10"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-md">
          <div className="w-72 h-full bg-[#0f172a] border-r border-white/10 p-2">
            <div className="flex justify-end p-2">
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
