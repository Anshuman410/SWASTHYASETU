import React, { useState, useEffect } from 'react';
import { HeartPulse, Leaf, Sparkles, ShieldCheck } from 'lucide-react';

interface IntroSplashProps {
  onComplete: () => void;
}

const FULL_NAME = 'SWASTHYASETU';

export const IntroSplash: React.FC<IntroSplashProps> = ({ onComplete }) => {
  const [charIndex, setCharIndex] = useState(0);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Step 1: Letter by letter building animation (110ms per char)
    if (charIndex < FULL_NAME.length) {
      const timer = setTimeout(() => {
        setCharIndex(prev => prev + 1);
      }, 110);
      return () => clearTimeout(timer);
    } else {
      // Step 2: Show Subtitle
      const subTimer = setTimeout(() => {
        setShowSubtitle(true);
      }, 400);

      // Step 3: Loading Progress Bar
      const progInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progInterval);
            setTimeout(onComplete, 500);
            return 100;
          }
          return prev + 10;
        });
      }, 80);

      return () => {
        clearTimeout(subTimer);
        clearInterval(progInterval);
      };
    }
  }, [charIndex, onComplete]);

  const displayedText = FULL_NAME.substring(0, charIndex);

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center p-6 overflow-hidden select-none">
      {/* Background Subtle Leaf Motifs */}
      <div className="absolute top-12 left-12 opacity-20 text-emerald-600 animate-float-slow pointer-events-none">
        <Leaf className="w-24 h-24" />
      </div>
      <div className="absolute bottom-16 right-16 opacity-20 text-teal-600 animate-float-reverse pointer-events-none">
        <Leaf className="w-32 h-32" />
      </div>
      <div className="absolute top-1/3 right-20 opacity-15 text-health-500 animate-float-slow pointer-events-none">
        <Sparkles className="w-16 h-16" />
      </div>
      <div className="absolute bottom-1/3 left-20 opacity-15 text-sky-500 animate-float-reverse pointer-events-none">
        <ShieldCheck className="w-20 h-20" />
      </div>

      {/* Main Center Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-xl">
        {/* Animated Brand Heart Badge */}
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-600 to-teal-700 text-white flex items-center justify-center shadow-2xl mb-8 transform transition-transform duration-500 scale-100">
          <HeartPulse className="w-11 h-11 animate-pulse text-white" />
        </div>

        {/* Letter-by-Letter Word Building */}
        <div className="min-h-[64px] flex items-center justify-center mb-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 flex items-center">
            {displayedText.split('').map((char, index) => (
              <span
                key={index}
                className="inline-block animate-letter text-slate-900"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                {char === 'S' && index >= 8 ? (
                  <span className="text-health-700">{char}</span>
                ) : (
                  char
                )}
              </span>
            ))}
            {charIndex < FULL_NAME.length && (
              <span className="w-1.5 h-10 bg-health-600 ml-1 animate-ping"></span>
            )}
          </h1>
        </div>

        {/* Subtitle Fade In */}
        <div className={`transition-all duration-700 transform ${showSubtitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-lg sm:text-xl font-bold text-slate-700 tracking-tight">
            “From First Contact to Follow-up.”
          </p>
          <p className="text-xs sm:text-sm font-medium text-slate-600 mt-2 max-w-md">
            Connecting patients, frontline health workers, doctors and public healthcare facilities.
          </p>

          {/* Smooth Loading Bar */}
          <div className="w-64 h-1.5 bg-slate-100 rounded-full mx-auto mt-8 overflow-hidden border border-slate-200">
            <div
              className="h-full bg-gradient-to-r from-emerald-600 to-teal-600 transition-all duration-150 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-[11px] font-semibold text-slate-600 mt-2 tracking-wide uppercase">Initializing Integrated Care Ecosystem...</p>
        </div>
      </div>

      {/* Accessibility Fallback Trigger */}
      <button
        onClick={onComplete}
        className="absolute bottom-6 text-xs text-slate-600 hover:text-slate-700 underline font-medium"
      >
        Skip Intro & Continue →
      </button>
    </div>
  );
};
