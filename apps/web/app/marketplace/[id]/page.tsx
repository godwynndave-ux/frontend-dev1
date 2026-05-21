'use client';

import { Exo_2 } from 'next/font/google';
import { ArrowLeft, Star, ShieldCheck, Zap, Globe, MessageSquare } from 'lucide-react';
import Link from 'next/link';

const exo2 = Exo_2({ subsets: ['latin'] });

export default function ListingDetails({ params }: { params: { id: string } }) {
  // In real app, fetch by id. Here we assume mock data.
  return (
    <div className={`${exo2.className} min-h-screen bg-[#0D1B2A] text-white pb-24`}>
      {/* HERO IMAGE */}
      <div className="relative h-[45vh] w-full">
        <img 
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800" 
          className="w-full h-full object-cover" 
          alt="Profile" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A] to-transparent" />
        <Link href="/marketplace">
          <button className="absolute top-6 left-6 w-10 h-10 bg-[#0D1B2A]/50 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
            <ArrowLeft size={20} />
          </button>
        </Link>
      </div>

      {/* CONTENT */}
      <div className="px-6 -mt-12 relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-4xl font-black italic tracking-tighter">ALEX RIVERA</h1>
            <p className="text-[#0EA5A5] font-bold tracking-[0.2em] uppercase text-sm mt-1">AI SPECIALIST • PRO</p>
          </div>
          <div className="bg-[#FF7A00] p-3 rounded-2xl shadow-lg shadow-[#FF7A00]/20">
            <Zap size={24} className="text-white" />
          </div>
        </div>

        <div className="flex gap-4 mb-8 overflow-x-auto no-scrollbar">
           <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl">
              <Star size={16} className="text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-bold">4.9 (42 Reviews)</span>
           </div>
           <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl">
              <Globe size={16} className="text-[#0EA5A5]" />
              <span className="text-sm font-bold">Remote</span>
           </div>
        </div>

        <section className="mb-8">
          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#0EA5A5] mb-4">Biography</h3>
          <p className="text-slate-300 leading-relaxed font-medium">
            Senior AI Engineer with 8+ years of experience in distributed systems and large language models. 
            Currently forging NeuralNode, looking for high-impact collaborations in the construction tech space.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#FF7A00] mb-4">Core Categories</h3>
          <div className="flex flex-wrap gap-2">
            {['Technology', 'Engineering', 'AI & Data Science', 'Innovation'].map(tag => (
              <span key={tag} className="bg-[#F3F6F9]/10 border border-white/5 px-4 py-2 rounded-xl text-xs font-bold">
                {tag}
              </span>
            ))}
          </div>
        </section>

        {/* SECURITY FOOTER */}
        <div className="p-6 bg-white/5 rounded-[32px] border border-white/10 flex items-center gap-4">
           <div className="w-12 h-12 rounded-full bg-[#0EA5A5]/20 flex items-center justify-center text-[#0EA5A5]">
              <ShieldCheck size={28} />
           </div>
           <div>
              <p className="text-sm font-bold text-white">Identity Verified</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Trusted StackForge Professional</p>
           </div>
        </div>
      </div>

      {/* FLOATING ACTION BAR */}
      <div className="fixed bottom-0 inset-x-0 p-6 bg-gradient-to-t from-[#0D1B2A] to-transparent pointer-events-none">
        <button className="w-full h-16 bg-[#0EA5A5] hover:bg-[#0c8e8e] text-white rounded-2xl font-black tracking-widest flex items-center justify-center gap-3 shadow-2xl pointer-events-auto transition-all active:scale-[0.98]">
          <MessageSquare size={20} /> SWIPE RIGHT TO CONNECT
        </button>
      </div>
    </div>
  );
}