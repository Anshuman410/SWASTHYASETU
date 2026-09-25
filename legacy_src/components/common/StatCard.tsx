import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  colorTheme?: 'green' | 'blue' | 'amber' | 'red' | 'purple';
  trend?: string;
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  colorTheme = 'green',
  trend,
  onClick
}) => {
  const themeStyles = {
    green: 'bg-emerald-50/70 text-emerald-700 border-emerald-100 icon-bg-emerald-100',
    blue: 'bg-sky-50/70 text-sky-700 border-sky-100 icon-bg-sky-100',
    amber: 'bg-amber-50/70 text-amber-800 border-amber-100 icon-bg-amber-100',
    red: 'bg-rose-50/70 text-rose-700 border-rose-100 icon-bg-rose-100',
    purple: 'bg-purple-50/70 text-purple-700 border-purple-100 icon-bg-purple-100'
  };

  const iconStyles = {
    green: 'bg-emerald-100 text-emerald-700',
    blue: 'bg-sky-100 text-sky-700',
    amber: 'bg-amber-100 text-amber-800',
    red: 'bg-rose-100 text-rose-700',
    purple: 'bg-purple-100 text-purple-700'
  };

  return (
    <div
      onClick={onClick}
      className={`p-5 rounded-2xl border bg-white shadow-card hover:shadow-card-hover transition-all duration-200 ${onClick ? 'cursor-pointer hover:-translate-y-0.5' : ''}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{title}</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1.5">{value}</h3>
          {subtitle && <p className="text-xs text-slate-600 mt-1">{subtitle}</p>}
          {trend && (
            <span className="inline-block mt-2 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
              {trend}
            </span>
          )}
        </div>
        <div className={`p-3 rounded-xl ${iconStyles[colorTheme]}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};
