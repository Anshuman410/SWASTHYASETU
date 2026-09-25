"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Settings,
  User,
  ShieldCheck,
  Bell,
  Globe,
  Lock,
  Smartphone,
  Copy,
  Check,
  QrCode,
  Save,
  CheckCircle2,
  Mail,
  Heart,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function PatientSettingsPage() {
  const [copiedAbha, setCopiedAbha] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form State
  const [fullName, setFullName] = useState("Rahul Kumar");
  const [email, setEmail] = useState("patient@swasthya.gov.in");
  const [phone, setPhone] = useState("+91 98214 43210");
  const [emergencyContact, setEmergencyContact] = useState("+91 94120 55678 (Kavita Kumar - Wife)");
  const [bloodGroup, setBloodGroup] = useState("O+");
  const [abhaId, setAbhaId] = useState("9821-4432-1001");
  const [language, setLanguage] = useState("hi");

  // Notifications
  const [notifWhatsapp, setNotifWhatsapp] = useState(true);
  const [notifSms, setNotifSms] = useState(true);
  const [notifEmail, setNotifEmail] = useState(false);

  const handleCopyAbha = () => {
    navigator.clipboard.writeText(abhaId);
    setCopiedAbha(true);
    setTimeout(() => setCopiedAbha(false), 2500);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3500);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Top Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
          <Settings className="w-3.5 h-3.5" />
          <span>Account Preferences & Identity</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
          Patient Profile & Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Manage your personal health profile, ABHA identity credentials, and security preferences.
        </p>
      </motion.div>

      {/* Save Success Banner */}
      {saveSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-medium flex items-center gap-2.5 shadow-xl"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Profile and notification preferences updated successfully!</span>
        </motion.div>
      )}

      {/* ABHA Card Identity Section */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="p-6 rounded-3xl glass-card border border-white/10 relative overflow-hidden bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-emerald-500/30 shrink-0">
              <ShieldCheck className="w-8 h-8 text-slate-950 stroke-[2.5]" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Ayushman Bharat Digital Health Account
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                  VERIFIED ABDM
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                {fullName}
              </h2>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-sm font-mono text-slate-300 bg-white/5 px-3 py-1 rounded-xl border border-white/10">
                  ABHA: {abhaId}
                </span>
                <button
                  type="button"
                  onClick={handleCopyAbha}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors flex items-center gap-1 text-xs"
                >
                  {copiedAbha ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 text-[11px]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="text-[11px]">Copy ID</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => alert(`Displaying QR Code for ABHA ID ${abhaId}`)}
              className="rounded-2xl border-white/10 text-xs gap-2 hover:bg-white/10"
            >
              <QrCode className="w-4 h-4 text-emerald-400" />
              <span>Show QR Pass</span>
            </Button>
            <Button
              size="sm"
              onClick={() => alert("Digital ABHA Card downloaded to device.")}
              className="rounded-2xl text-xs bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold"
            >
              Download Card
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Main Settings Form */}
      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* Personal Details */}
        <div className="p-6 rounded-3xl glass-card border border-white/10 space-y-4">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <User className="w-4 h-4 text-emerald-400" />
            <h3 className="font-bold text-sm text-white">Personal & Clinical Information</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Full Legal Name
              </label>
              <Input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="h-11 bg-white/5 border-white/10 text-white rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Primary Phone Number
              </label>
              <Input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-11 bg-white/5 border-white/10 text-white rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Registered Email Address
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 bg-white/5 border-white/10 text-white rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Blood Group
              </label>
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="w-full h-11 px-3 bg-[#1e293b] border border-white/10 text-white text-xs rounded-xl focus:outline-none focus:border-emerald-500"
              >
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Emergency Contact & Relation
              </label>
              <Input
                type="text"
                value={emergencyContact}
                onChange={(e) => setEmergencyContact(e.target.value)}
                placeholder="+91 ... (Name - Relation)"
                className="h-11 bg-white/5 border-white/10 text-white rounded-xl text-xs"
              />
            </div>
          </div>
        </div>

        {/* Language & Regional Voice Preferences */}
        <div className="p-6 rounded-3xl glass-card border border-white/10 space-y-4">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <Globe className="w-4 h-4 text-emerald-400" />
            <h3 className="font-bold text-sm text-white">Preferred Language & Bhashini AI Voice</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { code: "hi", name: "हिन्दी (Hindi)" },
              { code: "en", name: "English" },
              { code: "bn", name: "বাংলা (Bengali)" },
              { code: "mr", name: "मराठी (Marathi)" },
              { code: "te", name: "తెలుగు (Telugu)" },
              { code: "ta", name: "தமிழ் (Tamil)" },
              { code: "pa", name: "ਪੰਜਾਬੀ (Punjabi)" },
              { code: "gu", name: "ગુજરાતી (Gujarati)" },
            ].map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => setLanguage(lang.code)}
                className={`p-3 rounded-2xl border text-xs font-medium text-left transition-all ${
                  language === lang.code
                    ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300 shadow-md"
                    : "bg-white/[0.02] border-white/5 text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>

        {/* Communication & Notification Alerts */}
        <div className="p-6 rounded-3xl glass-card border border-white/10 space-y-4">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <Bell className="w-4 h-4 text-emerald-400" />
            <h3 className="font-bold text-sm text-white">Notification Channels</h3>
          </div>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 cursor-pointer hover:bg-white/[0.04] transition-colors">
              <div>
                <span className="text-xs font-bold text-white block">WhatsApp Token & OPD Updates</span>
                <span className="text-[11px] text-slate-400">Receive live queue alerts and medicine refill reminders on WhatsApp.</span>
              </div>
              <input
                type="checkbox"
                checked={notifWhatsapp}
                onChange={(e) => setNotifWhatsapp(e.target.checked)}
                className="w-4 h-4 rounded border-white/20 bg-slate-900 text-emerald-500 focus:ring-0"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 cursor-pointer hover:bg-white/[0.04] transition-colors">
              <div>
                <span className="text-xs font-bold text-white block">Emergency SMS Triage Alerts</span>
                <span className="text-[11px] text-slate-400">Direct telecom broadcast if local ASHA flags a high-priority health event.</span>
              </div>
              <input
                type="checkbox"
                checked={notifSms}
                onChange={(e) => setNotifSms(e.target.checked)}
                className="w-4 h-4 rounded border-white/20 bg-slate-900 text-emerald-500 focus:ring-0"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 cursor-pointer hover:bg-white/[0.04] transition-colors">
              <div>
                <span className="text-xs font-bold text-white block">Email Diagnostic Summaries</span>
                <span className="text-[11px] text-slate-400">Receive verified PDF lab reports and doctor discharge summaries via email.</span>
              </div>
              <input
                type="checkbox"
                checked={notifEmail}
                onChange={(e) => setNotifEmail(e.target.checked)}
                className="w-4 h-4 rounded border-white/20 bg-slate-900 text-emerald-500 focus:ring-0"
              />
            </label>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button
            type="submit"
            className="rounded-2xl h-12 px-6 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs gap-2 shadow-lg shadow-emerald-500/25"
          >
            <Save className="w-4 h-4" />
            <span>Save All Preferences</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
