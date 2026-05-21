'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { X, Sparkles, MapPin, Star, RotateCcw } from 'lucide-react';

const APPLICANTS = [
  { id: 'a1', name: 'Kevin France', role: 'Fullstack Developer', bio: 'Expert in Next.js/NestJS.', skills: ['React', 'Node.js'], image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800' },
  { id: 'a2', name: 'Maya L.', role: 'Graphic Designer', location: 'San Francisco, CA', rating: 4.8, bio: 'Loves typography and helping startups shine through clever branding.', skills: ['Branding', 'Typography', 'Figma'], image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800' },
];

const COMPANIES = [
  { id: 'c1', name: 'StackForge', role: 'Enterprise', location: 'Silicon Valley', rating: 5.0, bio: 'We forge high-scale cloud solutions for global innovators.', skills: ['Cloud', 'AI', 'Security'], image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800' },
];

const SwipeCard = React.memo(({ item, controls, x, rotate, onDragEnd }: any) => (
  <motion.div
    style={{ x, rotate, willChange: "transform" }}
    animate={controls}
    drag="x"
    dragConstraints={{ left: 0, right: 0 }}
    onDragEnd={onDragEnd}
    className="absolute inset-0 bg-white rounded-[40px] shadow-2xl border border-slate-100 overflow-hidden flex flex-col cursor-grab active:cursor-grabbing"
  >
    <div className="relative h-[320px] pointer-events-none">
      <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
      <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1">
        <span className="text-xs font-black text-[#0D1B2A]">{item.rating}</span>
        <Star size={10} className="fill-[#0EA5A5] text-[#0EA5A5]" />
      </div>
    </div>
    <div className="p-7 flex flex-col gap-2">
      <h3 className="text-2xl font-[900] text-[#0D1B2A] tracking-tighter leading-none">{item.name}</h3>
      <p className="text-[#0EA5A5] font-extrabold text-[12px] uppercase tracking-wider">{item.role}</p>
      <div className="flex items-center gap-1 text-slate-400">
        <MapPin size={10} />
        <span className="text-[10px] font-bold">{item.location}</span>
      </div>
      <p className="text-slate-500 text-xs font-medium line-clamp-2 mt-1 italic opacity-80">"{item.bio}"</p>
      <div className="flex flex-wrap gap-2 mt-4">
        {item.skills.map((skill: string) => (
          <span key={skill} className="px-3 py-1 bg-[#F3F6F9] text-[#0D1B2A] rounded-full text-[9px] font-black uppercase tracking-[0.1em] border border-slate-100">{skill}</span>
        ))}
      </div>
    </div>
  </motion.div>
));

SwipeCard.displayName = 'SwipeCard';

export default function SwipeFeed({ mode, onMatch }: { mode: 'people' | 'organizations', onMatch: (d: any) => void }) {
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const controls = useAnimation();
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);

  const currentList = useMemo(() => (mode === 'people' ? APPLICANTS : COMPANIES), [mode]);
  const item = currentList[index];

  const handleAction = useCallback(async (direction: 'left' | 'right') => {
    if (!item || isAnimating) return;
    setIsAnimating(true);
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
    <div className="relative w-full max-w-[360px] flex flex-col items-center">
      {/* Card Container */}
      <div className="relative w-full h-[520px]">
        <AnimatePresence mode="popLayout">
          {item ? (
            <SwipeCard 
              key={item.id} item={item} controls={controls} x={x} rotate={rotate} 
              onDragEnd={(_: any, info: any) => {
                if (info.offset.x > 100) handleAction('right');
                else if (info.offset.x < -100) handleAction('left');
              }}
            />
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 flex flex-col items-center justify-center text-center p-12 bg-white rounded-[40px] border-2 border-dashed border-slate-200">
              <RotateCcw size={40} className="text-[#0EA5A5] mb-4 cursor-pointer" onClick={() => setIndex(0)} />
              <p className="font-black uppercase tracking-widest text-[10px] text-slate-400">Feed Refreshed</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* FIXED BUTTONS: Design System Wide Style (Matches Reference) */}
      {item && (
        <div className="flex justify-center items-center gap-3 w-full mt-8">
          <button 
            disabled={isAnimating}
            onClick={() => handleAction('left')}
            className="flex-1 bg-white h-14 rounded-2xl border border-slate-200 flex items-center justify-center gap-2 text-[#0D1B2A] font-black text-xs uppercase tracking-widest shadow-xl shadow-slate-200/50 active:scale-95 transition-all"
          >
            <X size={16} strokeWidth={3} /> Pass
          </button>
          <button 
            disabled={isAnimating}
            onClick={() => handleAction('right')}
            className="flex-1 bg-[#FF7A00] h-14 rounded-2xl border-4 border-white flex items-center justify-center gap-2 text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-[#FF7A00]/20 active:scale-95 transition-all"
          >
            <Sparkles size={16} fill="currentColor" /> Pair
          </button>
        </div>
      )}
    </div>
  );
}