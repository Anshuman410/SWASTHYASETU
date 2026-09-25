"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

interface LiquidMetalButtonProps {
  children?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  size?: "default" | "lg";
}

export function LiquidMetalButton({
  children = "Book Appointment",
  href,
  onClick,
  className = "",
  size = "lg",
}: LiquidMetalButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const ripplesRef = useRef<Array<{ x: number; y: number; r: number; alpha: number; speed: number }>>([]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 250, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 250, damping: 22 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const render = () => {
      time += isHovered ? 0.045 : 0.018; // Speed up wave animation on hover
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Base metallic background
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, "rgba(5, 150, 105, 0.95)"); // Emerald 600
      grad.addColorStop(0.4, "rgba(16, 185, 129, 0.9)"); // Emerald 500
      grad.addColorStop(0.7, "rgba(13, 148, 136, 0.85)"); // Teal 600
      grad.addColorStop(1, "rgba(4, 120, 87, 0.95)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Liquid wave specular layer
      ctx.save();
      ctx.globalCompositeOperation = "overlay";

      const waveCount = 3;
      for (let i = 0; i < waveCount; i++) {
        ctx.beginPath();
        const freq = 0.02 + i * 0.01;
        const speed = time * (1.2 + i * 0.4);
        const amp = 8 + i * 4;

        ctx.moveTo(0, h / 2);
        for (let x = 0; x <= w; x += 4) {
          const y = h / 2 + Math.sin(x * freq + speed) * amp + Math.cos(x * 0.015 - speed * 0.7) * (amp * 0.5);
          ctx.lineTo(x, y);
        }
        ctx.lineTo(w, h);
        ctx.lineTo(0, h);
        ctx.closePath();

        ctx.fillStyle = i % 2 === 0 ? "rgba(255, 255, 255, 0.28)" : "rgba(209, 250, 229, 0.2)";
        ctx.fill();
      }
      ctx.restore();

      // Render interactive ripples triggered on hover/click
      for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
        const ripple = ripplesRef.current[i];
        ripple.r += ripple.speed;
        ripple.alpha *= 0.93;

        ctx.save();
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${ripple.alpha})`;
        ctx.lineWidth = 3;
        ctx.shadowColor = "rgba(255, 255, 255, 0.8)";
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.restore();

        if (ripple.alpha < 0.01) {
          ripplesRef.current.splice(i, 1);
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [isHovered]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);

    // Random micro-ripples while hovering smoothly
    if (Math.random() > 0.85) {
      ripplesRef.current.push({
        x,
        y,
        r: 2,
        alpha: 0.65,
        speed: 2.5,
      });
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      ripplesRef.current.push(
        { x, y, r: 4, alpha: 0.95, speed: 4.8 },
        { x, y, r: 8, alpha: 0.7, speed: 6.2 }
      );
    }
    if (onClick) onClick();
  };

  const Content = (
    <span className="relative z-10 flex items-center justify-center gap-3 font-semibold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
      <Sparkles className="w-4 h-4 text-emerald-200 animate-pulse" />
      <span>{children}</span>
      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
    </span>
  );

  const sharedClasses = `
    group relative inline-flex items-center justify-center overflow-hidden rounded-2xl
    border border-emerald-400/40 shadow-[0_10px_35px_-5px_rgba(16,185,129,0.45)]
    transition-all duration-300 active:scale-95 cursor-pointer
    ${size === "lg" ? "px-8 py-4 text-base" : "px-6 py-3 text-sm"}
    ${className}
  `;

  const innerElements = (
    <>
      {/* Background Liquid Canvas */}
      <canvas
        ref={canvasRef}
        width={320}
        height={80}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/* Dynamic Specular Glint follower */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(140px circle at ${springX}px ${springY}px, rgba(255, 255, 255, 0.45), transparent 80%)`,
        }}
      />

      {/* Chrome Glass Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/20 pointer-events-none" />

      {/* Neon Outer Glow Aura */}
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 opacity-20 blur-md transition-opacity duration-300 group-hover:opacity-60 -z-10" />

      {Content}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        onClick={handleClick}
        className={sharedClasses}
      >
        {innerElements}
      </Link>
    );
  }

  return (
    <button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      className={sharedClasses}
    >
      {innerElements}
    </button>
  );
}
