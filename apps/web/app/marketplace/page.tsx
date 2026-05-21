'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { Search, Users, MessageCircle, User, Sparkles, Building2 } from 'lucide-react';
import { Exo_2 } from 'next/font/google';

import SwipeFeed from '@/components/marketplace/SwipeFeed';
import MatchOverlay from '@/components/marketplace/MatchOverlay';

const exo2 = Exo_2({ subsets: ['latin'], weight: ['400', '700', '800'] });

export default function MarketplacePage() {
  const router = useRouter();
  
  // PURPOSE: Simulating user choice from registration (Hire/Buy vs Work/Sell)
  // Logic: Hire -> Sees Applicants | Work -> Sees Companies
  const [purpose, setPurpose] = useState<'hire' | 'work'>('hire'); 
  
  // Smaller Toggle Mode
  const [mode, setMode] = useState<'people' | 'organizations'>(purpose === 'hire' ? 'people' : 'organizations');
  
  const [matchedUser, setMatchedUser] = useState<any | null>(null);

  return (
    <div className={`${exo2.className} min-h-screen bg-[#F3F6F9] text-[#0D1B2A] flex flex-col overflow-hidden`}>
      
      {/* HEADER */}
      <header className="px-6 py-4 bg-white border-b border-slate-200 sticky top-0 z-40 flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#0D1B2A] flex items-center justify-center shadow-md">
               <span className="text-white font-black text-[10px] italic">PA</span>
            </div>
            <span className="font-extrabold tracking-tighter text-xl italic uppercase underline-offset-4">Para<span className="text-[#FF7A00]">Pair</span></span>
          </div>
          
          {/* SMALLER MODE TOGGLE */}
          <div className="flex bg-[#F3F6F9] p-1 rounded-xl w-fit border border-slate-200">
            <button 
              onClick={() => setMode('people')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${mode === 'people' ? 'bg-white text-[#0EA5A5] shadow-sm' : 'text-slate-400'}`}
            >
              <Users size={12} /> People
            </button>
            <button 
              onClick={() => setMode('organizations')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${mode === 'organizations' ? 'bg-white text-[#0EA5A5] shadow-sm' : 'text-slate-400'}`}
            >
              <Building2 size={12} /> Orgs
            </button>
          </div>
        </div>
      </header>

      {/* FEED */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 pt-6 pb-32">
        <div className="text-center mb-6">
           <h2 className="text-[10px] font-black tracking-[0.3em] text-[#0EA5A5] uppercase mb-1">
             {mode === 'people' ? 'Discovery: Applicants' : 'Discovery: Companies'}
           </h2>
           <p className="text-slate-400 text-[10px] font-bold italic">Swipe right to match and start forging</p>
        </div>

        <SwipeFeed 
          mode={mode} 
          key={mode} 
          onMatch={(data) => setMatchedUser(data)} 
        />
      </main>

      {/* BOTTOM NAV */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-8 py-4 flex justify-between items-center z-40 pb-8">
        <button className="flex flex-col items-center gap-1.5 text-[#0EA5A5]">
          <Search size={22} strokeWidth={3} />
          <span className="text-[8px] font-black uppercase tracking-[0.2em]">Explore</span>
        </button>
        <button className="flex flex-col items-center gap-1.5 text-slate-300">
          <Users size={22} strokeWidth={2.5} />
          <span className="text-[8px] font-black uppercase tracking-[0.2em]">Pairs</span>
        </button>
        
        <div className="relative -mt-16">
          <div className="absolute inset-0 bg-[#FF7A00]/20 rounded-full blur-xl scale-125" />
          <button className="relative w-16 h-16 bg-[#FF7A00] rounded-full flex items-center justify-center text-white shadow-2xl shadow-[#FF7A00]/40 border-[6px] border-white active:scale-90 transition-all">
            <Sparkles size={28} fill="currentColor" />
          </button>
        </div>

        <button onClick={() => router.push('/messages')} className="flex flex-col items-center gap-1.5 text-slate-300">
          <MessageCircle size={22} strokeWidth={2.5} />
          <span className="text-[8px] font-black uppercase tracking-[0.2em]">Chats</span>
        </button>
        <button className="flex flex-col items-center gap-1.5 text-slate-300">
          <User size={22} strokeWidth={2.5} />
          <span className="text-[8px] font-black uppercase tracking-[0.2em]">Profile</span>
        </button>
      </nav>

      {/* MATCH MODAL */}
      <AnimatePresence>
        {matchedUser && (
          <MatchOverlay 
            matchData={matchedUser} 
            onClose={() => setMatchedUser(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}