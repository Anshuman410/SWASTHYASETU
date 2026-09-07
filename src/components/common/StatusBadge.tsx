import React from 'react';
import { AlertTriangle, CheckCircle2, Clock, ArrowUpRight, AlertCircle, Package } from 'lucide-react';

export type StatusVariant =
  | 'HIGH' | 'MEDIUM' | 'LOW'
  | 'Pending' | 'Confirmed' | 'Completed' | 'In Consultation' | 'Cancelled'
  | 'Created' | 'Accepted' | 'Scheduled' | 'Patient Reached' | 'Consulted' | 'Overdue'
  | 'Available' | 'Low Stock' | 'Out of Stock'
  | 'Emergency';

interface StatusBadgeProps {
  status: StatusVariant | string;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md', showIcon = true }) => {
  let bg = 'bg-slate-100 text-slate-700 border-slate-200';
  let IconComponent = Clock;

  switch (status) {
    case 'HIGH':
    case 'Emergency':
    case 'Overdue':
    case 'Out of Stock':
      bg = 'bg-rose-50 text-rose-700 border-rose-200 font-semibold';
      IconComponent = AlertTriangle;
      break;
    case 'MEDIUM':
    case 'Low Stock':
    case 'In Consultation':
      bg = 'bg-amber-50 text-amber-800 border-amber-200 font-medium';
      IconComponent = AlertCircle;
      break;
    case 'LOW':
    case 'Completed':
    case 'Available':
    case 'Accepted':
    case 'Confirmed':
      bg = 'bg-emerald-50 text-emerald-700 border-emerald-200 font-medium';
      IconComponent = CheckCircle2;
      break;
    case 'Pending':
    case 'Created':
    case 'Scheduled':
      bg = 'bg-sky-50 text-sky-700 border-sky-200';
      IconComponent = Clock;
      break;
    case 'Patient Reached':
    case 'Consulted':
      bg = 'bg-indigo-50 text-indigo-700 border-indigo-200';
      IconComponent = ArrowUpRight;
      break;
    default:
      bg = 'bg-slate-100 text-slate-700 border-slate-200';
      IconComponent = Package;
  }

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm font-semibold'
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border ${bg} ${sizeClasses[size]} tracking-tight transition-all`}>
      {showIcon && <IconComponent className="w-3.5 h-3.5 shrink-0" />}
      <span>{status}</span>
    </span>
  );
};
