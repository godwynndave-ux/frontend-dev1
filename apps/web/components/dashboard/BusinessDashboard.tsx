'use client';

import { Users, LayoutList, TrendingUp, Plus, ArrowUpRight, BarChart3 } from 'lucide-react';

export default function BusinessDashboard() {
  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12 text-white">
      {/* BUSINESS HERO */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-2 bg-[#FF7A00] p-10 rounded-[40px] text-[#0D1B2A] relative overflow-hidden group shadow-2xl shadow-[#FF7A00]/20">
          <TrendingUp className="absolute -right-6 -bottom-6 w-48 h-48 opacity-10 group-hover:scale-110 transition-transform" />
          <h3 className="text-[11px] font-black uppercase tracking-[0.3em] mb-2 font-bold">Hiring Velocity</h3>
          <h2 className="text-6xl font-[900] italic tracking-tighter leading-none">+124%</h2>
          <p className="text-[10px] font-black uppercase mt-6 tracking-widest bg-black/10 w-fit px-3 py-1 rounded-full font-bold">Top 5% Growth This Month</p>
        </div>
        
        <div className="bg-white/5 border border-white/10 p-8 rounded-[40px] flex flex-col justify-between backdrop-blur-md">
          <Users className="text-[#FF7A00]" size={32} />
          <div>
            <p className="text-[10px] font-black uppercase text-white/40 tracking-widest">Active Applicants</p>
            <h3 className="text-4xl font-black italic tracking-tighter text-white">892</h3>
          </div>
        </div>
        
        <div className="bg-white/5 border border-white/10 p-8 rounded-[40px] flex flex-col justify-between backdrop-blur-md">
          <BarChart3 className="text-[#0EA5A5]" size={32} />
          <div>
            <p className="text-[10px] font-black uppercase text-white/40 tracking-widest">Global Reach</p>
            <h3 className="text-4xl font-black italic tracking-tighter text-white">12.4k</h3>
          </div>
        </div>
      </div>

      {/* ACTIVE JOB LISTINGS */}
      <div className="bg-white/5 border border-white/10 rounded-[40px] p-10">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h3 className="text-2xl font-black italic uppercase tracking-tight text-white leading-none">Active Listings</h3>
            <p className="text-[10px] font-bold uppercase text-white/20 tracking-widest mt-1">Manage your enterprise opportunities</p>
          </div>
          <button className="w-12 h-12 bg-[#FF7A00] text-white rounded-2xl flex items-center justify-center shadow-xl shadow-[#FF7A00]/20 hover:scale-110 transition-all">
            <Plus size={24} strokeWidth={3} />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {['Senior Frontend Architect', 'Cloud Infrastructure Lead', 'Product Design Director'].map((role) => (
            <div key={role} className="flex items-center justify-between p-6 bg-white/[0.02] border border-white/5 rounded-3xl hover:border-[#FF7A00]/40 transition-all group">
              <div>
                <h4 className="font-bold text-lg uppercase tracking-tight text-white">{role}</h4>
                <div className="flex items-center gap-3 mt-1">
                   <span className="text-[9px] font-black text-[#0EA5A5] uppercase tracking-widest">24 Matches</span>
                   <span className="w-1 h-1 rounded-full bg-white/10" />
                   <span className="text-[9px] font-black text-white/20 uppercase tracking-widest italic">Updated 2h ago</span>
                </div>
              </div>
              <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/20 group-hover:text-[#FF7A00] group-hover:bg-[#FF7A00]/10 transition-all">
                <ArrowUpRight size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}