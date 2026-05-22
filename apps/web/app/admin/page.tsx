'use client';

import { ShieldAlert, Globe, Server, Activity, ArrowUpRight, BarChart3 } from 'lucide-react';
import { Exo_2 } from 'next/font/google';

const exo2 = Exo_2({ subsets: ['latin'] });

export default function AdminDashboard() {
  return (
    <div className={`${exo2.className} min-h-screen bg-[#0D1B2A] text-white p-8`}>
      {/* ADMIN TOP BAR */}
      <div className="flex justify-between items-end mb-12 border-b border-white/10 pb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-3 h-3 bg-[#0EA5A5] rounded-full animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0EA5A5]">System Live</span>
          </div>
          <h1 className="text-5xl font-[900] italic tracking-tighter uppercase">Forge <span className="text-white/40 text-3xl">Control</span></h1>
        </div>
        
        <div className="flex gap-4">
          <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-center">
            <p className="text-[8px] font-black uppercase text-white/40">Global Traffic</p>
            <p className="text-lg font-black tracking-tighter">242.1k / hr</p>
          </div>
        </div>
      </div>

      {/* CONTROL GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* SYSTEM HEALTH */}
        <AdminCard label="API Latency" value="24ms" sub="Healthy" icon={Activity} />
        <AdminCard label="Active Sessions" value="12,402" sub="+12%" icon={Globe} />
        <AdminCard label="Database Load" value="14%" sub="Optimal" icon={Server} />
        <AdminCard label="Security Alerts" value="0" sub="No Threats" icon={ShieldAlert} />

        {/* REVENUE CHART PLACEHOLDER */}
        <div className="lg:col-span-3 bg-white/5 border border-white/10 rounded-[40px] p-10 h-[400px] flex flex-col justify-end">
           <div className="flex items-end gap-2 h-full">
              {[40, 70, 45, 90, 65, 80, 50, 100, 85, 95].map((h, i) => (
                <div key={i} className="flex-1 bg-[#0EA5A5]/20 hover:bg-[#0EA5A5] transition-all rounded-t-lg" style={{ height: `${h}%` }} />
              ))}
           </div>
           <div className="flex justify-between mt-6 border-t border-white/10 pt-4">
              <h3 className="text-sm font-black uppercase italic tracking-widest text-[#0EA5A5]">Platform Growth</h3>
              <BarChart3 className="text-white/20" />
           </div>
        </div>

        {/* MODERATION QUEUE */}
        <div className="bg-[#FF7A00]/5 border border-[#FF7A00]/20 rounded-[40px] p-8">
          <h3 className="text-lg font-black italic uppercase tracking-tight text-[#FF7A00] mb-6">Moderation Queue</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 bg-white/5 rounded-2xl flex justify-between items-center">
                <p className="text-[10px] font-black uppercase tracking-widest">Report #{i * 1024}</p>
                <ArrowUpRight size={14} className="text-[#FF7A00]" />
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-4 bg-[#FF7A00] text-white rounded-2xl font-black uppercase tracking-widest text-[10px]">
            Clear Queue
          </button>
        </div>
      </div>
    </div>
  );
}

function AdminCard({ label, value, sub, icon: Icon }: any) {
  return (
    <div className="bg-white/5 border border-white/10 p-8 rounded-[32px] hover:bg-white/[0.07] transition-all group">
      <Icon className="text-[#0EA5A5] mb-4 group-hover:rotate-12 transition-transform" size={28} />
      <p className="text-[10px] font-black uppercase text-white/40 tracking-[0.2em]">{label}</p>
      <h3 className="text-4xl font-black italic tracking-tighter mt-1">{value}</h3>
      <p className="text-[10px] font-black uppercase text-[#0EA5A5] mt-2 italic">{sub}</p>
    </div>
  );
}