"use client";

import React, { useState, useEffect, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
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
  AlertCircle,
  CheckCircle2,
  UserPlus,
} from "lucide-react";

function LoginForm() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (searchParams.get("registered") === "true") {
      setSuccessMessage("Registration successful! Please sign in with your credentials.");
    }
  }, [searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!email.trim() || !password.trim()) {
      setErrorMessage("Please enter both your Email / ABHA Address and Password.");
      return;
    }

    setIsLoading(true);

    try {
      const cleanEmail = email.trim().toLowerCase();

      const res = await signIn("credentials", {
        email: cleanEmail,
        password: password,
        redirect: false,
      });

      if (res?.error) {
        setErrorMessage("Invalid credentials. Please check your email and password.");
        setIsLoading(false);
        return;
      }

      // Determine proper role destination
      let dest = "/patient/dashboard";
      let role = "PATIENT";

      if (cleanEmail === "admin@gmail.com" || cleanEmail.includes("admin")) {
        dest = "/admin/dashboard";
        role = "ADMIN";
      } else if (cleanEmail.includes("doctor")) {
        dest = "/doctor/dashboard";
        role = "DOCTOR";
      } else if (cleanEmail.includes("asha")) {
        dest = "/asha/dashboard";
        role = "ASHA";
      } else {
        dest = "/patient/dashboard";
        role = "PATIENT";
      }

      // Set cookie for middleware access
      document.cookie = `demo_role=${role}; path=/; max-age=86400; SameSite=Lax`;
      document.cookie = `user_role=${role}; path=/; max-age=86400; SameSite=Lax`;

      // Full page refresh navigation ensures server session cookies are sent
      window.location.href = dest;
    } catch (err) {
      console.error("Sign-in error:", err);
      setErrorMessage("An unexpected network error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-6 overflow-hidden bg-[#0b0f17]">
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            x: [0, 60, -40, 0],
            y: [0, -50, 30, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -left-32 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-emerald-600/20 via-teal-500/15 to-transparent blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, -50, 40, 0],
            y: [0, 50, -30, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-cyan-600/20 via-blue-500/15 to-transparent blur-[140px]"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="rounded-3xl border border-white/10 bg-[#0f172a]/85 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl shadow-emerald-950/20">
          {/* Brand Logo & Heading */}
          <div className="text-center mb-7">
            <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/25 group-hover:scale-105 transition-transform">
                <Activity className="w-6 h-6 text-slate-950 stroke-[2.5]" />
              </div>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Welcome Back
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Sign in to your SwasthyaSetu Universal Health Account
            </p>
          </div>

          {/* Feedback Alerts */}
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 p-3.5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2.5"
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </motion.div>
          )}

          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2.5"
            >
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMessage}</span>
            </motion.div>
          )}

          {/* Real Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Email Address or ABHA ID
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                <Input
                  type="text"
                  required
                  placeholder="e.g. admin@gmail.com or ABHA ID"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-11 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-emerald-500/60 rounded-xl text-sm"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Password
                </label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                <Input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-11 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-emerald-500/60 rounded-xl text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 mt-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          {/* New Patient Registration Callout */}
          <div className="mt-6 pt-5 border-t border-white/10 text-center space-y-3">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-emerald-400 hover:text-emerald-300 text-xs font-semibold transition-all w-full justify-center"
            >
              <UserPlus className="w-4 h-4" />
              <span>New Patient? Register & Create ABHA ID</span>
            </Link>

            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-[11px] text-slate-400 leading-relaxed text-left flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-300">Official Portals: </span>
                <span>
                  Admin (<code className="text-emerald-400 font-mono">admin@gmail.com</code>), Doctors, ASHA Workers, and registered Patients use this single secure gateway.
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full flex items-center justify-center bg-[#0b0f17] text-emerald-400">
          <Activity className="w-8 h-8 animate-spin" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
