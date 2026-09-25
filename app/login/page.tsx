"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Activity,
  ArrowRight,
  ShieldCheck,
  Lock,
  Mail,
  Eye,
  EyeOff,
  UserCheck,
  Stethoscope,
  HeartPulse,
  Building2,
  AlertCircle,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("patient@swasthya.gov.in");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [targetRole, setTargetRole] = useState<"PATIENT" | "DOCTOR" | "ASHA" | "ADMIN">("PATIENT");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const demoPresets = [
    {
      role: "PATIENT" as const,
      label: "Patient",
      email: "patient@swasthya.gov.in",
      abhaId: "9821-4432-1001",
      redirect: "/patient/dashboard",
      icon: HeartPulse,
      badge: "ABHA: 9821...",
    },
    {
      role: "DOCTOR" as const,
      label: "Doctor",
      email: "doctor@swasthya.gov.in",
      redirect: "/doctor/dashboard",
      icon: Stethoscope,
      badge: "Clinical",
    },
    {
      role: "ASHA" as const,
      label: "ASHA Worker",
      email: "asha@swasthya.gov.in",
      redirect: "/asha/dashboard",
      icon: UserCheck,
      badge: "Offline PWA",
    },
    {
      role: "ADMIN" as const,
      label: "Hospital Admin",
      email: "admin@swasthya.gov.in",
      redirect: "/admin/dashboard",
      icon: Building2,
      badge: "Operations",
    },
  ];

  const handleSelectPreset = (preset: typeof demoPresets[0]) => {
    setEmail(preset.email);
    setPassword("password123");
    setTargetRole(preset.role);
    setErrorMessage("");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage("Please enter your Email or ABHA Address and Password");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const selectedPreset = demoPresets.find((p) => p.email === email || p.role === targetRole);
      const destination = selectedPreset ? selectedPreset.redirect : "/patient/dashboard";

      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setErrorMessage("Invalid credentials. Try selecting a demo role preset below.");
      } else {
        // Also set demo cookie for frictionless dev navigation
        document.cookie = `demo_role=${targetRole}; path=/; max-age=86400`;
        router.push(destination);
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Connection error. Navigating via fallback demo route.");
      // Fallback dev redirect
      const selectedPreset = demoPresets.find((p) => p.email === email || p.role === targetRole);
      router.push(selectedPreset?.redirect || "/patient/dashboard");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-6 overflow-hidden bg-[#0b0f17]">
      {/* Abstract Background Fluid Moving Shapes matching the video reference */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Animated Fluid Orb 1 */}
        <motion.div
          animate={{
            x: [0, 80, -60, 0],
            y: [0, -60, 40, 0],
            scale: [1, 1.25, 0.9, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-32 -left-32 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-emerald-600/20 via-teal-500/15 to-transparent blur-[120px]"
        />

        {/* Animated Fluid Orb 2 */}
        <motion.div
          animate={{
            x: [0, -70, 50, 0],
            y: [0, 70, -30, 0],
            scale: [1, 1.15, 0.85, 1],
          }}
          transition={{
            duration: 26,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-40 -right-40 w-[650px] h-[650px] rounded-full bg-gradient-to-br from-emerald-500/15 via-teal-600/10 to-transparent blur-[140px]"
        />

        {/* Center Subdued Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-slate-900/60 rounded-full blur-[100px] -z-10" />

        {/* Subtle Geometric Wire Grid */}
        <div className="absolute inset-0 bg-radial-gradient opacity-20" />
      </div>

      {/* Main Glassmorphism Floating Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-[480px] p-6 sm:p-9 rounded-3xl glass-panel border border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] backdrop-blur-2xl"
      >
        {/* Brand Emblem */}
        <div className="flex flex-col items-center text-center mb-7">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-3 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-600/30 group-hover:scale-105 transition-transform duration-300">
              <Activity className="w-6 h-6 text-white" />
            </div>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Welcome Back
          </h1>
          <p className="text-sm text-slate-400 mt-1.5">
            Sign in to continue to <span className="text-emerald-400 font-medium">SwasthyaSetu</span>
          </p>
        </div>

        {/* Error Alert if any */}
        {errorMessage && (
          <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Quick Demo Role Selector Pills */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Quick 1-Click Role Fill (Demo)
            </span>
            <span className="text-[10px] text-emerald-400 font-medium">Ready to Test</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {demoPresets.map((preset) => {
              const Icon = preset.icon;
              const isSelected = email === preset.email;
              return (
                <button
                  key={preset.role}
                  type="button"
                  onClick={() => handleSelectPreset(preset)}
                  className={`p-2 rounded-xl text-left border text-xs transition-all flex flex-col gap-1 ${
                    isSelected
                      ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300 shadow-md shadow-emerald-950/40"
                      : "bg-white/[0.03] border-white/5 text-slate-300 hover:bg-white/[0.08]"
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="font-semibold truncate">{preset.label}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 truncate">{preset.badge}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Email or ABHA Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <Input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@swasthya.gov.in or 9821-4432-1001"
                className="pl-10 h-12 bg-white/[0.04] border-white/10 text-white placeholder:text-slate-500 rounded-xl focus-visible:ring-emerald-500/60"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium text-slate-300">Password</label>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Password reset OTP will be sent to your registered ABHA Mobile.");
                }}
                className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                Forgot Password?
              </a>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="pl-10 pr-10 h-12 bg-white/[0.04] border-white/10 text-white placeholder:text-slate-500 rounded-xl focus-visible:ring-emerald-500/60"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-sm shadow-lg shadow-emerald-600/30 transition-all active:scale-[0.98] mt-2"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Signing in...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <span>Sign in</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-slate-900/90 px-3 text-slate-400 uppercase tracking-wider text-[10px]">
              Or continue with
            </span>
          </div>
        </div>

        {/* Social / ABHA Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => signIn("google")}
            className="h-11 rounded-xl bg-white/[0.03] border-white/10 text-slate-200 hover:bg-white/[0.08] text-xs flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Google</span>
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setEmail("9821-4432-1001");
              setPassword("password123");
              setTargetRole("PATIENT");
            }}
            className="h-11 rounded-xl bg-white/[0.03] border-white/10 text-slate-200 hover:bg-white/[0.08] text-xs flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>ABHA Card</span>
          </Button>
        </div>

        {/* Footer Link */}
        <p className="text-center text-xs text-slate-400 mt-6">
          Don&apos;t have an account?{" "}
          <Link
            href="/patient/dashboard"
            className="text-emerald-400 hover:text-emerald-300 font-semibold underline-offset-4 hover:underline"
          >
            Register / Get ABHA ID
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
