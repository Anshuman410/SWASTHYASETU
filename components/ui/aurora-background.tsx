"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const AuroraBackground = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "relative min-h-screen w-full bg-[#0b0f17] text-slate-100 overflow-x-hidden flex flex-col justify-between",
        className
      )}
    >
      {/* Background Aurora Lighting Effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        {/* Glowing Orb 1: Emerald Light */}
        <motion.div
          animate={{
            x: [0, 60, -40, 0],
            y: [0, -40, 50, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-[15%] -left-[10%] w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-emerald-600/20 via-emerald-400/10 to-transparent blur-[140px]"
        />

        {/* Glowing Orb 2: Deep Teal & Cyan */}
        <motion.div
          animate={{
            x: [0, -70, 40, 0],
            y: [0, 50, -40, 0],
            scale: [1, 1.15, 0.85, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[35%] -right-[15%] w-[700px] h-[700px] rounded-full bg-gradient-to-br from-teal-500/15 via-cyan-600/10 to-transparent blur-[160px]"
        />

        {/* Glowing Orb 3: Deep Slate/Blue Center Glow */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[-10%] left-[25%] w-[600px] h-[600px] rounded-full bg-slate-800/40 blur-[130px]"
        />

        {/* Subtle Ambient Grid Texture */}
        <div className="absolute inset-0 bg-radial-gradient opacity-20" />
      </div>

      {/* Content wrapper */}
      <div className="relative z-10 w-full flex-1 flex flex-col">{children}</div>
    </div>
  );
};
