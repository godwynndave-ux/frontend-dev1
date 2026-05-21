'use client';

import React, { useState, Suspense } from 'react'; // FIXED: Suspense defined
import { useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { Search, Users, MessageCircle, User, Sparkles, Building2 } from 'lucide-react';
import { Exo_2 } from 'next/font/google';
import dynamic from 'next/dynamic';
import Link from 'next/link';

// CODE SPLITTING: Lazy load the swipe engine for UI Stress handling
const SwipeFeed = dynamic(() => import('@/components/marketplace/SwipeFeed'), {
  ssr: false,
  loading: () => (
    <div className="w-full max-w-[360px] h-[520px] bg-white rounded-[40px] shadow-xl shadow-slate-200/50 animate-pulse border border-slate-100" />
  )
});

// LAZY LOADING: MatchOverlay only loads when a match is triggered
const MatchOverlay = dynamic(() => import('@/components/marketplace/MatchOverlay'), {
  ssr: false
});

const exo2 = Exo_2({ subsets: ['latin'], weight: ['400', '700', '800'] });

export default function MarketplacePage() {
  const router = useRouter();
  
  // PURPOSE: Logic from registration (Hire/Buy vs Work/Sell)
  const [purpose, setPurpose] = useState<'hire' | 'work'>('hire'); 
  
  // SMALLER TOGGLE MODE (Design System Match)
  const [mode, setMode] = useState<'people' | 'organizations'>(purpose === 'hire' ? 'people' : 'organizations');
  
  const [matchedUser, setMatchedUser] = useState<any | null>(null);

  return (
    <div className={`${exo2.className} min-h-screen bg-[#F3F6F9] text-[#0D1B2A] flex flex-col overflow-hidden`}>
      
      {/* HEADER: Fixed height to prevent layout shift during lazy load */}
      <header className="px-6 py-4 bg-white border-b border-slate-200 sticky top-0 z-40 flex flex-col gap-3 h-[100px] justify-center">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#0D1B2A] flex items-center justify-center shadow-md">
               <span className="text-white font-black text-[10px] italic">PA</span>
            </div>
            <span className="font-extrabold tracking-tighter text-xl italic uppercase">Para<span className="text-[#FF7A00]">Pair</span></span>
          </div>
          
          {/* SMALLER MODE TOGGLE */}
          <div className="flex bg-[#F3F6F9] p-1 rounded-xl w-fit border border-slate-200">
            <button 
              onClick={() => setMode('people')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all duration-premium ${mode === 'people' ? 'bg-white text-[#0EA5A5] shadow-sm' : 'text-slate-400'}`}
            >
              <Users size={12} /> People
            </button>
            <button 
              onClick={() => setMode('organizations')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all duration-premium ${mode === 'organizations' ? 'bg-white text-[#0EA5A5] shadow-sm' : 'text-slate-400'}`}
            >
              <Building2 size={12} /> Orgs
            </button>
          </div>
        </div>
      </header>

      {/* FEED: Wrapped in Suspense to handle the code-splitting boundary */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 pt-6 pb-32">
        <div className="text-center mb-6">
           <h2 className="text-[10px] font-black tracking-[0.3em] text-[#0EA5A5] uppercase mb-1">
             {mode === 'people' ? 'Discovery: Applicants' : 'Discovery: Companies'}
           </h2>
           <p className="text-slate-400 text-[10px] font-bold italic">Swipe right to match and start forging</p>
        </div>

        <Suspense fallback={<div className="w-full max-w-[360px] h-[520px] bg-white rounded-[40px] animate-pulse" />}>
          <SwipeFeed 
            mode={mode} 
            key={`${mode}-${purpose}`} // UI STRESS FIX: Reset index when mode/purpose toggles
            onMatch={(data) => setMatchedUser(data)} 
          />
        </Suspense>
      </main>

      {/* BOTTOM NAV: SaaS Design System Consistency */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-8 py-4 flex justify-between items-center z-40 pb-8 backdrop-blur-md">
        <button className="flex flex-col items-center gap-1.5 text-[#0EA5A5] transition-transform active:scale-90">
          <Search size={22} strokeWidth={3} />
          <span className="text-[8px] font-black uppercase tracking-[0.2em]">Explore</span>
        </button>

        <button className="flex flex-col items-center gap-1.5 text-slate-300 transition-transform active:scale-90">
          <Users size={22} strokeWidth={2.5} />
          <span className="text-[8px] font-black uppercase tracking-[0.2em]">Pairs</span>
        </button>
        
        {/* CENTER PAIR BUTTON */}
        <div className="relative -mt-16">
          <div className="absolute inset-0 bg-[#FF7A00]/20 rounded-full blur-xl scale-125 animate-pulse" />
          <button className="relative w-16 h-16 bg-[#FF7A00] rounded-full flex items-center justify-center text-white shadow-2xl shadow-[#FF7A00]/40 border-[6px] border-white active:scale-90 transition-all duration-premium">
            <Sparkles size={28} fill="currentColor" />
          </button>
        </div>

        <button 
          onClick={() => router.push('/messages')} 
          className="flex flex-col items-center gap-1.5 text-slate-300 transition-transform active:scale-90 hover:text-[#0EA5A5]"
        >
          <MessageCircle size={22} strokeWidth={2.5} />
          <span className="text-[8px] font-black uppercase tracking-[0.2em]">Chats</span>
        </button>

        <button 
          onClick={() => router.push('/dashboard')} 
          className="flex flex-col items-center gap-1.5 text-slate-300 transition-transform active:scale-90 hover:text-[#0EA5A5]"
        >
          <User size={22} strokeWidth={2.5} />
          <span className="text-[8px] font-black uppercase tracking-[0.2em]">Profile</span>
        </button>
      </nav>

      {/* MATCH MODAL: AnimatePresence for smooth entry/exit */}
      <AnimatePresence>
        {matchedUser && (
          <Suspense fallback={null}>
            <MatchOverlay 
              matchData={matchedUser} 
              onClose={() => setMatchedUser(null)} 
            />
          </Suspense>
        )}
      </AnimatePresence>
    </div>
  );
}