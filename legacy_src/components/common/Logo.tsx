import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  textColorMode?: 'dark' | 'light';
}

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 'md', 
  showText = true,
  textColorMode = 'dark'
}) => {
  const dimensions = {
    sm: { iconSize: 28, textSize: 'text-base', subSize: 'text-[9px]' },
    md: { iconSize: 40, textSize: 'text-xl', subSize: 'text-[11px]' },
    lg: { iconSize: 52, textSize: 'text-2xl', subSize: 'text-xs' },
  };

  const current = dimensions[size];

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* SVG Icon matching exact uploaded leaf + human + cross badge */}
      <svg 
        width={current.iconSize} 
        height={current.iconSize} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Head of human figure (Green) */}
        <circle cx="50" cy="22" r="10" fill="#10B981" />
        
        {/* Left inner leaf petal (Emerald) */}
        <path d="M50 36 C42 42, 34 52, 36 68 C44 65, 48 54, 50 36 Z" fill="#34D399" />

        {/* Right inner leaf petal (Cyan/Teal) */}
        <path d="M50 36 C58 42, 66 52, 64 68 C56 65, 52 54, 50 36 Z" fill="#2DD4BF" />

        {/* Left outer large leaf (Green) */}
        <path d="M48 40 C30 42, 16 56, 18 78 C28 88, 44 88, 48 76 C49 64, 49 50, 48 40 Z" fill="#059669" />

        {/* Right outer leaf & medical shield (Royal Blue) */}
        <path d="M52 40 C70 42, 84 56, 82 78 C72 88, 56 88, 52 76 C51 64, 51 50, 52 40 Z" fill="#2563EB" />

        {/* White Medical Cross on right blue petal */}
        <path 
          d="M65 64 H71 V58 H75 V64 H81 V68 H75 V74 H71 V68 H65 Z" 
          fill="#FFFFFF" 
        />
      </svg>
      
      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col justify-center select-none">
          <div className={`font-black tracking-tight leading-none ${current.textSize}`}>
            <span className={textColorMode === 'light' ? 'text-white' : 'text-[#1E3A8A]'}>
              Swasthya
            </span>
            <span className={textColorMode === 'light' ? 'text-emerald-300' : 'text-[#059669]'}>
              Setu
            </span>
          </div>
          <span className={`font-semibold tracking-tight mt-0.5 ${current.subSize} ${
            textColorMode === 'light' ? 'text-emerald-200' : 'text-[#0284C7]'
          }`}>
            From First Contact to Follow-up.
          </span>
        </div>
      )}
    </div>
  );
};
