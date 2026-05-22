'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, MessageSquare, User, Building2, MoreVertical, Star, ArrowUpRight } from 'lucide-react';
import { Exo_2 } from 'next/font/google';

const exo2 = Exo_2({ subsets: ['latin'], weight: ['400', '700', '800'] });

const MOCK_PAIRS = [
  { id: '1', name: 'Maya L.', role: 'Graphic Designer', type: 'individual', score: 98, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400', status: 'Active' },
  { id: '2', name: 'StackForge', role: 'Enterprise Agency', type: 'business', score: 92, image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400', status: 'New' },
  { id: '3', name: 'Sarah Chen', role: 'UI/UX Lead', type: 'individual', score: 88, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', status: 'Active' },
];

export default function PairsPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<'all' | 'individual' | 'business'>('all');

  const filteredPairs = MOCK_PAIRS.filter(p => filter === 'all' || p.type === filter);

  return (
    <div className={`${exo2.className} min-h-screen bg-[#F3F6F9] text-[#0D1B2A] pb-32`}>
      {/* HEADER */}
      <header className="bg-white border-b border-slate-200 px-6 py-6 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#0D1B2A] flex items-center justify-center shadow-md">
                <span className="text-white font-black text-[10px] italic">PA</span>
              </div>
              <h1 className="text-xl font-[800] italic tracking-tighter uppercase">Your <span className="text-[#0EA5A5]">Pairs</span></h1>
            </div>
            <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center text-slate-400">
              <Search size={18} />
            </div>
          </div>

          {/* FILTER PILLS */}
          <div className="flex gap-2">
            {['all', 'individual', 'business'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as any)}
                className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  filter === f ? 'bg-[#0D1B2A] text-white' : 'bg-slate-100 text-slate-400'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* PAIRS GRID */}
      <main className="max-w-4xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPairs.map((pair, i) => (
            <motion.div
              key={pair.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-[32px] p-6 shadow-xl shadow-slate-200/50 border border-white group hover:border-[#0EA5A5]/30 transition-all"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-slate-50 shadow-sm">
                    <img src={pair.image} alt={pair.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-lg shadow-sm flex items-center justify-center border border-slate-100">
                    {pair.type === 'individual' ? <User size={12} className="text-[#0EA5A5]" /> : <Building2 size={12} className="text-[#FF7A00]" />}
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 bg-[#0EA5A5]/5 px-2 py-1 rounded-lg">
                    <span className="text-xs font-[900] text-[#0EA5A5]">{pair.score}%</span>
                    <span className="text-[8px] font-bold text-[#0EA5A5] uppercase tracking-tighter">Match</span>
                  </div>
                  {pair.status === 'New' && (
                    <span className="text-[8px] font-black uppercase text-[#FF7A00] tracking-widest mt-1 block animate-pulse">● New Pair</span>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-black uppercase tracking-tight leading-none mb-1">{pair.name}</h3>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">{pair.role}</p>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => router.push('/messages')}
                  className="flex-1 bg-[#0D1B2A] text-white py-3 rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest hover:bg-[#0EA5A5] transition-all shadow-lg active:scale-95"
                >
                  <MessageSquare size={14} /> Start Forge
                </button>
                <button className="w-12 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center border border-slate-100 hover:bg-white hover:text-[#0EA5A5] transition-all">
                  <ArrowUpRight size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredPairs.length === 0 && (
          <div className="text-center py-20 opacity-20 grayscale">
            <Star size={64} className="mx-auto mb-4" />
            <p className="font-black uppercase tracking-[0.4em] text-sm">No Pairs Found</p>
          </div>
        )}
      </main>
      
      {/* PERSISTENT BOTTOM NAV (From Design System) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-8 py-4 flex justify-between items-center z-40 pb-8">
        <button onClick={() => router.push('/marketplace')} className="flex flex-col items-center gap-1.5 text-slate-300">
          <Search size={22} strokeWidth={2.5} />
          <span className="text-[8px] font-black uppercase tracking-[0.2em]">Explore</span>
        </button>
        <button className="flex flex-col items-center gap-1.5 text-[#0EA5A5]">
          <div className="relative">
             <User size={22} strokeWidth={3} />
             <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#FF7A00] rounded-full border-2 border-white" />
          </div>
          <span className="text-[8px] font-black uppercase tracking-[0.2em]">Pairs</span>
        </button>
        
        <div className="relative -mt-16">
          <button className="relative w-16 h-16 bg-[#FF7A00] rounded-full flex items-center justify-center text-white shadow-2xl border-[6px] border-white active:scale-90 transition-all">
            <Star size={28} fill="currentColor" />
          </button>
        </div>

        <button onClick={() => router.push('/messages')} className="flex flex-col items-center gap-1.5 text-slate-300">
          <MessageSquare size={22} strokeWidth={2.5} />
          <span className="text-[8px] font-black uppercase tracking-[0.2em]">Chats</span>
        </button>
        <button onClick={() => router.push('/dashboard')} className="flex flex-col items-center gap-1.5 text-slate-300">
          <User size={22} strokeWidth={2.5} />
          <span className="text-[8px] font-black uppercase tracking-[0.2em]">Profile</span>
        </button>
      </nav>
    </div>
  );
}