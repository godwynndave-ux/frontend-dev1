'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Settings, 
  ChevronRight, 
  Users, 
  Zap, 
  BarChart3, 
  ShieldCheck, 
  ArrowLeft,
  Briefcase,
  Star
} from 'lucide-react';
import { Exo_2 } from 'next/font/google';

const exo2 = Exo_2({ subsets: ['latin'], weight: ['400', '700', '800'] });

export default function UserDashboard() {
  const router = useRouter();

  const stats = [
    { label: 'Total Pairs', value: '124', icon: Users, color: '#0EA5A5' },
    { label: 'Forge Power', value: '85%', icon: Zap, color: '#FF7A00' },
    { label: 'Views', value: '1.2k', icon: BarChart3, color: '#0D1B2A' },
  ];

  return (
    <div className={`${exo2.className} min-h-screen bg-[#F3F6F9] text-[#0D1B2A] pb-24`}>
      
      {/* HEADER */}
      <header className="bg-white px-6 py-6 border-b border-slate-200 sticky top-0 z-30 flex items-center justify-between">
        <button onClick={() => router.back()} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-sm font-[800] uppercase tracking-[0.3em] italic">Your Forge</h1>
        <button className="p-2 hover:bg-slate-50 rounded-full">
          <Settings size={20} className="text-slate-400" />
        </button>
      </header>

      <main className="p-6 max-w-2xl mx-auto space-y-6">
        
        {/* PROFILE CARD */}
        <section className="bg-white rounded-[32px] p-6 shadow-xl shadow-slate-200/50 border border-white flex items-center gap-5">
          <div className="relative">
            <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-[#F3F6F9] shadow-inner">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Kevin" alt="Avatar" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#0EA5A5] rounded-full border-4 border-white flex items-center justify-center">
              <ShieldCheck size={12} className="text-white" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-[900] tracking-tight">Kevin France</h2>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Fullstack Developer</p>
            <div className="flex items-center gap-1 mt-1">
               <Star size={10} className="fill-[#FF7A00] text-[#FF7A00]" />
               <span className="text-[10px] font-black">4.9 Creator Rating</span>
            </div>
          </div>
        </section>

        {/* STATS GRID */}
        <section className="grid grid-cols-3 gap-4">
          {stats.map((stat, i) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-4 rounded-[24px] border border-slate-100 text-center shadow-sm"
            >
              <stat.icon size={18} className="mx-auto mb-2" style={{ color: stat.color }} />
              <p className="text-[18px] font-black tracking-tighter">{stat.value}</p>
              <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </section>

        {/* MODE TOGGLE CARD */}
        <section className="bg-[#0D1B2A] rounded-[32px] p-6 text-white overflow-hidden relative group cursor-pointer shadow-lg shadow-slate-400/20">
          <div className="relative z-10 flex justify-between items-center">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0EA5A5] mb-1">Current Mode</p>
              <h3 className="text-2xl font-[800] italic tracking-tighter uppercase">Personal</h3>
              <p className="text-white/40 text-xs mt-1">Switch to Business to hire talent</p>
            </div>
            <button className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-[#FF7A00] transition-all">
              <Briefcase size={20} />
            </button>
          </div>
          {/* Decorative Circle */}
          <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-[#FF7A00] rounded-full blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity" />
        </section>

        {/* ACTION LIST */}
        <section className="space-y-3">
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-4">Account Settings</h4>
          {[
            { label: 'Edit Profile Portfolio', sub: 'Update your CV and projects' },
            { label: 'Verification Center', sub: 'Identity and skill badges' },
            { label: 'Pairing Preferences', sub: 'Adjust your swipe filters' },
            { label: 'Security & Privacy', sub: 'Two-factor and data control' }
          ].map((item) => (
            <button key={item.label} className="w-full bg-white p-5 rounded-[24px] flex items-center justify-between border border-slate-100 hover:border-[#0EA5A5]/30 transition-all group">
              <div className="text-left">
                <p className="text-sm font-bold tracking-tight">{item.label}</p>
                <p className="text-[10px] text-slate-400 font-medium">{item.sub}</p>
              </div>
              <ChevronRight size={16} className="text-slate-300 group-hover:text-[#0EA5A5] transition-colors" />
            </button>
          ))}
        </section>

      </main>
    </div>
  );
}