'use client';

import { motion } from 'framer-motion';
import { Sparkles, MessageCircle, X } from 'lucide-react';

export default function MatchModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="absolute inset-0 bg-brand-navy/80 backdrop-blur-md"
        onClick={onClose}
      />
      <motion.div 
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        className="relative bg-white rounded-[40px] p-8 w-full max-w-sm text-center shadow-2xl overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-teal via-brand-orange to-brand-teal animate-shimmer" />
        
        <div className="flex justify-center -space-x-4 mb-6">
          <div className="w-20 h-20 rounded-full border-4 border-white bg-slate-200 overflow-hidden shadow-lg" />
          <div className="w-20 h-20 rounded-full border-4 border-white bg-brand-teal flex items-center justify-center shadow-lg text-white font-black italic">PA</div>
        </div>

        <h2 className="text-3xl font-black italic text-brand-navy tracking-tighter mb-2 italic">
          It&apos;s a Parapair! 🎉
        </h2>
        <p className="text-slate-500 text-sm mb-8 font-medium">You and this forge have matched. Start building something great.</p>

        <div className="space-y-3">
          <button className="w-full py-4 bg-brand-orange text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-brand-orange/20 active:scale-95 transition-all">
            <MessageCircle size={20} /> Start Chat
          </button>
          <button onClick={onClose} className="w-full py-4 text-slate-400 font-bold hover:bg-slate-50 rounded-2xl transition-all">
            Not Now
          </button>
        </div>
      </motion.div>
    </div>
  );
}