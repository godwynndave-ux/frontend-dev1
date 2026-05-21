'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Info, MapPin, Star } from 'lucide-react';
import Link from 'next/link';

interface SwipeCardProps {
  data: any;
  isTop: boolean;
  onSwipe: (dir: 'left' | 'right') => void;
}

export default function SwipeCard({ data, isTop, onSwipe }: SwipeCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-150, 150], [-15, 15]);
  const opacity = useTransform(x, [-150, -100, 0, 100, 150], [0, 1, 1, 1, 0]);
  const likeOpacity = useTransform(x, [50, 150], [0, 1]);
  const nopeOpacity = useTransform(x, [-50, -150], [0, 1]);

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x > 100) onSwipe('right');
    else if (info.offset.x < -100) onSwipe('left');
  };

  return (
    <motion.div
      style={{ x, rotate, opacity, zIndex: isTop ? 10 : 0 }}
      drag={isTop ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      whileGrab={{ cursor: 'grabbing' }}
      className="absolute inset-0 w-full h-full rounded-[32px] overflow-hidden bg-[#1a2b3b] border border-white/10 shadow-2xl touch-none"
    >
      <img src={data.image} alt={data.name} className="w-full h-full object-cover" />
      
      {/* OVERLAYS */}
      <motion.div style={{ opacity: likeOpacity }} className="absolute top-8 left-8 border-4 border-[#0EA5A5] text-[#0EA5A5] px-4 py-1 rounded-xl font-black text-3xl -rotate-12 uppercase">
        MATCH
      </motion.div>
      <motion.div style={{ opacity: nopeOpacity }} className="absolute top-8 right-8 border-4 border-[#FF7A00] text-[#FF7A00] px-4 py-1 rounded-xl font-black text-3xl rotate-12 uppercase">
        PASS
      </motion.div>

      {/* INFO GRADIENT */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0D1B2A] via-[#0D1B2A]/80 to-transparent p-6 flex flex-col justify-end">
        <div className="flex justify-between items-end">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-2xl font-bold">{data.name}</h2>
              <span className="bg-[#0EA5A5] text-[10px] px-2 py-0.5 rounded-full font-bold">PRO</span>
            </div>
            <p className="text-[#0EA5A5] font-bold text-sm mb-2">{data.role}</p>
            <div className="flex gap-2 mb-3">
              {data.categories.map((cat: string) => (
                <span key={cat} className="text-[10px] bg-white/10 px-2 py-1 rounded-lg border border-white/5">
                  {cat}
                </span>
              ))}
            </div>
          </div>
          <Link href={`/marketplace/${data.id}`}>
            <button className="mb-2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all">
              <Info size={20} className="text-white" />
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}