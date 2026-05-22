'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Exo_2 } from 'next/font/google';
import { ArrowLeft, User, Briefcase } from 'lucide-react';
import PersonalDashboard from '@/components/dashboard/PersonalDashboard';
import BusinessDashboard from '@/components/dashboard/BusinessDashboard';

const exo2 = Exo_2({ subsets: ['latin'], weight: ['400', '700', '800'] });

export default function DashboardSwitcher() {
  const router = useRouter();
  const [mode, setMode] = useState<'personal' | 'business'>('personal');

  return (
    <main className={`${exo2.className} min-h-screen bg-[#0D1B2A] text-white flex flex-col overflow-x-hidden`}>
      
      {/* HEADER MATCHED TO SWIPE FEED */}
      <header className="sticky top-0 z-50 bg-[#0D1B2A]/90 backdrop-blur-xl border-b border-white/5 px-6 py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.back()} 
              className="p-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-[#FF7A00] hover:text-white transition-all active:scale-90"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex flex-col">
              <h1 className="text-xl font-[800] italic tracking-tighter uppercase leading-none">
                Forge <span className="text-[#0EA5A5]">Analytics</span>
              </h1>
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30 tracking-widest">Control Center</span>
            </div>
          </div>

          {/* THE MODE SWITCHER */}
          <div className="flex bg-black/20 p-1 rounded-2xl border border-white/5">
            <button 
              onClick={() => setMode('personal')}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                mode === 'personal' ? 'bg-[#0EA5A5] text-[#0D1B2A] shadow-lg' : 'text-white/20 hover:text-white'
              }`}
            >
              <User size={12} /> Personal
            </button>
            <button 
              onClick={() => setMode('business')}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                mode === 'business' ? 'bg-[#FF7A00] text-white shadow-lg' : 'text-white/20 hover:text-white'
              }`}
            >
              <Briefcase size={12} /> Business
            </button>
          </div>
        </div>
      </header>

      {/* CONTENT AREA */}
      <div className="flex-1 p-6 lg:p-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {mode === 'personal' ? <PersonalDashboard /> : <BusinessDashboard />}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}