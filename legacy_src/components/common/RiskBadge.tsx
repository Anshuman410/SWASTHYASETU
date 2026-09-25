import React from 'react';
import { RiskLevel } from '../../types';
import { ShieldAlert, ShieldCheck, Shield } from 'lucide-react';

interface RiskBadgeProps {
  level: RiskLevel;
  className?: string;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ level, className = '' }) => {
  if (level === 'HIGH') {
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800 border border-red-300 animate-pulse ${className}`}>
        <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
        HIGH RISK
      </span>
    );
  }
  if (level === 'MEDIUM') {
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-300 ${className}`}>
        <Shield className="w-3.5 h-3.5 text-amber-700" />
        MEDIUM RISK
      </span>
    );
  }
  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-300 ${className}`}>
      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
      LOW RISK
    </span>
  );
};
