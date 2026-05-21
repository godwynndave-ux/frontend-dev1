'use client';

import { Search, Filter, MoreVertical, UserCheck, ShieldOff } from 'lucide-react';

export default function UserManagement() {
  return (
    <div className="space-y-8 animate-fade-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <h1 className="text-4xl font-black italic tracking-tighter uppercase text-white">Citizens</h1>
        
        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-teal transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Search user registry..." 
              className="bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs focus:outline-none focus:border-brand-teal/50 transition-all text-white w-full md:w-64 font-medium"
            />
          </div>
          <button className="p-3 bg-white/5 border border-white/10 rounded-xl text-white/40 hover:text-brand-teal transition-all">
            <Filter size={18} />
          </button>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-[40px] overflow-hidden backdrop-blur-xl shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-white/[0.03] border-b border-white/5">
                <th className="p-6 text-[10px] font-black uppercase text-white/40 tracking-[0.2em]">User Profile</th>
                <th className="p-6 text-[10px] font-black uppercase text-white/40 tracking-[0.2em]">Forge Mode</th>
                <th className="p-6 text-[10px] font-black uppercase text-white/40 tracking-[0.2em]">Impact</th>
                <th className="p-6 text-[10px] font-black uppercase text-white/40 tracking-[0.2em]">Integrity</th>
                <th className="p-6"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white/10 to-transparent border border-white/10" />
                      <div>
                        <p className="text-sm font-bold text-white uppercase tracking-tight">Citizen_{i}02</p>
                        <p className="text-[10px] text-white/20 font-bold uppercase">UID: {8000 + i}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${i % 2 === 0 ? 'text-brand-orange border-brand-orange/20 bg-brand-orange/5' : 'text-brand-teal border-brand-teal/20 bg-brand-teal/5'}`}>
                      {i % 2 === 0 ? 'Business' : 'Personal'}
                    </span>
                  </td>
                  <td className="p-6 text-sm font-black text-white/60 tabular-nums">{i * 1240} Swipes</td>
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-brand-teal animate-pulse" />
                      <span className="text-[10px] font-black uppercase text-white/40">Verified</span>
                    </div>
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="p-2 bg-white/5 rounded-lg text-brand-teal hover:bg-brand-teal hover:text-brand-navy transition-all"><UserCheck size={14} /></button>
                      <button className="p-2 bg-white/5 rounded-lg text-brand-orange hover:bg-brand-orange hover:text-brand-navy transition-all"><ShieldOff size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}