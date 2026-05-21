'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, TrendingUp, ShieldAlert, Users } from 'lucide-react';

const StatCard = React.memo(({ label, value, color, icon: Icon }: any) => (
  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-teal/50 transition-all duration-premium shadow-card-hover group">
    <div className="flex justify-between items-start">
      <div className="space-y-1">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">{label}</p>
        <h3 className="text-3xl font-black text-white italic">{value}</h3>
      </div>
      <div className="p-2 rounded-xl bg-white/5 text-white/20 group-hover:scale-110 transition-transform">
        <Icon size={20} style={{ color }} />
      </div>
    </div>
  </div>
));

StatCard.displayName = 'StatCard';

export default function AdminDashboard() {
  return (
    <div className="space-y-8 animate-fade-up">
      <div>
        <h1 className="text-4xl font-black italic tracking-tighter uppercase text-white">Forge Control</h1>
        <p className="text-brand-teal text-[10px] font-bold uppercase tracking-[0.4em] mt-1">Global Ecosystem Monitor</p>
      </div>

      {/* Grid Optimized for Mobile-First */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Total Forgers" value="124.5k" color="#0EA5A5" icon={Users} />
        <StatCard label="Active Pairs" value="48.2k" color="#FF7A00" icon={Zap} />
        <StatCard label="System Integrity" value="99.9%" color="#FFFFFF" icon={ShieldAlert} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Activity Feed - Stress Fix: Line-clamps and fixed heights */}
        <section className="bg-white/5 border border-white/10 rounded-[32px] p-8">
          <h2 className="text-xl font-black italic uppercase tracking-tight text-white mb-6">Real-time Pairs</h2>
          <div className="space-y-4 max-h-[400px] overflow-y-auto no-scrollbar">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="w-10 h-10 rounded-lg bg-brand-teal/20 flex items-center justify-center font-black italic text-brand-teal">P</div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-white truncate">Match_{i}42 confirmed in Marketplace</p>
                  <p className="text-[10px] text-white/20 font-bold uppercase">2m ago</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Growth Analytics Placeholder */}
        <section className="bg-white/5 border border-white/10 rounded-[32px] p-8 flex flex-col justify-center items-center text-center">
          <div className="w-16 h-16 rounded-full border-4 border-t-brand-teal border-white/5 animate-spin mb-4" />
          <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Aggregating Forge Data...</p>
        </section>
      </div>
    </div>
  );
}