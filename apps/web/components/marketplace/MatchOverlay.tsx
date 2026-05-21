'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface MatchOverlayProps {
  matchData: any;
  onClose: () => void;
}

export default function MatchOverlay({ matchData, onClose }: MatchOverlayProps) {
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="absolute inset-0 bg-[#0D1B2A]/60 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <motion.div 
        initial={{ scale: 0.9, y: 20, opacity: 0 }} 
        animate={{ scale: 1, y: 0, opacity: 1 }}
        className="relative bg-white w-full max-w-sm rounded-[40px] p-8 text-center shadow-2xl overflow-hidden border border-slate-100"
      >
        {/* Brand Confetti Bar */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#0EA5A5] via-[#FF7A00] to-[#0EA5A5]" />
        
        <div className="flex items-center justify-center gap-4 mb-8">
           <div className="w-16 h-16 rounded-full border-4 border-white shadow-md overflow-hidden bg-slate-100">
             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Kevin" alt="User" />
           </div>
           <div className="w-10 h-10 rounded-xl bg-[#0D1B2A] flex items-center justify-center shadow-lg">
              <span className="text-white font-black text-[10px] italic">PA</span>
           </div>
           <div className="w-16 h-16 rounded-full border-4 border-white shadow-md overflow-hidden bg-slate-100">
             <img src={matchData.image} alt={matchData.name} className="w-full h-full object-cover" />
           </div>
        </div>

        <h2 className="text-3xl font-[900] text-[#0D1B2A] tracking-tighter mb-2">It's a Parapair! 🎉</h2>
        <p className="text-slate-500 text-sm mb-10 leading-relaxed font-medium">
          You and {matchData.name} have paired.<br/>Start a chat and build something great.
        </p>

        <div className="flex flex-col gap-3">
          <button 
            onClick={() => router.push('/messages')}
            className="w-full py-4 bg-[#FF7A00] text-white rounded-2xl font-bold text-sm shadow-xl shadow-[#FF7A00]/30 hover:brightness-110 active:scale-[0.98] transition-all"
          >
            Start Chat
          </button>
          <button 
            onClick={onClose}
            className="w-full py-4 bg-white text-slate-400 rounded-2xl font-bold text-sm border border-slate-100 hover:bg-slate-50 active:scale-[0.98] transition-all"
          >
            Not Now
          </button>
        </div>
      </motion.div>
    </div>
  );
}