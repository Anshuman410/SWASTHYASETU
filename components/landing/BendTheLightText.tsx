"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface BendTheLightProps {
  text?: string;
  subtitle?: string;
  className?: string;
}

export function BendTheLightText({
  text = "SwasthyaSetu",
  subtitle = "Universal Healthcare Coordination Platform",
  className = "",
}: BendTheLightProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [webGlSupported, setWebGlSupported] = useState(true);
  const mouseRef = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      canvas.getContext("webgl") ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

    if (!gl) {
      setWebGlSupported(false);
      return;
    }

    let animationFrameId: number;
    let startTime = performance.now();

    // 1. Offscreen 2D canvas for rendering ultra crisp high-res text
    const textCanvas = document.createElement("canvas");
    const textCtx = textCanvas.getContext("2d");

    const renderTextTexture = (width: number, height: number) => {
      if (!textCtx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      textCanvas.width = width * dpr;
      textCanvas.height = height * dpr;

      textCtx.clearRect(0, 0, textCanvas.width, textCanvas.height);

      // Gradient text fill
      const fontSize = Math.min(width * 0.12, 100) * dpr;
      textCtx.font = `900 ${fontSize}px "Inter", system-ui, -apple-system, sans-serif`;
      textCtx.textAlign = "center";
      textCtx.textBaseline = "middle";

      const cx = textCanvas.width / 2;
      const cy = textCanvas.height / 2;

      // Soft emerald / white gradient
      const gradient = textCtx.createLinearGradient(0, cy - fontSize / 2, 0, cy + fontSize / 2);
      gradient.addColorStop(0, "#ffffff");
      gradient.addColorStop(0.35, "#f0fdf4");
      gradient.addColorStop(0.7, "#34d399");
      gradient.addColorStop(1, "#059669");

      textCtx.fillStyle = gradient;
      textCtx.fillText(text, cx, cy);

      // Crisp stroke outline for light caustics
      textCtx.strokeStyle = "rgba(255, 255, 255, 0.4)";
      textCtx.lineWidth = 2 * dpr;
      textCtx.strokeText(text, cx, cy);
    };

    // Vertex Shader
    const vsSource = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      void main() {
        v_uv = (a_position + 1.0) * 0.5;
        v_uv.y = 1.0 - v_uv.y; // Invert Y for correct canvas texture coordinate
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Fragment Shader: Bend the light refraction, caustics, and chromatic dispersion
    const fsSource = `
      precision highp float;
      varying vec2 v_uv;
      uniform sampler2D u_texture;
      uniform float u_time;
      uniform vec2 u_mouse;
      uniform vec2 u_resolution;

      void main() {
        vec2 uv = v_uv;
        vec2 mouse = u_mouse;
        
        // Calculate distance from cursor for interactive light bending
        vec2 toMouse = uv - mouse;
        toMouse.x *= u_resolution.x / u_resolution.y;
        float distToMouse = length(toMouse);
        float mouseInfluence = smoothstep(0.65, 0.0, distToMouse);

        // Wave refraction equation: fluid light caustics
        float wave1 = sin(uv.y * 12.0 + u_time * 1.8) * 0.008;
        float wave2 = cos(uv.x * 16.0 - u_time * 2.2) * 0.007;
        float wave3 = sin((uv.x + uv.y) * 20.0 + u_time * 1.2) * 0.005;

        // Reactive refraction lens warping
        vec2 lensDistort = normalize(toMouse + 0.0001) * mouseInfluence * 0.035;
        vec2 refraction = vec2(wave1 + wave3, wave2 + wave3) + lensDistort;

        // Chromatic aberration (dispersion) around bent light rays
        float dispersion = 0.012 + (mouseInfluence * 0.02);
        
        float r = texture2D(u_texture, uv + refraction * (1.0 + dispersion)).r;
        float g = texture2D(u_texture, uv + refraction).g;
        float b = texture2D(u_texture, uv + refraction * (1.0 - dispersion)).b;
        float a = texture2D(u_texture, uv + refraction).a;

        // Specular glint beam that sweeps across the letters
        float sweep = sin(uv.x * 2.5 - uv.y * 1.5 - u_time * 1.4);
        float glint = smoothstep(0.92, 0.98, sweep) * 0.7;

        // Emerald caustic glow
        vec3 emeraldColor = vec3(0.06, 0.72, 0.52); // #10b981
        vec3 finalColor = vec3(r, g, b) + (glint * vec3(1.0, 1.0, 0.9)) + (mouseInfluence * 0.3 * emeraldColor);

        // Alpha edge feathering
        float edgeAlpha = a;
        if (a < 0.05) {
          // Subtle luminous light spill behind the letters
          float glow = smoothstep(0.3, 0.0, distToMouse) * 0.15;
          gl_FragColor = vec4(emeraldColor, glow);
        } else {
          gl_FragColor = vec4(finalColor, edgeAlpha);
        }
      }
    `;

    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertShader = createShader(gl.VERTEX_SHADER, vsSource);
    const fragShader = createShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vertShader || !fragShader) {
      setWebGlSupported(false);
      return;
    }

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      setWebGlSupported(false);
      return;
    }

    gl.useProgram(program);

    // Quad geometry (2 triangles covering clip space)
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1.0, -1.0,
         1.0, -1.0,
        -1.0,  1.0,
        -1.0,  1.0,
         1.0, -1.0,
         1.0,  1.0,
      ]),
      gl.STATIC_DRAW
    );

    const aPositionLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(aPositionLoc);
    gl.vertexAttribPointer(aPositionLoc, 2, gl.FLOAT, false, 0, 0);

    // Texture creation from 2D Canvas
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    // Uniform locations
    const uTimeLoc = gl.getUniformLocation(program, "u_time");
    const uMouseLoc = gl.getUniformLocation(program, "u_mouse");
    const uResLoc = gl.getUniformLocation(program, "u_resolution");

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const handleResize = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      gl.viewport(0, 0, canvas.width, canvas.height);
      renderTextTexture(rect.width, rect.height);

      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textCanvas);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Mouse listener
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouseRef.current.targetX = Math.max(0, Math.min(1, x));
      mouseRef.current.targetY = Math.max(0, Math.min(1, y));
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Render loop
    const render = () => {
      const currentTime = (performance.now() - startTime) / 1000;

      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.uniform1f(uTimeLoc, currentTime);
      gl.uniform2f(uMouseLoc, mouseRef.current.x, mouseRef.current.y);
      if (canvas) {
        gl.uniform2f(uResLoc, canvas.width, canvas.height);
      }

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      gl.deleteProgram(program);
      gl.deleteShader(vertShader);
      gl.deleteShader(fragShader);
      gl.deleteTexture(texture);
      gl.deleteBuffer(positionBuffer);
    };
  }, [text]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full flex flex-col items-center justify-center select-none ${className}`}
    >
      {/* Background Soft Glow Aura */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
        <div className="w-[320px] md:w-[600px] h-[160px] md:h-[240px] bg-emerald-500/15 rounded-full blur-[90px] animate-pulse-glow" />
        <div className="w-[240px] md:w-[450px] h-[120px] md:h-[180px] bg-teal-500/10 rounded-full blur-[70px] translate-x-12 -translate-y-8" />
      </div>

      {webGlSupported ? (
        <div className="relative w-full h-[120px] sm:h-[150px] md:h-[190px] flex items-center justify-center">
          <canvas
            ref={canvasRef}
            className="w-full h-full block cursor-crosshair"
            style={{ touchAction: "none" }}
          />
        </div>
      ) : (
        /* Fallback for non-WebGL environments */
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-200 to-emerald-500 drop-shadow-[0_0_35px_rgba(16,185,129,0.4)]">
          {text}
        </h1>
      )}

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-2 text-center text-sm sm:text-base md:text-xl font-medium text-slate-300 max-w-2xl px-4"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
