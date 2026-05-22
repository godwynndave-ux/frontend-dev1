import { ArrowUpRight, ArrowDownRight, LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  trend?: number;
  icon: LucideIcon;
  variant?: 'teal' | 'orange' | 'default';
}

export const StatCard = ({ label, value, trend, icon: Icon, variant = 'default' }: StatCardProps) => {
  const isPositive = trend && trend > 0;
  
  return (
    <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-sm hover:border-white/20 transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 rounded-lg ${
          variant === 'teal' ? 'bg-teal/10 text-teal' : 
          variant === 'orange' ? 'bg-orange/10 text-orange' : 
          'bg-white/10 text-white'
        }`}>
          <Icon size={20} />
        </div>
        {trend && (
          <span className={`text-xs flex items-center font-bold ${isPositive ? 'text-teal' : 'text-orange'}`}>
            {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            {Math.abs(trend)}%
          </span>
        )}
      </div>
      <div className="space-y-1">
        <p className="text-white/40 text-xs font-medium uppercase tracking-wider">{label}</p>
        <h3 className="text-2xl font-black italic tracking-tighter text-white uppercase">{value}</h3>
      </div>
    </div>
  );
};