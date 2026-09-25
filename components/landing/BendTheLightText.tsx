"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface BendTheLightProps {
  text?: string;
  subtitle?: string;
  className?: string;
}

export function BendTheLightText({
  text = "SwasthyaSetu",
  subtitle = "The Intelligent Universal Healthcare Coordination Platform",
  className = "",
}: BendTheLightProps) {
  const letters = Array.from(text);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 * i },
    }),
  };

  const childVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.8,
      rotateX: -45,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 14,
        stiffness: 120,
      },
    },
  };

  return (
    <div className={`relative w-full flex flex-col items-center justify-center select-none py-4 ${className}`}>
      {/* Background Ambient Soft Liquid Glow Aura */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
        <motion.div
          animate={{
            scale: [1, 1.25, 0.95, 1],
            opacity: [0.35, 0.6, 0.35],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-[320px] sm:w-[550px] md:w-[700px] h-[160px] sm:h-[220px] md:h-[260px] bg-gradient-to-r from-emerald-500/25 via-teal-400/20 to-emerald-600/25 rounded-full blur-[100px]"
        />
        <div className="w-[200px] md:w-[450px] h-[100px] md:h-[180px] bg-teal-500/15 rounded-full blur-[80px] translate-x-12 -translate-y-6" />
      </div>

      {/* Staggered Letter-by-Letter Liquid Text Animation */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative flex items-center justify-center flex-wrap px-4 cursor-default"
      >
        {letters.map((char, index) => {
          const isSecondWord = index >= 8; // "Setu" part
          return (
            <motion.span
              key={index}
              variants={childVariants}
              whileHover={{
                scale: 1.18,
                y: -8,
                textShadow: "0 0 35px rgba(52, 211, 153, 0.9)",
                transition: { type: "spring", stiffness: 400, damping: 10 },
              }}
              className={`inline-block text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight transition-colors duration-200 ${
                isSecondWord
                  ? "text-transparent bg-clip-text bg-gradient-to-b from-emerald-300 via-emerald-400 to-teal-500 drop-shadow-[0_4px_30px_rgba(16,185,129,0.55)]"
                  : "text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-emerald-200 drop-shadow-[0_4px_25px_rgba(255,255,255,0.25)]"
              }`}
            >
              {char}
            </motion.span>
          );
        })}
      </motion.div>

      {/* Subtitle with soft fade in */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-4 text-center text-sm sm:text-base md:text-xl font-medium text-slate-300 max-w-2xl px-4 tracking-wide"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

export default BendTheLightText;
