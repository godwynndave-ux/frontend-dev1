'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { X, Sparkles, MapPin, Star, RotateCcw } from 'lucide-react';

const APPLICANTS = [
  { id: 'a1', name: 'Maya L.', role: 'Graphic Designer', location: 'San Francisco, CA', rating: 4.8, bio: 'Loves typography and helping startups shine.', skills: ['Branding', 'Typography', 'Figma'], image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800' },
  { id: 'a2', name: 'Kevin France', role: 'Fullstack Dev', location: 'Paris, FR', rating: 4.9, bio: 'Building the future of Next.js apps.', skills: ['Next.js', 'NestJS', 'TypeScript'], image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800' },
];

const COMPANIES = [
  { id: 'c1', name: 'StackForge', role: 'Enterprise', location: 'Silicon Valley', rating: 5.0, bio: 'We forge high-scale cloud solutions.', skills: ['Cloud', 'AI', 'Innovation'], image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800' },
  { id: 'c2', name: 'Para Intl.', role: 'Organization', location: 'Global', rating: 4.7, bio: 'Smart professional connection platform.', skills: ['Logistics', 'Tech', 'Growth'], image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800' },
];

// MEMOIZED CARD COMPONENT TO PREVENT LAG
const SwipeCard = React.memo(({ item, controls, x, rotate, onDragEnd }: any) => (
  <motion.div
    style={{ x, rotate, willChange: "transform" }} // willChange forces GPU acceleration
    animate={controls}
    drag="x"
    dragConstraints={{ left: 0, right: 0 }}
    onDragEnd={onDragEnd}
    whileTap={{ scale: 0.98 }}
    className="absolute inset-0 bg-white rounded-[40px] shadow-2xl border border-slate-100 overflow-hidden flex flex-col cursor-grab active:cursor-grabbing"
  >
    <div className="relative h-[320px] pointer-events-none">
      <img src={item.image} className="w-full h-full object-cover" alt="" loading="eager" />
      <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 border border-white/50">
        <span className="text-xs font-black text-[#0D1B2A]">{item.rating}</span>
        <Star size={10} className="fill-[#0EA5A5] text-[#0EA5A5]" />
      </div>
    </div>

    <div className="p-6 flex flex-col gap-2">
      <h3 className="text-2xl font-[900] text-[#0D1B2A] tracking-tighter leading-none">{item.name}</h3>
      <p className="text-[#0EA5A5] font-extrabold text-[12px] uppercase tracking-wider">{item.role}</p>
      <div className="flex items-center gap-1 text-slate-400">
        <MapPin size={10} />
        <span className="text-[10px] font-bold">{item.location}</span>
      </div>
      <p className="text-slate-500 text-xs font-medium line-clamp-2 mt-1 italic">"{item.bio}"</p>
      <div className="flex flex-wrap gap-2 mt-3">
        {item.skills.map((skill: string) => (
          <span key={skill} className="px-3 py-1 bg-[#F3F6F9] text-[#0D1B2A] rounded-full text-[9px] font-black uppercase tracking-[0.1em] border border-slate-100">
            {skill}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
));

SwipeCard.displayName = 'SwipeCard';

export default function SwipeFeed({ mode, onMatch }: { mode: 'people' | 'organizations', onMatch: (d: any) => void }) {
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false); // Anti-spam lock
  const controls = useAnimation();
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);

  const currentList = useMemo(() => (mode === 'people' ? APPLICANTS : COMPANIES), [mode]);
  const item = currentList[index];

  const handleAction = useCallback(async (direction: 'left' | 'right') => {
    if (!item || isAnimating) return;
    setIsAnimating(true);

    // Dynamic Spring Physics for a "Snappy" feel
    await controls.start({
      x: direction === 'right' ? 600 : -600,
      opacity: 0,
      rotate: direction === 'right' ? 20 : -20,
      transition: { type: "spring", stiffness: 260, damping: 20 }
    });

    if (direction === 'right') onMatch(item);
    
    setIndex(prev => prev + 1);
    controls.set({ x: 0, opacity: 1, rotate: 0 });
    x.set(0);
    setIsAnimating(false);
  }, [item, isAnimating, controls, onMatch, x]);

  return (
    <div className="relative w-full max-w-[360px] h-[580px] flex flex-col items-center">
      <div className="relative w-full h-[520px]">
        <AnimatePresence mode="popLayout">
          {item ? (
            <SwipeCard 
              key={item.id} 
              item={item} 
              controls={controls} 
              x={x} 
              rotate={rotate} 
              onDragEnd={(_: any, info: any) => {
                if (info.offset.x > 100) handleAction('right');
                else if (info.offset.x < -100) handleAction('left');
              }}
            />
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 flex flex-col items-center justify-center text-center p-12 bg-white/50 rounded-[40px] border-2 border-dashed border-slate-200 backdrop-blur-sm">
              <RotateCcw size={40} className="text-[#0EA5A5] mb-4 cursor-pointer hover:rotate-180 transition-all duration-700" onClick={() => setIndex(0)} />
              <p className="font-black uppercase tracking-widest text-[10px] text-[#0D1B2A]">Feed Refreshed</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {item && (
        <div className="flex justify-center items-center gap-4 w-full px-4 mt-8">
          <button 
            disabled={isAnimating}
            onClick={() => handleAction('left')}
            className="flex-1 bg-white py-4 rounded-[20px] border border-slate-200 flex items-center justify-center gap-2 text-[#0D1B2A] font-black text-[10px] uppercase tracking-[0.2em] shadow-lg hover:bg-slate-50 active:scale-95 transition-all disabled:opacity-50"
          >
            <X size={16} strokeWidth={3} /> Pass
          </button>
          <button 
            disabled={isAnimating}
            onClick={() => handleAction('right')}
            className="flex-1 bg-[#FF7A00] py-4 rounded-[20px] border-4 border-white flex items-center justify-center gap-2 text-white font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-[#FF7A00]/20 hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
          >
            <Sparkles size={16} fill="currentColor" /> Pair
          </button>
        </div>
      )}
    </div>
  );
}